const { forEach } = require('../js/utils');
const assert = require('assert');

console.log('Running tests for forEach...');

// Test Array iteration
(function testArray() {
  const arr = ['a', 'b', 'c'];
  const result = [];
  forEach(arr, (val, index, collection) => {
    result.push({ val, index, collection });
  });
  assert.strictEqual(result.length, 3);
  assert.deepStrictEqual(result[0], { val: 'a', index: 0, collection: arr });
  assert.deepStrictEqual(result[1], { val: 'b', index: 1, collection: arr });
  assert.deepStrictEqual(result[2], { val: 'c', index: 2, collection: arr });
  console.log('✓ testArray passed');
})();

// Test Object iteration
(function testObject() {
  const obj = { x: 1, y: 2 };
  const result = {};
  forEach(obj, (val, key, collection) => {
    result[key] = { val, collection };
  });
  assert.strictEqual(Object.keys(result).length, 2);
  assert.deepStrictEqual(result.x, { val: 1, collection: obj });
  assert.deepStrictEqual(result.y, { val: 2, collection: obj });
  console.log('✓ testObject passed');
})();

// Test context binding (this)
(function testContext() {
  const context = { prefix: 'test_' };
  const arr = [1];
  let result = '';
  forEach(arr, function(val) {
    result = this.prefix + val;
  }, context);
  assert.strictEqual(result, 'test_1');
  console.log('✓ testContext passed');
})();

// Test empty collection
(function testEmpty() {
  let callCount = 0;
  forEach([], () => callCount++);
  forEach({}, () => callCount++);
  assert.strictEqual(callCount, 0);
  console.log('✓ testEmpty passed');
})();

// Test Object with inherited properties (should only iterate own properties)
(function testInheritedProperties() {
  function MyObj() {
    this.ownProp = 'value';
  }
  MyObj.prototype.inheritedProp = 'inherited';
  const instance = new MyObj();

  const result = [];
  forEach(instance, (val, key) => {
    result.push(key);
  });
  assert.strictEqual(result.length, 1);
  assert.strictEqual(result[0], 'ownProp');
  console.log('✓ testInheritedProperties passed');
})();

// Test array-like object (e.g. NodeList mock)
(function testArrayLike() {
  const arrayLike = { 0: 'first', 1: 'second', length: 2 };
  // Mock it to not be [object Object] so it's treated as array-like
  Object.defineProperty(arrayLike, Symbol.toStringTag, { value: 'NodeList' });

  const result = [];
  forEach(arrayLike, (val, index) => {
    result.push({ val, index });
  });
  assert.strictEqual(result.length, 2);
  assert.strictEqual(result[0].val, 'first');
  assert.strictEqual(result[1].val, 'second');
  console.log('✓ testArrayLike passed');
})();

console.log('All tests passed successfully!');
