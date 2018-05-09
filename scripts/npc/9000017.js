/*
function start() {
    cm.sendYesNo("Would you like me to teach you all your 4th job skills?  Make sure you reset your SP or you will lose the SP you currently used");
}

function action(mode, type, selection) {
        //cm.resetStats();
 // Double Swing
        /*cm.teachSkill(21000000,0,30); // Combat Ability
 // Combat Step
        cm.teachSkill(21001003,0,30); // Pole Arm Booster
        // Aran Second job
 // Triple Swing
        cm.teachSkill(21100000,0,30); // Pole Arm Mastery
        cm.teachSkill(21100002,0,30); // Final Charge
 // Body Pressure
        cm.teachSkill(21100004,0,10); // Combo Smash
        cm.teachSkill(21100005,0,10); // Combo Drain
		cm.teachSkill(21121000,0,10); // Maple Warrior
		cm.teachSkill(21120002,0,10); // Overswing
		cm.teachSkill(21120001,0,10); // Aggression
		cm.teachSkill(21120005,0,10); // Final Blow
		cm.teachSkill(21121003,0,10); // Freezing Posture
		cm.teachSkill(21120004,0,10); // High Class Defense
		cm.teachSkill(21120006,0,10); // Combo Tempest
		cm.teachSkill(21120007,0,10); // Combo Barrier
		cm.teachSkill(21121008,0,10); // Solider's Will

        cm.teachSkill(1007,3,3);     // maker skill for non-Arans
        cm.teachSkill(20001007,3,3); // maker skill for arans
        
        // Aran Thief Job
        cm.teachSkill(21110000,0,10); // Critical Combo
        cm.teachSkill(21110002,0,10); // Full Swing
        cm.teachSkill(21110003,0,10); // Final Toss
        cm.teachSkill(21110004,0,10); // Fenir Phantom
        cm.teachSkill(21111005,0,10); // Snow Charge
        cm.teachSkill(21110006,0,10); // WhirlWind
        cm.teachSkill(21111001,0,10); // Smart Knockback
        cm.teachSkill(1120004,0,10); //Achilles
        cm.teachSkill(1120003,0,10); //Advanced Combo
        cm.teachSkill(1121011,0,10); //Hero's Will
        cm.teachSkill(1120005,0,10); //Blocking
        cm.teachSkill(1121008,0,10); //Brandish
        cm.teachSkill(1121010,0,10); //Enrage
        cm.teachSkill(1121000,0,10); //Maple Warrior
        cm.teachSkill(1121001,0,10); //Monster Magnet
        cm.teachSkill(1121006,0,10); //Rush
        cm.teachSkill(1121002,0,10); //Stance
        //Paladin (4th Job)
        cm.teachSkill(1220005,0,10); //Achilles
        cm.teachSkill(1220010,0,10); //Advanced Charge
        cm.teachSkill(1221012,0,10); //Hero's Will
        cm.teachSkill(1221009,0,10); //Blast
        cm.teachSkill(1220006,0,10); //Blocking
        cm.teachSkill(1221004,0,10); //Divine Charge: Mace
        cm.teachSkill(1221003,0,10); //Holy Charge: Sword
        cm.teachSkill(1221000,0,10); //Maple Warrior
        cm.teachSkill(1221001,0,10); //Monster Magnet
        cm.teachSkill(1221007,0,10); //Rush
        cm.teachSkill(1221011,0,10); //Sanctuary
        cm.teachSkill(1221002,0,10); //Stance
        //Dark Knight (4th Job)
        cm.teachSkill(1320005,0,10); //Achilles
        cm.teachSkill(1321010,0,10); //Hero's Will
        cm.teachSkill(1321007,0,10); //Beholder
        cm.teachSkill(1320009,0,30); //Beholder's Buff
        cm.teachSkill(1320008,0,30); //Beholder's Healing
        cm.teachSkill(1320006,0,10); //Berserk
        cm.teachSkill(1321000,0,10); //Maple Warrior
        cm.teachSkill(1321001,0,10); //Monster Magnet
        cm.teachSkill(1321003,0,10); //Rush
        cm.teachSkill(1321002,0,10); //Stance
        //Fire/Poison Arch Mage (4th Job)
        cm.teachSkill(2121008,0,10); //Hero's Will
        cm.teachSkill(2121001,0,10); //Big Bang
        cm.teachSkill(2121005,0,10); //Elquines
        cm.teachSkill(2121003,0,10); //Fire Demon
        cm.teachSkill(2121004,0,10); //Infinity
        cm.teachSkill(2121002,0,10); //Mana Reflection
        cm.teachSkill(2121000,0,10); //Maple Warrior
        cm.teachSkill(2121007,0,10); //Meteo
        cm.teachSkill(2121006,0,10); //Paralyze
        //Ice/Lightning Arch Mage (4th Job)
        cm.teachSkill(2221008,0,10); //Hero's Will
        cm.teachSkill(2221001,0,10); //Big Bang
        cm.teachSkill(2221007,0,10); //Blizzard
        cm.teachSkill(2221006,0,10); //Chain Lightning
        cm.teachSkill(2221003,0,10); //Ice Demon
        cm.teachSkill(2221005,0,10); //Ifrit
        cm.teachSkill(2221004,0,10); //Infinity
        cm.teachSkill(2221002,0,10); //Mana Reflection
        cm.teachSkill(2221000,0,10); //Maple Warrior
        //Bishop (4th Job)
        cm.teachSkill(2321007,0,10); //Angel's Ray
        cm.teachSkill(2321009,0,10); //Hero's Will
        cm.teachSkill(2321003,0,10); //Bahamut
        cm.teachSkill(2321001,0,10); //Big Bang
        cm.teachSkill(2321008,0,10); //Genesis
        cm.teachSkill(2321005,0,10); //Holy Shield
        cm.teachSkill(2321004,0,10); //Infinity
        cm.teachSkill(2321002,0,10); //Mana Reflection
        cm.teachSkill(2321000,0,10); //Maple Warrior
        cm.teachSkill(2321006,0,10); //Resurrection
        //Bow Master (4th Job)
        cm.teachSkill(3121009,0,10); //Hero's Will
        cm.teachSkill(3120005,0,10); //Bow Expert
        cm.teachSkill(3121008,0,10); //Concentration
        cm.teachSkill(3121003,0,10); //Dragon Pulse
        cm.teachSkill(3121007,0,10); //Hamstring
        cm.teachSkill(3121000,0,10); //Maple Warrior
        cm.teachSkill(3121006,0,10); //Phoenix
        cm.teachSkill(3121002,0,10); //Sharp Eyes
        cm.teachSkill(3121004,0,10); //Storm Arrow
        //Crossbow Master (4th Job)
        cm.teachSkill(3221008,0,10); //Hero's Will
        cm.teachSkill(3221006,0,10); //Blind
        cm.teachSkill(3220004,0,10); //Crossbow Expert
        cm.teachSkill(3221003,0,10); //Dragon Pulse
        cm.teachSkill(3221005,0,10); //Freezer
        cm.teachSkill(3221000,0,10); //Maple Warrior
        cm.teachSkill(3221001,0,10); //Piercing
        cm.teachSkill(3221002,0,10); //Sharp Eyes
        cm.teachSkill(3221007,0,10); //Sniping
        //Night Lord (4th Job)
        //cm.teachSkill(4121009,0,10); //Hero's Will
        cm.teachSkill(4120002,0,10); //Shadow Shifter
        cm.teachSkill(4121000,0,10); //Maple Warrior
        cm.teachSkill(4121004,0,10); //Ninja Ambush
        cm.teachSkill(4121008,0,10); //Ninja Storm
        cm.teachSkill(4121003,0,10); //Taunt
        cm.teachSkill(4121006,0,10); //Spirit Claw
        cm.teachSkill(4121007,0,10);/// Triple Throw
        cm.teachSkill(4120005,0,10); //Venomous Star
        //Shadower (4th Job)
        cm.teachSkill(4221001,0,10); //Assassinate
        cm.teachSkill(4221008,0,10); //Hero's Will
        cm.teachSkill(4221007,0,10); //Boomerang Step
        cm.teachSkill(4220002,0,10); //Shadow Shifter
        cm.teachSkill(4221000,0,10); //Maple Warrior
        cm.teachSkill(4221004,0,10); //Ninja Ambush
        cm.teachSkill(4221003,0,10); //Taunt
        cm.teachSkill(4221006,0,10); //Smokescreen
        cm.teachSkill(4220005,0,10); //Venomous Dagger
        //Buccaneer (4th Job)
        cm.teachSkill(5121000,0,10); //Maple Warrior
        cm.teachSkill(5121001,0,10); //Dragon Strike
        cm.teachSkill(5121002,0,10); //Energy Orb
        cm.teachSkill(5121003,0,10); //Super Transformation
        cm.teachSkill(5121004,0,10); //Demolition
        cm.teachSkill(5121005,0,10); //Snatch
        cm.teachSkill(5121007,0,10); //Barrage
        cm.teachSkill(5121008,0,10); //Pirate's Rage
        cm.teachSkill(5121009,0,10); //Speed Infusion
        cm.teachSkill(5121010,0,10); //Time Leap
        //Corsair (4th Job)
        cm.teachSkill(5220001,0,10); //Elemental Boost
        cm.teachSkill(5220002,0,10); //Wrath of the Octopi
        cm.teachSkill(5220011,0,10); //Bullseye
        cm.teachSkill(5221000,0,10); //Maple Warrior
        cm.teachSkill(5221003,0,10); //Aerial Strike
        cm.teachSkill(5221004,0,10); //Rapid Fire
        cm.teachSkill(5221006,0,10); //Battleship
        cm.teachSkill(5221007,0,10); //Battleship Cannon
        cm.teachSkill(5221008,0,10); //Battleship Torpedo
        cm.teachSkill(5221009,0,10); //Hypnotize
        cm.teachSkill(5221010,0,10); //Speed Infusion
        //Soul Warrior 3rd Job
        cm.teachSkill(11110000,0,10); //Improving MP Recovery
        cm.teachSkill(11110005,0,10); //Advance Combo
        cm.teachSkill(11111001,0,10); //Combo Attack
        cm.teachSkill(11111002,0,10); //Sword: Panic
        cm.teachSkill(11111003,0,10); //Sword: Coma
        cm.teachSkill(11111004,0,10); //Brandish
        cm.teachSkill(11111006,0,10); //Soul Blow
        cm.teachSkill(11111007,0,10); //Soul Charge
        //Flame Wizard 3rd Job
        cm.teachSkill(12110000,0,10); //Elemental Resistance
        cm.teachSkill(12110001,0,10); //Element Amplification
        cm.teachSkill(12111002,0,10); //Seal
        cm.teachSkill(12111003,0,10); //Meteo
        cm.teachSkill(12111004,0,10); //Ifrit
        cm.teachSkill(12111005,0,10); //Flame Gear
        cm.teachSkill(12111006,0,10); //Fire Strike
        //Wind Breaker 3rd Job
        cm.teachSkill(13110003,0,10); //Bow Expert
        cm.teachSkill(13111000,0,10); //Arrow Rain
        cm.teachSkill(13111001,0,10); //Strafe
        cm.teachSkill(13111002,0,10); //Hurricane
        cm.teachSkill(13111004,0,10); //Puppet
        cm.teachSkill(13111005,0,10); //Albatross
        cm.teachSkill(13111006,0,10); //Wind Piercing
        cm.teachSkill(13111007,0,10); //Wind Shot


        
cm.dispose();
        }

        
        
        
        /* Coco
        Refining NPC: 
    * Chaos scroll SYNTHETIZER (rofl)
        * 
        * @author RonanLana


var status = 0;
var selectedType = -1;
var selectedItem = -1;
var item;
var mats;
var matQty;
var cost;
var qty;
var equip;
var last_use; //last item is a use item

function start() {
    cm.getPlayer().setCS(true);
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1)
        status++;
    else {
        cm.sendOk("Oh, ok... Talk back to us when you want to make business.");
        cm.dispose();
        return;
    }

    if (status == 0) {
        var selStr = "Hey traveler! Come, come closer... We offer a #bhuge opportunity of business#k to you. If you want to know what it is, keep listening...";
        cm.sendNext(selStr);
    }
    else if (status == 1) {
    var selStr = "We've got here the knowledge to synthetize the mighty #b#t2049100##k! Of course, making one is not an easy task... But worry not! Just gather some material to me and a fee of #b1,200,000 mesos#k for our services to #bobtain it#k. You still want to do it?";
        cm.sendYesNo(selStr);
    }

    else if (status == 2) {
        //selectedItem = selection;
        selectedItem = 0;

        var itemSet = new Array(2049100, 7777777);
        var matSet = new Array(new Array(4031203,4001356,4000136,4000082,4001126,4080100,4000021,4003005));
        var matQtySet = new Array(new Array(100,60,40,80,10,8,200,120));
        var costSet = new Array(1200000, 7777777);
        item = itemSet[selectedItem];
        mats = matSet[selectedItem];
        matQty = matQtySet[selectedItem];
        cost = costSet[selectedItem];
                
        var prompt = "So, you want us to make some #t" + item + "#? In that case, how many do you want us to make?";
        cm.sendGetNumber(prompt,1,1,100)
    }
        
    else if (status == 3) {
        qty = (selection > 0) ? selection : (selection < 0 ? -selection : 1);
        last_use = false;
                
        var prompt = "You want us to make ";
        if (qty == 1)
            prompt += "a #t" + item + "#?";
        else
            prompt += qty + " #t" + item + "#?";
                        
        prompt += " In that case, we're going to need specific items from you in order to make it. Make sure you have room in your inventory, though!#b";
                
        if (mats instanceof Array){
            for (var i = 0; i < mats.length; i++) {
                prompt += "\r\n#i"+mats[i]+"# " + matQty[i] * qty + " #t" + mats[i] + "#";
            }
        } else {
            prompt += "\r\n#i"+mats+"# " + matQty * qty + " #t" + mats + "#";
        }
                
        if (cost > 0) {
            prompt += "\r\n#i4031138# " + cost * qty + " meso";
        }
        cm.sendYesNo(prompt);
    }
    
    else if (status == 4) {
        var complete = true;
                
        if (cm.getMeso() < cost * qty) {
            cm.sendOk("Come on! We're not here doing you a favor! We all need money to live properly, so bring the cash so we make deal and start the synthesis.");
        }
        else if(!cm.canHold(item, qty)) {
            cm.sendOk("You didn't check if you got a slot to spare on your inventory before our business, no?");
        }
        else {
            if (mats instanceof Array) {
                for (var i = 0; complete && i < mats.length; i++) {
                    if (matQty[i] * qty == 1) {
                        complete = cm.haveItem(mats[i]);
                    } else {
                        complete = cm.haveItem(mats[i], matQty[i] * qty);
                    }
                }
            } else {
                complete = cm.haveItem(mats, matQty * qty);
            }
            
            if (!complete)
                cm.sendOk("You kidding, right? We won't be able to start the process without all the ingredients at hands. Go get all of them and then talk to us!");
            else {
                if (mats instanceof Array) {
                    for (var i = 0; i < mats.length; i++){
                        cm.gainItem(mats[i], -matQty[i] * qty);
                    }
                } else {
                    cm.gainItem(mats, -matQty * qty);
                }
                cm.gainMeso(-cost * qty);
                cm.gainItem(item, qty);
                cm.sendOk("Wow... can't believe it worked! To think for a moment that it could f... Ahem. Of course it worked, all work of ours are very efficient! Nice doing business with you.");
            }
        }
        cm.dispose();
    }
}
*/
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
        //cm.sendSimple("Hello There This is the Cash Shop#r#e" + cm.getPlayer().getMesos(1) + "of [NAME] you can trade NX Items for mPoints");
        cm.sendSimple("Hello There This is the Cash Shop NPC You have #r#e" + cm.getPlayer().getMesos(1) + " NX#k of [NAME] you can trade mPoints for NX Items...#b\r\n\r\n#L0#Weapon#l\r\n#L1#Hats#l\r\n#L2#Tops#l\r\n#L3#Bottoms#l\r\n#L4#Shoes#l\r\n#L5#Capes#l\r\n#L6#Cubes#1");
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
            if (cm.getPlayer().getMesos(1) < items[select2][i][1] / 2) {
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
            cm.sendGetNumber("How many would you like? (1#v" + items[select][selection][0] + "##t" + items[select][selection][0] + "# = " + items[select][selection][1] / 2 + " Cash) (Current Cash: " + cm.getPlayer().getMesos(1) + ")", 1, 1, cm.getPlayer().getMesos(1) / (items[select][selection][1] / 2));
        }
    } else if (status == 3) {
        if ((items[select][select2][0] == 2314000 || items[select][select2][0] == 5610000 || items[select][select2][0] == 5610001 || items[select][select2][0] == 5062001 || items[select][select2][0] == 5614000) && cm.getPlayer().getLevel() < 70) {
            cm.sendOk("Sorry but you must be level 70 or above to get this item.");
        } else if (items[select][select2][0] == 2022179 && cm.getPlayer().getLevel() < 50) {
            cm.sendOk("Sorry but you must be level 50 or above to get this item.");
        } else if (cm.getPlayer().getMesos(1) < items[select][select2][1] / 2) {
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