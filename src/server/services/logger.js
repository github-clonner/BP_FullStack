import winston from 'winston'
import fs from 'fs'
import WinstonDaily from 'winston-daily-rotate-file'
import { isProd } from '../../shared/util'

const logDir = 'logs'

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir)
}

const tsFormat = () => (new Date()).toLocaleTimeString()

const logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({
      timestamp: tsFormat,
      colorize: true,
      prettyPrint: true,
      level: 'info'
    }),
    new (WinstonDaily)({
      filename: `${logDir}/-results.log`,
      timestamp: tsFormat,
      datePattern: 'yyyy-MM-dd',
      prepend: true,
      level: !isProd ? 'verbose' : 'info'
    })
  ]
})

module.exports = {
  logger
}
