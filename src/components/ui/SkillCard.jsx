// SkillCard Component - Displays a category of skills
import { Card, Chip } from '@heroui/react';
import { motion } from 'framer-motion';

const SkillCard = ({ 
  title, 
  icon: Icon, 
  skills, 
  color = 'primary',
  delay = 0 
}) => {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const staggerItem = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 }
  };

  return (
    <motion.div
      {...fadeInUp}
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
    >
      <Card className="p-6 h-full shadow-md hover:shadow-xl transition-shadow duration-300">
        <div className="flex items-center mb-4">
          {Icon && (
            <div className="mr-3 p-2 rounded-lg bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800">
              <Icon 
                className={`
                  ${color === 'primary' && 'text-blue-500'}
                  ${color === 'success' && 'text-green-500'}
                  ${color === 'warning' && 'text-orange-500'}
                  ${color === 'secondary' && 'text-purple-500'}
                `} 
                size={24} 
              />
            </div>
          )}
          <h3 className="text-xl font-semibold text-slate-800 dark:text-white">
            {title}
          </h3>
        </div>
        
        <motion.div 
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="flex flex-wrap gap-2"
        >
          {skills.map((skill, index) => (
            <motion.div
              key={skill}
              variants={staggerItem}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Chip 
                color={color} 
                variant="flat" 
                size="sm"
                className="cursor-default hover:shadow-md transition-shadow duration-200"
              >
                {skill}
              </Chip>
            </motion.div>
          ))}
        </motion.div>
      </Card>
    </motion.div>
  );
};

export default SkillCard;
