// pages/api/wishlist.ts
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { redirect } from 'next/navigation';
import { NextResponse } from "next/server";

export async function PUT(req: Request) {  //check if 

    const session = await getServerSession(authOptions);
    const currentUserEmail = session?.user?.email!; 
    const movieTitle = await req.json() 
    const currentUser = await prisma.user.findUnique({     
        where: {
          email: currentUserEmail,
        },
      });

    if(currentUser?.watchList.includes(movieTitle)){
        return NextResponse.json(true)
    }
    else{
        return NextResponse.json(false)
    }
}