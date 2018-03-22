/*
Sets Your Sp to 0
*/


var status = 0;
var price = 100000;


function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (status == 0) {
        cm.sendYesNo("Do You Want to Set Your SP points to 0? you'll need it for your 3rd job advancement . it only costs you 100,000 mesos.");
        status++;
    } else {
        if ((status == 1 && type == 1 && selection == -1 && mode == 0) || mode == -1) {
            
        } else {
            if (status == 1) {
                if (cm.getMeso() >= price) {
                    cm.player.setRemainingSp(0)
                    cm.gainMeso(-price);
                    cm.sendOk("Sp Resetted . Please re-LogIn For the Effect To Take Place .")
                    cm.dispose();
                } else {
                    cm.sendOk("I'm Sorry . Get 100,000 mesos first .");
                    cm.dispose();
                }
            }
        }
    }
}