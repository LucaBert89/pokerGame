import {findtheWinner} from "../assets/js/findWinner.js"

var assert = require('chai').assert;
describe('function', function() {
  /*TEST ONE: one winner of the game with an higher score than the others*/
    it('should return 3 as the winner of the game', function(){
      // findtheWinner(winner, winnerScore, compareScores, ingameScores, playerRanksArray)
      assert.equal(findtheWinner(undefined,6,[0,6],[{0:0},{3:6}], [["3", "5", "7", "9", "10"], ["3", "4", "12", "14", "14"], ["5", "7", "7", "12", "12"], ["4", "4", "11", "11", "11"]]), 3);
    });
//TEST TWO: two players that have the same score, the winner has the higher sum of the cards*/
    it('should return 0 as the winner of the game', function(){
       // findtheWinner(winner, winnerScore, compareScores, ingameScores, playerRanksArray)
      assert.equal(findtheWinner(undefined,1,[1,1],[{0:1},{1:1}], [["5", "8", "10", "10", "13"], ["2", "3", "3", "4", "8"]]),0);
    });
  //TEST THREE: two players that have the same score, the winner has the higher sum of the cards*/
    it('should return 1 as the winner of the game', function(){
      // findtheWinner(winner, winnerScore, compareScores, ingameScores, playerRanksArray)
     assert.equal(findtheWinner(undefined, 1,[1,1],[{0:1},{1:1}], [["2", "3", "3", "4", "8"], ["5", "8", "10", "10", "13"]]),1);
   });
});