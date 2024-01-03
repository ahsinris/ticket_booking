import winston from 'winston'

// log format

const logFormat = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.json()
);

// logger instance

const logger = winston.createLogger({
    level: 'info', // Set the default log level
    format: logFormat,
    transports: [
        new winston.transports.Console(), // Log to the console
        new winston.transports.File({
            filename: 'error.log',
            level: 'error' // Log only error messages to this file
        }),
        new winston.transports.File({
            filename: 'success.log',
            level: 'info' // Log only info messages to this file
        })

    ],
});

export default logger

