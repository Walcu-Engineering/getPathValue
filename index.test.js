const getPathValue = require('./index.js'); 


const customer = {
  name: 'Test name',
  surname: 'Test surname',
  contacts: [{
    name: 'Test contact 1 name',
    phones: ['Test contact 1 phone 1', 'Test contact 1 phone 2'],
    emails: ['Test contact 1 email 1', 'Test contact 1 email 2'],
    nested: [
      { value: 1 },
      { value: 2 },
      { value: 3 },
    ]
  }],
};


describe('getPathValue', () => {
  test('Non existing path should return undefined', () => {
    expect(getPathValue(customer, '/theundefined')).toBe(undefined);
  });
  test('Simple top level path', () => {
    expect(getPathValue(customer, '/name')).toBe('Test name');
  });
  test('Array of objects', () => {
    expect(getPathValue(customer, '/contacts')).toEqual(customer.contacts);
  });
  test('Nested array of simple strings', () => {
    expect(getPathValue(customer, '/contacts/0/phones')).toEqual(customer.contacts[0].phones);
  });
  test('Nested array of generic path', () => {
    expect(getPathValue(customer, '/contacts/-/phones')).toEqual(customer.contacts.flatMap(c => c.phones));
  });
  test('Nested non existing path should return undefined', () => {
    expect(getPathValue(customer, '/contacts/0/phones/and/continue/deeper/in/the/path')).toBe(undefined);
  });
  test('Nested array of nested array simple value', () => {
    expect(getPathValue(customer, '/contacts/0/nested/0/value')).toEqual(1);
  });
  test('Nested array of nested array generic path', () => {
    expect(getPathValue(customer, '/contacts/0/nested/-/value')).toEqual([1,2,3]);
  });
  test('Nested array generic path of nested array simple value', () => {
    expect(getPathValue(customer, '/contacts/-/nested/0/value')).toEqual([1]);
  });
  test('Nested array generic path of nested array generic value', () => {
    expect(getPathValue(customer, '/contacts/-/nested/-/value')).toEqual([1, 2, 3]);
  });
});
