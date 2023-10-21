import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { Button } from '@/components/ui/button';
import { prisma } from '@/lib/prisma';
import { BarChart4, Star } from 'lucide-react';
import { Metadata } from 'next';

interface Props {
    params: {
      id: string;
    };
  }


export default async function fetchMovieByID({ params }: Props) {
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
        console.log(result)
        return (
            <MaxWidthWrapper>
            <div className='flex flex-row mt-20 justify-between'>
                <div className='flex flex-col'>
                    <h1 className='text-5xl font-semibold'>{result.title}</h1>
                    <div className='flex flex-row gap-4'>
                        <p>2023</p>
                        <p>PG-13</p>
                        <p>2h 15m</p>
                    </div>
                </div>

                <div className='flex flex-col'>
                    <div className='flex flex-row gap-5'>
                        <p>Movie Rating</p>
                        <p>Your Rating</p>
                        <p>Popularity</p>
                    </div>
                    <div className='flex flex-row gap-5'>
                        <Button>
                            <Star color='#facd05' fill='#facd05'/>
                            7.2/10
                        </Button>
                        <Button>
                        <Star color='#0c8ff2'/>
                            <span className='text-blueImport'>Rate</span>
                        </Button>
                        <Button>
                        <BarChart4 color='green'/>
                            35
                        </Button>
                    </div>
                </div>
            </div>
            </MaxWidthWrapper>
        )
    } catch (error) {
        console.error(error);
    }
}