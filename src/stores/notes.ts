import { configureStore } from '@reduxjs/toolkit';
import notesReducer from '../features/notes/notesSlice';
import Note from '../models/Note';

function getStoredNotes(): Note[] {
  const notes = localStorage.getItem('notes');
  return JSON.parse(notes || '[]');
}

const store = configureStore({
  reducer: {
    notes: notesReducer,
  },
  preloadedState: {
    notes: {
      notes: getStoredNotes(),
      currentNote: null,
      refreshPending: false,
      redirectTo: null,
    },
  },
});

store.subscribe(() => {
  localStorage.setItem('notes', JSON.stringify(store.getState().notes.notes));
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;
