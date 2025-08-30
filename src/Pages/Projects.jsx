import { motion } from 'framer-motion'
import Header from '../components/layout/Header.jsx'
import ProjectCard from '../components/ui/ProjectCard.jsx'

export default function Projects() {
    // Project data based on your actual OliviaAIWEB2 work
    const projects = [
        {
            title: 'Olivia AI Platform',
            period: '2022 - 2024',
            status: 'completed',
            icon: 'brain',
            colorClass: 'from-blue-500 to-purple-600',
            description: 'Enterprise-level platform infrastructure built for Olivia AI Network. A comprehensive SaaS solution providing the backend systems, frontend interface, and integrations that enable chatbot services across multiple communication channels.',
            features: [
                'Multi-tenant SaaS architecture with role-based access control',
                'Real-time analytics dashboard with advanced data visualization',
                'Multi-platform integrations (WhatsApp, Facebook, Instagram, Telegram)',
                'Platform management system with conversation interface and controls',
                'Lead generation and tracking with conversion analytics',
                'Staff management and subscription billing system',
                'Webhook support and API key management',
                'Advanced authentication with Supabase integration'
            ],
            technologies: [
                'React', 'JavaScript', 'Node.js', 'Supabase', 'HeroUI', 'Tailwind CSS', 
                'Axios', 'React Router', 'Framer Motion', 'D3.js', 'Recharts', 'Formik'
            ],
            metrics: [
                { value: '15+', label: 'API Services' },
                { value: '25+', label: 'React Pages' },
                { value: '5+', label: 'Platform Integrations' },
                { value: 'Real-time', label: 'Analytics' }
            ],
            liveUrl: '#', // You can add actual URL if available
            githubUrl: '#' // You can add if you want to share code
        },
        {
            title: 'Multi-Channel Chat Integration',
            period: '2023 - 2024',
            status: 'completed',
            icon: 'users',
            colorClass: 'from-green-500 to-teal-600',
            description: 'Advanced integration system connecting AI agents with multiple messaging platforms through unified APIs and real-time synchronization.',
            features: [
                'WhatsApp Business API integration with template management',
                'Facebook Messenger and Instagram DM automation',
                'Telegram bot integration with command handling',
                'Website chat widget with customizable UI',
                'Real-time message synchronization across platforms',
                'Webhook management and event handling',
                'OAuth authentication flow for social platforms'
            ],
            technologies: [
                'React', 'JavaScript', 'REST APIs', 'WebSocket', 'OAuth', 
                'WhatsApp Business API', 'Facebook Graph API', 'Telegram Bot API'
            ],
            metrics: [
                { value: '4+', label: 'Platforms' },
                { value: '100%', label: 'Real-time Sync' },
                { value: 'OAuth', label: 'Secure Auth' },
                { value: 'Webhook', label: 'Event System' }
            ]
        },
        {
            title: 'AI Analytics Dashboard',
            period: '2023 - 2024',
            status: 'completed',
            icon: 'chart',
            colorClass: 'from-orange-500 to-red-600',
            description: 'Comprehensive analytics and metrics dashboard providing real-time insights into AI agent performance, user engagement, and conversion tracking.',
            features: [
                'Real-time metrics with live data visualization',
                'Multi-channel performance tracking and comparison',
                'Lead conversion analytics and funnel analysis',
                'Engagement rate monitoring with trend analysis',
                'Interactive charts and graphs using D3.js and Recharts',
                'Customizable dashboard views per user role',
                'Export functionality for data analysis'
            ],
            technologies: [
                'React', 'D3.js', 'Recharts', 'JavaScript', 'Supabase', 
                'Real-time APIs', 'Data Visualization', 'Chart.js'
            ],
            metrics: [
                { value: '10+', label: 'Chart Types' },
                { value: 'Real-time', label: 'Data Updates' },
                { value: '5+', label: 'Metric Categories' },
                { value: 'Interactive', label: 'Visualizations' }
            ]
        },
        {
            title: 'OliviaAI Crypto Platform & Gaming',
            period: '2023 - 2024',
            status: 'completed',
            icon: 'zap',
            colorClass: 'from-yellow-500 to-orange-600',
            description: 'Comprehensive cryptocurrency/blockchain ecosystem featuring a trading platform with integrated chat interfaces and blockchain gaming application with TON integration.',
            features: [
                'Chat interface platform with text and voice capabilities',
                'TON blockchain integration with TonConnect wallet system',
                'Real-time WebSocket communication for chat and audio',
                'Cryptocurrency portfolio management and trading features',
                'Social sentiment analysis and influencer tracking system',
                'Blockchain gaming with NFT rewards and quest systems',
                'Telegram WebApp integration with platform detection',
                'Multi-partner social media integrations (Twitter, Telegram)',
                'Advanced security with daily rotating API keys',
                'Audio processing infrastructure for real-time voice chat'
            ],
            technologies: [
                'React', 'TON Blockchain', 'TonConnect', 'WebSocket', 'Telegram WebApp',
                'Wavesurfer.js', 'Chart.js', 'D3.js', 'Framer Motion', 'Crypto APIs',
                'Audio Processing', 'NFT Integration', 'HeroUI', 'Tailwind CSS'
            ],
            metrics: [
                { value: '2', label: 'Major Apps' },
                { value: 'Voice+Text', label: 'Chat Platform' },
                { value: 'Real-time', label: 'WebSocket Chat' },
                { value: 'TON', label: 'Blockchain' }
            ]
        },
        {
            title: 'Enterprise Microservices Architecture',
            period: '2022 - 2024',
            status: 'completed',
            icon: 'server',
            colorClass: 'from-slate-500 to-gray-600',
            description: 'Complete enterprise-level microservices ecosystem with API Gateway, 25+ service integrations, multi-platform APIs, and production-scale infrastructure.',
            features: [
                'Enterprise API Gateway with JWT authentication and routing',
                'Node.js microservices with Repository and Service patterns',
                'Multi-platform social media APIs (Facebook, Instagram, Telegram, WhatsApp)',
                'Third-party service integrations with Pinecone vector database',
                'TON blockchain integration and wallet management',
                'Production clustering for high-performance scaling',
                'Comprehensive logging system (25+ service logs)',
                'Supabase database integration with admin operations',
                'Support ticket and subscription management systems',
                'Advanced CORS configuration for multiple environments',
                'Swagger documentation with comprehensive API specs',
                'Stress testing and performance monitoring'
            ],
            technologies: [
                'Node.js', 'Express.js', 'API Gateway', 'Microservices', 'JWT Auth',
                'Supabase', 'Clustering', 'Swagger', 'Repository Pattern', 'Stress Testing',
                'Multi-platform APIs', 'Pinecone', 'TON Blockchain', 'Production Deployment'
            ],
            metrics: [
                { value: '25+', label: 'Microservices' },
                { value: 'Enterprise', label: 'Architecture' },
                { value: 'Production', label: 'Scale' },
                { value: 'Multi-platform', label: 'APIs' }
            ]
        },
        {
            title: 'Personal Full Stack Projects',
            period: '2020 - Present',
            status: 'ongoing',
            icon: 'code',
            colorClass: 'from-purple-500 to-pink-600',
            description: 'Collection of personal projects showcasing full-stack development skills, modern web technologies, and innovative problem-solving approaches.',
            features: [
                'Modern React applications with hooks and context',
                'Node.js backend APIs with Express framework',
                'MongoDB and PostgreSQL database implementations',
                'Authentication and authorization systems',
                'Responsive design with Tailwind CSS',
                'Deployment on Vercel and cloud platforms',
                'Version control with Git and collaborative development'
            ],
            technologies: [
                'React', 'Node.js', 'Python', 'MongoDB', 'PostgreSQL', 
                'Express.js', 'Tailwind CSS', 'Git', 'Vercel'
            ],
            metrics: [
                { value: '15+', label: 'Projects Built' },
                { value: '4+', label: 'Languages Used' },
                { value: '8+', label: 'Frameworks' },
                { value: '24/7', label: 'Learning' }
            ]
        }
    ]

    const fadeInUp = {
        initial: { opacity: 0, y: 60 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 }
    }

    const staggerContainer = {
        animate: {
            transition: {
                staggerChildren: 0.1
            }
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
            <Header />
            
            {/* Hero Section */}
            <section className="pt-24 pb-12 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.h1 
                        {...fadeInUp}
                        className="text-4xl md:text-6xl font-bold text-slate-800 dark:text-white mb-4"
                    >
                        My Projects
                    </motion.h1>
                    
                    <motion.p 
                        {...fadeInUp}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed"
                    >
                        A showcase of enterprise-level applications, AI integrations, and full-stack solutions 
                        I've architected and developed at Olivia AI Network and as personal projects.
                    </motion.p>
                </div>
            </section>

            {/* Projects Grid */}
            <section className="pb-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <motion.div 
                        variants={staggerContainer}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        className="grid lg:grid-cols-2 gap-8"
                    >
                        {projects.map((project, index) => (
                            <ProjectCard 
                                key={project.title}
                                project={project}
                                index={index}
                            />
                        ))}
                    </motion.div>
                </div>
            </section>
        </div>
    )
}
