/**
 * Application Configuration
 * Centralized configuration management for different environments
 */

const ENV = import.meta.env.MODE || 'development';

export const config = {
  development: {
    environment: 'development',
    API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api',
    API_TIMEOUT: 10000,
    USE_MOCK_DATA: import.meta.env.VITE_USE_MOCK_DATA === 'true' || true,
    LOG_LEVEL: 'debug',
    ENABLE_REDUX_DEVTOOLS: true,
    UPLOAD_MAX_SIZE: 10 * 1024 * 1024, // 10MB
    SUPPORTED_FILE_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'],
    logging: {
      level: 'debug',
      enableConsole: true,
      enableStorage: true,
      maxStorageSize: 1000
    }
  },
  
  staging: {
    environment: 'staging',
    API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'https://api-staging.iifl.com',
    API_TIMEOUT: 15000,
    USE_MOCK_DATA: import.meta.env.VITE_USE_MOCK_DATA === 'true' || false,
    LOG_LEVEL: 'info',
    ENABLE_REDUX_DEVTOOLS: false,
    UPLOAD_MAX_SIZE: 10 * 1024 * 1024, // 10MB
    SUPPORTED_FILE_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'],
    logging: {
      level: 'info',
      enableConsole: true,
      enableStorage: true,
      maxStorageSize: 500
    }
  },
  
  production: {
    environment: 'production',
    API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'https://api.iifl.com',
    API_TIMEOUT: 20000,
    USE_MOCK_DATA: false,
    LOG_LEVEL: 'error',
    ENABLE_REDUX_DEVTOOLS: false,
    UPLOAD_MAX_SIZE: 5 * 1024 * 1024, // 5MB
    SUPPORTED_FILE_TYPES: ['image/jpeg', 'image/png', 'application/pdf'],
    logging: {
      level: 'error',
      enableConsole: false,
      enableStorage: false,
      maxStorageSize: 100
    }
  }
};

// Application constants
export const APP_CONFIG = {
  APP_NAME: 'IIFL Dynamic Render UI',
  APP_VERSION: import.meta.env.VITE_APP_VERSION || '1.0.0',
  COMPANY_NAME: 'IIFL',
  
  // UI Constants
  DEBOUNCE_DELAY: 300,
  TOAST_DURATION: 3000,
  PAGINATION_SIZE: 20,
  
  // Form Constants
  MAX_FIELD_LENGTH: 255,
  MIN_PASSWORD_LENGTH: 8,
  
  // Local Storage Keys
  STORAGE_KEYS: {
    AUTH_TOKEN: 'authToken',
    USER_PREFERENCES: 'userPreferences',
    FORM_DRAFT: 'formDraft',
    THEME: 'theme'
  },
  
  // API Endpoints
  ENDPOINTS: {
    AUTH: {
      LOGIN: '/auth/login',
      LOGOUT: '/auth/logout',
      REFRESH: '/auth/refresh',
      PROFILE: '/auth/profile'
    },
    CONFIG: '/config',
    DROPDOWN_OPTIONS: '/dropdown-options',
    UPLOAD: '/upload',
    SECTIONS: {
      FETCH: '/sections/fetch',
      SAVE: '/sections/save'
    }
  },
  
  // Error Messages
  ERROR_MESSAGES: {
    NETWORK_ERROR: 'Network connection failed. Please check your internet connection.',
    UNAUTHORIZED: 'Your session has expired. Please login again.',
    FORBIDDEN: 'You do not have permission to perform this action.',
    NOT_FOUND: 'The requested resource was not found.',
    VALIDATION_ERROR: 'Please check the form data and try again.',
    SERVER_ERROR: 'An internal server error occurred. Please try again later.',
    FILE_TOO_LARGE: 'File size exceeds the maximum allowed limit.',
    INVALID_FILE_TYPE: 'File type is not supported.'
  }
};

// Export current environment configuration
export const CONFIG = {
  ...config[ENV],
  ENV,
  IS_DEVELOPMENT: ENV === 'development',
  IS_STAGING: ENV === 'staging',
  IS_PRODUCTION: ENV === 'production'
};

// Validation function for configuration
export const validateConfig = () => {
  const requiredKeys = ['API_BASE_URL', 'API_TIMEOUT'];
  const missingKeys = requiredKeys.filter(key => !CONFIG[key]);
  
  if (missingKeys.length > 0) {
    throw new Error(`Missing required configuration keys: ${missingKeys.join(', ')}`);
  }
  
  if (CONFIG.API_TIMEOUT < 1000) {
    console.warn('API timeout is set to less than 1 second, which may cause issues');
  }
  
  return true;
};

// Initialize configuration validation
if (CONFIG.IS_DEVELOPMENT) {
  try {
    validateConfig();
    console.log('✅ Configuration validated successfully');
    console.log('📊 Current environment:', ENV);
    console.log('🔗 API Base URL:', CONFIG.API_BASE_URL);
    console.log('🎭 Using mock data:', CONFIG.USE_MOCK_DATA);
  } catch (error) {
    console.error('❌ Configuration validation failed:', error.message);
  }
}
