import { Project, AppState } from '../types';

const STORAGE_KEYS = {
  PROJECTS: 'luckydraw_projects'
};

// --- Project Operations ---

export const getProjects = (): Project[] => {
  const projectsJson = localStorage.getItem(STORAGE_KEYS.PROJECTS);
  return projectsJson ? JSON.parse(projectsJson) : [];
};

export const saveProject = (project: Project): void => {
  const projectsJson = localStorage.getItem(STORAGE_KEYS.PROJECTS);
  const allProjects: Project[] = projectsJson ? JSON.parse(projectsJson) : [];
  
  const existingIndex = allProjects.findIndex(p => p.id === project.id);
  
  const updatedProject = {
      ...project,
      updatedAt: Date.now()
  }

  if (existingIndex >= 0) {
    allProjects[existingIndex] = updatedProject;
  } else {
    allProjects.push(updatedProject);
  }
  
  localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(allProjects));
};

export const createProject = (name: string, description?: string, password?: string): Project => {
  const newProject: Project = {
    id: crypto.randomUUID(),
    name,
    description,
    password,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    data: {
      participants: [],
      prizes: []
    }
  };
  
  saveProject(newProject);
  return newProject;
};

export const deleteProject = (projectId: string): void => {
  const projectsJson = localStorage.getItem(STORAGE_KEYS.PROJECTS);
  if (!projectsJson) return;
  
  const allProjects: Project[] = JSON.parse(projectsJson);
  const filteredProjects = allProjects.filter(p => p.id !== projectId);
  
  localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(filteredProjects));
};

export const updateProjectData = (projectId: string, data: Partial<AppState>): void => {
    const projectsJson = localStorage.getItem(STORAGE_KEYS.PROJECTS);
    if (!projectsJson) return;

    const allProjects: Project[] = JSON.parse(projectsJson);
    const projectIndex = allProjects.findIndex(p => p.id === projectId);

    if (projectIndex >= 0) {
        const project = allProjects[projectIndex];
        // Only update persistent parts of data
        if (data.participants) project.data.participants = data.participants;
        if (data.prizes) project.data.prizes = data.prizes;
        
        project.updatedAt = Date.now();
        allProjects[projectIndex] = project;
        localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(allProjects));
    }
};
