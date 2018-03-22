function start() { 
    cm.sendSimple("Which would you like? \r\n #L0# Moonstone Engagement Ring #l \r\n #L1# Star gem Engagement Ring #l \r\n #L2# Golden Heart Engagement Ring #l\r\n #L3# Silver Swan Engagement Ring #l"); 
} 

function action(mode, type, selection) { 
    if (mode == 1) { 
        if (selection == 0) 
            cm.gainItem(4031358, 1); 
        else if (selection == 1) 
            cm.gainItem(4031360, 1); 
        else if (selection == 2) 
            cm.gainItem(4031362, 1); 
		 else if (selection == 3) 
            cm.gainItem(4031364, 1); 
		//snow flake hat 1003755
    } 
    cm.dispose(); 
}  