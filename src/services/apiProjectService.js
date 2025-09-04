// API Project Service - Handles all project-related API calls
// Demonstrates enterprise-level service architecture with logging and error handling

import apiGatewayAxiosInstance, { logError } from '../config/apiGatewayAxiosInstance.js';
import { ENDPOINTS } from '../config/endpoints.js';
import { getApiPath, replaceUrlParams } from '../utils/apiUtils.js';

class APIProjectService {
    constructor() {
        // Set API base URL based on environment variables
        const apiVersion = import.meta.env.VITE_API_VERSION || 'v1';
        this.baseURL = import.meta.env.PROD 
            ? `${import.meta.env.VITE_API_BASE_URL_PROD || '/api'}/${apiVersion}`
            : `${import.meta.env.VITE_API_BASE_URL_DEV || 'http://localhost:3001'}/${apiVersion}`;
        this.serviceName = 'APIProjectService';
        
        // Configure axios instance for projects API
        apiGatewayAxiosInstance.defaults.baseURL = this.baseURL;
    }

    /**
     * Log API call details for demonstration purposes
     * @param {string} method - HTTP method
     * @param {string} endpoint - API endpoint
     * @param {Object} params - Request parameters
     * @param {number} startTime - Request start time
     */
    logApiCall(method, endpoint, params = {}, startTime) {
        const duration = Date.now() - startTime;
        const logData = {
            service: this.serviceName,
            method,
            endpoint: `${this.baseURL}${endpoint}`,
            params,
            duration: `${duration}ms`,
            timestamp: new Date().toISOString()
        };

        console.group(`🔌 API Call: ${method} ${endpoint}`);
        console.log('📊 Request Details:', {
            endpoint: logData.endpoint,
            method: logData.method,
            params: Object.keys(params).length > 0 ? params : 'none',
            timestamp: logData.timestamp
        });
        
        return logData;
    }

    /**
     * Log API response details
     * @param {Object} response - API response
     * @param {Object} logData - Previous log data from logApiCall
     */
    logApiResponse(response, logData) {
        console.log('📥 Response:', {
            status: response.status,
            statusText: response.statusText,
            dataCount: Array.isArray(response.data?.data) ? response.data.data.length : 1,
            executionTime: response.data?.metadata?.executionTime || 'unknown',
            totalResults: response.data?.pagination?.total || response.data?.data ? 1 : 0
        });
        
        if (response.data?.metadata) {
            console.log('📈 API Metadata:', response.data.metadata);
        }
        
        if (response.data?.pagination) {
            console.log('📄 Pagination:', response.data.pagination);
        }
        
        console.log('✅ Request completed in', logData.duration);
        console.groupEnd();
        
        return response.data;
    }

    /**
     * Log API errors
     * @param {Error} error - The error object
     * @param {Object} logData - Previous log data from logApiCall
     */
    logApiError(error, logData) {
        console.log('❌ Error Details:', {
            status: error.response?.status,
            statusText: error.response?.statusText,
            message: error.response?.data?.message || error.message,
            errorType: error.response?.data?.error || 'Network Error'
        });
        
        if (error.response?.data?.details) {
            console.log('🔍 Error Details:', error.response.data.details);
        }
        
        console.log('⏱️  Failed after', logData.duration);
        console.groupEnd();
        
        throw {
            success: false,
            error: error.response?.data?.error || 'API Error',
            message: error.response?.data?.message || error.message,
            status: error.response?.status || 500,
            timestamp: new Date().toISOString()
        };
    }

    /**
     * Get all projects with filtering options
     * @param {Object} filters - Filter options
     * @param {string} filters.type - Project type (company, personal, freelance)
     * @param {string} filters.status - Project status
     * @param {boolean} filters.featured - Only featured projects
     * @param {number} filters.limit - Number of results to return
     * @param {number} filters.offset - Pagination offset
     * @returns {Promise<Object>} API response with projects data
     */
    async getAllProjects(filters = {}) {
        const startTime = Date.now();
        const endpoint = getApiPath(ENDPOINTS.PROJECTS.READ_ALL);
        
        try {
            const logData = this.logApiCall('GET', endpoint, filters, startTime);
            
            const response = await apiGatewayAxiosInstance.get(endpoint, {
                params: filters
            });
            
            return this.logApiResponse(response, logData);

        } catch (error) {
            const logData = { duration: `${Date.now() - startTime}ms` };
            logError(error);
            this.logApiError(error, logData);
        }
    }

    /**
     * Get a single project by ID
     * @param {string} projectId - The project UUID
     * @returns {Promise<Object>} API response with project data
     */
    async getProjectById(projectId) {
        const startTime = Date.now();
        const endpoint = getApiPath(replaceUrlParams(ENDPOINTS.PROJECTS.READ_BY_ID, { id: projectId }));
        
        try {
            const logData = this.logApiCall('GET', endpoint, { projectId }, startTime);
            
            const response = await apiGatewayAxiosInstance.get(endpoint);
            
            return this.logApiResponse(response, logData);

        } catch (error) {
            const logData = { duration: `${Date.now() - startTime}ms` };
            logError(error);
            this.logApiError(error, logData);
        }
    }

    /**
     * Get project statistics
     * @returns {Promise<Object>} API response with statistics data
     */
    async getProjectStats() {
        const startTime = Date.now();
        const endpoint = getApiPath(ENDPOINTS.PROJECTS.STATS);
        
        try {
            const logData = this.logApiCall('GET', endpoint, {}, startTime);
            
            const response = await apiGatewayAxiosInstance.get(endpoint);
            
            return this.logApiResponse(response, logData);

        } catch (error) {
            const logData = { duration: `${Date.now() - startTime}ms` };
            logError(error);
            this.logApiError(error, logData);
        }
    }

    /**
     * Get featured projects only
     * @returns {Promise<Object>} API response with featured projects
     */
    async getFeaturedProjects() {
        return this.getAllProjects({ featured: true });
    }

    /**
     * Get projects by type
     * @param {string} type - Project type (company, personal, freelance)
     * @returns {Promise<Object>} API response with filtered projects
     */
    async getProjectsByType(type) {
        return this.getAllProjects({ type });
    }

    /**
     * Get company projects only
     * @returns {Promise<Object>} API response with company projects
     */
    async getCompanyProjects() {
        return this.getProjectsByType('company');
    }

    /**
     * Get personal projects only  
     * @returns {Promise<Object>} API response with personal projects
     */
    async getPersonalProjects() {
        return this.getProjectsByType('personal');
    }

    /**
     * Search projects by keyword (client-side filtering for now)
     * @param {string} keyword - Search keyword
     * @param {Object} filters - Additional filters
     * @returns {Promise<Object>} Filtered projects
     */
    async searchProjects(keyword, filters = {}) {
        const allProjects = await this.getAllProjects(filters);
        
        if (!keyword || !allProjects?.data) {
            return allProjects;
        }

        const filteredData = allProjects.data.filter(project => 
            project.title.toLowerCase().includes(keyword.toLowerCase()) ||
            project.description.toLowerCase().includes(keyword.toLowerCase()) ||
            project.technologies.some(tech => tech.toLowerCase().includes(keyword.toLowerCase()))
        );

        return {
            ...allProjects,
            data: filteredData,
            metadata: {
                ...allProjects.metadata,
                searchKeyword: keyword,
                originalCount: allProjects.data.length,
                filteredCount: filteredData.length
            }
        };
    }
}

// Create and export singleton instance
const apiProjectService = new APIProjectService();
export default apiProjectService;
