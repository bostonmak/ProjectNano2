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
Rupi- Happyville Warp NPC
**/
/*
function start() {
    cm.sendYesNo("Do you want to get out of Happyville?");
}

function action(mode, type, selection) {
    if (mode < 1)
        cm.dispose();
    else {
        var map = cm.getPlayer().getSavedLocation("HAPPYVILLE");
        if (map == -1)
                map = 101000000;
        
        cm.warp(map, 0);
    }
    
    cm.dispose();
}
*/

var item;
var common = Array(1702699, 1702698, 1072697, 1702696, 1702695, 1702694, 1702693, 1702692, 1702691, 1702690, 1702689, 1702688, 1702687, 1702686, 1702685, 1702684, 1702682, 1702681, 1702680, 1702679, 1702677, 1702676, 1702675, 1702673);
var normal = Array(1702659, 1702658, 1702657, 1702656, 1702655, 1702654, 1702653, 1702652, 1702651, 1702650, 1702644, 1702648, 1702646, 1702642, 1702640, 1702638, 1702639, 1702637, 1702635, 1702634, 1702633, 1702632, 1702631, 1702630, 1702629); 
var rare = Array(1702608, 1702607, 1702606, 1702605, 1702604, 1702603, 1702602, 1702601, 1702600, 1702599, 1702597, 1702595, 1702594, 1702593, 1702591, 1702590, 1702589, 1702588, 1702587, 1702586, 1702585, 1702584, 1702583, 1702581, 1702579);
var rare1 = Array(1702623, 1702621, 1702619, 1702616, 1702617, 1702614, 1702613, 1702612, 1702611, 1702672, 1702671, 1702668, 1702667, 1702666, 1702628, 1702627, 1702626, 1702625, 1702624, 1702577, 1702576, 1702575, 1702574, 1702572);
var rare2 = Array(1702670, 1702571, 1702570, 1702567, 1702566, 1702565, 1702564, 1702562, 1702561, 1702560, 1702559, 1702557, 1702556, 1702555, 1702554, 1702553, 1702551, 1702550, 1702549, 1702541, 1702540);

function getRandom(min, max) {
    if (min > max) {
        return(-1);
    }

    if (min == max) {
        return(min);
    }

    return(min + parseInt(Math.random() * (max - min + 1)));
}

var icommon = common[getRandom(0, common.length - 1)];
var inormal = normal[getRandom(0, normal.length - 1)];
var irare = rare[getRandom(0, rare.length - 1)];
var irare1 = rare1[getRandom(0, rare1.length - 1)];
var irare2 = rare2[getRandom(0, rare2.length - 1)];

var chance = getRandom(0, 9);

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0) {
            cm.sendOk("#rOkay, come back when you're ready to test your #eRNG!");
            cm.dispose();
            return;
        } else if (mode == 1) {
            status++;
        }

        if (status == 0) {
            cm.sendNext(" #i3991013##i3991023##i3991006##i3991000##i3991002##i3991007##i3991000##i3991015##i3991014##i3991013# \r\nHello #h #,\r\n\r\nWant to try your luck at the #r#eNX Weapon Gachapon?#n#k You can earn assorted up to date NX Weapons Remember that it will cost you #r#e10,000,000 mesos#n#k a spin! #b#eGood Luck!");
        } else if (status == 1) {
            if (cm.getMeso() >= 10000000) {
                //cm.gainMeso([-1]);
                cm.sendNext(" #eFeatured NX Items in May#e \r\n\r\n #i1702565# #i1702671#  #i1702585# #i1702593# #i1702630# #i1702695# #i1702594#\r\n ------------------------------------------------------------------------------ \r\n#i1702631# #i1702689# #i1702645# #i1702606# #i1702676# #i1702694# #i1702677# \r\n ------------------------------------------------------------------------------ \r\n #i1702603# #i1702687# #i1702602# #i1702651# #i1702601# #i1702686# #i1702600# \r\n ------------------------------------------------------------------------------ \r\n \t\t\t\t\t\#e#rGood Luck Adventurer!");
                
            } else {
                cm.sendOk("Sorry you dont have 10,000,000 mesos :(");
                cm.dispose();               
                }
        } else if (status == 2) {
        //           cm.setDailyReward('DailyGift');
                     

            if (chance > 0 && chance <= 1) {
            cm.sendOk("#b#eCongratulations!#n#k You have obtained a #b#t" + cm.gainItem(icommon, 1) + "##k #v" + icommon + "#"); 
            cm.gainMeso([-10000000]);
            } else if (chance >= 2 && chance <= 3) {
            cm.sendOk("#b#eCongratulations!#n#k You have obtained a #b#t" + cm.gainItem(inormal, 1) + "##k #v" + inormal + "#");
            cm.gainMeso([-10000000]);
            } else if (chance >=4 && chance <=5) {
            cm.sendOk("#b#eCongratulations!#n#k You have obtained a #d#t" + cm.gainItem(irare, 1) + "##k #v" + irare + "#");
            cm.gainMeso([-10000000]);
            } else if (chance >= 6 && chance <= 7) {
            cm.sendOk("#b#eCongratulations!#n#k You have obtained a #b#t" + cm.gainItem(irare1, 1) + "##k #v" + irare1 + "#");
            cm.gainMeso([-10000000]);
            } else if (chance >= 8 && chance <= 9) {
            cm.sendOk("#b#eCongratulations!#n#k You have obtained a #b#t" + cm.gainItem(irare2, 1) + "##k #v" + irare2 + "#");
            cm.gainMeso([-10000000]);
            }
            cm.dispose();
        }
    }
}