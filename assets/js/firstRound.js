import {playAndResponse} from "./cpuMoves.js";
import {handCombination} from "./combinations.js";

import {playerNumbers} from "./index.js";


let card;
let cardImage;
let randomCard = [];

const btnPlay = document.querySelector(".input-fish");
const cardSuit = ["C", "D", "H", "S"];
const generateBtn = document.querySelector(".generate");
const btnOpen = document.querySelector(".player-active__btn");



generateBtn.addEventListener("click", cardGenerator);

function cardGenerator() {
    randomCard = [];
    let gameCards = document.querySelectorAll(".player__card");
    const player = document.querySelector(".player0");
    const activeCard = player.querySelectorAll(".player__card");

   
    // assignment of the cards: i looped through the card of the players and assign a random number and suit letter
    gameCards.forEach(function(element, index) {
       //here I call the function passing the element (card class) and index;
        generateCard(element, index); 
        /*the first 5 cards are yours (index<5) so you can click only on your cards 
        if you want to change them*/
    });
    activeCard.forEach(function(element, index) {
        let control = true;
        element.addEventListener("click", function(e) {
            // rules of poker: you can't change more than 4 cards
            //if(i < 4) {
                /*call the function replace card passing the index to replace your card
                with another*/
                if(control) {
                    replaceCard(index, element);
                    control = false;
                }
                /*
                i++;
            } else {
                return false;
            }  
            */
        })
    });
          
}   


function fishSelector(ingame, total) {
    
    let selectorFish = document.querySelector(".input-fish__selector");
    let optionFish;
    if(selectorFish.children.length >0) {
        selectorFish.innerHTML = "";
    };
    for(let i=0; i < total[0].textContent; i+=10) {
        optionFish = document.createElement("option");
        optionFish.classList.add("option-fish")
        optionFish.value = i;
        optionFish.innerHTML = i;
        selectorFish.appendChild(optionFish);
    }
    selectorFish.addEventListener("change", function(e){
        ingame[0].textContent = 10;
        ingame[0].textContent = parseInt(ingame[0].textContent) + parseInt(e.target.value);
    })

   
}

// calling generateCard function: selectedCard = the card div; current = index of card div
function generateCard(selectedCard, current) {

    /*card is a random number with a score between 0 and 13+2(14) 
    and a random index of cardSuit until the max length*/
    card = (Math.floor(Math.random()*13)+2) + cardSuit[Math.floor(Math.random() * cardSuit.length)];
    /*you can't have the same card for two times, so if the current card is already on the table you have to
    generate another card
    
    here if the card isn't already in the array, add the card and assign the jpg path*/
    if(!randomCard.includes(card)) {
        randomCard.push(card);
       // if(current < 5) {
            cardImage = `url("./assets/images/${randomCard[current]}.jpg")`;
            selectedCard.style.backgroundImage = cardImage;
        /*} else {
            cardImage = randomCard[current];
            selectedCard.textContent = cardImage;
        }*/
    
    } else {
        //if the card is already in the array call the function again to change the card
        generateCard(selectedCard, current);
    }  
}


/* here I pass the index of the card that I clicked among mine*/
function replaceCard(current, e) {
    /*card is a random number with a score between 0 and 13+2(14) 
    and a random index of cardSuit until the max length*/
    card = (Math.floor(Math.random()*13)+2) + cardSuit[Math.floor(Math.random() * cardSuit.length)];
    
    /*if the randomCard already includes the card selected ex. 2H, than return the function
    again to change the card until it's not among the already generated ones*/
    if(randomCard.includes(card)) {
        return replaceCard(current, e);
    } else {
        randomCard.splice(current,1,card);
        cardImage = `url("./assets/images/${randomCard[current]}.jpg")`;
        // if the randomCard is unique than replace the card clicked with the new card
        // the new card image will take the new generated random card
        
        e.style.backgroundImage = cardImage;
    }
}


// OPEN BTN

btnOpen.addEventListener("click", function() {
    let totalObjectRanks = [];
    let totalObjectSuit = [];
    let ingame = document.querySelectorAll(".in-game-fish");
    let total = document.querySelectorAll(".total-fish");  
    let playerRanksArray = [];
    let playerSuitsArray = [];
    let rank;
    let suit;
    let result;
     // here rank, suit and result'll empty and refill every time btnplay is clicked
     rank = [];
     suit = [];
     result = [];  
     
     fishSelector(ingame, total);
   // here function players is call passing randomCard, the array that contain all the cards
     players(randomCard, rank, suit, result, playerRanksArray, playerSuitsArray, totalObjectRanks, totalObjectSuit);

    if(result.every(e => e === 0)) {
        console.log("no one can open");
        rank = [];
        suit = [];
        result = [];
        cardGenerator();

    } else {
        for(let i=0; i<playerNumbers; i++) {
            if(total[i].textContent > 0) {
                total[i].textContent = total[i].textContent - 10;
                ingame[i].textContent = 10;
            } 
        btnOpen.style.display = "none";
        btnPlay.style.display = "block";
       
        }
    }

    
    playAndResponse(result, ingame, total, rank, suit, playerRanksArray, playerSuitsArray, totalObjectRanks, totalObjectSuit, randomCard);
      
        /* here the compare function is called passing result. Result are the scores based on
        the card combinations, displayed like this:
        [
            0: 9  (royal flush)
            1: 1  (pair)
        ]*/

        
        /*poker rule:
        if no one of the player have points on their hand, than no one can open, randomCard
        will be empty and refilled than cardGenerator generate new card for every one*/
}) 

/* PLAYER FUNCTION: to separate rank and suit and use them to display combinations
random = randomCard (the array that contains all the cards of the game*/
function players(random, rank, suit, result, playerRanksArray, playerSuitsArray, totalObjectRanks, totalObjectSuit) {
    /*for each card of the game call the hand function passing the single card and index
    to separate the rank and the suit*/

    random.forEach(function(element, index) {   
    hand(element, rank, suit); 
    })
    // here the playerRanksArray and playerSuitsArray are emptyed and refilled every time btn is clicked


    /* cardSplit is used to deal the card to the players rounding with ceil in combination
    with dealingCards function.
    here cardSplit = 5 (5 cards per player)*/
    let cardSplit = Math.ceil(random.length / playerNumbers);
    
    /*here I Call dealingCards function passing: playerRanksArray and Suits, the empty arrays
    , cardSplit, rank and suit arrays. 
    The goal is to divide the cards among the players, 5 per player with their rank and suit*/
        dealingCards(playerRanksArray,playerSuitsArray,cardSplit,rank,suit);
        handCombination(playerRanksArray,playerSuitsArray, result, totalObjectRanks,totalObjectSuit); 
}
    
// FUNCTION HAND: random = randomCard (all card of the game)
function hand(random, rank, suit) {
    //separate rank and suit into separate array
        rank.push(random.slice(0,-1));
        suit.push(random[random.length-1]);
    }

// DEALINGCARDS: tr= totalrank empty array, ts=totalObjectSuit empty array, cs=cardSplit, r = rank array, s=suit array
function dealingCards(tr,ts,cs,r,s) {
 
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


export {players, replaceCard, generateBtn,btnOpen, cardGenerator }