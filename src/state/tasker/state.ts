import { Note } from '../../notes/models';

export interface State {
  notes: Note[];
  currentNote: Note | null;
  refreshPending: boolean;
  redirectTo: string | null;
}
