
import { fetchPopular}from '@/utils'
import React from 'react'
import UpcomingMovCard from './MovieCard';
import MaxWidthWrapper from './MaxWidthWrapper';
import MovieCard from './MovieCard';
import { ChevronRight } from 'lucide-react';
import UpcomingMoviesDiv from './UpcomingMoviesDiv';

export default async function UpcomingMovies() {
    const upcomingMovies = await fetchPopular();
    console.log(upcomingMovies)

    const isDataEmpty = !Array.isArray(upcomingMovies.results) || upcomingMovies.results.length < 1 || !upcomingMovies.results;
  return (  
    <UpcomingMoviesDiv isDataEmpty={isDataEmpty} upcomingMovies={upcomingMovies}/>
  ) 
}
