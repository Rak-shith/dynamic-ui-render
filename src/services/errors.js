/**
 * Custom Error Classes
 * Centralized error handling with specific error types
 */

/**
 * Base API Error Class
 */
export class ApiError extends Error {
  constructor(message, statusCode = 500, code = 'API_ERROR') {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.code = code;
    this.timestamp = new Date().toISOString();
    
    // Maintains proper stack trace for where our error was thrown
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError);
    }
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      statusCode: this.statusCode,
      code: this.code,
      timestamp: this.timestamp,
      stack: this.stack
    };
  }
}

/**
 * Network Error Class
 * For connection, timeout, and network-related issues
 */
export class NetworkError extends ApiError {
  constructor(message = 'Network error occurred') {
    super(message, 0, 'NETWORK_ERROR');
    this.name = 'NetworkError';
  }
}

/**
 * Validation Error Class
 * For form validation and data validation errors
 */
export class ValidationError extends ApiError {
  constructor(message = 'Validation failed', errors = {}) {
    super(message, 422, 'VALIDATION_ERROR');
    this.name = 'ValidationError';
    this.errors = errors;
  }

  toJSON() {
    return {
      ...super.toJSON(),
      errors: this.errors
    };
  }
}

/**
 * Authentication Error Class
 * For authentication and authorization errors
 */
export class AuthError extends ApiError {
  constructor(message = 'Authentication failed', statusCode = 401) {
    super(message, statusCode, 'AUTH_ERROR');
    this.name = 'AuthError';
  }
}

/**
 * File Upload Error Class
 * For file upload related errors
 */
export class FileUploadError extends ApiError {
  constructor(message = 'File upload failed', details = {}) {
    super(message, 400, 'FILE_UPLOAD_ERROR');
    this.name = 'FileUploadError';
    this.details = details;
  }

  toJSON() {
    return {
      ...super.toJSON(),
      details: this.details
    };
  }
}

/**
 * Configuration Error Class
 * For configuration and setup errors
 */
export class ConfigError extends Error {
  constructor(message = 'Configuration error') {
    super(message);
    this.name = 'ConfigError';
    this.timestamp = new Date().toISOString();
    
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ConfigError);
    }
  }
}

/**
 * Business Logic Error Class
 * For application-specific business rule violations
 */
export class BusinessError extends ApiError {
  constructor(message = 'Business rule violation', code = 'BUSINESS_ERROR') {
    super(message, 400, code);
    this.name = 'BusinessError';
  }
}

/**
 * Error Factory
 * Creates appropriate error instances based on error type or HTTP status
 */
export class ErrorFactory {
  static createFromResponse(response, defaultMessage = 'An error occurred') {
    const { status, data } = response;
    const message = data?.message || defaultMessage;

    switch (status) {
      case 400:
        return new ValidationError(message, data?.errors);
      case 401:
        return new AuthError(message, 401);
      case 403:
        return new AuthError('Access forbidden', 403);
      case 404:
        return new ApiError('Resource not found', 404, 'NOT_FOUND');
      case 422:
        return new ValidationError(message, data?.errors);
      case 500:
        return new ApiError('Internal server error', 500, 'SERVER_ERROR');
      default:
        return new ApiError(message, status);
    }
  }

  static createNetworkError(originalError) {
    if (originalError.code === 'ECONNABORTED') {
      return new NetworkError('Request timeout');
    }
    if (originalError.code === 'ENOTFOUND') {
      return new NetworkError('Server not found');
    }
    if (originalError.code === 'ECONNREFUSED') {
      return new NetworkError('Connection refused');
    }
    return new NetworkError('Network connection failed');
  }

  static createFileUploadError(file, reason) {
    const details = {
      fileName: file?.name,
      fileSize: file?.size,
      fileType: file?.type,
      reason
    };
    
    switch (reason) {
      case 'FILE_TOO_LARGE':
        return new FileUploadError('File size exceeds maximum limit', details);
      case 'INVALID_FILE_TYPE':
        return new FileUploadError('File type not supported', details);
      case 'UPLOAD_FAILED':
        return new FileUploadError('File upload failed', details);
      default:
        return new FileUploadError('File upload error', details);
    }
  }
}

/**
 * Error Handler Utility
 * Provides common error handling patterns
 */
export class ErrorHandler {
  static handle(error, context = '') {
    // Log error for debugging
    console.error(`[${context}] Error:`, error);

    // Return user-friendly error message
    if (error instanceof ValidationError) {
      return {
        type: 'validation',
        message: error.message,
        errors: error.errors
      };
    }

    if (error instanceof NetworkError) {
      return {
        type: 'network',
        message: 'Please check your internet connection and try again.'
      };
    }

    if (error instanceof AuthError) {
      return {
        type: 'auth',
        message: error.statusCode === 401 
          ? 'Please login to continue.' 
          : 'You do not have permission to perform this action.'
      };
    }

    if (error instanceof FileUploadError) {
      return {
        type: 'file',
        message: error.message,
        details: error.details
      };
    }

    if (error instanceof ApiError) {
      return {
        type: 'api',
        message: error.message,
        statusCode: error.statusCode
      };
    }

    // Generic error fallback
    return {
      type: 'unknown',
      message: 'An unexpected error occurred. Please try again.'
    };
  }

  static isRetryable(error) {
    return error instanceof NetworkError || 
           (error instanceof ApiError && error.statusCode >= 500);
  }

  static shouldShowToUser(error) {
    // Don't show technical errors to users
    return !(error instanceof ConfigError) && 
           error.statusCode !== 500;
  }
}

/**
 * Async Error Wrapper
 * Wraps async functions to handle errors consistently
 */
export const withErrorHandling = (asyncFn, context = '') => {
  return async (...args) => {
    try {
      return await asyncFn(...args);
    } catch (error) {
      const handledError = ErrorHandler.handle(error, context);
      throw error; // Re-throw for upstream handling
    }
  };
};
