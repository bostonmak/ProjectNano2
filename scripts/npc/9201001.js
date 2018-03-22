
var item;
var common = Array(1003945, 1000050, 1004029, 1001083,1003730, 1002241, 1002450, 1002417, 1002421, 1002422, 1002423, 10024232,1002846, 1002863, 1003221, 1003222, 1003268, 1003269, 1003271, 1003276, 1003271, 1003588, 1003729, 1003737, 1003777, 1003548, 1003549, 1003398, 1003399, 1003400, 1003401, 01042251, 01042252, 01042265, 01042312, 01042313, 01042315, 01042330, 01042333, 01042334, 01042335, 01042336, 01042337, 01042338, 01042345, 01048000, 01049000);
var normal = Array(01050177, 01050179, 01050187, 01050209, 01050209, 01050210, 01050215, 01050227, 01050232, 01050235, 01050284, 01050298, 01050300, 01050301, 01050302, 01050303, 01050304, 01050310, 01050318, 01050319, 01050351, 01050356, 01051206, 01051211, 01051218, 01051228, 01051231, 01051233, 01051235, 01051252, 01051254, 01051255); 
var rare = Array(01702236, 01702235, 01702277, 01702279, 01702280, 01702281, 01702282, 01702283, 01702284, 01702285, 01702287, 01702288, 01702289,  01702293,  01702296, 01702299, 01702302, 01702303, 01702310, 01702324, 01702330, 01702334, 01702337, 01702342, 1102452, 1102423, 1102424, 1102425, 1102426, 1102427, 1102428, 1102429, 1102430, 1102431, 1102432, 110243, 1102434, 1102435, 1102438, 1102450, 1102452, 1102486, 1102488, 1102494, 1102495, 1102512, 1102574, 1102583, 1102591, 1102592, 1102755, 1102756);

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