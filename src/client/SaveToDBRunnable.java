package client;

import org.slf4j.MDC;

public class SaveToDBRunnable implements Runnable {
    private final String TASK_NAME = "saveToDB";
    private final String WAITING_STATE = "WAITING";
    private MapleCharacter mapleCharacter;

    public SaveToDBRunnable(MapleCharacter mapleCharacter) {
        this.mapleCharacter = mapleCharacter;
    }

    public void run() {
        MDC.put("Task", TASK_NAME);
        MDC.put("Character", mapleCharacter.getName());
        MDC.put("Status", WAITING_STATE);
        mapleCharacter.saveToDB(true);
        MDC.clear();
    }
}
