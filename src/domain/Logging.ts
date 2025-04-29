export interface Logging {
    info(message: string): void;
    error(message: string): void;
    warn(message: string): void;
    debug(message: string): void;
    log(level: string, message: string): void;
}