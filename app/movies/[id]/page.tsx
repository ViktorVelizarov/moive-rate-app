import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import WatchListButton from '@/components/WatchListButton';
import { Button } from '@/components/ui/button';
import { prisma } from '@/lib/prisma';
import { BarChart4, PlusSquare, Star } from 'lucide-react';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

interface Props {
    params: {
      id: string;
    };
  }


export default async function fetchMovieByID({ params }: Props) {
    
    const session = await getServerSession(authOptions); 
    const currentUserEmail = session?.user?.email!; 
     const currentUser = await prisma.user.findUnique({     
      where: {
        email: currentUserEmail,
      },
    });


    const url = `https://api.themoviedb.org/3/movie/${params.id}?language=en-US`;
    const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNDA5OTMyY2FhZTMxYTBiZDYzNTliNjFkNDQ3NDEyZSIsInN1YiI6IjY1MzBlZjE2MzBmNzljMDEzODBlYTg5NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.S37uuIacu0SYc6FOkf7_SJYZ3iH1vyasnC46xrSel8o'
    }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();

        const hours = Math.floor(result.runtime / 60);
        const minutes = result.runtime % 60;

        var isInWatclist = false
        if(currentUser?.watchList.includes(result.id.toString())){  //check if movie is already in watchlist
            isInWatclist = true
        }

        return (
            <MaxWidthWrapper>
            <div className='flex flex-row mt-20 justify-between '>
                <div className='flex flex-col'>
                    <h1 className='text-5xl font-semibold text-white'>{result.title}</h1>
                    <div className='flex flex-row gap-4 text-gray-500'>
                        <p>{result.release_date}</p>
                        <p>{result.adult ? "PG-18" : "PG-13"}</p>
                        <p>{`${hours}h${minutes}m`}</p>
                    </div>
                </div>

                <div className='flex flex-col'>
                    <div className='flex flex-row gap-5 text-gray-500'>
                        <p>Movie Rating</p>
                        <p>Your Rating</p>
                        <p>Popularity</p>
                    </div>
                    <div className='flex flex-row gap-5 text-gray-500'>
                        <Button variant={'ghost'}>
                            <Star color='#facd05' fill='#facd05'/>
                            {result.vote_average.toFixed(1)} / 10
                        </Button>
                        <Button  variant={'ghost'}>
                        <Star color='#0c8ff2'/>
                            <span className='text-blueImport'>Rate</span>
                        </Button>
                        <Button  variant={'ghost'}>
                        <BarChart4 color='green'/>
                            {result.popularity.toFixed(0)}
                        </Button>
                    </div>
                </div>
            </div>

            <div className='w-64 mt-8'>
            <img src={`https://dlv.nyc3.cdn.digitaloceanspaces.com/images${result.poster_path}`}/>
            </div>
            <div className='flex flex-row mt-4'>
            {result.genres.map((genre : any) => (
                <Button variant={'default'} className='mr-3'>
                    <p className='text-black'>{genre.name}</p>
                </Button>
            ) )}
            </div>
            
            <div className='flex flex-row justify-between gap-72 mt-6'>
            <div className=''>
            <p className='text-white'>{result.overview}</p>
            </div>  
               <WatchListButton movieId = {result.id.toString()} isInWatclist={isInWatclist}/> 
            </div>
            </MaxWidthWrapper>
        )
    } catch (error) {
        console.error(error);
    }
}