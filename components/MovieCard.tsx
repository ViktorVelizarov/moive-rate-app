"use client"

import { CheckCheck, ChevronRightCircle, Link, Plus, Star } from 'lucide-react'
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

export default function UpcomingMovCard(props: {id: string, rating: number, title: string, poster: string}) {
  const [starColor, SetStarColor] = React.useState(["gray", "gray" , "gray", "gray", "gray", "gray", "gray", "gray", "gray" , "gray"])
  const [watchlsitState, SetWatchlsitState] = React.useState(false)
  const [userRating, SetUserRating] = React.useState(0)
  console.log(props.poster)
  
  React.useEffect(() => {
    async function checkWishlist() {
      try {
        const res = await fetch('/api/checkWishlist', {
          method: 'PUT',
          body: JSON.stringify(props.title),
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        const result = await res.json();
        SetWatchlsitState(result);
      } catch (error) {
        console.error('Error checking wishlist:', error);
      }
    }
  
    checkWishlist();
  }, [props.title]);
  

  

  async function addToWatch() {
    SetWatchlsitState(true)
    const res = await fetch('/api/wishlist', {   //we send the collected info to a api endpoint
      method: 'PUT',
      body: JSON.stringify(props.title),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    await res.json();
  }

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

  async function createRating(){
    const sentData = {  
      movie_id: props.id,
      rating: starColor.filter(color => color != "gray").length,
    }
    console.log("rating")
    console.log(sentData.rating)
      const res = await fetch('/api/rating', {
        method: 'PUT',
        body: JSON.stringify(sentData),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      await res.json();
  }

  return (
    <>
  
      <div className='bg-gray-800 w-44 flex flex-row justify-center '>
        
          <div className=''>
          <a href={`/movies/${props.id}`}>
            <img src={`https://dlv.nyc3.cdn.digitaloceanspaces.com/images${props.poster}`} width="190px" height="800px"/>
          </a>
            <div className='flex flex-row p-3 '>
            <Star color='#facd05' fill='#facd05'/>
            <p className='text-white '> {props.rating.toFixed(1)} </p>
              <Dialog>
                <DialogTrigger>
                    {userRating === 0 ? (
                      <div className='flex flex-row'>
                        <Star color='#0c8ff2' />
                      </div>
                     ) : (
                      <div className='flex flex-row'>
                        <Star color='#0c8ff2' fill='#0c8ff2'/>
                        <p className='text-white '> {userRating} </p>
                      </div>
                     )}
                      
                  </DialogTrigger>
                <DialogContent className='bg-slate-700'>
                <form  onSubmit={createRating}>
                    <div className='flex flex-col items-center'>
                    <p className='text-yellowImport'> Your rating for:</p>
                    <h1 className='text-white text-2xl font-semibold'>{props.title}</h1>

                    <div className='flex flex-row gap-1 mt-4'>
                    {starArray.map((element, index) => (
                    <div key={index}>{element}</div>))}
                    </div>
                    <Button  type="submit" className='w-64 mt-6'>Rate</Button>
                    </div>
                </form>
                </DialogContent>
              </Dialog>
            </div>
            <div className=' h-20'>
            <h2 className='text-white text-left ml-3'>{props.title}</h2>
            </div>
            <div className='flex flex-col items-center mb-5'>
            {watchlsitState ? (
              <button disabled className='flex flex-row items-center bg-slate-700 px-6 py-2 rounded-md border-yellowImport border-2'><CheckCheck color="#facd05"/>
              <p className='text-blueImport'>In Watchlist</p></button>
            ) : (
              <button  onClick={addToWatch} className='flex flex-row items-center bg-slate-700 px-9 py-2 rounded-md hover:bg-slate-600'><Plus color="#0c8ff2"/>
              <p className='text-blueImport'>Watchlist</p></button>
            )}
            </div>
          </div>
      </div>

    </>
  )
}