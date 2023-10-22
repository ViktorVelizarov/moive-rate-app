"use client"  //because we handle clicks

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { myAction } from '@/app/serverActions/addToWatch';
import { prisma } from '@/lib/prisma';
import { PlusSquare } from 'lucide-react'
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react'

interface Props {
  movie: {  
    id: string;
  };
}
export default function WatchListButton({ movie }: Props) {

  async function addToWatch(){
    
    
    }

  return (
    <div>
         <button className='font-semibold rounded-md w-full h-14 bg-yellowImport flex flex-row justify-center items-center' onClick={myAction}>
                    <PlusSquare/>Add to Watchlist
         </button>
    </div>
  )
}
