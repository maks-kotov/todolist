import type { NoteType } from "../note"
export type NoteEditingActionsType = {
    switchEditMode: (isEdit:boolean)=>void,
    getEditingNote:(note:NoteType)=>void,
    getEditedNote: (note:NoteType)=>void
}