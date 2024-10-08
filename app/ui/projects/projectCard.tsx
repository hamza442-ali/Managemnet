import Image from 'next/image';
import { EditProject, DeleteProject } from './buttons'; 

export type Project = {
  id: string;
  companyName: string;
  imageUrl: string;
  description: string;
  fundraisingStatus: string;
  projectType: string;
  location: string;
  fundingGoal: number;
};

interface ProjectCardProps {
  project: Project;
  onClick: (projectId: string) => void; // Function to handle card click
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  return (
    <div
      className="rounded-lg border border-gray-200 bg-white shadow-md transition-transform transform hover:scale-105 cursor-pointer"
      onClick={() => onClick(project.id)} // Handle card click
    >
      <Image
        src={project.imageUrl}
        alt={`${project.companyName} project picture`}
        width={400}
        height={200}
        className="rounded-t-lg object-cover w-full h-48"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold">{project.companyName}</h2>
        <p className="mt-2 text-gray-600">{project.description}</p>
        <div className="mt-4 flex justify-between">
          <div>
            <p className="text-sm font-medium">Status: {project.fundraisingStatus}</p>
            <p className="text-sm">Type: {project.projectType}</p>
            <p className="text-sm">Location: {project.location}</p>
            <p className="text-sm">Goal: ${project.fundingGoal}</p>
          </div>
          <div className="flex gap-2">
            <EditProject id={project.id} />
            <DeleteProject id={project.id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
