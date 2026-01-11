import React, { useState } from 'react';
import { Project, AppState } from './types';
import { ProjectDashboard } from './components/ProjectDashboard';
import { Workspace } from './components/Workspace';
import { updateProjectData } from './utils/storage';

function App() {
  const [currentProject, setCurrentProject] = useState<Project | null>(null);

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

  if (!currentProject) {
    return (
      <ProjectDashboard
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
