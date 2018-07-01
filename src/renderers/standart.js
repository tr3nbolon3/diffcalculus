import _ from 'lodash';

const defaultSpaces = 4;

const stringify = (value, spaces = defaultSpaces) => {
  if (!_.isObject(value)) {
    return value;
  }
  const body = _.keys(value)
    .map(key => `${' '.repeat(spaces)}${key}: ${stringify(value[key], spaces + defaultSpaces)}`)
    .join('\n');
  return `{\n${body}\n${' '.repeat(spaces - defaultSpaces)}}`;
};

const render = (ast, spaces = defaultSpaces) => {
  const nextSpaces = spaces + defaultSpaces;
  const makeString = (name, value, char = ' ') => `${' '.repeat(spaces - 2)}${char} ${name}: ${stringify(value, nextSpaces)}`;

  const typeActions = {
    unchanged: node => makeString(node.key, node.value),
    updated: node => [
      makeString(node.key, node.newValue, '+'),
      makeString(node.key, node.oldValue, '-'),
    ],
    removed: node => makeString(node.key, node.value, '-'),
    added: node => makeString(node.key, node.value, '+'),
    nested: node => `${' '.repeat(spaces)}${node.key}: ${render(node.children, nextSpaces)}`,
  };

  const diffStr = _.flatten(ast.map(node => typeActions[node.type](node))).join('\n');
  return `{\n${diffStr}\n${' '.repeat(spaces - defaultSpaces)}}`;
};

export default render;
