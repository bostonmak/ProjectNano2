/*
 This file is part of the OdinMS Maple Story Server
 Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc>
 Matthias Butz <matze@odinms.de>
 Jan Christian Meyer <vimes@odinms.de>

 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU Affero General Public License as
 published by the Free Software Foundation version 3 as published by
 the Free Software Foundation. You may not use, modify or distribute
 this program under any other version of the GNU Affero General Public
 License.

 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU Affero General Public License for more details.

 You should have received a copy of the GNU Affero General Public License
 along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
package net.server;

import batch.ResetDailyBossLimitJob;
import config.ConfigLoader;
import net.server.worker.CouponWorker;
import net.server.worker.RankingWorker;
import java.io.IOException;
import java.net.InetSocketAddress;
import java.sql.*;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.Iterator;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Properties;
import java.util.Set;

import org.apache.mina.core.filterchain.IoFilter;
import org.quartz.*;
import org.quartz.impl.StdSchedulerFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import tools.locks.MonitoredReentrantLock;

import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.locks.Lock;

import net.MapleServerHandler;
import net.mina.MapleCodecFactory;
import net.server.channel.Channel;
import net.server.guild.MapleAlliance;
import net.server.guild.MapleGuild;
import net.server.guild.MapleGuildCharacter;
import net.server.world.World;

import org.apache.mina.core.buffer.IoBuffer;
import org.apache.mina.core.buffer.SimpleBufferAllocator;
import org.apache.mina.core.service.IoAcceptor;
import org.apache.mina.core.session.IdleStatus;
import org.apache.mina.filter.codec.ProtocolCodecFilter;
import org.apache.mina.transport.socket.nio.NioSocketAcceptor;

import server.CashShop.CashItemFactory;
import server.TimerManager;
import tools.DatabaseConnection;
import tools.FilePrinter;
import tools.Pair;
import client.MapleClient;
import client.MapleCharacter;
import client.SkillFactory;
import client.newyear.NewYearCardRecord;
import constants.ItemConstants;
import constants.ServerConstants;
import java.security.Security;
import java.util.Calendar;
import net.server.audit.ThreadTracker;
import server.quest.MapleQuest;
import tools.locks.MonitoredLockType;
import tools.AutoJCE;

import static constants.ServerConstants.CLOSE_CONNECTIONS_ON_SHUTDOWN;
import static constants.ServerConstants.PORT;

public class Server {
    // Load configurations based on environment
    private String environment = "test";

    private final static ConfigLoader ConfigLoader = new ConfigLoader();

    private static final Set<Integer> activeFly = new HashSet<>();
    private static final Map<Integer, Integer> couponRates = new HashMap<>(30);
    private static final List<Integer> activeCoupons = new LinkedList<>();
    
    private IoAcceptor acceptor;
    private List<Map<Integer, String>> channels = new LinkedList<>();
    private List<World> worlds = new ArrayList<>();
    private final Properties subnetInfo = new Properties();
    private static Server instance = null;
    private final Map<Integer, Set<Integer>> accountChars = new HashMap<>();
    private final Map<String, Integer> transitioningChars = new HashMap<>();
    private List<Pair<Integer, String>> worldRecommendedList = new LinkedList<>();
    private final ConcurrentHashMap<Integer, MapleGuild> guilds = new ConcurrentHashMap<>();
    private final Map<MapleClient, Long> inLoginState = new HashMap<>(100);
    private final Lock srvLock = new MonitoredReentrantLock(MonitoredLockType.SERVER);
    private final Lock lgnLock = new MonitoredReentrantLock(MonitoredLockType.SERVER);
    private final PlayerBuffStorage buffStorage = new PlayerBuffStorage();
    private final Map<Integer, MapleAlliance> alliances = new HashMap<>(100);
    private final Map<Integer, NewYearCardRecord> newyears = new HashMap<>();
    private static Scheduler batchScheduler = null;

    private static Logger logger = LoggerFactory.getLogger(Server.class);

    private boolean online = false;
    public static long uptime = System.currentTimeMillis();
    
    public static Server getInstance() {
        if (instance == null) {
            instance = new Server();
        }
        return instance;
    }

    public boolean isOnline() {
        return online;
    }

    public List<Pair<Integer, String>> worldRecommendedList() {
        return worldRecommendedList;
    }
    
    public void setNewYearCard(NewYearCardRecord nyc) {
        newyears.put(nyc.getId(), nyc);
    }
    
    public NewYearCardRecord getNewYearCard(int cardid) {
        return newyears.get(cardid);
    }
    
    public NewYearCardRecord removeNewYearCard(int cardid) {
        return newyears.remove(cardid);
    }

    /*
    public void removeChannel(int worldid, int channel) {   //lol don't!
        channels.remove(channel);

        World world = worlds.get(worldid);
        if (world != null) {
            world.removeChannel(channel);
        }
    }
    */

    public Channel getChannel(int world, int channel) {
        return worlds.get(world).getChannel(channel);
    }

    public List<Channel> getChannelsFromWorld(int world) {
        return worlds.get(world).getChannels();
    }

    public List<Channel> getAllChannels() {
        List<Channel> channelz = new ArrayList<>();
        for (World world : worlds) {
            for (Channel ch : world.getChannels()) {
                channelz.add(ch);
            }
        }
        return channelz;
    }

    public String getIP(int world, int channel) {
        return channels.get(world).get(channel);
    }
    
    private long getTimeLeftForNextHour() {
        Calendar nextHour = Calendar.getInstance();
        nextHour.add(Calendar.HOUR, 1);
        nextHour.set(Calendar.MINUTE, 0);
        nextHour.set(Calendar.SECOND, 0);
        
        return Math.max(0, nextHour.getTimeInMillis() - System.currentTimeMillis());
    }
    
    public Map<Integer, Integer> getCouponRates() {
        return couponRates;
    }
    
    private void loadCouponRates(Connection c) throws SQLException {
        PreparedStatement ps = c.prepareStatement("SELECT couponid, rate FROM nxcoupons");
        ResultSet rs = ps.executeQuery();
        
        while(rs.next()) {
            int cid = rs.getInt("couponid");
            int rate = rs.getInt("rate");
            
            couponRates.put(cid, rate);
        }
        
        rs.close();
        ps.close();
    }
    
    public List<Integer> getActiveCoupons() {
        synchronized(activeCoupons) {
            return activeCoupons;
        }
    }
    
    public void commitActiveCoupons() {
        for(World world: getWorlds()) {
            for(MapleCharacter chr: world.getPlayerStorage().getAllCharacters()) {
                if(!chr.isLoggedin()) continue;

                chr.updateCouponRates();
            }
        }
    }
    
    public void toggleCoupon(Integer couponId) {
        if(ItemConstants.isRateCoupon(couponId)) {
            synchronized(activeCoupons) {
                if(activeCoupons.contains(couponId)) {
                    activeCoupons.remove(couponId);
                }
                else {
                    activeCoupons.add(couponId);
                }

                commitActiveCoupons();
            }
        }
    }
    
    public void updateActiveCoupons() throws SQLException {
        synchronized(activeCoupons) {
            activeCoupons.clear();
            Calendar c = Calendar.getInstance();

            int weekDay = c.get(Calendar.DAY_OF_WEEK);
            int hourDay = c.get(Calendar.HOUR_OF_DAY);

            Connection con = null;
            try {
                con = DatabaseConnection.getConnection();

                int weekdayMask = (1 << weekDay);
                PreparedStatement ps = con.prepareStatement("SELECT couponid FROM nxcoupons WHERE (activeday & ?) = ? AND starthour <= ? AND endhour > ?");
                ps.setInt(1, weekdayMask);
                ps.setInt(2, weekdayMask);
                ps.setInt(3, hourDay);
                ps.setInt(4, hourDay);

                ResultSet rs = ps.executeQuery();
                while(rs.next()) {
                    activeCoupons.add(rs.getInt("couponid"));
                }

                rs.close();
                ps.close();

                con.close();
            } catch (SQLException ex) {
                ex.printStackTrace();

                try {
                    if(con != null && !con.isClosed()) {
                        con.close();
                    }
                } catch (SQLException ex2) {
                    ex2.printStackTrace();
                }
            }
        }
    }

    public void init() {
        environment = System.getProperty("env", "test");
        logger.info("Environment: " + environment);

        ConfigLoader.LoadServerConstantsConfig();

        System.out.println("ProjectNano v" + ServerConstants.VERSION + " starting up.\r\n");


        if(ServerConstants.SHUTDOWNHOOK)
            Runtime.getRuntime().addShutdownHook(new Thread(shutdown(false)));
        
        Connection c = null;
        try {
            c = DatabaseConnection.getConnection();
            PreparedStatement ps = c.prepareStatement("UPDATE accounts SET loggedin = 0");
            ps.executeUpdate();
            ps.close();
            ps = c.prepareStatement("UPDATE characters SET HasMerchant = 0");
            ps.executeUpdate();
            ps.close();
            
            loadCouponRates(c);
            updateActiveCoupons();
            
            c.close();
        } catch (SQLException sqle) {
            sqle.printStackTrace();
        }
        IoBuffer.setUseDirectBuffer(false);
        IoBuffer.setAllocator(new SimpleBufferAllocator());
        TimerManager tMan = TimerManager.getInstance();
        tMan.start();
        tMan.register(tMan.purge(), ServerConstants.PURGING_INTERVAL);//Purging ftw...
        disconnectIdlesOnLoginTask();
        
        long timeLeft = getTimeLeftForNextHour();
        tMan.register(new CouponWorker(), ServerConstants.COUPON_INTERVAL, timeLeft);
        tMan.register(new RankingWorker(), ServerConstants.RANKING_INTERVAL, timeLeft);
        
        long timeToTake = System.currentTimeMillis();
        SkillFactory.loadAllSkills();
        System.out.println("Skills loaded in " + ((System.currentTimeMillis() - timeToTake) / 1000.0) + " seconds");

        timeToTake = System.currentTimeMillis();
        //MapleItemInformationProvider.getInstance().getAllItems(); //unused, rofl

        CashItemFactory.getSpecialCashItems();
        System.out.println("Items loaded in " + ((System.currentTimeMillis() - timeToTake) / 1000.0) + " seconds");
        
	timeToTake = System.currentTimeMillis();
	MapleQuest.loadAllQuest();
	System.out.println("Quest loaded in " + ((System.currentTimeMillis() - timeToTake) / 1000.0) + " seconds\r\n");
	
        NewYearCardRecord.startPendingNewYearCardRequests();
        
        if(ServerConstants.USE_THREAD_TRACKER) ThreadTracker.getInstance().registerThreadTrackerTask();
        ConfigLoader.LoadWorldConfig();

        setupAcceptor();
        openServer();

        logger.info("Scheduling Batch Jobs...");

        Trigger trigger = TriggerBuilder.newTrigger()
                .withIdentity("ResetDailyBossLimit", "reset")
                .withSchedule(CronScheduleBuilder.cronSchedule("0 0 0 1/1 * ? *"))
                .build();

        JobDetail job = JobBuilder.newJob(ResetDailyBossLimitJob.class)
                .withIdentity("ResetDailyBossLimit", "reset")
                .build();

        try {
            batchScheduler = new StdSchedulerFactory().getScheduler();
            batchScheduler.start();
            batchScheduler.scheduleJob(job, trigger);
        } catch (SchedulerException e) {
            logger.error("Error starting batch scheduler. Daily boss limits will not be reset automatically.", e);
        }

        System.out.println("ProjectNano is now online.\r\n");
        online = true;
    }

    public void shutdown() {
    	try {
	        TimerManager.getInstance().stop();
	        acceptor.unbind();
    	} catch (NullPointerException e) {
    		FilePrinter.printError(FilePrinter.EXCEPTION_CAUGHT, e);
    	}
        System.out.println("Server offline.");
        System.exit(0);// BOEIEND :D
    }

    public static void main(String args[]) {
        System.setProperty("wzpath", "wz");
        Security.setProperty("crypto.policy", "unlimited");
        AutoJCE.removeCryptographyRestrictions();
        Server.getInstance().init();
    }

    public Properties getSubnetInfo() {
        return subnetInfo;
    }

    public MapleAlliance getAlliance(int id) {
        synchronized (alliances) {
            if (alliances.containsKey(id)) {
                return alliances.get(id);
            }
            return null;
        }
    }

    public void addAlliance(int id, MapleAlliance alliance) {
        synchronized (alliances) {
            if (!alliances.containsKey(id)) {
                alliances.put(id, alliance);
            }
        }
    }

    public void disbandAlliance(int id) {
        synchronized (alliances) {
            MapleAlliance alliance = alliances.get(id);
            if (alliance != null) {
                for (Integer gid : alliance.getGuilds()) {
                    this.getGuild(gid).setAllianceId(0);
                }
                alliances.remove(id);
            }
        }
    }

    public void allianceMessage(int id, final byte[] packet, int exception, int guildex) {
        MapleAlliance alliance = alliances.get(id);
        if (alliance != null) {
            for (Integer gid : alliance.getGuilds()) {
                if (guildex == gid) {
                    continue;
                }
                MapleGuild guild = this.getGuild(gid);
                if (guild != null) {
                    guild.broadcast(packet, exception);
                }
            }
        }
    }

    public boolean addGuildtoAlliance(int aId, int guildId) {
        MapleAlliance alliance = alliances.get(aId);
        if (alliance != null) {
            alliance.addGuild(guildId);
            this.getGuild(guildId).setAllianceId(aId);
            return true;
        }
        return false;
    }

    public boolean removeGuildFromAlliance(int aId, int guildId) {
        MapleAlliance alliance = alliances.get(aId);
        if (alliance != null) {
            alliance.removeGuild(guildId);
            this.getGuild(guildId).setAllianceId(0);
            return true;
        }
        return false;
    }

    public boolean setAllianceRanks(int aId, String[] ranks) {
        MapleAlliance alliance = alliances.get(aId);
        if (alliance != null) {
            alliance.setRankTitle(ranks);
            return true;
        }
        return false;
    }

    public boolean setAllianceNotice(int aId, String notice) {
        MapleAlliance alliance = alliances.get(aId);
        if (alliance != null) {
            alliance.setNotice(notice);
            return true;
        }
        return false;
    }

    public boolean increaseAllianceCapacity(int aId, int inc) {
        MapleAlliance alliance = alliances.get(aId);
        if (alliance != null) {
            alliance.increaseCapacity(inc);
            return true;
        }
        return false;
    }

    public Set<Integer> getChannelServer(int world) {
        return new HashSet<>(channels.get(world).keySet());
    }

    public byte getHighestChannelId() {
        byte highest = 0;
        for (Iterator<Integer> it = channels.get(0).keySet().iterator(); it.hasNext();) {
            Integer channel = it.next();
            if (channel != null && channel.intValue() > highest) {
                highest = channel.byteValue();
            }
        }
        return highest;
    }

    public int createGuild(int leaderId, String name) {
        return MapleGuild.createGuild(leaderId, name);
    }
    
    public MapleGuild getGuildByName(String name) {
        for(MapleGuild mg: this.guilds.values()) {
            if(mg.getName().equalsIgnoreCase(name)) {
                return mg;
            }
        }

        return null;
    }
    
    public MapleGuild getGuild(int id) {
        return this.guilds.get(id);
    }

    public MapleGuild getGuild(int id, int world) {
            return getGuild(id, world, null);
    }
    
    public MapleGuild getGuild(int id, int world, MapleCharacter mc) {
        MapleGuild mapleGuild = this.getGuild(id);
        if (mapleGuild != null) {
            return mapleGuild;
        }
        MapleGuild g = new MapleGuild(id, world);
        if (g.getId() == -1) {
            return null;
        }

        if(mc != null) {
            mc.setMGC(g.getMGC(mc.getId()));
            if(g.getMGC(mc.getId()) == null) System.out.println("null for " + mc.getName() + " when loading " + id);
            g.getMGC(mc.getId()).setCharacter(mc);
            g.setOnline(mc.getId(), true, mc.getClient().getChannel());
        }

        this.guilds.put(id, g);
        return g;
    }

    public void setGuildMemberOnline(MapleCharacter mc, boolean bOnline, int channel) {
        MapleGuild g = getGuild(mc.getGuildId(), mc.getWorld(), mc);
        g.setOnline(mc.getId(), bOnline, channel);
    }

    public int addGuildMember(MapleGuildCharacter mgc, MapleCharacter chr) {
        MapleGuild g = this.getGuild(mgc.getGuildId());
        if (g != null) {
            return g.addGuildMember(mgc, chr);
        }
        return 0;
    }

    public boolean setGuildAllianceId(int gId, int aId) {
        MapleGuild guild = this.getGuild(gId);
        if (guild != null) {
            guild.setAllianceId(aId);
            return true;
        }
        return false;
    }
    
    public void resetAllianceGuildPlayersRank(int gId) {
        this.getGuild(gId).resetAllianceGuildPlayersRank();
    }

    public void leaveGuild(MapleGuildCharacter mgc) {
        MapleGuild g = this.getGuild(mgc.getGuildId());
        if (g != null) {
            g.leaveGuild(mgc);
        }
    }

    public void guildChat(int gid, String name, int cid, String msg) {
        MapleGuild g = this.getGuild(gid);
        if (g != null) {
            g.guildChat(name, cid, msg);
        }
    }

    public void changeRank(int gid, int cid, int newRank) {
        MapleGuild g = this.getGuild(gid);
        if (g != null) {
            g.changeRank(cid, newRank);
        }
    }

    public void expelMember(MapleGuildCharacter initiator, String name, int cid) {
        MapleGuild g = this.getGuild(initiator.getGuildId());
        if (g != null) {
            g.expelMember(initiator, name, cid);
        }
    }

    public void setGuildNotice(int gid, String notice) {
        MapleGuild g = this.getGuild(gid);
        if (g != null) {
            g.setGuildNotice(notice);
        }
    }

    public void memberLevelJobUpdate(MapleGuildCharacter mgc) {
        MapleGuild g = this.getGuild(mgc.getGuildId());
        if (g != null) {
            g.memberLevelJobUpdate(mgc);
        }
    }

    public void changeRankTitle(int gid, String[] ranks) {
        MapleGuild g = this.getGuild(gid);
        if (g != null) {
            g.changeRankTitle(ranks);
        }
    }

    public void setGuildEmblem(int gid, short bg, byte bgcolor, short logo, byte logocolor) {
        MapleGuild g = this.getGuild(gid);
        if (g != null) {
            g.setGuildEmblem(bg, bgcolor, logo, logocolor);
        }
    }

    public void disbandGuild(int gid) {
        MapleGuild g = this.getGuild(gid);
        g.disbandGuild();
        this.guilds.remove(gid);
    }

    public boolean increaseGuildCapacity(int gid) {
        MapleGuild g = this.getGuild(gid);
        if (g != null) {
            return g.increaseCapacity();
        }
        return false;
    }

    public void gainGP(int gid, int amount) {
        MapleGuild g = this.getGuild(gid);
        if (g != null) {
            g.gainGP(amount);
        }
    }
	
    public void guildMessage(int gid, byte[] packet) {
        guildMessage(gid, packet, -1);
    }
	
    public void guildMessage(int gid, byte[] packet, int exception) {
        MapleGuild g = this.getGuild(gid);
        if(g != null) {
            g.broadcast(packet, exception);
        }
    }

    public PlayerBuffStorage getPlayerBuffStorage() {
        return buffStorage;
    }

    public void deleteGuildCharacter(MapleCharacter mc) {
        setGuildMemberOnline(mc, false, (byte) -1);
        if (mc.getMGC().getGuildRank() > 1) {
            leaveGuild(mc.getMGC());
        } else {
            disbandGuild(mc.getMGC().getGuildId());
        }
    }
    
    public void deleteGuildCharacter(MapleGuildCharacter mgc) {
        if(mgc.getCharacter() != null) setGuildMemberOnline(mgc.getCharacter(), false, (byte) -1);
        if (mgc.getGuildRank() > 1) {
            leaveGuild(mgc);
        } else {
            disbandGuild(mgc.getGuildId());
        }
    }

    public void reloadGuildCharacters(int world) {
        World worlda = getWorld(world);
        for (MapleCharacter mc : worlda.getPlayerStorage().getAllCharacters()) {
            if (mc.getGuildId() > 0) {
                setGuildMemberOnline(mc, true, worlda.getId());
                memberLevelJobUpdate(mc.getMGC());
            }
        }
        worlda.reloadGuildSummary();
    }

    public void broadcastMessage(int world, final byte[] packet) {
        for (Channel ch : getChannelsFromWorld(world)) {
            ch.broadcastPacket(packet);
        }
    }

    public void broadcastGMMessage(int world, final byte[] packet) {
        for (Channel ch : getChannelsFromWorld(world)) {
            ch.broadcastGMPacket(packet);
        }
    }
    
    public boolean isGmOnline(int world) {
        for (Channel ch : getChannelsFromWorld(world)) {
        	for (MapleCharacter player : ch.getPlayerStorage().getAllCharacters()) {
        		if (player.isGM()){
        			return true;
        		}
        	}
        }
        return false;
    }
    
    public void changeFly(Integer accountid, boolean canFly) {
        if(canFly) {
            activeFly.add(accountid);
        } else {
            activeFly.remove(accountid);
        }
    }
    
    public boolean canFly(Integer accountid) {
        return activeFly.contains(accountid);
    }
    
    public World getWorld(int id) {
        return worlds.get(id);
    }

    public List<World> getWorlds() {
        return worlds;
    }

    private static void loadCharacteridsFromDb(Integer accountid, Set<Integer> accChars) {
        try {
            try (Connection con = DatabaseConnection.getConnection()) {
                try (PreparedStatement ps = con.prepareStatement("SELECT id FROM characters WHERE accountid = ?")) {
                    ps.setInt(1, accountid);

                    try (ResultSet rs = ps.executeQuery()) {
                        while(rs.next()) {
                            accChars.add(rs.getInt("id"));
                        }
                    }
                }
            }
        } catch (SQLException sqle) {
            sqle.printStackTrace();
        }
    }
    
    public boolean haveCharacterid(Integer accountid, Integer chrid) {
        lgnLock.lock();
        try {
            Set<Integer> accChars = accountChars.get(accountid);
            if(accChars == null) {
                accChars = new HashSet<>(5);
                loadCharacteridsFromDb(accountid, accChars);

                accountChars.put(accountid, accChars);
            }

            return accChars.contains(chrid);
        } finally {
            lgnLock.unlock();
        }
    }
    
    public void createCharacterid(Integer accountid, Integer chrid) {
        lgnLock.lock();
        try {
            Set<Integer> accChars = accountChars.get(accountid);
            if(accChars == null) {
                accChars = new HashSet<>(5);
                accountChars.put(accountid, accChars);
            }

            accChars.add(chrid);
        } finally {
            lgnLock.unlock();
        }
    }
    
    public void deleteCharacterid(Integer accountid, Integer chrid) {
        lgnLock.lock();
        try {
            Set<Integer> accChars = accountChars.get(accountid);
            if(accChars != null) {
                accChars.remove(chrid);
            }
        } finally {
            lgnLock.unlock();
        }
    }
    
    /*
    public void deleteAccount(Integer accountid) { is this even a thing?
        lgnLock.lock();
        try {
            accountChars.remove(accountid);
        } finally {
            lgnLock.unlock();
        }
    }
    */
    
    private static String getRemoteIp(InetSocketAddress isa) {
        return isa.getAddress().getHostAddress();
    }
    
    public void setCharacteridInTransition(InetSocketAddress isa, int charId) {
        String remoteIp = getRemoteIp(isa);
        
        lgnLock.lock();
        try {
            transitioningChars.put(remoteIp, charId);
        } finally {
            lgnLock.unlock();
        }
    }
    
    public boolean validateCharacteridInTransition(InetSocketAddress isa, int charId) {
        String remoteIp = getRemoteIp(isa);
        
        lgnLock.lock();
        try {
            Integer cid = transitioningChars.remove(remoteIp);
            return cid != null && cid.equals(charId);
        } finally {
            lgnLock.unlock();
        }
    }
    
    public void registerLoginState(MapleClient c) {
        srvLock.lock();
        try {
            inLoginState.put(c, System.currentTimeMillis() + 600000);
        } finally {
            srvLock.unlock();
        }
    }
    
    public void unregisterLoginState(MapleClient c) {
        srvLock.lock();
        try {
            inLoginState.remove(c);
        } finally {
            srvLock.unlock();
        }
    }
    
    private void disconnectIdlesOnLoginState() {
        srvLock.lock();
        try {
            List<MapleClient> toDisconnect = new LinkedList<>();
            long timeNow = System.currentTimeMillis();
            
            for(Entry<MapleClient, Long> mc : inLoginState.entrySet()) {
                if(timeNow > mc.getValue()) {
                    toDisconnect.add(mc.getKey());
                }
            }
            
            for(MapleClient c : toDisconnect) {
                if(c.isLoggedIn()) {
                    c.disconnect(false, false);
                } else {
                    c.getSession().close(true);
                }
                
                inLoginState.remove(c);
            }
        } finally {
            srvLock.unlock();
        }
    }
    
    private void disconnectIdlesOnLoginTask() {
        TimerManager.getInstance().register(new Runnable() {
            @Override
            public void run() {
                disconnectIdlesOnLoginState();
            }
        }, 300000);
    }
    
    public final Runnable shutdown(final boolean restart) {//no player should be online when trying to shutdown!
        return new Runnable() {
            @Override
            public void run() {
                srvLock.lock();
                
                try {
                    System.out.println((restart ? "Restarting" : "Shutting down") + " the server!\r\n");
                    closeServer();
                    if (getWorlds() == null) return;//already shutdown
                    for (World w : getWorlds()) {
                        w.shutdown();
                    }
                    /*for (World w : getWorlds()) {
                        while (w.getPlayerStorage().getAllCharacters().size() > 0) {
                            try {
                                Thread.sleep(1000);
                            } catch (InterruptedException ie) {
                                System.err.println("FUCK MY LIFE");
                            }
                        }
                    }
                    for (Channel ch : getAllChannels()) {
                        while (ch.getConnectedClients() > 0) {
                            try {
                                Thread.sleep(1000);
                            } catch (InterruptedException ie) {
                                System.err.println("FUCK MY LIFE");
                            }
                        }
                    }*/
                    
                    if(ServerConstants.USE_THREAD_TRACKER) ThreadTracker.getInstance().cancelThreadTrackerTask();

                    TimerManager.getInstance().purge();
                    TimerManager.getInstance().stop();

                    for (Channel ch : getAllChannels()) {
                        while (!ch.finishedShutdown()) {
                            try {
                                Thread.sleep(1000);
                            } catch (InterruptedException ie) {
                                ie.printStackTrace();
                                System.err.println("FUCK MY LIFE");
                            }
                        }
                    }
                    worlds.clear();
                    worlds = null;
                    channels.clear();
                    channels = null;
                    worldRecommendedList.clear();
                    worldRecommendedList = null;

                    System.out.println("Worlds + Channels are offline.");
                    if (!restart) {
                        System.out.println("Server has gracefully shutdown.");
                        System.out.println("This window may now be closed.");
                        System.exit(0);
                    } else {
                        System.out.println("\r\nRestarting the server....\r\n");
                        try {
                            instance.finalize();//FUU I CAN AND IT'S FREE
                        } catch (Throwable ex) {
                            ex.printStackTrace();
                        }
                        instance = null;
                        System.gc();
                        getInstance().init();//DID I DO EVERYTHING?! D:
                    }
                } finally {
                    srvLock.unlock();
                }
            }
        };
    }

    private void setupAcceptor() {
        this.acceptor = new NioSocketAcceptor();
        this.acceptor.getFilterChain().addLast("codec", (IoFilter) new ProtocolCodecFilter(new MapleCodecFactory()));
        this.acceptor.getSessionConfig().setIdleTime(IdleStatus.BOTH_IDLE, 30);
        this.acceptor.setHandler(new MapleServerHandler());
        this.acceptor.setCloseOnDeactivation(CLOSE_CONNECTIONS_ON_SHUTDOWN);
    }

    public void openServer() {
        boolean taskSuccess = false;
        logger.info("Task: {}, Status: {}", "Opening Server", "BEGIN");
        try {
            this.acceptor.bind(new InetSocketAddress(PORT));
            logger.info("Server opened on port " + PORT);
            taskSuccess = true;
        } catch (IOException ex) {
            ex.printStackTrace();
            logger.error("ERROR: Attempt to open server failed.", ex);
        } finally {
            logger.info("Task: {}, Status: {}", "Opening Server", taskSuccess ? "SUCCESS" : "FAILED");
        }
    }

    public void closeServer() {
        this.acceptor.unbind();
        logger.info("Server closed. No longer accepting connections.");
    }

    public boolean isAcceptingConnections() {
        boolean isAcceptingConnections = this.acceptor.isActive();
        logger.info("Server is {}", isAcceptingConnections ? "closed. Not accepting connections" : "open. Accepting connections");
        return isAcceptingConnections;
    }

    public String getEnvironment() {
        return environment;
    }

    public void setWorlds(List<World> worlds) {
        this.worlds = worlds;
    }

    public void setChannels(List<Map<Integer, String>> channels) {
        this.channels = channels;
    }

    public void setWorldRecommendedList(List<Pair<Integer, String>> worldRecommendedList) {
        this.worldRecommendedList = worldRecommendedList;
    }
}
