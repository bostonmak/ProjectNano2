
var item;
var common = Array(01042232, 01042251, 01042252, 01042265, 01042312, 01042313, 01042315, 01042330, 01042333, 01042334, 01042335, 01042336, 01042337, 01042338, 01048000, 01049000, 1003268, 01050177, 01050179, 01050187, 01050208, 01050209, 01050210, 01050227, 01050284, 01050310, 1072484, 1072808, 1072917, 1072942, 1072949, 1073037, 1102673, 1102674, 1102683, 1102688, 1102695, 11027005, 1102707, 1102725, 1102726, 1102747, 1102213, 1102214, 1102230, 1102258, 1102261);
var normal = Array(1102261, 1102267, 1102288, 1102300, 1102301, 1102319, 1102323, 1102324, 1102325, 1102326, 1102336, 1102338, 1102486, 1102512, 1102787, 01702236, 01702277, 01702279, 01702280, 01702281, 01702282, 01702283, 01702284, 01702285, 01702287, 01702288, 01702289, 01702293, 01702296, 01702299, 01702302, 01702303, 01702310, 01702324, 01702334, 01702337, 01702348, 01702350, 01702351, 01702352, 01702360, 01702366, 01702374, 01702375, 01702376, 01702382, 01702390, 01702393, 01702395,01702475, 01702526, 01702585); 
var rare = Array(1003945, 1003221, 1003222, 1003186, 1003187, 1003559, 01702235, 01702330, 01702342, 01702347, 01702367, 01702368, 01702556,  01702585,  01702529, 01050232, 1052200, 1072875, 01050177, 01050215, 1052213, 1052672, 1052676, 1052667, 1052679, 1052680, 1052680, 1052682, 1052684, 1052685, 1052762, 1052781, 1052782, 1052842, 1052843, 1052845, 1052846, 1052870, 1052873, 1052874, 1052876, 1052895, 1052903, 1052910, 1052991, 1052921, 1052922, 1052924, 1052925, 1052926, 1052954, 1052926);

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

var chance = getRandom(0, 5);

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
					 

			if (chance > 0 && chance <= 2) {
			cm.sendOk("#b#eCongratulations!#n#k You have obtained a #b#t" + cm.gainItem(icommon, 1) + "##k #v" + icommon + "#"); 
			cm.gainMeso([-10000000]);
			} else if (chance >= 3 && chance <= 4) {
			cm.sendOk("#b#eCongratulations!#n#k You have obtained a #b#t" + cm.gainItem(inormal, 1) + "##k #v" + inormal + "#");
			cm.gainMeso([-10000000]);
			} else {
			cm.sendOk("#b#eCongratulations!#n#k You have obtained a #d#t" + cm.gainItem(irare, 1) + "##k #v" + irare + "#");
			cm.gainMeso([-10000000]);
			}

			cm.dispose();
		}
	}
}