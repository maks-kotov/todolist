import type { NoteType } from "../note"
export type NoteContextType = {
    switchEditMode: (isEdit:boolean)=>void,
    switchViewMode: (isView:boolean)=>void,
    getCurrentNote:(note:NoteType)=>void,
    update: (id:number, changes: NoteType)=>void,
    remove: (id:number)=>void,
    toggle: (id:number)=>void,
    sortByNew: ()=>void,
    sortByOld: ()=>void,
    showAllNotes: ()=>void,
    // filterByAlphabet: ()=>void,
    filterByCompleteds: ()=>void,
    filterByUnCompleteds: ()=>void,
    // filterByRemoveds: ()=>void,
}