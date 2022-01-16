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
    },
    orderedList: {
      attrs: { order: { default: 1 } },
      group: 'block',
      content: 'listItem+',
      toDOM: (node) => (node.attrs.order === 1 ? ['ol', 0] : ['ol', { start: node.attrs.order }, 0]),
    },
    bulletList: {
      group: 'block',
      content: 'listItem+',
      toDOM: () => ['ul', 0],
    },
    listItem: {
      group: 'listItem',
      content: 'paragraph block*',
      toDOM: () => ['li', 0],
    },
    text: {
      group: 'inline',
      inline: true,
    },
  },
  marks: {
    strong: {
      toDOM: () => ['strong', 0],
    },
    em: {
      toDOM: () => ['em', 0],
    },
  },
});
