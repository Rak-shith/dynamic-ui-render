/**
 * Logger Utility
 * Centralized logging with different levels and formatting
 */

import { CONFIG } from './config.js';

/**
 * Log Levels
 */
export const LOG_LEVELS = {
  ERROR: 0,
  WARN: 1,
  INFO: 2,
  DEBUG: 3,
  TRACE: 4
};

/**
 * Log Level Names
 */
const LOG_LEVEL_NAMES = {
  [LOG_LEVELS.ERROR]: 'ERROR',
  [LOG_LEVELS.WARN]: 'WARN',
  [LOG_LEVELS.INFO]: 'INFO',
  [LOG_LEVELS.DEBUG]: 'DEBUG',
  [LOG_LEVELS.TRACE]: 'TRACE'
};

/**
 * Log Level Colors for Console
 */
const LOG_COLORS = {
  [LOG_LEVELS.ERROR]: '#ff4444',
  [LOG_LEVELS.WARN]: '#ffaa00',
  [LOG_LEVELS.INFO]: '#0088ff',
  [LOG_LEVELS.DEBUG]: '#888888',
  [LOG_LEVELS.TRACE]: '#cccccc'
};

/**
 * Logger Class
 */
class Logger {
  constructor() {
    this.level = this.parseLogLevel(CONFIG.logging.level);
    this.isDevelopment = CONFIG.environment === 'development';
    this.enableConsole = CONFIG.logging.enableConsole;
    this.enableStorage = CONFIG.logging.enableStorage;
    this.maxStorageSize = CONFIG.logging.maxStorageSize;
    this.storageKey = 'app_logs';
  }

  /**
   * Parse log level from string to number
   */
  parseLogLevel(levelString) {
    const upperLevel = levelString.toUpperCase();
    return LOG_LEVELS[upperLevel] !== undefined ? LOG_LEVELS[upperLevel] : LOG_LEVELS.INFO;
  }

  /**
   * Check if log level should be logged
   */
  shouldLog(level) {
    return level <= this.level;
  }

  /**
   * Format timestamp
   */
  formatTimestamp() {
    return new Date().toISOString();
  }

  /**
   * Format log message
   */
  formatMessage(level, context, message, data) {
    const timestamp = this.formatTimestamp();
    const levelName = LOG_LEVEL_NAMES[level];
    
    const logEntry = {
      timestamp,
      level: levelName,
      context: context || 'APP',
      message,
      ...(data && { data })
    };

    return logEntry;
  }

  /**
   * Log to console with styling
   */
  logToConsole(level, formattedMessage) {
    if (!this.enableConsole) return;

    const { timestamp, level: levelName, context, message, data } = formattedMessage;
    const color = LOG_COLORS[level];

    if (this.isDevelopment) {
      // Enhanced console logging for development
      const style = `color: ${color}; font-weight: bold;`;
      console.groupCollapsed(
        `%c[${levelName}] ${context} - ${message}`,
        style
      );
      
      if (data) {
        console.log('Data:', data);
      }
      
      console.log('Timestamp:', timestamp);
      console.trace('Stack trace');
      console.groupEnd();
    } else {
      // Simple console logging for production
      const logMethod = this.getConsoleMethod(level);
      logMethod(`[${levelName}] ${context}: ${message}`, data || '');
    }
  }

  /**
   * Get appropriate console method for log level
   */
  getConsoleMethod(level) {
    switch (level) {
      case LOG_LEVELS.ERROR:
        return console.error;
      case LOG_LEVELS.WARN:
        return console.warn;
      case LOG_LEVELS.INFO:
        return console.info;
      case LOG_LEVELS.DEBUG:
      case LOG_LEVELS.TRACE:
      default:
        return console.log;
    }
  }

  /**
   * Store logs in localStorage (with size management)
   */
  logToStorage(formattedMessage) {
    if (!this.enableStorage || typeof window === 'undefined') return;

    try {
      const existingLogs = this.getStoredLogs();
      const newLogs = [...existingLogs, formattedMessage];
      
      // Manage storage size
      const managedLogs = this.manageStorageSize(newLogs);
      
      localStorage.setItem(this.storageKey, JSON.stringify(managedLogs));
    } catch (error) {
      console.error('Failed to store log:', error);
    }
  }

  /**
   * Get stored logs from localStorage
   */
  getStoredLogs() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Failed to retrieve stored logs:', error);
      return [];
    }
  }

  /**
   * Manage storage size by removing old logs
   */
  manageStorageSize(logs) {
    if (logs.length <= this.maxStorageSize) {
      return logs;
    }

    // Keep only the most recent logs
    return logs.slice(-this.maxStorageSize);
  }

  /**
   * Core logging method
   */
  log(level, context, message, data) {
    if (!this.shouldLog(level)) return;

    const formattedMessage = this.formatMessage(level, context, message, data);
    
    this.logToConsole(level, formattedMessage);
    this.logToStorage(formattedMessage);
  }

  /**
   * Error logging
   */
  error(context, message, data) {
    this.log(LOG_LEVELS.ERROR, context, message, data);
  }

  /**
   * Warning logging
   */
  warn(context, message, data) {
    this.log(LOG_LEVELS.WARN, context, message, data);
  }

  /**
   * Info logging
   */
  info(context, message, data) {
    this.log(LOG_LEVELS.INFO, context, message, data);
  }

  /**
   * Debug logging
   */
  debug(context, message, data) {
    this.log(LOG_LEVELS.DEBUG, context, message, data);
  }

  /**
   * Trace logging
   */
  trace(context, message, data) {
    this.log(LOG_LEVELS.TRACE, context, message, data);
  }

  /**
   * Clear stored logs
   */
  clearLogs() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(this.storageKey);
    }
  }

  /**
   * Export logs as JSON
   */
  exportLogs() {
    const logs = this.getStoredLogs();
    return JSON.stringify(logs, null, 2);
  }

  /**
   * Get logs for specific context
   */
  getLogsByContext(context) {
    const logs = this.getStoredLogs();
    return logs.filter(log => log.context === context);
  }

  /**
   * Get logs by level
   */
  getLogsByLevel(level) {
    const logs = this.getStoredLogs();
    const levelName = LOG_LEVEL_NAMES[level];
    return logs.filter(log => log.level === levelName);
  }

  /**
   * Get recent logs (last N entries)
   */
  getRecentLogs(count = 50) {
    const logs = this.getStoredLogs();
    return logs.slice(-count);
  }
}

/**
 * Create singleton logger instance
 */
const logger = new Logger();

/**
 * Performance logging utility
 */
export const performanceLogger = {
  timers: new Map(),

  start(label) {
    this.timers.set(label, performance.now());
    logger.debug('PERFORMANCE', `Timer started: ${label}`);
  },

  end(label) {
    const startTime = this.timers.get(label);
    if (startTime) {
      const duration = performance.now() - startTime;
      this.timers.delete(label);
      logger.info('PERFORMANCE', `${label} completed in ${duration.toFixed(2)}ms`);
      return duration;
    }
    logger.warn('PERFORMANCE', `Timer not found: ${label}`);
    return null;
  },

  measure(label, fn) {
    this.start(label);
    const result = fn();
    this.end(label);
    return result;
  },

  async measureAsync(label, asyncFn) {
    this.start(label);
    const result = await asyncFn();
    this.end(label);
    return result;
  }
};

/**
 * API request logging utility
 */
export const apiLogger = {
  logRequest(method, url, data) {
    logger.debug('API_REQUEST', `${method.toUpperCase()} ${url}`, {
      method,
      url,
      data: data ? (typeof data === 'object' ? JSON.stringify(data) : data) : null,
      timestamp: new Date().toISOString()
    });
  },

  logResponse(method, url, status, data, duration) {
    const level = status >= 400 ? LOG_LEVELS.ERROR : LOG_LEVELS.DEBUG;
    logger.log(level, 'API_RESPONSE', `${method.toUpperCase()} ${url} - ${status}`, {
      method,
      url,
      status,
      duration: duration ? `${duration}ms` : null,
      data: data ? (typeof data === 'object' ? JSON.stringify(data) : data) : null,
      timestamp: new Date().toISOString()
    });
  },

  logError(method, url, error) {
    logger.error('API_ERROR', `${method.toUpperCase()} ${url} failed`, {
      method,
      url,
      error: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString()
    });
  }
};

/**
 * Component logging utility
 */
export const componentLogger = {
  logRender(componentName, props) {
    logger.trace('COMPONENT', `${componentName} rendered`, {
      component: componentName,
      props: props ? Object.keys(props) : null
    });
  },

  logMount(componentName) {
    logger.debug('COMPONENT', `${componentName} mounted`);
  },

  logUnmount(componentName) {
    logger.debug('COMPONENT', `${componentName} unmounted`);
  },

  logError(componentName, error) {
    logger.error('COMPONENT', `${componentName} error`, {
      component: componentName,
      error: error.message,
      stack: error.stack
    });
  }
};

// Export singleton logger instance
export default logger;
