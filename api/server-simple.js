import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3002; // Default to 3002 for development

// Initialize Supabase client with credentials from environment
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Parse JSON request bodies (for POST requests)
app.use(express.json());

// Enable CORS for all routes (allows frontend to call API)
app.use(cors());

// Log all incoming requests with timestamp for debugging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Health check endpoint - used by monitoring services and frontend
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Simple CV Projects API running',
    timestamp: new Date().toISOString()
  });
});

// Main endpoint to fetch all projects for the CV website
app.get('/api/projects', async (req, res) => {
  try {
    console.log('Fetching projects from Supabase...');
    
    // Query Supabase projects table, ordered by creation date (newest first)
    const { data, error } = await supabase
      .from('projects')
      .select('*') // Get all columns
      .order('created_at', { ascending: false }); // Newest projects first

    // Handle database errors (connection issues, table doesn't exist, etc.)
    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({ 
        success: false, 
        error: 'Database query failed',
        message: error.message 
      });
    }

    console.log(`Found ${data?.length || 0} projects`);
    
    // Return standardized response format for frontend
    res.json({ 
      success: true, 
      data: data || [], // Fallback to empty array if no data
      count: data?.length || 0
    });

  } catch (error) {
    // Catch any unexpected server errors (network issues, etc.)
    console.error('Server error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Internal server error',
      message: error.message 
    });
  }
});

// Statistics endpoint for dashboard/analytics on projects page
app.get('/api/projects/stats', async (req, res) => {
  try {
    console.log('Fetching project stats...');
    
    // Only fetch the columns we need for statistics (more efficient)
    const { data, error } = await supabase
      .from('projects')
      .select('status, project_type, is_featured');

    // Handle database connection or query errors
    if (error) {
      console.error('Supabase stats error:', error);
      return res.status(500).json({ 
        success: false, 
        error: 'Database query failed',
        message: error.message 
      });
    }

    // Calculate various statistics by filtering the data array
    const stats = {
      total: data?.length || 0, // Total number of projects
      completed: data?.filter(p => p.status === 'completed').length || 0, // Finished projects
      inProgress: data?.filter(p => p.status === 'in_progress').length || 0, // Current work
      featured: data?.filter(p => p.is_featured).length || 0, // Highlighted projects
      company: data?.filter(p => p.project_type === 'company').length || 0, // Work projects
      personal: data?.filter(p => p.project_type === 'personal').length || 0 // Side projects
    };

    console.log('Stats calculated:', stats);
    
    // Return stats in consistent format for frontend charts/displays
    res.json({ 
      success: true, 
      data: stats
    });

  } catch (error) {
    // Handle any unexpected errors in stats calculation
    console.error('Stats server error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Internal server error',
      message: error.message 
    });
  }
});

// Global error handler for any uncaught errors in route handlers
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ 
    success: false, 
    error: 'Internal server error'
  });
});

// Catch-all handler for undefined routes (must be last)
app.use('*', (req, res) => {
  res.status(404).json({ 
    success: false, 
    error: 'Route not found',
    path: req.originalUrl 
  });
});

// Start the server and display useful information
app.listen(PORT, () => {
  console.log(`🚀 Simple CV Projects API running on port ${PORT}`);
  console.log(`📊 Health: http://localhost:${PORT}/api/health`);
  console.log(`📋 Projects: http://localhost:${PORT}/api/projects`);
  console.log(`📈 Stats: http://localhost:${PORT}/api/projects/stats`);
  
  // Check if Supabase credentials are properly configured
  if (SUPABASE_URL && SUPABASE_ANON_KEY) {
    console.log('✅ Supabase configured');
  } else {
    console.log('❌ Supabase credentials missing - check .env file');
  }
});

export default app;
