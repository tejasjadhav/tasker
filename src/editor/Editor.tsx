import { EditorState } from 'prosemirror-state';
import * as React from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { Trash } from 'react-bootstrap-icons';
import { ProseMirror, useProseMirror } from 'use-prosemirror';
import { deleteNote, setRefreshPending, updateNote } from '../state/taskerSlice';
import { Note } from '../notes/models';
import { useAppDispatch, useAppSelector } from '../state/hooks';
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
  const note = useAppSelector((state) => state.tasker.currentNote);
  const refreshPending = useAppSelector((state) => state.tasker.refreshPending);
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

          <Button variant="outline-danger" onClick={() => dispatcher(deleteNote(note))}><Trash /></Button>
        </InputGroup>
      </Form>

      <div className="mb-2" />

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
