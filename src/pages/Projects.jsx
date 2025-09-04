// Projects Page - Showcases all projects with API integration
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, Button, Chip, Divider, Select, SelectItem, Spinner } from '@heroui/react';
import { 
    Code, 
    Database, 
    Globe, 
    Brain, 
    Zap, 
    Server,
    Calendar,
    Users,
    BarChart3,
    Github,
    ExternalLink,
    Filter,
    TrendingUp,
    Activity,
    Clock,
    CheckCircle,
    AlertCircle
} from 'lucide-react';
import { toast } from 'sonner';
import Header from '../components/layout/Header.jsx';
import ProjectCard from '../components/ui/ProjectCard.jsx';
import apiProjectService from '../services/apiProjectService.js';

const Projects = () => {
    const [selectedFilter, setSelectedFilter] = useState('all');
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    const [apiCallLogs, setApiCallLogs] = useState([]);

    // Load projects data on component mount
    useEffect(() => {
        loadProjects();
    }, []);

    // Load projects from API
    const loadProjects = async () => {
        setLoading(true);
        try {
            console.log('🚀 Loading projects from API...');
            const response = await apiProjectService.getAllProjects();
            
            if (response?.success && response?.data) {
                setProjects(response.data);
                
                // Add to API call logs for demonstration
                setApiCallLogs(prev => [{
                    id: Date.now(),
                    endpoint: 'GET /api/projects',
                    status: 'success',
                    count: response.data.length,
                    executionTime: response.metadata?.executionTime || 'unknown',
                    timestamp: new Date().toLocaleTimeString()
                }, ...prev.slice(0, 4)]); // Keep last 5 logs

                toast.success(`Loaded ${response.data.length} projects from database`);
            } else {
                throw new Error('Invalid response format');
            }
        } catch (error) {
            console.error('Failed to load projects:', error);
            
            // Add error to API call logs
            setApiCallLogs(prev => [{
                id: Date.now(),
                endpoint: 'GET /api/projects',
                status: 'error',
                error: error.message || 'Unknown error',
                timestamp: new Date().toLocaleTimeString()
            }, ...prev.slice(0, 4)]);

            toast.error('Failed to load projects from database');
            
            // Fallback to empty array
            setProjects([]);
        } finally {
            setLoading(false);
        }
    };



    // Filter projects based on selected filters
    const filteredProjects = projects.filter(project => {
        const typeMatch = selectedFilter === 'all' || project.project_type === selectedFilter || project.title.toLowerCase().includes(selectedFilter.toLowerCase());
        const statusMatch = selectedStatus === 'all' || project.status === selectedStatus;
        return typeMatch && statusMatch;
    });

    // Animation variants
    const fadeInUp = {
        initial: { opacity: 0, y: 60 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 }
    };

    const staggerContainer = {
        animate: {
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const iconMap = {
        brain: Brain,
        zap: Zap,
        server: Server,
        code: Code
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-800">
            <Header />
            
            <div className="pt-20">
                {/* Hero Section */}
                <section className="py-20 px-4">
                    <div className="max-w-7xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h1 className="text-4xl md:text-6xl font-bold mb-6">
                                My{' '}
                                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                    Projects
                                </span>
                            </h1>
                            <p className="text-lg text-slate-600 dark:text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
                                A showcase of enterprise-level applications, microservices architectures, and innovative solutions 
                                I've built throughout my development journey. All projects demonstrate full-stack capabilities and real-world impact.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Projects Section */}
                <section className="pb-20 px-4">
                    <div className="max-w-7xl mx-auto">
                        {/* Filters */}
                        <motion.div
                            {...fadeInUp}
                            transition={{ delay: 0.2, duration: 0.6 }}
                            className="flex flex-col sm:flex-row gap-4 mb-8"
                        >
                            <Select 
                                label="Filter by Type" 
                                placeholder="All Projects"
                                selectedKeys={selectedFilter ? [selectedFilter] : []}
                                onSelectionChange={(keys) => setSelectedFilter(Array.from(keys)[0] || 'all')}
                                className="w-full sm:w-64"
                            >
                                <SelectItem key="all">All Projects</SelectItem>
                                <SelectItem key="company">Company Projects</SelectItem>
                                <SelectItem key="personal">Personal Projects</SelectItem>
                                <SelectItem key="freelance">Freelance Projects</SelectItem>
                            </Select>
                            
                            <Select 
                                label="Filter by Status" 
                                placeholder="All Status"
                                selectedKeys={selectedStatus ? [selectedStatus] : []}
                                onSelectionChange={(keys) => setSelectedStatus(Array.from(keys)[0] || 'all')}
                                className="w-full sm:w-64"
                            >
                                <SelectItem key="all">All Status</SelectItem>
                                <SelectItem key="completed">Completed</SelectItem>
                                <SelectItem key="in_progress">In Progress</SelectItem>
                                <SelectItem key="planned">Planned</SelectItem>
                            </Select>

                            <Button 
                                color="primary" 
                                variant="flat"
                                onPress={loadProjects}
                                startContent={<Activity size={16} />}
                                className="w-full sm:w-auto"
                            >
                                Refresh Data
                            </Button>
                        </motion.div>

                        {/* API Call Logs - Demo Section */}
                        {apiCallLogs.length > 0 && (
                            <motion.div
                                {...fadeInUp}
                                transition={{ delay: 0.3, duration: 0.6 }}
                                className="mb-8"
                            >
                                <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-800">
                                    <div className="flex items-center gap-2 mb-4">
                                        <Activity className="text-blue-600" size={20} />
                                        <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100">
                                            Live API Integration Demo
                                        </h3>
                                    </div>
                                    <p className="text-sm text-blue-700 dark:text-blue-300 mb-4">
                                        Real-time API calls to Node.js microservice → Supabase database integration
                                    </p>
                                    
                                    <div className="space-y-2">
                                        {apiCallLogs.map((log) => (
                                            <div key={log.id} className="flex items-center gap-3 p-3 bg-white/60 dark:bg-black/20 rounded-lg">
                                                {log.status === 'success' ? (
                                                    <CheckCircle className="text-green-600" size={16} />
                                                ) : (
                                                    <AlertCircle className="text-red-600" size={16} />
                                                )}
                                                <code className="text-sm font-mono text-slate-700 dark:text-slate-300">
                                                    {log.endpoint}
                                                </code>
                                                <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                                                    <Clock size={12} />
                                                    {log.executionTime && `${log.executionTime} •`} {log.timestamp}
                                                </div>
                                                {log.count && (
                                                    <Chip size="sm" color="success" variant="flat">
                                                        {log.count} records
                                                    </Chip>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </Card>
                            </motion.div>
                        )}

                        {/* Statistics Cards */}


                        {/* Loading State */}
                        {loading && (
                            <div className="flex items-center justify-center py-20">
                                <div className="text-center">
                                    <Spinner size="lg" color="primary" />
                                    <p className="mt-4 text-slate-600 dark:text-slate-400">
                                        Loading projects from database...
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Projects Grid */}
                        {!loading && (
                            <motion.div 
                                variants={staggerContainer}
                                initial="initial"
                                animate="animate"
                                className="grid grid-cols-1 lg:grid-cols-2 gap-8"
                            >
                                {filteredProjects.length > 0 ? (
                                    filteredProjects.map((project) => (
                                        <ProjectCard key={project.id} project={project} />
                                    ))
                                ) : (
                                    <div className="col-span-full text-center py-20">
                                        <div className="text-6xl mb-4">📁</div>
                                        <h3 className="text-xl font-semibold mb-2">No Projects Found</h3>
                                        <p className="text-slate-600 dark:text-slate-400 mb-4">
                                            No projects match the current filters.
                                        </p>
                                        <Button 
                                            color="primary" 
                                            variant="flat"
                                            onPress={() => {
                                                setSelectedFilter('all');
                                                setSelectedStatus('all');
                                            }}
                                        >
                                            Clear Filters
                                        </Button>
                                    </div>
                                )}
                            </motion.div>
                        )}

                        {/* Development Journey */}
                        {false && (
                            <motion.div
                                {...fadeInUp}
                                transition={{ delay: 0.6, duration: 0.6 }}
                                className="mt-20"
                            >
                                <Card className="p-8 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900">
                                    <h3 className="text-2xl font-bold mb-6 text-center">
                                        Development Journey
                                    </h3>
                                    
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                        <div className="text-center">
                                            <div className="text-3xl font-bold text-blue-600 mb-2">
                                                0
                                            </div>
                                            <div className="text-sm text-slate-600 dark:text-slate-400">Total Projects</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-3xl font-bold text-green-600 mb-2">15+</div>
                                            <div className="text-sm text-slate-600 dark:text-slate-400">Technologies</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-3xl font-bold text-purple-600 mb-2">2+</div>
                                            <div className="text-sm text-slate-600 dark:text-slate-400">Years Experience</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-3xl font-bold text-orange-600 mb-2">
                                                0
                                            </div>
                                            <div className="text-sm text-slate-600 dark:text-slate-400">Completed</div>
                                        </div>
                                    </div>

                                    <Divider className="my-6" />
                                    
                                    <div className="text-center">
                                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                                            🚀 Projects loaded from microservice API → Supabase database integration
                                        </p>
                                        <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
                                            <Database size={14} />
                                            <span>Supabase PostgreSQL</span>
                                            <span>→</span>
                                            <Server size={14} />
                                            <span>Node.js API</span>
                                            <span>→</span>
                                            <Globe size={14} />
                                            <span>React Frontend</span>
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Projects;