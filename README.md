# Eduardo Brito - Professional CV Website

A modern, responsive CV website built with React, Vite, Tailwind CSS, and HeroUI. This project follows professional MVC architecture patterns and is designed to showcase full-stack development skills.

## 🚀 Features

- **Modern Design**: Beautiful, responsive UI with smooth animations
- **MVC Architecture**: Professional folder structure with separated concerns
- **Component Library**: Reusable UI components with HeroUI
- **API Ready**: Service layer prepared for backend integration
- **Performance Optimized**: Built with Vite for fast development and production builds
- **Type Safety**: JSDoc comments for better development experience

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite
- **UI Library**: HeroUI (NextUI successor)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Notifications**: Sonner
- **HTTP Client**: Axios
- **Routing**: React Router DOM

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── layout/         # Layout components (Header, etc.)
│   ├── ui/            # UI components (Cards, Forms, etc.)
│   ├── common/        # Common/shared components
│   └── index.js       # Central exports
├── services/           # Business logic and API calls
│   ├── projectService.js
│   ├── contactService.js
│   ├── metrics.service.js
│   └── index.js
├── config/            # Configuration files
│   ├── endpoints.js   # API endpoint definitions
│   └── apiGatewayAxiosInstance.js # HTTP client setup
├── utils/             # Utility functions
│   ├── constants.js   # Application constants
│   └── index.js
├── Pages/             # Page components
│   └── home.jsx
├── hooks/             # Custom React hooks (ready for expansion)
├── types/             # TypeScript types (ready for TS migration)
└── assets/            # Static assets
```

## 🏗️ Architecture Highlights

### **Clean Service Layer**
- Class-based services following consistent patterns
- Unified error handling with `logError`
- JSDoc documentation for all methods
- Simple return patterns (`data | null`)

### **Centralized Configuration**
- All API endpoints in one organized file
- Environment variable support
- Easy to maintain and update

### **Reusable Components**
- Modular UI components
- Consistent prop patterns
- Animation support built-in

## 🚀 Getting Started

1. **Clone and Install**
   ```bash
   git clone <your-repo>
   cd ed_cv_project
   npm install
   ```

2. **Environment Setup**
   ```bash
   cp .env.example .env
   # Update with your actual API endpoints and keys
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

4. **Build for Production**
   ```bash
   npm run build
   ```

## 🎨 Customization

### **Personal Information**
Update `/src/utils/constants.js`:
```javascript
export const APP_INFO = {
  NAME: 'Your Name - Full Stack Developer',
  EMAIL: 'your.email@example.com',
  LOCATION: 'Your Location'
};

export const SOCIAL_LINKS = {
  GITHUB: 'https://github.com/yourusername',
  LINKEDIN: 'https://linkedin.com/in/yourprofile',
  // ... your social profiles
};
```

### **Skills & Technologies**
Edit `/src/Pages/home.jsx` skillsData array:
```javascript
const skillsData = [
  {
    title: 'Frontend',
    icon: Globe,
    color: 'primary',
    skills: ['Your', 'Frontend', 'Skills']
  },
  // ... your skill categories
];
```

### **API Integration**
Services are ready to connect to your backend:
```javascript
import { projectService } from '../services';

// Get projects from your API
const projects = await projectService.getAllProjects();
const featured = await projectService.getFeaturedProjects();
```

## 🌟 Key Components

### **SkillCard**
Displays technology skills by category with animations
```jsx
<SkillCard
  title="Frontend"
  icon={Globe}
  skills={['React', 'Vue.js', 'TypeScript']}
  color="primary"
/>
```

### **ContactForm**
Professional contact form with validation
```jsx
<ContactForm className="max-w-2xl" />
```

### **SocialLinks**
Flexible social media links component
```jsx
<SocialLinks
  layout="horizontal"
  variant="bordered"
  showLabels={true}
/>
```

## 🔧 API Endpoints

The project includes predefined endpoints for:
- **Projects**: CRUD operations for portfolio projects
- **Skills**: Manage skills and technologies
- **Contact**: Handle contact form submissions
- **Analytics**: Track user interactions

## 📱 Responsive Design

- Mobile-first approach
- Tailwind CSS utilities
- HeroUI responsive components
- Smooth animations on all devices

## 🚀 Deployment Ready

- Optimized build process
- Environment variable support
- Static file optimization
- SEO-friendly structure

## 📈 Next Steps

1. **Backend Integration**: Connect services to your API
2. **Projects Page**: Add dedicated projects showcase
3. **Blog Section**: Implement article/blog functionality
4. **Dashboard**: Add admin panel for content management
5. **Analytics**: Implement user tracking and metrics

## 🤝 Contributing

This is a personal CV project, but feel free to use it as inspiration for your own portfolio!

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Built with ❤️ by Eduardo Brito