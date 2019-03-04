package tools;

import java.sql.Connection;
import java.sql.SQLException;
import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;

import constants.ServerConstants;

/**
 * @author Frz (Big Daddy)
 * @author The Real Spookster (some modifications to this beautiful code)
 * @author Ronan (some connection pool to this beautiful code)
 */
public class DatabaseConnection {
    private static HikariDataSource ds;
    
    public static Connection getConnection() throws SQLException {
        if (ds == null) {
            initDataSource();
        }
        try {
            return ds.getConnection();
        } catch (SQLException sqle) {
            sqle.printStackTrace();
            throw sqle;
        }
    }

    private static void initDataSource() {
        try {
            Class.forName("org.mariadb.jdbc.Driver");
        } catch (ClassNotFoundException e) {
            System.out.println("[SEVERE] SQL Driver Not Found. Consider death by clams.");
            e.printStackTrace();
        }
        
        ds = null;

        HikariConfig config = new HikariConfig();
        config.setJdbcUrl(ServerConstants.DB_URL);
        config.setUsername(ServerConstants.DB_USER);
        config.setPassword(ServerConstants.DB_PASS);
        config.setConnectionTimeout(30 * 1000);
        config.setMaximumPoolSize(10);
        config.addDataSourceProperty("cachePrepStmts", true);
        config.addDataSourceProperty("prepStmtCacheSize", 250);
        config.addDataSourceProperty("prepStmtCacheSqlLimit", 2048);
        config.addDataSourceProperty("useServerPrepStmts", true);
        config.addDataSourceProperty("useLocalSessionState", true);
        config.addDataSourceProperty("rewriteBatchedStatements", true);
        config.addDataSourceProperty("cacheResultSetMetadata", true);
        config.addDataSourceProperty("cacheServerConfiguration", true);
        config.addDataSourceProperty("elideSetAutoCommits", true);
        config.addDataSourceProperty("maintainTimeStats", false);
        ds = new HikariDataSource(config);
    }
}