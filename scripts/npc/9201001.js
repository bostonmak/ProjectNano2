
var item;
var common = Array(2022179, 2000005, 5200002, 5200001, 5200000, 4000038, 2022336, 5451000, 4031682, 2070016, 2340000, 2070018, 2049100, 2100008, 2040804, 2280003, 2280003, 2280003, 2280003);
var normal = Array(1102802, 1102820, 1102839, 1102754, 1102789, 1003755, 1702368, 1004285, 1004386, 1004403, 1004398, 1004399, 1004400, 1004401, 1004402, 1004479, 1062216, 1061138,1062089,1062114,1062153,1062148,1062157,1062158,1062159,1001060,1001076,1001082,1001084,1001090,1002515,1002516,1002517,1002600,1002601,1002602,1002603,1002846,1002877); 
var rare = Array(1003268,1003269,1003463,1003549,1004026, 1003755,1004026,1004027,1004028,1004029,1004167,1004169,1004194,1004200,1004204,1004205,1004211,1004282,1004283,1004284,1004285,1004386,1004403,1004398,1004399,1004400,1004401,1004402,1004479,1004534);


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
				//cm.gainMeso([-10000000]);
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