function start() {
    cm.sendYesNo("Hey are you an aran? Want me to teach you your hidden skills so you don't have to do quests? If so click yes and I will add them for you.");
}

function action(mode, type, selection) {
        //cm.resetStats();
 // Double Swing
        cm.teachSkill(21000000,0); // Combat Ability
 // Combat Step
        cm.teachSkill(21001003,0); // Pole Arm Booster
        // Aran Second job
 // Triple Swing
        cm.teachSkill(21100000,0); // Pole Arm Mastery
        cm.teachSkill(21100002,0); // Final Charge
 // Body Pressure
        cm.teachSkill(21100004,0); // Combo Smash
        cm.teachSkill(21100005,0); // Combo Drain
        
        // Aran Thief Job
        cm.teachSkill(21110000,0); // Critical Combo
        cm.teachSkill(21110002,0); // Full Swing
        cm.teachSkill(21110003,0); // Final Toss
        cm.teachSkill(21110004,0); // Fenir Phantom
        cm.teachSkill(21111005,0); // Snow Charge
        cm.teachSkill(21110006,0); // WhirlWind
        cm.teachSkill(21111001,0); // Smart Knockback
        cm.teachSkill(1120004,0); //Achilles
        cm.teachSkill(1120003,0); //Advanced Combo
        cm.teachSkill(1121011,0); //Hero's Will
        cm.teachSkill(1120005,0); //Blocking
        cm.teachSkill(1121008,0); //Brandish
        cm.teachSkill(1121010,0); //Enrage
        cm.teachSkill(1121000,0); //Maple Warrior
        cm.teachSkill(1121001,0); //Monster Magnet
        cm.teachSkill(1121006,0); //Rush
        cm.teachSkill(1121002,0); //Stance
        //Paladin (4th Job)
        cm.teachSkill(1220005,0); //Achilles
        cm.teachSkill(1220010,0); //Advanced Charge
        cm.teachSkill(1221012,0); //Hero's Will
        cm.teachSkill(1221009,0); //Blast
        cm.teachSkill(1220006,0); //Blocking
        cm.teachSkill(1221004,0); //Divine Charge: Mace
        cm.teachSkill(1221003,0); //Holy Charge: Sword
        cm.teachSkill(1221000,0); //Maple Warrior
        cm.teachSkill(1221001,0); //Monster Magnet
        cm.teachSkill(1221007,0); //Rush
        cm.teachSkill(1221011,0); //Sanctuary
        cm.teachSkill(1221002,0); //Stance
        //Dark Knight (4th Job)
        cm.teachSkill(1320005,0); //Achilles
        cm.teachSkill(1321010,0); //Hero's Will
        cm.teachSkill(1321007,0); //Beholder
        cm.teachSkill(1320009,0); //Beholder's Buff
        cm.teachSkill(1320008,0); //Beholder's Healing
        cm.teachSkill(1320006,0); //Berserk
        cm.teachSkill(1321000,0); //Maple Warrior
        cm.teachSkill(1321001,0); //Monster Magnet
        cm.teachSkill(1321003,0); //Rush
        cm.teachSkill(1321002,0); //Stance
        //Fire/Poison Arch Mage (4th Job)
        cm.teachSkill(2121008,0); //Hero's Will
        cm.teachSkill(2121001,0); //Big Bang
        cm.teachSkill(2121005,0); //Elquines
        cm.teachSkill(2121003,0); //Fire Demon
        cm.teachSkill(2121004,0); //Infinity
        cm.teachSkill(2121002,0); //Mana Reflection
        cm.teachSkill(2121000,0); //Maple Warrior
        cm.teachSkill(2121007,0); //Meteo
        cm.teachSkill(2121006,0); //Paralyze
        //Ice/Lightning Arch Mage (4th Job)
        cm.teachSkill(2221008,0); //Hero's Will
        cm.teachSkill(2221001,0); //Big Bang
        cm.teachSkill(2221007,0); //Blizzard
        cm.teachSkill(2221006,0); //Chain Lightning
        cm.teachSkill(2221003,0); //Ice Demon
        cm.teachSkill(2221005,0); //Ifrit
        cm.teachSkill(2221004,0); //Infinity
        cm.teachSkill(2221002,0); //Mana Reflection
        cm.teachSkill(2221000,0); //Maple Warrior
        //Bishop (4th Job)
        cm.teachSkill(2321007,0); //Angel's Ray
        cm.teachSkill(2321009,0); //Hero's Will
        cm.teachSkill(2321003,0); //Bahamut
        cm.teachSkill(2321001,0); //Big Bang
        cm.teachSkill(2321008,0); //Genesis
        cm.teachSkill(2321005,0); //Holy Shield
        cm.teachSkill(2321004,0); //Infinity
        cm.teachSkill(2321002,0); //Mana Reflection
        cm.teachSkill(2321000,0); //Maple Warrior
        cm.teachSkill(2321006,0); //Resurrection
        //Bow Master (4th Job)
        cm.teachSkill(3121009,0); //Hero's Will
        cm.teachSkill(3120005,0); //Bow Expert
        cm.teachSkill(3121008,0); //Concentration
        cm.teachSkill(3121003,0); //Dragon Pulse
        cm.teachSkill(3121007,0); //Hamstring
        cm.teachSkill(3121000,0); //Maple Warrior
        cm.teachSkill(3121006,0); //Phoenix
        cm.teachSkill(3121002,0); //Sharp Eyes
        cm.teachSkill(3121004,0); //Storm Arrow
        //Crossbow Master (4th Job)
        cm.teachSkill(3221008,0); //Hero's Will
        cm.teachSkill(3221006,0); //Blind
        cm.teachSkill(3220004,0); //Crossbow Expert
        cm.teachSkill(3221003,0); //Dragon Pulse
        cm.teachSkill(3221005,0); //Freezer
        cm.teachSkill(3221000,0); //Maple Warrior
        cm.teachSkill(3221001,0); //Piercing
        cm.teachSkill(3221002,0); //Sharp Eyes
        cm.teachSkill(3221007,0); //Sniping
        //Night Lord (4th Job)
        //cm.teachSkill(4121009,0); //Hero's Will
        cm.teachSkill(4120002,0); //Shadow Shifter
        cm.teachSkill(4121000,0); //Maple Warrior
        cm.teachSkill(4121004,0); //Ninja Ambush
        cm.teachSkill(4121008,0); //Ninja Storm
        cm.teachSkill(4121003,0); //Taunt
        cm.teachSkill(4121006,0); //Spirit Claw
        cm.teachSkill(4121007,0);/// Triple Throw
        cm.teachSkill(4120005,0); //Venomous Star
        //Shadower (4th Job)
        cm.teachSkill(4221001,0); //Assassinate
        cm.teachSkill(4221008,0); //Hero's Will
        cm.teachSkill(4221007,0); //Boomerang Step
        cm.teachSkill(4220002,0); //Shadow Shifter
        cm.teachSkill(4221000,0); //Maple Warrior
        cm.teachSkill(4221004,0); //Ninja Ambush
        cm.teachSkill(4221003,0); //Taunt
        cm.teachSkill(4221006,0); //Smokescreen
        cm.teachSkill(4220005,0); //Venomous Dagger
        //Buccaneer (4th Job)
        cm.teachSkill(5121000,0); //Maple Warrior
        cm.teachSkill(5121001,0); //Dragon Strike
        cm.teachSkill(5121002,0); //Energy Orb
        cm.teachSkill(5121003,0); //Super Transformation
        cm.teachSkill(5121004,0); //Demolition
        cm.teachSkill(5121005,0); //Snatch
        cm.teachSkill(5121007,0); //Barrage
        cm.teachSkill(5121008,0); //Pirate's Rage
        cm.teachSkill(5121009,0); //Speed Infusion
        cm.teachSkill(5121010,0); //Time Leap
        //Corsair (4th Job)
        cm.teachSkill(5220001,0); //Elemental Boost
        cm.teachSkill(5220002,0); //Wrath of the Octopi
        cm.teachSkill(5220011,0); //Bullseye
        cm.teachSkill(5221000,0); //Maple Warrior
        cm.teachSkill(5221003,0); //Aerial Strike
        cm.teachSkill(5221004,0); //Rapid Fire
        cm.teachSkill(5221006,0); //Battleship
        cm.teachSkill(5221007,0); //Battleship Cannon
        cm.teachSkill(5221008,0); //Battleship Torpedo
        cm.teachSkill(5221009,0); //Hypnotize
        cm.teachSkill(5221010,0); //Speed Infusion
        
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