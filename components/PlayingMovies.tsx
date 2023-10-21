
import { fetchPlaying }from '@/utils'
import React from 'react'
import UpcomingMovCard from './MovieCard';
import MaxWidthWrapper from './MaxWidthWrapper';
import MovieCard from './MovieCard';
import { ChevronRight } from 'lucide-react';

export default async function playingMovies() {
    const playingMovies = await fetchPlaying();
    console.log(playingMovies)

    const isDataEmpty = !Array.isArray(playingMovies.results) || playingMovies.results.length < 1 || !playingMovies.results;
  return (  
    <MaxWidthWrapper>
    <main className='bg-black mt-20'>
    <div className='flex flex-row mb-5'>
    <h1 className='text-white font-semibold text-xl'><span className='text-yellowImport'>|</span> Playing Now:</h1>
    <ChevronRight color='white'/>
    </div>
    {!isDataEmpty ? (
          <section>
            <div className='flex flex-row gap-3'>
              {playingMovies.results?.slice(1, 7).map((upcomingMovie: {id: string, vote_average: number, title: string,poster_path: string, backdrop_path: string; } ) => (
                
                <MovieCard title={upcomingMovie.title} poster={upcomingMovie.poster_path} id={upcomingMovie.id} rating={upcomingMovie.vote_average}/>
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
