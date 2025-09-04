/**
 * Common validation utilities
 */

/**
 * Validate email format
 * @param {string} email 
 * @returns {boolean}
 */
export const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

/**
 * Validate URL format
 * @param {string} url 
 * @returns {boolean}
 */
export const isValidUrl = (url) => {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
};

/**
 * Validate phone number format
 * @param {string} phone 
 * @returns {boolean}
 */
export const isValidPhone = (phone) => {
    const phoneRegex = /^[\+]?[(]?[\d\s\-\(\)]{8,}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
};

/**
 * Validate string length
 * @param {string} text 
 * @param {number} min 
 * @param {number} max 
 * @returns {boolean}
 */
export const isValidLength = (text, min = 0, max = Infinity) => {
    const length = text ? text.trim().length : 0;
    return length >= min && length <= max;
};

/**
 * Sanitize HTML content
 * @param {string} html 
 * @returns {string}
 */
export const sanitizeHtml = (html) => {
    const div = document.createElement('div');
    div.textContent = html;
    return div.innerHTML;
};

/**
 * Check if text contains spam keywords
 * @param {string} text 
 * @returns {boolean}
 */
export const containsSpamKeywords = (text) => {
    const spamKeywords = [
        'buy now', 'click here', 'limited time', 'act fast', 'guaranteed',
        'make money', 'work from home', 'free money', 'get rich',
        'viagra', 'casino', 'lottery', 'winner', 'congratulations'
    ];
    
    const lowerText = text.toLowerCase();
    return spamKeywords.some(keyword => lowerText.includes(keyword));
};

/**
 * Count links in text
 * @param {string} text 
 * @returns {number}
 */
export const countLinks = (text) => {
    return (text.match(/https?:\/\//g) || []).length;
};

/**
 * Check if text has excessive capitalization
 * @param {string} text 
 * @param {number} threshold 
 * @returns {boolean}
 */
export const hasExcessiveCaps = (text, threshold = 50) => {
    const capsText = text.replace(/[^A-Z]/g, '');
    return capsText.length > threshold && capsText.length > text.length * 0.3;
};
