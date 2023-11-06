//creating a new rating. This is called when the Dialog rating window is submited

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";


export async function PUT(req: Request) { 

    const session = await getServerSession(authOptions) //getting the current session
    const currentUserEmail = session?.user?.email!;  //getting current user email on the
                                                    //server cause if we get it on the client it can be hacked\
    const currentUser = await prisma.user.findUnique({     
        where: {
          email: currentUserEmail,
        },
      });
    const data = await req.json()   //accesing the reqest body which is the data submited and sent from the form                                
    

    try {
        console.log("test2");
        const newRating = await prisma.rating.create({
            data: {
                movie_id: data.toString(),
                rating: "10",    
                user: {
                    connect: { id: currentUser?.id }
                }
            }
        });
        console.log("newRating", newRating);
        return NextResponse.json("test");
    } catch (error) {
        console.error("Error creating rating:", error);
        return NextResponse.error();
    }
}