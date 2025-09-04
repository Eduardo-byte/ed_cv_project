// CV API Microservice Configuration
// All configuration comes from environment variables

const API_BASE_URL = import.meta.env.PROD 
    ? `${import.meta.env.VITE_API_BASE_URL_PROD || '/api'}/${import.meta.env.VITE_API_VERSION || 'v1'}`
    : `${import.meta.env.VITE_API_BASE_URL_DEV || 'http://localhost:3001'}/${import.meta.env.VITE_API_VERSION || 'v1'}`;

export const ENDPOINTS = {
    // Authentication endpoints
    AUTH: {
        LOGIN: `${API_BASE_URL}/auth/login`,
        LOGOUT: `${API_BASE_URL}/auth/logout`,
        REFRESH: `${API_BASE_URL}/auth/refresh`,
        ME: `${API_BASE_URL}/auth/me`,
        VERIFY: `${API_BASE_URL}/auth/verify`,
        CHANGE_PASSWORD: `${API_BASE_URL}/auth/change-password`
    },
    
    // Projects endpoints
    PROJECTS: {
        READ_ALL: `${API_BASE_URL}/projects`,
        READ_BY_ID: `${API_BASE_URL}/projects/:id`,
        READ_FEATURED: `${API_BASE_URL}/projects/featured`,
        READ_BY_TYPE: `${API_BASE_URL}/projects/type/:type`,
        SEARCH: `${API_BASE_URL}/projects/search`,
        STATS: `${API_BASE_URL}/projects/stats`,
        CREATE: `${API_BASE_URL}/projects`,
        UPDATE: `${API_BASE_URL}/projects/:id`,
        DELETE: `${API_BASE_URL}/projects/:id`
    },
    
    // Contact endpoints
    CONTACT: {
        SEND_MESSAGE: `${API_BASE_URL}/contact`,
        READ_MESSAGES: `${API_BASE_URL}/contact/messages`,
        READ_BY_ID: `${API_BASE_URL}/contact/messages/:id`,
        SEARCH_MESSAGES: `${API_BASE_URL}/contact/messages/search`,
        STATS: `${API_BASE_URL}/contact/messages/stats`,
        MARK_REPLIED: `${API_BASE_URL}/contact/messages/:id/reply`
    },
    
    // Health check endpoints
    HEALTH: {
        CHECK: `${API_BASE_URL}/health`,
        READY: `${API_BASE_URL}/health/ready`,
        LIVE: `${API_BASE_URL}/health/live`
    }
};

export const DEFAULT_HEADERS = {
    'Content-Type': 'application/json',
};
