import axios from 'axios';
import { CONFIG } from './config';
import { MOCK_DATA } from './mockData';
import { ApiError, NetworkError, ValidationError } from './errors';
import logger from './logger';

/**
 * HTTP Client Configuration
 */
class HttpClient {
  constructor(baseURL, timeout = 10000) {
    this.client = axios.create({
      baseURL,
      timeout,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  setupInterceptors() {
    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('authToken');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        
        // Add request ID for tracking
        config.metadata = { startTime: new Date() };
        
        logger.info('API Request', {
          method: config.method?.toUpperCase(),
          url: config.url,
          params: config.params
        });

        return config;
      },
      (error) => {
        logger.error('Request interceptor error', error);
        return Promise.reject(new NetworkError('Request configuration failed'));
      }
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => {
        const duration = new Date() - response.config.metadata.startTime;
        
        logger.info('API Response', {
          method: response.config.method?.toUpperCase(),
          url: response.config.url,
          status: response.status,
          duration: `${duration}ms`
        });

        return response;
      },
      (error) => {
        const duration = error.config?.metadata ? 
          new Date() - error.config.metadata.startTime : 0;

        logger.error('API Error', {
          method: error.config?.method?.toUpperCase(),
          url: error.config?.url,
          status: error.response?.status,
          duration: `${duration}ms`,
          message: error.message
        });

        return this.handleError(error);
      }
    );
  }

  handleError(error) {
    if (error.response) {
      const { status, data } = error.response;
      
      switch (status) {
        case 401:
          localStorage.removeItem('authToken');
          window.location.href = '/login';
          return Promise.reject(new ApiError('Unauthorized access', 401));
        
        case 403:
          return Promise.reject(new ApiError('Forbidden access', 403));
        
        case 404:
          return Promise.reject(new ApiError('Resource not found', 404));
        
        case 422:
          return Promise.reject(new ValidationError('Validation failed', data.errors));
        
        case 500:
          return Promise.reject(new ApiError('Internal server error', 500));
        
        default:
          return Promise.reject(new ApiError(
            data?.message || 'An error occurred', 
            status
          ));
      }
    }
    
    if (error.code === 'ECONNABORTED') {
      return Promise.reject(new NetworkError('Request timeout'));
    }
    
    if (!error.response) {
      return Promise.reject(new NetworkError('Network error'));
    }
    
    return Promise.reject(error);
  }

  async get(url, params = {}) {
    const response = await this.client.get(url, { params });
    return response.data;
  }

  async post(url, data = {}) {
    const response = await this.client.post(url, data);
    return response.data;
  }

  async put(url, data = {}) {
    const response = await this.client.put(url, data);
    return response.data;
  }

  async delete(url) {
    const response = await this.client.delete(url);
    return response.data;
  }

  async upload(url, file, onProgress = null) {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await this.client.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: onProgress ? (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        onProgress(percentCompleted);
      } : undefined,
    });
    
    return response.data;
  }
}

/**
 * Base API Service
 */
class BaseApiService {
  constructor(httpClient) {
    this.http = httpClient;
    this.useMockData = CONFIG.USE_MOCK_DATA;
  }

  async simulateDelay(ms = 500) {
    if (this.useMockData) {
      await new Promise(resolve => setTimeout(resolve, ms));
    }
  }
}

/**
 * Configuration Service
 */
class ConfigService extends BaseApiService {
  async fetchConfig() {
    try {
      if (this.useMockData) {
        await this.simulateDelay(1000);
        return MOCK_DATA.CONFIG;
      }

      return await this.http.get('/config');
    } catch (error) {
      logger.error('Failed to fetch configuration', error);
      throw new ApiError('Failed to fetch configuration');
    }
  }

  async fetchDropdownOptions(apiKey) {
    try {
      if (this.useMockData) {
        await this.simulateDelay(500);
        return MOCK_DATA.DROPDOWN_OPTIONS[apiKey] || [];
      }

      return await this.http.get(`/dropdown-options/${apiKey}`);
    } catch (error) {
      logger.error(`Failed to fetch dropdown options for ${apiKey}`, error);
      throw new ApiError(`Failed to fetch options for ${apiKey}`);
    }
  }
}

/**
 * Section Data Service
 */
class SectionService extends BaseApiService {
  async fetchSectionData(endpoint, params = {}) {
    try {
      if (this.useMockData) {
        await this.simulateDelay(500);
        return { data: {} };
      }

      return await this.http.get(endpoint, params);
    } catch (error) {
      logger.error('Failed to fetch section data', error);
      throw new ApiError('Failed to fetch section data');
    }
  }

  async saveSectionData(endpoint, data) {
    try {
      if (this.useMockData) {
        await this.simulateDelay(1000);
        return { success: true, message: 'Data saved successfully' };
      }

      return await this.http.post(endpoint, data);
    } catch (error) {
      logger.error('Failed to save section data', error);
      throw new ApiError('Failed to save section data');
    }
  }
}

/**
 * File Upload Service
 */
class FileService extends BaseApiService {
  async uploadFile(file, endpoint = '/upload', onProgress = null) {
    try {
      if (this.useMockData) {
        await this.simulateDelay(2000);
        return {
          success: true,
          fileUrl: URL.createObjectURL(file),
          fileName: file.name,
          fileSize: file.size,
          fileType: file.type
        };
      }

      return await this.http.upload(endpoint, file, onProgress);
    } catch (error) {
      logger.error('Failed to upload file', error);
      throw new ApiError('Failed to upload file');
    }
  }

  async deleteFile(fileId) {
    try {
      if (this.useMockData) {
        await this.simulateDelay(500);
        return { success: true, message: 'File deleted successfully' };
      }

      return await this.http.delete(`/files/${fileId}`);
    } catch (error) {
      logger.error('Failed to delete file', error);
      throw new ApiError('Failed to delete file');
    }
  }
}

/**
 * Application Service
 */
class ApplicationService extends BaseApiService {
  async fetchApplicationProfile() {
    try {
      if (this.useMockData) {
        await this.simulateDelay(500);
        return MOCK_DATA.APPLICATION_PROFILE;
      }

      return await this.http.get('/application/profile');
    } catch (error) {
      logger.error('Failed to fetch application profile', error);
      throw new ApiError('Failed to fetch application profile');
    }
  }
}

/**
 * API Factory - Singleton Pattern
 */
class ApiFactory {
  constructor() {
    if (ApiFactory.instance) {
      return ApiFactory.instance;
    }

    this.httpClient = new HttpClient(CONFIG.API_BASE_URL, CONFIG.API_TIMEOUT);
    this.configService = new ConfigService(this.httpClient);
    this.sectionService = new SectionService(this.httpClient);
    this.fileService = new FileService(this.httpClient);
    this.applicationService = new ApplicationService(this.httpClient);

    ApiFactory.instance = this;
  }

  getConfigService() {
    return this.configService;
  }

  getSectionService() {
    return this.sectionService;
  }

  getFileService() {
    return this.fileService;
  }

  getApplicationService() {
    return this.applicationService;
  }

  getHttpClient() {
    return this.httpClient;
  }
}

// Create singleton instance
const apiFactory = new ApiFactory();

// Export service instances
export const configService = apiFactory.getConfigService();
export const sectionService = apiFactory.getSectionService();
export const fileService = apiFactory.getFileService();
export const applicationService = apiFactory.getApplicationService();

// Export legacy functions for backward compatibility
export const fetchConfig = () => configService.fetchConfig();
export const fetchDropdownOptions = (apiKey) => configService.fetchDropdownOptions(apiKey);
export const fetchSectionData = (endpoint, params) => sectionService.fetchSectionData(endpoint, params);
export const saveSectionData = (endpoint, data) => sectionService.saveSectionData(endpoint, data);
export const uploadFile = (file, endpoint, onProgress) => fileService.uploadFile(file, endpoint, onProgress);

// Export application profile data for backward compatibility
export const APPLICATION_DATA_PROFILE = MOCK_DATA.APPLICATION_PROFILE;

// Export default HTTP client
export default apiFactory.getHttpClient();
