type OldNoteType = {
    id: number,
    title: string,
    content: string,
    completed: boolean,
    createdAt: Date,
}
export type NoteType = Omit<OldNoteType, 'id'> & {
    note_id: OldNoteType['id']
}