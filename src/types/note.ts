export type NoteType = {
    note_id: number,
    title: string,
    content: string,
    completed: boolean,
    created_at: string,
    updated_at: string | null,
    removed_at: string | null,
    removed_in_ui: boolean
}
