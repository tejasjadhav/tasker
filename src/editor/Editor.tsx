import { baseKeymap } from 'prosemirror-commands';
import { history } from 'prosemirror-history';
import { keymap } from 'prosemirror-keymap';
import { EditorState as ProseMirrorEditorState } from 'prosemirror-state';
import * as React from 'react';
import { Form } from 'react-bootstrap';
import { ProseMirror } from 'use-prosemirror';
import Note from '../models/Note';
import './editor.css';
import generateKeymap from './keymap';
import schema from './schema';

interface EditorProps {
  note: Note;
  onChange: (note: Note) => void;
}

interface EditorState {
  editorState: ProseMirrorEditorState;
}

const plugins = [
  history(),
  keymap(generateKeymap(schema)),
  keymap(baseKeymap),
];

class Editor extends React.Component<EditorProps, EditorState, any> {
  constructor(props: EditorProps) {
    super(props);

    this.state = {
      editorState: ProseMirrorEditorState.create({
        doc: schema.nodeFromJSON(props.note.content),
        schema,
        plugins,
      }),
    };
  }

  componentDidUpdate(prevProps: EditorProps): void {
    const { note } = this.props;

    if (prevProps.note.uid !== note.uid) {
      this.setState({
        editorState: ProseMirrorEditorState.create({
          doc: schema.nodeFromJSON(note.content),
          schema,
          plugins,
        }),
      });
    }
  }

  onEditorStateChange(note: Note, editorState: ProseMirrorEditorState): void {
    const { onChange } = this.props;
    onChange({ ...note, content: editorState.doc.toJSON() });

    this.setState({ editorState });
  }

  render(): React.ReactNode {
    const { note, onChange } = this.props;
    const { editorState } = this.state;

    return (
      <div>
        <Form>
          <Form.Control
            value={note.title}
            onChange={(e) => onChange({ ...note, title: e.target.value })}
          />
        </Form>
        <ProseMirror
          state={editorState}
          onChange={(newEditorState: ProseMirrorEditorState) => {
            this.onEditorStateChange(note, newEditorState);
          }}
          className="editor"
        />
      </div>
    );
  }
}

export default Editor;
