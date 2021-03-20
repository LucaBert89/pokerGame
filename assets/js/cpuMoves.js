import {players} from "./firstRound.js";
import {btnPlay, replaceCard, cardGenerator, btnOpen} from "./index.js"
import {findtheWinner} from "./findWinner.js"
import {firstBet, cpuSecondRound} from "./cpuBets.js"


const btnBet = document.querySelector(".input-fish__btn")

function playAndResponse(btnPlay, result, ingame, total, rank, suit, playerRanksArray, playerSuitsArray,totalObjectRanks, totalObjectSuit,randomCard, playerNumbers) {
    const nextTurn = document.querySelector(".next-turn");
    const btnStay = document.querySelector(".stay");
    const btnLeave = document.querySelector(".leave");
    const btnShow = document.querySelector(".show");
   
    let ontablefish;
    let randomNumber;

    btnBet.addEventListener("click", insertFish);

    // HERE IS THE FIRST MOVE: the player select the fish he wants to play
    function insertFish(e){
        e.stopPropagation();
        e.preventDefault();
        // when the player click on bet you can't change your card anymore
        btnBet.removeEventListener('click', insertFish);

        btnPlay.style.display = "none";
        const cpuContainer = document.querySelector(".cpu-container");
        const cpuPlayers = cpuContainer.querySelectorAll(".cpu");   
        let cardNumber = [];
        playerRanksArray = []; 
        ontablefish = [];
 
        //here I subtract the fish selected from the total available. + 10 is the open fish that I don't want to be counted two times
        total[0].innerText = parseInt(total[0].innerText) - (parseInt(ingame[0].innerText) - 10);

        
        replaceCpuCards(cpuPlayers, cardNumber, totalObjectRanks, playerNumbers, randomCard);
        
        rank = [];
        suit = [];
        result = [];
        totalObjectRanks = [];
        totalObjectSuit = [];
      
        players(randomCard, rank, suit, result, playerRanksArray, playerSuitsArray, totalObjectRanks, totalObjectSuit, playerNumbers);   

        ontablefish = [...ingame].map(event => event.textContent);

        for(let i=1; i<playerNumbers; i++) {
            console.log(i);
            ingame[i].innerText = firstBet(total, ingame, ontablefish, result, randomNumber,i);
            ontablefish[i] = ingame[i].innerText;
            total[i].innerText = parseInt(total[i].innerText) - (parseInt(ingame[i].innerText) -10); 
            
        }


        ontablefish = [...ingame].map(event => event.textContent);

        if(ingame[0].textContent < Math.max(...ontablefish)) {
            if(ingame[0].textContent != 10) {
                btnStay.style.display = "inline-block";
                btnLeave.style.display = "inline-block";
            } else {
                btnShow.style.display = "inline-block";
            }
        } else {
            btnShow.style.display = "inline-block";
        }

           //     }
    }
    
    function replaceCpuCards(cpuPlayers, cardNumber, totalObjectRanks, playerNumbers, randomCard) {
        let cpuCurrent = [];
        let discardedCard= [];
        let ranking = [];
        cardNumber = [];
        let replaceIndex;  
// REPLACING USELESS CARDS
    /* Here after the click I want that the cpu players change their useless cards
        where card rank is = to 1.
    */
        let x=5;
        /* I put every card divided among the cpu players into cpuCurrent array ex
            0: ["14H", "10H", "6D", "12H", "4S"]
            1: ["8D", "8S", "5D", "14S", "2C"]
       */
        for(let j=5; j<randomCard.length; j+=5) {
            cpuCurrent.push(randomCard.slice(j, j+5));  
        }    
        console.log(randomCard);
        console.log(cpuCurrent);
       

        for(let i=0;i<playerNumbers-1;i++) {
        /* I put the Object.entries of the totalObjectRanks inside an array of arrays
            that include the rank and count of the card to see if it's one or not 
            ["5", 1]
            ["7", 1]
            ["10", 1]
            ["12", 2]
            each iteration is for a single player
        */
            cardNumber.push(Object.entries(totalObjectRanks[i+1]));
            discardedCard = [];
                // I push the ranks of every Cpu player inside ranking
            ranking.push(cpuCurrent[i].map(e => e.slice(0,-1)));
        }

        for(let i=1; i<playerNumbers; i++) {
 // if the result is 1(pair) or 2(two pair) or 0 (nothing) the cpuMove function'll be called
            if(result[i] === 1 || result[i] === 2 || result[i] === 0) {
                
                // this function is used to let the cpu player change the useless cards
                cpuMove(cardNumber[i-1], discardedCard, replaceIndex,i-1, ranking[i-1],x, cpuPlayers);
            } else {
                continue;
            }
            x+=5;
        }
           
        

    }


    


    /* n: cardNumber (array of arrays with card and number); dCard: empty array for the discarded cards;
    newIndex: a variable that'll be used to check the index of the card to discard; index;
    cardRank: array of ranks of the cards; x: starting from 5 it'll increment of 5 to consider every
    5 players cards; cpuP: cpuPlayers elements; 

    */
    function cpuMove(n, dCard, newIndex, index, cardRank,x, cpuP) {
        /* here I fill the dCard array with the cardNumber that is = 1
            ex. card ranks ["2": 1; "3":2; "4":1; "5":1]
            here into dCard = ["2", "4", "5"]
        */ 
            dCard = [];
            n.forEach(function(e) {
                console.log(e)
                if(e[1] === 1) {
                    dCard.push(e[0]);
                }   
            })

        // with this regular expression I'll check for numbers inside strings 
            //let findNumber = /\d+/;
            cpuP[index].querySelectorAll(".player__card").forEach(function(e) {
                    dCard.forEach(function(event,index) {
                    // i check into the dCard (card useless) and for the dCard among the player cards I assign a newIndex
                        if(e.innerText.slice(0,-1) == dCard[index]){
                   /*I'll look for the dCard index inside the cardRank array + 5 to consider the
                      active player that is not considered in cardRank but'll be in replaceCard
                    */
                            newIndex = (cardRank.indexOf(dCard[index]))+x;
                            if(newIndex >= 5) replaceCard(newIndex, e);
                        } 
                    }) 
               
                    //check inside the string backgroundImage a number equal to dCard numbers
                    
                    //if(e.style.backgroundImage.match(findNumber)[0] === dCard[j]){
                    
                  
                    
                
            })
        }
         
   

    
    
    btnStay.addEventListener("click", playersChoices);
    btnLeave.addEventListener("click", playersChoices);
    btnShow.addEventListener("click", playersChoices);
    
    function playersChoices(e) {
        btnStay.removeEventListener("click", playersChoices);
        btnLeave.removeEventListener("click", playersChoices);
        btnShow.removeEventListener("click", playersChoices);
        btnStay.style.display = "none";
        btnLeave.style.display = "none";
        btnShow.style.display = "none";
        console.log(total);
        let previous;
        let difference; 
        if(e.target.className === "stay") {
            ingame[0].removeAttribute("id");
            previous = ingame[0].textContent;
            difference = Math.max(...ontablefish) - parseInt(previous);
            if(total[0].textContent >= difference){
                ingame[0].textContent = parseInt(ingame[0].textContent) + difference;
                total[0].textContent = parseInt(total[0].textContent) - difference;
            } else {
                ingame[0].setAttribute("id","stayIn");
                ingame[0].textContent = parseInt(total[0].textContent) + parseInt(ingame[0].textContent);
                total[0].textContent = parseInt(total[0].textContent) - parseInt(total[0].textContent);
            }
        }
       
        for(let i=1; i<playerNumbers; i++) {
            ingame[i].removeAttribute("id");
            previous = ingame[i].textContent;
            if(ingame[i].textContent > 10) {
                console.log(">10")
                if(total[i].textContent >= (Math.max(...ontablefish) - previous)) {
                    ingame[i].textContent = cpuSecondRound(difference,previous, ingame[i].textContent, total[i].textContent,ontablefish,result[i]);
                    
                } else {

        /*here is the case when the player has not enough fish to bet again and match the max
        bet that is on the table. 
        
        In this case I added an ID to highlight that he's in the game
        despite he hasn't enough money. This "id" let me to consider the player score for comparation
        inside findthewinner function
        */          console.log(ingame[i]);
                    ingame[i].setAttribute("id", "stayIn");
                    ingame[i].textContent = parseInt(ingame[i].textContent) + parseInt(total[i].textContent);
                    total[i].textContent = parseInt(total[i].textContent) - parseInt(total[i].textContent);
                }
            } else if(ingame[i].textContent == 10 && total[i].textContent == 0){
                console.log("Ok")
                ingame[i].setAttribute("id", "stayIn");
                ingame[i].textContent = parseInt(ingame[i].textContent) + parseInt(total[i].textContent);
                total[i].textContent = parseInt(total[i].textContent) - parseInt(total[i].textContent);
            } else {
                console.log("Ok")
                continue;
            }
        }
        ontablefish = [...ingame].map(e => e.textContent);
    
        /*
            here playersIn are the players that match the max bet of fish on the table
            here is returned the index of the players that play the max and accept the bet 
            ex.[0, undefined, 2, undefined] the players in the game are the number 0 and 2
        */
        let playersIn = [...ingame].map((e,index) =>{
            if(e.textContent == Math.max(...ontablefish) || e.id == "stayIn") return index;
        }).filter(e => e != undefined);
        console.log(playersIn);
        // show the hidden cards removing the class card-cover and giving the card text to the path image
        document.querySelectorAll(".cpu").forEach(function(e) {
            e.querySelectorAll(".player__card").forEach(function(e) {
                e.classList.remove("card-cover");
                e.style.backgroundImage = `url("./assets/images/${e.textContent}.jpg")`;
                e.textContent = "";
            })
        })
    //here i took out the undefined values that don't match the max
    
    //CHOOSING THE WINNER
        let winner;
        let winnerScore;
        let ingameScores = [];
        //Loop through every playersIn (players that accept the bet), 
        playersIn.forEach(function(e) {
        /*push every player inside the ingameScores function with the score as value.
          ex. below only the player1 and the third bet, the player1 has a score of 
          two (double pair) the player3 has a couple (score 1)
          {
              1:2
          }
          {
              3:1
          }
        */
                ingameScores.push({[e]:result[e]});
        })
    // compare the scores of the players in the game looping through the ingameScores array
        let compareScores = [];
    
        ingameScores.forEach(function(e,index) {
            //push the scores inside the compareScores array
            /*
                ex. e = {0:1}
                playersIn = [0,1,2]
                e[playersIn[index]] = e[0] = 1 (score)
            */ 
            compareScores.push(e[playersIn[index]]);
        })
        /*the winner is max value you found into compareScores array
        ex. [
            {0, 2, 3}
        ]
        winner is 3
        */
      
       winnerScore = Math.max(...compareScores);
    
    // FIND THE CORRESPONDING KEY (PLAYER NUMBER).
        /*we found the max score that won the game, but whose player is it?
        TWO CASES:
        1. more than a winner: 2 or more players with the same score;
        2. one winner;
        */  
    
      winner = findtheWinner(winner, winnerScore, compareScores, ingameScores, playerRanksArray);
        console.log(total[winner].textContent);
      ingame.forEach(e => {
        total[winner].textContent = parseInt(total[winner].textContent) + parseInt(e.textContent);
        //e.innerHTML = "";
    })
    nextTurn.style.display = "inline-block";
    }
    
    
     
    
        nextTurn.addEventListener("click",next)
        
        
        function next() {
            nextTurn.removeEventListener("click",next)
            nextTurn.style.display = "none";
            rank = [];
            suit = [];
            result = [];

            document.querySelectorAll(".cpu").forEach(function(e) {
                e.querySelectorAll(".player__card").forEach(function(e) {
                    e.classList.add("card-cover");
                    e.style.backgroundImage = ``;
                    e.innerHTML = "";
                })
            })
            cardGenerator();
            for(let i =0; i<playerNumbers; i++) {
                ingame[i].textContent = "";
            }
            btnPlay.style.display = "none";
            btnStay.style.display = "none";
            btnLeave.style.display = "none";
            btnOpen.style.display = "inline-block";
            ingame = document.querySelectorAll(".in-game-fish");
            total = document.querySelectorAll(".total-fish");
        
        }

}


export {playAndResponse};