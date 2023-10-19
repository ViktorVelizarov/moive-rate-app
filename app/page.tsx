import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import UpcomingMovies from '@/components/UpcomingMovies'
import Image from 'next/image'

export default function Home() {
  return (
    <>
    <MaxWidthWrapper className='mb-12 mt-28 sm:mt-40 flex flex-col items-center justify-center text-center'>
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <UpcomingMovies/>
    </main>
    </MaxWidthWrapper>
    </>
  )
}
