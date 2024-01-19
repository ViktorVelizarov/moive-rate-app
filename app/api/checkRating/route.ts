// api/checkRating
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { redirect } from 'next/navigation';
import { NextResponse } from "next/server";

export async function PUT(req: Request) {  //check if 

    const session = await getServerSession(authOptions);
    const currentUserEmail = session?.user?.email!; 
    const movie_id = await req.json() 
    const currentUser = await prisma.user.findUnique({     
        where: {
          email: currentUserEmail,
        },  
      });
    const userRating = await prisma.rating.findFirst({ 
        where: {
          userId: currentUser?.id,
          movie_id: movie_id.toString()
        },
    });
    if(userRating)
    {
        return NextResponse.json(userRating.rating)
    }
    else{
        return NextResponse.json(0)
    }

}