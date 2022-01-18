import { baseKeymap } from 'prosemirror-commands';
import { history } from 'prosemirror-history';
import { keymap } from 'prosemirror-keymap';
import { Schema } from 'prosemirror-model';
import { Plugin } from 'prosemirror-state';
import inputRules from './inputRules';
import generateKeymap from './keymap';

function plugins(schema: Schema): Plugin[] {
  return [
    inputRules,
    history(),
    keymap(generateKeymap(schema)),
    keymap(baseKeymap),
  ];
}

export default plugins;
