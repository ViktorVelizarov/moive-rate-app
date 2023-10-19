
import { fetchIMDB, fetchMovieDetails }from '@/utils'
import React from 'react'
import UpcomingMovCard from './UpcomingMovCard';

export default async function UpcomingMovies() {
    const upcomingMovies = await fetchIMDB();
    console.log(upcomingMovies)
    const movieDetails = await fetchMovieDetails()

    const isDataEmpty = !Array.isArray(upcomingMovies.results) || upcomingMovies.results.length < 1 || !upcomingMovies.results;
  return (
    <>
    <div>UpcomingMovies</div>

    {!isDataEmpty ? (
          <section>
            <div>
              {upcomingMovies.results?.map((upcomingMovie: {title: string, backdrop_path: string; } ) => (
                <UpcomingMovCard title={upcomingMovie.title} poster={upcomingMovie.backdrop_path}/>
              ))}
            </div>
          </section>
        ) : (
          <div>
            <h2 className='text-black text-xl font-bold'>Oops, no results</h2>
          </div>
        )}

   
    </>
  ) 
}
