function start() { 
    cm.sendSimple("Which would you like? \r\n #L0# Moonstone Engagement Ring Box #l \r\n #L1# Star gem Engagement Ring Box #l \r\n #L2# Golden Heart Engagement Ring Box #l\r\n #L3# Silver Swan Engagement Ring Box #l"); 
} 

function action(mode, type, selection) { 
    if (mode == 1) { 
        if (selection == 0) 
            cm.gainItem(2240000, 1); 
        else if (selection == 1) 
            cm.gainItem(2240001, 1); 
        else if (selection == 2) 
            cm.gainItem(2240002, 1); 
		 else if (selection == 3) 
            cm.gainItem(2240002, 1); 
		//snow flake hat 1003755
    } 
    cm.dispose(); 
}  