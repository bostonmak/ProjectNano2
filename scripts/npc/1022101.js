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
		cm.teachSkill(21111001,0); // Smart Knockback*/
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
var status = 0;
var menuSelect = 0;


var mhair = Array(30000, 30010, 30020, 30030, 30040, 30050, 30060, 30070, 30080, 30090, 30110, 30120, 30130, 30140, 30150, 30160, 30170, 30180, 30190, 30200, 30210, 30220, 30230, 30240, 30250, 30260, 30270, 30280, 30290, 30300, 30310, 30320, 30330, 30340, 30350, 30360, 30370, 30400, 30410, 30420, 30440, 30450, 30460, 30470, 30480, 30490, 30510, 30520, 30530, 30540, 30550, 30560, 30570, 30580, 30590, 30600, 30610, 30620, 30630, 30640, 30650, 30660, 30670, 30680, 30690, 30700, 30710, 30720, 30730, 30740, 30750, 30760, 30770, 30780, 30790, 30800, 30810, 30820, 30830, 30840, 30850, 30860, 30870, 30880, 30890, 30900, 30910, 30920);
var fhair = Array(31000, 31010, 31020, 31030, 31040, 31050, 31060, 31070, 31080, 31090, 31100, 31110, 31120, 31130, 31140, 31150, 31160, 31170, 31180, 31190, 31200, 31210, 31220, 31230, 31240, 31250, 31260, 31270, 31280, 31290, 31300, 31310, 31320, 31330, 31340, 31350, 31400, 31410, 31420, 31440, 31450, 31460, 31470, 31480, 31490, 31510, 31520, 31530, 31540, 31550, 31560, 31570, 31580, 31590, 31600, 31610, 31620, 31630, 31640, 31650, 31670, 31680, 31690, 31700, 31710, 31720, 31730, 31740, 31750, 31760, 31770, 31780, 31790, 31800, 31810, 31820, 31830, 31840, 31850, 31860, 31870, 31880, 31890);
var mface = Array(20000, 20001, 20002, 20003, 20004, 20005, 20006, 20007, 20008, 20009, 20010, 20011, 20012, 20013, 20014, 20016, 20017, 20018, 20019, 20020, 20021, 20022, 20023, 20024, 20026);
var fface = Array(21000, 21001, 21002, 21003, 21004, 21005, 21006, 21007, 21008, 21009, 21010, 21011, 21012, 21013, 21014, 21016, 21017, 21018, 21019, 21020, 21021, 21022, 21024, 21025);
var skin = Array(0, 1, 2, 3, 4, 5, 9, 10);


var lookList;


function start() {
    status = -1;
    action(1, 0, 0);
}


function action(mode, type, selection) {
    if (mode == 0) { // mode == 0 means you pressed exit
        if (menuSelect == 6 && status == 2) { // If you said no when we asked if you wanted to warp out
            cm.sendOk("All right, just look for me if you change your mind!");
        }
        cm.dispose();
        return;
    } else { // mode == 1 means you pressed next, ok, or selected something, or other normal stuff
        status++; // adds 1 to status.
    }
    
    if (status == 0) {
        cm.sendNext("=============================================Welcome to #e#rProjectNano #e#b#h ##k#n! \r\n My name is Rooney! \r\n Please Read our Server information tab \r\n which includes rules of the server as well as information! \r\n Type @commands in chat for a list of player commands \r\n #rHave Fun!#k#n! ============================================= ");
    } else if (status == 1) {
        var selText = "How can I help you today?\r\n";
        selText += "\r\n#L0#Information of the server. Currency, Rates, And rules#l";
        // #L0# This opens the selection. The 0 means selection 0
        // #l this closes the selection
        selText += "\r\n#L1#Change my hairstyle!#l";
        selText += "\r\n#L2#Change my hair color!#l";
        selText += "\r\n#L3#Change my eyes!#l";
        selText += "\r\n#L4#Change my eye color!#l";
        selText += "\r\n#L5#Change my skin color!#l";
        cm.sendSimple(selText);
    } else if (status == 2) {
        menuSelect = selection; // See this selection? It stores the result of the previous chat window. Let me show you
        switch (menuSelect) {
            case 0:
                cm.sendNext("==================#e#gInformation#k#n================== \r\n Hello #e#h ##n, We have been working on this server for a little over 8 months on and off. \r\n Staff List: \r\n\r\n  LordFacere \r\n  Bobo \r\n  Lee \r\n  Type @GM for assistance \r\n ==================#e#bCurrency#k#n==================== \r\n Our currency has not been implemented yet but we are soon to have one! \r\n\r\n ===================#e#dRates#k#n===================== \r\n Our rates are 10x Exp 5x Drop 10x Meso. Type @checkmyrates to check your exp rate! \r\n\r\n ===========::~::#e#rRules Of ProjectNano#k#n::~::=========== \r\n #eOffenses:#n \r\nType @GM for Immediate assistance\r\nRule#1 No bugging GM's for item's. This will result in: \r\n\r\n1st offence: warning  \r\n2nd offense: mute \r\n\r\nNo asking to be a GM \r\n\r\n1st offence: warning \r\n\r\n =============================================\r\n#eHacking & Botting#n \r\n\r\nThis is an extremely serious issue no hacking nor botting will be tolerated in this server it #eWILL#n result listed below \r\n\r\n1st offense: #e#rPermanent Ban#n#k =============================================\r\n#eScamming#n \r\nScamming is also taken very seriously and will be dealt with \r\n\r\n1st offense: Jail & case by case dealings\r\n ============================================= \r\n If you have any questions or problems involving the server please join our discord channel at https://discord.gg/mS2xAnG ");
                status = 0; // I'm re-directing you back to the menu here
                break;
            case 1: // Change hairstyle
                lookList = new Array();
                var current = cm.getPlayer().getHair() % 10;
                if (cm.getPlayer().getGender() == 0) {
                    for (var i = 0; i < mhair.length; i++) {
                        lookList.push(mhair[i] + current);
                    }
                } else {
                    for (var i = 0; i < fhair.length; i++) {
                        lookList.push(fhair[i] + current);
                    }
                }
                cm.sendStyle("What hairstyle are you interested in?", lookList);            
                break;
            case 2: // Change hair color
                lookList = new Array();
                var current = (cm.getPlayer().getHair() / 10) * 10;
                for (var i = 0; i < 8; i++)
                    lookList.push(current + i);
                cm.sendStyle("What hair color are you interested in?", lookList);            
                break;
            case 3:
                lookList = new Array();
                var current = (cm.getPlayer().getFace() % 1000) - (cm.getPlayer().getFace() % 100);
                if (cm.getPlayer().getGender() == 0) {
                    for (var i = 0; i < mface.length; i++) {
                        lookList.push(mface[i] + current);
                    }
                } else {
                    for (var i = 0; i < fface.length; i++) {
                        lookList.push(fface[i] + current);
                    }
                }
                cm.sendStyle("What eyes are you interested in?", lookList);    
                break;
            case 4:
                lookList = new Array();
                var current = 0;
                if (cm.getPlayer().getGender() == 0) {
                    current = cm.getPlayer().getFace() % 100 + 20000;
                } else {
                    current = cm.getPlayer().getFace() % 100 + 21000;
                }
                for (var i = 0; i < 8; i++) {
                    lookList.push(current + (i * 100));
                }
                cm.sendStyle("What eye color are you interested in?", lookList);    
                break;
            case 5:
                cm.sendStyle("What skin color are you interested in?", skin);
                break;
        }
    } else if (status == 3) {
        if (menuSelect == 1 || menuSelect == 2) { 
            cm.setHair(lookList[selection]);
            cm.sendNext("Your looks have been changed! Is there anything else?");
            status = 0;
        } else if (menuSelect == 3 || menuSelect == 4) {
            cm.setFace(lookList[selection]);
            cm.sendNext("Your looks have been changed! Is there anything else?");
            status = 0;
        } else if (menuSelect == 5) {
            cm.setSkin(skin[selection]);
            cm.sendNext("Your looks have been changed! Is there anything else?");
            status = 0;
        } else {
            cm.dispose();
        }
    }
}  
		