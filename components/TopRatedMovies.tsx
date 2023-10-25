
import { fetchRated}from '@/utils'
import React from 'react'
import UpcomingMovCard from './MovieCard';
import MaxWidthWrapper from './MaxWidthWrapper';
import MovieCard from './MovieCard';
import { ChevronLeftSquare, ChevronRight, ChevronRightSquare } from 'lucide-react';
import TopRatedDiv from './TopRatedDiv';

export default async function topRatedMovies() {
    const topRatedMovies = await fetchRated();

   const isDataEmpty = !Array.isArray(topRatedMovies.results) || topRatedMovies.results.length < 1 || !topRatedMovies.results;
  return (  
    <TopRatedDiv isDataEmpty={isDataEmpty} topRatedMovies={topRatedMovies}/>
  ) 
}
