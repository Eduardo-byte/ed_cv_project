// CV PDF Generator Utility
import { APP_INFO, SOCIAL_LINKS } from './constants.js';

/**
 * Generate CV content for PDF
 */
export const generateCVContent = () => {
  return {
    personalInfo: {
      name: APP_INFO.NAME.split(' - ')[0] || 'Eduardo Brito',
      title: 'Full Stack Developer',
      email: APP_INFO.EMAIL,
      phone: APP_INFO.PHONE,
      location: APP_INFO.LOCATION,
      github: SOCIAL_LINKS.GITHUB,
      linkedin: SOCIAL_LINKS.LINKEDIN
    },
    
    summary: `Passionate full stack developer with expertise in modern web technologies. 
    Experienced in building scalable applications from database to user interface, 
    with a focus on clean code, performance, and user experience. Strong background 
    in both frontend and backend development, cloud deployment, and agile methodologies.`,
    
    skills: {
      frontend: ['React', 'Vue.js', 'JavaScript', 'TypeScript', 'Tailwind CSS', 'HTML5', 'CSS3'],
      backend: ['Node.js', 'Express.js', 'Python', 'Java', 'REST APIs', 'GraphQL'],
      database: ['PostgreSQL', 'MongoDB', 'Supabase', 'MySQL', 'Redis'],
      tools: ['Git', 'Docker', 'AWS', 'Vercel', 'Linux', 'CI/CD']
    },
    
    competencies: [
      'Full-stack web application development',
      'Modern JavaScript frameworks and libraries',
      'Database design and optimization',
      'API development and integration',
      'Cloud deployment and DevOps practices',
      'Responsive design and user experience',
      'Code review and mentoring',
      'Agile development methodologies'
    ]
  };
};

/**
 * Download CV as PDF (fallback to static PDF)
 */
export const downloadCV = () => {
  const cvUrl = '/Eduardo_Brito_CV.pdf';
  const link = document.createElement('a');
  link.href = cvUrl;
  link.download = 'Eduardo_Brito_CV.pdf';
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  // Optional: Track download for analytics
  console.log('CV downloaded by user');
  
  // Optional: Show success message
  if (typeof window !== 'undefined' && window.toast) {
    window.toast.success('CV downloaded successfully!');
  }
};

// Import the new PDF generator
export { downloadGeneratedCV } from './pdfGenerator.js';
