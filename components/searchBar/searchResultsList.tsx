import React from 'react'
import SearchResult from './searchResult';

interface Result {
  title: string;
  poster_path: string
  release_date: string
}
export default function searchResultsList({results} :  any) {
  
  return (
    <div className="bg-white w-full  flex flex-col rounded-md max-h-36">
      {results.map((result: { title: string, poster_path: string, release_date: string, id: string}, id: any) => {
        return <SearchResult title={result.title} image={result.poster_path} date={result.release_date} id={result.id} />;
      })}
    </div>
  )
}
