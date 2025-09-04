import { ENDPOINTS } from '../config/endpoints.js';
import apiGatewayAxiosInstance, { logError } from '../config/apiGatewayAxiosInstance.js';
import { getApiPath, replaceUrlParams } from '../utils/apiUtils.js';

/**
 * Contact Service - Handles contact form submissions and messaging.
 */
class ContactService {
    /**
     * Send contact message.
     * @param {Object} messageData - The contact message data.
     * @returns {Promise<Object|null>} - The response data or null if an error occurs.
     */
    async sendMessage(messageData) {
        try {
            // Validate required fields
            const validation = this.validateContactForm(messageData);
            if (!validation.isValid) {
                logError('Validation failed:', validation.errors);
                return null;
            }

            const response = await apiGatewayAxiosInstance.post(getApiPath(ENDPOINTS.CONTACT.SEND_MESSAGE), {
                ...messageData,
                timestamp: new Date().toISOString(),
                userAgent: navigator.userAgent,
                referrer: window.location.href,
            });
            return response.data.data;
        } catch (error) {
            logError('Error sending contact message:', error);
            return null;
        }
    }

    /**
     * Validate contact form data.
     * @param {Object} formData - The form data to validate.
     * @returns {Object} - Validation result with isValid boolean and errors array.
     */
    validateContactForm(formData) {
        const errors = [];
        const requiredFields = ['name', 'email', 'message'];
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Check required fields
        requiredFields.forEach(field => {
            if (!formData[field] || formData[field].toString().trim() === '') {
                errors.push(`${field.charAt(0).toUpperCase() + field.slice(1)} is required`);
            }
        });

        // Validate email format
        if (formData.email && !emailRegex.test(formData.email)) {
            errors.push('Please enter a valid email address');
        }

        // Validate message length
        const minLength = parseInt(import.meta.env.VITE_CONTACT_MIN_MESSAGE_LENGTH) || 10;
        const maxLength = parseInt(import.meta.env.VITE_CONTACT_MAX_MESSAGE_LENGTH) || 5000;
        
        if (formData.message && formData.message.length < minLength) {
            errors.push(`Message must be at least ${minLength} characters long`);
        }

        if (formData.message && formData.message.length > maxLength) {
            errors.push(`Message must be less than ${maxLength} characters`);
        }

        // Validate name length
        if (formData.name && formData.name.length < 2) {
            errors.push('Name must be at least 2 characters long');
        }

        if (formData.name && formData.name.length > 100) {
            errors.push('Name must be less than 100 characters');
        }

        // Basic spam detection
        if (this.detectSpam(formData)) {
            errors.push('Message appears to be spam');
        }

        return {
            isValid: errors.length === 0,
            errors,
        };
    }

    /**
     * Basic spam detection.
     * @param {Object} formData - The form data to check.
     * @returns {boolean} - True if likely spam.
     */
    detectSpam(formData) {
        const spamKeywords = [
            'viagra', 'casino', 'lottery', 'winner', 'congratulations',
            'click here', 'limited time', 'act now', 'free money',
            'guaranteed', 'risk free', 'no obligation'
        ];

        const message = formData.message?.toLowerCase() || '';
        const name = formData.name?.toLowerCase() || '';
        const subject = formData.subject?.toLowerCase() || '';

        const maxLinks = parseInt(import.meta.env.VITE_SPAM_MAX_LINKS) || 3;
        const maxCapsLength = parseInt(import.meta.env.VITE_SPAM_MAX_CAPS_LENGTH) || 50;
        
        const suspiciousPatterns = [
            // Too many links
            (message.match(/https?:\/\//g) || []).length > maxLinks,
            // All caps message
            message === message.toUpperCase() && message.length > maxCapsLength,
            // Repeated characters
            /(.)\1{4,}/.test(message),
            // Contains spam keywords
            spamKeywords.some(keyword => 
                message.includes(keyword) || 
                name.includes(keyword) || 
                subject.includes(keyword)
            )
        ];

        return suspiciousPatterns.some(pattern => pattern);
    }

    /**
     * Get all contact messages (admin functionality).
     * @param {Object} params - Query parameters.
     * @returns {Promise<Array|null>} - The messages array or null if an error occurs.
     */
    async getMessages(params = {}) {
        try {
            const response = await apiGatewayAxiosInstance.get(getApiPath(ENDPOINTS.CONTACT.READ_MESSAGES), { params });
            return response.data.data;
        } catch (error) {
            logError('Error fetching contact messages:', error);
            return null;
        }
    }

    /**
     * Get message by ID (admin functionality).
     * @param {string} messageId - The message ID.
     * @returns {Promise<Object|null>} - The message data or null if an error occurs.
     */
    async getMessageById(messageId) {
        try {
            const response = await apiGatewayAxiosInstance.get(
                getApiPath(replaceUrlParams(ENDPOINTS.CONTACT.READ_BY_ID, { id: messageId }))
            );
            return response.data.data;
        } catch (error) {
            logError(`Error fetching message ${messageId}:`, error);
            return null;
        }
    }

    /**
     * Track contact form interactions (for analytics).
     * @param {string} action - Action type (view, start, submit, success, error).
     * @param {Object} metadata - Additional metadata.
     * @returns {Promise<boolean>} - True if successful, false if an error occurs.
     */
    async trackContactInteraction(action, metadata = {}) {
        try {
            // Analytics tracking temporarily disabled since it's not part of the microservice yet
            if (false) {
                await apiGatewayAxiosInstance.post('/analytics/track', {
                    event: 'contact_form',
                    action,
                    metadata: {
                        ...metadata,
                        timestamp: new Date().toISOString(),
                        page: window.location.pathname,
                    },
                });
                return true;
            }
            return false;
        } catch (error) {
            // Silently fail analytics tracking to not disrupt user experience
            logError('Analytics tracking failed:', error);
            return false;
        }
    }
}

export const contactService = new ContactService();
