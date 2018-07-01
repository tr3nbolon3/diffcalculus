import _ from 'lodash';

const makeValueByType = value => (typeof value === 'string' ? `'${value}'` : `${value}`);
const makeValue = value => (_.isObject(value) ? 'complex value' : makeValueByType(value));

const render = (ast, parent = '') => {
  const makeString = (node, body = '') => `Property '${parent}${node.key}' was ${node.type}${body}`;
  const typeActions = {
    updated: (node) => {
      const body = `. From ${makeValue(node.oldValue)} to ${makeValue(node.newValue)}`;
      return makeString(node, body);
    },
    removed: node => makeString(node),
    added: (node) => {
      const stringify = ` with ${_.isObject(node.value) ? 'complex value' : `value: ${makeValueByType(node.value)}`}`;
      return makeString(node, stringify);
    },
    nested: node => `${render(node.children, `${parent}${node.key}.`)}`,
  };

  const filtered = ast.filter(n => n.type !== 'unchanged');
  return filtered.map(node => typeActions[node.type](node)).join('\n');
};

export default render;
