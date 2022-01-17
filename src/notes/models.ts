import schema from '../editor/schema';

export interface Note {
  uid: string;
  title: string;
  content: any;
  createdAt: number;
  updatedAt: number;
}

export function getSummary(note: Note): string {
  return schema.nodeFromJSON(note.content).textContent.substring(0, 50);
}
