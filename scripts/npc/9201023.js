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
/**
 *9201023 - Nana(K)
 *@author Jvlaple
 */
 
//function start() {
  //  cm.sendOk("Hi, I'm Nana the love fairy... Hows it going?");
    //cm.dispose();
//}
//
//function action(mode, type, selection) {
//    if (mode == -1) {
//        cm.dispose();
//    } else {
//        if (mode == 0 && status == 0) {
//            cm.dispose();
//            return;
//        }
//        if (mode == 1)
//            status++;
//        else
//            status--;
//        if (cm.getPlayer().getMarriageQuestLevel() == 1 || cm.getPlayer().getMarriageQuestLevel() == 52) {
//            if (!cm.haveItem(4000083, 20)) {
//                if (status == 0) {
//                    cm.sendNext("Hey, you look like you need proofs of love? I can get them for you.");
//                } else if (status == 1) {
//                    cm.sendNext("All you have to do is bring me 20 #bJr. Sentinel Pieces.#k.");
//                    cm.dispose();
//                }
//            } else {
//                if (status == 0) {
//                    cm.sendNext("Wow, you were quick! Heres the proof of love...");
//                    cm.gainItem(4000083, -20)
//                    cm.gainItem(4031369, 1);
//                    cm.dispose();
//                }
//            }
//        } else {
//            cm.sendOk("Hi, I'm Nana the love fairy... Hows it going?");
//            cm.dispose();
//        }
//    }
//}
// edited by LightRyuzaki for ProjectNano
var status = -1;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.sendOk("Are you sure? Scaredy cat");
        cm.dispose();
    } else {
        if (mode == 1) status++;
        else status--;
        if (status == 0) {
            cm.sendSimple("Hello #h # ! I am the boss summoner NPC of ProjectNano! Each boss monster that I summon will cost some #b#v4001126##k's! You can get them by trading 1billion mesos in the free market. Would you like me to spawn some #e Special Boss Monsters #n for you? \r\n Please choose #b\r\n#L1#Papulatus clock #b#v4001126##k*1 #l\r\n#L2#Pianus #b#v4001126##k * 1#l\r\n#L3#Black Crow #b#v4001126##k * 1#l\r\n#L4#Anego #b#v4001126##k * 1#l\r\n#L5#BodyGuard A #b#v4001126##k *1#l\r\n#L6#Bodyguard B #b#v4001126##k * 1#l\r\n#L7#The Boss #b#v4001126##k * 1#l#k");
        } else {
            if (selection == 1) {
        if(cm.haveItem(4001126, 1)) {
        cm.gainItem(4001126,-1); 
                cm.spawnMonster(8500001);
                } else{
        cm.sendOk("Sorry, you don't have enough #b#v4001126##k!'s to summon Papulatus");
        }
        cm.dispose();
            } else if (selection == 2) {
        if(cm.haveItem(4001126, 1)) {
        cm.gainItem(4001126,-1); 
                cm.spawnMonster(8510000);
                } else{
        cm.sendOk("Sorry, you don't have enough #b#v4001126##k!'s to summon Pianus");
        }
        cm.dispose();
            } else if (selection == 3) {
        if(cm.haveItem(4001126, 1)) {
        cm.gainItem(4001126,-1); 
                cm.spawnMonster(9400014);
                } else{
        cm.sendOK("Sorry, you don't have enough #b#v4001126##k!'s to summon Black Crow");
        }
        cm.dispose();
            } else if (selection == 4) {
        if(cm.haveItem(4001126, 1)) {
        cm.gainItem(4001126,-1); 
                cm.spawnMonster(9400121);
                } else{
        cm.sendOk("Sorry, you don't have enough #b#v4001126##k!'s to summon Anego");
        }
        cm.dispose();
            } else if (selection == 5) {
        if(cm.haveItem(4001126, 1)) {
        cm.gainItem(4001126,-1); 
                cm.spawnMonster(9400112);
                } else{
        cm.sendOk("Sorry, you don't have enough #b#v4001126##k!'s to summon Bodyguard A");
        }
        cm.dispose();
            } else if (selection == 6) {
        if(cm.haveItem(4001126, 1)) {
        cm.gainItem(4001126,-1); 
                cm.spawnMonster(9400113);
                } else{
        cm.sendOk("Sorry, you don't have enough #b#v4001126##k!'s to summon Bodyguard B");
        }
        cm.dispose();
            } else if (selection == 7) {
        if(cm.haveItem(4001126, 1)) {
        cm.gainItem(4001126,-1); 
                cm.spawnMonster(9400300);
                } else{
        cm.sendOk("Sorry, you don't have enough #b#v4001126##k!'s to summon The Boss");
        }
        cm.dispose();
            } else {
                cm.dispose();
            }
        }
    }
}  