"use server";

import { z } from "zod";
import { sql } from "@vercel/postgres";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';


const FormSchema = z.object({
  id: z.string(),
  customerId: z.string({
    invalid_type_error: 'Please select a customer.',
  }),
  amount: z.coerce
    .number()
    .gt(0, { message: 'Please enter an amount greater than $0.' }),
  status: z.enum(['pending', 'paid'], {
    invalid_type_error: 'Please select an invoice status.',
  }),
  date: z.string(),
});

const CreateInvoice = FormSchema.omit({ id: true, date: true });
const UpdateInvoice = FormSchema.omit({ id: true, date: true });


export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};



export async function createInvoice(prevState: State, formData: FormData) {
  // Validate form using Zod
  const validatedFields = CreateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });
 
  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.',
    };
  }
 
  // Prepare data for insertion into the database
  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0];
 
  // Insert data into the database
  try {
    await sql`
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    console.log(error)
    return {
      message: 'Database Error: Failed to Create Invoice.',
    };
  }
 
  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function updateInvoice(
  id: string,
  prevState: State,
  formData: FormData,
) {
  const validatedFields = UpdateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });
 
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Invoice.',
    };
  }
 
  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;
 
  try {
    await sql`
      UPDATE invoices
      SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
      WHERE id = ${id}
    `;
  } catch (error) {
    return { message: 'Database Error: Failed to Update Invoice.', error};
  }
 
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function deleteInvoice(id: string) {
  try {
    await sql`DELETE FROM invoices WHERE id = ${id}`;
    revalidatePath('/dashboard/invoices');
    return { message: 'Deleted Invoice.' };
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Invoice.', error };
  }
}


export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}


// Define the validation schema for the project
const ProjectSchema = z.object({
  project_name: z.string().min(1, { message: 'Project name is required.' }),
  project_company_name: z.string().min(1, { message: 'Company name is required.' }),
  project_description: z.string().min(1, { message: 'Project description is required.' }),
  image_url: z.string().url({ message: 'Invalid URL format for image.' }),
  fundraising_status: z.enum(['ongoing', 'completed'], {
    invalid_type_error: 'Please select a fundraising status.',
  }),
  project_type: z.string().min(1, { message: 'Project type is required.' }),
  location: z.string().min(1, { message: 'Location is required.' }),
  funding_goal: z.coerce.number().gt(0, { message: 'Funding goal must be greater than $0.' }),
});

export async function createProject(formData: FormData) {
  // Validate form using Zod
  const validatedFields = ProjectSchema.safeParse({
    project_name: formData.get('project_name'),
    project_company_name: formData.get('project_company_name'),
    project_description: formData.get('project_description'),
    image_url: formData.get('image_url'),
    fundraising_status: formData.get('fundraising_status'),
    project_type: formData.get('project_type'),
    location: formData.get('location'),
    funding_goal: formData.get('funding_goal'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Project.',
    };
  }

  // Prepare data for insertion into the database
  const { project_name, project_company_name, project_description, image_url, fundraising_status, project_type, location, funding_goal } = validatedFields.data;

  // Insert data into the database
  try {
    await sql`
      INSERT INTO projects (project_name, project_company_name, project_description, image_url, fundraising_status, project_type, location, funding_goal)
      VALUES (${project_name}, ${project_company_name}, ${project_description}, ${image_url}, ${fundraising_status}, ${project_type}, ${location}, ${funding_goal})
    `;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    console.log(error);
    
    return {
      message: 'Database Error: Failed to Create Project.',
    };
  }

  // Revalidate the cache for the projects page and redirect the user.
  revalidatePath('/dashboard/projects');
  redirect('/dashboard/projects');
}