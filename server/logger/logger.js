const {format, createLogger, transports} = require('winston');
const { timestamp, combine, printf } = format;

const logFormat = printf(({level, message, data, timestamp }) => {
    return `${timestamp} ${level}: ${message} ${data || ''}`;
})

const logger = createLogger({
    //level: 'verbose',
    /* format: combine(
        format.colorize(),
        timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
        logFormat), */
    transports: [
        new transports.Console({
            format: combine(
                format.colorize(),
                timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
                logFormat),
            level: 'verbose'
        }),
        new transports.File({
            filename: 'logs/example.log',
            level: 'info'
        })
    ]
})

module.exports = logger;