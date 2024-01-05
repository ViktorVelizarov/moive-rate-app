"use client"

import { Star } from 'lucide-react';
import React from 'react'
import { Button } from './ui/button';

export default function RatingDialog(props: {id: string, title: string}) {
    const [userRating, SetUserRating] = React.useState(0)
    const [starColor, SetStarColor] = React.useState(["gray", "gray" , "gray", "gray", "gray", "gray", "gray", "gray", "gray" , "gray"])
  
    async function checkRating() {  //check if the movie has been rated by the current user
        const res = await fetch('api/checkRating', { 
          method: 'PUT',
          body: JSON.stringify(props.id),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const result = await res.json();
        SetUserRating(result)
    }
    checkRating()

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
  )
}
