
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { Button } from '@/components/ui/button'
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import Link from 'next/link'
import { redirect } from 'next/navigation';
import React, { use } from 'react'
import { authOptions } from '../api/auth/[...nextauth]/route';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import EditProfile from './EditProfile/page';
import { ChevronRight } from 'lucide-react';

export default async function Page() {
  const session = await getServerSession(authOptions);  //get the current session

  if (!session) {      //if no session then redirect 
    redirect('/api/auth/signin');
  }

  const currentUserEmail = session?.user?.email!;   //get logged user email
  const user = await prisma.user.findUnique({        //find the user in db 
    where: {
      email: currentUserEmail,
    },
  });

  return (
  <div className='flex flex-row'>
    <MaxWidthWrapper>
      <div className='text-white flex flex-row mt-20 gap-5 bg-gray-800 p-6'>
        {user?.image && <img src={user.image} width="200px" height="200px"/>}
          <div className='flex flex-col'>
          <h1>Name: {user?.name}</h1>
          <p>Bio: {user?.bio}</p>
          <p>Age: {user?.age}</p>
          <p>Email: {user?.email}</p>
          <div>
          <Dialog>
          <DialogTrigger>
            <Button className='mt-5 mr-4'>
                <p>Edit Profile</p>
            </Button>
          </DialogTrigger>

          <DialogContent className='bg-slate-700'>
              <EditProfile />
          </DialogContent>
        </Dialog>

          <Link  href='/watchlist'>
          <Button className='mt-5'>
            <p>Your Watchlist</p>
          </Button>
          </Link>
        </div>
        </div>
      </div>
      
    </MaxWidthWrapper>
  </div>
  )
}
