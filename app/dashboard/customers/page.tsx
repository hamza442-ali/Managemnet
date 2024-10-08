import { Metadata } from 'next';
import CustomersTable from '@/app/ui/customers/table';
// import { fetchCustomers } from '@/app/lib/data';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Customers',
};

export default async function Page() {
  // const customers = await fetchCustomers();

  return (
    <div className="w-full">
      <div className="mt-6">
        <Suspense>
        <CustomersTable/>
        </Suspense>
      </div>
    </div>
  );
}
