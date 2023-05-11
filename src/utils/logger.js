import winston from 'winston';
import config from '../config.js';

const warningLevels = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        http: 4,
        debug: 5
    },
    colors: {
        fatal: 'red',
        error: 'orange',
        warning: 'yellow',
        info: 'blue',
        http: 'green',
        debug: 'grey'
    }
}

let logger;

if (config.nodeEnv === 'development') {
    
    logger = winston.createLogger({
        levels: warningLevels.levels,
        transports:[
            new winston.transports.Console({
                level: 'info',
                format: winston.format.combine(
                    winston.format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
                    winston.format.colorize({colors: warningLevels.colors}),
                    winston.format.simple
                )}),
        ]

    });

}else if (config.nodeEnv === 'production'){
    logger = winston.createLogger({
        levels: warningLevels.levels,
        transports:[
            new winston.transports.File({
                level: 'error',
                filename: './logs/error.log',
                format: winston.format.combine(
                    winston.format.timestamp(),
                    winston.format.prettyPrint(),
                    winston.format.label({ label: 'prodLog: ' }),
                )

            })
        ]
    })


}else{
    console.log('las variables de entorno deben ser developement o production')
}