import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Award, Users, Target } from 'lucide-react';
import { achievements } from '../data/portfolio';

const iconMap = {
  'Vice-Chairperson': Users,
  'Senior Core Committee Member': Users,
  'Runners-up': Trophy,
  '1st Place': Award,
  '2nd Place': Trophy
};

const gradientMap = {
  'Vice-Chairperson': 'from-purple-500 to-indigo-500',
  'Senior Core Committee Member': 'from-blue-500 to-cyan-500',
  'Runners-up': 'from-yellow-500 to-orange-500',
  '1st Place': 'from-green-500 to-emerald-500',
  '2nd Place': 'from-red-500 to-pink-500'
};

export const Achievements: React.FC = () => {
  const getIcon = (title: string) => {
    const key = Object.keys(iconMap).find(k => title.includes(k));
    return key ? iconMap[key as keyof typeof iconMap] : Target;
  };

  const getGradient = (title: string) => {
    const key = Object.keys(gradientMap).find(k => title.includes(k));
    return key ? gradientMap[key as keyof typeof gradientMap] : 'from-gray-500 to-gray-600';
  };

  return (
    <section id="achievements" className="py-20 bg-gradient-to-br from-dark-900 to-dark-800 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 75%, #a855f7 0%, transparent 50%), 
                           radial-gradient(circle at 75% 25%, #06b6d4 0%, transparent 50%)`
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
            Key Achievements
          </h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 120 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-1 bg-gradient-to-r from-primary-500 to-purple-500 mx-auto mb-8"
          />
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Recognition and leadership roles that showcase commitment to excellence
          </p>
        </motion.div>

        <div className="space-y-8">
          {achievements.map((achievement, index) => {
            const IconComponent = getIcon(achievement.title);
            const gradient = getGradient(achievement.title);
            
            return (
              <motion.div
                key={achievement.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="group"
              >
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300">
                  <div className="flex items-start space-x-6">
                    <div className={`bg-gradient-to-r ${gradient} p-4 rounded-2xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="h-10 w-10 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                        <h3 className="text-2xl font-semibold text-white group-hover:text-primary-300 transition-colors">
                          {achievement.title}
                        </h3>
                        <span className="text-primary-300 font-medium text-lg mt-2 lg:mt-0">
                          {achievement.period}
                        </span>
                      </div>
                      <p className="text-gray-300 leading-relaxed text-lg">
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Hover Glow Effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300 -z-10 blur-xl`} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};