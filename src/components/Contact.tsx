import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Linkedin, Send, CheckCircle, AlertCircle, MapPin } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { personalInfo } from '../data/portfolio';
import { logger } from '../utils/logger';

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormStatus {
  type: 'success' | 'error' | null;
  message: string;
}

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<FormStatus>({ type: null, message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Your EmailJS configuration
  const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      setStatus({ type: 'error', message: 'Name is required' });
      return false;
    }
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      setStatus({ type: 'error', message: 'Valid email is required' });
      return false;
    }
    if (!formData.message.trim()) {
      setStatus({ type: 'error', message: 'Message is required' });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (!validateForm()) return;

      setIsSubmitting(true);
      setStatus({ type: null, message: '' });

      // Send email using EmailJS
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message
      };

      const result = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      if (result.status === 200) {
        logger.info('Contact form submitted successfully via EmailJS', { 
          name: formData.name, 
          email: formData.email 
        });

        setStatus({ 
          type: 'success', 
          message: 'Thank you for your message! I\'ll get back to you soon.' 
        });
        
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      logger.error('Error submitting contact form', { error });
      setStatus({ 
        type: 'error', 
        message: 'Failed to send message. Please try again or contact me directly via email.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-dark-800 to-dark-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, #a855f7 0%, transparent 50%)`
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Get In Touch
          </h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 100 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-1 bg-gradient-to-r from-primary-500 to-purple-500 mx-auto mb-8"
          />
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Let's discuss opportunities, collaborations, or just connect!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-3xl font-semibold text-white mb-6">
                Let's Connect
              </h3>
              <p className="text-gray-300 mb-8 text-lg leading-relaxed">
                I'm always interested in discussing new opportunities, 
                innovative projects, and connecting with like-minded individuals 
                in the tech community.
              </p>
            </div>

            <div className="space-y-6">
              {[
                {
                  icon: Mail,
                  label: 'Email',
                  value: personalInfo.email,
                  href: `mailto:${personalInfo.email}`,
                  gradient: 'from-blue-500 to-cyan-500'
                },
                {
                  icon: Phone,
                  label: 'Phone',
                  value: personalInfo.phone,
                  href: `tel:${personalInfo.phone}`,
                  gradient: 'from-green-500 to-emerald-500'
                },
                {
                  icon: Linkedin,
                  label: 'LinkedIn',
                  value: personalInfo.linkedin,
                  href: `https://${personalInfo.linkedin}`,
                  gradient: 'from-purple-500 to-pink-500'
                },
                {
                  icon: MapPin,
                  label: 'Location',
                  value: 'Chennai, India',
                  href: '#',
                  gradient: 'from-yellow-500 to-orange-500'
                }
              ].map((contact, index) => (
                <motion.div
                  key={contact.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02, x: 10 }}
                  className="flex items-center space-x-4 group"
                >
                  <div className={`bg-gradient-to-r ${contact.gradient} p-4 rounded-2xl group-hover:scale-110 transition-transform duration-300`}>
                    <contact.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-white text-lg">{contact.label}</p>
                    {contact.href !== '#' ? (
                      <a 
                        href={contact.href}
                        target={contact.label === 'LinkedIn' ? '_blank' : undefined}
                        rel={contact.label === 'LinkedIn' ? 'noopener noreferrer' : undefined}
                        className="text-primary-300 hover:text-primary-200 transition-colors"
                      >
                        {contact.value}
                      </a>
                    ) : (
                      <span className="text-gray-300">{contact.value}</span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    placeholder="Your name"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={5}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
                    placeholder="Your message..."
                    required
                  />
                </div>

                {status.type && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex items-center space-x-2 p-4 rounded-xl ${
                      status.type === 'success' 
                        ? 'bg-green-500/20 text-green-300 border border-green-500/30' 
                        : 'bg-red-500/20 text-red-300 border border-red-500/30'
                    }`}
                  >
                    {status.type === 'success' ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      <AlertCircle className="h-5 w-5" />
                    )}
                    <span className="text-sm">{status.message}</span>
                  </motion.div>
                )}

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-primary-600 to-purple-600 text-white py-4 px-6 rounded-xl hover:shadow-glow disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center space-x-2 font-semibold"
                >
                  {isSubmitting ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};