/**
 * Safe console utility that removes all logs in production
 * No console output in production builds
 */

const isProduction = process.env.NODE_ENV === "production";

export const safeConsole = {
  log: (...args: any[]) => {
    if (!isProduction) {
      console.log(...args);
    }
  },

  info: (...args: any[]) => {
    if (!isProduction) {
      console.info(...args);
    }
  },

  debug: (...args: any[]) => {
    if (!isProduction) {
      console.debug(...args);
    }
  },

  group: (label: string) => {
    if (!isProduction) {
      console.group(label);
    }
  },

  groupEnd: () => {
    if (!isProduction) {
      console.groupEnd();
    }
  },

  table: (data: any) => {
    if (!isProduction) {
      console.table(data);
    }
  },

  time: (label: string) => {
    if (!isProduction) {
      console.time(label);
    }
  },

  timeEnd: (label: string) => {
    if (!isProduction) {
      console.timeEnd(label);
    }
  },

  // Suppress errors and warnings in production too
  error: (...args: any[]) => {
    if (!isProduction) {
      console.error(...args);
    }
  },

  warn: (...args: any[]) => {
    if (!isProduction) {
      console.warn(...args);
    }
  },
};

export default safeConsole;
