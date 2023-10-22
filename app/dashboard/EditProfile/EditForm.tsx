'use client';
import { Button } from "@/components/ui/button";
import React from "react"

export function EditForm({ user }: any) {

  const updateUser = async (e: React.FormEvent<HTMLFormElement>) => {
    
    e.preventDefault(); //this line makes it so the page doesnt refresh on form submit
    
    const formData = new FormData(e.currentTarget);

    const body = {        //here we collect the formData submited in the form
      name: formData.get('name'),
      bio: formData.get('bio'),
      age: formData.get('age'),
      image: formData.get('image'),
      id: user.id
    };

    const res = await fetch('/api/user', {   //we send the collected info to a api endpoint
      method: 'PUT',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    await res.json();
  };

  return (
    <div className="flex flex-col text-white">
      <h2 className="text-yellowImport font-semibold text-2xl text-center">Edit Your Profile</h2>
      <form className="flex flex-col" onSubmit={updateUser}>
        <label className="mt-5" htmlFor="name">Name</label>
        <input className="text-black" type="text" name="name" defaultValue={user?.name ?? ''} />
        <label className="mt-5" htmlFor="bio">Bio</label>
        <textarea className="text-black"
          name="bio"
          cols={30}
          rows={10}
          defaultValue={user?.bio ?? ''}
        ></textarea>
        <label className="mt-5" htmlFor="age">Age</label>
        <input className="text-black" type="text" name="age" defaultValue={user?.age ?? 0} />
        <label className="mt-5" htmlFor="image">Profile Image URL</label>
        <input className="text-black" type="text" name="image" defaultValue={user?.image ?? ''} />
        <Button className="mt-5">
         <button type="submit">Save</button>
        </Button>
       
      </form>
    </div>
  );
}