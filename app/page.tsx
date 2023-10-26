import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import PlayingMovies from '@/components/PlayingMovies'
import TopRatedMovies from '@/components/TopRatedMovies'
import UpcomingMovies from '@/components/UpcomingMovies'
import Image from 'next/image'

export default function Home() {
  return (
    <div className='bg-black'>
    <MaxWidthWrapper className='mb-12 mt-28 sm:mt-40 flex flex-col items-center justify-center bg-black'>  
    <main className="flex min-h-screen flex-col items-center justify-between  bg-black">
    <div className=' w-full '>
      
    <div className='flex flex-row'>
      <div className='flex flex-col'>
      <h1 className="text-white mx-20 2xl:text-[72px] sm:text-[64px] text-[50px] font-extrabold ">
        Incease the joy of movie watching
      </h1>
      <p className="text-[27px] text-white font-light mt-5 mx-20">
        Give ratings, add to watchlist, look at stats and more...
      </p>
      </div>

      <div>
            <img height="800px" width="800px" src="/MoviePicture.webp" alt="hero" />
      </div>
    </div>

    <h1 className='text-yellowImport text-left mx-20 text-3xl font-bold mb-7 mt-10'>What to watch</h1>
    </div>
      <TopRatedMovies/> 
      <PlayingMovies/>
      <UpcomingMovies/>
    </main>
    </MaxWidthWrapper>
    </div>
  )
}
