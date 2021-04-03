import {players} from "./firstRound.js";
import {playAndResponse} from "./cpuMoves.js";


const generateBtn = document.querySelector(".start-game__btn");
const btnOpen = document.querySelector(".player-active__btn");
const btnPlay = document.querySelector(".input-fiche");
const btnPlayAgain = document.querySelector(".modal-gameover__start-again");
const selectNofPlayers = document.querySelector("#players");
const selectNofPoints = document.querySelector("#points");
const selectProfile= document.querySelector(".start-game__input-profile");

const modalStart = document.querySelector(".start-game__modal");
const rulesBtn = document.querySelector(".game-rules__btn");
const modalExit = document.querySelector(".modal-rules__exit-btn");
const modalEndGame = document.querySelector(".modal-end");
const modalMessage = document.querySelector(".modal-gameover__message");
const modalRules = document.querySelector(".modal-rules");
const cardSuit = ["C", "D", "H", "S"];  

let card;
let cardImage;
let randomCard = [];
let playerNumbers;
let points;
let initialNumber;




// decide how many player you want to play against and points
(function playersAndPoints() {
    selectNofPlayers.addEventListener("change", function(e) {
        playerNumbers = e.target.value;
        //initial number is created because I need it later when a player that lose the game is eliminated and removed
        initialNumber = playerNumbers;
    })
    selectNofPoints.addEventListener("change", function(e) {
        points = e.target.value;
    })

    rulesBtn.addEventListener("click", function () {
        modalRules.style.display = "block";
    })

    modalExit.addEventListener("click", function () {
        modalRules.style.display = "none";
    }); 
    
    
    selectProfile.addEventListener("change", selectImage);
    // select your image profile
    function selectImage() {
        const reader = new FileReader();
        const image = document.querySelector(".start-game__input-profile-click");
        const file = this.files;
    
        reader.addEventListener("load", function() {
            image.style.backgroundImage = `url(${reader.result}`;
        });
        reader.readAsDataURL(file[0]);
    }
})();


generateBtn.addEventListener("click", cardGenerator);

function cardGenerator() {  
    // if I select the player number and points than the game can start
    if((playerNumbers != undefined && playerNumbers != "") && (points != undefined && points != "")) {
        
        selectNofPlayers.style.backgroundColor = "black";
        selectNofPoints.style.backgroundColor = "black";
        // here the animation for the Ship door is added
        document.querySelector(".first-door").classList.add("out__up");
        document.querySelector(".last-door").classList.add("out__down");
        
        
        setTimeout(function(){ 
            modalStart.style.display = "none";
            
        }, 1200);
        //call generatePlayers function only the first time and not when the next button is pressed
        if(modalStart.style.display !== "none") generatePlayers(playerNumbers); 
        
        setTimeout(function(){ 
            btnOpen.style.display = "block";
        }, 4000);
        randomCard = [];

      

        let gameCards = document.querySelectorAll(".player__card");
        // assignment of the cards: i looped through the card of the players and assign a random number and suit letter
        gameCards.forEach(function(element, index) {
            element.classList.remove("dealing");
        //here I call the function passing the element (card class) and index;
            generateCard(element, index); 
         
        });
    } else {
        selectNofPlayers.style.backgroundColor = "red";
        selectNofPoints.style.backgroundColor = "red";
    }
}   



// generate the players
function generatePlayers(playerNumbers) {
    const playersContainer = document.querySelector(".players-table");
    let player;
    let cardContainer;
    let playerCard;
    let totalCash;
    let ficheBet;
    let profile;
    let enemyContainer;
    let enemyProfile;
    let enemyName;
    let cpu = document.createElement("div");
    cpu.classList.add("cpu-container");
    
//max of the player is four: a class and a div will be generated for each player
  
        for(let j=0; j <= playerNumbers-1; j++) {
            cardContainer = document.createElement("div");
            player = document.createElement("div");
            ficheBet = document.createElement("div");
            profile = document.createElement("div");
            enemyContainer =document.createElement("div"); 
            enemyName = document.createElement("div");
            enemyProfile = document.createElement("div");
            //here I call the function to assign the right ingame fiche and total fiche for each player
            playerCash(player, ficheBet,j, totalCash);
            // to the user will be assigned the background image chose in the start board
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
                    enemyName.classList.add("cpu-profile__name");
                    enemyContainer.classList.add("cpu-profile__container")
                    enemyName.innerText = `Alien${j}`
                    enemyContainer.appendChild(enemyName);
                    enemyContainer.appendChild(enemyProfile);
                    player.appendChild(enemyContainer);
                    cpu.appendChild(player);
                    playersContainer.appendChild(cpu);
                }
                // I need this to check the in game player
                player.classList.add("ingame");
                cardContainer.classList.add("cards-container");
            
            // five card class will be assigned to every person
            for(let x=1; x <= 5;x++) {
                playerCard = document.createElement("div");
                playerCard.classList.add("player__card");
                cardContainer.appendChild(playerCard);
                player.appendChild(cardContainer);
            }
        }
};

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
        
        setTimeout(function(){ 
               //the first 5 cards are yours (current<5) so you can display them 
            
            if(current < 5) {
                cardImage = `url("./assets/images/cards/${randomCard[current]}.jpg")`;
                //dealing class is the animation of the card that is dealt
                selectedCard.classList.add("dealing");
                selectedCard.style.backgroundImage = cardImage;
            } else {
                cardImage = randomCard[current];
                selectedCard.classList.add("card-cover");
                selectedCard.classList.add("dealing");
                selectedCard.innerHTML = cardImage;
            }
       
        }, 2000);
            
    
    } else {
        //if the card is already in the array call the function again to change the card
        generateCard(selectedCard, current);
    }  
}

function playerCash(p, bet,player, cash) {
    bet.classList.add("in-game-fiche");
    bet.classList.add(`fiche${player}`)
    cash = document.createElement("div");
    cash.classList.add("total-fiches");
    cash.innerHTML = points;
    p.appendChild(bet);
    p.appendChild(cash);
}



/* here I pass the index of the card that I clicked among mine*/
function replaceCard(current, e) {
    e.classList.remove("dealing");
    /*card is a random number with a score between 0 and 13+2(14) 
    and a random index of cardSuit until the max length*/
    card = (Math.floor(Math.random()*13)+2) + cardSuit[Math.floor(Math.random() * cardSuit.length)];
    
    /*if the randomCard already includes the card selected ex. 2H, than return the function
    again to change the card until it's not among the already generated ones*/
    if(randomCard.includes(card)) {
        return replaceCard(current, e);
    } else {
            
                randomCard.splice(current,1,card);
            
            
            // if index < 5 there are my cards and I should display them
            if(current < 5) {
                e.classList.add("dealing");
                cardImage = `url("./assets/images/cards/${randomCard[current]}.jpg")`;
                e.style.backgroundImage = cardImage;
            } else {
                // these are the cpu cards and I can't display them 
                setTimeout(function(){ 
                    e.classList.add("dealing");
                    cardImage = randomCard[current];
                    e.innerHTML = cardImage;
                }, 1000);
            }
       
        
       
        // if the randomCard is unique than replace the card clicked with the new card
        // the new card image will take the new generated random card
        
        
    }
}


// OPEN BTN

btnOpen.addEventListener("click", function() {
    const player = document.querySelector(".player0");
    const activeCard = player.querySelectorAll(".player__card");
    btnOpen.style.display = "none";
    // remove the dealing class set for the animation
    activeCard.forEach(e => e.classList.remove("dealing"));
    
    let totalObjectRanks = [];
    let totalObjectSuit = [];
    let ingame = document.querySelectorAll(".in-game-fiche");
    let total = document.querySelectorAll(".total-fiches");  
    let playerRanksArray = [];
    let playerSuitsArray = [];
    let rank;
    let suit;
    let result;
     // here rank, suit and result'll empty and refill every time btnplay is clicked
     rank = [];
     suit = [];
     result = [];  
    // ficheSelector is the function made to choose how much you want to bet
     ficheSelector(ingame, total);

   /*here function players is called passing empty arrays + playerNumber. 
    The goal of the function is to deal the cards and find the combination that set the score to open or not the game
   */
     players(randomCard, rank, suit, result, playerRanksArray, playerSuitsArray, totalObjectRanks, totalObjectSuit, playerNumbers);

// based on the players cards, if someone've scores or not, it's decided if open or not
    if(result.every(e => e === 0)) {
        // if we can't open than new cards we'll be generated emptying the existing rank, suit, result arrays
        rank = [];
        suit = [];
        result = [];
        cardGenerator();
        setTimeout(function(){ 
            btnOpen.style.display = "inline-block";
        }, 4000);
    } else {
        btnOpen.style.display = "none";
    //if someone has scores, than the game'll open 
    /*I call this function to check if the players've enough fichees to open the game */
        loseOrOpen(total, ingame, result);
       
    // if there aren't cpu Players anymore the active player 'll win the game and the message'll appear
        if(document.querySelector(".cpu-container").querySelectorAll(".cpu").length === 0) {
            gameOver();
            modalMessage.textContent = "You Win, the planet is saved!";
        } else {
            ingame = document.querySelectorAll(".in-game-fiche");
            total = document.querySelectorAll(".total-fiches"); 
            ingame.forEach(e => e.style.backgroundColor = "brown");
            playerNumbers = document.querySelector(".cpu-container").children.length+1;
            let message = document.createElement("span");
            
            message.classList.add("player__message");
            message.innerText = "7 seconds to change the cards";
            player.appendChild(message);
            // CHANGE YOUR CARD IF YOU NEED TO. playerActiveMove function is called
            playerActiveMove(activeCard);
            // bet appear after 7 seconds, time allowed to change your cards
            setTimeout(function(){ 
                document.querySelector(".player__message").remove();
                btnPlay.style.display = "inline-block";
            }, 7000);
        
            rank = [];
            suit = [];
            result = [];
            // here ficheSelector is called to display the right fichees the player've to choose from based on his total
            ficheSelector(ingame, total);

        /*here function players is called passing empty arrays + playerNumber. 
        The goal of the function is to deal the cards and find the combination that set the score to decide first and secondround
        */
            players(randomCard, rank, suit, result, playerRanksArray, playerSuitsArray, totalObjectRanks, totalObjectSuit, playerNumbers);
            
            // here playAndResponse is called to pass all the variables needed to play the game
            playAndResponse(btnPlay, result, ingame, total, rank, suit, playerRanksArray, playerSuitsArray, totalObjectRanks, totalObjectSuit, randomCard, playerNumbers);
        }

        
    }
    
}) 

function ficheSelector(ingame, total) {
    
    let selectorFish = document.querySelector(".input-fiche__selector");
    let optionFish;
    // once ficheSelector is called the previous one has to be deleted
    if(selectorFish.children.length >0) {
        selectorFish.innerHTML = "";
    };
    // here I assign a group of fiche you can choose from. They are multiple of 10 until they reach the total of the player
    for(let i=0; i <= total[0].textContent; i+=10) {
        optionFish = document.createElement("option");
        optionFish.classList.add("option-fiche")
        optionFish.value = i;
        optionFish.innerHTML = i;
        selectorFish.appendChild(optionFish);
    }
    selectorFish.addEventListener("change", function(e){
    // once a selection is made your ingame fiche take that number + 10
        ingame[0].textContent = 10;
        ingame[0].textContent = parseInt(ingame[0].textContent) + parseInt(e.target.value);
    })

   
}


function playerActiveMove(activeCard) {
    activeCard.forEach(function(element, index) {
        // add a "clickable" class to check if the card si already changed
            element.classList.add("clickable");
            element.addEventListener("click", changeCard);
        // you've 7 second to change your cards
            setTimeout(function(){ 
                element.removeEventListener("click", changeCard);
                element.classList.remove("clickable");
            }, 7000);
    
            function changeCard () {
                    /*call the function replace card passing the index to replace your card
                    with another and this (element selected)*/
                    if(element.className ==="player__card clickable") {
                        replaceCard(index, this);
                        // remove "clickable" and you can't change that card again
                        element.classList.remove("clickable");
                    }
            }
        });

    
}
function loseOrOpen(total, ingame, result) {
    for(let i=0; i<initialNumber; i++) {

        if(total[i] !== undefined) {
            // if they've enough fichees than the players pays 10 fichees to enter the game
            if(total[i].textContent > 0) { 
                total[i].textContent = parseInt(total[i].textContent) - 10;
                ingame[i].textContent = 10;
            } else {
            // if the cpuPlayers doesn't even enough fichees they'll be deleted from the game
                if(i>0) {
                    if(document.querySelector(`.player${i}`) !== undefined) {
                        document.querySelector(`.player${i}`).remove();
                        delete result[i];
                    }
                } else  {
                // if the active player doesn't have enough fichees to open the game the messagge'll be shown and you can play again
                        gameOver();
                        modalMessage.textContent = "You lose, the planet is fucked!";
                }
            }
        }
        
    }
}


function gameOver() {
    // game is over: you win or lose
    document.querySelector(".players-table").innerHTML = "";
    modalEndGame.style.display = "block";
        
    //click on play again to get back to the start board
    btnPlayAgain.addEventListener("click", function() {
        modalEndGame.style.display = "none";
        modalStart.style.display = "block";
    })
}

export {replaceCard, generateBtn,btnOpen, cardGenerator, btnPlay}








