import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeftIcon, Trash2Icon } from 'lucide-react'  
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import api from '../lib/axios'
import { LoaderIcon } from 'lucide-react'


const NoteDetailPage = () => {
  const [note, setNote] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [saving, setSaving] = useState(false)

  const navigate = useNavigate()

  const { id } = useParams()
  console.log(id)

  useEffect(() => {
    const fetchNote = async () => {
      setLoading(true)  // Start loading before fetching the note
      try {
        const response = await api.get(`/notes/${id}`)
        setNote(response.data)
      } catch (err) {
        console.log("error in fetching notes", err);
        //toast.error('Failed to fetch note')
      } finally {
        setLoading(false)
      }
    }

    fetchNote()
  }, [id])
  
 const handleDelete = async () => {

  if (!window.confirm('Are you sure you want to delete this note?')) {
    return
  }

  setSaving(true)
  try {
    await api.delete(`/notes/${id}`)
    toast.success('Note deleted successfully')
    navigate('/')
  } catch (err) {
    console.log("error in deleting note", err);
    toast.error('Failed to delete note')
  } finally {
    setSaving(false)
  }
}

 const handleSave = async () => {
  if(!note.title.trim() || !note.content.trim()) {
    toast.error('Title and content cannot be empty')
    return
  }
   setSaving(true)
   try {
     await api.put(`/notes/${id}`, note)
     toast.success('Note updated successfully')
     navigate('/')
   } catch (err) {
     console.log("error in updating note", err);
     toast.error('Failed to update note')
   } finally {
     setSaving(false)
   }
 }

  console.log(note)
  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin" size={48} />
      </div>
    )
  }

return (
  <div className="min-h-screen bg-base-200">
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mxauto">
      <div className="flex items-center justify-between mb-6">

        <Link to="/" className="btn btn-ghost">
          <ArrowLeftIcon className="h-5 w-5" />
          Back to Notes
        </Link>

        <button
          onClick={handleDelete}
          className="btn btn-error btn-outline"
        >
          <Trash2Icon className="h-5 w-5" />
          Delete Note
        </button>
      </div>
      <div className="card bg-base-100">
        <div className="card-body">
          <div className="form-control mb-4">
            <label htmlFor="noteTitle" className="label-text">Title</label>
            <input
              type="text"
              id="noteTitle"
              className="input input-bordered"
              value={note?.title || ''}
              onChange={(e) => setNote({ ...note, title: e.target.value })}
            />
          </div>
          <div className="form-control mb-4">
            <label htmlFor="noteContent" className="label-text">Content</label>
            <textarea
              id="noteContent"
              className="input input-bordered"
              value={note?.content || ''}
              onChange={(e) => setNote({ ...note, content: e.target.value })}
            />
          </div>
          
          <div className="card-action justify-end">
            <button
              onClick={handleSave}
              className="btn btn-primary"
              disabled={saving}
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
           
        </div>
        </div>
      </div>
      
      </div>
    </div>
  
)

}

export default NoteDetailPage