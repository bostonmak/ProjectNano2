package repository;

import client.MapleCharacter;
import exception.*;
import model.Bossentries;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import server.expeditions.MapleExpeditionType;
import tools.DatabaseConnection;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class BossentriesRepository {
    public static final String TABLE_NAME = "bossentries";
    private static Logger logger = LoggerFactory.getLogger(BossentriesRepository.class);

    public static Bossentries GetAllEntriesForCharacterId(int characterId) throws ZeroRowsFetchedException, MoreThanOneRowException {
        final Bossentries bossentries = new Bossentries();
        Connection connection = null;
        PreparedStatement selectAllEntriesQuery = null;
        ResultSet selectAllEntriesResult = null;
        final String selectAllEntries = "SELECT * FROM `bossentries` WHERE characterid = " + characterId;
        try {
            connection = DatabaseConnection.getConnection();
            connection.setReadOnly(true);
            selectAllEntriesQuery = connection.prepareStatement(selectAllEntries);
            selectAllEntriesResult = selectAllEntriesQuery.executeQuery();
            if (selectAllEntriesResult.next() == false) {
                throw new ZeroRowsFetchedException();
            }
            if (selectAllEntriesResult.getFetchSize() > 1) {
                throw new MoreThanOneRowException();
            }
            bossentries.setId(selectAllEntriesResult.getInt("id"));
            bossentries.setCharacterid(selectAllEntriesResult.getInt("characterid"));
            bossentries.setZakum(selectAllEntriesResult.getInt("zakum"));
            bossentries.setHorntail(selectAllEntriesResult.getInt("horntail"));
            bossentries.setShowaboss(selectAllEntriesResult.getInt("showaboss"));
            bossentries.setPapulatus(selectAllEntriesResult.getInt("papulatus"));
            bossentries.setScarlion(selectAllEntriesResult.getInt("scarlion"));
        } catch (SQLException e) {
            logger.error("Could not get all boss entries. CharacterId: {}", characterId, e);
        }
        finally {
            try {
                if(connection != null) connection.close();
                if(selectAllEntriesQuery != null) selectAllEntriesQuery.close();
                if(selectAllEntriesResult != null) selectAllEntriesResult.close();
            } catch (SQLException e) {
                logger.error("Could not close connection for all boss entries. CharacterId: {}", characterId, e);
            }
        }
        return bossentries;
    }

    public static List<Bossentries> GetEntriesForParty(List<MapleCharacter> mapleCharacters) {
        List<Bossentries> bossentriesList = new ArrayList<>();

        final List<Integer> mapleCharacterIds = GetMaplecharacterIds(mapleCharacters);
        final String selectZakumEntriesForPartyString = WriteSelectBossentriesQuery(mapleCharacterIds);

        Connection connection = null;
        PreparedStatement selectEntriesForPartyQuery = null;
        ResultSet selectEntriesForPartyResult = null;
        try {
            connection = DatabaseConnection.getConnection();
            connection.setReadOnly(true);
            selectEntriesForPartyQuery = connection.prepareStatement(selectZakumEntriesForPartyString);
            selectEntriesForPartyResult = selectEntriesForPartyQuery.executeQuery();
            while(selectEntriesForPartyResult.next()) {
                Bossentries bossentries = new Bossentries();
                bossentries.setId(selectEntriesForPartyResult.getInt("id"));
                bossentries.setCharacterid(selectEntriesForPartyResult.getInt("characterid"));
                bossentries.setZakum(selectEntriesForPartyResult.getInt("zakum"));
                bossentries.setHorntail(selectEntriesForPartyResult.getInt("horntail"));
                bossentries.setShowaboss(selectEntriesForPartyResult.getInt("showaboss"));
                bossentries.setPapulatus(selectEntriesForPartyResult.getInt("papulatus"));
                bossentries.setScarlion(selectEntriesForPartyResult.getInt("scarlion"));
                bossentriesList.add(bossentries);
            }
        } catch (SQLException e) {
            logger.error("Could not get all party member entries. CharacterIds: {}", mapleCharacterIds, e);
        }
        finally {
            try {
                if(connection != null) connection.close();
                if(selectEntriesForPartyQuery != null) selectEntriesForPartyQuery.close();
                if(selectEntriesForPartyResult != null) selectEntriesForPartyResult.close();
            } catch (SQLException e) {
                logger.error("Could not close connection for all party member entries.", e);
            }
        }

        return bossentriesList;
    }

    public static void DecrementEntriesForParty(List<MapleCharacter> mapleCharacters, MapleExpeditionType mapleExpeditionType) throws NoMapleCharacterIdsException, DecrementBossentryZeroOrLessException, UpdatedRowCountMismatchException {
        final List<Integer> mapleCharacterIds = GetMaplecharacterIds(mapleCharacters);
        final String selectEntriesForPartyString = WriteSelectBossentriesQuery(mapleCharacterIds);

        Connection connection = null;
        PreparedStatement selectEntriesForPartyQuery = null;
        ResultSet selectEntriesForPartyResult = null;
        PreparedStatement updateEntriesForPartyBatch = null;
        int[] rowsUpdated = null;

        List<Bossentries> bossentriesList = new ArrayList<>();
        try {
            connection = DatabaseConnection.getConnection();
            connection.setAutoCommit(false);
            selectEntriesForPartyQuery = connection.prepareStatement(selectEntriesForPartyString);
            selectEntriesForPartyResult = selectEntriesForPartyQuery.executeQuery();
            while(selectEntriesForPartyResult.next()) {
                Bossentries bossentries = new Bossentries();
                bossentries.setId(selectEntriesForPartyResult.getInt("id"));
                bossentries.setCharacterid(selectEntriesForPartyResult.getInt("characterid"));
                bossentries.setZakum(selectEntriesForPartyResult.getInt("zakum"));
                bossentries.setHorntail(selectEntriesForPartyResult.getInt("horntail"));
                bossentries.setShowaboss(selectEntriesForPartyResult.getInt("showaboss"));
                bossentries.setPapulatus(selectEntriesForPartyResult.getInt("papulatus"));
                bossentries.setScarlion(selectEntriesForPartyResult.getInt("scarlion"));
                bossentriesList.add(bossentries);
            }

            for(Bossentries bossentries : bossentriesList) {
                switch (mapleExpeditionType) {
                    case ZAKUM: {
                        if (bossentries.getZakum() <= 0) {
                            throw new DecrementBossentryZeroOrLessException("Error tried to decrement zakum boss entry that is already zero or less. CharacterId: " + bossentries.getCharacterid());
                        }
                        updateEntriesForPartyBatch = connection.prepareStatement("UPDATE `bossentries` SET zakum = ? WHERE characterid = ?");
                        updateEntriesForPartyBatch.setInt(1, bossentries.getZakum() - 1);
                        updateEntriesForPartyBatch.setInt(2, bossentries.getCharacterid());
                        updateEntriesForPartyBatch.addBatch();
                        break;
                    }
                    case HORNTAIL: {
                        if (bossentries.getHorntail() <= 0) {
                            throw new DecrementBossentryZeroOrLessException("Error tried to decrement horntail boss entry that is already zero or less. CharacterId: " + bossentries.getCharacterid());
                        }
                        updateEntriesForPartyBatch = connection.prepareStatement("UPDATE `bossentries` SET horntail = ? WHERE characterid = ?");
                        updateEntriesForPartyBatch.setInt(1, bossentries.getHorntail() - 1);
                        updateEntriesForPartyBatch.setInt(2, bossentries.getCharacterid());
                        updateEntriesForPartyBatch.addBatch();
                        break;
                    }
                    case SHOWA: {
                        if (bossentries.getShowaboss() <= 0) {
                            throw new DecrementBossentryZeroOrLessException("Error tried to decrement showa boss entry that is already zero or less. CharacterId: " + bossentries.getCharacterid());
                        }
                        updateEntriesForPartyBatch = connection.prepareStatement("UPDATE `bossentries` SET showaboss = ? WHERE characterid = ?");
                        updateEntriesForPartyBatch.setInt(1, bossentries.getShowaboss() - 1);
                        updateEntriesForPartyBatch.setInt(2, bossentries.getCharacterid());
                        updateEntriesForPartyBatch.addBatch();
                        break;
                    }
                    case SCARGA: {
                        if (bossentries.getScarlion() <= 0) {
                            throw new DecrementBossentryZeroOrLessException("Error tried to decrement scarlion boss entry that is already zero or less. CharacterId: " + bossentries.getCharacterid());
                        }
                        updateEntriesForPartyBatch = connection.prepareStatement("UPDATE `bossentries` SET scarlion = ? WHERE characterid = ?");
                        updateEntriesForPartyBatch.setInt(1, bossentries.getScarlion() - 1);
                        updateEntriesForPartyBatch.setInt(2, bossentries.getCharacterid());
                        updateEntriesForPartyBatch.addBatch();
                        break;
                    }
                }
            }

            rowsUpdated = updateEntriesForPartyBatch.executeBatch();
            connection.commit();
        } catch (SQLException e) {
            logger.error("Could not decrement all party member entries. CharacterIds: {}", mapleCharacterIds, e);
            try {
                connection.rollback();
            } catch (SQLException ex) {
                logger.error("Could not rollback decrement all party member entries. CharacterIds: {}", mapleCharacterIds, ex);
            }
        }
        finally {
            try {
                if(connection != null) connection.close();
                if(selectEntriesForPartyQuery != null) selectEntriesForPartyQuery.close();
                if(selectEntriesForPartyResult != null) selectEntriesForPartyResult.close();
                if(updateEntriesForPartyBatch != null) updateEntriesForPartyBatch.close();
            } catch (SQLException e) {
                logger.error("Could not close connection for decrement all party member entries.", e);
            }
        }

        if (rowsUpdated != null && rowsUpdated.length != bossentriesList.size()) {
            throw new UpdatedRowCountMismatchException("Error when decrementing boss entries. Actual rows updated did not match expected. CharacterIds: " + bossentriesList);
        }
    }

    private static List<Integer> GetMaplecharacterIds(List<MapleCharacter> mapleCharacters) throws NoMapleCharacterIdsException {
        List<Integer> mapleCharacterIds = new ArrayList<>();
        for(MapleCharacter mapleCharacter : mapleCharacters) {
            mapleCharacterIds.add(mapleCharacter.getId());
        }

        if (mapleCharacterIds.isEmpty()) {
            logger.error("Error no maplecharacter ids were found for expedition. CharacterIds: {}", mapleCharacterIds);
            throw new NoMapleCharacterIdsException();
        }
        return mapleCharacterIds;
    }

    private static String WriteSelectBossentriesQuery(List<Integer> mapleCharacterIds) {
        StringBuilder selectZakumEntriesForPartyBuilder = new StringBuilder();
        for(int i = 0; i < mapleCharacterIds.size(); i++) {
            if (i == 0) {
                selectZakumEntriesForPartyBuilder.append("SELECT * FROM `bossentries` WHERE characterid = " + mapleCharacterIds.get(0));
            } else {
                selectZakumEntriesForPartyBuilder.append(" AND characterid = " + mapleCharacterIds.get(i));
            }
        }
        return selectZakumEntriesForPartyBuilder.toString();
    }
}
