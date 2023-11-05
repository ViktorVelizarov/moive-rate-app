"use client"

import Link from 'next/link'
import { SignInButton, SignOutButton } from './buttons'
import AuthCheck from './AuthCheck'
import { BookPlus, Menu } from 'lucide-react'; //npm install lucide-react
import MaxWidthWrapper from './MaxWidthWrapper';
import SearchBar from './searchBar/searchBar'
import SearchResultsList from './searchBar/searchResultsList'
import React, { useState, useEffect, useRef } from 'react';

interface Page {
  page: number;
  results: {
    title: string;
    poster_path: string
    release_date: string
  }[];
  total_pages: number;
  total_results: number;
}

export default function () {

  const searchWrapperRef = useRef<HTMLDivElement | null>(null);  //we use this to listen to mouse click events so we can close the search bar

  const [barOpen, SetBarOpen] = React.useState<boolean>(true)
  const [results, setResults] = React.useState<Page>({
    page: 1,
    results: [],
    total_pages: 1,
    total_results: 1,
  });

  function OpenBar(){
    SetBarOpen(true)
  }

  useEffect(() => {  //useEffect that tirggers once after the component is laoded
    const handleClickOutside = (event: MouseEvent) => {
      if (searchWrapperRef.current && !searchWrapperRef.current.contains(event.target as Node)) {
        SetBarOpen(false);
      }
    };

    // Attach the event listener when the component mounts
    document.addEventListener('click', handleClickOutside);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);



  return (
    <nav className='sticky h-14 inset-x-0 top-0 z-30 w-full border-b  bg-gray-800 backdrop-blur-lg transition-all'>
    <MaxWidthWrapper>
     <div className='flex h-14 items-center justify-between border-b'>
      <div  className='flex flex-row gap-5'>
          <Link
            href='/'
            className='flex z-40 font-semibold'>
            <span className='text-yellowImport'>MovieRater</span>
          </Link>

          <Link
            href='/'
            className='flex z-40 font-semibold'>
            <Menu color='white'/>
            <span className='text-white'>Menu</span>
          </Link>
      </div>

      <div onClick={OpenBar} ref={searchWrapperRef} className="  w-96 h-8 m-auto flex flex-col items-center">
        <SearchBar setResults={setResults} />
        {barOpen && results && results.results.length > 0 && <SearchResultsList results={results.results} />}
      </div>

          <div className='hidden items-center space-x-4 sm:flex text-white'>
          <Link
            href='/watchlist'
            className='flex z-40 font-semibold'>
            <BookPlus color='white'/>
            <span className='text-white'>Watchlist</span>
          </Link>
          
          <SignInButton/>

          <AuthCheck>
            <SignOutButton />
          </AuthCheck>
          </div>
      </div>
      </MaxWidthWrapper>
    </nav>
  )
}

