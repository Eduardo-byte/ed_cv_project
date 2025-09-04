# Configuration Guide

## Environment-Based Configuration

Your CV frontend is now **100% configurable** through environment variables. No hardcoded values remain in the code.

## Required Environment Variables

### API Configuration
```env
# Microservice URLs
VITE_API_BASE_URL_DEV="http://localhost:3001"    # Development API URL
VITE_API_BASE_URL_PROD="/api"                    # Production API path  
VITE_API_VERSION="v1"                            # API version
VITE_API_TIMEOUT=10000                           # Request timeout (ms)
VITE_API_KEY="your-frontend-api-key-here"        # API key for x-api-key header
```

### Authentication 
```env
# JWT Token Storage Keys
VITE_AUTH_TOKEN_KEY="cv_api_token"               # LocalStorage key
VITE_AUTH_SESSION_KEY="cv_api_session"           # SessionStorage key
```

### Contact Form
```env
# Contact Form Settings
VITE_CONTACT_PLACEHOLDER_EMAIL="your.email@domain.com"
VITE_CONTACT_MAX_MESSAGE_LENGTH=5000
VITE_CONTACT_MIN_MESSAGE_LENGTH=10
```

### Spam Detection
```env
# Anti-Spam Settings
VITE_SPAM_MAX_LINKS=3                            # Max URLs in message
VITE_SPAM_MAX_CAPS_LENGTH=50                     # Max caps text length
```

### Application Info
```env
# App Metadata
VITE_APP_NAME="Eduardo Brito CV"
VITE_APP_VERSION="1.0.0"
VITE_APP_DESCRIPTION="Professional CV Website"
VITE_DOMAIN="yourdomain.com"
```

### Development
```env
# Development Settings
VITE_DEBUG_MODE=true                             # Enable console logging
VITE_LOG_LEVEL="info"                            # Log level
```

## Setup Instructions

1. **Copy Environment Template**
   ```bash
   cp .env.example .env
   ```

2. **Configure Your Values**
   ```bash
   # Edit the .env file
   nano .env
   
   # Set your microservice URL
   VITE_API_BASE_URL_DEV="http://your-api-host:3001"
   ```

3. **Verify Configuration**
   ```bash
   npm run dev
   # Check browser console for API connection logs
   ```

## Configuration Usage in Code

### Accessing Environment Variables
```javascript
// Direct access
const apiUrl = import.meta.env.VITE_API_BASE_URL_DEV;

// With fallback defaults
const timeout = parseInt(import.meta.env.VITE_API_TIMEOUT) || 10000;
```

### Using App Config Helper
```javascript
import { APP_CONFIG, API_CONFIG } from './src/config/appConfig.js';

console.log(APP_CONFIG.name);        // "Eduardo Brito CV"
console.log(API_CONFIG.timeout);     // 10000
```

## Production Deployment

### Build-Time Variables
All `VITE_*` variables are embedded at build time:

```bash
# Build with production variables
VITE_API_BASE_URL_PROD="/api" npm run build
```

### Docker Environment
```dockerfile
# Set environment variables in container
ENV VITE_API_BASE_URL_DEV="http://api-service:3001"
ENV VITE_API_BASE_URL_PROD="/api"
ENV VITE_DEBUG_MODE=false

# Build the application
RUN npm run build
```

### Kubernetes ConfigMap
```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: cv-frontend-config
data:
  VITE_API_BASE_URL_PROD: "/api"
  VITE_APP_NAME: "Eduardo Brito CV"
  VITE_DEBUG_MODE: "false"
```

## Environment-Specific Configurations

### Development
```env
VITE_API_BASE_URL_DEV="http://localhost:3001"
VITE_DEBUG_MODE=true
VITE_LOG_LEVEL="debug"
```

### Staging  
```env
VITE_API_BASE_URL_DEV="https://api-staging.yourdomain.com"
VITE_DEBUG_MODE=true
VITE_LOG_LEVEL="info"
```

### Production
```env
VITE_API_BASE_URL_PROD="/api"
VITE_DEBUG_MODE=false
VITE_LOG_LEVEL="error"
```

## Security Notes

- ✅ **Frontend env vars are PUBLIC** - Never put secrets in `VITE_*` variables
- ✅ **API secrets go in your microservice** - Keep JWT secrets, API keys server-side
- ✅ **Use HTTPS in production** - All production URLs should use secure protocols
- ✅ **Validate all inputs** - Environment-based validation is implemented

## Troubleshooting

### API Connection Issues
```bash
# Check if environment variables are loaded
console.log(import.meta.env.VITE_API_BASE_URL_DEV)

# Test API connectivity
curl http://localhost:3001/api/v1/health
```

### Build Issues
```bash
# Verify all required VITE_ variables are set
env | grep VITE_

# Check build output for embedded values
grep -r "VITE_" dist/
```

Your frontend is now **fully configurable** and ready for any deployment environment! 🎉
