import {firstBet, cpuSecondRound} from "../assets/js/cpuBets.js";

var assert = require('chai').assert;
describe('function', function() {
  /*TEST ONE: it should return the player bet if he has a pair comb, given the cards on the table
    it('should return 40 as bet answer', function(){
      // firstBet(total,ingame,ontablefiche, result, random,i)
      assert.equal(firstBet(90, 10, ["10","20","10","10"], 1, undefined,1), 40);
    });
 /*TEST TWO: it should return the player bet if he has a straight, given the cards on the table
    it('should return 80 as bet answer', function(){
        // firstBet(total,ingame,ontablefiche, result, random)
        assert.equal(firstBet(90, 10, ["10","20","40","10"], 4, 1), 80);
      });
 /*TEST THREE: it should return the player bet if he has a fourofaKind or more, given the cards on the table
    it('should return 100 as bet answer', function(){
    // firstBet(total,ingame,ontablefiche, result, undefined)
    assert.equal(firstBet(90, 10, ["10","20","40","10"], 7, 1), 100);
    });
/*TEST FOUR: it should return the player bet if he has not enough fiche as the maxfiche on the table but he wants to bet anyway
    it('should return 50 as bet answer', function(){
    // firstBet(total,ingame,ontablefiche, result, undefined)
    assert.equal(firstBet(40, 10, ["10","20","60","10"], 4, 1), 50);
    });
// SECOND ROUND BET ANALYSIS

/*TEST ONE: it should return bet for the second round based on the fiche on table and a pair in hand*/
      it('should return 40 as bet answer', function(){
      // cpuSecondRound(difference,previous, ingame[i].textContent, total[i].textContent,ontablefiche,result[i])
      assert.equal(cpuSecondRound(0, "30", "30", "110", ["40", "30"],1), 40);
      });
/*TEST TWO: it should return bet for the second round based on the fiche on table and a straigth in hand*/
      it('should return 60 as bet answer', function(){
        // cpuSecondRound(difference,previous, ingame[i].textContent, total[i].textContent,ontablefiche,result[i])
        assert.equal(cpuSecondRound(0, "30", "30", "110", ["60", "30"],4), 60);
        });
  /*TEST THREE: it should return bet for the second round based on the fiche on table and a fourofaKind in hand*/
      it('should return 60 as bet answer', function(){
        // cpuSecondRound(difference,previous, ingame[i].textContent, total[i].textContent,ontablefiche,result[i])
        assert.equal(cpuSecondRound(0, "30", "30", "60", ["60", "30"],7), 60);
        });
  /*TEST FOUR: it should return a no-bet decision for the second round based on the fiche on table and a pair in hand*/
      it('should return 40 as bet answer', function(){
        // cpuSecondRound(difference,previous, ingame[i].textContent, total[i].textContent,ontablefiche,result[i])
        assert.equal(cpuSecondRound(0, "10", "10", "40", ["40", "30"],1), 10);
        });
});