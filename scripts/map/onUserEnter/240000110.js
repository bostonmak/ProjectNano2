importPackage(Packages.tools);

var eventName = "Cabin";
var toMap = 200090210;

function start(ms) {   	       
	var em = ms.getClient().getEventManager(eventName);
	
	//is the player late to start the travel?
	if(em.getProperty("docked") == "false") {
		ms.getClient().getPlayer().warp(toMap);
        }
}