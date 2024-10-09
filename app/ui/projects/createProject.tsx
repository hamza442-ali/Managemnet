"use client";

import { useState } from "react";
import { createProject } from '@/app/lib/actions'; 

// Define the type for the errors object
type Errors = {
  project_name?: string[];
  project_company_name?: string[];
  project_description?: string[];
  image_url?: string[];
  fundraising_status?: string[];
  project_type?: string[];
  location?: string[];
  funding_goal?: string[];
};

export default function ProjectForm() {
  const [formState, setFormState] = useState({
    project_name: "",
    project_company_name: "",
    project_description: "",
    image_url: "",
    fundraising_status: "ongoing",
    project_type: "",
    location: "",
    funding_goal: "",
  });

  const [errors, setErrors] = useState<Errors>({});
  const [message, setMessage] = useState<string | null>(null);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    setMessage(null);

    // Create a new FormData object and populate it with the form data
    const formData = new FormData();
    Object.entries(formState).forEach(([key, value]) => formData.append(key, value));

    // Call the createProject action
    const response = await createProject(formData);

    // Check for validation or database errors
    if (response.errors) {
      setErrors(response.errors);
    } else if (response.message) {
      setMessage(response.message);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create New Project</h1>
      {message && <p className="mb-4 text-red-600">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="project_name" className="block mb-1 font-medium">
            Project Name
          </label>
          <input
            type="text"
            name="project_name"
            value={formState.project_name}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
          {errors.project_name && <p className="text-red-600">{errors.project_name[0]}</p>}
        </div>

        <div>
          <label htmlFor="project_company_name" className="block mb-1 font-medium">
            Company Name
          </label>
          <input
            type="text"
            name="project_company_name"
            value={formState.project_company_name}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
          {errors.project_company_name && <p className="text-red-600">{errors.project_company_name[0]}</p>}
        </div>

        <div>
          <label htmlFor="project_description" className="block mb-1 font-medium">
            Project Description
          </label>
          <textarea
            name="project_description"
            value={formState.project_description}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
          {errors.project_description && <p className="text-red-600">{errors.project_description[0]}</p>}
        </div>

        <div>
          <label htmlFor="image_url" className="block mb-1 font-medium">
            Image URL
          </label>
          <input
            type="url"
            name="image_url"
            value={formState.image_url}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
          {errors.image_url && <p className="text-red-600">{errors.image_url[0]}</p>}
        </div>

        <div>
          <label htmlFor="fundraising_status" className="block mb-1 font-medium">
            Fundraising Status
          </label>
          <select
            name="fundraising_status"
            value={formState.fundraising_status}
            onChange={handleChange}
            className="w-full border rounded p-2"
          >
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
          </select>
          {errors.fundraising_status && <p className="text-red-600">{errors.fundraising_status[0]}</p>}
        </div>

        <div>
          <label htmlFor="project_type" className="block mb-1 font-medium">
            Project Type
          </label>
          <input
            type="text"
            name="project_type"
            value={formState.project_type}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
          {errors.project_type && <p className="text-red-600">{errors.project_type[0]}</p>}
        </div>

        <div>
          <label htmlFor="location" className="block mb-1 font-medium">
            Location
          </label>
          <input
            type="text"
            name="location"
            value={formState.location}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
          {errors.location && <p className="text-red-600">{errors.location[0]}</p>}
        </div>

        <div>
          <label htmlFor="funding_goal" className="block mb-1 font-medium">
            Funding Goal
          </label>
          <input
            type="number"
            name="funding_goal"
            value={formState.funding_goal}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
          {errors.funding_goal && <p className="text-red-600">{errors.funding_goal[0]}</p>}
        </div>

        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
          Create Project
        </button>
      </form>
    </div>
  );
}
