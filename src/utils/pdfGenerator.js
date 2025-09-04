import jsPDF from 'jspdf';

/**
 * Generate a professional CV PDF
 */
export const generateProfessionalCV = () => {
  const doc = new jsPDF();
  
  // Set up colors
  const primaryColor = [44, 62, 80]; // Dark blue
  const secondaryColor = [52, 152, 219]; // Light blue
  const grayColor = [127, 140, 141]; // Gray
  const lightGrayColor = [236, 240, 241]; // Light gray
  
  // Page dimensions
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const leftColumnWidth = 65;
  const rightColumnStart = leftColumnWidth + 10;
  
  // Helper function to check if we need a new page
  const checkPageBreak = (currentY, additionalSpace = 20) => {
    if (currentY + additionalSpace > pageHeight - 20) {
      doc.addPage();
      // Recreate left column background on new page
      doc.setFillColor(lightGrayColor[0], lightGrayColor[1], lightGrayColor[2]);
      doc.rect(0, 0, leftColumnWidth, pageHeight, 'F');
      return 30; // Return new Y position for new page
    }
    return currentY;
  };
  
  // Left column background
  doc.setFillColor(lightGrayColor[0], lightGrayColor[1], lightGrayColor[2]);
  doc.rect(0, 0, leftColumnWidth, 297, 'F');
  
  // === HEADER ===
  doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.rect(0, 0, pageWidth, 60, 'F');
  
  // Name
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('Eduardo Brito', rightColumnStart, 25);
  
  // Title
  doc.setFontSize(14);
  doc.setFont('helvetica', 'normal');
  doc.text('Software Developer', rightColumnStart, 35);
  
  // === LEFT COLUMN ===
  let leftY = 80;
  
  // Details Section
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Details', 10, leftY);
  leftY += 15;
  
  // Contact info
  doc.setTextColor(grayColor[0], grayColor[1], grayColor[2]);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text('Phone', 10, leftY);
  leftY += 5;
  doc.setFont('helvetica', 'normal');
  doc.text('07495693576', 10, leftY);
  leftY += 15;
  
  doc.setFont('helvetica', 'bold');
  doc.text('Email', 10, leftY);
  leftY += 5;
  doc.setFont('helvetica', 'normal');
  doc.text('edbrito.luis@gmail.com', 10, leftY);
  leftY += 15;

  doc.setFont('helvetica', 'bold');
  doc.text('LinkedIn', 10, leftY);
  leftY += 5;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.text('linkedin.com/in/eduardo-luis-brito', 10, leftY);
  doc.setFontSize(9);
  leftY += 15;

  doc.setFont('helvetica', 'bold');
  doc.text('GitHub', 10, leftY);
  leftY += 5;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.text('github.com/Eduardo-byte', 10, leftY);
  doc.setFontSize(9);
  leftY += 15;

  doc.setFont('helvetica', 'bold');
  doc.text('Portfolio', 10, leftY);
  leftY += 5;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.text('ed-cv-project.onrender.com', 10, leftY);
  doc.setFontSize(9);
  leftY += 20;
  
  // Skills Section
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Skills', 10, leftY);
  leftY += 15;
  
  const skills = [
    { name: 'Node.js Microservices', level: 5 },
    { name: 'React JS', level: 5 },
    { name: 'JavaScript', level: 5 },
    { name: 'API Gateway', level: 4 },
    { name: 'TON Blockchain', level: 4 },
    { name: 'WebSocket', level: 4 },
    { name: 'JWT Auth', level: 4 },
    { name: 'Supabase', level: 4 }
  ];
  
  skills.forEach(skill => {
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text(skill.name, 10, leftY);
    leftY += 5;
    
    // Skill dots
    for (let i = 0; i < 5; i++) {
      if (i < skill.level) {
        doc.setFillColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
      } else {
        doc.setFillColor(200, 200, 200);
      }
      doc.circle(10 + (i * 6), leftY, 1.5, 'F');
    }
    leftY += 10;
  });
  
  // Languages
  leftY += 10;
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Languages', 10, leftY);
  leftY += 15;
  
  const languages = [
    { name: 'English', level: 5 },
    { name: 'Portuguese', level: 5 },
    { name: 'Spanish', level: 3 }
  ];
  
  languages.forEach(lang => {
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text(lang.name, 10, leftY);
    leftY += 5;
    
    // Language dots
    for (let i = 0; i < 5; i++) {
      if (i < lang.level) {
        doc.setFillColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
      } else {
        doc.setFillColor(200, 200, 200);
      }
      doc.circle(10 + (i * 6), leftY, 1.5, 'F');
    }
    leftY += 10;
  });
  
  // === RIGHT COLUMN ===
  let rightY = 80;
  
  // Profile Section
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Profile', rightColumnStart, rightY);
  rightY += 15;
  
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  const profileText = `Software Architect & Full Stack Developer with 2+ years at Olivia AI Network, architect of enterprise-level microservices ecosystems and platform infrastructure. Expert in Node.js microservices, React applications, TON blockchain, platform integrations, and production-scale system design. Built complete backend ecosystems with 25+ microservice integrations, multi-platform API gateways, and real-time communication systems.`;
  
  const profileLines = doc.splitTextToSize(profileText, pageWidth - rightColumnStart - 10);
  doc.text(profileLines, rightColumnStart, rightY);
  rightY += profileLines.length * 5 + 15;
  
  // Employment History
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Employment History', rightColumnStart, rightY);
  rightY += 15;
  
    // Job 1
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('Software Developer, Olivia Network #AI', rightColumnStart, rightY);
  rightY += 7;

  doc.setTextColor(grayColor[0], grayColor[1], grayColor[2]);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text('Aug 2023 — Present                  Bournemouth, UK', rightColumnStart, rightY);
  rightY += 10;

  doc.setTextColor(0, 0, 0);
  const job1Details = [
    '• Architected enterprise microservices ecosystem with 25+ service integrations',
    '• Built production API Gateway with JWT authentication and routing',
    '• Developed multi-platform integrations (WhatsApp, Facebook, Instagram, Telegram)',
    '• Created comprehensive React dashboard with real-time analytics (D3.js)',
    '• Implemented TON blockchain integration and cryptocurrency features',
    '• Built platform infrastructure supporting multi-tenant SaaS architecture',
    '• Developed WebSocket communication systems for real-time chat platforms'
  ];
  
  job1Details.forEach(detail => {
    rightY = checkPageBreak(rightY);
    doc.text(detail, rightColumnStart, rightY);
    rightY += 4;
  });
  rightY += 10;
  
    // Job 2
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('Software Developer, Profit Quant', rightColumnStart, rightY);
  rightY += 7;

  doc.setTextColor(grayColor[0], grayColor[1], grayColor[2]);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text('Apr 2019 — Sep 2024                Freelance', rightColumnStart, rightY);
  rightY += 10;

  doc.setTextColor(0, 0, 0);
  const job2Details = [
    '• Developed financial software solutions using Django and JavaScript',
    '• Built trading algorithms and data analysis tools',
    '• Created responsive web applications for quantitative analysis',
    '• Collaborated with financial experts to implement complex requirements'
  ];

  job2Details.forEach(detail => {
    rightY = checkPageBreak(rightY);
    doc.text(detail, rightColumnStart, rightY);
    rightY += 4;
  });
  rightY += 10;

  // Job 3
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('Web Developer, WiseGuys Protection Ltd', rightColumnStart, rightY);
  rightY += 7;

  doc.setTextColor(grayColor[0], grayColor[1], grayColor[2]);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text('May 2019 — Jul 2023                Full-time, Bournemouth', rightColumnStart, rightY);
  rightY += 10;

  doc.setTextColor(0, 0, 0);
  const job3Details = [
    '• Developed and maintained company web applications using Django',
    '• Built responsive frontend interfaces with JavaScript and modern CSS',
    '• Implemented database solutions and backend API integrations',
    '• Collaborated with design team to create user-friendly interfaces'
  ];
  
  job3Details.forEach(detail => {
    rightY = checkPageBreak(rightY);
    doc.text(detail, rightColumnStart, rightY);
    rightY += 4;
  });
  rightY += 15;
  
  // Education & Training
  rightY = checkPageBreak(rightY, 60);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Education & Certifications', rightColumnStart, rightY);
  rightY += 15;
  
  // Zero To Mastery Academy
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('Zero To Mastery Academy', rightColumnStart, rightY);
  rightY += 7;
  
  doc.setTextColor(grayColor[0], grayColor[1], grayColor[2]);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text('React.js and Python Programming              Online', rightColumnStart, rightY);
  rightY += 10;
  
  // Secondary School
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('Dom Manuel Martins Secondary School', rightColumnStart, rightY);
  rightY += 7;
  
  doc.setTextColor(grayColor[0], grayColor[1], grayColor[2]);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text('Sep 2007 — Jun 2010               Professional Programming', rightColumnStart, rightY);
  rightY += 10;
  
  doc.setTextColor(0, 0, 0);
  doc.text('• Programming and management of computer systems (A level)', rightColumnStart, rightY);
  rightY += 4;
  doc.text('• Specialization: Javascript, ReactJs, Python, Django, HTML, CSS', rightColumnStart, rightY);
  rightY += 15;
  
  // Certifications
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Professional Certifications', rightColumnStart, rightY);
  rightY += 10;
  
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text('• Bootstrap 4 Essential Training (LinkedIn, 2020)', rightColumnStart, rightY);
  rightY += 4;
  doc.text('• CSS Essential Training (LinkedIn, 2020)', rightColumnStart, rightY);
  rightY += 4;
  doc.text('• Plus 6 additional professional certifications', rightColumnStart, rightY);
  rightY += 20;
  
  // Add Key Projects section (now with proper page break logic)
  rightY = checkPageBreak(rightY, 60);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Key Projects', rightColumnStart, rightY);
  rightY += 15;
  
  // Project 1
  rightY = checkPageBreak(rightY, 30);
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('Enterprise Microservices Architecture', rightColumnStart, rightY);
  rightY += 5;
  doc.setFont('helvetica', 'normal');
  doc.text('• 25+ microservices with API Gateway and JWT authentication', rightColumnStart, rightY);
  rightY += 4;
  doc.text('• Multi-platform social media APIs and real-time communication', rightColumnStart, rightY);
  rightY += 8;
  
  // Project 2
  rightY = checkPageBreak(rightY, 25);
  doc.setFont('helvetica', 'bold');
  doc.text('Cryptocurrency/Blockchain Platform', rightColumnStart, rightY);
  rightY += 5;
  doc.setFont('helvetica', 'normal');
  doc.text('• TON blockchain integration with TonConnect wallet system', rightColumnStart, rightY);
  rightY += 4;
  doc.text('• Blockchain gaming with NFT rewards and quest systems', rightColumnStart, rightY);
  rightY += 8;
  
  // Project 3
  rightY = checkPageBreak(rightY, 25);
  doc.setFont('helvetica', 'bold');
  doc.text('Platform Infrastructure', rightColumnStart, rightY);
  rightY += 5;
  doc.setFont('helvetica', 'normal');
  doc.text('• Multi-tenant SaaS with role-based access control', rightColumnStart, rightY);
  rightY += 4;
  doc.text('• Real-time analytics dashboard with D3.js and Recharts', rightColumnStart, rightY);
  rightY += 20;
  
  return doc;
};

/**
 * Download CV as PDF using jsPDF
 */
export const downloadGeneratedCV = () => {
  const doc = generateProfessionalCV();
  doc.save('Eduardo_Brito_CV.pdf');
  console.log('CV downloaded successfully!');
};
