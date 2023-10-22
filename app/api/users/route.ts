//localhost/api/users
//just for testing

import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {  //export a GET req in which we query all the users in the DB and return them as a JSON obj
  const users = await prisma.user.findMany();
  console.log(users);

  return NextResponse.json(users);
}