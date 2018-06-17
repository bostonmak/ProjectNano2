
var item;
var common = Array(01042232, 01042251, 01042252, 01042265, 01042312, 01042313, 01042315, 01042330, 01042333, 01042334, 01042335, 01042336, 01042337, 01042338, 01048000, 01049000, 1003268, 01050177, 01050179, 01050187, 01050208, 01050209, 01050210, 01050227);
var normal = Array(1102261, 1102267, 1102288, 1102300, 1102301, 1102319, 1102323, 1102324, 1102325, 1102326, 1102336, 1102338, 1102486, 1102512, 1102787, 01702277, 01702279, 01702280, 01702281, 01702282, 01702283, 01702284, 01702285, 01702287, 01702288); 
var rare = Array(1003945, 1003221, 1003222, 1003186, 1003187, 1003559, 01702235, 01702330, 01702342, 01702347, 01702367, 01702368, 01702556,  01702585,  01702529, 01050232, 1052200, 1072875, 01050177, 01050215, 1052213, 1052672, 1052676, 1052667);
var rare1 = Array(01050284, 01050310, 1072484, 1072808, 1072917, 01702289, 01702293, 01702296, 01702299, 01702302, 1052679, 1052680, 1052680, 1052682, 1052684, 1052685, 1053134, 1053133, 1053132, 1053131, 1053130, 1053127, 1053126, 1053119, 1053118);
var rare2 = Array(1053117, 1053116, 1053115, 1053103, 1053099, 1053098, 1053097, 1053096, 1053095, 1053094, 1053093, 1053092, 1053091, 1053090, 1053089, 1053088, 1053087, 1053086, 1053085, 1053084, 1053083, 1053082, 1053069, 1053061, 1053061, 1053060);
var rare3 = Array(1053059, 1053058, 1053057, 1053056, 1053055, 1053053, 1053052, 1053051, 1053050, 1053049, 1053048, 1053047, 1053046, 1053045, 1053042, 1053041, 1053040, 1053039, 1053038, 1053035, 1053034, 1053033, 1053028, 1053017, 1053016, 1053015);
var rare4 = Array(1053001, 1053000, 1052999, 1052998, 1052996, 1052995, 1052994, 1052991, 1052977, 1052976, 1052975, 1052951, 1052949, 1052948, 1052947, 1052946, 1052943, 1052942, 1052941, 1052940, 1052926, 1052925, 1052924, 1052923, 1052922, 1052921);
var rare5 = Array(1052920, 1052919, 1052917, 1052916, 1052915, 1052912, 1052911, 1052910, 1052904, 1052903, 1052902, 1052901, 1052899, 1052898, 1052896, 1052895, 1052894, 1052899);

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
var irare3 = rare3[getRandom(0, rare3.length - 1)];
var irare4 = rare4[getRandom(0, rare4.length - 1)];
var irare5 = rare5[getRandom(0, rare5.length - 1)];

var chance = getRandom(0, 7);

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
			cm.sendNext(" #i3991013##i3991023##i3991006##i3991000##i3991002##i3991007##i3991000##i3991015##i3991014##i3991013# \r\nHello #h #,\r\n\r\nWant to try your luck at the #r#eNX Gachapon?#n#k You can earn assorted up to date NX items as well as mastery books, boss summoning bags, and boss coins! Remember that it will cost you #r#e10,000,000 mesos#n#k a spin! #b#eGood Luck!");
		} else if (status == 1) {
			if (cm.getMeso() >= 10000000) {
				//cm.gainMeso([-1]);
				cm.sendNext(" #eFeatured NX Items in September#e \r\n\r\n #i1003755##i1004197#  #i1003252# #i1702368#\r\n ------------------------------------------------------------------------------ \r\n#i1102802##i1102820##i1102839##i1102789##i1102754#\r\n ------------------------------------------------------------------------------ \r\n #i1702529##i1702530##i1702534##i1702533##i1702540##i1702523# \r\n ------------------------------------------------------------------------------ \r\n \t\t\t\t\t\#e#rGood Luck Adventurer!");
				
			} else {
                cm.sendOk("Sorry you dont have 10,000,000 mesos :(");
                cm.dispose();				
				}
		} else if (status == 2) {
        //    		 cm.setDailyReward('DailyGift');
					 

			if (chance = 0) {
			cm.sendOk("#b#eCongratulations!#n#k You have obtained a #b#t" + cm.gainItem(icommon, 1) + "##k #v" + icommon + "#"); 
			cm.gainMeso([-10000000]);
			} else if (chance = 1) {
			cm.sendOk("#b#eCongratulations!#n#k You have obtained a #b#t" + cm.gainItem(inormal, 1) + "##k #v" + inormal + "#");
			cm.gainMeso([-10000000]);
			} else if (chance = 2) {
			cm.sendOk("#b#eCongratulations!#n#k You have obtained a #b#t" + cm.gainItem(irare, 1) + "##k #v" + irare + "#");
			cm.gainMeso([-10000000]);
			} else if (chance = 3) {
			cm.sendOk("#b#eCongratulations!#n#k You have obtained a #b#t" + cm.gainItem(irare1, 1) + "##k #v" + irare1 + "#");
			cm.gainMeso([-10000000]);
			} else if (chance = 4) {
			cm.sendOk("#b#eCongratulations!#n#k You have obtained a #b#t" + cm.gainItem(irare2, 1) + "##k #v" + irare2 + "#");
			cm.gainMeso([-10000000]);
			} else if (chance = 5) {
			cm.sendOk("#b#eCongratulations!#n#k You have obtained a #b#t" + cm.gainItem(irare3, 1) + "##k #v" + irare3 + "#");
			cm.gainMeso([-10000000]);
			} else if (chance = 6) {
			cm.sendOk("#b#eCongratulations!#n#k You have obtained a #b#t" + cm.gainItem(irare4, 1) + "##k #v" + irare4 + "#");
			cm.gainMeso([-10000000]);
			} else if (chance = 7) {
			cm.sendOk("#b#eCongratulations!#n#k You have obtained a #b#t" + cm.gainItem(irare5, 1) + "##k #v" + irare5 + "#");
			cm.gainMeso([-10000000]);
			}
			cm.dispose();
		}
	}
}