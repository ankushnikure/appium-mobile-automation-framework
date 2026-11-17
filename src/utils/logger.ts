
import * as fs from 'node:fs';
import * as path from 'node:path';

const LOG_LEVELS = {
    error: 0,
    warn: 1,
    info: 2,
    debug: 3,
} as const;

type LogLevel = keyof typeof LOG_LEVELS;

const COLORS: Record<LogLevel, string> = {
    error: '\x1b[31m',
    warn: '\x1b[33m',
    info: '\x1b[32m',
    debug: '\x1b[36m',
};

const RESET_COLOR = '\x1b[0m';

export class Logger {
    private readonly context: string;
    private readonly logLevel: number;
    private readonly logFile: string;

    constructor(context = 'default') {
        this.context = context;

        const configuredLevel = process.env.LOG_LEVEL?.toLowerCase();

        this.logLevel =
            configuredLevel && configuredLevel in LOG_LEVELS
                ? LOG_LEVELS[configuredLevel as LogLevel]
                : LOG_LEVELS.info;

        const logsDir = path.join(process.cwd(), 'logs');

        if (!fs.existsSync(logsDir)) {
            fs.mkdirSync(logsDir, { recursive: true });
        }

        const date = new Date().toISOString().split('T')[0];

        this.logFile = path.join(logsDir, `test-run-${date}.log`);
    }

    private formatMessage(message: unknown): string {
        if (message instanceof Error) {
            return message.stack ?? `${message.name}: ${message.message}`;
        }

        if (typeof message === 'string') {
            return message;
        }

        return JSON.stringify(message) ?? String(message);
    }

    private writeToFile(formatted: string): void {
        try {
            fs.appendFileSync(this.logFile, formatted + '\n');
        } catch {
            // File logging should not interrupt test execution.
        }
    }

    private log(level: LogLevel, message: unknown): void {
        if (LOG_LEVELS[level] > this.logLevel) {
            return;
        }

        const timestamp = new Date().toISOString();
        const formattedMessage = this.formatMessage(message);

        const formatted =
            `[${timestamp}] [${level.toUpperCase()}] [${this.context}] ${formattedMessage}`;

        console.log(`${COLORS[level]}${formatted}${RESET_COLOR}`);

        this.writeToFile(formatted);
    }

    error(message: unknown): void {
        this.log('error', message);
    }

    warn(message: unknown): void {
        this.log('warn', message);
    }

    info(message: unknown): void {
        this.log('info', message);
    }

    debug(message: unknown): void {
        this.log('debug', message);
    }

    step(message: unknown): void {
        this.log('info', `STEP: ${this.formatMessage(message)}`);
    }
}
