import axios from 'axios';
import { ENDPOINTS } from './endpoints.js';

// Get API base URL from environment variables
const getBaseURL = () => {
    const apiVersion = import.meta.env.VITE_API_VERSION || 'v1';
    return import.meta.env.PROD 
        ? `${import.meta.env.VITE_API_BASE_URL_PROD || '/api'}/${apiVersion}`
        : `${import.meta.env.VITE_API_BASE_URL_DEV || 'http://localhost:3001'}/${apiVersion}`;
};

// Create axios instance for CV API Microservice
const apiGatewayAxiosInstance = axios.create({
    baseURL: getBaseURL(),
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    timeout: parseInt(import.meta.env.VITE_API_TIMEOUT) || 10000,
});

// JWT Token management
class TokenManager {
    static getTokenKey() {
        return import.meta.env.VITE_AUTH_TOKEN_KEY || 'cv_api_token';
    }
    
    static getSessionKey() {
        return import.meta.env.VITE_AUTH_SESSION_KEY || 'cv_api_session';
    }

    static getToken() {
        const tokenKey = this.getTokenKey();
        const sessionKey = this.getSessionKey();
        return localStorage.getItem(tokenKey) || sessionStorage.getItem(sessionKey);
    }

    static setToken(token, remember = false) {
        const tokenKey = this.getTokenKey();
        const sessionKey = this.getSessionKey();
        
        if (remember) {
            localStorage.setItem(tokenKey, token);
            sessionStorage.removeItem(sessionKey);
        } else {
            sessionStorage.setItem(sessionKey, token);
            localStorage.removeItem(tokenKey);
        }
    }

    static removeToken() {
        const tokenKey = this.getTokenKey();
        const sessionKey = this.getSessionKey();
        localStorage.removeItem(tokenKey);
        sessionStorage.removeItem(sessionKey);
    }

    static isTokenExpired(token) {
        if (!token) return true;
        
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            const currentTime = Date.now() / 1000;
            return payload.exp < currentTime;
        } catch (error) {
            console.warn('Invalid JWT token format');
            return true;
        }
    }
}

// Request interceptor - Add JWT token and API key to requests
apiGatewayAxiosInstance.interceptors.request.use(
    (config) => {
        const token = TokenManager.getToken();
        
        // Add JWT token if available and valid
        if (token && !TokenManager.isTokenExpired(token)) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        // Add API key header if configured
        const apiKey = import.meta.env.VITE_API_KEY;
        if (apiKey) {
            config.headers['x-api-key'] = apiKey;
        }

        // Log request in development
        if (!import.meta.env.PROD && import.meta.env.VITE_DEBUG_MODE === 'true') {
            console.log(`🔌 API Request: ${config.method?.toUpperCase()} ${config.url}`, {
                params: config.params,
                data: config.data,
                headers: { 
                    ...config.headers,
                    // Mask sensitive headers in logs
                    'x-api-key': apiKey ? '***API_KEY_SET***' : 'not_set',
                    'Authorization': token ? 'Bearer ***TOKEN_SET***' : 'not_set'
                }
            });
        }

        return config;
    },
    (error) => {
        console.error('Request interceptor error:', error);
        return Promise.reject(error);
    }
);

// Response interceptor - Handle responses and token refresh
apiGatewayAxiosInstance.interceptors.response.use(
    (response) => {
        // Log successful response in development
        if (!import.meta.env.PROD && import.meta.env.VITE_DEBUG_MODE === 'true') {
            console.log(`✅ API Response: ${response.status} ${response.config.method?.toUpperCase()} ${response.config.url}`, {
                data: response.data,
                status: response.status,
                statusText: response.statusText
            });
        }

        // Handle new token in response headers
        const newToken = response.headers['x-new-token'];
        if (newToken) {
            TokenManager.setToken(newToken, true);
        }

        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        // Handle 401 Unauthorized
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            // Remove expired/invalid token
            TokenManager.removeToken();

            // Log authentication error
            console.warn('Authentication failed:', error.response?.data?.message || 'Unauthorized');

            // Optionally redirect to login or emit auth event
            if (typeof window !== 'undefined') {
                window.dispatchEvent(new CustomEvent('auth:tokenExpired', {
                    detail: { error: error.response?.data }
                }));
            }
        }

        // Log error in development  
        if (!import.meta.env.PROD && import.meta.env.VITE_DEBUG_MODE === 'true') {
            console.error(`❌ API Error: ${error.response?.status || 'Network'} ${error.config?.method?.toUpperCase()} ${error.config?.url}`, {
                status: error.response?.status,
                statusText: error.response?.statusText,
                data: error.response?.data,
                message: error.message
            });
        }

        // Enhanced error logging
        logError(error);

        return Promise.reject(error);
    }
);

// Enhanced error logging function
export const logError = (error) => {
    const errorInfo = {
        message: error.message,
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        url: error.config?.url,
        method: error.config?.method,
        timestamp: new Date().toISOString()
    };

    console.group('🚨 API Error Details');
    console.error('Error:', errorInfo.message);
    if (errorInfo.status) {
        console.error('Status:', `${errorInfo.status} ${errorInfo.statusText}`);
    }
    if (errorInfo.url) {
        console.error('URL:', `${errorInfo.method?.toUpperCase()} ${errorInfo.url}`);
    }
    if (errorInfo.data) {
        console.error('Response Data:', errorInfo.data);
    }
    console.error('Timestamp:', errorInfo.timestamp);
    console.groupEnd();
};

// Authentication helpers
export const authHelpers = {
    // Login function
    login: async (credentials) => {
        try {
            const response = await apiGatewayAxiosInstance.post('/auth/login', credentials);
            
            if (response.data.success && response.data.token) {
                TokenManager.setToken(response.data.token, credentials.remember || false);
                return response.data;
            }
            
            throw new Error('Invalid response format');
        } catch (error) {
            logError(error);
            throw error;
        }
    },

    // Logout function
    logout: async () => {
        try {
            await apiGatewayAxiosInstance.post('/auth/logout');
        } catch (error) {
            console.warn('Logout request failed:', error.message);
        } finally {
            TokenManager.removeToken();
        }
    },

    // Check if user is authenticated
    isAuthenticated: () => {
        const token = TokenManager.getToken();
        return token && !TokenManager.isTokenExpired(token);
    },

    // Get current user info from token
    getCurrentUser: () => {
        const token = TokenManager.getToken();
        
        if (!token || TokenManager.isTokenExpired(token)) {
            return null;
        }

        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            return {
                id: payload.id,
                email: payload.email,
                role: payload.role,
                exp: payload.exp,
                iat: payload.iat
            };
        } catch (error) {
            console.error('Failed to decode token:', error);
            return null;
        }
    },

    // Refresh token
    refreshToken: async () => {
        try {
            const response = await apiGatewayAxiosInstance.post('/auth/refresh');
            
            if (response.data.success && response.data.token) {
                TokenManager.setToken(response.data.token, true);
                return response.data;
            }
            
            throw new Error('Failed to refresh token');
        } catch (error) {
            TokenManager.removeToken();
            throw error;
        }
    }
};

export { TokenManager };
export default apiGatewayAxiosInstance;
