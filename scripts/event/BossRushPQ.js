/**
 * @author: Ronan
 * @event: Boss Rush PQ
*/

var isPq = true;
var minPlayers = 1, maxPlayers = 6;
var minLevel = 1, maxLevel = 255;
var entryMap = 970030100;
var exitMap = 970030000;
var recruitMap = 970030000;
var clearMap = 970030000;

var minMapId = 970030001;
var maxMapId = 970042711;

var eventTime = 5;     //5 minutes

var lobbyRange = [0, 7];

function init() {
        setEventRequirements();
}

function setLobbyRange() {
        return lobbyRange;
}

function setEventRequirements() {
        var reqStr = "";
        
        reqStr += "\r\n    Number of players: ";
        if(maxPlayers - minPlayers >= 1) reqStr += minPlayers + " ~ " + maxPlayers;
        else reqStr += minPlayers;
        
        reqStr += "\r\n    Level range: ";
        if(maxLevel - minLevel >= 1) reqStr += minLevel + " ~ " + maxLevel;
        else reqStr += minLevel;
        
        reqStr += "\r\n    Time limit: ";
        reqStr += eventTime + " minutes";
        
        em.setProperty("party", reqStr);
}
1
function setEventExclusives(eim) {}

function setEventRewards(eim) {
        var itemSet, itemQty, evLevel;

        evLevel = 6;    //Rewards at event completion
        itemSet = [2040805, 2040915, 2040920, 2043002, 2043102, 2043202, 2044002, 2044102, 2044202, 2044302, 2044502, 2044602, 2044702, 2044802, 2043702, 2043802, 2044902];
        itemQty = [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6;
        eim.setEventRewards(evLevel, itemSet, itemQty);

        evLevel = 5;    //Rewards at Rest Spot V
        itemSet = [2040805, 2040915, 2040920, 2043002, 2043102, 2043202, 2044002, 2044102, 2044202, 2044302, 2044502, 2044602, 2044702, 2044802, 2043702, 2043802, 2044902];
        itemQty = [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5];
        eim.setEventRewards(evLevel, itemSet, itemQty);
        
        evLevel = 4;    //Rewards at Rest Spot IV
        itemSet = [2040805, 2040915, 2040920, 2043002, 2043102, 2043202, 2044002, 2044102, 2044202, 2044302, 2044502, 2044602, 2044702, 2044802, 2043702, 2043802, 2044902];
        itemQty = [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4];
        eim.setEventRewards(evLevel, itemSet, itemQty);
        
        evLevel = 3;    //Rewards at Rest Spot III
        itemSet = [2040805, 2040915, 2040920, 2043002, 2043102, 2043202, 2044002, 2044102, 2044202, 2044302, 2044502, 2044602, 2044702, 2044802, 2043702, 2043802, 2044902];
        itemQty = [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3];
        eim.setEventRewards(evLevel, itemSet, itemQty);
        
        evLevel = 2;    //Rewards at Rest Spot II
        itemSet = [2040805, 2040915, 2040920, 2043002, 2043102, 2043202, 2044002, 2044102, 2044202, 2044302, 2044502, 2044602, 2044702, 2044802, 2043702, 2043802, 2044902];
        itemQty = [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2];
        eim.setEventRewards(evLevel, itemSet, itemQty);
        
        evLevel = 1;    //Rewards at Rest Spot I
        itemSet = [2040805, 2040915, 2040920, 2043002, 2043102, 2043202, 2044002, 2044102, 2044202, 2044302, 2044502, 2044602, 2044702, 2044802, 2043702, 2043802, 2044902];
        itemQty = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1;
        eim.setEventRewards(evLevel, itemSet, itemQty);
}

function getEligibleParty(party) {      //selects, from the given party, the team that is allowed to attempt this event
        var eligible = [];
        var hasLeader = false;
        
        if(party.size() > 0) {
                var partyList = party.toArray();

                for(var i = 0; i < party.size(); i++) {
                        var ch = partyList[i];

                        if(ch.getMapId() == recruitMap && ch.getLevel() >= minLevel && ch.getLevel() <= maxLevel) {
                                if(ch.isLeader()) hasLeader = true;
                                eligible.push(ch);
                        }
                }
        }
        
        if(!(hasLeader && eligible.length >= minPlayers && eligible.length <= maxPlayers)) eligible = [];
        return eligible;
}

function setup(level, lobbyid) {
        var eim = em.newInstance("BossRush" + lobbyid);
        eim.setProperty("level", level);
        eim.setProperty("lobby", lobbyid);
        
        eim.startEventTimer(eventTime * 60000);
        setEventRewards(eim);
        setEventExclusives(eim);
        return eim;
}

function afterSetup(eim) {}

function playerEntry(eim, player) {
        var map = eim.getMapInstance(entryMap + eim.getIntProperty("lobby"));
        player.changeMap(map, map.getPortal(0));
}

function scheduledTimeout(eim) {
        end(eim);
}

function playerUnregistered(eim, player) {}

function playerExit(eim, player) {
        eim.unregisterPlayer(player);
        player.changeMap(exitMap, 0);
}

function playerLeft(eim, player) {
        if(!eim.isEventCleared()) {
                playerExit(eim, player);
        }
}

function changedMap(eim, player, mapid) {
        if (mapid < minMapId || mapid > maxMapId) {
                if (eim.isEventTeamLackingNow(true, minPlayers, player)) {
                        eim.unregisterPlayer(player);
                        end(eim);
                }
                else
                        eim.unregisterPlayer(player);
        }
}

function changedLeader(eim, leader) {
        var mapid = leader.getMapId();
        if (!eim.isEventCleared() && (mapid < minMapId || mapid > maxMapId)) {
                end(eim);
        }
}

function playerDead(eim, player) {}

function playerRevive(eim, player) { // player presses ok on the death pop up.
        if (eim.isEventTeamLackingNow(true, minPlayers, player)) {
                eim.unregisterPlayer(player);
                end(eim);
        }
        else
                eim.unregisterPlayer(player);
}


function playerDisconnected(eim, player) {
        if (eim.isEventTeamLackingNow(true, minPlayers, player))
                end(eim);
        else
                playerExit(eim, player);
}

function leftParty(eim, player) {
        if (eim.isEventTeamLackingNow(false, minPlayers, player)) {
                end(eim);
        }
        else
                playerLeft(eim, player);
}

function disbandParty(eim) {
        if (!eim.isEventCleared()) {
                end(eim);
        }
}

function monsterValue(eim, mobId) {
        return 1;
}

function end(eim) {
        var party = eim.getPlayers();
        for (var i = 0; i < party.size(); i++) {
                playerExit(eim, party.get(i));
        }
        eim.dispose();
}

function clearPQ(eim) {
        eim.stopEventTimer();
        eim.setEventCleared();      // from now on event just finishes when ALL players gets out of the range defined inside changedMap function.
}

function giveRandomEventReward(eim, player) {
        eim.giveEventReward(player);
}

function monsterKilled(mob, eim) {}

function allMonstersDead(eim) {}

function cancelSchedule() {}

function dispose(eim) {}
