import { Keymap, setBlockType, toggleMark } from 'prosemirror-commands';
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
    'Mod-Alt-0': setBlockType(schema.nodes.paragraph),
    'Mod-Alt-8': prosemirrorSchemaList.wrapInList(schema.nodes.bulletList),
    'Mod-Alt-9': prosemirrorSchemaList.wrapInList(schema.nodes.orderedList),
    'Mod-b': toggleMark(schema.marks.strong),
    'Mod-i': toggleMark(schema.marks.em),
    Enter: prosemirrorSchemaList.splitListItem(schema.nodes.listItem),
    Tab: prosemirrorSchemaList.sinkListItem(schema.nodes.listItem),
    'Shift-Tab': prosemirrorSchemaList.liftListItem(schema.nodes.listItem),
  };
}
