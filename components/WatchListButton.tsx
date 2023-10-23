"use client"

import { PlusSquare } from 'lucide-react';
import React from 'react';

interface Props {
  movieName: string; 
}

export default function WatchListButton({ movieName }: Props ) {

  async function addToWatch() {
   console.log(movieName)
    const res = await fetch('/api/wishlist', {   //we send the collected info to a api endpoint
      method: 'PUT',
      body: JSON.stringify(movieName),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    await res.json();
    
  }

  return (
    <div>
      <button className='font-semibold rounded-md w-full h-14 bg-yellowImport flex flex-row justify-center items-center' onClick={addToWatch}>
        <PlusSquare /> Add to Watchlist
      </button>
    </div>
  );
}
