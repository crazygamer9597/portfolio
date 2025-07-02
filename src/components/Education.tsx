import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, MapPin, Calendar, Award, ExternalLink } from 'lucide-react';
import { education, certifications as defaultCertifications } from '../data/portfolio';
import { logger } from '../utils/logger';

interface Certification {
  id?: string;
  name: string;
  issuer: string;
  date?: string;
  status?: string;
  link?: string;
}

export const Education: React.FC = () => {
  const [allCertifications, setAllCertifications] = useState<Certification[]>(defaultCertifications);

  useEffect(() => {
    // Load custom certifications from localStorage and merge with default certifications
    try {
      const customCertifications = localStorage.getItem('admin_certifications');
      if (customCertifications) {
        const parsed = JSON.parse(customCertifications);
        setAllCertifications([...defaultCertifications, ...parsed]);
      }
    } catch (error) {
      logger.error('Error loading custom certifications', { error });
    }
  }, []);

  return (
    <section id="education" className="py-20 bg-gradient-to-br from-dark-800 to-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Education & Certifications
          </h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 160 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-1 bg-gradient-to-r from-primary-500 to-purple-500 mx-auto mb-8"
          />
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Academic background and professional certifications
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Education */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-semibold text-white mb-8 flex items-center">
              <GraduationCap className="h-8 w-8 text-primary-400 mr-3" />
              Education
            </h3>
            
            <div className="space-y-6">
              <motion.div
                whileHover={{ scale: 1.02, y: -5 }}
                className="bg-gradient-to-r from-primary-500/10 to-purple-500/10 backdrop-blur-sm rounded-2xl p-8 border border-primary-500/20 hover:border-primary-500/40 transition-all duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-to-r from-primary-500 to-purple-500 p-3 rounded-xl">
                    <GraduationCap className="h-8 w-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-2xl font-semibold text-white mb-2">
                      {education.university.degree}
                    </h4>
                    <p className="text-primary-300 font-medium mb-3 text-lg">
                      {education.university.name}
                    </p>
                    <div className="flex flex-wrap items-center gap-4 text-gray-300 text-sm mb-3">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1 text-primary-400" />
                        {education.university.location}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1 text-primary-400" />
                        {education.university.period}
                      </div>
                    </div>
                    <p className="text-gray-200 font-medium">
                      GPA: <span className="text-primary-300">{education.university.gpa}</span>
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02, y: -5 }}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-to-r from-gray-500 to-gray-600 p-3 rounded-xl">
                    <GraduationCap className="h-8 w-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-2xl font-semibold text-white mb-2">
                      High School Education
                    </h4>
                    <p className="text-gray-300 font-medium mb-3 text-lg">
                      {education.school.name}
                    </p>
                    <div className="flex items-center gap-4 text-gray-300 text-sm mb-3">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                        {education.school.location}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                        {education.school.year}
                      </div>
                    </div>
                    <p className="text-gray-200">
                      {education.school.details}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-semibold text-white mb-8 flex items-center">
              <Award className="h-8 w-8 text-primary-400 mr-3" />
              Certifications
            </h3>
            
            <div className="space-y-4">
              {allCertifications.map((cert, index) => (
                <motion.div
                  key={cert.id || cert.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02, x: 10 }}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-white/20 transition-all duration-300 group"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-2 rounded-lg group-hover:scale-110 transition-transform duration-300">
                        <Award className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-white mb-1 group-hover:text-primary-300 transition-colors">
                          {cert.name}
                        </h4>
                        <p className="text-primary-300 text-sm mb-1 font-medium">
                          {cert.issuer}
                        </p>
                        <p className="text-gray-400 text-sm">
                          {cert.date || cert.status}
                        </p>
                      </div>
                    </div>
                    {cert.link && (
                      <a
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-400 hover:text-primary-300 transition-colors ml-4"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};