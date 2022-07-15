import { Logger } from "@smartthings/core-sdk";

class STLogger implements Logger {
  level: string = "";
  trace(message: any, ...args: any[]) {
    console.log(message, ...args);
  }
  debug(message: any, ...args: any[]) {
    console.log(message, ...args);
  }
  info(message: any, ...args: any[]) {
    console.info(message, ...args);
  }
  warn(message: any, ...args: any[]) {
    console.warn(message, ...args);
  }
  error(message: any, ...args: any[]) {
    console.error(message, ...args);
  }
  fatal(message: any, ...args: any[]) {
    console.error(message, ...args);
  }
  isTraceEnabled() {
    return true;
  }
  isDebugEnabled() {
    return true;
  }
  isInfoEnabled() {
    return true;
  }
  isWarnEnabled() {
    return true;
  }
  isErrorEnabled() {
    return true;
  }
  isFatalEnabled() {
    return true;
  }
}

export default STLogger;
