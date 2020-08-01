/**
 * Configurations of logger.
 */
import winston from 'winston';

const consoleConfig = [new winston.transports.Console()];

export const logger = winston.createLogger({
  transports: consoleConfig,
});
