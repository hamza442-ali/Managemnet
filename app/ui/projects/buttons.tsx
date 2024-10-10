import { PencilIcon, TrashIcon, PlusIcon,EyeIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
// import { deleteProject } from '@/app/lib/actions'; // Assuming this function exists


export function EditProject({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/projects/${id}/edit`}
      className="flex items-center justify-center w-10 h-10 rounded-md border hover:bg-gray-100"
    >
      <PencilIcon className="w-4 h-4 " />
    </Link>
  );
}
export function DeleteProject({ id }: { id: string }) {
  //   const deleteProjectWithId = deleteProject.bind(null, id);
  console.log(id)
  
    return (
      // <form action={deleteProjectWithId}>
      <form>
        <button className="flex items-center justify-center w-10 h-10 rounded-md border hover:bg-red-600 hover:text-white">
          <span className="sr-only">Delete</span>
          <TrashIcon className="w-4 h-4" />
        </button>
      </form>
    );
  }
  
  export function ViewProjectDetails({ id }: { id: string }) {
    console.log(id, " Project id ")
    return (
      <div className="relative group">
        <Link
          href={`/dashboard/projects/${id}/detail`}
          className="flex items-center justify-center w-[96px] h-10 rounded-md bg-blue-600 text-white hover:bg-blue-500 transition-colors" 
        >
          <EyeIcon className="w-5 h-5 text-white" />
        </Link>
        
        {/* Tooltip */}
        <span className="absolute left-1/2 transform -translate-x-1/2 -translate-y-10 bg-blue-500 text-white text-xs rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity ">
          View Detail
        </span>
      </div>
    );
  }
export function CreateProject() {
  return (
    <Link
      href="/dashboard/projects/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create Project</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}


