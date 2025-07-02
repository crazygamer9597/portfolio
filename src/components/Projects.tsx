import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects as defaultProjects } from '../data/portfolio';
import { logger } from '../utils/logger';

const categories = ['All', 'AI & Computer Vision', 'Infrastructure & Security', 'Cryptography & IoT', 'Blockchain & Privacy', 'Full Stack Development', 'Cybersecurity & ML'];

interface Project {
  id?: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  icon: string;
  gradient: string;
  link?: string;
}

export const Projects: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [allProjects, setAllProjects] = useState<Project[]>(defaultProjects);

  useEffect(() => {
    // Load custom projects from localStorage and merge with default projects
    try {
      const customProjects = localStorage.getItem('admin_projects');
      if (customProjects) {
        const parsed = JSON.parse(customProjects);
        setAllProjects([...defaultProjects, ...parsed]);
      }
    } catch (error) {
      logger.error('Error loading custom projects', { error });
    }
  }, []);

  const filteredProjects = selectedCategory === 'All' 
    ? allProjects 
    : allProjects.filter(project => project.category === selectedCategory);

  const handleCategoryChange = (category: string) => {
    try {
      setSelectedCategory(category);
      logger.debug('Project category changed', { category });
    } catch (error) {
      logger.error('Error changing project category', { error });
    }
  };

  return (
    <section id="projects" className="py-20 bg-gradient-to-br from-dark-900 to-dark-800 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 75% 25%, #a855f7 0%, transparent 50%), 
                           radial-gradient(circle at 25% 75%, #06b6d4 0%, transparent 50%)`
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
            Featured Projects
          </h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 140 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-1 bg-gradient-to-r from-primary-500 to-purple-500 mx-auto mb-8"
          />
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A selection of projects showcasing expertise in AI, security, and full-stack development
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleCategoryChange(category)}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-primary-600 to-purple-600 text-white shadow-glow'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20 border border-white/20'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id || project.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative"
              >
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300 h-full">
                  {/* Project Icon */}
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${project.gradient} flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    {project.icon}
                  </div>

                  {/* Project Category */}
                  <span className="inline-block px-3 py-1 bg-primary-500/20 text-primary-300 rounded-full text-xs font-medium mb-4">
                    {project.category}
                  </span>

                  {/* Project Title */}
                  <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-primary-300 transition-colors">
                    {project.title}
                  </h3>
                  
                  {/* Project Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-white/10 text-gray-300 rounded text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Project Description */}
                  <p className="text-gray-300 leading-relaxed text-sm mb-4">
                    {project.description}
                  </p>

                  {/* Project Link */}
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-primary-400 hover:text-primary-300 transition-colors text-sm font-medium"
                    >
                      View Project →
                    </a>
                  )}
                </div>
                
                {/* Hover Glow Effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${project.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300 -z-10 blur-xl`} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-400 text-lg">No projects found in this category.</p>
          </motion.div>
        )}
      </div>
    </section>
  );
};