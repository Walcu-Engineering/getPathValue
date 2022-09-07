const isJsonPointer = require('@walcu-engineering/isjsonpointer');
const assert = require('assert');
/**
 * This is a getIn equivalent
 * @param object: any value
 * @param path: String in JSON pointer format
 * @returns the current value for the given path
 */
const getPathValue = (object, path = '') => {
  assert(isJsonPointer(path), `${path} is not a JSON pointer path`);
  return path
    .split('/')
    .slice(1)
    .reduce((subpath_part_value, subpath_part, i, path_array) => {
      if(subpath_part_value == null){
        if(i < path_array.length - 1) return {};
        return subpath_part_value;
      }
      return subpath_part_value[subpath_part];
    }, object);
}

module.exports = getPathValue;
