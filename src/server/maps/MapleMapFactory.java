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
package server.maps;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.awt.Point;
import java.awt.Rectangle;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Collections;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Collection;
import tools.locks.MonitoredReentrantReadWriteLock;
import java.util.concurrent.locks.ReentrantReadWriteLock;
import java.util.concurrent.locks.ReentrantReadWriteLock.ReadLock;
import java.util.concurrent.locks.ReentrantReadWriteLock.WriteLock;
import provider.MapleData;
import provider.MapleDataProvider;
import provider.MapleDataTool;
import server.PortalFactory;
import server.life.AbstractLoadedMapleLife;
import server.life.MapleLifeFactory;
import server.life.MapleMonster;
import server.partyquest.mcpq.MCWZData;
import scripting.event.EventInstanceManager;
import tools.DatabaseConnection;
import tools.StringUtil;
import tools.locks.MonitoredLockType;

public class MapleMapFactory {

    private MapleDataProvider source;
    private MapleData nameData;
    private EventInstanceManager event;
    private Map<Integer, MapleMap> maps = new HashMap<>();
    private ReadLock mapsRLock;
    private WriteLock mapsWLock;
    private int channel, world;
    private static Logger MapleLogger = LoggerFactory.getLogger(MapleMapFactory.class);

    public MapleMapFactory(EventInstanceManager eim, MapleDataProvider source, MapleDataProvider stringSource, int world, int channel) {
        this.source = source;
        this.nameData = stringSource.getData("Map.img");
        this.world = world;
        this.channel = channel;
        this.event = eim;
        
        ReentrantReadWriteLock rrwl = new MonitoredReentrantReadWriteLock(MonitoredLockType.MAP_FACTORY);
        this.mapsRLock = rrwl.readLock();
        this.mapsWLock = rrwl.writeLock();
    }
    
    public MapleMap resetMap(int mapid) {
        mapsWLock.lock();
        try {
            maps.remove(Integer.valueOf(mapid));
        } finally {
            mapsWLock.unlock();
        }
        
        return getMap(mapid);
    }
    
    private synchronized MapleMap loadMapFromWz(int mapid, Integer omapid) {
        MapleMap map;
        
        mapsRLock.lock();
        try {
            map = maps.get(omapid);
        } finally {
            mapsRLock.unlock();
        }

        if (map != null) {
            return map;
        }
        
        String mapName = getMapName(mapid);
        MapleData mapData = source.getData(mapName);
        MapleData infoData = mapData.getChildByPath("info");

        String link = MapleDataTool.getString(infoData.getChildByPath("link"), "");
        if (!link.equals("")) { //nexon made hundreds of dojo maps so to reduce the size they added links.
            mapName = getMapName(Integer.parseInt(link));
            mapData = source.getData(mapName);
        }
        float monsterRate = 0;
        MapleData mobRate = infoData.getChildByPath("mobRate");
        if (mobRate != null) {
            monsterRate = ((Float) mobRate.getData()).floatValue();
        }
        map = new MapleMap(mapid, world, channel, MapleDataTool.getInt("returnMap", infoData), monsterRate);
        map.setEventInstance(event);

        String onFirstEnter = MapleDataTool.getString(infoData.getChildByPath("onFirstUserEnter"), String.valueOf(mapid));
        map.setOnFirstUserEnter(onFirstEnter.equals("") ? String.valueOf(mapid) : onFirstEnter);

        String onEnter = MapleDataTool.getString(infoData.getChildByPath("onUserEnter"), String.valueOf(mapid));
        map.setOnUserEnter(onEnter.equals("") ? String.valueOf(mapid) : onEnter);

        map.setFieldLimit(MapleDataTool.getInt(infoData.getChildByPath("fieldLimit"), 0));
        map.setMobInterval((short) MapleDataTool.getInt(infoData.getChildByPath("createMobInterval"), 5000));
        PortalFactory portalFactory = new PortalFactory();
        for (MapleData portal : mapData.getChildByPath("portal")) {
            map.addPortal(portalFactory.makePortal(MapleDataTool.getInt(portal.getChildByPath("pt")), portal));
        }
        MapleData timeMob = infoData.getChildByPath("timeMob");
        if (timeMob != null) {
            map.timeMob(MapleDataTool.getInt(timeMob.getChildByPath("id")),
                    MapleDataTool.getString(timeMob.getChildByPath("message")));
        }

        int bounds[] = new int[4];
        bounds[0] = MapleDataTool.getInt(infoData.getChildByPath("VRTop"));
        bounds[1] = MapleDataTool.getInt(infoData.getChildByPath("VRBottom"));

        if(bounds[0] == bounds[1]) {    // old-style baked map
            MapleData minimapData = mapData.getChildByPath("miniMap");
            if(minimapData != null) {
                bounds[0] = MapleDataTool.getInt(minimapData.getChildByPath("centerX")) * -1;
                bounds[1] = MapleDataTool.getInt(minimapData.getChildByPath("centerY")) * -1;
                bounds[2] = MapleDataTool.getInt(minimapData.getChildByPath("height"));
                bounds[3] = MapleDataTool.getInt(minimapData.getChildByPath("width"));

                map.setMapPointBoundings(bounds[0], bounds[1], bounds[2], bounds[3]);
            } else {
                int dist = (1 << 18);
                map.setMapPointBoundings(-dist / 2, -dist / 2, dist, dist);
            }
        } else {
            bounds[2] = MapleDataTool.getInt(infoData.getChildByPath("VRLeft"));
            bounds[3] = MapleDataTool.getInt(infoData.getChildByPath("VRRight"));

            map.setMapLineBoundings(bounds[0], bounds[1], bounds[2], bounds[3]);
        }

        List<MapleFoothold> allFootholds = new LinkedList<>();
        Point lBound = new Point();
        Point uBound = new Point();
        for (MapleData footRoot : mapData.getChildByPath("foothold")) {
            for (MapleData footCat : footRoot) {
                for (MapleData footHold : footCat) {
                    int x1 = MapleDataTool.getInt(footHold.getChildByPath("x1"));
                    int y1 = MapleDataTool.getInt(footHold.getChildByPath("y1"));
                    int x2 = MapleDataTool.getInt(footHold.getChildByPath("x2"));
                    int y2 = MapleDataTool.getInt(footHold.getChildByPath("y2"));
                    MapleFoothold fh = new MapleFoothold(new Point(x1, y1), new Point(x2, y2), Integer.parseInt(footHold.getName()));
                    fh.setPrev(MapleDataTool.getInt(footHold.getChildByPath("prev")));
                    fh.setNext(MapleDataTool.getInt(footHold.getChildByPath("next")));
                    if (fh.getX1() < lBound.x) {
                        lBound.x = fh.getX1();
                    }
                    if (fh.getX2() > uBound.x) {
                        uBound.x = fh.getX2();
                    }
                    if (fh.getY1() < lBound.y) {
                        lBound.y = fh.getY1();
                    }
                    if (fh.getY2() > uBound.y) {
                        uBound.y = fh.getY2();
                    }
                    allFootholds.add(fh);
                }
            }
        }
        MapleFootholdTree fTree = new MapleFootholdTree(lBound, uBound);
        for (MapleFoothold fh : allFootholds) {
            fTree.insert(fh);
        }
        map.setFootholds(fTree);
        if (mapData.getChildByPath("area") != null) {
            for (MapleData area : mapData.getChildByPath("area")) {
                int x1 = MapleDataTool.getInt(area.getChildByPath("x1"));
                int y1 = MapleDataTool.getInt(area.getChildByPath("y1"));
                int x2 = MapleDataTool.getInt(area.getChildByPath("x2"));
                int y2 = MapleDataTool.getInt(area.getChildByPath("y2"));
                map.addMapleArea(new Rectangle(x1, y1, (x2 - x1), (y2 - y1)));
            }
        }

        Connection con = null;
        try {
            con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("SELECT * FROM spawns WHERE mid = ?");
            ps.setInt(1, omapid);
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                int id = rs.getInt("idd");
                int f = rs.getInt("f");
                boolean hide = false;
                String type = rs.getString("type");
                int fh = rs.getInt("fh");
                int cy = rs.getInt("cy");
                int rx0 = rs.getInt("rx0");
                int rx1 = rs.getInt("rx1");
                int x = rs.getInt("x");
                int y = rs.getInt("y");
                int mobTime = rs.getInt("mobtime");

                AbstractLoadedMapleLife myLife = giveLife(id, f, hide, fh, cy, rx0, rx1, x, y, type);

                if (type.equals("n")) {
                    map.addMapObject(myLife);
                } else if (type.equals("m")) {
                    MapleMonster monster = (MapleMonster) myLife;
                    map.addMonsterSpawn(monster, mobTime, 0);
                }
            }
        } catch (SQLException e) {

        } finally {
            if (con != null) {
                try {
                    con.close();
                } catch (SQLException e) {
                    System.out.println(e);
                }
            }
        }

        try {
            con = DatabaseConnection.getConnection();
            try (PreparedStatement ps = con.prepareStatement("SELECT * FROM playernpcs WHERE map = ?")) {
                ps.setInt(1, omapid);
                try (ResultSet rs = ps.executeQuery()) {
                    while (rs.next()) {
                        map.addMapObject(new PlayerNPCs(rs));
                    }
                }
            }

        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            if (con != null) {
                try {
                    con.close();
                } catch (SQLException e) {
                    System.out.println(e);
                }
            }
        }

        for (MapleData life : mapData.getChildByPath("life")) {
            String id = MapleDataTool.getString(life.getChildByPath("id"));
            String type = MapleDataTool.getString(life.getChildByPath("type"));
            AbstractLoadedMapleLife myLife = loadLife(life, id, type);
            if (myLife instanceof MapleMonster) {
                MapleMonster monster = (MapleMonster) myLife;
                int mobTime = MapleDataTool.getInt("mobTime", life, 0);
                int team = MapleDataTool.getInt("team", life, -1);
                if (mobTime == -1) { //does not respawn, force spawn once
                    map.spawnMonster(monster);
                } else {
                    map.addMonsterSpawn(monster, mobTime, team);
                }

                //should the map be reseted, use allMonsterSpawn list of monsters to spawn them again
                map.addAllMonsterSpawn(monster, mobTime, team);
            } else {
                map.addMapObject(myLife);
            }
        }

        if (mapData.getChildByPath("reactor") != null) {
            for (MapleData reactor : mapData.getChildByPath("reactor")) {
                String id = MapleDataTool.getString(reactor.getChildByPath("id"));
                if (id != null) {
                    MapleReactor newReactor = loadReactor(reactor, id);
                    map.spawnReactor(newReactor);
                }
            }
        }
        try {
            map.setMapName(MapleDataTool.getString("mapName", nameData.getChildByPath(getMapStringName(omapid)), ""));
            map.setStreetName(MapleDataTool.getString("streetName", nameData.getChildByPath(getMapStringName(omapid)), ""));
        } catch (Exception e) {
            if(omapid / 1000 != 1020) {     // explorer job introducion scenes
                e.printStackTrace();
                System.err.println("Not found mapid " + omapid);
            }

            map.setMapName("");
            map.setStreetName("");
        }

        map.setClock(mapData.getChildByPath("clock") != null);
        map.setEverlast(infoData.getChildByPath("everlast") != null);
        map.setTown(infoData.getChildByPath("town") != null);
        map.setHPDec(MapleDataTool.getIntConvert("decHP", infoData, 0));
        map.setHPDecProtect(MapleDataTool.getIntConvert("protectItem", infoData, 0));
        map.setForcedReturnMap(MapleDataTool.getInt(infoData.getChildByPath("forcedReturn"), 999999999));
        map.setBoat(mapData.getChildByPath("shipObj") != null);
        map.setTimeLimit(MapleDataTool.getIntConvert("timeLimit", infoData, -1));
        map.setFieldType(MapleDataTool.getIntConvert("fieldType", infoData, 0));
        map.setMobCapacity(MapleDataTool.getIntConvert("fixedMobCapacity", infoData, 500));//Is there a map that contains more than 500 mobs?

        HashMap<Integer, Integer> backTypes = new HashMap<>();
        try {
            for (MapleData layer : mapData.getChildByPath("back")) { // yolo
                int layerNum = Integer.parseInt(layer.getName());
                int btype = MapleDataTool.getInt(layer.getChildByPath("type"), 0);

                backTypes.put(layerNum, btype);
            }
        } catch (Exception e) {
            e.printStackTrace();
            // swallow cause I'm cool
        }
        
        map.setBackgroundTypes(backTypes);
        map.generateMapDropRangeCache();

        mapsWLock.lock();
        try {
            maps.put(omapid, map);
        } finally {
            mapsWLock.unlock();
        }
        
        return map;
    }
    
    public MapleMap getMap(int mapid) {
        Integer omapid = Integer.valueOf(mapid);
        MapleMap map;
        
        mapsRLock.lock();
        try {
            map = maps.get(omapid);
        } finally {
            mapsRLock.unlock();
        }
        
        return (map != null) ? map : loadMapFromWz(mapid, omapid);
    }

    public boolean isMapLoaded(int mapId) {
        mapsRLock.lock();
        try {
            return maps.containsKey(mapId);
        } finally {
            mapsRLock.unlock();
        }
    }
    private AbstractLoadedMapleLife giveLife(int id, int f, boolean hide, int fh, int cy, int rx0, int rx1, int x, int y, String type) {
        AbstractLoadedMapleLife myLife = MapleLifeFactory.getLife(id, type);
        myLife.setCy(cy);
        myLife.setF(f);
        myLife.setFh(fh);
        myLife.setRx0(rx0);
        myLife.setRx1(rx1);
        myLife.setPosition(new Point(x, y));
        myLife.setHide(hide);
        return myLife;
    }

    private AbstractLoadedMapleLife loadLife(MapleData life, String id, String type) {
        AbstractLoadedMapleLife myLife = MapleLifeFactory.getLife(Integer.parseInt(id), type);
        if(life == null) System.out.println("lf null");
        if(myLife == null) System.out.println("mlf null");
        myLife.setCy(MapleDataTool.getInt(life.getChildByPath("cy")));
        MapleData dF = life.getChildByPath("f");
        if (dF != null) {
            myLife.setF(MapleDataTool.getInt(dF));
        }
        myLife.setFh(MapleDataTool.getInt(life.getChildByPath("fh")));
        myLife.setRx0(MapleDataTool.getInt(life.getChildByPath("rx0")));
        myLife.setRx1(MapleDataTool.getInt(life.getChildByPath("rx1")));
        int x = MapleDataTool.getInt(life.getChildByPath("x"));
        int y = MapleDataTool.getInt(life.getChildByPath("y"));
        myLife.setPosition(new Point(x, y));
        int hide = MapleDataTool.getInt("hide", life, 0);
        if (hide == 1) {
            myLife.setHide(true);
        }
        return myLife;
    }

    private MapleReactor loadReactor(MapleData reactor, String id) {
        MapleReactor myReactor = new MapleReactor(MapleReactorFactory.getReactor(Integer.parseInt(id)), Integer.parseInt(id));
        int x = MapleDataTool.getInt(reactor.getChildByPath("x"));
        int y = MapleDataTool.getInt(reactor.getChildByPath("y"));
        myReactor.setPosition(new Point(x, y));
        myReactor.setDelay(MapleDataTool.getInt(reactor.getChildByPath("reactorTime")) * 1000);
        myReactor.setName(MapleDataTool.getString(reactor.getChildByPath("name"), ""));
        myReactor.resetReactorActions(0);
        return myReactor;
    }

    private String getMapName(int mapid) {
        String mapName = StringUtil.getLeftPaddedStr(Integer.toString(mapid), '0', 9);
        StringBuilder builder = new StringBuilder("Map/Map");
        int area = mapid / 100000000;
        builder.append(area);
        builder.append("/");
        builder.append(mapName);
        builder.append(".img");
        mapName = builder.toString();
        return mapName;
    }

    private String getMapStringName(int mapid) {
        StringBuilder builder = new StringBuilder();
        if (mapid < 100000000) {
            builder.append("maple");
        } else if (mapid >= 100000000 && mapid < 200000000) {
            builder.append("victoria");
        } else if (mapid >= 200000000 && mapid < 300000000) {
            builder.append("ossyria");
        } else if (mapid >= 300000000 && mapid < 400000000) {
            builder.append("elin");
        } else if (mapid >= 540000000 && mapid < 560000000) {
            builder.append("singapore");
        } else if (mapid >= 600000000 && mapid < 620000000) {
            builder.append("MasteriaGL");
        } else if (mapid >= 677000000 && mapid < 677100000) {
            builder.append("Episode1GL");
        } else if (mapid >= 670000000 && mapid < 682000000) {
            if((mapid >= 674030000 && mapid < 674040000) || (mapid >= 680100000 && mapid < 680200000)) {
                builder.append("etc");
            } else {
                builder.append("weddingGL");
            }
        } else if (mapid >= 682000000 && mapid < 683000000) {
            builder.append("HalloweenGL");
        } else if (mapid >= 683000000 && mapid < 684000000) {
            builder.append("event");
        } else if (mapid >= 800000000 && mapid < 900000000) {
            if((mapid >= 889100000 && mapid < 889200000)) {
                builder.append("etc");
            } else {
                builder.append("jp");
            }
        } else {
            builder.append("etc");
        }
        builder.append("/").append(mapid);
        return builder.toString();
    }

    public void setChannel(int channel) {
        this.channel = channel;
    }

    public void setWorld(int world) {
        this.channel = world;
    }

    public Map<Integer, MapleMap> getMaps() {
        mapsRLock.lock();
        try {
            return Collections.unmodifiableMap(maps);
        } finally {
            mapsRLock.unlock();
        }
    }
    
    public void dispose() {
        Collection<MapleMap> mapValues;
        
        mapsRLock.lock();
        try {
            mapValues = maps.values();
        } finally {
            mapsRLock.unlock();
        }
        
        for(MapleMap map: mapValues) map.setEventInstance(null);
        this.event = null;
    }
    
    public MapleMap instanceMap(int mapid, boolean respawns, boolean npcs) {
        return instanceMap(mapid, respawns, npcs, true);
    }

    public MapleMap instanceMap(int mapid, boolean respawns, boolean npcs, boolean reactors) {
        Integer omapid = Integer.valueOf(mapid);
        MapleMap map;
        String mapName = getMapName(mapid);
        MapleData mapData = source.getData(mapName);
        String link = MapleDataTool.getString(mapData.getChildByPath("info/link"), "");
        if (!link.equals("")) { //nexon made hundreds of dojo maps so to reduce the size they added links.
            mapName = getMapName(Integer.parseInt(link));
            mapData = source.getData(mapName);
        }
        float monsterRate = 0;
        MapleData mobRate = mapData.getChildByPath("info/mobRate");
        if (mobRate != null) {
            monsterRate = ((Float) mobRate.getData()).floatValue();
        }
        map = new MapleMap(mapid, world, channel, MapleDataTool.getInt("info/returnMap", mapData), monsterRate);

        String onFirstEnter = MapleDataTool.getString(mapData.getChildByPath("info/onFirstUserEnter"), String.valueOf(mapid));
        map.setOnFirstUserEnter(onFirstEnter.equals("") ? String.valueOf(mapid) : onFirstEnter);

        String onEnter = MapleDataTool.getString(mapData.getChildByPath("info/onUserEnter"), String.valueOf(mapid));
        map.setOnUserEnter(onEnter.equals("") ? String.valueOf(mapid) : onEnter);

        map.setFieldLimit(MapleDataTool.getInt(mapData.getChildByPath("info/fieldLimit"), 0));
        map.setMobInterval((short) MapleDataTool.getInt(mapData.getChildByPath("info/createMobInterval"), 5000));
        PortalFactory portalFactory = new PortalFactory();
        for (MapleData portal : mapData.getChildByPath("portal")) {
            map.addPortal(portalFactory.makePortal(MapleDataTool.getInt(portal.getChildByPath("pt")), portal));
        }
        MapleData timeMob = mapData.getChildByPath("info/timeMob");
        if (timeMob != null) {
            map.timeMob(MapleDataTool.getInt(timeMob.getChildByPath("id")),
                    MapleDataTool.getString(timeMob.getChildByPath("message")));
        }

        List<MapleFoothold> allFootholds = new LinkedList<>();
        Point lBound = new Point();
        Point uBound = new Point();
        for (MapleData footRoot : mapData.getChildByPath("foothold")) {
            for (MapleData footCat : footRoot) {
                for (MapleData footHold : footCat) {
                    int x1 = MapleDataTool.getInt(footHold.getChildByPath("x1"));
                    int y1 = MapleDataTool.getInt(footHold.getChildByPath("y1"));
                    int x2 = MapleDataTool.getInt(footHold.getChildByPath("x2"));
                    int y2 = MapleDataTool.getInt(footHold.getChildByPath("y2"));
                    MapleFoothold fh = new MapleFoothold(new Point(x1, y1), new Point(x2, y2), Integer.parseInt(footHold.getName()));
                    fh.setPrev(MapleDataTool.getInt(footHold.getChildByPath("prev")));
                    fh.setNext(MapleDataTool.getInt(footHold.getChildByPath("next")));
                    if (fh.getX1() < lBound.x) {
                        lBound.x = fh.getX1();
                    }
                    if (fh.getX2() > uBound.x) {
                        uBound.x = fh.getX2();
                    }
                    if (fh.getY1() < lBound.y) {
                        lBound.y = fh.getY1();
                    }
                    if (fh.getY2() > uBound.y) {
                        uBound.y = fh.getY2();
                    }
                    allFootholds.add(fh);
                }
            }
        }
        MapleFootholdTree fTree = new MapleFootholdTree(lBound, uBound);
        for (MapleFoothold fh : allFootholds) {
            fTree.insert(fh);
        }
        map.setFootholds(fTree);
        if (mapData.getChildByPath("area") != null) {
            for (MapleData area : mapData.getChildByPath("area")) {
                int x1 = MapleDataTool.getInt(area.getChildByPath("x1"));
                int y1 = MapleDataTool.getInt(area.getChildByPath("y1"));
                int x2 = MapleDataTool.getInt(area.getChildByPath("x2"));
                int y2 = MapleDataTool.getInt(area.getChildByPath("y2"));
                map.addMapleArea(new Rectangle(x1, y1, (x2 - x1), (y2 - y1)));
            }
        }
        MapleData mcData = mapData.getChildByPath("monsterCarnival");
        if (mcData != null) {
            MCWZData mcpqInfo = new MCWZData(mcData);
            map.setMCPQData(mcpqInfo);
            map.setRespawning(false);
        }
        try {
            Connection con = DatabaseConnection.getConnection();
            con.setReadOnly(true);
            try (PreparedStatement ps = con.prepareStatement("SELECT * FROM playernpcs WHERE map = ?")) {
                ps.setInt(1, omapid);
                try (ResultSet rs = ps.executeQuery()) {
                    while (rs.next()) {
                        map.addMapObject(new PlayerNPCs(rs));
                    }
                    rs.close();
                }
            }
        } catch (Exception e) {
            MapleLogger.warn("Monster Carnival NPC Exception", e);
        }
        for (MapleData life : mapData.getChildByPath("life")) {
            String id = MapleDataTool.getString(life.getChildByPath("id"));
            String type = MapleDataTool.getString(life.getChildByPath("type"));
            if (id.equals("9001105")) {
                id = "9001108";//soz
            }
            AbstractLoadedMapleLife myLife = loadLife(life, id, type);
            if (myLife instanceof MapleMonster) {
                MapleMonster monster = (MapleMonster) myLife;
                int mobTime = MapleDataTool.getInt("mobTime", life, 0);
                int team = MapleDataTool.getInt("team", life, -1);
                if (mobTime == -1) { //does not respawn, force spawn once
                    map.spawnMonster(monster);
                } else {
                    map.addMonsterSpawn(monster, mobTime, team);
                }
            } else {
                map.addMapObject(myLife);
            }
        }
        if (mapData.getChildByPath("reactor") != null) {
            for (MapleData reactor : mapData.getChildByPath("reactor")) {
                String id = MapleDataTool.getString(reactor.getChildByPath("id"));
                if (id != null) {
                    MapleReactor newReactor = loadReactor(reactor, id);
                    map.spawnReactor(newReactor);
                }
            }
        }
        try {
            map.setMapName(MapleDataTool.getString("mapName", nameData.getChildByPath(getMapStringName(omapid)), ""));
            map.setStreetName(MapleDataTool.getString("streetName", nameData.getChildByPath(getMapStringName(omapid)), ""));
        } catch (Exception e) {
            map.setMapName("");
            map.setStreetName("");
        }

        map.setClock(mapData.getChildByPath("clock") != null);
        map.setEverlast(mapData.getChildByPath("everlast") != null);
        map.setTown(mapData.getChildByPath("info/town") != null);
        map.setHPDec(MapleDataTool.getIntConvert("info/decHP", mapData, 0));
        map.setHPDecProtect(MapleDataTool.getIntConvert("info/protectItem", mapData, 0));
        map.setForcedReturnMap(MapleDataTool.getInt(mapData.getChildByPath("info/forcedReturn"), 999999999));
        map.setBoat(mapData.getChildByPath("shipObj") != null);
        map.setTimeLimit(MapleDataTool.getIntConvert("timeLimit", mapData.getChildByPath("info"), -1));
        map.setFieldType(MapleDataTool.getIntConvert("info/fieldType", mapData, 0));
        map.setMobCapacity(MapleDataTool.getIntConvert("fixedMobCapacity", mapData.getChildByPath("info"), 500));//Is there a map that contains more than 500 mobs?

        HashMap<Integer, Integer> backTypes = new HashMap<>();
        try {
            for (MapleData layer : mapData.getChildByPath("back")) { // yolo
                int layerNum = Integer.parseInt(layer.getName());
                int type = MapleDataTool.getInt(layer.getChildByPath("type"), 0);

                backTypes.put(layerNum, type);
            }
        } catch (Exception e) {
            MapleLogger.warn("Maple Map Layer Exception", e);
        }
        map.setBackgroundTypes(backTypes);
        // this is so terrible why are there 2 copies of the same map stored in different places
        map.setxLimits(getMap(mapid).getxLimits());
        return map;
    }
}
