var status = -1; 
//var items = Array(5062000, 5062001, 5062002, 5750000, 5750001, 5050000, 2049100, 2022179, 2314000, 4020009, 2040804, 2040029, 2040532, 2040516, 2040513, 2040501, 2040025, 2040321, 2040301, 2043401, 2045301, 2045201, 2040317, 2040817, 5610000, 5610001, 3011000, 5614000, 1122121, 2531000, 2530000, 5030000, 5030001, 5030006, 5536000, 5220084, 5220092, 5510000, 1812008); 
//var itemsa = Array(2550, 20000, 30000, 5000, 4100, 2550, 4100, 5000, 50000, 2000, 5000, 6000, 7500, 7500, 8000, 8000, 9000, 9000, 9000, 9000, 9000, 9000, 9000, 9000, 6000, 9000, 4500, 80000, 150000, 100000, 35000, 3400, 11800, 19800, 20000, 20000, 14000, 1000, 7000); 
//var itemse = Array(-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 14, -1, 30, -1, -1, 1, 7, 14, -1, -1, -1, -1); 
var items = [ 
/*Weapon*/ [[1702005, 2500, -1], [1702002, 10000, -1], [1702003, 12500, -1], [1702004, 30000, -1], [1702118, 14000, -1], [1702119, 14000, -1], [1702120, 14000, -1], [1702121, 14000, -1], [1702122, 14000, -1], [1702123, 14000, -1], [1702124, 14000, -1], [1702125, 14000, -1], [1702126, 14000, -1], [1702127, 14000, -1], [1702128, 14000, -1], [1702129, 14000, -1], [1702130, 14000, -1], [1702131, 14000, -1], [1702132, 14000, -1], [1702133, 14000, -1], [1702133, 14000, -1], [1702134, 14000, -1], [1702135, 14000, -1], [1702136, 14000, -1], [1702138, 14000, -1], [1702139, 14000, -1], [1702140, 14000, -1], [1702141, 14000, -1], [1702142, 14000, -1], [1702143, 14000, -1], [1702195, 14000, -1], [1702196, 14000, -1], [1702198, 14000, -1], [1702301, 14000, -1], [1702302, 14000, -1], [1702303, 14000, -1], [1702304, 14000, -1], [1702305, 14000, -1], [1702306, 14000, -1], [1702308, 14000, -1], [1702309, 14000, -1], [1702310, 14000, -1], [1702324, 14000, -1], [1702275, 14000, -1], [1702276, 14000, -1], [1702277, 14000, -1], [1702278, 14000, -1], [1702188, 14000, -1], [1702189, 14000, -1], [1702352, 14000, -1], [1702357, 14000, -1], [1702361, 14000, -1], [1702362, 14000, -1], [1702363, 14000, -1], [1702364, 14000, -1], [1702365, 14000, -1], [1702366, 14000, -1], [1702367, 14000, -1], [1702368, 14000, -1], [1702399, 14000, -1]/*, [5062500, 75000, -1]/*/], 
/*Hats*/ [[1000030, 5100, -1], [1000031, 9000, -1], [1000032, 9000, -1], [1000045, 7000, -1], [1000046, 7000, -1], [1000050, 7000, -1], [1000062, 7000, -1], [1000064, 7000, -1], [1001090, 7000, -1], [1001089, 7000, -1], [1003459, 7000, -1], [1003538, 7000, -1], [1003539, 7000, -1], [1003541, 7000, -1], [1003595, 7000, -1], [1003596, 7000, -1], [1003597, 7000, -1], [1003610, 7000, -1], [1003730, 7000, -1], [1003940, 7000, -1], [1002343, 7000, -1], [1002186, 6000, -1], [1002485, 6000, -1], [1002225, 6000, -1], [1003909, 6000, -1], [1003910, 6000, -1], [1002999, 6000, -1], [1002821, 6000, -1]], 
/*Tops*/ [/*[2314000, 50000, -1], */[1040144, 6000, -1], [1040119, 6000, -1], [1042027, 6000, -1], [1042028, 6000, -1], [1042029, 6000, -1], [1042030, 6000, -1], [1042037, 6000, -1], [1042075, 6000, -1], [1042076, 6000, -1], [1042077, 6000, -1], [1042081, 6000, -1], [1042103, 6000, -1], [1042129, 6000, -1], [1042140, 6000, -1], [1042142, 6000, -1], [1042150, 6000, -1], [1042157, 6000, -1], [1042178, 6000, -1], [1042230, 6000, -1], [1042240, 6000, -1], [1042241, 6000, -1], [1042242, 6000, -1], [1042244, 6000, -1], [1042245, 6000, -1]], 
/*Bottoms*/ [[1062047, 6000, -1], [1062091, 6000, -1], [1062113, 6000, -1], [1062116, 6000, -1]], 
/*Shoes*/ [[1072235, 6000, -1], [1072258, 6000, 14], [1072281, 6000, 14], [1072282, 6000, -1], [1072283, 6000, -1], [1072437, 6000, -1], [1072482, 6000, -1], [1072515, 6000, -1], [1072808, 6000, -1], [1072823, 6000, -1], [1072831, 6000, -1], [1072832, 6000, -1], [1072836, 6000, -1]], 
/*Capes*/ [[1102063, 14000, -1], [1102067, 14000, -1], [1102074, 14000, -1], [1102095, 14000, -1], [1102096, 14000, -1], [1102097, 14000, -1], [1102108, 14000, -1], [1102149, 14000, -1], [1102148, 14000, -1], [1102152, 14000, -1], [1102158, 14000, -1], [1102184, 14000, -1], [1102185, 14000, -1], [1102186, 14000, -1], [1102196, 14000, -1], [1102215, 14000, -1], [1102222, 14000, -1], [1102223, 14000, -1], [1102253, 14000, -1], [1102261, 14000, -1], [1102270, 14000, -1], [1102271, 14000, -1], [1102292, 14000, -1], [1102349, 14000, -1], [1102376, 14000, -1], [1102377, 14000, -1], [1102378, 14000, -1], [1102379, 14000, -1], [1102380, 14000, -1], [1102385, 14000, -1], [1102386, 14000, -1], [1102453, 14000, -1], [1102452, 14000, -1], [1102451, 14000, -1], [1102450, 14000, -1], [1102466, 14000, -1], [1102487, 14000, -1], [1102511, 14000, -1], [1102564, 14000, -1], [1102608, 14000, -1], [1102619, 14000, -1]], 
/*Cubes*/ [[5062000, 2300, -1], [5062001, 2300, -1], [5062002, 2300, -1], [5062003, 2300, -1], [5062005, 2300, -1], [5062006, 2300, -1], [5062009, 2300, -1]] 
]; 
var select, select2; 

function start() { 
    status = -1; 
    action(1, 0, 0); 
} 

function action(mode, type, selection) { 
    if (mode != 1) { 
        cm.dispose(); 
        return; 
    } 
    status++; 
    if (status == 0) { 
        //cm.sendSimple("Hello There This is the Cash Shop#r#e" + cm.getPlayer().getCSPoints(1) + "of [NAME] you can trade NX Items for mPoints"); 
        cm.sendSimple("Hello There This is the Cash Shop NPC You have #r#e" + cm.getPlayer().getCSPoints(1) + " NX#k of [NAME] you can trade mPoints for NX Items...#b\r\n\r\n#L0#Weapon#l\r\n#L1#Hats#l\r\n#L2#Tops#l\r\n#L3#Bottoms#l\r\n#L4#Shoes#l\r\n#L5#Capes#l\r\n#L6#Cubes#1"); 
    } else if (status == 1) { 
        select = selection; 
        var selStr = "Which item category you like?\r\n#b"; 
        for (var i = 0; i < items[selection].length; i++) { 
            selStr += "#L" + i + "##v" + items[selection][i][0] + "##t" + items[selection][i][0] + "# #r(" + items[selection][i][1] / 2 + " Cash)" + (items[select][selection][2] > 0 ? " (Lasts for " + items[select][selection][2] + "days)" : "") + "#b#l\r\n"; 
        } 
        cm.sendSimple(selStr + "#k"); 
    } else if (status == 2) { 
        select2 = selection; 
        if (items[select][selection][0] / 1000000 == 1) { 
            if (cm.getPlayer().getCSPoints(1) < items[select2][i][1] / 2) { 
                cm.sendOk("It seems that you don't have enough #rCash#k."); 
            } else if (!cm.canHold(items[select][select2][0], 1)) { 
                cm.sendOk("You don't have the inventory space to hold it. I must be legit and make this a fair trade... so hurry up and free your inventory."); 
            } else { 
                cm.getPlayer().modifyCSPoints(1, -(items[select][select2][i][1] / 2), true); 
                if (items[select][select2][2] > 0) { 
                    cm.gainItemPeriod(items[select][select2][0], 1, items[select][select2][2]); 
                } else { 
                    cm.gainItem(items[select][select2][0], 1); 
                } 
                cm.sendOk("You have gained " + selection + "and lost " + items[select][select2][i][1] / 2 * selection + " Cash"); 
            } 
            cm.dispose(); 
        } else { 
            cm.sendGetNumber("How many would you like? (1#v" + items[select][selection][0] + "##t" + items[select][selection][0] + "# = " + items[select][selection][1] / 2 + " Cash) (Current Cash: " + cm.getPlayer().getCSPoints(1) + ")", 1, 1, cm.getPlayer().getCSPoints(1) / (items[select][selection][1] / 2)); 
        } 
    } else if (status == 3) { 
        if ((items[select][select2][0] == 2314000 || items[select][select2][0] == 5610000 || items[select][select2][0] == 5610001 || items[select][select2][0] == 5062001 || items[select][select2][0] == 5614000) && cm.getPlayer().getLevel() < 70) { 
            cm.sendOk("Sorry but you must be level 70 or above to get this item."); 
        } else if (items[select][select2][0] == 2022179 && cm.getPlayer().getLevel() < 50) { 
            cm.sendOk("Sorry but you must be level 50 or above to get this item."); 
        } else if (cm.getPlayer().getCSPoints(1) < items[select][select2][1] / 2) { 
            cm.sendOk("It seems that you don't have enough #rCash#k."); 
        } else if (!cm.canHold(items[select][select2][0], selection)) { 
            cm.sendOk("You don't have the inventory space to hold it. I must be legit and make this a fair trade... so hurry up and free your inventory."); 
        } else { 
            cm.getPlayer().modifyCSPoints(1, -(items[select][select2][1] / 2 * selection), true); 
            if (items[select][select2][2] > 0) { 
                cm.gainItemPeriod(items[select][select2][0], selection, items[select][select2][2]); 
            } else { 
                cm.gainItem(items[select][select2][0], selection); 
            } 
            cm.playerMessage("Thank you for purchasing from [MS NAME] Cash-Shop" + (items[select][select2][1] / 2 * selection) + " Cash."); 
        //cm.showMessage(7, "Thank you for purchasing from [MS NAME] Cash-Shop" + (items[select][select2][1] / 2 * selection) + " Cash."); 
            cm.sendOk("You have gained " + selection + " and lost " + items[select][select2][1] / 2 * selection + " Cash"); 
        } 
        cm.dispose(); 
    } 
}  
 