"use client"
import Link from 'next/link'
import React from 'react'

export default function searchResult({ title, date, id  } : any) {

  return (
    <div className="px-6 py-7 hover: bg-slate-800 text-white">
    <Link href={`/movies/${id}`}>
    {title}
    <p>{date}</p>
    </Link>
  </div>
  )
}
