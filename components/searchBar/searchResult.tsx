"use client"
import React from 'react'

export default function searchResult({ result } : any) {

  return (
    <div
    className="px-6 py-7 hover: bg-slate-800 text-white"
    onClick={(e) => alert(`You selected ${result}!`)}
  >
    {result}
  </div>
  )
}
