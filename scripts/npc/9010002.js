function start() { 
    cm.sendSimple("Which would you like? \r\n #L0# NX ITEM 1 #l \r\n #L1# NX ITEM 2 #l \r\n #L2# NX ITEM 3 #l"); 
} 

function action(mode, type, selection) { 
    if (mode == 1) { 
        if (selection == 0) 
            cm.gainItem(1050319, 1); 
        else if (selection == 1) 
            cm.gainItem(1050331, 1); 
        else if (selection == 2) 
            cm.gainItem(1050318, 1); 
		//snow flake hat 1003755
    } 
    cm.dispose(); 
}  