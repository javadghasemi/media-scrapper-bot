import winston, {format} from "winston";
const { combine, timestamp, label, printf } = format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `[${level}] ${timestamp}
└─> ${message}`;
});

export const logger = {
  level: 'info',
  format: combine(
    format.colorize(),
    timestamp(),
    myFormat
  ),
  colorize: true,
  transports: [
    new winston.transports.Console({
      timestamp() {
        return new Date().toLocaleTimeString()
      },
      prettyPrint: true
    })
  ]
}