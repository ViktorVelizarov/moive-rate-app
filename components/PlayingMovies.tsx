
import { fetchPlaying }from '@/utils'
import React from 'react'
import UpcomingMovCard from './MovieCard';
import MaxWidthWrapper from './MaxWidthWrapper';
import MovieCard from './MovieCard';
import { ChevronRight } from 'lucide-react';
import PlayingMoviesDiv from './PlayingMoviesDiv';

export default async function playingMovies() {
    const playingMovies = await fetchPlaying();

    const isDataEmpty = !Array.isArray(playingMovies.results) || playingMovies.results.length < 1 || !playingMovies.results;
  return (  
    <PlayingMoviesDiv isDataEmpty={isDataEmpty} playingMovies={playingMovies}/>
  ) 
}
