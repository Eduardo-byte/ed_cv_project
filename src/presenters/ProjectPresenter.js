import { apiProjectService } from '../services/index.js';
import { Project } from '../models/Project.js';

// Business logic for project data management
export class ProjectPresenter {
    constructor() {
        this.projects = [];
        this.loading = false;
        this.error = null;
        this.filters = {
            category: 'all',
            search: '',
            technology: '',
            status: 'active'
        };
        this.sortBy = 'createdAt';
        this.sortOrder = 'desc';
    }

    async loadProjects(params = {}) {
        try {
            this.loading = true;
            this.error = null;

            const response = await apiProjectService.getAllProjects(params);
            
            if (response && response.success) {
                this.projects = Project.fromApiResponseArray(response.data || response.projects);
                return this.projects;
            } else {
                throw new Error(response?.message || 'Failed to load projects');
            }
        } catch (error) {
            this.error = error.message;
            console.error('ProjectPresenter: Error loading projects:', error);
            return [];
        } finally {
            this.loading = false;
        }
    }

    async loadProjectById(projectId) {
        try {
            this.loading = true;
            this.error = null;

            const response = await apiProjectService.getProjectById(projectId);
            
            if (response && response.success) {
                return Project.fromApiResponse(response.data || response.project);
            } else {
                throw new Error(response?.message || 'Project not found');
            }
        } catch (error) {
            this.error = error.message;
            console.error(`ProjectPresenter: Error loading project ${projectId}:`, error);
            return null;
        } finally {
            this.loading = false;
        }
    }

    getFeaturedProjects() {
        return this.projects.filter(project => project.featured);
    }

    getProjectsByCategory(category) {
        if (category === 'all') return this.projects;
        return this.projects.filter(project => project.category === category);
    }

    // Apply all active filters
    getFilteredProjects() {
        let filtered = [...this.projects];

        // Apply category filter
        if (this.filters.category && this.filters.category !== 'all') {
            filtered = filtered.filter(project => 
                project.category === this.filters.category
            );
        }

        // Apply search filter
        if (this.filters.search) {
            const searchTerm = this.filters.search.toLowerCase();
            filtered = filtered.filter(project =>
                project.title.toLowerCase().includes(searchTerm) ||
                project.description.toLowerCase().includes(searchTerm) ||
                project.technologies.some(tech => 
                    tech.toLowerCase().includes(searchTerm)
                )
            );
        }

        // Apply technology filter
        if (this.filters.technology) {
            const tech = this.filters.technology.toLowerCase();
            filtered = filtered.filter(project =>
                project.technologies.some(technology => 
                    technology.toLowerCase().includes(tech)
                )
            );
        }

        // Apply status filter
        if (this.filters.status) {
            filtered = filtered.filter(project => project.status === this.filters.status);
        }

        // Apply sorting
        return this.sortProjects(filtered);
    }

    /**
     * Sort projects
     * @param {Project[]} projects 
     * @returns {Project[]}
     */
    sortProjects(projects) {
        return [...projects].sort((a, b) => {
            let aValue, bValue;

            switch (this.sortBy) {
                case 'title':
                    aValue = a.title.toLowerCase();
                    bValue = b.title.toLowerCase();
                    break;
                case 'category':
                    aValue = a.category.toLowerCase();
                    bValue = b.category.toLowerCase();
                    break;
                case 'createdAt':
                default:
                    aValue = new Date(a.createdAt);
                    bValue = new Date(b.createdAt);
                    break;
            }

            if (this.sortOrder === 'asc') {
                return aValue > bValue ? 1 : -1;
            } else {
                return aValue < bValue ? 1 : -1;
            }
        });
    }

    /**
     * Set filter
     * @param {string} filterType 
     * @param {any} value 
     */
    setFilter(filterType, value) {
        this.filters[filterType] = value;
    }

    /**
     * Set sorting
     * @param {string} sortBy 
     * @param {string} sortOrder 
     */
    setSorting(sortBy, sortOrder = 'desc') {
        this.sortBy = sortBy;
        this.sortOrder = sortOrder;
    }

    /**
     * Reset all filters
     */
    resetFilters() {
        this.filters = {
            category: 'all',
            search: '',
            technology: '',
            status: 'active'
        };
    }

    /**
     * Get project statistics
     * @returns {Object}
     */
    getProjectStats() {
        const stats = {
            total: this.projects.length,
            featured: this.getFeaturedProjects().length,
            categories: {},
            technologies: {},
            status: {}
        };

        this.projects.forEach(project => {
            // Count by category
            stats.categories[project.category] = (stats.categories[project.category] || 0) + 1;

            // Count by status
            stats.status[project.status] = (stats.status[project.status] || 0) + 1;

            // Count technologies
            project.technologies.forEach(tech => {
                stats.technologies[tech] = (stats.technologies[tech] || 0) + 1;
            });
        });

        return stats;
    }

    /**
     * Get available categories
     * @returns {string[]}
     */
    getAvailableCategories() {
        const categories = new Set();
        this.projects.forEach(project => {
            if (project.category) {
                categories.add(project.category);
            }
        });
        return Array.from(categories).sort();
    }

    /**
     * Get available technologies
     * @returns {string[]}
     */
    getAvailableTechnologies() {
        const technologies = new Set();
        this.projects.forEach(project => {
            project.technologies.forEach(tech => {
                technologies.add(tech);
            });
        });
        return Array.from(technologies).sort();
    }

    /**
     * Check if project exists
     * @param {string} projectId 
     * @returns {boolean}
     */
    hasProject(projectId) {
        return this.projects.some(project => project.id === projectId);
    }

    /**
     * Get project by ID from loaded projects
     * @param {string} projectId 
     * @returns {Project|null}
     */
    getProject(projectId) {
        return this.projects.find(project => project.id === projectId) || null;
    }

    /**
     * Clear all data
     */
    clear() {
        this.projects = [];
        this.error = null;
        this.loading = false;
        this.resetFilters();
    }
}

// Create and export a singleton instance
export const projectPresenter = new ProjectPresenter();
export default projectPresenter;
