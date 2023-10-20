import { ChevronRightCircle, Plus, Star } from 'lucide-react'
import React from 'react'
import { Button } from './ui/button'

export default function UpcomingMovCard(props: {title: string, poster: string }) {
  return (
    <>
    
      <div className='bg-gray-800 w-44 flex flex-row justify-center '>
        <div className=''>
          <img src={`https://dlv.nyc3.cdn.digitaloceanspaces.com/images/${props.poster}`} width="190px" height="800px"/>
          <div className='flex flex-row p-3 '>
          <Star color='#facd05' fill='#facd05'/>
          <p className='text-white'> 5.5 </p>
          <Star color='#0c8ff2' />
          </div>
          <h2 className='text-white'>{props.title}</h2>
          <Button variant="destructive"><Plus color="#0c8ff2"/><p className='text-blueImport'>Watchlist</p></Button>
          <Button><ChevronRightCircle color='white'/><p className='text-white'>Trailer</p></Button>
        </div>
      </div>

    </>
  )
}
