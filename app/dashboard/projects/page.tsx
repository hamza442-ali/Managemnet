
import ProjectList from "@/app/ui/projects/projectList"
// import ProjectForm from "@/app/ui/projects/createProject"
import { lusitana } from '@/app/ui/fonts';
import Search from '@/app/ui/search';
import { Suspense } from 'react';
import { CreateProject } from "@/app/ui/projects/buttons";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects',
};


export default async function Page() {
  return (
    // 
    <>
     <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Projects</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
      <Suspense >
        <Search placeholder="Search Projects..." />
        <CreateProject />
      </Suspense>
      </div>
       <Suspense >
       <div><ProjectList/></div>
      </Suspense>
      {/* <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div> */}
    </div>
    
    </>
  )
}



