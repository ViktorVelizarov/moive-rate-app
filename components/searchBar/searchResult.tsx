"use client"
import React from 'react'

export default function searchResult({ result } : any) {

  return (
    <div
    className="px-4 py-7 hover: bg-slate-900"
    onClick={(e) => alert(`You selected ${result}!`)}
  >
    {result}
  </div>
  )
}
