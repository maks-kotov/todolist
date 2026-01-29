import { useState } from "react";
import type { NoteType } from "../types/note";
import { supabase } from "../lib/supabase";
import { useAuth } from "../contexts/authContext";

export default function useNotes() {
  const [allNotes, setAllNotes] = useState<NoteType[]>([]);
  const [filteredNotes, setFilteredNotes] = useState<null | NoteType[]>(null);
  const displayedNotes = filteredNotes === null ? allNotes : filteredNotes;
  const { session } = useAuth();
  const getNotes = async () => {
    try {
      if (session !== null) {
        const { data, error } = await supabase
          .from("notes")
          .select("*")
          .eq("user_id", session.user.id)
          .order("created_at", { ascending: false });
        if (!error) {
          setAllNotes(data || []);
        } else if (error) {
          console.log(error.message);
        }
      }
    } catch (error) {
      console.log("непредвиденная ОШИБОЧКА: ", error);
    }
  };

  const add = async (note: NoteType) => {
    //note - заметка из textarea, с её текстом.
    //мы вставляем её в бд (кроме note_id)
    //получаем её из бд и вставляем в allNotes
    try {
      if (session !== null) {
        const { data, error } = await supabase
          .from("notes")
          .insert([
            //note_id будет добавляться автоматически бдшкой
            {
              title: note.title,
              content: note.content,
              completed: note.completed,
              user_id: session.user.id,
            },
          ])
          .select();

        if (error) {
          console.log("ошибка: ", error.message);
          return;
        } else {
          setAllNotes((prev) => {
            if (note.content.trim()) {
              return [...prev, data[0]];
            }
            return prev;
          });
        }
      }
    } catch (error) {
      console.log("Непредвиденная ошибка: ", error);
    }
  };

  const remove = async (note_id: number) => {
    await supabase.from("notes").delete().eq("note_id", note_id); //удаление с бд
    setAllNotes((prev) => prev.filter((n) => n.note_id !== note_id)); //удаление с локального массива
    //затем перерисовка displayedNotes will be changed
    //мы не можем не писать setAllNotes, тк notesList чтобы перерисоваться нужно чтобы изменился displayedNotes
  };

  const update = (note_id: number, changes: NoteType) =>
    setAllNotes((prev) =>
      prev.map((n) => (n.note_id === note_id ? { ...n, ...changes } : n)),
    );
  const toggle = (note_id: number) =>
    setAllNotes((prev) =>
      prev.map((n) =>
        n.note_id === note_id ? { ...n, completed: !n.completed } : n,
      ),
    );

  //сортировка::
  const sortByNew = () => {
    // setAllNotes([...allNotes].sort((a,b)=>b.createdAt.getTime() - a.createdAt.getTime()))
  };
  const sortByOld = () => {
    // setAllNotes([...allNotes].sort((a,b)=>a.createdAt.getTime() - b.createdAt.getTime()))
  };
  //фильтры:
  const showAllNotes = () => {
    setFilteredNotes(null);
  };
  const filterByCompleteds = () => {
    setFilteredNotes(null);
    const filtered = allNotes.filter((note) => note.completed);
    setFilteredNotes(filtered);
  };
  const filterByUnCompleteds = () => {
    setFilteredNotes(null);
    const filtered = allNotes.filter((note) => !note.completed);
    setFilteredNotes(filtered);
  };

  return {
    displayedNotes,
    add,
    update,
    remove,
    toggle,
    sortByNew,
    sortByOld,
    filterByCompleteds,
    filterByUnCompleteds,
    showAllNotes,
    getNotes,
  };
}
