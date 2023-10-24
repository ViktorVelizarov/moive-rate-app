"use client"

import Link from 'next/link'
import React from 'react'
import { SignInButton, SignOutButton } from './buttons'
import AuthCheck from './AuthCheck'
import { BookPlus, Menu } from 'lucide-react'; //npm install lucide-react
import MaxWidthWrapper from './MaxWidthWrapper';
import SearchBar from './searchBar/searchBar'
import SearchResultsList from './searchBar/searchResultsList'

export default function () {

  const [results, setResults] = React.useState([]);
  console.log(results)
  return (
    <nav className='sticky h-14 inset-x-0 top-0 z-30 w-full border-b  bg-gray-800 backdrop-blur-lg transition-all'>
    <MaxWidthWrapper>



     <div className='flex h-14 items-center justify-between border-b'>
      <div className='flex flex-row gap-5'>
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

      <div className="  w-80 m-auto flex flex-col items-center">
        <SearchBar setResults={setResults} />
        {results && results.length > 0 && <SearchResultsList results={results} />}
      </div>

          <div className='hidden items-center space-x-4 sm:flex text-white'>
          <Link
            href='/'
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

