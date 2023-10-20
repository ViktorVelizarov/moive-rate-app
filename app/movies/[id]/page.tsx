import { prisma } from '@/lib/prisma';
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
            <h1>Hi</h1>
        )
    } catch (error) {
        console.error(error);
    }
}