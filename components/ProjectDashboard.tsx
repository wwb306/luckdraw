import React, { useState, useEffect } from 'react';
import { Project } from '../types';
import { getProjects, createProject, deleteProject } from '../utils/storage';
import { Plus, Trash2, ExternalLink, Calendar, Package, Lock, Shield } from 'lucide-react';

interface ProjectDashboardProps {
  onSelectProject: (project: Project) => void;
}

export function ProjectDashboard({ onSelectProject }: ProjectDashboardProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectDesc, setNewProjectDesc] = useState('');
  const [newProjectPassword, setNewProjectPassword] = useState('');

  // Password Verification Modal State
  const [verifyingProject, setVerifyingProject] = useState<Project | null>(null);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = () => {
    setProjects(getProjects());
  };

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjectName.trim()) return;
    
    const project = createProject(newProjectName, newProjectDesc, newProjectPassword || undefined);
    onSelectProject(project);
    setIsModalOpen(false);
    resetCreateForm();
  };

  const resetCreateForm = () => {
    setNewProjectName('');
    setNewProjectDesc('');
    setNewProjectPassword('');
  };

  const handleDeleteProject = (e: React.MouseEvent, projectId: string) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this project? This cannot be undone.')) {
      deleteProject(projectId);
      loadProjects();
    }
  };

  const handleProjectClick = (project: Project) => {
    if (project.password) {
      setVerifyingProject(project);
      setPasswordInput('');
      setPasswordError(false);
    } else {
      onSelectProject(project);
    }
  };

  const handleVerifyPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (verifyingProject && passwordInput === verifyingProject.password) {
      onSelectProject(verifyingProject);
      setVerifyingProject(null);
    } else {
      setPasswordError(true);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <header className="bg-slate-800 border-b border-slate-700 p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Package className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Lucky Draw Pro</h1>
              <p className="text-xs text-slate-400">Local Management</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Your Projects</h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Plus className="w-5 h-5" />
            New Project
          </button>
        </div>

        {projects.length === 0 ? (
          <div className="text-center py-20 bg-slate-800 rounded-xl border border-slate-700 border-dashed">
            <Package className="w-16 h-16 mx-auto text-slate-600 mb-4" />
            <h3 className="text-xl font-semibold text-slate-300">No projects yet</h3>
            <p className="text-slate-500 mt-2">Create your first lottery event to get started.</p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="mt-6 text-blue-400 hover:text-blue-300 font-medium"
            >
              Create a project
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                onClick={() => handleProjectClick(project)}
                className="bg-slate-800 rounded-xl border border-slate-700 p-6 hover:border-blue-500 hover:shadow-lg transition-all cursor-pointer group relative overflow-hidden"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-2 truncate pr-8">
                    <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors truncate">
                      {project.name}
                    </h3>
                    {project.password && <Lock className="w-3.5 h-3.5 text-slate-500" />}
                  </div>
                  <button
                    onClick={(e) => handleDeleteProject(e, project.id)}
                    className="text-slate-500 hover:text-red-400 transition-colors p-1"
                    title="Delete Project"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                
                <p className="text-slate-400 text-sm mb-6 line-clamp-2 h-10">
                  {project.description || 'No description'}
                </p>

                <div className="flex items-center justify-between text-xs text-slate-500 border-t border-slate-700 pt-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(project.updatedAt).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-1 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    Open <ExternalLink className="w-3 h-3" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* New Project Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md text-gray-900">
            <h3 className="text-xl font-bold mb-4">Create New Project</h3>
            <form onSubmit={handleCreateProject} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Project Name
                </label>
                <input
                  type="text"
                  required
                  autoFocus
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  placeholder="e.g. Annual Meeting 2025"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description (Optional)
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  value={newProjectDesc}
                  onChange={(e) => setNewProjectDesc(e.target.value)}
                  placeholder="Brief description of the event"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password (Optional)
                </label>
                <div className="relative">
                  <input
                    type="password"
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    value={newProjectPassword}
                    onChange={(e) => setNewProjectPassword(e.target.value)}
                    placeholder="Set a password for this project"
                  />
                  <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
                <p className="text-xs text-gray-400 mt-1">Leave blank for no password protection.</p>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => { setIsModalOpen(false); resetCreateForm(); }}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!newProjectName.trim()}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50"
                >
                  Create Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Password Verification Modal */}
      {verifyingProject && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-[60]">
          <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-sm text-gray-900">
            <div className="flex items-center gap-3 mb-4 text-blue-600">
              <Shield className="w-8 h-8" />
              <h3 className="text-xl font-bold">Password Required</h3>
            </div>
            <p className="text-sm text-gray-600 mb-6">
              Please enter the password to access <strong>{verifyingProject.name}</strong>.
            </p>
            <form onSubmit={handleVerifyPassword} className="space-y-4">
              <div>
                <input
                  type="password"
                  autoFocus
                  required
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 outline-none ${
                    passwordError 
                      ? 'border-red-500 focus:ring-red-200' 
                      : 'border-gray-300 focus:ring-blue-500'
                  }`}
                  value={passwordInput}
                  onChange={(e) => {
                    setPasswordInput(e.target.value);
                    setPasswordError(false);
                  }}
                  placeholder="Enter password"
                />
                {passwordError && (
                  <p className="text-xs text-red-500 mt-1">Incorrect password. Please try again.</p>
                )}
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setVerifyingProject(null)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  Verify & Open
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
