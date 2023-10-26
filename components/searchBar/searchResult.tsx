"use client"
import Link from 'next/link'
import React from 'react'

export default function searchResult({ title, date, id, image  } : any) {

  return (
    <div  className="px-2 py-2 bg-gray-800 text-white flex flex-row">
      <Link href={`/movies/${id}`}>
      <div className='flex flex-row gap-4'>
        <img className='w-20 h-32' src={`https://dlv.nyc3.cdn.digitaloceanspaces.com/images/${image}`}/>
        <div className='flex flex-col'>
          <h1>{title}</h1>
          <p>{date}</p>
        </div>
        
      </div>
      </Link>
    </div>
  )
}
