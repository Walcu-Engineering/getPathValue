# getPathValue
Function that returns the path's value for the given object

## API
### `getPathValue(object, path)`
The `object` parameter is any object, and `path` is a string in JSON Pointer format as defined by the RFC6901.
The function returns the value for the given path, if the path does not exists in the object, it will return `undefined`, and if the path is not a valid JSON Pointer string, it will throw an assertion error.
