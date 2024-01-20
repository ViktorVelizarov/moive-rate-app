import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { getServerSession } from 'next-auth';
import React from 'react'
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';

async function getMovie(movieId : string){
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
      return result;
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
         <a href={`/movies/${(await getMovie(item)).id}`}>
          <div className='flex flex-row mb-7 bg-slate-600 m-3'>
         
          <img src={await getMovieImage(item)} width="140px" height="220  px" alt="Movie Image" className='mr-4'/>
          <div className='flex flex-col m-4'>
            <h1 className='font-medium text-xl'>{(await getMovie(item)).title}</h1>
              <div className='flex flex-row gap-4 text-gray-300 text-sm'>
                <p> {(await getMovie(item)).release_date}  </p>
                <p> {(await getMovie(item)).adult ? "PG-18" : "PG-13"}</p>
                <p> {`${Math.floor((await getMovie(item)).runtime / 60)}h${(await getMovie(item)).runtime % 60}m`}</p>
              </div>
              <p className='mt-4'>  {(await getMovie(item)).overview}  </p>
            </div>
            
          </div>  
          </a>
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
