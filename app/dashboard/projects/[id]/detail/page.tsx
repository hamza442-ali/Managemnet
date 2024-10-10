
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import {  fetchProjectById } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import ProjectDetail from '@/app/ui/projects/project-detail';
 
export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const [project] = await Promise.all([
       fetchProjectById(id)
      ]);
      if (!project) {
        notFound();
      }

      console.log(project, " Fetched Project")

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/project' },
          {
            label: 'Project Detail',
            href: `/dashboard/projects/${id}/detail`,
            active: true,
          },
        ]}
      />
        <ProjectDetail project={project}/>
     
    </main>
  );
}