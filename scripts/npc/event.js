/*
Credits go to Travis of DeanMS ( xKillsAlotx on RaGEZONE)
Item Exchanger for scrolls

Modified by SharpAceX (Alan) for MapleSolaxia
*/

importPackage(Packages.tools);

var status = 0;
var tetrispiece = 4030002;
var chairs = new Array(3010000, 3010001, 3010002, 3010003, 3010004, 3010005, 3010006, 3010007, 3010008, 3010009, 3010010, 3010011, 3010012, 3010013, 3010015, 3010016, 3010017, 3010018, 3010019, 3010022, 3010023, 3010024, 3010025, 3010026, 3010028, 3010040, 3010041, 3010043, 3010045, 3010046, 3010047,3010057,3010058,3010060,3010061,3010062,3010063, 3010064,3010065,3010066,3010067,3010069,3010071,3010072,3010073,3010080,3010081,3010082,3010083, 3010084,3010085,3010097,3010098,3010099,3010101,3010106,3010116,3011000,3012005,3012010,3012011,3010038,3010161,3010175,3010177,3010191,3010225, 03010230, 3010299, 3010457, 3010459, 3010490, 3010491, 3010492, 3010529, 011000,018001, 3018002, 3018004, 3018006, 3019095);
var scrolls = new Array(2040603,2044503,2041024,2041025,2044703,2044603,2043303,2040807,2040806,2040006,2040007,2043103,2043203,2043003,2040506,2044403,2040903,2040709,2040710,2040711,2044303,2043803,2040403,2044103,2044203,2044003,2043703);
var weapons = new Array(1302020, 1302030, 1302033, 1302058, 1302064, 1302080, 1312032, 1322054, 1332025, 1332055, 1332056, 1372034, 1382009, 1382012, 1382039, 1402039, 1412011, 1412027, 1422014, 1422029, 1432012, 1432040, 1432046, 1442024, 1442030, 1442051, 1452016, 1452022, 1452045, 1462014, 1462019, 1462040, 1472030, 1472032, 1472055, 1482020, 1482021, 1482022, 1492020, 1492021, 1492022, 1092030, 1092045, 1092046, 1092047);

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1)
        cm.dispose();
    else {
        if (mode == 0 && status == 0)
            cm.dispose();
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
            cm.sendSimple("Hello#b #h ##k! I am the tetris event NPC! You have: #b#c4030002# #v4030002##k \r\nTrade 100 Tetris for: \r\n#k#L1# #v1003271#\r\n\#L2# #v1012057##l\r\n\#L3# #v1032024##l\r\n#L4##v1092064##l\r\n#L5##v1702585##l\r\n \r\nTrade 200 Tetris for:\r\n#L6##v5000118##l\r\n#L7##v5000089##l\r\n#L8##v5000090##l\r\n#L9##v5000091##l\r\n \r\nTrade 1000 Tetris for:\r\n#L10##v1142249##l");
        } else if (status == 1) {
            if (selection == 1) {
               if(cm.haveItem(tetrispiece, 100)) {
					var transparenthat = 1003271;
					if(!cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).isFull(2)){
						cm.gainItem(transparenthat, 1);
						cm.gainItem(tetrispiece, -100);
						cm.sendOk("Here is your Transparent Hat, enjoy!");
						cm.logLeaf("1 Magic Mitten");
					} else {
						cm.sendOk("Please make sure you have enough space to hold these items!");
					}
                 } else {
                    cm.sendOk("Sorry, you don't have enough tetris pieces!");
				}
                cm.dispose();
            } else if (selection == 2) {
                if(cm.haveItem(tetrispiece, 100)) {
					var transparentface = 1012057;
					if(!cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).isFull(2)){
						cm.gainItem(transparentface, 1);
						cm.gainItem(tetrispiece, -100);
						cm.sendOk("Here is your Transparent Face Accessory, enjoy!!");
						cm.logLeaf("1 Magic Mitten");
					} else {
						cm.sendOk("Please make sure you have enough space to hold these items!");
					}
                 } else {
                    cm.sendOk("Sorry, you don't have enough tetris pieces!");
				}
                cm.dispose();
			} else if (selection == 3) {
                if(cm.haveItem(tetrispiece, 100)) {
					var transparentearring = 1032024;
					if(!cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).isFull(2)){
						cm.gainItem(transparentearring, 1);
						cm.gainItem(tetrispiece, -100);
						cm.sendOk("Here is your Transparent Earring, enjoy!");
						cm.logLeaf("1 Magic Mitten");
					} else {
						cm.sendOk("Please make sure you have enough space to hold these items!");
					}
                 } else {
                    cm.sendOk("Sorry, you don't have enough tetris pieces!");
				}
                cm.dispose();
			 
            } else if(selection == 4) {
				if(cm.haveItem(tetrispiece, 100)) {
					var transparentshield = 1092064;
					if(!cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).isFull(2)){
						cm.gainItem(transparentshield, 1);
						cm.gainItem(tetrispiece, -100);
						cm.sendOk("Here is your Transparent Shield, enjoy!");
						cm.logLeaf("1 Magic Mitten");
					} else {
						cm.sendOk("Please make sure you have enough space to hold these items!");
					}
                 } else {
                    cm.sendOk("Sorry, you don't have enough tetris pieces!");
				}
                cm.dispose();
			}
else if (selection == 5) {
               if(cm.haveItem(tetrispiece, 100)) {
					var transparentweapon = 1702585;
					if(!cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).isFull(2)){
						cm.gainItem(transparentweapon, 1);
						cm.gainItem(tetrispiece, -100);
						cm.sendOk("Here is your Transparent Universal Weapon, enjoy!");
						cm.logLeaf("1 Magic Mitten");
					} else {
						cm.sendOk("Please make sure you have enough space to hold these items!");
					}
                 } else {
                    cm.sendOk("Sorry, you don't have enough tetris pieces!");
				}
                cm.dispose();
            }	
else if (selection == 7) {
                if(cm.haveItem(tetrispiece, 200)) {
					var mirpet = 5000089;
					if(!cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).isFull(2)){
						cm.gainItem(mirpet, 1);
						cm.gainItem(tetrispiece, -200);
						cm.sendOk("Here is your pet Mir, enjoy!");
						cm.logLeaf("1 Magic Mitten");
					} else {
						cm.sendOk("Please make sure you have enough space to hold these items!");
					}
                 } else {
                    cm.sendOk("Sorry, you don't have enough tetris pieces!");
				}
                cm.dispose();
            }	
else if (selection == 6) {
                if(cm.haveItem(tetrispiece, 200)) {
					var tirpet = 5000118;
					if(!cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.CASH).isFull(2)){
						cm.gainItem(tirpet, 1);
						cm.gainItem(tetrispiece, -200);
						cm.sendOk("Here is your pet Tir, enjoy!");
						cm.logLeaf("1 Eye of Fire");
					} else {
						cm.sendOk("Please make sure you have enough space to hold these items!");
					}
                 } else {
                    cm.sendOk("Sorry, you don't have enough tetris pieces!");
				}
                cm.dispose();
            }
 else if (selection == 8) {
                if(cm.haveItem(tetrispiece, 200)) {
					var galielpet = 5000090;
					if(!cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).isFull(2)){
						cm.gainItem(galielpet, 1);
						cm.gainItem(tetrispiece, -200);
						cm.sendOk("Here is your pet galiel, enjoy!");
						cm.logLeaf("1 Magic Mitten");
					} else {
						cm.sendOk("Please make sure you have enough space to hold these items!");
					}
                 } else {
                    cm.sendOk("Sorry, you don't have enough tetris pieces!");
				}
                cm.dispose();
            }	
 else if (selection == 9) {
                if(cm.haveItem(tetrispiece, 200)) {
					var eselpet = 5000084;
					if(!cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).isFull(2)){
						cm.gainItem(eselpet, 1);
						cm.gainItem(tetrispiece, -200);
						cm.sendOk("Here is your pet esel, enjoy!");
						cm.logLeaf("1 Magic Mitten");
					} else {
						cm.sendOk("Please make sure you have enough space to hold these items!");
					}
                 } else {
                    cm.sendOk("Sorry, you don't have enough tetris pieces!");
				}
                cm.dispose();
            }
else if (selection == 10) {
                if(cm.haveItem(tetrispiece, 1000)) {
					var luckyguymedal = 1142249;
					if(cm.haveItem(luckyguymedal, 1)){
						cm.sendOk("Sorry you can only have 1 Lucky Guy Medal");
					}
					else if(!cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).isFull(2)){
						cm.gainItem(luckyguymedal, 1);
						cm.gainItem(tetrispiece, -1000);
						cm.sendOk("Wtf how do you have 1k tetris pieces, please go outside!");
						cm.logLeaf("1 Magic Mitten");
					} else {
						cm.sendOk("Please make sure you have enough space to hold these items!");
					}
                 } else {
                    cm.sendOk("Sorry, you don't have enough tetris pieces!");
				}
                cm.dispose();
            }                        					
			else {
                cm.sendOk("Come back later!");
				cm.dispose();

			
            }		
        }
    }
}