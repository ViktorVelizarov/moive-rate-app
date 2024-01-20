import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { getServerSession } from 'next-auth';
import React from 'react'
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { authOptions } from '../api/auth/[...nextauth]/route';

export default async function page() {

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
    const userRatings = await prisma.rating.findMany({
      where: {
        userId: user?.id,
      },
    });

  return (
    <div className='text-white'>
    <MaxWidthWrapper>
      <div className='text-white  mt-20 gap-5 bg-gray-800 p-6'>
        <div className='flex flex-row items-center'>
            <span className='text-yellowImport text-2xl font-bold mr-2'>|</span>
            <h1 className='text-white text-left text-3xl font-bold'>Your Ratings:</h1>
        </div>

        <div className='mt-5'>
        {userRatings.map((item) =>  (
          <>
             <p> {item.movie_id}</p>
             <p> {item.rating}</p>
             </>
             ))} 
        </div>
      </div>
    </MaxWidthWrapper>
    </div>
  )
}
