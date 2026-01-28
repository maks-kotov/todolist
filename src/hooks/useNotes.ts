import { useState } from "react"
import type { NoteType } from "../types/note"
import { supabase } from "../lib/supabase"
import { useAuth } from "../contexts/authContext"

export default function useNotes() {
    const [allNotes, setAllNotes] = useState <NoteType[]>([])
    const [filteredNotes, setFilteredNotes] = useState<null | NoteType[]>(null)
    const displayedNotes = filteredNotes === null ? allNotes : filteredNotes
    const [note_id, setNote_Id] = useState<number>(0)
    const {session} = useAuth()
    const incrementNote_Id = (note_id:number)=> {
      setNote_Id(++note_id)
    }
    const getNotes = async ()=> {
      try {
        if(session !== null) {
          const {data, error} = await supabase
          .from('notes')
          .select('*')
          .eq('user_id', session.user.id)
          .order('createdAt', {ascending: false})
          if(error) throw error;
          setAllNotes(data || [])
        }

      } catch (error) {
        console.log("ОШИБОЧКА");
      }
    }

    

    const add = async (note:NoteType) => {
      setAllNotes(prev => {
        if(note.content.trim()) {
          return [...prev, note]
        }
        return prev
      });
    }
    const remove = (note_id:number) => setAllNotes(prev => prev.filter(n => n.note_id !== note_id));
    const update = (note_id:number, changes:NoteType) => setAllNotes(prev => 
      prev.map(n => n.note_id === note_id ? {...n, ...changes} : n)
    );
    const toggle = (note_id:number) => setAllNotes(prev =>
      prev.map(n => n.note_id === note_id ? {...n, completed: !n.completed} : n)
    );
    
    //сортировка::
    const sortByNew = () => {
      setAllNotes([...allNotes].sort((a,b)=>b.createdAt.getTime() - a.createdAt.getTime()))
    }
    const sortByOld = () => {
      setAllNotes([...allNotes].sort((a,b)=>a.createdAt.getTime() - b.createdAt.getTime()))
    }
    //фильтры:
    const showAllNotes = ()=> {
      setFilteredNotes(null)
    }
    const filterByCompleteds = ()=> {
      setFilteredNotes(null)
      const filtered = allNotes.filter((note)=>note.completed)
      setFilteredNotes(filtered)
    }
    const filterByUnCompleteds = ()=> {
      setFilteredNotes(null)
      const filtered = allNotes.filter((note)=>!note.completed)
      setFilteredNotes(filtered)
    }

    return { displayedNotes, note_id, incrementNote_Id, add, update, remove, toggle, sortByNew, sortByOld, filterByCompleteds, filterByUnCompleteds, showAllNotes,  getNotes };
}