/*vote point exchange npc
Exchanges votepoints for white scrolls dragon weapons and reverse weapons.
@@author shadowzzz*/

var status = 0;
var points = [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 1, 1, 1, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7];
var items = [1022082, 
/*Starts at 1, all the ITCG Equips */          1082223, 1082230, 1032048, 1002675, 1002676, 1072344, 1402045, 1472064, 1422028, 2070016, 1102165, 1092052, 1102145, 1442057, 2070018, 1002553,
/*Starts at 16, all the dragon weapons */      1302086, 1312038, 1322061, 1332075, 1332076, 1372045, 1382059, 1402047, 1412034, 1422038, 1432049, 1442067, 1452059, 1462051, 1472071, 1482024, 1492025, 
/*Starts at 34, all the scrolls */             2049100, 2340000, 2049003,
/*Starts at 37, Warrior Empress Weapon*/       1302152, 1312065, 1322096, 1402095, 1412065, 1422066, 1432086, 1442116,
/*Starts at 45, Bowman Empress Weapon*/        1452111, 1462099,
/*Starts at 47, Theif Empress Weapon*/         1332130, 1472122,
/*Starts at 49, Mage Empress Weapon */         1372084, 1382104,
/*Starts at 51, Pirate Empress Weaoon */       1482084, 1492085,
/*Starts at 53, Warrior Empress Gear */        1003172, 1102275, 1052314, 1072485, 1082295,
/*Starts at 58, Bowman Empress Gear*/          1003174, 1102277, 1052316, 1072487, 1082297,
/*Starts at 63, Thief Empress Gear */          1003175, 1102278, 1052317, 1072488, 1082298,
/*Starts at 68, Pirate Empress Gear*/          1003176, 1102279, 1052318, 1072489, 1082299];

function start() {
    cm.sendSimple("Welcome to the vote point exchange npc you have.#r" +cm.getrewardpoints() +"#k votepoints Go to the website and vote to gain votepoints. What would u like to buy with your votepoints? #b\r\n#L0# Buy some scrolls 5 for 1 votepoint #b\r\n#L1# Buy ITCG Equips 3 votepoints #b\r\n#L2# Buy Empress Gear for 7 votepoints  #b\r\n#L3# Buy Empress Weapons for 10 votepoints ");
}

function action (m,t,s) {
    if (m < 1) {
        cm.dispose();
        return;
    } else {
        status++;
    }
    if (status == 1) {
    sel = s;
        if (s == 0) {
            cm.sendSimple("Fun Fact: Mitochondria is not actually the powerhouse of the cell #b\r\n\#L34# Chaos Scroll #b\r\n\#L35# White Scroll #b\r\n\#L36# Clean Slate 20%");
        } else if (s == 1){
                        cm.sendSimple("Fun Fact: Munz Likes Bunz #b\r\n\#L1# Stormcaster Gloves#b\r\n\#L2# Glitter Gloves#b\r\n\#L3# Crystal Leaf Earrings#b\r\n\#L4# Antellion Mitter#b\r\n\#L5# Infinity Circlet #b\r\n\#L6# Facestompers#b\r\n\#L7#Winkel #b\r\n\#L8# Tiger's Fang #b\r\n\#L9# Neva #b\r\n\#L10# Crystal Ilbis #b\r\n\#L11# Taru Spirit Cape #b\r\n\#L12# Black Phoenix Shield #b\r\n\#L13# Sirius Cloak #b\r\n\#L14# Purple Surfboard #b\r\n\#L15# Balanced Fury #b\r\n\#L16# Genesis Bandana");
        } else if (s == 2){
                        cm.sendSimple("Fun Fact: The original ProjectNano used to be called ProjectNanp because Jay has fat fingers #b\r\n#L53# Lionheart Battle Helm #b\r\n\#L54# Lionheart Battle Cape #b\r\n#L55# Lionheart Battle Mail #b\r\n#L56# Lionheart Battle Boots #b\r\n#L57# Lionheart Battle Bracers #b\r\n#L58# Falcon Wing Sentinel Cap #b\r\n#L59# Falcon Wing Sentinel Cape #b\r\n#L60# Falcon Wing Sentinel Suit #b\r\n#L61# Falcon Wing Sentinel Boots #b\r\n#L62# Falcon Wing Sentinel Gloves #b\r\n#L63# Raven Horn Chaser Hat #b\r\n#L64# Raven Horn Chaser Cape #b\r\n#L65# Raven Horn Chaser Armor #b\r\n#L66# Raven Horn Chaser Boots #b\r\n#L67# Raven Horn Chaser Gloves #b\r\n#L68# Shark Tooth Skipper Hat #b\r\n#L69# Shark tooth Skipper Cape #b\r\n#L70# Shark Tooth Skipper Coat #b\r\n#L71# Shark Tooth Skipper Boots #b\r\n#L72# Shark Tooth Skipper Gloves");
        } else if (s == 3){
            cm.sendSimple("Fun Fact: For 1m free nx #bCLICK HERE  #b\r\n\#L37# Lionheart Cuttlas #b\r\n\#L38# LionHeart Champion Axe #b\r\n\#L39# Lionheart Battle Hammer #b\r\n\#L40# Lionheart Battle Scimitar #b\r\n\#L41# Lionheart Battle Axe #b\r\n\#L42# Lionheart Blast Maul #b\r\n\#L43# Lionheart Fuscina #b\r\n\#L44# Lionheart Partisan #b\r\n\#L45# Falcon Wing Composite Bow #b\r\n\#L46# Falcon Wing Heavy Cross Bow #b\r\n\#L47# Raven Horn Baselard #b\r\n\#L48# Raven Horn Metal Fist #b\r\n\#L49# Dragon Tail Arc Wand #b\r\n\#L50# Dragon Tail War Staff #b\r\n\#L51# Shark Tooth Wild Talon #b\r\n\#L52# Shark Tooth Sharpshooter #b\r\n\#L33# Reverse Blindness");
        } else if (s == 4) {
            cm.sendSimple("Fun Fact: For 1m free nx #bCLICK HERE ");
        } 
    } else if (status == 2) {
        if (sel == 100) {
            if (cm.getrewardpoints() >= 6) {
                cm.gainrewardpoints(-6);
                cm.gainItem(2340000, 5);
            } else {
                cm.sendOk(" You don't have 6 vote points. ");
            }
        } else {
            if (cm.getrewardpoints() >= points[s]) {
                cm.gainrewardpoints(-points[s]);
                if (items[s] == 2049100 || items[s] == 2340000 || items[s] == 2049003) {
                    cm.gainItem(items[s], 5);
                }
                else if(items[s] != 2049100 || items[s] != 2340000 || items[s] != 249003){
                    cm.gainItem(items[s], 1);
                }
                    
                
            
            } else {
                cm.sendOk(" You don't have " + points[s] + " vote points. ");
            }
        }
        cm.dispose();
    }
}  