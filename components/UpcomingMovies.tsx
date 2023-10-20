
import { fetchIMDB, fetchMovieDetails }from '@/utils'
import React from 'react'
import UpcomingMovCard from './UpcomingMovCard';
import MaxWidthWrapper from './MaxWidthWrapper';

export default async function UpcomingMovies() {
    const upcomingMovies = await fetchIMDB();
    console.log(upcomingMovies)
    const movieDetails = await fetchMovieDetails()

    const isDataEmpty = !Array.isArray(upcomingMovies.results) || upcomingMovies.results.length < 1 || !upcomingMovies.results;
  return (  
    <MaxWidthWrapper>
    <main className='bg-black'>
    <div>UpcomingMovies</div>

    {!isDataEmpty ? (
          <section>
            <div className='flex flex-row gap-3'>
              {upcomingMovies.results?.slice(0, 6).map((upcomingMovie: {id: string, title: string,poster_path: string, backdrop_path: string; } ) => (
                
                <UpcomingMovCard title={upcomingMovie.title} poster={upcomingMovie.poster_path} id={upcomingMovie.id}/>
              ))}
            </div>
          </section>
        ) : (
          <div>
            <h2 className='text-black text-xl font-bold'>Oops, no results</h2>
          </div>
        )}

   
    </main>
    </MaxWidthWrapper>
  ) 
}
