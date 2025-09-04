# 🎯 Eduardo Brito CV - React Frontend

A modern, clean React.js frontend for Eduardo Brito's professional CV website built with **MVP architecture** and connected to an external API microservice.

## 🏗️ Architecture Overview

This is the **frontend-only** portion of a microservices architecture:

```
Frontend (React) ──x-api-key──► External API Microservice
    Port 5173                        Port 3001
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Your API microservice running on port 3001

### Installation & Development
   ```bash
# Install dependencies
   npm install

# Start development server
   npm run dev
   ```

The frontend automatically connects to your API microservice at `http://localhost:3001/api/v1`

## 📋 Available Scripts

- `npm run dev` - Start development server (port 5173)
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the project root:

```env
# API Configuration - Points to your microservice
VITE_API_BASE_URL_DEV="http://localhost:3001/api"
VITE_API_BASE_URL_PROD="/api"
VITE_API_VERSION="v1"
VITE_API_TIMEOUT=10000
VITE_API_KEY="your-microservice-api-key"

# Application Settings
VITE_APP_NAME="Eduardo Brito CV"
VITE_DEBUG_MODE=true

# Contact Form Settings  
VITE_CONTACT_MAX_MESSAGE_LENGTH=5000
VITE_CONTACT_MIN_MESSAGE_LENGTH=10
VITE_SPAM_MAX_LINKS=3
VITE_SPAM_MAX_CAPS_LENGTH=50

# Authentication - Storage keys only (not secrets!)
VITE_AUTH_TOKEN_KEY="cv_api_token"
VITE_AUTH_SESSION_KEY="cv_api_session"
```

**⚠️ Important**: All `VITE_*` variables are **public** after build - never put secrets here!

## 🏗️ Project Structure - MVP Architecture

```
src/
├── 📄 App.jsx                     # Root component with routing
├── 📄 main.jsx                    # Application entry point
├── 📄 index.css                   # Global styles
├── 📁 assets/                     # Static assets
│   └── react.svg
├── 📁 components/                 # 👁️ VIEW LAYER - Reusable UI Components
│   ├── 📄 index.js               # Component exports
│   ├── 📁 layout/                # Layout components
│   │   └── Header.jsx
│   └── 📁 ui/                    # UI components
│       ├── ContactForm.jsx       # Contact form component
│       ├── ProjectCard.jsx       # Project display card
│       ├── SkillCard.jsx         # Skills display card
│       └── SocialLinks.jsx       # Social media links
├── 📁 pages/                     # 👁️ VIEW LAYER - Page Components
│   ├── home.jsx                  # Home/landing page
│   └── Projects.jsx              # Projects listing page
├── 📁 models/                    # 📊 MODEL LAYER - Data Models
│   ├── 📄 index.js               # Model exports
│   ├── Contact.js                # Contact data model with validation
│   └── Project.js                # Project data model with validation
├── 📁 presenters/                # 🎮 PRESENTER LAYER - Business Logic
│   ├── 📄 index.js               # Presenter exports
│   ├── ContactPresenter.js       # Contact form business logic
│   └── ProjectPresenter.js       # Project data management logic
├── 📁 services/                  # 🌐 SERVICE LAYER - API Communication
│   ├── 📄 index.js               # Service exports
│   ├── contactService.js         # Contact API service
│   └── apiProjectService.js      # Project API service
├── 📁 config/                    # ⚙️ CONFIGURATION LAYER
│   ├── endpoints.js              # API endpoint definitions
│   ├── appConfig.js              # App-wide configuration
│   └── apiGatewayAxiosInstance.js # HTTP client with JWT auth + x-api-key
└── 📁 utils/                     # 🔧 UTILITY LAYER
    ├── 📄 index.js               # Utility exports
    ├── constants.js              # App constants
    ├── validators.js             # Form validation utilities
    ├── apiUtils.js               # API helper functions
    ├── cvGenerator.js            # CV generation utilities
    └── pdfGenerator.js           # PDF generation utilities
```

## 🎯 MVP Architecture Pattern

### 📊 **Model Layer** (`src/models/`)
- **Purpose**: Data structures, validation, and business rules
- **Responsibilities**:
  - Data validation and sanitization
  - Business rule enforcement
  - Data transformation between API and UI formats

**Example:**
```javascript
import { Contact } from '../models/Contact.js';

const contact = Contact.fromFormData(formData);
const validation = contact.validate();
if (!validation.isValid) {
  console.error('Validation errors:', validation.errors);
}
```

### 👁️ **View Layer** (`src/components/`, `src/pages/`)
- **Purpose**: UI components and page layouts
- **Responsibilities**:
  - Rendering UI based on presenter state
  - Handling user interactions
  - Displaying data provided by presenters

### 🎮 **Presenter Layer** (`src/presenters/`)
- **Purpose**: Business logic coordination between Models and Views
- **Responsibilities**:
  - Coordinating between Models and Views
  - Managing application state
  - Handling complex business logic

**Example:**
```javascript
import { projectPresenter } from '../presenters/ProjectPresenter.js';

// Load projects
await projectPresenter.loadProjects();

// Filter projects
projectPresenter.setFilter('category', 'web');
const filteredProjects = projectPresenter.getFilteredProjects();
```

### 🌐 **Service Layer** (`src/services/`)
- **Purpose**: API communication and external data sources
- **Responsibilities**:
  - HTTP requests to microservice
  - Error handling and retry logic
  - Request/response transformation

**Example:**
```javascript
import { contactService } from '../services/contactService.js';

// Send message
const result = await contactService.sendMessage(messageData);
if (result.success) {
  console.log('Message sent successfully');
}
```

## 🎨 Features

### 🔐 **Security & Authentication**
- JWT token management with automatic refresh
- x-api-key header authentication
- Token storage in localStorage/sessionStorage
- Input validation and spam detection

### 📊 **API Integration**
- **Projects**: `/api/v1/projects` - Get, filter, and display projects
- **Contact**: `/api/v1/contact` - Send contact messages with validation
- **Health**: `/api/v1/health` - Monitor microservice health

### 🎨 **UI/UX**
- Modern responsive design with Tailwind CSS
- HeroUI component library
- Framer Motion animations
- PDF CV generation capabilities
- Contact form with spam protection

## 🌐 Production Deployment

### Build
```bash
npm run build
```

### Nginx Configuration
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    # Serve React frontend
    location / {
        root /path/to/dist;
        try_files $uri $uri/ /index.html;
    }

    # Proxy API calls to microservice
    location /api/ {
        proxy_pass http://localhost:3001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

## ✅ Benefits of This Architecture

### 🎯 **Separation of Concerns**
- Each layer has a single, clear responsibility
- Business logic is separated from UI rendering
- Data validation is centralized in models

### 🔄 **Maintainability**
- Changes to business logic don't affect UI components
- API changes are isolated to service layer
- Easy to test each layer independently

### 📈 **Scalability**
- New features can be added by extending existing patterns
- Components are reusable across different pages
- Business logic can be shared between components

### 🧪 **Testability**
- Models can be unit tested independently
- Presenters can be tested with mock services
- Components can be tested with mock presenters

### 🔒 **Security**
- Input validation is centralized in models
- Authentication is handled in configuration layer
- Sensitive data handling is isolated to services

## 🛠️ Development Tips

### Testing API Connection
All API calls include automatic logging in development mode. Check browser console for detailed request/response logs.

### Error Handling
The frontend includes comprehensive error handling:
- Automatic token refresh on 401 errors
- Network error recovery
- User-friendly error messages
- x-api-key authentication

### Code Organization
- Use **Models** for data validation
- Use **Presenters** for business logic
- Use **Services** for API calls
- Keep **Views** simple and focused on UI

## 📚 Tech Stack

- **React 18** - Frontend framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **HeroUI** - Modern component library
- **Framer Motion** - Smooth animations
- **Axios** - HTTP client with interceptors
- **React Router** - Client-side navigation

## 🔌 Microservice Integration

This frontend is designed to work with a companion API microservice that handles:
- Project data management
- Contact form submissions
- Email sending
- JWT authentication
- Database operations

### Required Microservice Endpoints:
```
GET  /api/v1/health          # Health check
GET  /api/v1/projects        # Get all projects
GET  /api/v1/projects/:id    # Get project by ID
POST /api/v1/contact         # Send contact message
POST /api/v1/auth/login      # User authentication
POST /api/v1/auth/refresh    # Token refresh
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Follow the MVP architecture patterns
4. Write tests for new functionality
5. Test with your microservice
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

---

## 🚨 Important Notes

- **Frontend Only**: This project requires the companion API microservice
- **No Secrets**: All environment variables are public after build
- **x-api-key**: Ensure your microservice accepts the x-api-key header
- **CORS**: Configure your microservice to allow requests from your frontend domain

**Need help?** Check the console logs - detailed API request/response logging is enabled in development mode.

---

**Eduardo Brito** - Full Stack Developer  
🌐 Professional CV Website with Modern Architecture