import type { NoteType } from "../note"
export type NoteContextType = {
    switchEditMode: (isEdit:boolean)=>void,
    getEditingNote:(note:NoteType)=>void,
    update: (id:number, changes: NoteType)=>void,
    remove: (id:number)=>void,
    toggle: (id:number)=>void,
}