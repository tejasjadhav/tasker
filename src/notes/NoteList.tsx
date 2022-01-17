import { formatDistance } from 'date-fns';
import * as React from 'react';
import { ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../state/hooks';

function NoteList(): JSX.Element {
  const notes = useAppSelector((state) => state.tasker.notes);
  const currentNote = useAppSelector((state) => state.tasker.currentNote);
  const navigate = useNavigate();
  const currentDate = new Date();

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
              <p className="text-truncate">
                {note.title}
              </p>
              <small className="flex-shrink-0">{formatDistance(note.updatedAt, currentDate)}</small>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}

export default NoteList;
