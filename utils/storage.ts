import { User, Project, AppState } from '../types';

const STORAGE_KEYS = {
  USERS: 'luckydraw_users',
  PROJECTS: 'luckydraw_projects'
};

// --- User Operations ---

export const getUsers = (): User[] => {
  const usersJson = localStorage.getItem(STORAGE_KEYS.USERS);
  return usersJson ? JSON.parse(usersJson) : [];
};

export const saveUser = (user: User): void => {
  const users = getUsers();
  const existingIndex = users.findIndex(u => u.id === user.id);
  if (existingIndex >= 0) {
    users[existingIndex] = user;
  } else {
    users.push(user);
  }
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
};

export const loginUser = (name: string): User => {
  const users = getUsers();
  let user = users.find(u => u.name.trim().toLowerCase() === name.trim().toLowerCase());
  
  if (!user) {
    user = {
      id: crypto.randomUUID(),
      name: name.trim(),
      createdAt: Date.now()
    };
    saveUser(user);
  }
  
  return user;
};

// --- Project Operations ---

export const getProjects = (userId: string): Project[] => {
  const projectsJson = localStorage.getItem(STORAGE_KEYS.PROJECTS);
  const allProjects: Project[] = projectsJson ? JSON.parse(projectsJson) : [];
  return allProjects.filter(p => p.ownerId === userId);
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

export const createProject = (ownerId: string, name: string, description?: string): Project => {
  const newProject: Project = {
    id: crypto.randomUUID(),
    ownerId,
    name,
    description,
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
