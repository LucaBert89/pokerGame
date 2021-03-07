import {players} from "./firstRound.js";
import {playAndResponse} from "./cpuMoves.js";
let card;
let cardImage;
let randomCard = [];

// decide how many player you want to play against

let playerNumbers = prompt("how many players?");
let points = prompt("how many points?");


// generate the players
function generatePlayers(playerNumbers) {
    const playersContainer = document.querySelector(".players");
    let player;
    let totalCash;
    let fishBet;
    let card;
    let cpu = document.createElement("div");
    cpu.classList.add("cpu-container");
//max of the player is four: a class and a div will be generated for each player
    if(playerNumbers <= 4) {
        for(let j=0; j <= playerNumbers-1; j++) {
            player = document.createElement("div");
            fishBet = document.createElement("div");
            
            playerCash(player, fishBet,j, totalCash);
            // to the user will be assigned the active class
            if(j==0) {
                player.classList.add(`player${j}`);
                playersContainer.appendChild(player);
            } else {
                player.classList.add(`player${j}`);
                player.classList.add("cpu")
                cpu.appendChild(player);
                playersContainer.appendChild(cpu);
            }
           
            
            // five card class will be assigned to every person
            for(let x=1; x <= 5;x++) {
                card = document.createElement("div");
                card.classList.add("player__card");
                player.appendChild(card);
            }
        }
    } else {
        console.log("no more than 4");
    }  
};

generatePlayers(playerNumbers);

function playerCash(p, bet,player, cash) {
    bet.classList.add("in-game-fish");
    bet.classList.add(`fish${player}`)
    cash = document.createElement("div");
    cash.classList.add("total-fish");
    cash.innerHTML = points;
    p.appendChild(bet);
    p.appendChild(cash);
}





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
function replaceCard(current, e, randomCard) {
    /*card is a random number with a score between 0 and 13+2(14) 
    and a random index of cardSuit until the max length*/
    card = (Math.floor(Math.random()*13)+2) + cardSuit[Math.floor(Math.random() * cardSuit.length)];
    
    /*if the randomCard already includes the card selected ex. 2H, than return the function
    again to change the card until it's not among the already generated ones*/
    if(randomCard.includes(card)) {
        return replaceCard(current, e, randomCard);
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
    const btnPlay = document.querySelector(".input-fish");
    let totalObjectRanks = [];
    let totalObjectSuit = [];
    let ingame = document.querySelectorAll(".in-game-fish");
    let total = document.querySelectorAll(".total-fish");  
    let playerRanksArray = [];
    let playerSuitsArray = [];
    let rank;
    let suit;
    let result;
    let j = 0;
     // here rank, suit and result'll empty and refill every time btnplay is clicked
     rank = [];
     suit = [];
     result = [];  
     console.log(ingame[0].textContent)
     console.log(playerNumbers);
     fishSelector(ingame, total);
   // here function players is call passing randomCard, the array that contain all the cards
     players(randomCard, rank, suit, result, playerRanksArray, playerSuitsArray, totalObjectRanks, totalObjectSuit, playerNumbers);

    if(result.every(e => e === 0)) {
        console.log("no one can open");
        rank = [];
        suit = [];
        result = [];
        cardGenerator();
        
    } else {
        for(let i=0; i<playerNumbers; i++) {
            if(total[i].textContent > 0) { 
                total[i].textContent = parseInt(total[i].textContent) - 10;
                ingame[i].textContent = 10;
            } else {
                if(i>0) {
                    j++;
                    document.querySelector(`.player${i}`).remove();
                    console.log(`player${i} lose`);
                    delete result[i];
                } else  {
                    console.log("you lose");
                }
                /*document.querySelectorAll(".cpu").forEach(function(e, index) {
                    e.className = `player${index+1} cpu`;
                })*/
            }
        }
        playerNumbers-=j;
        btnOpen.style.display = "none";
        btnPlay.style.display = "block";
    }
    fishSelector(ingame, total);
   // here function players is call passing randomCard, the array that contain all the cards
    players(randomCard, rank, suit, result, playerRanksArray, playerSuitsArray, totalObjectRanks, totalObjectSuit, playerNumbers);
    
    playAndResponse(result, ingame, total, rank, suit, playerRanksArray, playerSuitsArray, totalObjectRanks, totalObjectSuit, randomCard, playerNumbers);
      
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



export {replaceCard, generateBtn,btnOpen, cardGenerator}








