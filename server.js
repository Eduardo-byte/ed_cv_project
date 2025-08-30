import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { createProxyMiddleware } from 'http-proxy-middleware';

// Load environment variables (email credentials, etc.)
dotenv.config();

// ES module compatibility for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001; // Main server port (frontend + contact API)

// Enable CORS for all origins (frontend can call API)
app.use(cors());
// Parse JSON request bodies from contact form
app.use(express.json());

// Serve React static files in production
if (process.env.VITE_NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'dist')));
}

// Create email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.VITE_EMAIL_USER,
    pass: process.env.VITE_EMAIL_PASS
  }
});

app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ 
        success: false, 
        error: 'Name, email, and message are required' 
      });
    }

    const mailOptions = {
      from: process.env.VITE_EMAIL_USER,
      to: 'edbrito.luis@gmail.com',
      subject: subject || 'New Contact Form Message',
      html: `
        <h2>New Contact Form Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject || 'No subject'}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
      replyTo: email
    };

    const info = await transporter.sendMail(mailOptions);
    
    res.json({ 
      success: true, 
      message: 'Email sent successfully!',
      messageId: info.messageId 
    });

  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to send email' 
    });
  }
});

// In production, proxy /api/projects/* requests to internal API server (port 3002)
// This allows frontend to call same domain for both contact form and projects data
if (process.env.NODE_ENV === 'production') {
  app.use('/api/projects', createProxyMiddleware({
    //target: 'http://localhost:3002', // Internal API server (same Render instance)
    target: 'https://ed-cv-project.onrender.com', // Internal API server (same Render instance)
    changeOrigin: true,
    pathRewrite: {
      '^/api/projects': '/api' // Remove /projects from path before forwarding
    }
  }));
}

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'CV server with email working',
    timestamp: new Date().toISOString()
  });
});

// Serve React app - specific routes to avoid path-to-regexp issues
if (process.env.VITE_NODE_ENV === 'production') {
  // Serve index.html for React Router routes
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
  
  app.get('/projects', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
  
  app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
} else {
  // Development info page
  app.get('/', (req, res) => {
    res.send(`
      <h1>🚀 CV Server Running!</h1>
      <p><strong>Backend API:</strong> localhost:${PORT}</p>
      <p><strong>React Frontend:</strong> <a href="http://localhost:5173">localhost:5173</a> (run separately)</p>
      <hr>
      <p>📧 <a href="/api/health">API Health Check</a></p>
      <p>💬 POST /api/contact - Contact Form</p>
    `);
  });
}

app.listen(PORT, () => {
  console.log(`🚀 CV Server running on localhost:${PORT}`);
  console.log(`📧 Contact API: localhost:${PORT}/api/contact`);
  
  if (process.env.VITE_NODE_ENV === 'production') {
    console.log(`🌐 Frontend: localhost:${PORT} (serving React build)`);
  } else {
    console.log(`⚛️  Frontend: Run 'npm run dev' for React dev server`);
    console.log(`🔗 Full dev: Run 'npm run dev:full' for both together`);
  }
});

export default app;