import {
  InputRule, inputRules, textblockTypeInputRule, wrappingInputRule,
} from 'prosemirror-inputrules';
import { MarkType, NodeType } from 'prosemirror-model';
import { EditorState } from 'prosemirror-state';
import schema from './schema';

function markInputRule(
  regexp: RegExp,
  markType: MarkType,
  getAttrs: ((match: any) => any) | null = null,
) {
  return new InputRule(
    regexp,
    (state: EditorState, match: string[], start: number, end: number) => {
      const attrs = getAttrs instanceof Function ? getAttrs(match) : getAttrs;
      const { tr } = state;

      if (match[1]) {
        const textStart = start + match[0].indexOf(match[1]);
        const textEnd = textStart + match[1].length;
        if (textEnd < end) tr.delete(textEnd, end);
        if (textStart > start) tr.delete(start, textStart);
        end = start + match[1].length;
      }

      tr.addMark(start, end, markType.create(attrs));
      tr.removeStoredMark(markType); // Do not continue with mark.
      return tr;
    },
  );
}

function nodeInputRule(
  regexp: RegExp,
  markType: NodeType,
) {
  return new InputRule(
    regexp,
    (state: EditorState, match: string[], start: number, end: number) => {
      const { tr } = state;

      tr.replaceWith(start, end, markType.create());

      return tr;
    },
  );
}

export default inputRules({
  rules: [
    markInputRule(/(?:\*\*)([^\*]+)(?:\*\*)$/, schema.marks.strong),
    markInputRule(/(?:__)([^_]+)(?:__)$/, schema.marks.em),
    markInputRule(/(?:`)([^`]+)(?:`)$/, schema.marks.code),
    wrappingInputRule(/^\s*>\s$/, schema.nodes.blockquote),
    wrappingInputRule(
      /^(\d+)\.\s$/,
      schema.nodes.orderedList,
      (match) => ({ order: +match[1] }),
      (match, node) => node.childCount + node.attrs.order === +match[1],
    ),
    wrappingInputRule(/^([-+*])\s$/, schema.nodes.bulletList),
    textblockTypeInputRule(/^```$/, schema.nodes.codeBlock),
    textblockTypeInputRule(/^(#{1,6})\s$/, schema.nodes.heading, (match) => ({ level: match[1].length })),
    nodeInputRule(/^(?:---)$/, schema.nodes.horizontalRule),
  ],
});
