import React, { useState } from 'react';
import { User, Project, AppState } from './types';
import { LoginScreen } from './components/LoginScreen';
import { ProjectDashboard } from './components/ProjectDashboard';
import { Workspace } from './components/Workspace';
import { updateProjectData } from './utils/storage';

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentProject(null);
  };

  const handleSelectProject = (project: Project) => {
    setCurrentProject(project);
  };

  const handleExitProject = () => {
    setCurrentProject(null);
  };

  const handleSaveProject = (data: Partial<AppState>) => {
    if (currentProject) {
      updateProjectData(currentProject.id, data);
    }
  };

  if (!currentUser) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  if (!currentProject) {
    return (
      <ProjectDashboard
        user={currentUser}
        onLogout={handleLogout}
        onSelectProject={handleSelectProject}
      />
    );
  }

  return (
    <Workspace
      project={currentProject}
      onSave={handleSaveProject}
      onExit={handleExitProject}
    />
  );
}

export default App;
