package repository;

import client.MapleCharacter;
import constants.RebirthPath;
import exception.UpdatedRowCountMismatchException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import tools.DatabaseConnection;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class RebirthpathRepository {
    private static final Logger logger = LoggerFactory.getLogger(RebirthpathRepository.class);

    private RebirthpathRepository() { }

    public static void CreateNewEntryForCharacterId(int characterId) throws UpdatedRowCountMismatchException {
        final String INSERT_INTO_REBIRTHPATH_STRING = "INSERT INTO `rebirthpath` (`id`, `characterid`, `path`) VALUES (DEFAULT, " + characterId + ", 0)";

        Connection connection = null;
        PreparedStatement insertIntoRebirthpathQuery = null;
        int rowsUpdated = 0;

        try {
            connection = DatabaseConnection.getConnection();
            connection.setAutoCommit(false);
            insertIntoRebirthpathQuery = connection.prepareStatement(INSERT_INTO_REBIRTHPATH_STRING);
            rowsUpdated = insertIntoRebirthpathQuery.executeUpdate();
            connection.commit();
        } catch (SQLException e) {
            logger.error("Error: Could not insert new character into `rebirthpath` table. CharacterId: {}", characterId, e);
            try {
                connection.rollback();
            } catch (SQLException ex) {
                logger.error("Could not rollback.", ex);
            }
        }
        finally {
            try {
                if(connection != null) connection.close();
                if(insertIntoRebirthpathQuery != null) insertIntoRebirthpathQuery.close();
            } catch (SQLException e) {
                logger.error("Could not close connection for all boss entries. CharacterId: {}", characterId, e);
            }
        }

        if (rowsUpdated == 0) {
            throw new UpdatedRowCountMismatchException("Error when trying to insert new character into `bossentries` table. CharacterIds: " + characterId);
        }
    }

    public static void persistRebirthPath(MapleCharacter mapleCharacter) throws UpdatedRowCountMismatchException {
        Connection connection = null;
        PreparedStatement updateRebirthPath = null;

        int rowCount = 0;
        int rowsUpdated = 0;

        try {
            connection = DatabaseConnection.getConnection();
            connection.setAutoCommit(false);
            updateRebirthPath = connection.prepareStatement("UPDATE rebirthpath SET path = ? WHERE characterid = ?");
            updateRebirthPath.setInt(1, mapleCharacter.getRebirthPath().getId());
            updateRebirthPath.setInt(2, mapleCharacter.getId());
            rowsUpdated = updateRebirthPath.executeUpdate();
            connection.commit();
        } catch (SQLException e) {
            logger.error("Error: Could not update in `bossentries` table for " + mapleCharacter.getName(), e);
            try {
                connection.rollback();
            } catch (SQLException ex) {
                logger.error("Could not rollback.", ex);
            }
        } finally {
            try {
                if(connection != null) connection.close();
                if(updateRebirthPath != null) updateRebirthPath.close();
            } catch (SQLException e) {
                logger.error("Could not close connection for reset boss entries", e);
            }
        }

        if (rowCount != rowsUpdated) {
            throw new UpdatedRowCountMismatchException("Error when trying to persist rebirth path in `bossentries` table for " + mapleCharacter.getName());
        }
    }

    public static RebirthPath getRebirthPath(int characterId) throws UpdatedRowCountMismatchException {
        RebirthPath rebirthPath = RebirthPath.NONE;

        Connection connection = null;
        PreparedStatement selectRebirthPath = null;
        ResultSet rebirthPathResult = null;

        try {
            connection = DatabaseConnection.getConnection();
            connection.setReadOnly(true);
            selectRebirthPath = connection.prepareStatement("SELECT path FROM rebirthpath WHERE characterid = ?");
            selectRebirthPath.setInt(1, characterId);
            rebirthPathResult = selectRebirthPath.executeQuery();
            rebirthPathResult.next();
            if(rebirthPathResult.getInt("path") == RebirthPath.ENLIGHTENMENT.getId()) {
                rebirthPath = RebirthPath.ENLIGHTENMENT;
            } else if (rebirthPathResult.getInt("path") == RebirthPath.ENFORCEMENT.getId()) {
                rebirthPath = RebirthPath.ENFORCEMENT;
            }
        } catch (SQLException e) {
            logger.error("Error: Could not update in `bossentries` table. CharacterId: " + characterId, e);
            try {
                connection.rollback();
            } catch (SQLException ex) {
                logger.error("Could not rollback.", ex);
            }
        } finally {
            try {
                if(connection != null) connection.close();
                if(selectRebirthPath != null) selectRebirthPath.close();
                if(rebirthPathResult != null) rebirthPathResult.close();
            } catch (SQLException e) {
                logger.error("Could not close connection for reset boss entries", e);
            }
        }

        return rebirthPath;
    }
}
