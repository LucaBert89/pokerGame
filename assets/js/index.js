import {btnOpen} from "./firstRound.js"
// decide how many player you want to play against
export let playerNumbers = prompt("how many players?");
export function modifyPlayers (value, index) {
    value -= index;
}


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






// CARD GENERATION


/* HAND COMBINATION: rank array and suit array*/




