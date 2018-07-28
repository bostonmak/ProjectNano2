package controller;

import client.MapleCharacter;
import client.MapleJob;
import client.MapleStat;
import constants.ExpTable;
import constants.GameConstants;
import constants.ItemConstants;
import constants.RebirthPath;
import net.server.Server;
import server.MapleInventoryManipulator;
import tools.MaplePacketCreator;
import tools.Pair;

import java.util.ArrayList;
import java.util.List;

/**
 * Entrypoint from rebirth.js
 *
 * Handles rebirth of Maple Character on the server
 */
public class RebirthController {
    public RebirthController instance = null;

    private static final String PATH_OF_ENLIGHTENMENT = "Path of Enlightenment";
    private static final String PATH_OF_ENFORCEMENT = "Path of Enforcement";
    private static final int STARTING_HP_FOR_LEVEL_8 = 98;
    private static final int STARTING_HP_FOR_LEVEL_10 = 126;
    private static final int AP_REFUND_FIRST_REBIRTH = 1000;

    private int setPlayerLevelTo;
    private int setApGainTo;
    private int giveHP;
    private int setExpTo;
    private int setRemainingAPTo;
    private int setMaxHPTo;
    private RebirthPath chosenPath;

    private RebirthController() { }

    public RebirthController getInstance() {
        if (this.instance == null) {
            this.instance = new RebirthController();
        }
        return this.instance;
    }

    public void rebirth(MapleCharacter mapleCharacter, MapleJob mapleJob) {
        switch (mapleJob) {
            case BEGINNER:
            case NOBLESSE:
            case LEGEND: {
                this.setPlayerLevelTo = 1;
                this.setApGainTo = 1;
                this.giveHP = 250;
                this.setMaxHPTo = GameConstants.STARTING_MAX_HP + giveHP;
                this.setExpTo = 0;
                this.chosenPath = RebirthPath.ENLIGHTENMENT;
                this.setRemainingAPTo = getApRefund(mapleCharacter);
                break;
            }
            case WARRIOR:
            case MAGICIAN:
            case BOWMAN:
            case THIEF:
            case PIRATE: {
                this.setPlayerLevelTo = 10;
                this.setApGainTo = 3;
                this.giveHP = GameConstants.STARTING_MAX_HP + STARTING_HP_FOR_LEVEL_10 + 1000;
                this.chosenPath = RebirthPath.ENFORCEMENT;
                this.setRemainingAPTo = mapleCharacter.getRemainingAp();
                if (mapleJob == MapleJob.MAGICIAN) {
                    this.setPlayerLevelTo = 8;
                    this.giveHP = GameConstants.STARTING_MAX_HP + STARTING_HP_FOR_LEVEL_8 + 500;
                } else if (mapleJob == MapleJob.WARRIOR) {
                    this.giveHP = GameConstants.STARTING_MAX_HP + STARTING_HP_FOR_LEVEL_10 + 1250;
                }
                this.setMaxHPTo = giveHP;
                this.setExpTo = ExpTable.getExpNeededForLevel(this.setPlayerLevelTo);
                break;
            }
        }

        mapleCharacter.setLevel(this.setPlayerLevelTo);
        mapleCharacter.setExp(this.setExpTo);
        mapleCharacter.setJob(mapleJob);
        mapleCharacter.setRemainingAp(this.setRemainingAPTo);
        mapleCharacter.setApGain(this.setApGainTo);
        mapleCharacter.setRebirths(mapleCharacter.getRebirths() + 1);
        mapleCharacter.setMaxHp(this.setMaxHPTo);
        mapleCharacter.setApGain(this.setApGainTo);
        mapleCharacter.setRebirthPath(chosenPath);

        List<Pair<MapleStat, Integer>> rebirthStats = new ArrayList<>();
        rebirthStats.add(new Pair<>(MapleStat.LEVEL, this.setPlayerLevelTo));
        rebirthStats.add(new Pair<>(MapleStat.EXP, this.setExpTo));
        rebirthStats.add(new Pair<>(MapleStat.JOB, mapleJob.getId()));
        rebirthStats.add(new Pair<>(MapleStat.AVAILABLEAP, this.setRemainingAPTo));
        rebirthStats.add(new Pair<>(MapleStat.MAXHP, this.setMaxHPTo));
        mapleCharacter.announce(MaplePacketCreator.updatePlayerStats(rebirthStats, mapleCharacter));

        MapleInventoryManipulator.removeById(
                mapleCharacter.getClient(),
                ItemConstants.getInventoryType(GameConstants.getItemIdUsedForRebirth()),
                GameConstants.getItemIdUsedForRebirth(),
                mapleCharacter.getNumberOfItemsRequiredToRebirth(),
                false,
                false
        );

        final String chosenPathName = this.chosenPath == RebirthPath.ENLIGHTENMENT ? PATH_OF_ENLIGHTENMENT : PATH_OF_ENFORCEMENT;
        final String REBIRTH_NOTICE_MESSAGE = "[Notice] " + mapleCharacter.getName() + " has rebirthed to the " + chosenPathName + "! They have rebirthed " + mapleCharacter.getRebirths() + " time(s)!";
        Server.getInstance().broadcastMessage(
                mapleCharacter.getWorld(),
                MaplePacketCreator.serverNotice(6, REBIRTH_NOTICE_MESSAGE)
        );
    }

    private int getApRefund(MapleCharacter mapleCharacter) {
        if (mapleCharacter.getRebirths() == 0) {
            return AP_REFUND_FIRST_REBIRTH;
        }

        int apToRefund = 0;
        apToRefund += mapleCharacter.getStr() - 4;
        apToRefund += mapleCharacter.getDex() - 4;
        apToRefund += mapleCharacter.getInt() - 4;
        apToRefund += mapleCharacter.getLuk() - 4;
        apToRefund += mapleCharacter.getHpMpApUsed();

        return apToRefund;
    }
}