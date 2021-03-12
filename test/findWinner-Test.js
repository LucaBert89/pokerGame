import {findtheWinner} from "../assets/js/findWinner.js"

var assert = require('chai').assert;
describe('function', function() {
    it('should return the winner of the game  ', function(){
      assert.equal(findtheWinner(6,[{0:0,3:6}], [["3", "5", "7", "9", "10"], ["3", "4", "12", "14", "14"], ["5", "7", "7", "12", "12"], ["4", "4", "11", "11", "11"]]), 3);
    });
});