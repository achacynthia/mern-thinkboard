import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { ArrowLeftIcon } from 'lucide-react'
import api from '../lib/axios.js'
const CreatePage = () => {

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
 const [loading, setLoading] = useState(false)

 const navigate = useNavigate()

 const handleSubmit = async (e) => {
  console.log('Submitting note:', { title, content })
   e.preventDefault()

   // Validate input before sending the request
   if (!title.trim() || !content.trim()) {
     toast.error('Title and content are required')
     setLoading(false)
     return
   }
   setLoading(true)
   try {
     await api.post("/notes", { title, content })
     toast.success('Note created successfully')
     setTitle('')
     setContent('')
     navigate('/')


   } catch (error) {
     toast.error("Failed to create note")
     if(error.response.status === 429) {
       toast.error(" Slow down, you are creating notes too fast", {
         duration: 4000, // Display the toast for 4 seconds
         position: 'top-right', // Position the toast at the top-right corner
         icon: '⚠️' // Optional icon for the toast  
       })
     }
     else {
       toast.error("An unexpected error occurred")
     }
   } finally {
     setLoading(false)
   }
 }


  return (
    <div className='min-h-screen bg-base-200'>
      <div className="container max-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Link to="/" className="btn btn-ghost mb-6">
          <ArrowLeftIcon className="size-5" />
          Back to Notes
          </Link>
          <div className="card bg-base-100">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">Create Note</h2>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="form-control mb-4">
                <label htmlFor="" className="label">
                  <span className="label-text">Title</span>
                </label>
                  <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="input input-bordered w-full"
                  />
  
              </div>
              <div className="form-control mb-4">
                <label htmlFor="" className="label">
                  <span className="label-text">Content</span>
                </label>
                <textarea
                  placeholder="Content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="textarea textarea-bordered w-full"
                />
              </div>
              <div className="card-actions justify-end">
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? 'Creating...' : 'Create Note'}
                </button>
              </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default CreatePage