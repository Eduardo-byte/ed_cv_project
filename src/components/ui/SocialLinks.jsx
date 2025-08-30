// SocialLinks Component - Social media links with animations
import { Button, Link } from '@heroui/react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Twitter, ExternalLink } from 'lucide-react';
import { SOCIAL_LINKS } from '../../utils/constants.js';

const SocialLinks = ({ 
  layout = 'horizontal', // horizontal, vertical, grid
  variant = 'bordered',
  size = 'lg',
  showLabels = true,
  className = ''
}) => {
  const socialItems = [
    {
      name: 'Email',
      icon: Mail,
      href: SOCIAL_LINKS.EMAIL,
      color: 'primary',
      label: 'Email Me'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: SOCIAL_LINKS.LINKEDIN,
      color: 'primary',
      label: 'LinkedIn',
      external: true
    },
    {
      name: 'GitHub',
      icon: Github,
      href: SOCIAL_LINKS.GITHUB,
      color: 'primary',
      label: 'GitHub',
      external: true
    },
    {
      name: 'Twitter',
      icon: Twitter,
      href: SOCIAL_LINKS.TWITTER,
      color: 'primary',
      label: 'Twitter',
      external: true
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.8
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const getLayoutClasses = () => {
    switch (layout) {
      case 'vertical':
        return 'flex flex-col gap-3';
      case 'grid':
        return 'grid grid-cols-2 gap-3';
      case 'horizontal':
      default:
        return 'flex flex-wrap justify-center gap-4';
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`${getLayoutClasses()} ${className}`}
    >
      {socialItems.map((social) => {
        const IconComponent = social.icon;
        
        return (
          <motion.div
            key={social.name}
            variants={itemVariants}
            whileHover={{ 
              scale: 1.05,
              transition: { duration: 0.2 }
            }}
            whileTap={{ 
              scale: 0.95,
              transition: { duration: 0.1 }
            }}
          >
            <Button
              as={Link}
              href={social.href}
              target={social.external ? "_blank" : undefined}
              rel={social.external ? "noopener noreferrer" : undefined}
              color={social.color}
              variant={variant}
              size={size}
              startContent={<IconComponent size={20} />}
              endContent={social.external ? <ExternalLink size={16} /> : null}
              className={`
                ${!showLabels ? 'min-w-unit-12 px-3' : 'px-6'}
                transition-all duration-200
                hover:shadow-lg hover:shadow-blue-500/25
                active:scale-95
              `}
            >
              {showLabels ? social.label : null}
            </Button>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default SocialLinks;
