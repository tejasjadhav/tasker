/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import sampleNotes from '../../fixtures/notes.json';
import Note from '../../models/Note';

interface Notes {
  notes: Note[];
  currentNote: Note | null;
  refreshPending: boolean;
  redirectTo: string | null;
}

const initialState: Notes = {
  notes: sampleNotes,
  currentNote: null,
  refreshPending: false,
  redirectTo: null,
};

function createNewNote(title: string): Note {
  return { uid: String(uuidv4()), title, content: { type: 'doc', content: [] } };
}

export const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addNote: (state: Notes) => {
      const note = createNewNote(`Note ${state.notes.length + 1}`);
      state.notes.push(note);
      state.redirectTo = `/${note.uid}`;
    },
    deleteNote: (state: Notes, action: PayloadAction<Note>) => {
      state.notes = state.notes.filter((note) => note.uid !== action.payload.uid);
      state.redirectTo = '/';
    },
    updateNote: (state: Notes, action: PayloadAction<Note>) => {
      const note = state.notes.find((note) => note.uid === action.payload.uid);
      if (note) {
        note.title = action.payload.title;
        note.content = action.payload.content;

        if (note.uid === state.currentNote.uid) {
          state.currentNote = note;
        }
      }
    },
    setCurrentNote: (state: Notes, action: PayloadAction<string>) => {
      const note = state.notes.find((note) => note.uid === action.payload);
      if (note) {
        state.currentNote = note;
      } else {
        state.currentNote = null;
      }

      state.refreshPending = true;
    },
    setRefreshPending: (state: Notes, action: PayloadAction<boolean>) => {
      state.refreshPending = action.payload;
    },
    unsetRedirectTo: (state: Notes) => {
      state.redirectTo = null;
    },
  },
});

export const {
  addNote, deleteNote, updateNote, setCurrentNote, setRefreshPending, unsetRedirectTo,
} = notesSlice.actions;

export default notesSlice.reducer;
