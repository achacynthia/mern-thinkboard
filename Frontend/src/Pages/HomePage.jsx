import React from 'react'
import Navbar from '../Components/Navbar.jsx'
import RateLimitUI from '../Components/RateLimitUI.jsx' 
import NotesNotFound from '../Components/NotesNotFound.jsx'
import { useState, useEffect } from 'react'
// import axiosInstance from '../lib/axios.js'
import NoteCard from '../Components/NoteCard.jsx'
import api from '../lib/axios.js'

const HomePage = () => {
  const [isRateLimit, setRateLimit] = useState(true)
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response  = await api.get('/notes')
        console.log(response.data)
        setNotes(response.data)
        setRateLimit(false)
        setLoading(false)

      }catch (error) {
        console.log("error fetching notes")
        console.error(error.response)
        if(error.response && error.response.status === 429) {
          setRateLimit(true)
        }else {
          setRateLimit(false)
        }  
        setLoading(false)
        
      }
    }
    fetchNotes()
  }, [])

    return (
    <div className='min-h-screen'>
       <Navbar />
       {isRateLimit && <RateLimitUI />}

       <div className='max-w-7xl mx-auto p-4'>
         {loading && <div className="text-center text-primary py-10" >Loading...</div>}
         {notes.length === 0 && !loading && !isRateLimit && (
           <NotesNotFound />
         )}

         {notes.length > 0 && !isRateLimit && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} setNotes={setNotes} />
            ))}
          </div>
         )}
       </div>
       
    

    </div>
  )
}

export default HomePage
