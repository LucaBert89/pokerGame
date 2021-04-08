import {players} from "./cardDealing.js";
import {btnOpen,cardGenerator, replaceCard} from "./index.js";
import {playAndResponse} from "./cpuMoves.js";
// OPEN BTN
const btnPlay = document.querySelector(".input-fiche");

function openTheGame(playerNumbers, randomCard, playersContainer) {
    btnOpen.addEventListener("click", open)
    
    function open() {
        btnOpen.removeEventListener("click", open);

        const player = document.querySelector(".player0");
        const activeCard = player.querySelectorAll(".player__card");
        let message = document.createElement("span");
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
        // change the playerNumbers based on the deleted players
        playerNumbers = document.querySelector(".cpu-container").children.length+1;

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
    
            tryAgain();
            setTimeout(function(){ 
                btnOpen.style.display = "inline-block";
            }, 4000);
        } else {
            btnOpen.style.display = "none";
        //if someone has scores, than the game'll open 

            ingame = document.querySelectorAll(".in-game-fiche");
            total = document.querySelectorAll(".total-fiches"); 
            
            // give the background around ingame fiches
            ingame.forEach(e => e.style.backgroundColor = "brown");

            for(let i=0;i<playerNumbers; i++) {
                total[i].textContent = parseInt(total[i].textContent) - 10;
                ingame[i].textContent = 10;
            }
            
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
            playAndResponse(btnPlay, result, ingame, total, rank, suit, playerRanksArray, playerSuitsArray, totalObjectRanks, totalObjectSuit, randomCard, playerNumbers, points);

        
        }
        
    } 

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

    function tryAgain() {
        let messageNoOpen = document.createElement("div");
        messageNoOpen.classList.add("player-table__no-open");
        messageNoOpen.innerText = "No one can open, try again!";
        playersContainer.appendChild(messageNoOpen);
        setTimeout(function(){ 
            messageNoOpen.remove();
        }, 4000);
    }

}

export {openTheGame};