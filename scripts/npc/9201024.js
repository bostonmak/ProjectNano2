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
 *9201024 - Nana(E)
 *@author Jvlaple
 */
 
//function start() {
  //  cm.sendOk("Hi, I'm Nana the love fairy... How's it going?");
   // cm.dispose();
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
//            if (!cm.haveItem(4003005, 20)) {
//                if (status == 0) {
//                    cm.sendNext("Hey, you look like you need proofs of love? I can get them for you.");
//                } else if (status == 1) {
//                    cm.sendNext("All you have to do is bring me 20 #bSoft Feathers#k.");
//                    cm.dispose();
//                }
//            } else {
//                if (status == 0) {
//                    cm.sendNext("Wow, you were quick! Heres the proof of love...");
//                    cm.gainItem(4003005, -20)
//                    cm.gainItem(4031368, 1);
//                    cm.dispose();
//                }
//            }
//        } else {
//            cm.sendOk("Hi, I'm Nana the love fairy... Hows it going?");
//            cm.dispose();
//        }
//    }
//}
/*
function start() {
    cm.sendYesNo("Want me to max some of your skills? I can allow you to have Max Legendary Spirit, Monster Rider, Echo of the Hero, Follow the Leader(Multi-Pet), Maker skill for crafting, and Maple Warrior!");
}

function action(mode, type, selection) {
        cm.teachSkill(1003,1,1); //Legendary Spirit
        //cm.teachSkill(1004,1,1); //Monster Rider
       // cm.teachSkill(1005,1,1); //Echo of Hero
       // cm.teachSkill(1002,1,1); //Nimble Feet
       // cm.teachSkill(1001,1,1); //Recovery
       // cm.teachSkill(1000,1,1); //Three Snails
      cm.teachskill(1009,1,1); //Maker Skill
      //  cm.teachSkill(8,1,1); //Follow the Lead
      //  cm.changeSkillLevel(21121000,30,30); // Maple Warrior

cm.dispose();
        }
*/
/*
@    Author : Snow
@
@    NPC = NAME
@    Map =  MAP
@    NPC MapId = MAPID
@    Function = Rebirth Player
@
*/

var status = 0;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {

         
         if (mode == -1) {//ExitChat
        cm.dispose();
    
    }else if (mode == 0){//No
        cm.sendOk("Ok, talk to me when your sure you want to #bRebirth#k.");
        cm.dispose();

    }else{            //Regular Talk
        if (mode == 1)
            status++;
        else
            status--;
        
                 if (status == 0) {
        cm.sendYesNo("Welcome, great hero. You have been through a long and challenging road, and you have become immensely strong. If you bring me a Maple Coin,I can use my magic to increase your power even further, and surpass your limits! You will become a level 1 Beginner again, but you will keep your stats the same and all the Skill in you Hot Keys. Do you wish to be reborn? #b(Note: Please Make Sure you Have Room for all your Equipment in your Inventory. Also Make Sure you use all your SP. As it won't Be useable in your next Job. )#k" );
        }else if (status == 1) {
        if(cm.getPlayer().getLevel() < 200){
        cm.sendOk("Sorry, You have to be level 200 to rebirth.");
        cm.dispose();
        }else{
        cm.sendOk("#bGood-Job#k, you have qualified for a #eRebirth#n.");
        }
         }else if (status == 2) {
        cm.getPlayer().setLevel(2);
        cm.changeJobById(0);
    cm.resetStats();
        cm.sendNext("Enjoy your rebirth!(Note: You will have to Change Channels For the Full Effect to Take Place.PLEASE MAKE SURE TO SET YOUR AP BEFORE LEVELING USING any of the following @luk @int @str @dex.");
        cm.dispose();
        }            
          }
     }