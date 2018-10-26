package constants;

import net.server.Server;

public class ConfigPaths {
    private static final String configHomePath = "config/";

    private static final String prodConfigPath = configHomePath + "configuration.ini";
    private static final String testConfigPath = configHomePath + "testconfiguration.ini";
    private static final String localConfigPath = configHomePath + "localconfiguration.ini";
    private static final String prodWorldConfigpath = configHomePath + "world.ini";
    private static final String testWorldConfigpath = configHomePath + "world.ini";
    private static final String localWorldConfigpath = configHomePath + "world.ini";

    public static String getConfig() {
        String path = localConfigPath;
        if (Server.getInstance().getEnvironment().equals("prod")) {
            path = prodConfigPath;
        }
        if (Server.getInstance().getEnvironment().equals("test")) {
            path = testConfigPath;
        }
        return path;
    }

    public static String getWorldConfig() {
        String path = localWorldConfigpath;
        if (Server.getInstance().getEnvironment().equals("prod")) {
            path = prodWorldConfigpath;
        }
        if (Server.getInstance().getEnvironment().equals("test")) {
            path = testWorldConfigpath;
        }
        return path;
    }
}
