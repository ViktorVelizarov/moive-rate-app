
import { fetchRated}from '@/utils'
import React from 'react'
import UpcomingMovCard from './MovieCard';
import MaxWidthWrapper from './MaxWidthWrapper';
import MovieCard from './MovieCard';
import { ChevronRight } from 'lucide-react';

export default async function topRatedMovies() {
    const topRatedMovies = await fetchRated();
    console.log(topRatedMovies)


    const isDataEmpty = !Array.isArray(topRatedMovies.results) || topRatedMovies.results.length < 1 || !topRatedMovies.results;
  return (  
    <MaxWidthWrapper>
    <main className='bg-black'>
    <div className='flex flex-row mb-5'>
    <h1 className='text-white font-semibold text-xl'><span className='text-yellowImport'>|</span> Top Rated:</h1>
    <ChevronRight color='white'/>
    </div>
    
    {!isDataEmpty ? (
          <section>
            <div className='flex flex-row gap-3'>
              {topRatedMovies.results?.slice(0, 6).map((upcomingMovie: {id: string,  vote_average: number, title: string,poster_path: string, backdrop_path: string; } ) => (
                
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
