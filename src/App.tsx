import 'bootstrap/dist/css/bootstrap.min.css';
import * as React from 'react';
import {
  Col, Container, Navbar, Row,
} from 'react-bootstrap';
import { useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Editor from './editor/Editor';
import NoteList from './notes/NoteList';
import sampleNotes from './fixtures/notes.json';

function App(): JSX.Element {
  const [notes, setNotes] = useState(sampleNotes);
  const [currentNote, setCurrentNote] = useState(null);

  const urlParams = useParams();
  const location = useLocation();

  useEffect(() => {
    setNotes(notes.map((note) => {
      if (currentNote && note.uid === currentNote.uid) {
        return currentNote;
      }

      return note;
    }));
    setCurrentNote(notes.find((note) => note.uid === urlParams.noteId));
  }, [location]);

  return (
    <div>
      <Navbar sticky="top">
        <Container fluid>
          <Navbar.Brand href="#">Tasker</Navbar.Brand>
        </Container>
      </Navbar>

      <Container fluid>
        <Row>
          <Col md={2}>
            <NoteList notes={notes} currentNote={currentNote} />
          </Col>
          <Col>
            {currentNote ? <Editor note={currentNote} onChange={setCurrentNote} /> : 'Select a note to edit'}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
