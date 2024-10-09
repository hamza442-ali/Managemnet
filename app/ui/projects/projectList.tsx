'use client'

import { useState, useEffect } from 'react';
import ProjectCard from './projectCard';
import { fetchProjects } from '@/app/lib/data'; 
import { ProjectField } from '@/app/lib/definitions';

export default function ProjectList() {
  const [projects, setProjects] = useState<ProjectField[]>([]);

  useEffect(() => {
    const loadProjects = async () => {
      const fetchedProjects = await fetchProjects();
      setProjects(fetchedProjects);
    };

    loadProjects();
  }, []);

  const handleProjectClick = (projectId: string) => {
    // Implement logic to show detailed information about the project
    console.log(`Project clicked: ${projectId}`);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} onClick={handleProjectClick} />
      ))}
    </div>
  );
}
