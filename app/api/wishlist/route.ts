// pages/api/wishlist.ts
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { redirect } from 'next/navigation';
import { NextResponse } from "next/server";

export async function PUT(req: Request) {  //When updating a DB we use PUT

    const session = await getServerSession(authOptions);
    const currentUserEmail = session?.user?.email!; 
    const movieTitle = await req.json()                                     
    console.log(currentUserEmail)
    const user = await prisma.user.update({
        where: { 
            email: currentUserEmail,

        },
        data: {
            watchList: {
              push: movieTitle
            },
        }
    })

    return NextResponse.json(user) //return the user as json
}