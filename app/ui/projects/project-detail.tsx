import { ProjectField } from "@/app/lib/definitions";
import Image from "next/image";

export default function ProjectDetail({
  project,
}: {
  project: ProjectField;
}) {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      {/* Project Image Container */}
      <div className="w-full h-64 overflow-hidden rounded-lg">
        <Image
          src={project.image_url}
          alt={project.project_name}
          width={600}
          height={300}
          className="w-full h-full object-cover" // Ensures the image covers the div without overflow
        />
      </div>

      {/* Project Details */}
      <div className="mt-6">
        <h1 className="text-3xl font-semibold mb-2">{project.project_name}</h1>
        <p className="text-lg text-gray-600 mb-4">{project.project_company_name}</p>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Funding Goal</p>
            <p className="text-lg font-medium">${project.funding_goal}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Location</p>
            <p className="text-lg font-medium">{project.location}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Fundraising Status</p>
            <p
              className={`text-lg font-medium ${
                project.fundraising_status === "Active"
                  ? "text-red-500"
                  : "text-green-500"
              }`}
            >
              {project.fundraising_status}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Project Type</p>
            <p className="text-lg font-medium">{project.project_type}</p>
          </div>
        </div>

        {/* Project Description */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold">Description</h2>
          <p className="text-gray-700 mt-2">{project.project_description}</p>
        </div>
      </div>
    </div>
  );
}
