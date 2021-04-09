import {openTheGame} from "./openGame.js";

const generateBtn = document.querySelector(".start-game__btn");
const btnOpen = document.querySelector(".player-active__btn");


const selectNofPlayers = document.querySelector("#players");
const selectNofPoints = document.querySelector("#points");
const selectProfile= document.querySelector(".start-game__input-profile");
const playersContainer = document.querySelector(".players-table");
const modalStart = document.querySelector(".start-game__modal");
const rulesBtn = document.querySelector(".game-rules__btn");
const modalExit = document.querySelector(".modal-rules__exit-btn");

const modalMessage = document.querySelector(".modal-gameover__message");
const modalRules = document.querySelector(".modal-rules");
const cardSuit = ["C", "D", "H", "S"];  
let cardContainer;
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
    /* if the player leave the "number of players" field empty in the modal start reset the variables.
    This avoid the possibility to leave the fields empty after the player want to play again*/
    if(selectNofPlayers.selectedIndex == 0 && selectNofPoints.selectedIndex == 0) playerNumbers = undefined, points = undefined;

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
        // call openTheGame function inside openGame.js file passing playerNumbers, randomCard, playersContainer
        // I need this function to pass the playerNumbers (can't do export because I've to modify the value)
        openTheGame(playerNumbers,randomCard,playersContainer);
        
    } else {
        selectNofPlayers.style.backgroundColor = "red";
        selectNofPoints.style.backgroundColor = "red";
    }
}   



// generate the players
function generatePlayers(playerNumbers) {
    
    let player;
    
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
    }
}






export {replaceCard, generateBtn,btnOpen, cardGenerator, modalMessage, initialNumber, selectNofPlayers, selectNofPoints, modalStart}








