package model;

public class Bossentries {
    private int id;
    private int characterid;
    private int zakum;
    private int horntail;
    private int showaboss;
    private int papulatus;
    private int scarlion;

    public Bossentries() { }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getCharacterid() {
        return characterid;
    }

    public void setCharacterid(int characterid) {
        this.characterid = characterid;
    }

    public int getZakum() {
        return zakum;
    }

    public void setZakum(int zakum) {
        this.zakum = zakum;
    }

    public int getHorntail() {
        return horntail;
    }

    public void setHorntail(int horntail) {
        this.horntail = horntail;
    }

    public int getShowaboss() {
        return showaboss;
    }

    public void setShowaboss(int showaboss) {
        this.showaboss = showaboss;
    }

    public int getPapulatus() {
        return papulatus;
    }

    public void setPapulatus(int papulatus) {
        this.papulatus = papulatus;
    }

    public int getScarlion() {
        return scarlion;
    }

    public void setScarlion(int scarlion) {
        this.scarlion = scarlion;
    }

    @Override
    public String toString() {
        return "Daily Boss Entries: " +
                "zakum: " + zakum +
                ", horntail: " + horntail +
                ", showaboss: " + showaboss +
                ", papulatus: " + papulatus +
                ", scarlion: " + scarlion;
    }
}
