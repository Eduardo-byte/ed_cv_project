# Project Architecture - MVC Frontend Structure

This React application follows a Model-View-Controller (MVC) inspired architecture to ensure maintainability, scalability, and professional development practices.

## 📁 Folder Structure

```
src/
├── components/          # Reusable UI components (Views)
│   ├── layout/         # Layout components (Header, Footer, etc.)
│   ├── ui/            # UI components (Cards, Forms, etc.)
│   ├── common/        # Common/shared components
│   └── index.js       # Central exports
├── services/           # Business logic and API calls (Controllers)
│   ├── projectService.js
│   ├── contactService.js
│   └── index.js       # Central exports
├── config/            # Configuration files
│   └── endpoints.js   # API endpoint definitions
├── utils/             # Utility functions and helpers
│   ├── api.js         # Base API client (Axios setup)
│   ├── helpers.js     # Common helper functions
│   ├── constants.js   # Application constants
│   └── index.js       # Central exports
├── hooks/             # Custom React hooks
├── types/             # TypeScript interfaces/types (if using TS)
├── Pages/             # Page components (Views)
│   └── home.jsx       # Home page
└── assets/            # Static assets
```

## 🏗️ Architecture Patterns

### **Services Layer (Controllers)**
- `projectService.js` - Handles project-related operations
- `contactService.js` - Manages contact form and messaging
- Encapsulates business logic and API communications
- Provides validation and error handling

### **Components (Views)**
- **Layout Components**: Navigation, headers, footers
- **UI Components**: Reusable elements like cards, forms, buttons
- **Page Components**: Full page views that compose smaller components

### **Utils & Config**
- **API Utils**: Centralized HTTP client with interceptors
- **Constants**: Application-wide constants and configuration
- **Helpers**: Common utility functions for formatting, validation, etc.
- **Endpoints**: API endpoint definitions for easy maintenance

## 🚀 Key Features

### **Professional API Management**
```javascript
// Example API usage
import { projectService } from '../services';

const projects = await projectService.getAllProjects();
const featuredProjects = await projectService.getFeaturedProjects();
```

### **Reusable Components**
```javascript
// Example component usage
import { SkillCard, SocialLinks, ContactForm } from '../components';

<SkillCard title="Frontend" skills={frontendSkills} color="primary" />
```

### **Centralized Configuration**
```javascript
// Easy to maintain and update
export const SOCIAL_LINKS = {
  GITHUB: 'https://github.com/yourusername',
  LINKEDIN: 'https://linkedin.com/in/yourprofile',
  EMAIL: 'mailto:your.email@example.com'
};
```

## 🔧 Customization Guide

### **1. Update Personal Information**
Edit `/src/utils/constants.js`:
```javascript
export const APP_INFO = {
  NAME: 'Your Name - Full Stack Developer',
  EMAIL: 'your.email@example.com',
  PHONE: '+1234567890',
  LOCATION: 'Your Location'
};

export const SOCIAL_LINKS = {
  GITHUB: 'https://github.com/yourusername',
  LINKEDIN: 'https://linkedin.com/in/yourprofile',
  // ... update with your profiles
};
```

### **2. Customize Skills**
Edit `/src/Pages/home.jsx`:
```javascript
const skillsData = [
  {
    title: 'Frontend',
    icon: Globe,
    color: 'primary',
    skills: ['Your', 'Skills', 'Here']
  },
  // ... add your skill categories
];
```

### **3. Configure API Endpoints**
If you plan to add a backend, update `/src/config/endpoints.js`:
```javascript
export const API_ENDPOINTS = {
  PROJECTS: {
    LIST: '/projects',
    // ... your endpoints
  }
};
```

## 🛠️ Development Workflow

### **Adding New Components**
1. Create component in appropriate folder (`/components/ui/` or `/components/layout/`)
2. Export from `/components/index.js`
3. Import using: `import { NewComponent } from '../components'`

### **Adding New Services**
1. Create service in `/services/` directory
2. Follow the existing pattern with validation and error handling
3. Export from `/services/index.js`

### **Adding New Pages**
1. Create page component in `/Pages/` directory
2. Add route to `/src/App.jsx`
3. Update navigation in `/components/layout/Header.jsx`

## 📱 Responsive Design

The application uses:
- **Tailwind CSS** for responsive utilities
- **HeroUI** for consistent component styling
- **Framer Motion** for smooth animations
- **Mobile-first** approach

## 🔄 State Management

Currently using React's built-in state management:
- `useState` for component state
- Props for data passing
- Services for business logic

For complex applications, consider adding:
- Context API for global state
- React Query for server state
- Zustand for client state

## 🚀 Deployment Ready

The architecture supports:
- **Environment Variables** for different environments
- **Build Optimization** with Vite
- **Code Splitting** ready structure
- **SEO Friendly** with proper meta tags

## 🔧 Next Steps

1. **Add Backend**: Use the service layer to connect to your API
2. **Add Projects Page**: Create a dedicated projects showcase
3. **Add Blog**: Implement a blog section for articles
4. **Add Analytics**: Track user interactions
5. **Add Testing**: Unit and integration tests

This architecture provides a solid foundation for a professional CV website that can grow with your needs and showcase your development skills effectively.
