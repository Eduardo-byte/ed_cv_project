import { Button, Card, Divider } from '@heroui/react'
import { motion } from 'framer-motion'
import { ChevronDown, Code, Database, Globe, Smartphone, MapPin, Download } from 'lucide-react'
import Header from '../components/layout/Header.jsx'
import SkillCard from '../components/ui/SkillCard.jsx'
import SocialLinks from '../components/ui/SocialLinks.jsx'
import ContactForm from '../components/ui/ContactForm.jsx'
import { APP_INFO, ROUTES } from '../utils/constants.js'
import { downloadGeneratedCV } from '../utils/cvGenerator.js'

export default function Home() {
    // Skills data organized by category
    const skillsData = [
        {
            title: 'Frontend',
            icon: Globe,
            color: 'primary',
            skills: ['React JS', 'JavaScript', 'Tailwind CSS', 'HTML5', 'CSS3', 'Responsive Design']
        },
        {
            title: 'Backend & Architecture',
            icon: Code,
            color: 'success',
            skills: ['Node.js Microservices', 'API Gateway', 'Express.js', 'JWT Auth', 'Repository Pattern', 'Clustering', 'REST APIs']
        },
        {
            title: 'Database',
            icon: Database,
            color: 'warning',
            skills: ['MongoDB', 'PostgreSQL', 'Supabase']
        },
        {
            title: 'Blockchain & Integration',
            icon: Smartphone,
            color: 'secondary',
            skills: ['TON Blockchain', 'TonConnect', 'WebSocket', 'Platform Integration', 'Crypto APIs', 'NFT Integration', 'Telegram WebApp']
        }
    ]

    // Animation variants
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
            {/* Header Navigation */}
            <Header />

            {/* Hero Section */}
            <section id="home" className="min-h-screen flex items-center justify-center px-4 pt-20">
                <div className="text-center max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="mb-8"
                    >
                        <div className="w-32 h-32 rounded-full mx-auto mb-6 shadow-xl overflow-hidden">
                            <img 
                                src="/your_image.jpeg" 
                                alt="Eduardo Brito" 
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </motion.div>
                    
                    <motion.h1 
                        {...fadeInUp}
                        className="text-5xl md:text-7xl font-bold text-slate-800 dark:text-white mb-4"
                    >
                        {APP_INFO.NAME.split(' - ')[0]}
                    </motion.h1>
                    
                    <motion.h2 
                        {...fadeInUp}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="text-2xl md:text-3xl text-blue-600 dark:text-blue-400 mb-6"
                    >
                        Full Stack Developer
                    </motion.h2>
                    
                    <motion.p 
                        {...fadeInUp}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        className="text-lg text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed"
                    >
                        Experienced Software Developer with 5+ years in full-stack development, currently at Olivia Network #AI building enterprise platforms. 
                        Expert in React.js, Python, Node.js, Django, and modern web development. Proven track record across fintech, security, and AI industries.
                    </motion.p>
                    
                    <motion.div 
                        {...fadeInUp}
                        transition={{ delay: 0.6, duration: 0.6 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
                    >
                        <Button 
                            color="primary" 
                            size="lg"
                            className="px-8 py-3 text-lg"
                            onClick={() => window.location.href = ROUTES.PROJECTS}
                        >
                            View Projects
                        </Button>
                        <Button 
                            variant="bordered" 
                            size="lg"
                            className="px-8 py-3 text-lg"
                            onClick={downloadGeneratedCV}
                            startContent={<Download size={20} />}
                        >
                            Download CV
                        </Button>
                    </motion.div>

                    {/* Social Links */}
                    <motion.div
                        {...fadeInUp}
                        transition={{ delay: 0.8, duration: 0.6 }}
                        className="mb-12"
                    >
                        <SocialLinks 
                            layout="horizontal"
                            variant="bordered"
                            size="md"
                            showLabels={false}
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 0.5 }}
                        className="flex items-center justify-center"
                    >
                        <ChevronDown className="text-slate-400 animate-bounce" size={32} />
                    </motion.div>
                </div>
            </section>

            {/* Skills Section */}
            <section id="skills" className="py-20 px-4">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-white mb-4">
                            Skills & Technologies
                        </h2>
                        <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                            A comprehensive toolkit for building modern, scalable applications
                        </p>
                    </motion.div>

                    <motion.div 
                        variants={staggerContainer}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
                    >
                        {skillsData.map((skillCategory, index) => (
                            <SkillCard
                                key={skillCategory.title}
                                title={skillCategory.title}
                                icon={skillCategory.icon}
                                skills={skillCategory.skills}
                                color={skillCategory.color}
                                delay={index * 0.1}
                            />
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="py-20 px-4 bg-slate-50 dark:bg-slate-800/50">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-white mb-4">
                            About Me
                        </h2>
                        <Divider className="max-w-20 mx-auto" />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <Card className="p-8 md:p-12 shadow-lg">
                            <div className="space-y-6 text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                                <p>
                                    I'm a passionate software developer with 5+ years of professional experience, currently working at 
                                    Olivia Network #AI where I build enterprise platform infrastructure. My background spans fintech 
                                    development at Profit Quant, security solutions at WiseGuys Protection Ltd, and various freelance projects.
                                </p>
                                <p>
                                    My expertise includes full-stack web development with React.js, Python, Django, and Node.js. I specialize 
                                    in building scalable applications, microservices architectures, and modern web solutions. I'm passionate 
                                    about continuous learning and staying current with emerging technologies in the software development ecosystem.
                                </p>
                                <p>
                                    As a hobby developer, I continue to explore cutting-edge technologies, build innovative projects, and 
                                    contribute to the open-source community. I'm passionate about creating platform solutions and infrastructure 
                                    that enable exceptional user experiences and cutting-edge applications.
                                </p>
                                <div className="pt-4">
                                    <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                                        <MapPin size={16} />
                                        <span>{APP_INFO.LOCATION}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mt-2">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                        </svg>
                                        <a 
                                            href={APP_INFO.LINKEDIN} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="hover:text-blue-500 transition-colors"
                                        >
                                            LinkedIn Profile
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-20 px-4">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-white mb-4">
                            Let's Connect
                        </h2>
                        <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                            I'm always interested in new opportunities and collaborations. Let's build something amazing together!
                        </p>
                    </motion.div>

                    <div className="grid lg:grid-cols-2 gap-12 items-start">
                        {/* Contact Form */}
                        <ContactForm />

                        {/* Contact Info & Social Links */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="space-y-8"
                        >
                            <Card className="p-6 shadow-md">
                                <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-4">
                                    Let's Connect
                                </h3>
                                <SocialLinks 
                                    layout="vertical"
                                    variant="flat"
                                    size="md"
                                    showLabels={true}
                                />
                            </Card>

                            <Card className="p-6 shadow-md">
                                <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-4">
                                    Quick Info
                                </h3>
                                <div className="space-y-3 text-slate-600 dark:text-slate-300">
                                    <div className="flex items-center gap-2">
                                        <MapPin size={16} />
                                        <span>{APP_INFO.LOCATION}</span>
                                    </div>
                                    <div>
                                        <p className="text-sm">
                                            Available for remote work and interesting projects. 
                                            I respond to messages within 24 hours.
                                        </p>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    )
}
