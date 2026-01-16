import { createContext } from "react"
import type { NoteEditingActionsType } from "../types/contexts/noteEditingActions"

export const NoteEditingActionsContext = createContext<NoteEditingActionsType | null>(null)