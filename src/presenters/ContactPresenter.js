import { contactService } from '../services/index.js';
import { Contact } from '../models/Contact.js';

// Business logic for contact form handling
export class ContactPresenter {
    constructor() {
        this.loading = false;
        this.error = null;
        this.success = false;
        this.lastSubmission = null;
    }

    // Submit form with validation and spam check
    async submitContactForm(formData) {
        try {
            this.loading = true;
            this.error = null;
            this.success = false;

            // Create contact model and validate
            const contact = Contact.fromFormData(formData);
            const validation = contact.validate();

            if (!validation.isValid) {
                throw new Error(`Validation errors: ${validation.errors.join(', ')}`);
            }

            // Check for spam
            if (contact.detectSpam()) {
                console.warn('Potential spam detected in contact form');
                contact.markAsSpam();
            }

            // Submit to API
            const response = await contactService.sendMessage(contact.toJSON());
            
            if (response && response.success) {
                this.success = true;
                this.lastSubmission = {
                    ...contact.toJSON(),
                    submittedAt: new Date().toISOString()
                };
                return true;
            } else {
                throw new Error(response?.message || 'Failed to send message');
            }
        } catch (error) {
            this.error = error.message;
            console.error('ContactPresenter: Error submitting contact form:', error);
            return false;
        } finally {
            this.loading = false;
        }
    }

    validateForm(formData) {
        const contact = Contact.fromFormData(formData);
        return contact.validate();
    }

    isSpamLikely(formData) {
        const contact = Contact.fromFormData(formData);
        return contact.detectSpam();
    }

    resetState() {
        this.loading = false;
        this.error = null;
        this.success = false;
        this.lastSubmission = null;
    }

    /**
     * Get form submission status
     * @returns {Object}
     */
    getStatus() {
        return {
            loading: this.loading,
            error: this.error,
            success: this.success,
            hasSubmitted: !!this.lastSubmission
        };
    }

    /**
     * Get last submission details
     * @returns {Object|null}
     */
    getLastSubmission() {
        return this.lastSubmission;
    }

    /**
     * Format error message for display
     * @returns {string}
     */
    getErrorMessage() {
        if (!this.error) return '';
        
        // Handle common error types
        if (this.error.includes('Network Error')) {
            return 'Network error. Please check your connection and try again.';
        }
        
        if (this.error.includes('Validation errors')) {
            return this.error.replace('Validation errors: ', 'Please fix: ');
        }
        
        if (this.error.includes('timeout')) {
            return 'Request timed out. Please try again.';
        }
        
        return this.error;
    }

    /**
     * Get success message for display
     * @returns {string}
     */
    getSuccessMessage() {
        if (!this.success) return '';
        
        return 'Thank you for your message! I\'ll get back to you as soon as possible.';
    }

    /**
     * Track contact form interaction (for analytics)
     * @param {string} action - The action taken (start, submit, error, etc.)
     * @param {Object} data - Additional data to track
     */
    trackInteraction(action, data = {}) {
        try {
            // Basic interaction tracking
            const trackingData = {
                action,
                timestamp: new Date().toISOString(),
                userAgent: navigator.userAgent,
                url: window.location.href,
                ...data
            };
            
            console.log('Contact form interaction:', trackingData);
            
            // Here you could integrate with analytics services
            // like Google Analytics, Mixpanel, etc.
            
            // Example: Google Analytics 4
            if (typeof gtag !== 'undefined') {
                gtag('event', 'contact_form_interaction', {
                    action,
                    page_location: window.location.href,
                    ...data
                });
            }
        } catch (error) {
            console.warn('Failed to track contact form interaction:', error);
        }
    }

    /**
     * Get form configuration from environment
     * @returns {Object}
     */
    getFormConfig() {
        return {
            maxMessageLength: parseInt(import.meta.env.VITE_CONTACT_MAX_MESSAGE_LENGTH) || 5000,
            minMessageLength: parseInt(import.meta.env.VITE_CONTACT_MIN_MESSAGE_LENGTH) || 10,
            placeholderEmail: import.meta.env.VITE_CONTACT_PLACEHOLDER_EMAIL || 'your.email@example.com',
            enablePhone: import.meta.env.VITE_CONTACT_ENABLE_PHONE === 'true',
            enableCompany: import.meta.env.VITE_CONTACT_ENABLE_COMPANY === 'true',
            spamProtection: {
                maxLinks: parseInt(import.meta.env.VITE_SPAM_MAX_LINKS) || 3,
                maxCapsLength: parseInt(import.meta.env.VITE_SPAM_MAX_CAPS_LENGTH) || 50
            }
        };
    }
}

// Create and export a singleton instance
export const contactPresenter = new ContactPresenter();
export default contactPresenter;
