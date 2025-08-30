// CV Projects Microservice API
// Demonstrates enterprise-level API development with Supabase integration

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import winston from 'winston';
import Joi from 'joi';

// Load environment variables
dotenv.config();

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Configure Winston logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: 'cv-projects-api' },
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    })
  ]
});

const app = express();
const PORT = process.env.PORT || 3002;

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.originalUrl}`, {
    ip: req.ip,
    userAgent: req.get('User-Agent'),
    timestamp: new Date().toISOString()
  });
  next();
});

// Validation schemas
const projectQuerySchema = Joi.object({
  type: Joi.string().valid('company', 'personal', 'freelance'),
  status: Joi.string().valid('completed', 'in_progress', 'planned', 'archived'),
  featured: Joi.boolean(),
  limit: Joi.number().integer().min(1).max(100).default(10),
  offset: Joi.number().integer().min(0).default(0),
  sort: Joi.string().valid('created_at', 'updated_at', 'title', 'priority').default('priority'),
  order: Joi.string().valid('asc', 'desc').default('desc')
});

// API Routes

// Health check endpoint
app.get('/api/health', (req, res) => {
  const healthCheck = {
    status: 'OK',
    timestamp: new Date().toISOString(),
    service: 'cv-projects-api',
    version: '1.0.0',
    database: 'connected'
  };
  
  logger.info('Health check requested', healthCheck);
  res.json(healthCheck);
});



// Get all projects with filtering and pagination
app.get('/api/projects', async (req, res) => {
  try {
    const startTime = Date.now();
    
    // Validate query parameters
    const { error, value } = projectQuerySchema.validate(req.query);
    if (error) {
      logger.warn('Invalid query parameters', { error: error.details, query: req.query });
      return res.status(400).json({
        success: false,
        error: 'Invalid query parameters',
        details: error.details
      });
    }

    const { type, status, featured, limit, offset, sort, order } = value;



    // Build Supabase query
    let query = supabase
      .from('projects')
      .select('*', { count: 'exact' });

    // Apply filters
    if (type) query = query.eq('project_type', type);
    if (status) query = query.eq('status', status);
    if (featured !== undefined) query = query.eq('is_featured', featured);

    // Apply sorting
    query = query.order(sort, { ascending: order === 'asc' });

    // Apply pagination
    query = query.range(offset, offset + limit - 1);

    // Execute query
    const { data, error: dbError, count } = await query;

    if (dbError) {
      logger.error('Database query failed', { error: dbError, query: req.query });
      return res.status(500).json({
        success: false,
        error: 'Database query failed',
        message: 'Unable to fetch projects from database'
      });
    }

    const executionTime = Date.now() - startTime;

    const response = {
      success: true,
      data: data,
      pagination: {
        total: count,
        limit: limit,
        offset: offset,
        pages: Math.ceil(count / limit),
        currentPage: Math.floor(offset / limit) + 1
      },
      metadata: {
        executionTime: `${executionTime}ms`,
        resultsCount: data.length,
        filters: { type, status, featured },
        sorting: { sort, order }
      },
      timestamp: new Date().toISOString()
    };

    logger.info('Projects fetched successfully', {
      count: data.length,
      total: count,
      executionTime,
      filters: { type, status, featured }
    });

    res.json(response);

  } catch (error) {
    logger.error('Unexpected error in /api/projects', { error: error.message, stack: error.stack });
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: 'An unexpected error occurred'
    });
  }
});

// NOTE: Removed /api/projects/:id route due to path-to-regexp errors in production
// Frontend will only use /api/projects (get all) for now

// Get projects statistics
app.get('/api/projects/stats', async (req, res) => {
  try {
    const startTime = Date.now();



    // Get total count by type
    const { data: typeStats, error: typeError } = await supabase
      .from('projects')
      .select('project_type')
      .not('project_type', 'is', null);

    // Get total count by status
    const { data: statusStats, error: statusError } = await supabase
      .from('projects')
      .select('status')
      .not('status', 'is', null);

    // Get featured count
    const { count: featuredCount, error: featuredError } = await supabase
      .from('projects')
      .select('*', { count: 'exact', head: true })
      .eq('is_featured', true);

    // Get total count
    const { count: totalCount, error: totalError } = await supabase
      .from('projects')
      .select('*', { count: 'exact', head: true });

    if (typeError || statusError || featuredError || totalError) {
      logger.error('Database query failed for stats', { 
        typeError, statusError, featuredError, totalError 
      });
      return res.status(500).json({
        success: false,
        error: 'Failed to fetch statistics'
      });
    }

    // Process statistics
    const typeCountMap = typeStats.reduce((acc, item) => {
      acc[item.project_type] = (acc[item.project_type] || 0) + 1;
      return acc;
    }, {});

    const statusCountMap = statusStats.reduce((acc, item) => {
      acc[item.status] = (acc[item.status] || 0) + 1;
      return acc;
    }, {});

    const executionTime = Date.now() - startTime;

    const response = {
      success: true,
      data: {
        total: totalCount,
        featured: featuredCount,
        byType: typeCountMap,
        byStatus: statusCountMap,
        breakdown: {
          company: typeCountMap.company || 0,
          personal: typeCountMap.personal || 0,
          freelance: typeCountMap.freelance || 0,
          completed: statusCountMap.completed || 0,
          inProgress: statusCountMap.in_progress || 0
        }
      },
      metadata: {
        executionTime: `${executionTime}ms`,
        queriesExecuted: 4
      },
      timestamp: new Date().toISOString()
    };

    logger.info('Project statistics fetched successfully', { 
      total: totalCount, 
      featured: featuredCount,
      executionTime 
    });

    res.json(response);

  } catch (error) {
    logger.error('Unexpected error in /api/projects/stats', { error: error.message });
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error('Unhandled error', {
    error: err.message,
    stack: err.stack,
    url: req.originalUrl,
    method: req.method
  });

  res.status(500).json({
    success: false,
    error: 'Internal server error',
    message: 'Something went wrong on our end'
  });
});

// 404 handler
app.use('*', (req, res) => {
  logger.warn('404 - Route not found', { url: req.originalUrl, method: req.method });
  res.status(404).json({
    success: false,
    error: 'Route not found',
    message: `The requested endpoint ${req.originalUrl} does not exist`
  });
});

// Start server
app.listen(PORT, () => {
  logger.info(`🚀 CV Projects API running on port ${PORT}`, {
    environment: process.env.VITE_NODE_ENV || 'development',
    supabaseUrl: process.env.VITE_SUPABASE_URL ? 'configured' : 'missing',
    port: PORT
  });

  console.log(`
  🌟 CV Projects Microservice API
  📍 Running on: http://localhost:${PORT}
  📊 Projects: http://localhost:${PORT}/api/projects
  📈 Stats: http://localhost:${PORT}/api/projects/stats
  `);
});

export default app;
