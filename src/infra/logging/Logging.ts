import { createLogger, transports, format, Logger } from "winston";
import { Logging } from "../../domain/Logging";

class LoggerService implements Logging {
    private logger: Logger;

    constructor() {
        this.logger = createLogger({
            level: "info",
            format: format.combine(
                format.timestamp(),
                format.json(),
                format.colorize(),
                format.printf(({ level, message, timestamp }) => {
                    return `${timestamp} ${level}: ${message}`;
                }),
            ),
            transports: [
                new transports.Console(),
                new transports.File({
                    filename: "error.log",
                    level: "error",
                }),
                new transports.File({ filename: "combined.log" }),
            ],
        });
    }

    info(message: string) {
        this.logger.info(message);
    }

    error(message: string) {
        this.logger.error(message);
    }

    warn(message: string) {
        this.logger.warn(message);
    }

    debug(message: string) {
        this.logger.debug(message);
    }

    log(level: string, message: string) {
        this.logger.log({ level, message });
    }
}

export const logging = new LoggerService();