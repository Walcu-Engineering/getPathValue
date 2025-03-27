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
  const splitted_path = path.split('/');
  const getPathValueRec = (obj, idx) => {
    const curr_path = splitted_path[idx];
    if (curr_path == null || obj == null) return obj;
    if (curr_path === '-') {
      if (!Array.isArray(obj))
        throw new TypeError(obj + ' is not an array');
      let ret = [];
      for (const sub_obj of obj) {
        const value = getPathValueRec(sub_obj, idx + 1);
        if (Array.isArray(value))
          ret = ret.concat(value)
        else
          ret.push(value);
      }
      return ret;
    }
    return getPathValueRec(obj[curr_path], idx + 1);
  };
  return getPathValueRec(object, 1);
}

module.exports = getPathValue;
