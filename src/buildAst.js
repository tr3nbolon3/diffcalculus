import _ from 'lodash';

const buildAst = (obj1, obj2) => {
  const keys = _.union(_.keys(obj1), _.keys(obj2));

  const ast = keys.map((key) => {
    const property1 = obj1[key];
    const property2 = obj2[key];

    if (_.has(obj1, key) && _.has(obj2, key)) {
      if (_.isObject(property1) && _.isObject(property2)) {
        return { key, type: 'nested', children: buildAst(property1, property2) };
      }
      if (property1 === property2) {
        return { key, value: property1, type: 'unchanged' };
      }
      return {
        key,
        type: 'changed',
        oldValue: property1,
        newValue: property2,
      };
    }
    if (_.has(obj1, key)) {
      return {
        key,
        type: 'removed',
        value: property1,
      };
    }

    return {
      key,
      type: 'added',
      value: property2,
    };
  });

  return ast;
};

export default buildAst;
