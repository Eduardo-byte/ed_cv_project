# CV Project - React Frontend

A modern React.js frontend for Eduardo Brito's CV website. This project connects to an external API microservice for projects and contact functionality.

## 🏗️ Architecture

This is the **frontend-only** portion of a microservices architecture:

```
Frontend (React) ──→ External API Microservice
    Port 5173              Port 3001
```

## 🚀 Getting Started

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

The frontend will automatically connect to your API microservice at `http://localhost:3001/api/v1`

## 📋 Available Scripts

- `npm run dev` - Start development server (port 5173)
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 🔧 Configuration

### API Connection
The frontend is configured to connect to your external microservice:

- **Development**: `http://localhost:3001/api/v1`
- **Production**: `/api/v1` (via reverse proxy)

### Environment Variables
Create a `.env` file based on `.env.example`:
```bash
# Copy the example file
cp .env.example .env

# Edit with your values
nano .env
```

**Required Environment Variables:**
```env
# API Configuration
VITE_API_BASE_URL_DEV="http://localhost:3001"    # Your microservice URL
VITE_API_BASE_URL_PROD="/api"                    # Production proxy path
VITE_API_VERSION="v1"                            # API version

# Application Settings
VITE_APP_NAME="Eduardo Brito CV"
VITE_DEBUG_MODE=true                             # Enable dev logging

# Contact Form Settings  
VITE_CONTACT_MAX_MESSAGE_LENGTH=5000
VITE_CONTACT_MIN_MESSAGE_LENGTH=10
```

## 🎯 Features

### 🔐 Authentication Ready
- JWT token management with automatic refresh
- Login/logout functionality
- Token storage in localStorage/sessionStorage

### 📊 API Integration
- **Projects**: Fetches from `/api/v1/projects`
- **Contact**: Posts to `/api/v1/contact` 
- **Health**: Monitors microservice at `/api/v1/health`

### 🎨 UI Components
- Modern responsive design with Tailwind CSS
- HeroUI component library
- Framer Motion animations
- PDF generation capabilities

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── layout/         # Layout components
│   └── ui/            # UI components
├── config/            # Configuration files
│   ├── endpoints.js   # API endpoint definitions
│   └── apiGatewayAxiosInstance.js  # Axios setup with JWT
├── services/          # API service classes
│   ├── apiProjectService.js
│   └── contactService.js
├── Pages/             # React Router pages
├── utils/             # Utility functions
└── hooks/             # Custom React hooks
```

## 🔌 API Service Usage

### Projects
```javascript
import apiProjectService from './services/apiProjectService.js';

// Get all projects
const projects = await apiProjectService.getAllProjects();

// Get featured projects
const featured = await apiProjectService.getFeaturedProjects();
```

### Contact Form
```javascript
import { contactService } from './services/contactService.js';

// Send contact message
const result = await contactService.sendMessage({
  name: 'John Doe',
  email: 'john@example.com',
  subject: 'Hello',
  message: 'Your message here'
});
```

### Authentication
```javascript
import { authHelpers } from './config/apiGatewayAxiosInstance.js';

// Login
await authHelpers.login({ email, password, remember: true });

// Check auth status
if (authHelpers.isAuthenticated()) {
  const user = authHelpers.getCurrentUser();
}

// Logout
await authHelpers.logout();
```

## 🌐 Production Deployment

### Build
```bash
npm run build
```

### Reverse Proxy Setup (Nginx)
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
    }
}
```

## 🔧 Development Tips

### Testing API Connection
All API calls include automatic logging in development mode. Check your browser console for detailed request/response logs.

### Error Handling
The frontend includes comprehensive error handling:
- Automatic token refresh on 401 errors
- Network error recovery
- User-friendly error messages

## 📚 Tech Stack

- **React 18** - Frontend framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **HeroUI** - Component library
- **Framer Motion** - Animations
- **Axios** - HTTP client
- **React Router** - Navigation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test with your microservice
5. Submit a pull request

---

**Note**: This frontend requires the companion API microservice to be running on port 3001 for full functionality.