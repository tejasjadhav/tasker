import { Note } from '../notes/models';

export interface TaskerState {
  notes: Note[];
  currentNote: Note | null;
  refreshPending: boolean;
  redirectTo: string | null;
}
