import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { getServerSession } from 'next-auth';
import React from 'react'
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';

async function getMovieTitle(movieId : string){
  const url = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`;
  const options = {
  method: 'GET',
  headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNDA5OTMyY2FhZTMxYTBiZDYzNTliNjFkNDQ3NDEyZSIsInN1YiI6IjY1MzBlZjE2MzBmNzljMDEzODBlYTg5NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.S37uuIacu0SYc6FOkf7_SJYZ3iH1vyasnC46xrSel8o'
  }
  };

  try {
      const response = await fetch(url, options);
      const result = await response.json();
      return result.title;
    } catch (error) {
      return null;
  }
}
async function getMovieImage(movieId : string){
  const url = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`;
  const options = {
  method: 'GET',
  headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNDA5OTMyY2FhZTMxYTBiZDYzNTliNjFkNDQ3NDEyZSIsInN1YiI6IjY1MzBlZjE2MzBmNzljMDEzODBlYTg5NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.S37uuIacu0SYc6FOkf7_SJYZ3iH1vyasnC46xrSel8o'
  }
  };

  try {
      const response = await fetch(url, options);
      const result = await response.json();
      return `https://dlv.nyc3.cdn.digitaloceanspaces.com/images${result.poster_path}`;
    } catch (error) {
      return undefined;
  }
}
export default async function page() {

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
    <div className='text-white'>
    <MaxWidthWrapper>
      <div className='text-white  mt-20 gap-5 bg-gray-800 p-6'>
        <div className='flex flex-row items-center'>
            <span className='text-yellowImport text-2xl font-bold mr-2'>|</span>
            <h1 className='text-white text-left text-3xl font-bold'>Your Watchlist:</h1>
        </div>

        <div className='mt-5'>
        {user?.watchList && user.watchList.length > 0 ? (
      // Use Promise.all to await all promises concurrently
      Promise.all(user.watchList.map(async (item) => (
        <>
          <p>{await getMovieTitle(item)}</p>
          <img src={await getMovieImage(item)} width="160px" height="300px" alt="Movie Image" />
        </>
      )))
    ) : (
      <p>No movies in your watchlist yet. Try adding some and refreshing this page :/</p>
    )}
        </div>
      </div>
    </MaxWidthWrapper>
    </div>
  )
}
