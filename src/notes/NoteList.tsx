import * as React from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Note from '../models/Note';

interface NoteListProps {
  notes: Note[];
  currentNote: Note;
}

function NoteList(props: NoteListProps): JSX.Element {
  const { notes, currentNote } = props;

  return (
    <Nav activeKey={currentNote ? currentNote.uid : null} as="ul" className="flex-column">
      {notes.map((note) => (
        <Nav.Item key={note.uid} as="li">
          <Nav.Link eventKey={note.uid} as={Link} to={`/${note.uid}`}>
            {note.title}
          </Nav.Link>
        </Nav.Item>
      ))}
    </Nav>
  );
}

export default NoteList;
