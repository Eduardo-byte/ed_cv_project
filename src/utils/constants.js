// Application Constants
// Centralized place for all constants used throughout the application

// Application Info
export const APP_INFO = {
  NAME: 'Eduardo Brito - Full Stack Developer',
  VERSION: '1.0.0',
  DESCRIPTION: 'Professional CV and Portfolio Website',
  AUTHOR: 'Eduardo Brito',
  EMAIL: 'edbrito.luis@gmail.com',
  PHONE: '07495693576',
  LOCATION: 'Greater Bournemouth Area, UK',
  LINKEDIN: 'https://www.linkedin.com/in/eduardo-luis-brito-4782a7103/',
};

// Social Media Links - Update these with your actual profiles
export const SOCIAL_LINKS = {
  GITHUB: 'https://github.com/Eduardo-byte',
  LINKEDIN: 'https://www.linkedin.com/in/eduardo-luis-brito-4782a7103/',
  TWITTER: 'https://x.com/Eduardo47153641',
  EMAIL: `mailto:${APP_INFO.EMAIL}`,
  PORTFOLIO: 'https://yourportfolio.com',
};

// Navigation Routes
export const ROUTES = {
  HOME: '/',
  PROJECTS: '/projects',
  ABOUT: '/about',
  CONTACT: '/contact',
  BLOG: '/blog',
  RESUME: '/resume',
};

// Skill Categories
export const SKILL_CATEGORIES = {
  FRONTEND: 'frontend',
  BACKEND: 'backend',
  DATABASE: 'database',
  TOOLS: 'tools',
  CLOUD: 'cloud',
  MOBILE: 'mobile',
};

// Project Categories
export const PROJECT_CATEGORIES = {
  FULL_STACK: 'full-stack',
  FRONTEND: 'frontend',
  BACKEND: 'backend',
  MOBILE: 'mobile',
  OPEN_SOURCE: 'open-source',
  COMPANY: 'company',
  PERSONAL: 'personal',
};

// Project Types
export const PROJECT_TYPES = {
  WEB_APP: 'web-application',
  MOBILE_APP: 'mobile-application',
  API: 'api',
  LIBRARY: 'library',
  TOOL: 'tool',
  WEBSITE: 'website',
};

// Technology Stacks
export const TECH_STACKS = {
  REACT: ['React', 'JavaScript', 'CSS', 'HTML'],
  MERN: ['MongoDB', 'Express.js', 'React', 'Node.js'],
  MEAN: ['MongoDB', 'Express.js', 'Angular', 'Node.js'],
  DJANGO: ['Django', 'Python', 'PostgreSQL'],
  NEXTJS: ['Next.js', 'React', 'Vercel'],
  SUPABASE: ['Supabase', 'PostgreSQL', 'React'],
};

// UI Constants
export const UI_CONSTANTS = {
  ANIMATION_DURATION: {
    SHORT: 200,
    MEDIUM: 400,
    LONG: 600,
  },
  BREAKPOINTS: {
    SM: 640,
    MD: 768,
    LG: 1024,
    XL: 1280,
    '2XL': 1536,
  },
  Z_INDEX: {
    DROPDOWN: 1000,
    STICKY: 1020,
    FIXED: 1030,
    MODAL_BACKDROP: 1040,
    MODAL: 1050,
    POPOVER: 1060,
    TOOLTIP: 1070,
  },
};

// API Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
};

// Local Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'authToken',
  USER_PREFERENCES: 'userPreferences',
  THEME: 'theme',
  LANGUAGE: 'language',
  RECENT_VIEWS: 'recentViews',
};

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  NOT_FOUND: 'The requested resource was not found.',
  SERVER_ERROR: 'Server error. Please try again later.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  GENERIC_ERROR: 'Something went wrong. Please try again.',
};

// Success Messages
export const SUCCESS_MESSAGES = {
  MESSAGE_SENT: 'Message sent successfully!',
  DATA_SAVED: 'Data saved successfully!',
  PROFILE_UPDATED: 'Profile updated successfully!',
  LOGIN_SUCCESS: 'Login successful!',
  LOGOUT_SUCCESS: 'Logged out successfully!',
};

// Form Validation
export const VALIDATION_RULES = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^\+?[\d\s\-\(\)]+$/,
  URL: /^https?:\/\/.+/,
  REQUIRED_FIELD_ERROR: 'This field is required',
  INVALID_EMAIL_ERROR: 'Please enter a valid email address',
  INVALID_PHONE_ERROR: 'Please enter a valid phone number',
  INVALID_URL_ERROR: 'Please enter a valid URL',
};

// Date Formats
export const DATE_FORMATS = {
  FULL: 'MMMM DD, YYYY',
  SHORT: 'MM/DD/YYYY',
  MONTH_YEAR: 'MMMM YYYY',
  YEAR: 'YYYY',
  ISO: 'YYYY-MM-DD',
};

export default {
  APP_INFO,
  SOCIAL_LINKS,
  ROUTES,
  SKILL_CATEGORIES,
  PROJECT_CATEGORIES,
  UI_CONSTANTS,
  HTTP_STATUS,
  STORAGE_KEYS,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  VALIDATION_RULES,
  DATE_FORMATS,
};
