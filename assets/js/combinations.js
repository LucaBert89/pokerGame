
let score = {
    "highCard":0,
    "pair": 1,
    "twopair":2,
    "threeofaKind":3,
    "straight":4,
    "flush":5,
    "fullHouse":6,
    "fourofaKind":7,
    "straightFlush":8,
    "royalFlush":9,
}




/* HAND COMBINATION: rank array and suit array*/
function handCombination(playerR, playerS, result, totalObjectRanks,totalObjectSuit, playerNumbers) {
    //variables for counting the elements: useful for pair or threes or others
    let suitValues;
    let currentRankCount = {};
    let currentSuitCount = {};
    let values;
    let high;
    // combination variable for functions
    let pairComb;
    let threefullComb;
    let straightComb;


    for(let i=0; i<playerNumbers; i++) {
        currentRankCount = {};
        currentSuitCount= {};
        
        //I called two functions to count: 1^rank of cards; 2^suit of cards 
        /*here I pass to the function the rank array ex. ["2","3","4","5", "6"]; the currentRankCount obj,
        i need to create an array of objects of the player's ranks; the i(players); totalObjectRanks that
        is empty but it's going to be the new array of objects with the count divided among players*/
        countValues(playerR,currentRankCount,i, totalObjectRanks);

        /*here the same I did for the rank but for the suit*/
        countValues(playerS,currentSuitCount,i, totalObjectSuit);
  
        //take the values of rank and suit: the values of the objects
        values = Object.values(totalObjectRanks[i]);
        suitValues = Object.values(totalObjectSuit[i]);
  
        pairComb = findPair(values, result);
        threefullComb = threeOrFull(values, result);
        straightComb = straigth(playerR[i], suitValues, result);
        
        // if the other results are undefined than it is high card
        if(pairComb == undefined && threefullComb == undefined && straightComb == undefined) {
           high = noOther(result); 
        }

           
    }
    
}

// COUNTVALUES: array=rank or suit array, c=count or countSuit, index=i, total suit or count array empty
function countValues (array,c,index,total) {
    /*example letter and number count
    [
     0: {C: 2, D: 1, H: 2}
     1: {C: 1, H: 2, S: 1, D: 1}
    ]
    [
     0: {3: 1, 5: 1, 6: 1, 9: 1, 12: 1}
     1: {2: 1, 4: 1, 7: 2, 14: 1}
    ]
    */
     array[index].forEach(function(e) { 
         c[e] = (c[e]||0) + 1;
     });
     total.push(c);
 }


function findPair(howmany, result) {
    //if there are 2 equal cards then it means that it could be a pair or a two pair.
    if(howmany.filter(e => e == 2).length === 1 && howmany.filter(e => e !== 2).length > 1) {
        //if the array length is = 4 ex. ["2","1","1","1"] it means there is a pair
        result.push(score["pair"]);
        return result.find(e => e === score["pair"]);
        /*if the array length is = 3 you could have three equal cards and two different
          ones or two pairs and another one like ex. ["2", "2", "1"] */
    } else if(howmany.filter(e => e == 2).length === 2) {
        // so if there aren't no 3 inside the array than it is a two pair for sure
       result.push(score["twopair"]);
       return result.find(e => e === score["twopair"]);
    }
}

function threeOrFull(howmany,result) {
    //if there are 4 equal cards then it means that it is a fourofakind
    if(howmany.filter(e => e == 4).length === 1) {
            result.push(score["fourofaKind"]);
            return result.find(e => e === score["fourofaKind"]);
    //if there are 3 equal cards then it means that it could be a fullHouse or a threeofakind
    } else if(howmany.filter(e => e == 3).length === 1) {
        //if there are not only 3 equal cards but also the other two are equals than fullHouse
        if(howmany.filter(e => e == 2).length === 1) {
           result.push(score["fullHouse"]);
           return result.find(e => e === score["fullHouse"]);
        } else {
        //if the other cards are not equal than it's a three of a kind
            result.push(score["threeofaKind"]);
            return result.find(e => e === score["threeofaKind"]);
        }
    } 
}

function straigth(arrayRank, arraySuit, result) {
    let consecutiveArray = [];
    // sort the array of rank in order
    arrayRank.sort(function(a, b) {
        return a - b;
    });
    
    consecutiveArray = [];  
    
    arrayRank.forEach(function(element, index){
        // check if the array have consecutive rank
        if(arrayRank[index+1] - element == 1) {
            consecutiveArray.push(element);
        }
    });
    //if there is only one suit
    if(arraySuit.length === 1) {
        //if the number are all consecutive
        if(consecutiveArray.length == 4) {
            // if the lowest number is 10 than it is royalFlush
            if(Math.min.apply(Math, consecutiveArray) === 10) {
                result.push(score["royalFlush"]);
                return result.find(e => e === score["royalFlush"]);
            } else {
                // in the other cases is straight flush
                result.push(score["straightFlush"]);
                return result.find(e => e === score["straightFlush"]);
            }
            
        } else {
            //if the ranks aren't straight it is a flush
           result.push(score["flush"]);
           return result.find(e => e === score["flush"]);
        }
        //if there isn't only one suit value than it is only a normal straight
    } else if(consecutiveArray.length == 4) {
        result.push(score["straight"]);
        return result.find(e => e === score["straight"]);
    }
}

function noOther (result) {
    result.push(score["highCard"]);
    return result.find(e => e === score["highCard"]);
}

export {countValues, handCombination, findPair, threeOrFull, straigth}