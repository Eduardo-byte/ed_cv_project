// Header Component - Navigation header for the application
import { useState, useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { 
  Navbar, 
  NavbarBrand, 
  NavbarContent, 
  NavbarItem, 
  NavbarMenuToggle, 
  NavbarMenu, 
  NavbarMenuItem, 
  Link, 
  Button 
} from '@heroui/react';
import { motion } from 'framer-motion';
import { Download, Menu, X } from 'lucide-react';
import { ROUTES, APP_INFO } from '../../utils/constants.js';
import { downloadGeneratedCV } from '../../utils/cvGenerator.js';

// Simple scroll utility
const scrollToElement = (elementId, offset = 0) => {
  const element = document.getElementById(elementId);
  if (element) {
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - offset;
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Navigation items
  const navItems = [
    { name: 'Home', href: ROUTES.HOME, id: 'home' },
    { name: 'Skills', href: '#skills', id: 'skills', isAnchor: true },
    { name: 'About', href: '#about', id: 'about', isAnchor: true },
    { name: 'Projects', href: ROUTES.PROJECTS, id: 'projects' },
    { name: 'Contact', href: '#contact', id: 'contact', isAnchor: true },
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle navigation click
  const handleNavClick = (item) => {
    if (item.isAnchor && location.pathname === ROUTES.HOME) {
      // Scroll to section on home page
      scrollToElement(item.id, 80);
    }
    setIsMenuOpen(false);
  };

  // Download CV function - using generated PDF
  const handleDownloadCV = downloadGeneratedCV;

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      isMenuOpen={isMenuOpen}
      className={`fixed top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-700 shadow-sm' 
          : 'bg-transparent'
      }`}
      maxWidth="xl"
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
          icon={isMenuOpen ? <X /> : <Menu />}
        />
        <NavbarBrand>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="cursor-pointer"
            onClick={() => handleNavClick({ id: 'home', isAnchor: true })}
          >
            <p className="font-bold text-xl text-slate-800 dark:text-white">
              {APP_INFO.NAME.split(' ')[0]} {APP_INFO.NAME.split(' ')[1]}
            </p>
          </motion.div>
        </NavbarBrand>
      </NavbarContent>

      {/* Desktop Navigation */}
      <NavbarContent className="hidden sm:flex gap-6" justify="center">
        {navItems.map((item) => (
          <NavbarItem key={item.id}>
            {item.isAnchor ? (
              <Link
                as="button"
                onClick={() => handleNavClick(item)}
                className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
              >
                {item.name}
              </Link>
            ) : (
              <Link
                as={RouterLink}
                to={item.href}
                className={`text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors ${
                  location.pathname === item.href ? 'text-blue-600 dark:text-blue-400 font-medium' : ''
                }`}
              >
                {item.name}
              </Link>
            )}
          </NavbarItem>
        ))}
      </NavbarContent>

      {/* Download CV Button */}
      <NavbarContent justify="end">
        <NavbarItem>
          <Button
            color="primary"
            variant="bordered"
            startContent={<Download size={16} />}
            onClick={handleDownloadCV}
            className="hidden sm:flex"
          >
            Download CV
          </Button>
          <Button
            color="primary"
            variant="bordered"
            isIconOnly
            onClick={handleDownloadCV}
            className="sm:hidden"
          >
            <Download size={16} />
          </Button>
        </NavbarItem>
      </NavbarContent>

      {/* Mobile Menu */}
      <NavbarMenu className="pt-6">
        {navItems.map((item) => (
          <NavbarMenuItem key={item.id}>
            {item.isAnchor ? (
              <Link
                as="button"
                onClick={() => handleNavClick(item)}
                className="w-full text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors text-lg py-2"
              >
                {item.name}
              </Link>
            ) : (
              <Link
                as={RouterLink}
                to={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`w-full text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors text-lg py-2 ${
                  location.pathname === item.href ? 'text-blue-600 dark:text-blue-400 font-medium' : ''
                }`}
              >
                {item.name}
              </Link>
            )}
          </NavbarMenuItem>
        ))}
        <NavbarMenuItem className="pt-4">
          <Button
            color="primary"
            variant="flat"
            fullWidth
            startContent={<Download size={16} />}
            onClick={() => {
              handleDownloadCV();
              setIsMenuOpen(false);
            }}
          >
            Download CV
          </Button>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
};

export default Header;
