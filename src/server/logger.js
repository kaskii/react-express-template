import { createLogger, format, transports } from 'winston';
import 'winston-daily-rotate-file';
import expressWinston from 'express-winston';
import fs from 'fs';

const transportsArray = [];
const msgQue = []; // Use this to buffer messages before logger initialization

const logFormat = format.combine(
    format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.json()
);

if (process.env.LOG_FILE === 'true') {
    if (!fs.existsSync('logs')) {
        fs.mkdirSync('logs');
    }

    const logLevel = process.env.LOG_LEVEL_FILE || 'warning';
    const dailyRotateFileTransport = new transports.DailyRotateFile({
        filename: 'logs/%DATE%-app.log',
        level: logLevel
    });

    transportsArray.push(dailyRotateFileTransport);
    msgQue.push(`LOG_FILE=true, logging to a file with level ${logLevel}`);
} else {
    msgQue.push('File logging disabled');
}

if (process.env.LOG_CONSOLE === 'true' || process.env.NODE_ENV === 'development') {
    const logLevel = process.env.LOG_LEVEL_CONSOLE || 'warning';
    transportsArray.push(new transports.Console({
        format: format.combine(
            format.colorize(),
            format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
        ),
        level: logLevel
    }));
    msgQue.push(`Either LOG_CONSOLE is set or NODE_ENV is development, logging to console with level ${logLevel}`);
} else {
    msgQue.push('Console logging disabled');
}

const logger = createLogger({
    format: logFormat,
    transports: transportsArray
});

const expressLogger = expressWinston.logger({
    format: logFormat,
    transports: transportsArray,
    meta: true,
    expressFormat: true,
    colorize: true
});

for (const msg of msgQue) {
    logger.info(msg);
}

export const Logger = logger;
export const ExpressLogger = expressLogger;
