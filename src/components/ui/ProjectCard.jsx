import { Card, CardBody, CardHeader, Chip, Button, Link } from '@heroui/react'
import { motion } from 'framer-motion'
import { Github, ExternalLink, Code, Database, Brain, Users, BarChart3, Zap } from 'lucide-react'

const ProjectCard = ({ 
  project, 
  index = 0 
}) => {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay: index * 0.1 }
  }

  const iconMap = {
    'brain': Brain,
    'users': Users,
    'chart': BarChart3,
    'code': Code,
    'database': Database,
    'zap': Zap
  }

  const ProjectIcon = iconMap[project.icon] || Code

  return (
    <motion.div
      {...fadeInUp}
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
    >
      <Card className="h-full shadow-md hover:shadow-xl transition-all duration-300">
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between w-full">
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-lg bg-gradient-to-br ${project.colorClass}`}>
                <ProjectIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-white">
                  {project.title}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {project.period}
                </p>
              </div>
            </div>
            <Chip 
              size="sm" 
              variant="flat"
              color={project.status === 'completed' ? 'success' : 'primary'}
            >
              {project.status}
            </Chip>
          </div>
        </CardHeader>
        
        <CardBody className="pt-0">
          <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
            {project.description}
          </p>
          
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Key Features
              </h4>
              <ul className="list-disc list-inside text-sm text-slate-600 dark:text-slate-300 space-y-1">
                {project.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Technologies
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <Chip 
                    key={tech} 
                    size="sm" 
                    variant="flat" 
                    color="default"
                    className="text-xs"
                  >
                    {tech}
                  </Chip>
                ))}
              </div>
            </div>
            
            {project.metrics && (
              <div>
                <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Impact & Metrics
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {Array.isArray(project.metrics) 
                    ? project.metrics.map((metric, idx) => (
                    <div key={idx} className="text-center p-2 bg-slate-50 dark:bg-slate-800 rounded">
                      <div className="font-bold text-lg text-slate-800 dark:text-white">
                        {metric.value}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        {metric.label}
                      </div>
                    </div>
                  ))
                    : Object.entries(project.metrics || {}).map(([key, value], idx) => (
                    <div key={idx} className="text-center p-2 bg-slate-50 dark:bg-slate-800 rounded">
                      <div className="font-bold text-lg text-slate-800 dark:text-white">
                        {value}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        {key}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {(project.githubUrl || project.liveUrl) && (
              <div className="flex gap-2 pt-4 border-t border-slate-200 dark:border-slate-700">
                {project.githubUrl && (
                  <Button
                    as={Link}
                    href={project.githubUrl}
                    target="_blank"
                    size="sm"
                    variant="bordered"
                    startContent={<Github size={16} />}
                  >
                    Code
                  </Button>
                )}
                {project.liveUrl && (
                  <Button
                    as={Link}
                    href={project.liveUrl}
                    target="_blank"
                    size="sm"
                    color="primary"
                    startContent={<ExternalLink size={16} />}
                  >
                    Live Demo
                  </Button>
                )}
              </div>
            )}
          </div>
        </CardBody>
      </Card>
    </motion.div>
  )
}

export default ProjectCard
