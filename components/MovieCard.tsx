import { ChevronRightCircle, Link, Plus, Star } from 'lucide-react'
import React from 'react'
import { Button } from './ui/button'

export default function UpcomingMovCard(props: {id: string, rating: number, title: string, poster: string }) {
  return (
    <>

      <div className='bg-gray-800 w-44 flex flex-row justify-center '>
        <a href={`/movies/${props.id}`}>
          <div className=''>
            <img src={`https://dlv.nyc3.cdn.digitaloceanspaces.com/images/${props.poster}`} width="190px" height="800px"/>
            <div className='flex flex-row p-3 '>
            <Star color='#facd05' fill='#facd05'/>
            <p className='text-white '> {props.rating.toFixed(1)} </p>
            <Star color='#0c8ff2' />
            </div>
            <div className=' h-20'>
            <h2 className='text-white text-left ml-3'>{props.title}</h2>
            </div>
            <Button variant={'link'}><Plus color="#0c8ff2"/><p className='text-blueImport'>Watchlist</p></Button>
            <Button variant={'link'}><ChevronRightCircle color='white'/><p className='text-white'>Trailer</p></Button>
          </div>
        </a>
        
      </div>

    </>
  )
}
