import Image from 'next/image';
import { EditProject, DeleteProject } from './buttons'; 
import { ProjectField } from '@/app/lib/definitions';

interface ProjectCardProps {
  project: ProjectField;
  onClick: (projectId: string) => void; // Function to handle card click
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  return (
    <div
      className="rounded-lg border border-gray-200 bg-white shadow-md transition-transform transform hover:scale-105 cursor-pointer"
      onClick={() => onClick(project.id)} // Handle card click
    >
      <Image
        src={project.image_url}
        alt={`${project.project_company_name} project picture`}
        width={400}
        height={200}
        className="rounded-t-lg object-cover w-full h-48"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold">{project.project_company_name}</h2>
        <p className="mt-2 text-gray-600">{project.project_description}</p>
        <div className="mt-4 flex justify-between">
          <div>
            <p className="text-sm font-medium">Status: {project.fundraising_status}</p>
            <p className="text-sm">Type: {project.project_type}</p>
            <p className="text-sm">Location: {project.location}</p>
            <p className="text-sm">Goal: ${project.funding_goal}</p>
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
