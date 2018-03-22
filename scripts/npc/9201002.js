function start() { 
    cm.sendSimple("Congratulations on your marriage! Please choose the ring that corresponds to your engagement ring! \r\n #L0# Moonstone Wedding Ring #l \r\n #L1# Star gem Wedding Ring #l \r\n #L2# Golden Heart Wedding Ring #l\r\n #L3# Silver Swan Wedding Ring #l"); 
} 

function action(mode, type, selection) { 
    if (mode == 1) { 
        if (selection == 0) {
            cm.gainItem(4031358, -1);
		    cm.gainItem(1112803, 1);
        }
        else if (selection == 1) {
            cm.gainItem(4031360, -1)
		    cm.gainItem(1112806, 1)
        }
        else if (selection == 2) {
            cm.gainItem(4031362, -1)
			cm.gainItem(1112807, 1)
        }
		 else if (selection == 3) {
            cm.gainItem(4031364, -1) 
			cm.gainItem(1112809, 1)
        }
		//snow flake hat 1003755
    } 
    cm.dispose(); 
}  