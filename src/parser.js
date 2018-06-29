import yaml from 'js-yaml';

const parsers = {
  '.json': JSON.parse,
  '.yml': yaml.safeLoad,
};

export default (fileExt, fileData) => parsers[fileExt](fileData);
