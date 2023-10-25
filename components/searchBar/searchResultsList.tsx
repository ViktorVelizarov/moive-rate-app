import React from 'react'
import SearchResult from './searchResult';


export default function searchResultsList({results} :  any) {
  
  return (
    <div className="bg-white w-full  flex flex-col rounded-md max-h-36">
      {results.map((result: { name: any; }, id: any) => {
        return <SearchResult result={result.name} key={id} />;
      })}
    </div>
  )
}
