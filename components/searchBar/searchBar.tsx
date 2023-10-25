"use client"

import { Search } from 'lucide-react';
import React from 'react'
import { useState } from "react";

export default function searchBar({ setResults} : any) {
  const [input, setInput] = React.useState("");

  const fetchData = (value : any) => {
    const url = `https://api.themoviedb.org/3/search/movie?query=${value}&include_adult=false&language=en-US&page=1`;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNDA5OTMyY2FhZTMxYTBiZDYzNTliNjFkNDQ3NDEyZSIsInN1YiI6IjY1MzBlZjE2MzBmNzljMDEzODBlYTg5NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.S37uuIacu0SYc6FOkf7_SJYZ3iH1vyasnC46xrSel8o'
      }};
    
    fetch(url, options)
    .then(res => res.json())
    .then(json => setResults(json))
    .catch(err => console.error('error:' + err));
    };

    const handleChange = (value : any) => {
        setInput(value);
        fetchData(value);
      };


  return (
    <div className=" h-14 w-full rounded-md px-5 bg-white flex items-center border-none">
    <Search/>
    <input className='bg-transparent h-full w-full ml-1 focus: outline-none border-none'
      placeholder="Type to search..."
      value={input}
      onChange={(e) => handleChange(e.target.value)}
    />
  </div>
  )
}
