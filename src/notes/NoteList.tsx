import * as React from 'react';
import { ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getSummary } from '../models/Note';
import { useAppDispatch, useAppSelector } from '../stores/hooks';

function NoteList(): JSX.Element {
  const notes = useAppSelector((state) => state.notes.notes);
  const currentNote = useAppSelector((state) => state.notes.currentNote);
  const dispatcher = useAppDispatch();
  const navigate = useNavigate();

  return (
    <div>
      <ListGroup>
        {notes.map((note) => (
          <ListGroup.Item
            key={note.uid}
            active={note.uid === currentNote?.uid}
            action
            onClick={() => navigate(`/${note.uid}`)}
          >
            <div className="d-flex w-100 justify-content-between">
              <h5 className="text-truncate">
                {note.title}
              </h5>
              <small className="flex-shrink-0">3 days ago</small>
            </div>

            <div className="text-truncate">{getSummary(note)}</div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}

export default NoteList;
