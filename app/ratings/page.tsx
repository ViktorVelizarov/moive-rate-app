import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { getServerSession } from 'next-auth';
import React from 'react'
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { authOptions } from '../api/auth/[...nextauth]/route';

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
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/api/auth/signin');
  }

  const currentUserEmail = session?.user?.email!;
  const user = await prisma.user.findUnique({
    where: {
      email: currentUserEmail,
    },
  });

  const userRatings = await prisma.rating.findMany({
    where: {
      userId: user?.id,
    },
  });

  return (
    <div className='text-white'>
      <MaxWidthWrapper>
        <div className='text-white mt-20 gap-5 bg-gray-800 p-6'>
          <div className='flex flex-row items-center'>
            <span className='text-yellowImport text-2xl font-bold mr-2'>|</span>
            <h1 className='text-white text-left text-3xl font-bold'>Your Ratings:</h1>
          </div>

          <div className='mt-5'>
            {userRatings.length === 0 ? (
              <p>You haven't made any ratings yet :/</p>
            ) : (
              userRatings.map(async (item) => (
                <>
                  <a href={`/movies/${item.movie_id}`}>
                    <div className='flex flex-row mb-7 bg-slate-600 m-3'>
                      <div className='flex flex-row'>
                        <img
                          src={`https://dlv.nyc3.cdn.digitaloceanspaces.com/images${(
                            await getMovie(item.movie_id)
                          ).poster_path}`}
                          width='70px'
                          height='110px'
                          alt='Movie Image'
                          className='mr-4'
                        />
                        <div className='flex flex-col text-justify'>
                          <h1 className='font-medium text-xl mt-5'>
                            {(await getMovie(item.movie_id)).title}
                          </h1>
                          <h1 className='text-3xl text-yellowImport font-mono'>
                            {' '}
                            {item.rating}/10
                          </h1>
                        </div>
                      </div>
                    </div>
                  </a>
                </>
              ))
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
}