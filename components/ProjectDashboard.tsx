import React, { useState, useEffect } from 'react';
import { User, Project } from '../types';
import { getProjects, createProject, deleteProject } from '../utils/storage';
import { LogOut, Plus, Trash2, ExternalLink, Calendar, Package } from 'lucide-react';

interface ProjectDashboardProps {
  user: User;
  onLogout: () => void;
  onSelectProject: (project: Project) => void;
}

export function ProjectDashboard({ user, onLogout, onSelectProject }: ProjectDashboardProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectDesc, setNewProjectDesc] = useState('');

  useEffect(() => {
    loadProjects();
  }, [user.id]);

  const loadProjects = () => {
    setProjects(getProjects(user.id));
  };

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjectName.trim()) return;
    
    const project = createProject(user.id, newProjectName, newProjectDesc);
    onSelectProject(project);
    setIsModalOpen(false);
    setNewProjectName('');
    setNewProjectDesc('');
  };

  const handleDeleteProject = (e: React.MouseEvent, projectId: string) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this project? This cannot be undone.')) {
      deleteProject(projectId);
      loadProjects();
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
              <p className="text-xs text-slate-400">Welcome, {user.name}</p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 text-sm"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
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
                onClick={() => onSelectProject(project)}
                className="bg-slate-800 rounded-xl border border-slate-700 p-6 hover:border-blue-500 hover:shadow-lg transition-all cursor-pointer group relative overflow-hidden"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors truncate pr-8">
                    {project.name}
                  </h3>
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
              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
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
    </div>
  );
}
