// ContactForm Component - Contact form with Nodemailer backend
import { useState } from 'react';
import { Card, Input, Textarea, Button, Chip } from '@heroui/react';
import { motion } from 'framer-motion';
import { Send, Check, AlertCircle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const ContactForm = ({ className = '' }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  // Handle input changes
  const handleChange = (field) => (value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: null
      }));
    }
  };

  // Simple client-side validation
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission with Nodemailer backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Send to API microservice (configuration from environment)
      const apiVersion = import.meta.env.VITE_API_VERSION || 'v1';
      const apiUrl = import.meta.env.PROD
        ? `${import.meta.env.VITE_API_BASE_URL_PROD || '/api'}/${apiVersion}/contact`
        : `${import.meta.env.VITE_API_BASE_URL_DEV || 'http://localhost:3001'}/${apiVersion}/contact`;
      console.log("apiUrl", apiUrl);
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject || 'Contact from CV Website',
          message: formData.message
        })
      });

      const result = await response.json();
      
      if (result.success) {
        toast.success('Message sent successfully! I\'ll get back to you soon.');
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
        setErrors({});
      } else {
        throw new Error(result.error || 'Failed to send message');
      }
      
    } catch (error) {
      console.error('Contact form error:', error);
      toast.error(error.message || 'Failed to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const fieldVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <motion.div
      variants={formVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={className}
    >
      <Card className="p-6 md:p-8 shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name and Email Row */}
          <div className="grid md:grid-cols-2 gap-4">
            <motion.div variants={fieldVariants}>
              <Input
                label="Name"
                placeholder="Your full name"
                value={formData.name}
                onValueChange={handleChange('name')}
                isRequired
                isInvalid={!!errors.name}
                errorMessage={errors.name}
                variant="bordered"
                classNames={{
                  inputWrapper: "border-slate-200 dark:border-slate-700"
                }}
              />
            </motion.div>
            
            <motion.div variants={fieldVariants}>
              <Input
                label="Email"
                placeholder={import.meta.env.VITE_CONTACT_PLACEHOLDER_EMAIL || "your.email@domain.com"}
                type="email"
                value={formData.email}
                onValueChange={handleChange('email')}
                isRequired
                isInvalid={!!errors.email}
                errorMessage={errors.email}
                variant="bordered"
                classNames={{
                  inputWrapper: "border-slate-200 dark:border-slate-700"
                }}
              />
            </motion.div>
          </div>

          {/* Subject */}
          <motion.div variants={fieldVariants}>
            <Input
              label="Subject"
              placeholder="What's this about? (optional)"
              value={formData.subject}
              onValueChange={handleChange('subject')}
              variant="bordered"
              classNames={{
                inputWrapper: "border-slate-200 dark:border-slate-700"
              }}
            />
          </motion.div>

          {/* Message */}
          <motion.div variants={fieldVariants}>
            <Textarea
              label="Message"
              placeholder="Tell me about your project, question, or just say hello!"
              value={formData.message}
              onValueChange={handleChange('message')}
              isRequired
              minRows={4}
              isInvalid={!!errors.message}
              errorMessage={errors.message}
              variant="bordered"
              classNames={{
                inputWrapper: "border-slate-200 dark:border-slate-700"
              }}
            />
            <div className="flex justify-between items-center mt-2">
              <Chip 
                size="sm" 
                variant="flat" 
                color={formData.message.length > 1000 ? 'danger' : 'default'}
              >
                {formData.message.length}/1000
              </Chip>
            </div>
          </motion.div>

          {/* Submit Button */}
          <motion.div 
            variants={fieldVariants}
            className="pt-4"
          >
            <Button
              type="submit"
              color="primary"
              size="lg"
              isLoading={isSubmitting}
              disabled={isSubmitting}
              startContent={
                isSubmitting ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <Send size={20} />
                )
              }
              className="w-full md:w-auto min-w-[200px]"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </Button>
          </motion.div>

          {/* Info Text */}
          <motion.div 
            variants={fieldVariants}
            className="text-sm text-slate-500 dark:text-slate-400 flex items-start gap-2"
          >
            <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
            <p>
              I typically respond within 24 hours. Your email will be kept private 
              and used only to respond to your message.
            </p>
          </motion.div>
        </form>
      </Card>
    </motion.div>
  );
};

export default ContactForm;
