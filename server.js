import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { createClient } from '@supabase/supabase-js';

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

// Initialize Supabase client for projects data
const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

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

// Projects API endpoints - handle directly in main server (no proxy needed)
app.get('/api/projects', async (req, res) => {
  try {
    console.log('🚀 Fetching projects from Supabase...');
    
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('❌ Supabase error:', error);
      return res.status(500).json({ 
        success: false, 
        error: 'Database query failed',
        message: error.message 
      });
    }

    console.log(`✅ Found ${data?.length || 0} projects`);
    
    res.json({ 
      success: true, 
      data: data || [],
      count: data?.length || 0,
      metadata: {
        executionTime: '< 1s',
        resultsCount: data?.length || 0
      }
    });

  } catch (error) {
    console.error('💥 Server error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Internal server error',
      message: error.message 
    });
  }
});

// Projects stats endpoint
app.get('/api/projects/stats', async (req, res) => {
  try {
    console.log('📊 Fetching project stats...');
    
    const { data, error } = await supabase
      .from('projects')
      .select('status, project_type, is_featured');

    if (error) {
      console.error('❌ Supabase stats error:', error);
      return res.status(500).json({ 
        success: false, 
        error: 'Database query failed',
        message: error.message 
      });
    }

    const stats = {
      total: data?.length || 0,
      completed: data?.filter(p => p.status === 'completed').length || 0,
      inProgress: data?.filter(p => p.status === 'in_progress').length || 0,
      featured: data?.filter(p => p.is_featured).length || 0,
      company: data?.filter(p => p.project_type === 'company').length || 0,
      personal: data?.filter(p => p.project_type === 'personal').length || 0
    };

    console.log('📈 Stats calculated:', stats);
    
    res.json({ 
      success: true, 
      data: stats
    });

  } catch (error) {
    console.error('💥 Stats server error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Internal server error',
      message: error.message 
    });
  }
});

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