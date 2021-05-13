import { log, rgb24 } from "../deps.ts";

export {};

await log.setup({
  handlers: {
    console: new log.handlers.ConsoleHandler("DEBUG", {
      formatter: (logRecord) => {
        switch (logRecord.levelName) {
          case "INFO":
            return rgb24(
              `${rgb24(logRecord.levelName, 0x4d8ff)} [${rgb24(
                logRecord.datetime.toLocaleTimeString(),
                0xaffaf7
              )}] ${logRecord.msg}`,
              0xffffff
            );
          case "WARNING":
            return rgb24(
              `${rgb24(logRecord.levelName, 0xeda915)} [${rgb24(
                logRecord.datetime.toLocaleString(),
                0xedcd85
              )}] ${logRecord.msg}`,
              0xffffff
            );
          case "ERROR":
            return rgb24(
              `${rgb24(logRecord.levelName, 0xfc520f)} [${rgb24(
                logRecord.datetime.toLocaleString(),
                0xf2bca7
              )}] ${logRecord.msg}`,
              0xffffff
            );
          default:
            return "";
        }
      },
    }),
  },

  loggers: {
    // configure default logger available via short-hand methods above.
    default: {
      level: "NOTSET",
      handlers: ["console"],
    },
  },
});
