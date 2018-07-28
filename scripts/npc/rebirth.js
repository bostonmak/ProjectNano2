/*
    This script is for the Rebirth feature of ProjectNano
    It is intended to be used with the @rebirth command
*/

importPackage(Packages.constants);
importPackage(Packages.client);
importPackage(Packages.controller);

var RebirthController = RebirthController.getInstance();
var JOB_BEGINNER_NAME = "Beginner";
var JOB_NOBLESSE_NAME = "Noblesse";
var JOB_LEGEND_NAME = "Legend";
var STARTING_JOBS = [JOB_BEGINNER_NAME, JOB_NOBLESSE_NAME, JOB_LEGEND_NAME];
var WARRIOR_JOBS = [GameConstants.Job.WARRIOR, GameConstants.Job.DAWNWARRIOR1, GameConstants.Job.ARAN1];
var MAGICIAN_JOBS = [GameConstants.Job.MAGICIAN, GameConstants.Job.BLAZEWIZARD1];
var BOWMAN_JOBS = [GameConstants.Job.BOWMAN, GameConstants.Job.WINDARCHER1];
var THIEF_JOBS = [GameConstants.Job.THIEF, GameConstants.Job.NIGHTWALKER1];
var PIRATE_JOBS = [GameConstants.Job.PIRATE, GameConstants.Job.THUNDERBREAKER1];

var commandArray = [];
var descriptionArray = [];
var comm_cursor, desc_cursor;

function addCommand(comm, desc) {
    comm_cursor.push(comm);
    desc_cursor.push(desc);
}
function writeJobSelections() {
    comm_cursor = commandArray;
    desc_cursor = descriptionArray;

    addCommand(JOB_BEGINNER_NAME, "");
    addCommand(JOB_NOBLESSE_NAME, "");
    addCommand(JOB_LEGEND_NAME, "");
}

var status;

function start() {
    status = -1
    writeJobSelections();
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (!ServerConstants.isRebirthEnabled()) {
        mode = -1;
        status = -1;
        cm.sendOk("I'm terribly sorry. Rebirthing has been disabled.");
        cm.dispose();
        return;
    }
    if (mode === -1) {
        cm.dispose();
    } else {
        if (mode === 0 && type > 0) {
            cm.dispose();
            return;
        }

        if (mode === 1) {
            status++;
        } else {
            status--;
        }

        if (status === 0) {
            var sendStr = "\"My child, your time has come. Choose your destiny...\" \r\n\r\n";
            sendStr += "#eRebirth \"Destiny\" System\r\n";
            sendStr += "#nYou may only choose one path for rebirthing. You may not switch paths once rebirthed.\r\n";

            sendStr += "#L0##bThe Path of Enlightenment#l\r\n";
            sendStr += "#L1##bThe Path of Enforcement#l\r\n";

            cm.sendSimple(sendStr);
        } else if (status === 1) {
            if (selection === 0) {
                // Player has selected The Path of Enlightenment
                var sendStr = "\"That is a good choice, my child. Are you prepared?\"\r\n\r\n";
                sendStr += "#eThe Path of Enlightenment\r\n";
                sendStr += "#nYou may rebirth into any job. Your AP is refunded. You gain 1 AP per level.\r\n";

                sendStr += "#L0##bGo down this path#l\r\n";

                cm.sendSimple(sendStr);
            } else if (selection === 1) {
                // Player has selected The Path of Enforcement
                var sendStr = "\"That is a good choice, my child. Are you prepared?\"\r\n\r\n";
                sendStr += "#eThe Path of Enforcement\r\n";
                sendStr += "#nRebirth into the same job tree (e.g. Dark Knight must rebirth into another Warrior job). AP is NOT refunded. You gain 3 AP per level.\r\n";

                sendStr += "#L1##bGo down this path#l\r\n";

                cm.sendSimple(sendStr);
            }
        } else if (status === 2) {
            if (cm.getPlayer().isMaxLevel()) {
                if (selection === 0) {
                    var sendStr = "Which job will you rebirth into? \r\n\r\n#b";
                    for (var i = 0; i < STARTING_JOBS.length; i++) {
                        sendStr += "#L" + i + "#" + STARTING_JOBS[i] + "#l\r\n";
                    }
                    cm.sendSimple(sendStr);
                } else if (selection === 1) {
                    var sendStr = "Which job will you rebirth into? \r\n\r\n#b";

                    // Default to selectionIndex to 3 since the above already has 0-2
                    // Numbers are inclusive
                    // Warriors 3, 4, 5
                    // Magician 6 & 7
                    // Bowman 8 & 9
                    // Thief 10-11
                    // Pirate 12-13
                    var selectionIndex = 3;
                    var jobArray = [];
                    if (MapleJob.WARRIOR == cm.getPlayer().getClassOfJob()) {
                        jobArray = WARRIOR_JOBS;
                        selectionIndex = 3;
                    } else if (MapleJob.MAGICIAN == cm.getPlayer().getClassOfJob()) {
                        jobArray = MAGICIAN_JOBS;
                        selectionIndex = 6;
                    } else if (MapleJob.BOWMAN == cm.getPlayer().getClassOfJob()) {
                        jobArray = BOWMAN_JOBS;
                        selectionIndex = 8;
                    } else if (MapleJob.THIEF == cm.getPlayer().getClassOfJob()) {
                        jobArray = THIEF_JOBS;
                        selectionIndex = 10;
                    } else if (MapleJob.PIRATE == cm.getPlayer().getClassOfJob()) {
                        jobArray = PIRATE_JOBS;
                        selectionIndex = 12;
                    }
                    for (var i = 0; i < jobArray.length; i++) {
                        sendStr += "#L" + i + selectionIndex + "#" + jobArray[i] + "#l\r\n";
                    }
                    cm.sendSimple(sendStr);
                }
            } else {
                cm.sendOk("You do not meet the level requirement. Talk to me again once you have reached the apex.");
                cm.dispose();
            }
        } else if (status === 3) {
            // Check for correct items
            if (
                !(cm.getPlayer().haveItemWithId(GameConstants.getItemIdUsedForRebirth(), false)) ||
                !(cm.getPlayer().getItemQuantity(GameConstants.getItemIdUsedForRebirth(), false) >= cm.getPlayer().getNumberOfItemsRequiredToRebirth())
            ) {
                cm.sendOk("You cannot rebirth. You are missing " + cm.getPlayer().getNumberOfItemsRequiredToRebirth() + " " + GameConstants.getItemNameUsedForRebirth() + ".")
                cm.dispose();
            } else {
                var job;
                if (selection === 0) {
                    job = MapleJob.BEGINNER;
                } else if (selection === 1) {
                    job = MapleJob.NOBLESSE;
                    cm.warp(130030000, 0);
                } else if (selection === 2) {
                    job = MapleJob.LEGEND;
                } else if (selection === 3) {
                    job = MapleJob.WARRIOR;
                } else if (selection === 4) {
                    job = MapleJob.DAWNWARRIOR1;
                } else if (selection === 5) {
                    job = MapleJob.ARAN1;
                } else if (selection === 6) {
                    job = MapleJob.MAGICIAN
                } else if (selection === 7) {
                    job = MapleJob.BLAZEWIZARD1;
                } else if (selection === 8) {
                    job = MapleJob.BOWMAN;
                } else if (selection === 9) {
                    job = MapleJob.WINDARCHER1;
                } else if (selection === 10) {
                    job = MapleJob.THIEF;
                } else if (selection === 11) {
                    job = MapleJob.NIGHTWALKER1;
                } else if (selection === 12) {
                    job = MapleJob.PIRATE;
                } else if (selection === 13) {
                    job = MapleJob.THUNDERBREAKER1;
                } else {
                    cm.dispose();
                }

                RebirthController.rebirth(cm.getPlayer(), job);
                cm.dispose();
            }
        } else {
            cm.dispose();
        }
    }
}