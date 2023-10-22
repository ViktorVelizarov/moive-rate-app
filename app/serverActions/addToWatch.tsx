'use server'

import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

 
export async function myAction() {

    const session = await getServerSession(authOptions);  //get the current session
    if (!session) {      //if no session then redirect 
        redirect('/api/auth/signin');
       }
      const currentUserEmail = session?.user?.email!;   //get logged user email


const user = await prisma.user.update({
        where: {  //which user to update
            email: currentUserEmail,
        },
        data: {
          watchList: "test", 
        },
    })
}