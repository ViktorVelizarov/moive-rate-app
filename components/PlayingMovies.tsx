
import { fetchPlaying }from '@/utils'
import React from 'react'
import UpcomingMovCard from './MovieCard';
import MaxWidthWrapper from './MaxWidthWrapper';
import MovieCard from './MovieCard';

export default async function playingMovies() {
    const playingMovies = await fetchPlaying();
    console.log(playingMovies)

    const isDataEmpty = !Array.isArray(playingMovies.results) || playingMovies.results.length < 1 || !playingMovies.results;
  return (  
    <MaxWidthWrapper>
    <main className='bg-black'>
    <h1 className='text-white'>Now Playing:</h1>
    {!isDataEmpty ? (
          <section>
            <div className='flex flex-row gap-3'>
              {playingMovies.results?.slice(1, 7).map((upcomingMovie: {id: string, title: string,poster_path: string, backdrop_path: string; } ) => (
                
                <MovieCard title={upcomingMovie.title} poster={upcomingMovie.poster_path} id={upcomingMovie.id}/>
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
