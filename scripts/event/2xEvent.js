/*
	This file is part of the OdinMS Maple Story Server
    Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc>
		       Matthias Butz <matze@odinms.de>
		       Jan Christian Meyer <vimes@odinms.de>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation version 3 as published by
    the Free Software Foundation. You may not use, modify or distribute
    this program under any other version of the GNU Affero General Public
    License.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
/**
-- Odin JavaScript --------------------------------------------------------------------------------
	2x EXP Event Script
-- Author --------------------------------------------------------------------------------------
	Twdtwd
**/

var timer1;
var timer2;
var timer3;
var timer4;

importPackage(Packages.client);

function init() {
	
        if(em.getChannelServer().getId() == 1) { // Only run on channel 1.
		// 13:00 - 19:00 PST
		timer1 = em.scheduleAtTimestamp("start", 1526932800000);
		timer2 = em.scheduleAtTimestamp("stop", 1526954400000);
	}
        
}

function cancelSchedule() {
    if (timer1 != null)
        timer1.cancel(true);
	if (timer2 != null)
        timer2.cancel(true);
	if (timer3 != null)
        timer3.cancel(true);
	if (timer4 != null)
        timer4.cancel(true);
}

function start() {
   var world = Packages.net.server.Server.getInstance().getWorld(em.getChannelServer().getWorld());
   world.setExpRate(16);
   world.setDropRate(6);
   world.broadcastPacket(Packages.tools.MaplePacketCreator.serverNotice(6, "[Event] Double Exp & Double Drop event has started!  "));
}

function stop() {
   var world = Packages.net.server.Server.getInstance().getWorld(em.getChannelServer().getWorld());
   world.setExpRate(8);
   world.setDropRate(3);
   world.broadcastPacket(Packages.tools.MaplePacketCreator.serverNotice(6, "[Event] The Event has ended. "));
}