"use client"
import Link from 'next/link'
import React from 'react'

export default function searchResult({ title, date, id, image  } : any) {

  return (
    <div className="px-6 py-2 hover: bg-slate-800 text-white flex flex-row">
      <Link href={`/movies/${id}`}>
      <img className='w-20 h-32' src={`https://dlv.nyc3.cdn.digitaloceanspaces.com/images/${image}`}/>
   
      <p>{date}</p>
      </Link>
    </div>
  )
}
