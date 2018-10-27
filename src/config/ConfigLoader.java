package config;

import constants.ConfigPaths;
import constants.ServerConstants;
import net.server.Server;
import net.server.channel.Channel;
import net.server.world.World;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import tools.Pair;

import java.io.FileInputStream;
import java.util.*;

public class ConfigLoader {
    private static final Logger logger = LoggerFactory.getLogger(ConfigLoader.class);

    public ConfigLoader() {

    }

    public void LoadServerConstantsConfig() {
        Properties p = new Properties();
        try {
            p.load(new FileInputStream(ConfigPaths.getConfig()));

            //Server Host
            ServerConstants.HOST = p.getProperty("HOST");

            //Sql Database
            ServerConstants.DB_URL = p.getProperty("URL");
            ServerConstants.DB_USER = p.getProperty("DB_USER");
            ServerConstants.DB_PASS = p.getProperty("DB_PASS");

            //java8 And Shutdownhook
            ServerConstants.JAVA_8 = p.getProperty("JAVA8").equalsIgnoreCase("TRUE");
            ServerConstants.SHUTDOWNHOOK = p.getProperty("SHUTDOWNHOOK").equalsIgnoreCase("true");

        } catch (Exception e) {
            logger.error("Failed to load server configurations. Using default configuration values.", e);
            ServerConstants.HOST = "localhost";
            ServerConstants.DB_URL = "jdbc:mysql://localhost:3306/heavenms";
            ServerConstants.DB_USER = "root";
            ServerConstants.DB_PASS = "";
            ServerConstants.JAVA_8 = false;
            ServerConstants.SHUTDOWNHOOK = true;
        }
    }

    public void LoadWorldConfig() {
        Properties p = new Properties();
        try {
            p.load(new FileInputStream(ConfigPaths.getWorldConfig()));
        } catch (Exception e) {
            logger.error("Please start create_server.bat", e);
            System.exit(0);
        }

        try {
            Integer worldCount = Math.min(ServerConstants.WORLD_NAMES.length, Integer.parseInt(p.getProperty("worlds")));

            List<Pair<Integer, String>> worldRecommendedList = new LinkedList<>();
            List<World> worlds = new ArrayList<>();
            List<Map<Integer, String>> channels = new LinkedList<>();

            for (int i = 0; i < worldCount; i++) {
                System.out.println("Starting world " + i);
                World world = new World(i,
                        Integer.parseInt(p.getProperty("flag" + i)),
                        p.getProperty("eventmessage" + i),
                        ServerConstants.EXP_RATE,
                        ServerConstants.DROP_RATE,
                        ServerConstants.MESO_RATE,
                        ServerConstants.QUEST_RATE);

                worldRecommendedList.add(new Pair<>(i, p.getProperty("whyamirecommended" + i)));
                worlds.add(world);
                Server.getInstance().setWorlds(worlds);
                channels.add(new HashMap<Integer, String>());
                for (int j = 0; j < Integer.parseInt(p.getProperty("channels" + i)); j++) {
                    int channelid = j + 1;
                    Channel channel = new Channel(i, channelid);
                    world.addChannel(channel);
                    channels.get(i).put(channelid, channel.getIP());
                }
                world.setServerMessage(p.getProperty("servermessage" + i));
                System.out.println("Finished loading world " + i + "\r\n");
            }

            Server.getInstance().setWorldRecommendedList(worldRecommendedList);
            Server.getInstance().setWorlds(worlds);
            Server.getInstance().setChannels(channels);
        } catch (Exception e) {
            logger.error("Failed to load world configurations. Error in world.ini, start CreateINI.bat to re-make the file.", e);
            System.exit(0);
        }
    }
}
