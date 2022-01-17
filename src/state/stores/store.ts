import { configureStore } from '@reduxjs/toolkit';
import notesReducer from '../taskerSlice';
import { Note } from '../../notes/models';
import { STATE } from '../../constants/constants';

function getStoredNotes(): Note[] {
  const notesJson = localStorage.getItem(STATE);
  return JSON.parse(notesJson || '[]');
}

const store = configureStore({
  reducer: {
    tasker: notesReducer,
  },
  preloadedState: {
    tasker: {
      notes: getStoredNotes(),
      currentNote: null,
      refreshPending: false,
      redirectTo: null,
    },
  },
});

store.subscribe(() => {
  localStorage.setItem(STATE, JSON.stringify(store.getState().tasker.notes));
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;
