const getPathValue = require('./index.js'); 


const customer = {
  name: 'Test name',
  surname: 'Test surname',
  contacts: [{
    name: 'Test contact 1 name',
    phones: ['Test contact 1 phone 1', 'Test contact 1 phone 2'],
    emails: ['Test contact 1 email 1', 'Test contact 1 email 2'],
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
  test('Nested non existing path should return undefined', () => {
    expect(getPathValue(customer, '/contacts/0/phones/and/continue/deeper/in/the/path')).toBe(undefined);
  });
});
