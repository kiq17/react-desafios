import './App.css'
import React, { useEffect } from 'react'
import useBookSearch from './useBookSearch'
import { useState, useRef, useCallback } from 'react'
import Loadaer from './componentes/Loader'

function App() {
  const [query, setQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(1)

  const { loading, books, hasMore } = useBookSearch(query, pageNumber);


  const bookRef = useRef();
  const handleBook = useCallback(node => {
    if (loading) return

    if (bookRef.current) bookRef.current.disconnect()

    bookRef.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPageNumber(prev => prev + 1)
      }
    })

    if(node) bookRef.current.observe(node)
  }, [loading, hasMore])

  return (
    <>
      <input type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border-2 border-zinc-600"
      />
      {books.map((book, index) => {
        if (books.length === index + 1) {
          return (
            <div
              key={crypto.randomUUID()}
              className="h-6 m-2 rounded-full w-full"
              ref={handleBook}
            >{book}</div>
          )
        }
        return (
          <div key={crypto.randomUUID()} className="h-6 m-2 rounded-full w-full">{book}</div>
        )
      })}
      {loading && Array.from({ length: 20 }).map(_ => {
        return (
          <div key={crypto.randomUUID()} className="h-6 m-2 rounded-full bg-zinc-500 animate-pulse w-1/2"></div>
        )
      })}
    </>
  )
}

export default App;
