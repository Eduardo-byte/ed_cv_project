/**
 * Extract the relative path from a full API endpoint URL
 * @param {string} endpoint - Full endpoint URL
 * @returns {string} Relative path
 */
export const getRelativePath = (endpoint) => {
    // Get base URLs from environment
    const devBaseUrl = `${import.meta.env.VITE_API_BASE_URL_DEV || 'http://localhost:3001'}/${import.meta.env.VITE_API_VERSION || 'v1'}`;
    const prodBaseUrl = `${import.meta.env.VITE_API_BASE_URL_PROD || '/api'}/${import.meta.env.VITE_API_VERSION || 'v1'}`;
    
    // Remove the base URL part to get just the relative path
    return endpoint.replace(devBaseUrl, '').replace(prodBaseUrl, '');
};

/**
 * Get the correct API endpoint path for axios calls
 * @param {string} endpoint - Full endpoint URL from ENDPOINTS config
 * @returns {string} Relative path for axios
 */
export const getApiPath = (endpoint) => {
    return getRelativePath(endpoint);
};

/**
 * Replace URL parameters in endpoint paths
 * @param {string} endpoint - Endpoint with parameters like :id
 * @param {Object} params - Parameters to replace
 * @returns {string} Endpoint with parameters replaced
 */
export const replaceUrlParams = (endpoint, params) => {
    let result = endpoint;
    
    Object.entries(params).forEach(([key, value]) => {
        result = result.replace(`:${key}`, value);
    });
    
    return result;
};
