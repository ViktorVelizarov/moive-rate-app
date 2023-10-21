import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import PlayingMovies from '@/components/PlayingMovies'
import TopRatedMovies from '@/components/TopRatedMovies'
import UpcomingMovies from '@/components/UpcomingMovies'
import Image from 'next/image'

export default function Home() {
  return (
    <div className='bg-black'>
    <MaxWidthWrapper className='mb-12 mt-28 sm:mt-40 flex flex-col items-center justify-center '>  
    <main className="flex min-h-screen flex-col items-center justify-between  bg-black">
    <div className=' w-full'>
    <h1 className='text-yellowImport text-left mx-20 text-3xl font-bold mb-7'>What to watch</h1>
    </div>
    
      <TopRatedMovies/> 
      <PlayingMovies/>
      <UpcomingMovies/>
    </main>
    </MaxWidthWrapper>
    </div>
  )
}
