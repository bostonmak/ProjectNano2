/*
Credits go to Travis of DeanMS ( xKillsAlotx on RaGEZONE)
Item Exchanger for scrolls

Modified by SharpAceX (Alan) for MapleSolaxia
*/

importPackage(Packages.tools);

var status = 0;
var leaf = 4001126;
var diamondOre = 4020007;
var sapphireOre = 4020005;
var garnetOre = 4020000;
var opalOre = 4020004;
var amethystOre = 4020001;
var aquamarineOre = 4020002;
var topazOre = 4020006;
var emeraldOre = 4020003;
var powerCrystalOre = 4004000;
var wisdomCrystalOre = 4004001;
var lukCrystalOre = 4004003;
var dexCrystalOre = 4004002;
var blackCrystalOre = 4020008;
var darkCrystalOre = 4004004;
var bronzeOre = 4010000;
var steelOre = 4010001;
var mithrilOre = 4010002;
var adamantiumOre = 4010003;
var silverOre = 4010004;
var orihalconOre = 4010005;
var goldOre = 4010006;
var lidiumOre = 4010007;
var chairs = new Array(3010000, 3010001, 3010002, 3010003, 3010004, 3010005, 3010006, 3010007, 3010008, 3010009, 3010010, 3010011, 3010012, 3010013, 3010015, 3010016, 3010017, 3010018, 3010019, 3010022, 3010023, 3010024, 3010025, 3010026, 3010028, 3010040, 3010041, 3010043, 3010045, 3010046, 3010047,3010057,3010058,3010060,3010061,3010062,3010063, 3010064,3010065,3010066,3010067,3010069,3010071,3010072,3010073,3010080,3010081,3010082,3010083, 3010084,3010085,3010097,3010098,3010099,3010101,3010106,3010116,3011000,3012005,3012010,3012011,3010038,3010161,3010175,3010177,3010191,3010225, 03010230, 3010299, 3010457, 3010459, 3010490, 3010491, 3010492, 3010499, 3010529, 011000,018001, 3018002, 3018004, 3018006, 3019095);
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
            cm.sendNext("Hello#b #h ##k if you want to learn Maker Skill you need all of the following shiny rocks: #r\r\n 50 Diamond Ores \r\n 50 Sapphire Ores \r\n 50 garnet Ores \r\n 50 Opal Ores \r\n 50 Amethyst Ores \r\n 50 Aquamarine Ores \r\n 50 Topaz Ores \r\n 50 Emerald Ores \r\n 50 Power Crystal Ores \r\n 50 Wisdom Crystal Ores \r\n 50 LUK Crystal Ores \r\n 50 DEX Crystal Ores \r\n 50 Black Crystal Ores \r\n 50 Dark Crystal Ores \r\n 50 Bronze Ores \r\n 50 Steel Ores \r\n 50 Mithril Ores \r\n 50 Adamantium Ores\r\n 50 Silver Ores \r\n 50 Orihalcon Ores \r\n 50 Gold Ores \r\n 50 Lidium Ores");
                        }
         else if (status == 1) 
            {
                if(cm.haveItem(diamondOre, 50) && cm.haveItem(sapphireOre, 50) && cm.haveItem(garnetOre, 50) && cm.haveItem(opalOre, 50) && cm.haveItem(amethystOre, 50) && cm.haveItem(aquamarineOre, 50) && cm.haveItem(topazOre, 50) && cm.haveItem(emeraldOre, 50) 
                    && cm.haveItem(powerCrystalOre, 50) && cm.haveItem(wisdomCrystalOre, 50) && cm.haveItem(lukCrystalOre, 50) && cm.haveItem(dexCrystalOre, 50) && cm.haveItem(blackCrystalOre, 50) && cm.haveItem(darkCrystalOre, 50) && cm.haveItem(bronzeOre, 50) && cm.haveItem(steelOre, 50)
                    && cm.haveItem(mithrilOre, 50) && cm.haveItem(adamantiumOre, 50) && cm.haveItem(silverOre, 50) && cm.haveItem(goldOre, 50) && cm.haveItem(goldOre, 50) && cm.haveItem(lidiumOre, 50)) 
                {
                    cm.teachSkill(1007,3,3);     //Regular Maker Skill
                    cm.teachSkill(20001007,3,3); //Maker Skill for Arans
                    cm.gainItem(diamondOre, -50);
                    cm.gainItem(sapphireOre, -50);
                    cm.gainItem(garnetOre, -50);
                    cm.gainItem(opalOre, -50);
                    cm.gainItem(amethystOre, -50);
                    cm.gainItem(aquamarineOre, -50);
                    cm.gainItem(topazOre, -50);
                    cm.gainItem(emeraldOre, -50);
                    cm.gainItem(powerCrystalOre, -50);
                    cm.gainItem(wisdomCrystalOre, -50);
                    cm.gainItem(lukCrystalOre, -50);
                    cm.gainItem(dexCrystalOre, -50);
                    cm.gainItem(blackCrystalOre, -50);
                    cm.gainItem(darkCrystalOre, -50);
                    cm.gainItem(bronzeOre, -50);
                    cm.gainItem(steelOre, -50);
                    cm.gainItem(mithrilOre, -50);
                    cm.gainItem(adamantiumOre, -50);
                    cm.gainItem(silverOre, -50);
                    cm.gainItem(mithrilOre, -50);
                    cm.gainItem(adamantiumOre, -50);
                    cm.gainItem(silverOre, -50);
                    cm.gainItem(orihalconOre, -50);
                    cm.gainItem(goldOre, -50);
                    cm.gainItem(lidiumOre, -50);
                    cm.sendOk("Congrats you learned the Maker Skill");
                    cm.logLeaf("5k NX");
                }
                 else 
                 {
                    cm.sendOk("You don't have all the ores!");
                 }
                cm.dispose();
            } 
             else 
                {
                cm.sendOk("Come back later!");
                cm.dispose();
                }   
        }
}
