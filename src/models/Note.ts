import schema from '../editor/schema';

interface Note {
  uid: string;
  title: string;
  content: any;
}

export function getSummary(note: Note): string {
  return schema.nodeFromJSON(note.content).textContent.substring(0, 50);
}

export default Note;
