import {
  chainCommands, exitCode, Keymap, setBlockType, toggleMark, wrapIn,
} from 'prosemirror-commands';
import { redo, undo } from 'prosemirror-history';
import { Schema } from 'prosemirror-model';
import * as prosemirrorSchemaList from 'prosemirror-schema-list';

export default function generateKeymap(schema: Schema): Keymap {
  return {
    'Mod-z': undo,
    'Mod-y': redo,
    'Mod-Alt-1': setBlockType(schema.nodes.heading, { level: 1 }),
    'Mod-Alt-2': setBlockType(schema.nodes.heading, { level: 2 }),
    'Mod-Alt-3': setBlockType(schema.nodes.heading, { level: 3 }),
    'Mod-Alt-4': setBlockType(schema.nodes.heading, { level: 4 }),
    'Mod-Alt-5': setBlockType(schema.nodes.heading, { level: 5 }),
    'Mod-Alt-6': setBlockType(schema.nodes.heading, { level: 6 }),
    'Mod-Alt-0': setBlockType(schema.nodes.paragraph),
    'Mod-Alt-c': setBlockType(schema.nodes.codeBlock),
    'Mod-Alt-h': (state, dispatch) => {
      dispatch(state.tr.replaceSelectionWith(schema.nodes.horizontalRule.create())
        .scrollIntoView());
    },
    'Mod-Alt-b': wrapIn(schema.nodes.blockquote),
    'Shift-Enter': chainCommands(exitCode, (state, dispatch) => {
      dispatch(state.tr.replaceSelectionWith(schema.nodes.hardBreak.create()).scrollIntoView());
      return true;
    }),
    'Mod-Alt-8': prosemirrorSchemaList.wrapInList(schema.nodes.bulletList),
    'Mod-Alt-9': prosemirrorSchemaList.wrapInList(schema.nodes.orderedList),
    'Mod-b': toggleMark(schema.marks.strong),
    'Mod-i': toggleMark(schema.marks.em),
    'Mod-Alt-x': toggleMark(schema.marks.code),
    Enter: prosemirrorSchemaList.splitListItem(schema.nodes.listItem),

    // Add tab support for code blocks
    Tab: prosemirrorSchemaList.sinkListItem(schema.nodes.listItem),
    'Shift-Tab': prosemirrorSchemaList.liftListItem(schema.nodes.listItem),
  };
}
