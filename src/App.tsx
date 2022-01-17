import 'bootstrap/dist/css/bootstrap.min.css';
import * as React from 'react';
import { useEffect } from 'react';
import {
  Button,
  Col, Container, Navbar, Row,
} from 'react-bootstrap';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Editor from './editor/Editor';
import { addNote, setCurrentNote, unsetRedirectTo } from './features/notes/notesSlice';
import NoteList from './notes/NoteList';
import { useAppDispatch, useAppSelector } from './stores/hooks';
import './app.css';

function App(): JSX.Element {
  const currentNote = useAppSelector((state) => state.notes.currentNote);
  const redirectTo = useAppSelector((state) => state.notes.redirectTo);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const urlParams = useParams();
  const location = useLocation();

  // TODO: This is a hack for navigating via Redux. Should be replaced with proper Redux based
  // navigation.
  if (redirectTo) {
    navigate(redirectTo);
    dispatch(unsetRedirectTo());
  }

  useEffect(() => {
    dispatch(setCurrentNote(urlParams.noteId));
  }, [location]);

  return (
    <>
      <Navbar sticky="top">
        <Container fluid>
          <Navbar.Brand href="#">Tasker</Navbar.Brand>
          <Button variant="outline-primary" onClick={() => dispatch(addNote())}>Add note</Button>
        </Container>
      </Navbar>

      <Container fluid>
        <Row>
          <Col md={2}>
            <NoteList />
          </Col>
          <Col>
            {currentNote ? <Editor /> : 'Select a note to edit'}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
