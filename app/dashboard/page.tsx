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
  <>
    <MaxWidthWrapper>
      <div className='text-white'>
        <h1 className='mt-5'>{user?.name}</h1>
        {user?.image && <img className='mt-5' src={user.image} width="200px" height="200px"/>}
        <p>{user?.bio}</p>
        <p>{user?.email}</p>
      </div>

      <Dialog>
        <DialogTrigger>
          <Button className='mt-5'>
              <p>Edit profile</p>
          </Button>
        </DialogTrigger>

        <DialogContent className='bg-slate-700'>
          <div className='flex flex-col items-center'>
            <EditProfile/>
          </div>
        </DialogContent>
      </Dialog>
      
    </MaxWidthWrapper>
  </>
  )
}
