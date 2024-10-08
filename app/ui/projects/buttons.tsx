import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
// import { deleteProject } from '@/app/lib/actions'; // Assuming this function exists

export function EditProject({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/projects/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteProject({ id }: { id: string }) {
//   const deleteProjectWithId = deleteProject.bind(null, id);
console.log(id)

  return (
    // <form action={deleteProjectWithId}>
    <form>
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}
