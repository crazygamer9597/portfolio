import React from "react";
import { motion } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  Download,
  ChevronDown,
  ExternalLink,
} from "lucide-react";
import { useMousePosition } from "../hooks/useMousePosition";
import { personalInfo } from "../data/portfolio";
import { FloatingElements } from "./FloatingElements";
import { logger } from "../utils/logger";

export const Hero: React.FC = () => {
  const mousePosition = useMousePosition();

  const handleResumeView = () => {
    try {
      logger.info("Resume view initiated");
      window.open(
        "https://drive.google.com/file/d/1KK6MZNntzPbGbMrHqj9TWK92-DaD61Nw/view",
        "_blank"
      );
    } catch (error) {
      logger.error("Error opening resume", { error });
    }
  };

  const handleResumeDownload = () => {
    try {
      logger.info("Resume download initiated");
      // Convert Google Drive view link to download link
      const downloadLink =
        "https://drive.google.com/uc?export=download&id=1KK6MZNntzPbGbMrHqj9TWK92-DaD61Nw";
      const link = document.createElement("a");
      link.href = downloadLink;
      link.download = "Nihal_Johann_Thomas_Resume.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      logger.error("Error downloading resume", { error });
    }
  };

  const handleContactClick = (type: string, value: string) => {
    try {
      if (type === "email") {
        window.location.href = `mailto:${value}`;
      } else if (type === "linkedin") {
        window.open(`https://${value}`, "_blank");
      } else if (type === "github") {
        window.open("https://github.com/crazygamer9597", "_blank");
      }
      logger.info("Contact link clicked", { type, value });
    } catch (error) {
      logger.error("Error handling contact click", { type, error });
    }
  };

  const scrollToNext = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-hero-gradient"
    >
      <FloatingElements />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-left">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-primary-300 text-lg mb-4 font-medium"
              >
                WELCOME TO MY WORLD ✨
              </motion.p>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white mb-6">
                <span className="block">Hi, I'm</span>
                <span className="block bg-gradient-to-r from-primary-400 to-purple-400 bg-clip-text text-transparent">
                  {personalInfo.name.split(" ")[0]}
                </span>
              </h1>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="mb-8"
              >
                <h2 className="text-2xl sm:text-4xl font-bold text-white mb-4">
                  <span className="bg-gradient-to-r from-primary-400 to-purple-400 bg-clip-text text-transparent">
                    Open-source Advocate
                  </span>{" "}
                  <span className="text-white">& CS Enthusiast</span>
                </h2>
                <p className="text-gray-300 text-lg leading-relaxed max-w-2xl">
                  Passionate about building intelligent systems and secure
                  applications. I transform ideas into seamless digital
                  experiences that meet users' expectations.
                </p>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap gap-4 mb-8"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() =>
                  document
                    .getElementById("projects")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="px-8 py-4 bg-gradient-to-r from-primary-600 to-purple-600 text-white font-semibold rounded-full hover:shadow-glow transition-all flex items-center space-x-2"
              >
                <span>My Projects</span>
              </motion.button>

              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleResumeView}
                  className="px-6 py-4 border border-white/20 text-white font-semibold rounded-full hover:bg-white/10 transition-all flex items-center space-x-2"
                >
                  <ExternalLink className="h-5 w-5" />
                  <span>View CV</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleResumeDownload}
                  className="px-6 py-4 border border-white/20 text-white font-semibold rounded-full hover:bg-white/10 transition-all flex items-center space-x-2"
                >
                  <Download className="h-5 w-5" />
                  <span>Download</span>
                </motion.button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex space-x-4"
            >
              {[
                {
                  icon: Mail,
                  action: () => handleContactClick("email", personalInfo.email),
                },
                {
                  icon: Linkedin,
                  action: () =>
                    handleContactClick("linkedin", personalInfo.linkedin),
                },
                {
                  icon: Github,
                  action: () =>
                    handleContactClick("github", "github.com/crazygamer9597"),
                },
              ].map((social, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={social.action}
                  className="p-3 bg-white/10 backdrop-blur-sm text-white rounded-full hover:bg-white/20 transition-all border border-white/20"
                >
                  <social.icon className="h-5 w-5" />
                </motion.button>
              ))}
            </motion.div>
          </div>

          {/* Right Content - Your Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="relative"
            style={{
              transform: `translate(${mousePosition.x * 0.02}px, ${
                mousePosition.y * 0.02
              }px)`,
            }}
          >
            <div className="relative w-full max-w-lg mx-auto">
              {/* Photo Container with Glassmorphic Frame */}
              <div className="relative bg-gradient-to-br from-primary-500/20 to-purple-600/20 rounded-3xl p-8 backdrop-blur-sm border border-white/10">
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="relative"
                >
                  {/* Your Photo */}
                  <div className="relative w-80 h-80 mx-auto mb-6 rounded-2xl overflow-hidden border-4 border-white/20 shadow-2xl">
                    <img
                      src="/download.png"
                      alt="Nihal Johann Thomas"
                      className="w-full h-full object-cover"
                      style={{ objectPosition: "top" }}
                    />
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-900/30 to-transparent" />
                  </div>

                  <div className="text-center">
                    <div className="bg-gradient-to-r from-primary-400 to-purple-400 bg-clip-text text-transparent text-2xl font-bold mb-2">
                      Building the Future
                    </div>
                    <p className="text-gray-300">One line of code at a time</p>
                  </div>
                </motion.div>

                {/* Floating Tech Icons */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white text-xl"
                >
                  🤖
                </motion.div>

                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white text-xl"
                >
                  🔐
                </motion.div>

                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute top-1/2 -left-6 w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-lg"
                >
                  ⚡
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        onClick={scrollToNext}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 hover:text-white transition-colors"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center"
        >
          <span className="text-sm mb-2">Scroll Down</span>
          <ChevronDown className="h-6 w-6" />
        </motion.div>
      </motion.button>
    </section>
  );
};
