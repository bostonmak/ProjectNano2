package batch;

import exception.UpdatedRowCountMismatchException;
import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import repository.BossentriesRepository;

import static constants.GameConstants.DAILY_BOSS_LIMIT_RESET_VALUE;

public class ResetDailyBossLimitJob implements Job {
    private static Logger logger = LoggerFactory.getLogger(ResetDailyBossLimitJob.class);

    public void execute(JobExecutionContext context) {
        boolean success = false;
        try {
            BossentriesRepository.SetEntriesForAll(DAILY_BOSS_LIMIT_RESET_VALUE);
            success = true;
        } catch (UpdatedRowCountMismatchException e) {
            logger.error(e.getMessage());
        } finally {
            String successString = success ? "SUCCESS" : "FAILED";
            logger.info("Task: {}, Status: {}", "ResetDailyBossLimitJob", successString);
        }
    }
}
