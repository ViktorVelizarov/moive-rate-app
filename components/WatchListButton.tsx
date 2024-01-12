"use client"

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';
import { PlusSquare } from 'lucide-react';
import { getServerSession } from 'next-auth';
import React from 'react';

interface Props {
  movieId: string; 
  isInWatclist : boolean
}

export default function WatchListButton({ movieId, isInWatclist }: Props ) {

  const [watchlsitState, SetWatchlsitState] = React.useState(isInWatclist)
  async function addToWatch() {
    SetWatchlsitState(true)
    const res = await fetch('/api/wishlist', {   //we send the collected info to a api endpoint
      method: 'PUT',
      body: JSON.stringify(movieId),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
  }
  

  return (
    <div>
      {watchlsitState ? (
          <button className='font-semibold rounded-md w-full h-14 bg-green-600 flex flex-row justify-center items-center'>
          <PlusSquare /> In Watchlist
          </button>
       ) : ( 
          <button className='font-semibold rounded-md w-full h-14 bg-yellowImport flex flex-row justify-center items-center' onClick={addToWatch}>
          <PlusSquare /> Add to Watchlist
          </button>
       )}
      
    </div>
  );
}
