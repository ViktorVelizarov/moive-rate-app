"use client"

import { ChevronRightCircle, Link, Plus, Star } from 'lucide-react'
import React from 'react'
import { Button } from './ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function UpcomingMovCard(props: {id: string, rating: number, title: string, poster: string }) {
  const [starColor, SetStarColor] = React.useState(["gray", "gray" , "gray", "gray", "gray", "gray", "gray", "gray", "gray" , "gray"])
 
  const starArray = starColor.map((color, index) => (
    <Star
      key={index}
      color={color}
      size=''
      onMouseEnter={() => {
        const updatedColors = starColor.map((_, i) =>
          i <= index ? "#facd05" : "gray"
        );
        SetStarColor(updatedColors);
      }}
    />
  ));
  return (
    <>

      <div className='bg-gray-800 w-44 flex flex-row justify-center '>
        
          <div className=''>
          <a href={`/movies/${props.id}`}>
            <img src={`https://dlv.nyc3.cdn.digitaloceanspaces.com/images/${props.poster}`} width="190px" height="800px"/>
          </a>
            <div className='flex flex-row p-3 '>
            <Star color='#facd05' fill='#facd05'/>
            <p className='text-white '> {props.rating.toFixed(1)} </p>
            <Dialog>
              <DialogTrigger><Star color='#0c8ff2' /></DialogTrigger>
              <DialogContent className='bg-slate-700'>
                <div className='flex flex-col items-center'>
                <p className='text-yellowImport'> Your rating for:</p>
                <h1 className='text-white text-2xl font-semibold'>{props.title}</h1>

                <div className='flex flex-row gap-1 mt-4'>
                {starArray.map((element, index) => (
                <div key={index}>{element}</div>))}
                </div>
                <Button className='w-64 mt-6'>Rate</Button>
                </div>
              </DialogContent>
            </Dialog>
            </div>
            <div className=' h-20'>
            <h2 className='text-white text-left ml-3'>{props.title}</h2>
            </div>
            <Button variant={'link'}><Plus color="#0c8ff2"/><p className='text-blueImport'>Watchlist</p></Button>
            <Button variant={'link'}><ChevronRightCircle color='white'/><p className='text-white'>Trailer</p></Button>
          </div>
      </div>

    </>
  )
}
