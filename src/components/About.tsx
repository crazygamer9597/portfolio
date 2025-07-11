import React from "react";
import { motion } from "framer-motion";
import { Code2, Shield, Brain, Globe } from "lucide-react";

const features = [
  {
    icon: Code2,
    title: "Open-source Advocate",
    description:
      "Passionate about open-source software and building systems that respect user freedom and privacy.",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: Shield,
    title: "Cybersecurity Expert",
    description:
      "Skilled in system security, networking, and ethical hacking with CEH certification.",
    gradient: "from-red-500 to-pink-500",
  },
  {
    icon: Brain,
    title: "AI Enthusiast",
    description:
      "Building intelligent systems and machine learning models for real-world applications.",
    gradient: "from-purple-500 to-indigo-500",
  },
  {
    icon: Globe,
    title: "System Designer",
    description:
      "Focused on creating scalable, secure, and accessible technology solutions.",
    gradient: "from-green-500 to-emerald-500",
  },
];

export const About: React.FC = () => {
  return (
    <section
      id="about"
      className="py-20 bg-gradient-to-br from-dark-900 to-dark-800 relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #a855f7 0%, transparent 50%), 
                           radial-gradient(circle at 75% 75%, #06b6d4 0%, transparent 50%)`,
          }}
        />
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
            About me
          </h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 100 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-1 bg-gradient-to-r from-primary-500 to-purple-500 mx-auto mb-8"
          />
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Welcome to my portfolio! I'm Nihal Johann Thomas, a passionate
            computer science engineer with expertise in AI, cybersecurity, and
            system design, dedicated to building impactful and secure technology
            solutions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group relative"
            >
              <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 h-full">
                <div
                  className={`bg-gradient-to-r ${feature.gradient} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Hover Glow Effect */}
              <div
                className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300 -z-10 blur-xl`}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
