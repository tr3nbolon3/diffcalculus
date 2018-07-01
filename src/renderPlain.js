import _ from 'lodash';

const makeValueByType = value => (typeof value === 'string' ? `'${value}'` : `${value}`);
const makeValue = value => (_.isObject(value) ? 'complex value' : makeValueByType(value));

const render = (ast, parent = '') => {
  const makeString = (node, body = '') => `Property '${parent}${node.key}' was ${node.type}${body}`;
  const typeActions = {
    unchanged: () => null,
    updated: (node) => {
      const body = `. From ${makeValue(node.oldValue)} to ${makeValue(node.newValue)}`;
      return makeString(node, body);
    },
    removed: node => makeString(node),
    added: (node) => {
      const body = ` with ${_.isObject(node.value) ? 'complex value' : `value: ${makeValueByType(node.value)}`}`;
      return makeString(node, body);
    },
    nested: node => `${render(node.children, `${parent}${node.key}.`)}`,
  };

  return ast.map(node => typeActions[node.type](node)).filter(n => n).join('\n');
};

export default render;
