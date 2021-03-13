import {firstBet} from "../assets/js/cpuBets.js";

var assert = require('chai').assert;
describe('function', function() {
  /*TEST ONE: it should return the player bet if he has a pair comb, given the cards on the table*/
    it('should return 40 as bet answer', function(){
      // firstBet(total,ingame,ontablefish, result, random)
      assert.equal(firstBet(90, 10, ["10","20","10","10"], 1, undefined), 40);
    });
 /*TEST TWO: it should return the player bet if he has a straight, given the cards on the table*/
    it('should return 80 as bet answer', function(){
        // firstBet(total,ingame,ontablefish, result, random)
        assert.equal(firstBet(90, 10, ["10","20","40","10"], 4, undefined), 80);
      });
 /*TEST THREE: it should return the player bet if he has a fourofaKind or more, given the cards on the table*/
    it('should return 100 as bet answer', function(){
    // firstBet(total,ingame,ontablefish, result, undefined)
    assert.equal(firstBet(90, 10, ["10","20","40","10"], 7, undefined), 100);
    });
/*TEST FOUR: it should return the player bet if he has not enough fish as the maxfish on the table but he wants to bet anyway*/
it('should return 50 as bet answer', function(){
    // firstBet(total,ingame,ontablefish, result, undefined)
    assert.equal(firstBet(40, 10, ["10","20","60","10"], 4, undefined), 50);
    });
});