/**
 * Application Configuration
 * All configuration values come from environment variables
 */

// Application Information
export const APP_CONFIG = {
    name: import.meta.env.VITE_APP_NAME || 'Eduardo Brito CV',
    version: import.meta.env.VITE_APP_VERSION || '1.0.0',
    description: import.meta.env.VITE_APP_DESCRIPTION || 'Professional CV Website',
    domain: import.meta.env.VITE_DOMAIN || 'localhost',
};

// API Configuration
export const API_CONFIG = {
    baseUrlDev: import.meta.env.VITE_API_BASE_URL_DEV || 'http://localhost:3001',
    baseUrlProd: import.meta.env.VITE_API_BASE_URL_PROD || '/api',
    version: import.meta.env.VITE_API_VERSION || 'v1',
    timeout: parseInt(import.meta.env.VITE_API_TIMEOUT) || 10000,
    apiKey: import.meta.env.VITE_API_KEY || null,
};

// Authentication Configuration
export const AUTH_CONFIG = {
    tokenKey: import.meta.env.VITE_AUTH_TOKEN_KEY || 'cv_api_token',
    sessionKey: import.meta.env.VITE_AUTH_SESSION_KEY || 'cv_api_session',
};

// Contact Form Configuration
export const CONTACT_CONFIG = {
    placeholderEmail: import.meta.env.VITE_CONTACT_PLACEHOLDER_EMAIL || 'your.email@domain.com',
    maxMessageLength: parseInt(import.meta.env.VITE_CONTACT_MAX_MESSAGE_LENGTH) || 5000,
    minMessageLength: parseInt(import.meta.env.VITE_CONTACT_MIN_MESSAGE_LENGTH) || 10,
};

// Spam Detection Configuration
export const SPAM_CONFIG = {
    maxLinks: parseInt(import.meta.env.VITE_SPAM_MAX_LINKS) || 3,
    maxCapsLength: parseInt(import.meta.env.VITE_SPAM_MAX_CAPS_LENGTH) || 50,
};

// UI Configuration
export const UI_CONFIG = {
    defaultPageSize: parseInt(import.meta.env.VITE_DEFAULT_PAGE_SIZE) || 10,
    maxPageSize: parseInt(import.meta.env.VITE_MAX_PAGE_SIZE) || 100,
};

// Development Configuration
export const DEV_CONFIG = {
    debugMode: import.meta.env.VITE_DEBUG_MODE === 'true',
    logLevel: import.meta.env.VITE_LOG_LEVEL || 'info',
    isProduction: import.meta.env.PROD,
    isDevelopment: !import.meta.env.PROD,
};

// Export a convenience function to check if we're in development with debug enabled
export const isDebugEnabled = () => {
    return DEV_CONFIG.isDevelopment && DEV_CONFIG.debugMode;
};

// Export a function to get the full API base URL
export const getApiBaseUrl = () => {
    return DEV_CONFIG.isProduction 
        ? `${API_CONFIG.baseUrlProd}/${API_CONFIG.version}`
        : `${API_CONFIG.baseUrlDev}/${API_CONFIG.version}`;
};
