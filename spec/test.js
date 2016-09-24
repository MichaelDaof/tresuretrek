var assert = require('assert');

describe('Mocha', function() {
  describe('#Mocha', function() {

    // Having no callback for assertion tests will label the test as "pending",
    // just as it would with tests with an "x" by it.
    // This system is good for writing speculative tests to be completed later.
    it('Someone should fill this test out'/*, function (){...}*/);

    xit('Fails if assertion is not equal', function (){
      assert.equal("and fail", "an assertion test")
    });
  });
  describe('#Some Unit', function (){
    it('A new section for a new unit to test', function (){
      assert.equal("value", "value")
    })
  })
});
