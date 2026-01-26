import { useState } from "react"
import type { NoteType } from "../types/note"
import { supabase } from "../lib/supabase"

export default function useNotes() {
    const [allNotes, setAllNotes] = useState <NoteType[]>([])
    const [filteredNotes, setFilteredNotes] = useState<null | NoteType[]>(null)
    const displayedNotes = filteredNotes === null ? allNotes : filteredNotes
    const [id, setId] = useState<number>(0)
    const incrementId = (id:number)=> {
      setId(++id)
    }
    const fetchNotes = async ()=> {
      supabase.auth.getSession()
      .then(({data: { session }})=> {
        console.log(session);
        
      })
      try {
        const {data, error} = await supabase
        .from('notes')
        .select('*')
        .order('createdAt', {ascending: false})
        if(error) throw error;
        setAllNotes(data || [])
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
    const remove = (id:number) => setAllNotes(prev => prev.filter(n => n.id !== id));
    const update = (id:number, changes:NoteType) => setAllNotes(prev => 
      prev.map(n => n.id === id ? {...n, ...changes} : n)
    );
    const toggle = (id:number) => setAllNotes(prev =>
      prev.map(n => n.id === id ? {...n, completed: !n.completed} : n)
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

    return { displayedNotes, id, incrementId, add, update, remove, toggle, sortByNew, sortByOld, filterByCompleteds, filterByUnCompleteds, showAllNotes,  fetchNotes };
}