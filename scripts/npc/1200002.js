/*vote point exchange npc
Exchanges votepoints for white scrolls dragon weapons and reverse weapons.
@@author shadowzzz*/

var status = 0;
var points = [3, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 1, 1, 1];
var items = [1022082, 
/*Starts at 1, all the ITCG Equips */          1082223, 1082230, 1032048, 1002675, 1002676, 1072344, 1402045, 1472064, 1422028, 2070016, 1102165, 1092052, 1102145, 1442057, 2070018, 1002553,
/*Starts at 16, all the dragon weapons */      1302086, 1312038, 1322061, 1332075, 1332076, 1372045, 1382059, 1402047, 1412034, 1422038, 1432049, 1442067, 1452059, 1462051, 1472071, 1482024, 1492025, 
/*Starts at 34, all the scrolls */             2049100, 2340000, 2049003];

function start() {
    cm.sendSimple("Welcome to the vote point exchange npc you have.#r" +cm.getrewardpoints() +"#k votepoints Go to the website and vote to gain votepoints. What would u like to buy with your votepoints? #b\r\n#L0# Buy some scrolls for 1 votepoint #b\r\n#L1# Buy Boss Spawners for 1 votepoint #b\r\n#L2# Buy ITCG Equips 5 votepoints #b\r\n#L3# Buy Reverse Weapons 10 votepoints  ");
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
            cm.sendSimple("Fun Fact: The original ProjectNano used to be called ProjectNanp because Jay has fat fingers #b\r\n#L34# Click here for your Eye of Fire #b\r\n\#L2# Glitter Gloves");
        } else if (s == 2){
            cm.sendSimple("Fun Fact: Munz Likes Bunz #b\r\n\#L1# Stormcaster Gloves#b\r\n\#L2# Glitter Gloves#b\r\n\#L3# Crystal Leaf Earrings#b\r\n\#L4# Antellion Mitter#b\r\n\#L5# Infinity Circlet #b\r\n\#L6# Facestompers#b\r\n\#L7#Winkel #b\r\n\#L8# Tiger's Fang #b\r\n\#L9# Neva #b\r\n\#L10# Crystal Ilbis #b\r\n\#L11# Taru Spirit Cape #b\r\n\#L12# Black Phoenix Shield #b\r\n\#L13# Sirius Cloak #b\r\n\#L14# Purple Surfboard #b\r\n\#L15# Balanced Fury #b\r\n\#L16# Genesis Bandana");
        } else if (s == 3){
            cm.sendSimple("Pick which dragon equip you want to buy since you are too pathetic to kill pink bean yourself #b\r\n\#L17# Reverse Executioners #b\r\n\#L18# Reverse Bardiche #b\r\n\#L19# Reverse Allergando #b\r\n\#L20# Reverse Pescas #b\r\n\#L21# Reverse Killic #b\r\n\#L22# Reverse EnrealTear #b\r\n\#L23# Reverse Aeas Hand #b\r\n\#L24# Reverse Neibelheim #b\r\n\#L25# Reverse Tabarzin #b\r\n\#L26# Reverse Bellocce #b\r\n\#L27# Reverse Alchupiz #b\r\n\#L28# Reverse Diesra #b\r\n\#L29# Reverse Engaw #b\r\n\#L30# Reverse Black Beauty #b\r\n\#L31# Reverse Lampion #b\r\n\#L32# Reverse Equinox #b\r\n\#L33# Reverse Blindness");
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
                cm.gainItem(items[s], 1);
            } else {
                cm.sendOk(" You don't have " + points[s] + " vote points. ");
            }
        }
        cm.dispose();
    }
}  