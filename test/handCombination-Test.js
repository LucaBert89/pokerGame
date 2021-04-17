import {findPair, threeOrFull, straigth} from "../assets/js/combinations.js"

var assert = require('chai').assert;
describe('function', function() {
  /*TEST ONE: return a pair if the are two equal cards*/
    it('should return 1 score for pair', function(){
      // findPair(values, result)
      assert.equal(findPair([1, 2, 1, 1], []), 1);
    });
    /*TEST TWO: return a twopair if the are 2 couple of equal cards*/
    it('should return 2 score for twopair', function(){
        // findPair(values, result)
        assert.equal(findPair([2, 1, 2], []), 2);
      });
    /*TEST THREE: return a threeofaKind if the are 3 equal cards*/
    it('should return 3 score for threeofaKind', function(){
      // threeOrFull(values, result)
      assert.equal(threeOrFull([1, 1, 3], []), 3);
    });
    /*TEST FOUR: return a fullHouse if the are 3 and 2 equal cards*/
    it('should return 6 score for fullHouse', function(){
      // threeOrFull(values, result)
      assert.equal(threeOrFull([2, 3], []), 6);
    });
     /*TEST FIVE: return a fourofaKind if the are 4 equal cards*/
     it('should return 7 score for fourofaKind', function(){
      // threeOrFull(values, result)
      assert.equal(threeOrFull([1, 4], []), 7);
    });
    /*TEST SIX: return a straigth if there are 5 cards in rank order*/
    it('should return 4 score for straight', function(){
      // straigth(arrayRank, arraySuit, result)
      assert.equal(straigth(["14", "2", "3", "4", "5"], [1,1,1,1,1], []), 4);
    });
      /*TEST SEVEN: return a straightFlush if there are 5 cards in rank order of the same suit*/
      it('should return 8 score for straightFlush', function(){
        // straigth(arrayRank, arraySuit, result)
        assert.equal(straigth(["3", "2", "4", "5", "6"], [5], []), 8);
      });
      /*TEST SEVEN: return a straightFlush if there are 5 cards not in rank order of the same suit*/
      it('should return 5 score for Flush', function(){
        // straigth(arrayRank, arraySuit, result)
        assert.equal(straigth(["3", "4", "4", "7", "14"], [5], []), 5);
      });
      /*TEST SEVEN: return a RoyalFlush if there are 5 cards in rank order starting from 10 of the same suit*/
      it('should return 9 score for RoyalFlush', function(){
        // straigth(arrayRank, arraySuit, result)
        assert.equal(straigth(["10", "11", "12", "13", "14"], [5], []), 9);
      });

    
});