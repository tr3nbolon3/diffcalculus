import _ from 'lodash';

const propertyActions = [
  {
    check: (obj1, obj2, key) => _.isObject(obj1[key]) && _.isObject(obj2[key]),
    process: (property1, property2, fn) => ({ children: fn(property1, property2) }),
    type: 'nested',
  },
  {
    check: (obj1, obj2, key) => _.has(obj1, key) && _.has(obj2, key) && obj1[key] === obj2[key],
    process: property1 => ({ value: property1 }),
    type: 'unchanged',
  },
  {
    check: (obj1, obj2, key) => _.has(obj1, key) && _.has(obj2, key) && obj1[key] !== obj2[key],
    process: (property1, property2) => ({ oldValue: property1, newValue: property2 }),
    type: 'updated',
  },
  {
    check: (obj1, obj2, key) => _.has(obj1, key) && !_.has(obj2, key),
    process: property1 => ({ value: property1 }),
    type: 'removed',
  },
  {
    check: (obj1, obj2, key) => !_.has(obj1, key) && _.has(obj2, key),
    process: (property1, property2) => ({ value: property2 }),
    type: 'added',
  },
];

const buildAst = (obj1, obj2) => {
  const keys = _.union(_.keys(obj1), _.keys(obj2));
  return keys.map((key) => {
    const { type, process } = _.find(propertyActions, ({ check }) => check(obj1, obj2, key));
    return { key, type, ...process(obj1[key], obj2[key], buildAst) };
  });
};

export default buildAst;
