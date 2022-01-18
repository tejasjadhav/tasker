import { Schema } from 'prosemirror-model';

export default new Schema({
  nodes: {
    doc: {
      content: 'block+',
    },
    paragraph: {
      group: 'block',
      content: 'inline*',
      toDOM: () => ['p', 0],
      parseDOM: [{ tag: 'p' }],
    },
    heading: {
      attrs: {
        level: {
          default: 1,
        },
      },
      group: 'block',
      content: 'inline*',
      toDOM: (node) => [`h${node.attrs.level}`, 0],
      parseDOM: [
        { tag: 'h1', attrs: { level: 1 } },
        { tag: 'h2', attrs: { level: 2 } },
        { tag: 'h3', attrs: { level: 3 } },
        { tag: 'h3', attrs: { level: 4 } },
        { tag: 'h3', attrs: { level: 5 } },
        { tag: 'h3', attrs: { level: 6 } },
      ],
    },
    codeBlock: {
      group: 'block',
      content: 'text*',
      marks: '',
      code: true,
      defining: true,
      toDOM: () => ['pre', ['code', 0]],
      parseDOM: [{ tag: 'pre', preserveWhitespace: 'full' }],
    },
    blockquote: {
      group: 'block',
      content: 'block+',
      defining: true,
      toDOM: () => ['blockquote', 0],
      parseDOM: [{ tag: 'blockquote' }],
    },
    horizontalRule: {
      group: 'block',
      parseDOM: [{ tag: 'hr' }],
      toDOM: () => ['hr'],
    },
    orderedList: {
      attrs: { order: { default: 1 } },
      group: 'block',
      content: 'listItem+',
      toDOM: (node) => (node.attrs.order === 1 ? ['ol', 0] : ['ol', { start: node.attrs.order }, 0]),
      parseDOM: [{
        tag: 'ol',
        getAttrs(dom: any) {
          return { order: dom.hasAttribute('start') ? +dom.getAttribute('start') : 1 };
        },
      }],
    },
    bulletList: {
      group: 'block',
      content: 'listItem+',
      toDOM: () => ['ul', 0],
      parseDOM: [{ tag: 'ul' }],
    },
    listItem: {
      group: 'listItem',
      content: 'paragraph block*',
      toDOM: () => ['li', 0],
      parseDOM: [{ tag: 'li' }],
    },
    text: {
      group: 'inline',
      inline: true,
    },
    hardBreak: {
      group: 'inline',
      inline: true,
      selectable: false,
      toDOM: () => ['br'],
      parseDOM: [{ tag: 'br' }],
    },
  },
  marks: {
    strong: {
      toDOM: () => ['strong', 0],
      parseDOM: [{ tag: 'strong' }],
    },
    em: {
      toDOM: () => ['em', 0],
      parseDOM: [{ tag: 'em' }],
    },
    code: {
      toDOM: () => ['code', 0],
      parseDOM: [{ tag: 'code' }],
    },
  },
});
