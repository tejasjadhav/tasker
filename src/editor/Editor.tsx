import { EditorState } from 'prosemirror-state';
import * as React from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { ProseMirror, useProseMirror } from 'use-prosemirror';
import { deleteNote, setRefreshPending, updateNote } from '../features/notes/notesSlice';
import Note from '../models/Note';
import { useAppDispatch, useAppSelector } from '../stores/hooks';
import './editor.css';
import plugins from './plugins';
import schema from './schema';

function createEditorState(note: Note): any {
  return {
    doc: note ? schema.nodeFromJSON(note.content) : null,
    schema,
    plugins: plugins(schema),
  };
}

function Editor(): JSX.Element {
  const note = useAppSelector((state) => state.notes.currentNote);
  const refreshPending = useAppSelector((state) => state.notes.refreshPending);
  const dispatcher = useAppDispatch();

  const [state, setState] = useProseMirror(createEditorState(note));

  if (refreshPending) {
    dispatcher(setRefreshPending(false));
    setState(EditorState.create(createEditorState(note)));
  }

  return (
    <div>
      <Form>
        <InputGroup>
          <Form.Control
            value={note.title}
            onChange={(e) => dispatcher(updateNote({ ...note, title: e.target.value }))}
          />

          <Button variant="outline-danger" onClick={() => dispatcher(deleteNote(note))}>Delete</Button>
        </InputGroup>
      </Form>
      <ProseMirror
        state={state}
        onChange={(newEditorState: EditorState) => {
          setState(newEditorState);
          dispatcher(updateNote({ ...note, content: newEditorState.doc.toJSON() }));
        }}
        className="editor"
      />
    </div>
  );
}

export default Editor;
