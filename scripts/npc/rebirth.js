/*
    This script is for the Rebirth feature of ProjectNano
    It is intended to be used with the @rebirth command
*/

var JOB_BEGINNER_NAME = "Beginner";
var JOB_NOBLESSE_NAME = "Noblesse";
var JOB_LEGEND_NAME = "Legend";
var STARTING_JOBS = [JOB_BEGINNER_NAME, JOB_NOBLESSE_NAME, JOB_LEGEND_NAME];
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
var GOLDEN_MAPLE_LEAF_ID = 4001168;
var NUMBER_OF_ITEMS_REQUIRED_TO_REBIRTH = 1;
var NAME_OF_ITEM_REQUIRED_TO_REBIRTH = "Golden Maple Leaf";

function start() {
    status = -1
    writeJobSelections();
    action(1, 0, 0);
}

function action(mode, type, selection) {
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
            var sendStr = "Which job will you rebirth into? \r\n\r\n#b";

            for (var i = 0; i < STARTING_JOBS.length; i++) {
                sendStr += "#L" + i + "#" + STARTING_JOBS[i] + "#l\r\n";
            }

            cm.sendSimple(sendStr);
        } else if (status === 1) {
            if (cm.getPlayer().isMaxLevel()) {
                if (cm.getPlayer().haveItemWithId(GOLDEN_MAPLE_LEAF_ID, false)) {
                    if (selection === 0) {
                        cm.getPlayer().rebirthToBeginner();
                        cm.dispose();
                    } else if (selection === 1) {
                        cm.getPlayer().rebirthToNoblesse();
                        cm.dispose();
                    } else if (selection === 2) {
                        cm.getPlayer().rebirthToLegend();
                        cm.dispose();
                    }
                } else {
                    cm.sendOk("You cannot rebirth. You are missing " + NUMBER_OF_ITEMS_REQUIRED_TO_REBIRTH + " " + NAME_OF_ITEM_REQUIRED_TO_REBIRTH + ".")
                }
            } else {
                cm.sendOk("You cannot rebirth. You do not meet the level requirement to rebirth.");
            }
        } else {
            cm.dispose();
        }
    }
}