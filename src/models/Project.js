// Project model with validation
export class Project {
    constructor(data = {}) {
        this.id = data.id || null;
        this.title = data.title || '';
        this.description = data.description || '';
        this.shortDescription = data.shortDescription || '';
        this.technologies = Array.isArray(data.technologies) ? data.technologies : [];
        this.category = data.category || '';
        this.status = data.status || 'active';
        this.featured = Boolean(data.featured);
        this.githubUrl = data.githubUrl || data.github_url || '';
        this.liveUrl = data.liveUrl || data.live_url || '';
        this.imageUrl = data.imageUrl || data.image_url || '';
        this.createdAt = data.createdAt || data.created_at || new Date().toISOString();
        this.updatedAt = data.updatedAt || data.updated_at || new Date().toISOString();
        this.order = data.order || 0;
        this.metadata = data.metadata || {};
    }

    // Validate required fields and formats
    validate() {
        const errors = [];

        if (!this.title || this.title.trim().length < 3) {
            errors.push('Title must be at least 3 characters long');
        }

        if (!this.description || this.description.trim().length < 10) {
            errors.push('Description must be at least 10 characters long');
        }

        if (!this.category || this.category.trim().length === 0) {
            errors.push('Category is required');
        }

        if (this.githubUrl && !this.isValidUrl(this.githubUrl)) {
            errors.push('GitHub URL must be a valid URL');
        }

        if (this.liveUrl && !this.isValidUrl(this.liveUrl)) {
            errors.push('Live URL must be a valid URL');
        }

        return {
            isValid: errors.length === 0,
            errors
        };
    }

    isValidUrl(url) {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    }

    getFormattedDate(field = 'createdAt') {
        const date = new Date(this[field]);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    getPrimaryUrl() {
        return this.liveUrl || this.githubUrl || '';
    }

    isDisplayReady() {
        return !!(this.title && this.description && this.category);
    }

    toJSON() {
        return {
            id: this.id,
            title: this.title,
            description: this.description,
            shortDescription: this.shortDescription,
            technologies: this.technologies,
            category: this.category,
            status: this.status,
            featured: this.featured,
            githubUrl: this.githubUrl,
            liveUrl: this.liveUrl,
            imageUrl: this.imageUrl,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            order: this.order,
            metadata: this.metadata
        };
    }

    static fromApiResponse(apiData) {
        return new Project(apiData);
    }

    static fromApiResponseArray(apiDataArray) {
        return Array.isArray(apiDataArray) 
            ? apiDataArray.map(data => Project.fromApiResponse(data))
            : [];
    }
}

export default Project;
