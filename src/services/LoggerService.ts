import winston from "winston";

// timestamp + log level + message

const dateFormat = () => {
  return new Date(Date.now()).toLocaleString();
};

class LoggerService {
  private logger: winston.Logger;

  constructor(private path: string) {
    this.logger = winston.createLogger({
      level: "info",
      format: winston.format.printf((info) => `${dateFormat()} | ${info.level.toUpperCase()} | ${info.message}`),
      transports: [new winston.transports.Console(), new winston.transports.File({ filename: `/log/${path}.log` })],
    });
  }

  public info(message: string): void {
    this.logger.log("info", message);
  }

  public error(message: string): void {
    this.logger.log("error", message);
  }

  public warn(message: string): void {
    this.logger.log("warn", message);
  }

  public debug(message: string): void {
    this.logger.log("debug", message);
  }

  public verbose(message: string): void {
    this.logger.log("verbose", message);
  }

  public silly(message: string): void {
    this.logger.log("silly", message);
  }
}

export default LoggerService;
