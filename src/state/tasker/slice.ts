/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { emptyContent } from '../../editor/utils';
import { STATE } from '../../constants/constants';
import { Note } from '../../notes/models';
import { State } from './state';

const initialState: State = {
  notes: [],
  currentNote: null,
  refreshPending: false,
  redirectTo: null,
};

function createNewNote(title: string): Note {
  return {
    uid: String(uuidv4()),
    title,
    content: emptyContent(),
    createdAt: new Date().getTime(),
    updatedAt: new Date().getTime(),
  };
}

export const slice = createSlice({
  name: STATE,
  initialState,
  reducers: {
    addNote: (state: State) => {
      const note = createNewNote(`Note ${state.notes.length + 1}`);
      state.notes.unshift(note);
      state.redirectTo = `/${note.uid}`;
    },
    deleteNote: (state: State, action: PayloadAction<Note>) => {
      state.notes = state.notes.filter((note) => note.uid !== action.payload.uid);
      state.redirectTo = '/';
    },
    updateNote: (state: State, action: PayloadAction<Note>) => {
      const note = state.notes.find((note) => note.uid === action.payload.uid);
      if (note) {
        note.title = action.payload.title;
        note.content = action.payload.content;
        note.updatedAt = new Date().getTime();

        if (note.uid === state.currentNote.uid) {
          state.currentNote = note;
        }
      }
    },
    setCurrentNote: (state: State, action: PayloadAction<string>) => {
      const note = state.notes.find((note) => note.uid === action.payload);
      if (note) {
        state.currentNote = note;
      } else {
        state.currentNote = null;
      }

      state.refreshPending = true;
    },
    setRefreshPending: (state: State, action: PayloadAction<boolean>) => {
      state.refreshPending = action.payload;
    },
    unsetRedirectTo: (state: State) => {
      state.redirectTo = null;
    },
  },
});

export const {
  addNote, deleteNote, updateNote, setCurrentNote, setRefreshPending, unsetRedirectTo,
} = slice.actions;

export default slice.reducer;
