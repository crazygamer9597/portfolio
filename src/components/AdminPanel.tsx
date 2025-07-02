import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Users, Globe, Clock, MousePointer, Eye, Plus, ExternalLink, Award, Trash2, Edit, Lock } from 'lucide-react';
import { analytics } from '../utils/analytics';
import { logger } from '../utils/logger';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  icon: string;
  gradient: string;
  link?: string;
}

interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  link?: string;
}

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

export const AdminPanel: React.FC<AdminPanelProps> = ({ isOpen, onClose }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [activeTab, setActiveTab] = useState<'analytics' | 'projects' | 'certifications'>('analytics');
  const [analyticsData, setAnalyticsData] = useState<any[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [showAddProject, setShowAddProject] = useState(false);
  const [showAddCertification, setShowAddCertification] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editingCertification, setEditingCertification] = useState<Certification | null>(null);

  useEffect(() => {
    if (isOpen && isAuthenticated) {
      loadAnalyticsData();
      loadProjects();
      loadCertifications();
    }
  }, [isOpen, isAuthenticated]);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setPasswordError('');
      logger.info('Admin panel access granted');
    } else {
      setPasswordError('Incorrect password');
      logger.warn('Failed admin panel login attempt');
    }
  };

  const handleClose = () => {
    setIsAuthenticated(false);
    setPassword('');
    setPasswordError('');
    onClose();
  };

  const loadAnalyticsData = () => {
    try {
      const data = analytics.getStoredAnalytics();
      setAnalyticsData(data);
      logger.info('Analytics data loaded', { count: data.length });
    } catch (error) {
      logger.error('Error loading analytics data', { error });
    }
  };

  const loadProjects = () => {
    try {
      const stored = localStorage.getItem('admin_projects');
      if (stored) {
        setProjects(JSON.parse(stored));
      }
    } catch (error) {
      logger.error('Error loading projects', { error });
    }
  };

  const loadCertifications = () => {
    try {
      const stored = localStorage.getItem('admin_certifications');
      if (stored) {
        setCertifications(JSON.parse(stored));
      }
    } catch (error) {
      logger.error('Error loading certifications', { error });
    }
  };

  const saveProjects = (newProjects: Project[]) => {
    try {
      localStorage.setItem('admin_projects', JSON.stringify(newProjects));
      setProjects(newProjects);
      logger.info('Projects saved', { count: newProjects.length });
    } catch (error) {
      logger.error('Error saving projects', { error });
    }
  };

  const saveCertifications = (newCertifications: Certification[]) => {
    try {
      localStorage.setItem('admin_certifications', JSON.stringify(newCertifications));
      setCertifications(newCertifications);
      logger.info('Certifications saved', { count: newCertifications.length });
    } catch (error) {
      logger.error('Error saving certifications', { error });
    }
  };

  const addProject = (project: Omit<Project, 'id'>) => {
    const newProject = { ...project, id: Date.now().toString() };
    saveProjects([...projects, newProject]);
    setShowAddProject(false);
  };

  const updateProject = (updatedProject: Project) => {
    const updatedProjects = projects.map(p => p.id === updatedProject.id ? updatedProject : p);
    saveProjects(updatedProjects);
    setEditingProject(null);
  };

  const deleteProject = (id: string) => {
    saveProjects(projects.filter(p => p.id !== id));
  };

  const addCertification = (certification: Omit<Certification, 'id'>) => {
    const newCertification = { ...certification, id: Date.now().toString() };
    saveCertifications([...certifications, newCertification]);
    setShowAddCertification(false);
  };

  const updateCertification = (updatedCertification: Certification) => {
    const updatedCertifications = certifications.map(c => c.id === updatedCertification.id ? updatedCertification : c);
    saveCertifications(updatedCertifications);
    setEditingCertification(null);
  };

  const deleteCertification = (id: string) => {
    saveCertifications(certifications.filter(c => c.id !== id));
  };

  const getAnalyticsSummary = () => {
    if (analyticsData.length === 0) return null;

    const totalVisitors = analyticsData.length;
    const uniqueIPs = new Set(analyticsData.map(d => d.ipAddress)).size;
    const avgSessionDuration = analyticsData.reduce((acc, d) => acc + d.sessionDuration, 0) / totalVisitors;
    const totalClicks = analyticsData.reduce((acc, d) => acc + d.interactions.clicks, 0);
    const topCountries = analyticsData.reduce((acc, d) => {
      const country = d.location?.country || 'Unknown';
      acc[country] = (acc[country] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      totalVisitors,
      uniqueIPs,
      avgSessionDuration: Math.round(avgSessionDuration),
      totalClicks,
      topCountries: Object.entries(topCountries).sort(([,a], [,b]) => b - a).slice(0, 5)
    };
  };

  const summary = getAnalyticsSummary();

  if (!isOpen) return null;

  // Password Authentication Screen
  if (!isAuthenticated) {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-dark-800 rounded-2xl border border-white/20 w-full max-w-md p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center mb-6">
              <div className="bg-gradient-to-r from-primary-500 to-purple-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Admin Access</h2>
              <p className="text-gray-300">Enter password to access admin panel</p>
            </div>

            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  autoFocus
                />
                {passwordError && (
                  <p className="text-red-400 text-sm mt-2">{passwordError}</p>
                )}
              </div>

              <div className="flex space-x-3">
                <button
                  type="submit"
                  className="flex-1 py-3 bg-gradient-to-r from-primary-600 to-purple-600 text-white rounded-xl hover:shadow-glow transition-all font-medium"
                >
                  Access Panel
                </button>
                <button
                  type="button"
                  onClick={handleClose}
                  className="flex-1 py-3 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition-colors font-medium"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={handleClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-dark-800 rounded-2xl border border-white/20 w-full max-w-6xl max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <h2 className="text-2xl font-bold text-white">Admin Panel</h2>
            <button
              onClick={handleClose}
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-white/10">
            {[
              { id: 'analytics', label: 'Analytics', icon: Users },
              { id: 'projects', label: 'Projects', icon: Globe },
              { id: 'certifications', label: 'Certifications', icon: Award }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-6 py-4 font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'text-primary-400 border-b-2 border-primary-400'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <tab.icon className="h-5 w-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[60vh]">
            {activeTab === 'analytics' && (
              <div className="space-y-6">
                {summary && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div className="bg-white/5 rounded-xl p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <Users className="h-5 w-5 text-primary-400" />
                        <span className="text-gray-300">Total Visitors</span>
                      </div>
                      <div className="text-2xl font-bold text-white">{summary.totalVisitors}</div>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <Globe className="h-5 w-5 text-green-400" />
                        <span className="text-gray-300">Unique IPs</span>
                      </div>
                      <div className="text-2xl font-bold text-white">{summary.uniqueIPs}</div>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <Clock className="h-5 w-5 text-blue-400" />
                        <span className="text-gray-300">Avg Session</span>
                      </div>
                      <div className="text-2xl font-bold text-white">{summary.avgSessionDuration}s</div>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <MousePointer className="h-5 w-5 text-purple-400" />
                        <span className="text-gray-300">Total Clicks</span>
                      </div>
                      <div className="text-2xl font-bold text-white">{summary.totalClicks}</div>
                    </div>
                  </div>
                )}

                <div className="bg-white/5 rounded-xl p-4">
                  <h3 className="text-lg font-semibold text-white mb-4">Recent Visitors</h3>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {analyticsData.slice(-10).reverse().map((visitor, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                        <div>
                          <div className="text-white font-medium">{visitor.ipAddress}</div>
                          <div className="text-gray-400 text-sm">
                            {visitor.location?.country || 'Unknown'} • {visitor.browser.name}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-white">{visitor.sessionDuration}s</div>
                          <div className="text-gray-400 text-sm">
                            {new Date(visitor.timestamp).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'projects' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-white">Manage Projects</h3>
                  <button
                    onClick={() => setShowAddProject(true)}
                    className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add Project</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {projects.map((project) => (
                    <div key={project.id} className="bg-white/5 rounded-xl p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-white">{project.title}</h4>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => setEditingProject(project)}
                            className="text-blue-400 hover:text-blue-300 transition-colors"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => deleteProject(project.id)}
                            className="text-red-400 hover:text-red-300 transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      <p className="text-gray-300 text-sm mb-2">{project.description}</p>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {project.tags.map((tag) => (
                          <span key={tag} className="px-2 py-1 bg-white/10 text-gray-300 rounded text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center space-x-1 text-primary-400 hover:text-primary-300 text-sm"
                        >
                          <ExternalLink className="h-3 w-3" />
                          <span>View Project</span>
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'certifications' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-white">Manage Certifications</h3>
                  <button
                    onClick={() => setShowAddCertification(true)}
                    className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add Certification</span>
                  </button>
                </div>

                <div className="space-y-2">
                  {certifications.map((cert) => (
                    <div key={cert.id} className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                      <div>
                        <h4 className="font-semibold text-white">{cert.name}</h4>
                        <p className="text-gray-300">{cert.issuer} • {cert.date}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {cert.link && (
                          <a
                            href={cert.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary-400 hover:text-primary-300"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        )}
                        <button
                          onClick={() => setEditingCertification(cert)}
                          className="text-blue-400 hover:text-blue-300 transition-colors"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => deleteCertification(cert.id)}
                          className="text-red-400 hover:text-red-300 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Add Project Modal */}
        {showAddProject && (
          <ProjectModal
            onSave={addProject}
            onClose={() => setShowAddProject(false)}
          />
        )}

        {/* Edit Project Modal */}
        {editingProject && (
          <ProjectModal
            project={editingProject}
            onSave={updateProject}
            onClose={() => setEditingProject(null)}
          />
        )}

        {/* Add Certification Modal */}
        {showAddCertification && (
          <CertificationModal
            onSave={addCertification}
            onClose={() => setShowAddCertification(false)}
          />
        )}

        {/* Edit Certification Modal */}
        {editingCertification && (
          <CertificationModal
            certification={editingCertification}
            onSave={updateCertification}
            onClose={() => setEditingCertification(null)}
          />
        )}
      </motion.div>
    </AnimatePresence>
  );
};

const ProjectModal: React.FC<{
  project?: Project;
  onSave: (project: any) => void;
  onClose: () => void;
}> = ({ project, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    title: project?.title || '',
    category: project?.category || '',
    description: project?.description || '',
    tags: project?.tags.join(', ') || '',
    icon: project?.icon || '🚀',
    gradient: project?.gradient || 'from-blue-500 to-purple-600',
    link: project?.link || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const projectData = {
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean)
    };

    if (project) {
      onSave({ ...project, ...projectData });
    } else {
      onSave(projectData);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-60">
      <div className="bg-dark-800 rounded-xl p-6 w-full max-w-md max-h-[80vh] overflow-y-auto">
        <h3 className="text-xl font-bold text-white mb-4">
          {project ? 'Edit Project' : 'Add New Project'}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Project Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400"
            required
          />
          <input
            type="text"
            placeholder="Category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400"
            required
          />
          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 h-20 resize-none"
            required
          />
          <input
            type="text"
            placeholder="Tags (comma separated)"
            value={formData.tags}
            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400"
          />
          <input
            type="text"
            placeholder="Icon (emoji)"
            value={formData.icon}
            onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400"
          />
          <select
            value={formData.gradient}
            onChange={(e) => setFormData({ ...formData, gradient: e.target.value })}
            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
          >
            <option value="from-blue-500 to-purple-600">Blue to Purple</option>
            <option value="from-green-500 to-teal-600">Green to Teal</option>
            <option value="from-red-500 to-pink-600">Red to Pink</option>
            <option value="from-yellow-500 to-orange-600">Yellow to Orange</option>
            <option value="from-indigo-500 to-purple-600">Indigo to Purple</option>
            <option value="from-cyan-500 to-blue-600">Cyan to Blue</option>
          </select>
          <input
            type="url"
            placeholder="Project Link (optional)"
            value={formData.link}
            onChange={(e) => setFormData({ ...formData, link: e.target.value })}
            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400"
          />
          <div className="flex space-x-2">
            <button
              type="submit"
              className="flex-1 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              {project ? 'Update Project' : 'Add Project'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const CertificationModal: React.FC<{
  certification?: Certification;
  onSave: (certification: any) => void;
  onClose: () => void;
}> = ({ certification, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    name: certification?.name || '',
    issuer: certification?.issuer || '',
    date: certification?.date || '',
    link: certification?.link || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (certification) {
      onSave({ ...certification, ...formData });
    } else {
      onSave(formData);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-60">
      <div className="bg-dark-800 rounded-xl p-6 w-full max-w-md">
        <h3 className="text-xl font-bold text-white mb-4">
          {certification ? 'Edit Certification' : 'Add New Certification'}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Certification Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400"
            required
          />
          <input
            type="text"
            placeholder="Issuer"
            value={formData.issuer}
            onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400"
            required
          />
          <input
            type="text"
            placeholder="Date (e.g., Jun. 2024)"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400"
            required
          />
          <input
            type="url"
            placeholder="Certification Link (optional)"
            value={formData.link}
            onChange={(e) => setFormData({ ...formData, link: e.target.value })}
            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400"
          />
          <div className="flex space-x-2">
            <button
              type="submit"
              className="flex-1 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              {certification ? 'Update Certification' : 'Add Certification'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};