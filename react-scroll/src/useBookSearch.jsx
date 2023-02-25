import { useEffect } from "react";
import axios from 'axios'
import { useState } from "react";


/* https:/openlibrary.org/search.json */

export default function useBookSearch(query, pageNumber) {
    const [books, setBooks] = useState([]);
    const [hasMore, setHasMore] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        setBooks([])
    }, [query])

    useEffect(() => {
        const cancel = new AbortController()
        const fetchData = async () => {
            setLoading(true)
            try {
                const { data } = await axios("https:/openlibrary.org/search.json", {
                    method: "GET",
                    params: { q: query, page: pageNumber },
                    signal: cancel.signal
                })
                setBooks(prev=> [...prev, ...new Set([...data.docs.map(book => book.title)])])
                
                if(data.docs.length > 0){
                    setHasMore(true)
                } else{
                    setHasMore(false)
                }

                setLoading(false)
            } catch (error) {
                if (axios.isCancel(error)) return
            }
        }


        fetchData();

        return () => cancel.abort();
    }, [query, pageNumber])

    return {hasMore, loading, books}
}