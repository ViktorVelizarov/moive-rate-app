import Link from 'next/link'
import React from 'react'
import { SignInButton, SignOutButton } from './buttons'
import AuthCheck from './AuthCheck'
import { BookPlus } from 'lucide-react'; //npm install lucide-react
import MaxWidthWrapper from './MaxWidthWrapper';

export default function 
() {
  return (
    <nav className='sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all'>
    <MaxWidthWrapper>
     <div className='flex h-14 items-center justify-between border-b border-zinc-200'>
          <Link
            href='/'
            className='flex z-40 font-semibold'>
            <span>MovieRater</span>
          </Link>

          <div className='hidden items-center space-x-4 sm:flex'>
          <Link
            href='/'
            className='flex z-40 font-semibold'>
            <BookPlus />
            <span>Watchlist</span>
          </Link>
          
          <SignInButton />

          <AuthCheck>
            <SignOutButton />
          </AuthCheck>
          </div>
      </div>
      </MaxWidthWrapper>
    </nav>
  )
}

