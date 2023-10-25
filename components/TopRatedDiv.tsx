"use client"

import React from 'react'
import MaxWidthWrapper from './MaxWidthWrapper'
import { ChevronLeftSquare, ChevronRight, ChevronRightSquare } from 'lucide-react'
import MovieCard from './MovieCard'

export default function TopRatedDiv({isDataEmpty, topRatedMovies} : any) {

    const [startingIndex, SetStartingIndex] = React.useState(0)
    const [endingIndex, SetEndingIndex] = React.useState(6)

    function goBack(){
        if(startingIndex != 0)
        {
        SetStartingIndex(startingIndex => startingIndex-1)
        SetEndingIndex(endingIndex => endingIndex-1)
        }
    }

    function goFront(){
        if(endingIndex < 20)
        {
            SetStartingIndex(startingIndex => startingIndex+1)
            SetEndingIndex(endingIndex => endingIndex+1)
        }
    }

  return (
    <MaxWidthWrapper>
    <main className='bg-black'>
    <div className='flex flex-row justify-between'>
      <div className='flex flex-row mb-5'>
      <h1 className='text-white font-semibold text-xl'><span className='text-yellowImport'>|</span> Top Rated:</h1>
    
      <ChevronRight color='white'/>
      </div>
      <div className='flex flex-row'>
      <ChevronLeftSquare onClick={goBack} className='w-10 h-10 bg-yellowImport rounded-md mr-2'/>
      <ChevronRightSquare onClick={goFront} className='w-10 h-10 bg-yellowImport rounded-md'/>
      </div>
    </div>
    {!isDataEmpty ? (
          <section>
            <div className='flex flex-row gap-3'>
              {topRatedMovies.results?.slice(startingIndex, endingIndex).map((upcomingMovie: {id: string,  vote_average: number, title: string,poster_path: string, backdrop_path: string; } ) => (
                
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
