import 'bootstrap/dist/css/bootstrap.min.css';
import * as React from 'react';
import { useEffect } from 'react';
import {
  Button,
  Col, Container, Navbar, Row,
} from 'react-bootstrap';
import {
  Link, useLocation, useNavigate, useParams,
} from 'react-router-dom';
import { Plus } from 'react-bootstrap-icons';
import Editor from '../editor/Editor';
import { addNote, setCurrentNote, unsetRedirectTo } from '../state/tasker/slice';
import NoteList from '../notes/NoteList';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import './app.css';

function App(): JSX.Element {
  const currentNote = useAppSelector((state) => state.tasker.currentNote);
  const redirectTo = useAppSelector((state) => state.tasker.redirectTo);
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
      <Navbar bg="light" sticky="top">
        <Container fluid>
          <Navbar.Brand as={Link} to="/">Tasker</Navbar.Brand>
          <Button variant="outline-primary" onClick={() => dispatch(addNote())}><Plus size={24} /></Button>
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
