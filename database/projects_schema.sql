-- Projects Database Schema for CV Website
-- This demonstrates full-stack architecture with database integration

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    project_type VARCHAR(50) NOT NULL CHECK (project_type IN ('company', 'personal', 'freelance')),
    status VARCHAR(20) NOT NULL DEFAULT 'completed' CHECK (status IN ('completed', 'in_progress', 'planned', 'archived')),
    technologies JSONB NOT NULL DEFAULT '[]',
    features JSONB NOT NULL DEFAULT '[]',
    metrics JSONB NOT NULL DEFAULT '{}',
    start_date DATE,
    end_date DATE,
    github_url VARCHAR(500),
    live_url VARCHAR(500),
    image_url VARCHAR(500),
    priority INTEGER DEFAULT 0,
    is_featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger
CREATE TRIGGER update_projects_updated_at 
    BEFORE UPDATE ON projects 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_projects_type ON projects(project_type);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_featured ON projects(is_featured);
CREATE INDEX idx_projects_created_at ON projects(created_at DESC);

-- Insert seed data (your actual projects)
INSERT INTO projects (
    title, 
    description, 
    project_type, 
    status, 
    technologies, 
    features, 
    metrics, 
    start_date, 
    end_date, 
    is_featured,
    priority
) VALUES 
(
    'Olivia AI Platform Infrastructure',
    'Enterprise-level platform infrastructure built for Olivia AI Network. A comprehensive SaaS solution providing the backend systems, frontend interface, and integrations that enable chatbot services across multiple communication channels.',
    'company',
    'completed',
    '["React", "JavaScript", "Node.js", "Supabase", "HeroUI", "Tailwind CSS", "Axios", "React Router", "Framer Motion", "D3.js", "Recharts", "Formik"]'::jsonb,
    '["Multi-tenant SaaS architecture with role-based access control", "Real-time analytics dashboard with advanced data visualization", "Multi-platform integrations (WhatsApp, Facebook, Instagram, Telegram)", "Platform management system with conversation interface and controls", "Lead generation and tracking with conversion analytics", "Staff management and subscription billing system", "Webhook support and API key management", "Advanced authentication with Supabase integration"]'::jsonb,
    '{"services": "15+", "pages": "25+", "integrations": "5+", "analytics": "Real-time"}'::jsonb,
    '2022-01-01',
    '2024-12-01',
    true,
    1
),
(
    'OliviaAI Crypto Platform & Gaming',
    'Comprehensive cryptocurrency/blockchain ecosystem featuring a trading platform with integrated chat interfaces and blockchain gaming application with TON integration.',
    'company',
    'completed',
    '["React", "TON Blockchain", "TonConnect", "WebSocket", "Telegram WebApp", "Wavesurfer.js", "Chart.js", "D3.js", "Framer Motion", "Crypto APIs", "Audio Processing", "NFT Integration", "HeroUI", "Tailwind CSS"]'::jsonb,
    '["Chat interface platform with text and voice capabilities", "TON blockchain integration with TonConnect wallet system", "Real-time WebSocket communication for chat and audio", "Cryptocurrency portfolio management and trading features", "Social sentiment analysis and influencer tracking system", "Blockchain gaming with NFT rewards and quest systems", "Telegram WebApp integration with platform detection", "Multi-partner social media integrations (Twitter, Telegram)", "Advanced security with daily rotating API keys", "Audio processing infrastructure for real-time voice chat"]'::jsonb,
    '{"apps": "2", "platform": "Voice+Text", "chat": "Real-time", "blockchain": "TON"}'::jsonb,
    '2023-01-01',
    '2024-12-01',
    true,
    2
),
(
    'Enterprise Microservices Architecture',
    'Complete enterprise-level microservices ecosystem with API Gateway, 25+ service integrations, multi-platform APIs, and production-scale infrastructure.',
    'company',
    'completed',
    '["Node.js", "Express.js", "API Gateway", "Microservices", "JWT Auth", "Supabase", "Clustering", "Swagger", "Repository Pattern", "Stress Testing", "Multi-platform APIs", "Pinecone", "TON Blockchain", "Production Deployment"]'::jsonb,
    '["Enterprise API Gateway with JWT authentication and routing", "Node.js microservices with Repository and Service patterns", "Multi-platform social media APIs (Facebook, Instagram, Telegram, WhatsApp)", "Third-party service integrations with Pinecone vector database", "TON blockchain integration and wallet management", "Production clustering for high-performance scaling", "Comprehensive logging system (25+ service logs)", "Supabase database integration with admin operations", "Support ticket and subscription management systems", "Advanced CORS configuration for multiple environments", "Swagger documentation with comprehensive API specs", "Stress testing and performance monitoring"]'::jsonb,
    '{"microservices": "25+", "architecture": "Enterprise", "scale": "Production", "apis": "Multi-platform"}'::jsonb,
    '2022-06-01',
    '2024-12-01',
    true,
    3
),
(
    'CV Website & Portfolio',
    'Professional CV website built with React and Node.js, featuring PDF generation, contact form integration, and modern responsive design.',
    'personal',
    'completed',
    '["React", "Node.js", "Express", "Nodemailer", "PDF Generation", "Tailwind CSS", "HeroUI", "Framer Motion", "Vite"]'::jsonb,
    '["Responsive design with dark/light mode", "Dynamic PDF CV generation", "Contact form with email integration", "Project showcase with filtering", "Skills visualization", "Modern animations with Framer Motion", "Professional typography and layout"]'::jsonb,
    '{"pages": "2", "components": "15+", "responsive": "Mobile-first", "performance": "Optimized"}'::jsonb,
    '2024-12-01',
    '2024-12-30',
    true,
    4
),
(
    'React Component Library',
    'Reusable UI component library with modern design system, TypeScript support, and comprehensive documentation.',
    'personal',
    'in_progress',
    '["React", "TypeScript", "Storybook", "CSS Modules", "Jest", "React Testing Library"]'::jsonb,
    '["Modular component architecture", "TypeScript definitions", "Comprehensive testing suite", "Interactive documentation", "Accessibility compliance", "Theme customization"]'::jsonb,
    '{"components": "20+", "coverage": "90%+", "documentation": "Complete"}'::jsonb,
    '2024-10-01',
    NULL,
    false,
    5
);

-- Create RLS (Row Level Security) policies if needed
-- ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Grant permissions (adjust as needed for your setup)
-- GRANT ALL ON projects TO authenticated;
-- GRANT SELECT ON projects TO anon;
