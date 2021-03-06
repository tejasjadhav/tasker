import Bold from '@tiptap/extension-bold';
import BulletList from '@tiptap/extension-bullet-list';
import Code from '@tiptap/extension-code';
import CodeBlock from '@tiptap/extension-code-block';
import Document from '@tiptap/extension-document';
import HardBreak from '@tiptap/extension-hard-break';
import Heading from '@tiptap/extension-heading';
import History from '@tiptap/extension-history';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
import Italic from '@tiptap/extension-italic';
import Link from '@tiptap/extension-link';
import ListItem from '@tiptap/extension-list-item';
import OrderedList from '@tiptap/extension-ordered-list';
import Paragraph from '@tiptap/extension-paragraph';
import Placeholder from '@tiptap/extension-placeholder';
import Strike from '@tiptap/extension-strike';
import TaskItem from '@tiptap/extension-task-item';
import TaskList from '@tiptap/extension-task-list';
import Text from '@tiptap/extension-text';
import UniqueID from '@tiptap/extension-unique-id';
import { EditorContent, useEditor } from '@tiptap/react';
import * as React from 'react';
import { Dropdown, Form, Stack } from 'react-bootstrap';
import { ThreeDots, Trash } from 'react-bootstrap-icons';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import {
  deleteNote, setRefreshPending, updateNote, updateNoteContent,
} from '../state/tasker/slice';
import './editor.css';

function Editor(): JSX.Element {
  const note = useAppSelector((state) => state.tasker.currentNote);
  const refreshPending = useAppSelector((state) => state.tasker.refreshPending);

  const dispatcher = useAppDispatch();

  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      Heading,
      BulletList,
      OrderedList,
      CodeBlock,
      ListItem,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      HardBreak.configure({
        keepMarks: false,
      }),
      HorizontalRule,

      Bold,
      Italic,
      Strike,
      Code,
      Link,

      History,
      Placeholder.configure({
        placeholder: 'What\'s on your mind?',
      }),
      UniqueID.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    content: note?.content,
    autofocus: true,
    onUpdate({ editor }) {
      dispatcher(updateNoteContent({ ...note, content: editor.getJSON() }));
    },
  });

  if (refreshPending) {
    editor?.commands.setContent(note.content);
    dispatcher(setRefreshPending(false));
  }

  return (
    <div>
      <Stack direction="horizontal" gap={3}>
        <Form.Control
          value={note.title}
          className="note-title shadow-none me-auto"
          placeholder="Title"
          autoComplete="off"
          onChange={(e) => dispatcher(updateNote({ ...note, title: e.target.value }))}
        />
        <Dropdown className="editor-menu">
          <Dropdown.Toggle variant="secondary" id="dropdown-basic"><ThreeDots /></Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={() => dispatcher(deleteNote(note))}>
              <Trash />
              {' '}
              Delete
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Stack>

      <div className="mb-2" />

      <EditorContent editor={editor} className="editor" />
    </div>
  );
}

export default Editor;
