import { ENDPOINTS } from '../config/endpoints.js';
import apiGatewayAxiosInstance, { logError } from '../config/apiGatewayAxiosInstance.js';

/**
 * Project Service - Handles all project-related API calls and business logic.
 */
class ProjectService {
    /**
     * Get all projects.
     * @param {Object} params - Query parameters (page, limit, category, etc.)
     * @returns {Promise<Object|null>} - The projects data or null if an error occurs.
     */
    async getAllProjects(params = {}) {
        try {
            const response = await apiGatewayAxiosInstance.get(ENDPOINTS.CV.PROJECTS.READ_ALL, { params });
            return response.data.data;
        } catch (error) {
            logError("Error fetching projects:", error);
            return null;
        }
    }

    /**
     * Get project by ID.
     * @param {string} projectId - The project ID to get.
     * @returns {Promise<Object|null>} - The project data or null if an error occurs.
     */
    async getProjectById(projectId) {
        try {
            const response = await apiGatewayAxiosInstance.get(
                ENDPOINTS.CV.PROJECTS.READ_BY_ID.replace(':projectId', projectId)
            );
            return response.data.data;
        } catch (error) {
            logError(`Error fetching project ${projectId}:`, error);
            return null;
        }
    }

    /**
     * Get projects by category.
     * @param {string} category - The project category.
     * @returns {Promise<Array|null>} - The projects array or null if an error occurs.
     */
    async getProjectsByCategory(category) {
        try {
            const response = await apiGatewayAxiosInstance.get(
                ENDPOINTS.CV.PROJECTS.READ_BY_CATEGORY.replace(':category', category)
            );
            return response.data.data;
        } catch (error) {
            logError(`Error fetching projects for category ${category}:`, error);
            return null;
        }
    }

    /**
     * Get featured projects.
     * @returns {Promise<Array|null>} - The featured projects array or null if an error occurs.
     */
    async getFeaturedProjects() {
        try {
            const response = await apiGatewayAxiosInstance.get(ENDPOINTS.CV.PROJECTS.READ_FEATURED);
            return response.data.data;
        } catch (error) {
            logError("Error fetching featured projects:", error);
            return null;
        }
    }

    /**
     * Create new project (admin functionality).
     * @param {Object} projectData - The project data to create.
     * @returns {Promise<Object|null>} - The created project or null if an error occurs.
     */
    async createProject(projectData) {
        try {
            const response = await apiGatewayAxiosInstance.post(ENDPOINTS.CV.PROJECTS.CREATE, projectData);
            return response.data.data;
        } catch (error) {
            logError("Error creating project:", error);
            return null;
        }
    }

    /**
     * Update project (admin functionality).
     * @param {string} projectId - The project ID to update.
     * @param {Object} updateData - The updated project data.
     * @returns {Promise<Object|null>} - The updated project or null if an error occurs.
     */
    async updateProject(projectId, updateData) {
        try {
            const response = await apiGatewayAxiosInstance.put(
                ENDPOINTS.CV.PROJECTS.UPDATE.replace(':projectId', projectId),
                updateData
            );
            return response.data.data;
        } catch (error) {
            logError(`Error updating project ${projectId}:`, error);
            return null;
        }
    }

    /**
     * Delete project (admin functionality).
     * @param {string} projectId - The project ID to delete.
     * @returns {Promise<boolean>} - True if successful, false if an error occurs.
     */
    async deleteProject(projectId) {
        try {
            await apiGatewayAxiosInstance.delete(
                ENDPOINTS.CV.PROJECTS.DELETE.replace(':projectId', projectId)
            );
            return true;
        } catch (error) {
            logError(`Error deleting project ${projectId}:`, error);
            return false;
        }
    }

    /**
     * Filter projects based on criteria.
     * @param {Array} projects - Array of projects to filter.
     * @param {Object} filters - Filter criteria.
     * @returns {Array} - Filtered projects array.
     */
    filterProjects(projects, filters = {}) {
        let filteredProjects = [...projects];

        // Filter by category
        if (filters.category && filters.category !== 'all') {
            filteredProjects = filteredProjects.filter(project => 
                project.category === filters.category
            );
        }

        // Filter by technology
        if (filters.technology) {
            filteredProjects = filteredProjects.filter(project =>
                project.technologies?.some(tech => 
                    tech.toLowerCase().includes(filters.technology.toLowerCase())
                )
            );
        }

        // Filter by search term
        if (filters.search) {
            const searchTerm = filters.search.toLowerCase();
            filteredProjects = filteredProjects.filter(project =>
                project.title?.toLowerCase().includes(searchTerm) ||
                project.description?.toLowerCase().includes(searchTerm) ||
                project.technologies?.some(tech => 
                    tech.toLowerCase().includes(searchTerm)
                )
            );
        }

        // Filter by status
        if (filters.status) {
            filteredProjects = filteredProjects.filter(project => 
                project.status === filters.status
            );
        }

        return filteredProjects;
    }

    /**
     * Sort projects based on criteria.
     * @param {Array} projects - Array of projects to sort.
     * @param {string} sortBy - Sort criteria (date, title, category).
     * @param {string} order - Sort order (asc, desc).
     * @returns {Array} - Sorted projects array.
     */
    sortProjects(projects, sortBy = 'date', order = 'desc') {
        const sortedProjects = [...projects];

        sortedProjects.sort((a, b) => {
            let aValue, bValue;

            switch (sortBy) {
                case 'title':
                    aValue = a.title?.toLowerCase() || '';
                    bValue = b.title?.toLowerCase() || '';
                    break;
                case 'category':
                    aValue = a.category?.toLowerCase() || '';
                    bValue = b.category?.toLowerCase() || '';
                    break;
                case 'date':
                default:
                    aValue = new Date(a.createdAt || a.date);
                    bValue = new Date(b.createdAt || b.date);
                    break;
            }

            if (order === 'asc') {
                return aValue > bValue ? 1 : -1;
            } else {
                return aValue < bValue ? 1 : -1;
            }
        });

        return sortedProjects;
    }

    /**
     * Get project statistics.
     * @param {Array} projects - Array of projects to analyze.
     * @returns {Object} - Project statistics object.
     */
    getProjectStatistics(projects) {
        const stats = {
            total: projects.length,
            categories: {},
            technologies: {},
            status: {
                completed: 0,
                inProgress: 0,
                planned: 0,
            },
        };

        projects.forEach(project => {
            // Count by category
            if (project.category) {
                stats.categories[project.category] = (stats.categories[project.category] || 0) + 1;
            }

            // Count by technologies
            if (project.technologies) {
                project.technologies.forEach(tech => {
                    stats.technologies[tech] = (stats.technologies[tech] || 0) + 1;
                });
            }

            // Count by status
            if (project.status) {
                stats.status[project.status] = (stats.status[project.status] || 0) + 1;
            }
        });

        return stats;
    }
}

export const projectService = new ProjectService();
