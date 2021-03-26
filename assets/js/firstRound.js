import {handCombination} from "./combinations.js";



/* PLAYER FUNCTION: to separate rank and suit and use them to display combinations
random = randomCard (the array that contains all the cards of the game*/
function players(random, rank, suit, result, playerRanksArray, playerSuitsArray, totalObjectRanks, totalObjectSuit, playerNumbers) {
    /*for each card of the game called the hand function pass the single card and empty rank and suit array
    to separate the rank of the card from the suit*/
    random.forEach(element => {hand(element, rank, suit);})


    /* cardSplit is used to deal the card to the players rounding with ceil in combination
    with dealingCards function.
    here cardSplit = 5 (5 cards per player)*/
    let cardSplit = Math.ceil(random.length / playerNumbers);
    
    /*here I Call dealingCards function passing: playerRanksArray and Suits, the empty arrays
    , cardSplit, rank and suit arrays. 
    The goal is to divide the cards among the players, 5 per player with their rank and suit*/
        dealingCards(playerRanksArray,playerSuitsArray,cardSplit,rank,suit, playerNumbers);

    /*after the cards are dealt I can find the combination that set the score.
        the playerRanksArray and Suits filled with the array of cards can be passed
    */
        handCombination(playerRanksArray,playerSuitsArray, result, totalObjectRanks,totalObjectSuit, playerNumbers); 
}
    
// FUNCTION HAND: random = randomCard (all card of the game)
function hand(random, rank, suit) {
    //separate rank and suit into separate arrays
        rank.push(random.slice(0,-1));
        suit.push(random[random.length-1]);
    }

// DEALINGCARDS: tr= playerRanksArray empty array, ts=playerSuitsArray empty array, cs=cardSplit, r = rank array, s=suit array
function dealingCards(tr,ts,cs,r,s, playerNumbers) {
 
    for(let i=0;i < playerNumbers;i++) {
        // for every player will be generated an array that contains 5 card into total rank and suit
        /* ex. case 2 players
        [
            0: ["2","3","5","12","1"]   ["H", "S","H","D","C"]
            1: ["5","6","3","13","6"]   ["S", "S","D","C","C"]
        ]
        */
        tr[i] = [];
        ts[i] = [];
        // here there are the first 5 cards (cardSplit) to deal for every players
        for(let j=0;j<cs;j++) {
            // ex.ranks = rank[0 + 0*5] ->0
            //    ranks = rank[1 + 0*5] ->1 ecc
            const ranks = r[j+i*cs];
            const suits = s[j+i*cs];
           // here ranks and suits'll be pushed inside the array
           tr[i].push(ranks);
           ts[i].push(suits)
        }
    };
}


export {players}