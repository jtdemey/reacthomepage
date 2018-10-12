import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.simple()
  ),
  transports: [
    new winston.transports.Console({ timestamp: 'true' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

export default logger;