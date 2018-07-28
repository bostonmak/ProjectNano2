package constants;

public enum RebirthPath {
    NONE(0, 5), ENLIGHTENMENT(1, 1), ENFORCEMENT(2, 3);

    final int id;
    final int apGain;

    RebirthPath(int id, int apGain) {
        this.id = id;
        this.apGain = apGain;
    }

    public int getId() {
        return id;
    }

    public int getApGain() { return apGain; }
}
