const { createLogger, transports, configure, format } = require("winston");
require("winston-mongodb").MongoDB;
require("express-async-errors");

module.exports = function () {
  // Create the winston logger to handle the exceptions
  const logger = createLogger({
    transports: [
      new transports.File({
        filename: "uncaughtExceptions.log",
        level: "info",
      }),
    ],
    exitOnError: false,
  });

  /* Handle unhandled exception */
  logger.exceptions.handle(
    new transports.File({ filename: "exceptions.log", level: "info" })
  );

  /* Handle unhandled rejection */
  logger.rejections.handle(
    new transports.File({ filename: "rejections.log", level: "error" })
  );

  // Load the winston module for the file
  configure({
    transports: [
      new transports.File({
        filename: "logFile.log",
        level: "error",
        format: format.combine(
          format.colorize(),
          format.simple(),
          format.json()
        ),
      }),
      // Winston Database error logger
      new transports.MongoDB({
        collection: "log",
        db: "mongodb://localhost:27017/petChannel",
        name: "error-mongodb",
        level: "info",
      }),
    ],
  });
};
