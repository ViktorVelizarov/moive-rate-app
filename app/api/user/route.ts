//here we receive data from the update form and update the user in the DB

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";


export async function PUT(req: Request) {  //When updating a DB we use PUT

    const session = await getServerSession(authOptions);//getting the current session
    const currentUserEmail = session?.user?.email!;  //getting current user email on the
                                                    //server cause if we get it on the client it can be hacked\

    const data = await req.json()   //accesing the reqest body which is the data submited and sent from the form                                
    data.age = Number(data.age) //converting the age to num bcz json turned it into string

    const user = await prisma.user.update({
        where: {  //which user to update
            email: currentUserEmail,
            id: data.id
        },
        data   //how to update it
    })

    return NextResponse.json(user) //return the user as json
}