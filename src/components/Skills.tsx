import React from 'react';
import { motion } from 'framer-motion';
import { skills } from '../data/portfolio';

const categoryColors = {
  "Languages & Libraries": "from-blue-500 to-cyan-500",
  "Frameworks & Tools": "from-purple-500 to-pink-500",
  "Platforms & Infrastructure": "from-green-500 to-emerald-500",
  "Databases & Platforms": "from-yellow-500 to-orange-500",
  "Networking & Security": "from-red-500 to-rose-500"
};

export const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-20 bg-gradient-to-br from-dark-800 to-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Technical Skills
          </h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 120 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-1 bg-gradient-to-r from-primary-500 to-purple-500 mx-auto mb-8"
          />
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A comprehensive toolkit spanning multiple domains of technology
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {Object.entries(skills).map(([category, skillList], categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, x: categoryIndex % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300">
                <div className="flex items-center mb-6">
                  <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${categoryColors[category as keyof typeof categoryColors]} mr-3`} />
                  <h3 className="text-2xl font-semibold text-white">
                    {category}
                  </h3>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  {skillList.map((skill, skillIndex) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{
                        duration: 0.4,
                        delay: categoryIndex * 0.1 + skillIndex * 0.05
                      }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="px-4 py-2 bg-white/10 backdrop-blur-sm text-gray-200 rounded-full text-sm font-medium hover:bg-white/20 transition-all cursor-default border border-white/10 hover:border-white/30"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};