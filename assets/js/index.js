import {players} from "./firstRound.js";
import {playAndResponse} from "./cpuMoves.js";

const modalStart = document.querySelector(".start-game__modal");
const cardSuit = ["C", "D", "H", "S"];
const generateBtn = document.querySelector(".start-game__btn");
const btnOpen = document.querySelector(".player-active__btn");
const btnPlay = document.querySelector(".input-fish");
const selectNofPlayers = document.querySelector("#players");
const selectNofPoints = document.querySelector("#points");
const selectProfile= document.querySelector(".start-game__input-profile");

let card;
let cardImage;
let randomCard = [];
let playerNumbers;
let points;
let initialNumber;

// decide how many player you want to play against and points
selectNofPlayers.addEventListener("click", function(e) {
    playerNumbers = e.target.value;
    initialNumber = playerNumbers;
})
selectNofPoints.addEventListener("click", function(e) {
    points = e.target.value;
})

selectProfile.addEventListener("change", selectImage);

function selectImage() {
    const reader = new FileReader();
    const image = document.querySelector(".start-game__input-profile-click");
    const file = this.files;

    reader.addEventListener("load", function() {
        image.style.backgroundImage = `url(${reader.result}`;
    });
    reader.readAsDataURL(file[0]);
}

// generate the players
function generatePlayers(playerNumbers) {
    const playersContainer = document.querySelector(".players");
    let player;
    let totalCash;
    let fishBet;
    let profile;
    let enemyProfile;
    let cpu = document.createElement("div");
    cpu.classList.add("cpu-container");
    
//max of the player is four: a class and a div will be generated for each player
    if(playerNumbers <= 4) {
        for(let j=0; j <= playerNumbers-1; j++) {
            player = document.createElement("div");
            fishBet = document.createElement("div");
            profile = document.createElement("div");
            enemyProfile = document.createElement("div");
            playerCash(player, fishBet,j, totalCash);
            // to the user will be assigned the active class
            if(j==0) {
                player.classList.add(`player${j}`);
                profile.classList.add(`player__profile${j}`)
                playersContainer.appendChild(player);
                profile.style.backgroundImage = window.getComputedStyle(document.querySelector(".start-game__input-profile-click")).getPropertyValue("background-image");
                playersContainer.appendChild(profile);
            } else {
                player.classList.add(`player${j}`);
                player.classList.add("cpu");
                enemyProfile.classList.add("cpu-profile");
                player.appendChild(enemyProfile);
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



function playerCash(p, bet,player, cash) {
    bet.classList.add("in-game-fish");
    bet.classList.add(`fish${player}`)
    cash = document.createElement("div");
    cash.classList.add("total-fish");
    cash.innerHTML = points;
    p.appendChild(bet);
    p.appendChild(cash);
}




generateBtn.addEventListener("click", cardGenerator);

function cardGenerator() {
    document.querySelector(".first-door").classList.add("out__up");
    document.querySelector(".last-door").classList.add("out__down");
    //call generatePlayers function only the first time and not when the next button is pressed
    if(modalStart.style.display !== "none") generatePlayers(playerNumbers);
    setTimeout(function(){ 
        modalStart.style.display = "none";
    }, 1500);
    
    
    
    randomCard = [];
    
    let gameCards = document.querySelectorAll(".player__card");
   
    // assignment of the cards: i looped through the card of the players and assign a random number and suit letter
    gameCards.forEach(function(element, index) {
       //here I call the function passing the element (card class) and index;
        generateCard(element, index); 
        /*the first 5 cards are yours (index<5) so you can click only on your cards 
        if you want to change them*/
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

            cardImage = `url("./assets/images/${randomCard[current]}.jpg")`;
            selectedCard.style.backgroundImage = cardImage;
    
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
    
    const player = document.querySelector(".player0");
    const activeCard = player.querySelectorAll(".player__card");

    
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

     fishSelector(ingame, total);
   // here function players is call passing randomCard, the array that contain all the cards
     players(randomCard, rank, suit, result, playerRanksArray, playerSuitsArray, totalObjectRanks, totalObjectSuit, playerNumbers);

// based on the players cards, if someone've scores or not, it's decided if open or not
    if(result.every(e => e === 0)) {
        // if we can't open than new cards we'll be generated emptying the existing rank, suit, result arrays
        console.log("no one can open");
        rank = [];
        suit = [];
        result = [];
        cardGenerator();
        
    } else {
    //if someone has scores, than the game'll open 
    /*first I've to check if the players've enough fishes to open the game */
        for(let i=0; i<initialNumber; i++) {
            console.log(total[i]);
            if(total[i] !== undefined) {
                // if they've enough fishes than the players pays 10 fishes to enter the game
                if(total[i].textContent > 0) { 
                    total[i].textContent = parseInt(total[i].textContent) - 10;
                    ingame[i].textContent = 10;
                } else {
                // if the cpuPlayers doesn't even enough fishes they'll be deleted from the game
                    if(i>0) {
                        j++;
                        if( document.querySelector(`.player${i}`) !== undefined) {
                            document.querySelector(`.player${i}`).remove();
                            console.log(`player${i} lose`);
                            delete result[i];
                        }
                    } else  {
                        console.log("you lose");
                    }
                    cardGenerator();
                }
            }
            
        }
        // CHANGE YOUR CARD IF YOU NEED TO
        activeCard.forEach(function(element, index) {
        // setted a control variable to check if the card has already been changed
            //let control = true;
            element.classList.add("clickable");
            element.addEventListener("click", changeCard);
        // you've five second to change your cards
            setTimeout(function(){ 
                element.removeEventListener("click", changeCard);
                element.classList.remove("clickable");
            }, 5000);
    
            function changeCard () {
                    /*call the function replace card passing the index to replace your card
                    with another and this (element selected)*/
                    if(element.className ==="player__card clickable") {
                        replaceCard(index, this);
                        // control switched to false and you can't change that card again
                        element.classList.remove("clickable");
                    }
            }
        });
        ingame = document.querySelectorAll(".in-game-fish");
        total = document.querySelectorAll(".total-fish"); 
        playerNumbers-=j;
        btnOpen.style.display = "none";

        // bet appear after 5 seconds, time allowed to change your cards
        setTimeout(function(){ 
            btnPlay.style.display = "block";
        }, 5000);
        
        
    }
    rank = [];
    suit = [];
    result = [];
    fishSelector(ingame, total);

   // here function players is call passing randomCard, the array that contain all the cards
    players(randomCard, rank, suit, result, playerRanksArray, playerSuitsArray, totalObjectRanks, totalObjectSuit, playerNumbers);
    
    // here playAndResponse is called to pass all the variables needed to play the game
    playAndResponse(activeCard, result, ingame, total, rank, suit, playerRanksArray, playerSuitsArray, totalObjectRanks, totalObjectSuit, randomCard, playerNumbers);

    
}) 



export {replaceCard, generateBtn,btnOpen, cardGenerator, btnPlay}








