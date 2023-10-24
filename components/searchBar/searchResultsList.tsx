import React from 'react'
import SearchResult from './searchResult';


export default function searchResultsList({results} :  any) {
  
  return (
    <div className="results-list">
      {results.map((result: { name: any; }, id: any) => {
        return <SearchResult result={result.name} key={id} />;
      })}
    </div>
  )
}
