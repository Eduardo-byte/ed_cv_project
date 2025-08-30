// Simple CV Projects API - NO path-to-regexp issues
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3002;

// Supabase setup
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Simple middleware
app.use(express.json());
app.use(cors());

// Simple logging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Simple CV Projects API running',
    timestamp: new Date().toISOString()
  });
});

// Get all projects
app.get('/api/projects', async (req, res) => {
  try {
    console.log('Fetching projects from Supabase...');
    
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({ 
        success: false, 
        error: 'Database query failed',
        message: error.message 
      });
    }

    console.log(`Found ${data?.length || 0} projects`);
    
    res.json({ 
      success: true, 
      data: data || [],
      count: data?.length || 0
    });

  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Internal server error',
      message: error.message 
    });
  }
});

// Get project stats
app.get('/api/projects/stats', async (req, res) => {
  try {
    console.log('Fetching project stats...');
    
    const { data, error } = await supabase
      .from('projects')
      .select('status, project_type, is_featured');

    if (error) {
      console.error('Supabase stats error:', error);
      return res.status(500).json({ 
        success: false, 
        error: 'Database query failed',
        message: error.message 
      });
    }

    // Simple stats calculation
    const stats = {
      total: data?.length || 0,
      completed: data?.filter(p => p.status === 'completed').length || 0,
      inProgress: data?.filter(p => p.status === 'in_progress').length || 0,
      featured: data?.filter(p => p.is_featured).length || 0,
      company: data?.filter(p => p.project_type === 'company').length || 0,
      personal: data?.filter(p => p.project_type === 'personal').length || 0
    };

    console.log('Stats calculated:', stats);
    
    res.json({ 
      success: true, 
      data: stats
    });

  } catch (error) {
    console.error('Stats server error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Internal server error',
      message: error.message 
    });
  }
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ 
    success: false, 
    error: 'Internal server error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    success: false, 
    error: 'Route not found',
    path: req.originalUrl 
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Simple CV Projects API running on port ${PORT}`);
  console.log(`📊 Health: http://localhost:${PORT}/api/health`);
  console.log(`📋 Projects: http://localhost:${PORT}/api/projects`);
  console.log(`📈 Stats: http://localhost:${PORT}/api/projects/stats`);
  
  if (SUPABASE_URL && SUPABASE_ANON_KEY) {
    console.log('✅ Supabase configured');
  } else {
    console.log('❌ Supabase credentials missing');
  }
});

export default app;
