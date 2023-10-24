"use client"

import { Search } from 'lucide-react';
import React from 'react'
import { useState } from "react";

export default function searchBar({ setResults} : any) {
  const [input, setInput] = React.useState("");

  const fetchData = (value : any) => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((json) => {
        const results = json.filter((user : any) => {  //the received data is filtered on the criteria:
          return (
            value &&                                   //valuemust exist and be truthy
            user &&                                   //user must exist and be truthy
            user.name &&
          user.name.toLowerCase().includes(value)    //this checks if the lowercase version of user.name contains the value of value
        );
      });
      setResults(results);
    });
    };

    const handleChange = (value : any) => {
        setInput(value);
        fetchData(value);
      };


  return (
    <div className=" h-14 w-full rounded-md px-10 bg-white flex items-center border-none">
    <Search/>
    <input className='bg-transparent h-full w-full ml-1 focus: outline-none border-none'
      placeholder="Type to search..."
      value={input}
      onChange={(e) => handleChange(e.target.value)}
    />
  </div>
  )
}
