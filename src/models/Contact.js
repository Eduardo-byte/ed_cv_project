// Contact model with validation and spam detection
export class Contact {
    constructor(data = {}) {
        this.id = data.id || null;
        this.name = data.name || '';
        this.email = data.email || '';
        this.subject = data.subject || '';
        this.message = data.message || '';
        this.phone = data.phone || '';
        this.company = data.company || '';
        this.status = data.status || 'new';
        this.isSpam = Boolean(data.isSpam || data.is_spam);
        this.ipAddress = data.ipAddress || data.ip_address || '';
        this.userAgent = data.userAgent || data.user_agent || '';
        this.source = data.source || 'cv_website';
        this.createdAt = data.createdAt || data.created_at || new Date().toISOString();
        this.readAt = data.readAt || data.read_at || null;
        this.repliedAt = data.repliedAt || data.replied_at || null;
        this.metadata = data.metadata || {};
    }

    // Validate form fields
    validate() {
        const errors = [];

        // Name validation
        if (!this.name || this.name.trim().length < 2) {
            errors.push('Name must be at least 2 characters long');
        }
        if (this.name && this.name.length > 100) {
            errors.push('Name must be less than 100 characters');
        }

        // Email validation
        if (!this.email || !this.isValidEmail(this.email)) {
            errors.push('Valid email address is required');
        }

        // Subject validation
        if (!this.subject || this.subject.trim().length < 5) {
            errors.push('Subject must be at least 5 characters long');
        }
        if (this.subject && this.subject.length > 200) {
            errors.push('Subject must be less than 200 characters');
        }

        // Message validation
        const minLength = 10;
        const maxLength = 5000;
        if (!this.message || this.message.trim().length < minLength) {
            errors.push(`Message must be at least ${minLength} characters long`);
        }
        if (this.message && this.message.length > maxLength) {
            errors.push(`Message must be less than ${maxLength} characters`);
        }

        // Phone validation (optional)
        if (this.phone && !this.isValidPhone(this.phone)) {
            errors.push('Invalid phone number format');
        }

        return {
            isValid: errors.length === 0,
            errors
        };
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    isValidPhone(phone) {
        // Basic phone validation - allows various formats
        const phoneRegex = /^[\+]?[(]?[\d\s\-\(\)]{8,}$/;
        return phoneRegex.test(phone.replace(/\s/g, ''));
    }

    // Basic spam detection
    detectSpam() {
        const spamKeywords = [
            'buy now', 'click here', 'limited time', 'act fast', 'guaranteed',
            'make money', 'work from home', 'free money', 'get rich',
            'viagra', 'casino', 'lottery', 'winner', 'congratulations'
        ];

        const content = (this.message + ' ' + this.subject + ' ' + this.name).toLowerCase();
        
        // Check for spam keywords
        const hasSpamKeywords = spamKeywords.some(keyword => 
            content.includes(keyword.toLowerCase())
        );

        // Check for excessive links
        const linkCount = (this.message.match(/https?:\/\//g) || []).length;
        const hasExcessiveLinks = linkCount > 3;

        // Check for excessive caps
        const capsText = this.message.replace(/[^A-Z]/g, '');
        const hasExcessiveCaps = capsText.length > 50 && capsText.length > this.message.length * 0.3;

        // Check for suspicious patterns
        const hasSuspiciousChars = /[^\w\s\.\,\!\?\-\@\(\)\[\]\'\"]/g.test(content);
        const hasRepeatingChars = /(.)\1{4,}/g.test(content);

        return hasSpamKeywords || hasExcessiveLinks || hasExcessiveCaps || 
               hasSuspiciousChars || hasRepeatingChars;
    }

    /**
     * Get formatted date
     * @param {string} field - createdAt, readAt, or repliedAt
     * @returns {string}
     */
    getFormattedDate(field = 'createdAt') {
        const dateValue = this[field];
        if (!dateValue) return 'N/A';
        
        const date = new Date(dateValue);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    /**
     * Mark as read
     */
    markAsRead() {
        this.readAt = new Date().toISOString();
        this.status = 'read';
    }

    /**
     * Mark as replied
     */
    markAsReplied() {
        this.repliedAt = new Date().toISOString();
        this.status = 'replied';
    }

    /**
     * Mark as spam
     */
    markAsSpam() {
        this.isSpam = true;
        this.status = 'spam';
    }

    /**
     * Sanitize input data
     * @returns {Contact}
     */
    sanitize() {
        this.name = this.name.trim();
        this.email = this.email.trim().toLowerCase();
        this.subject = this.subject.trim();
        this.message = this.message.trim();
        this.phone = this.phone.trim();
        this.company = this.company.trim();
        return this;
    }

    /**
     * Convert to plain object for API
     * @returns {Object}
     */
    toJSON() {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            subject: this.subject,
            message: this.message,
            phone: this.phone,
            company: this.company,
            status: this.status,
            isSpam: this.isSpam,
            ipAddress: this.ipAddress,
            userAgent: this.userAgent,
            source: this.source,
            createdAt: this.createdAt,
            readAt: this.readAt,
            repliedAt: this.repliedAt,
            metadata: this.metadata
        };
    }

    /**
     * Create Contact instance from form data
     * @param {Object} formData 
     * @returns {Contact}
     */
    static fromFormData(formData) {
        const contact = new Contact(formData);
        contact.sanitize();
        return contact;
    }

    /**
     * Create Contact instance from API response
     * @param {Object} apiData 
     * @returns {Contact}
     */
    static fromApiResponse(apiData) {
        return new Contact(apiData);
    }
}

export default Contact;
