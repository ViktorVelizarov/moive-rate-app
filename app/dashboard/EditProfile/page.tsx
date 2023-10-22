import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { authOptions } from "../../api/auth/[...nextauth]/route"
import { EditForm } from './EditForm';

export default async function EditProfile() {
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
      <EditForm user={user} />
    </>
  );
}