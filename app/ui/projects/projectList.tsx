// 'use client'

// import ProjectCard from './projectCard';
import { fetchProjects } from "@/app/lib/data";
import Image from "next/image";
import { EditProject, DeleteProject, ViewProjectDetails } from "./buttons";
// import { ProjectField } from "@/app/lib/definitions";

export default async function ProjectList() {
  const projects = await fetchProjects();
  //   console.log(projects, " Project");
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {projects?.map((project) => (
        // <ProjectCard key={project.id} project={project}  />
        <div
          className="rounded-lg border border-gray-200 bg-white shadow-md transition-transform transform hover:scale-105 cursor-pointer"
          // onClick={() => onClick(project.id)} // Handle card click
          key={project.id}
        >
          <Image
            src={project.image_url}
            alt={`${project.image_url}`}
            width={400}
            height={200}
            className="rounded-t-lg object-cover w-full h-48"
          />
          <div className="p-4">
            <h2 className="text-xl font-semibold">
              {project.project_company_name}
            </h2>
            <div className="flex flex-row gap-2 ">
              <p className="text-sm bg-caribbean text-white inline-block rounded-md px-2 py-1">
                {" "}
                ${project.funding_goal}
              </p>
              <p className="text-sm bg-caribbean text-white inline-block rounded-md px-2 py-1">
                {" "}
                {project.project_type}
              </p>
            </div>
          </div>
          <div className="flex justify-between items-start p-4">
            <div className="flex flex-col">
              <p className="text-sm bg-aquamarine text-darkgreen inline-block rounded-md px-2 py-1 mt-4">
                {project.project_name}
              </p>
              <div className="flex flex-row gap-2 mt-4">
                <p className="text-sm bg-straw text-darkgreen inline-block rounded-md px-2 py-1">
                  {project.location}
                </p>
                <p className="text-sm bg-aquamarine text-darkgreen inline-block rounded-md px-2 py-1">
                  {project.fundraising_status}
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center">
              <div className="flex gap-2 mb-2">
                <EditProject id={project.id} />
                <DeleteProject id={project.id} />
              </div>

              <ViewProjectDetails id={project.id} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
