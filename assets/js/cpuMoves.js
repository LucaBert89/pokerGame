import {players} from "./firstRound.js";
import {replaceCard} from "./firstRound.js"
import {playerNumbers} from "./index.js";
import {cardGenerator} from "./firstRound.js";
import {btnOpen} from "./firstRound.js"
import {modifyPlayers} from "./index.js";



function playAndResponse(result, ingame, total, rank, suit, playerRanksArray, playerSuitsArray,totalObjectRanks, totalObjectSuit,randomCard) {
    let cardNumber;
    const nextTurn = document.querySelector(".next-turn");
    let ontablefish;
 
    const btnStay = document.querySelector(".stay");
    const btnLeave = document.querySelector(".leave");
    const btnShow = document.querySelector(".show");
 
    
    let randomNumber = Math.floor(Math.random() * 11);

    document.querySelector(".input-fish__btn").addEventListener("click", function(){
        const cpuContainer = document.querySelector(".cpu-container");
        const cpuPlayers = cpuContainer.querySelectorAll(".cpu");
        // + 10 is the open fish that I don't want to be counted two times
        total[0].textContent = (parseInt(total[0].textContent) - parseInt(ingame[0].textContent))+10;

        ontablefish = [];
        let x=5;
    
        let cpuCurrent = [];
        let discardedCard= [];
        let ranking = [];
        cardNumber = [];
        let replaceIndex;  
        playerRanksArray = [];
    

        for(let j=5; j<randomCard.length; j+=5) {
            cpuCurrent.push(randomCard.slice(j, j+5));  
        }

        for(let i=1;i<playerNumbers;i++) {
            cardNumber.push(Object.entries(totalObjectRanks[i]));
        }
 
        for(let i=0;i<playerNumbers-1;i++) {
            ranking = [];
            discardedCard = [];
           
            cpuPlayers[i].querySelectorAll(".player__card").forEach(function(e,index) {
                ranking.push(cpuCurrent[i][index].slice(0,-1));
            })
    
            if(result[i+1] === 1 || result[i+1] === 2 || result[i+1] === 0) {
                cpuMove(cardNumber, discardedCard, cpuPlayers,replaceIndex,i,ranking,x);
            }
    
           
            x+=5;
        }

        rank = [];
        suit = [];
        result = [];
        totalObjectRanks = [];
        totalObjectSuit = [];
        players(randomCard, rank, suit, result, playerRanksArray, playerSuitsArray, totalObjectRanks, totalObjectSuit);   

        ontablefish = [...ingame].map(e => e.textContent);

        let riskValue;
        for(let i=1; i<playerNumbers; i++) {

            let addedNumber;
            //if(parseInt(ingame[i-1].textContent) > 10) {
    
                if(total[i].textContent >= Math.max(...ontablefish)) {
                    if(result[i] === 0) {
                        console.log("result = 0");
                        blufforNot(randomNumber, ingame[i], Math.max(...ontablefish), total[i], i);
                    } else if(result[i] >= 1 && result[i] <= 3 ) {
                        
                        console.log("result = 1 a 3");
                        addedNumber = parseInt(total[i].textContent) * 2/10;
                        console.log(addedNumber);
                        riskValue = parseInt(total[i].textContent) * 2/5;
                        if((Math.round(riskValue/10)*10) >= Math.max(...ontablefish)) {
                            ingame[i].textContent = Math.max(...ontablefish) + Math.round(addedNumber / 10) * 10;
                            ontablefish[i] = parseInt(ingame[i].textContent);
                            //ingame[i+1].textContent = 20;
                            total[i].textContent = parseInt(total[i].textContent) - parseInt(ingame[i].textContent) + 10;  
                        } else {
                            console.log("non scommetto sono tra 1 e 3");
                            continue;
                        }
                    } else if(result[i] >= 4 && result[i] <= 6 ) {
                        console.log("result = 4 a 6");
                        riskValue = total[i].textContent * 3/5;
                        if((Math.round(riskValue/10)*10) >= Math.max(...ontablefish)) {
                            ingame[i].textContent = Math.max(...ontablefish);
                            ontablefish[i] = ingame[i].textContent;
                            total[i].textContent = parseInt(total[i].textContent) - parseInt(ingame[i].textContent) +10;  
                        } else {
                            console.log("non scommetto sono tra 4 e 6");
                            ingame[i].textContent = 10;
                        }
                    } else if(result[i] >= 7 ) {
                        console.log("result = + di 7");
                        ingame[i].textContent = total[i].textContent;
                        ontablefish[i] = ingame[i].textContent;
                        total[i].textContent = parseInt(total[i].textContent) - parseInt(ingame[i].textContent) +10;   
                    }
                } else {
                    continue;
                }
        }    
      
        ontablefish = [...ingame].map(e => e.textContent);

    
        if(ingame[0].textContent < Math.max(...ontablefish)) {
            if(ingame[0].textContent != 10) {
                btnStay.style.display = "inline-block";
                btnLeave.style.display = "inline-block";
            } else {
                btnShow.style.display = "inline-block";
            }
        }
           //     }
        
    })
    
    
    
    btnStay.addEventListener("click", playersChoices);
    btnLeave.addEventListener("click", playersChoices);
    btnShow.addEventListener("click", playersChoices);
    
    function playersChoices(e) {

        let previous;
        let difference; 
        if(e.target.className === "stay") {
            ingame[0].removeAttribute("id");
            previous = ingame[0].textContent;
            difference = Math.max(...ontablefish) - previous;
            if(total[0].textContent >= difference){
                ingame[0].textContent = parseInt(ingame[0].textContent) + difference;
                total[0].textContent = parseInt(total[0].textContent) - difference;
            } else {
                ingame[0].setAttribute("id","stayIn");
                ingame[0].textContent = total[0].textContent;
                total[0].textContent = parseInt(total[0].textContent) - parseInt(total[0].textContent);
            }
        }
        cpuSecondRound(previous, difference);
    
        /*
            here playersIn are the players that match the max bet of fish on the table
            here is returned the index of the players that play the max and accept the bet 
            ex.[0, undefined, 2, undefined] the players in the game are the number 0 and 2
        */
        let playersIn = [...ingame].map((e,index) =>{
            if(e.textContent == Math.max(...ontablefish) || e.id == "stayIn") return index;
        }).filter(e => e != undefined);

    //here i took out the undefined values that don't match the max
    
    //CHOOSING THE WINNER
        let winner;
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
        winner = Math.max(...compareScores);
    
    // FIND THE CORRESPONDING KEY (PLAYER NUMBER).
        /*we found the max score that won the game, but whose player is it?
        TWO CASES:
        1. more than a winner: 2 or more players with the same score;
        2. one winner;
        */  
        let keyPlayers = [];
    
        let totalCardSum = [];
    
    /*1. More than a winner
        if the scores that are equal to winner are more than 1 we have multiple players with
        the same score and we've to found a different method to declare the winner
        Here among the players with the same score, the one which sum of the rank of the
        cards is higher win.
    */

      findtheWinner(keyPlayers, totalCardSum, winner, ingameScores, compareScores)

       
    }
    
    
        function cpuMove(n, dCard, cpuP, newIndex, index,cardRank,x) { 
            dCard = [];
            n.forEach(function(element) {
         
                element.forEach(e => {
                    if(e[1] === 1) {
                        dCard.push(e[0]);
                    }   
                })
            })
           
            let findNumber = /\d+/;
    
            cpuP[index].querySelectorAll(".player__card").forEach(function(e) {
                for(let j=0; j < dCard.length; j++) { 
                    if(e.style.backgroundImage.match(findNumber)[0] === dCard[j]){
                        newIndex = (cardRank.indexOf(dCard[j]))+x;
                        replaceCard(newIndex, e);  
                        break;
                    }
                }
            })
        
        }
    
        function cpuSecondRound(previous,difference) {
            for(let i=1; i<playerNumbers; i++) {
                previous = ingame[i].textContent;
                ingame[i].removeAttribute("id");
                let riskValue;
                if(total[i].textContent >= (Math.max(...ontablefish) - previous)) {
                    if(result[i] === 0) {
                        if(ingame[i].textContent == 10) {
                            continue;
                        } else {
                            ingame[i].textContent = Math.max(...ontablefish);
                            difference = parseInt(ingame[i].textContent) - previous;
                            total[i].textContent = parseInt(total[i].textContent) - difference;
                        }
                        //blufforNot(randomNumber, ingame[i], Math.max(...ontablefish), total[i]);
                    } else if(result[i] >= 1 && result[i] <= 3 ) {
                        riskValue = total[i].textContent * 2/5;
                        if((Math.round(riskValue/10)*10) >= Math.max(...ontablefish)) {
                            ingame[i].textContent = Math.max(...ontablefish);
                            //ingame[i+1].textContent = 20;
                            difference = ingame[i].textContent - previous;
                            total[i].textContent = parseInt(total[i].textContent) - difference;  
                    } else {
                            console.log("ok");
                            continue;
                        }
                    }
                        
                    else if(result[i] >= 4 && result[i] <= 6 ) {
                        riskValue = total[i].textContent * 3/5;
                        if((Math.round(riskValue/10)*10) >= Math.max(...ontablefish)) {
                            ingame[i].textContent = Math.max(...ontablefish);
                            difference = ingame[i].textContent - previous;
                            total[i].textContent = parseInt(total[i].textContent) - difference; 
                        } else {
                            continue;
                        }
                    } else if(result[i] >= 7 ) {
                        ingame[i].textContent = Math.max(...ontablefish);
                        difference = ingame[i].textContent - previous;
                            total[i].textContent = parseInt(total[i].textContent) - difference;  
                    }
                } else {
            /*here is the case when the player has not enough fish to bet again and match the max
            bet that is on the table. 
            
            In this case I added an ID to highlight that he's in the game
            despite he hasn't enough money. This "id" let me to consider the player score for comparation
            inside findthewinner function
            */
                    ingame[i].setAttribute("id", "stayIn");
                    ingame[i].textContent = parseInt(ingame[i].textContent) + parseInt(total[i].textContent);
                    total[i].textContent = parseInt(total[i].textContent) - parseInt(total[i].textContent);
                }
            } 
        }
    
        function findtheWinner(playerNumber, sumcardRanks, winner, scoreIn, compare) {
            if(compare.filter(e => e === winner).length > 1) {
                scoreIn.forEach(function(e,index){
                /* look into ingameScores array to find the keys (players number) that have the same score 
                    push inside keyPlayers array.
                    ex of keyPlayers if there are three players that stay in the bet:
                    [
                        0: "0" (this is the player number that has the same score as the max)
                        1: "1"
                        2: "3"
                    ]
                */
               playerNumber.push( Object.keys(scoreIn[index]).find(e => scoreIn[index][e] === winner));
                })
                let totalScore = [];
                let maxScore;
                /*
                Among the players with the same
                for each player still in the game(excluding undefined players that don't have the max score)
                loop and sum the rank of his cards
                */ 
      
               playerNumber.forEach(function(e) {
                    let sum = 0;
                    if(e !== undefined) {
                        /*here I found the playerRanksArray of the players that bet the max
                          and sum every cards.
                        */
                        playerRanksArray[e].forEach(function(element) {

                            sum = sum + parseInt(element);
                        }) 
                    /*
                         Here I pushed them inside totalCardsum array as object with the relative
                         player number    
                         ex.
                         [
                             {0:55}
                             {3: 72}
                         ]
                    */
                    sumcardRanks.push({[e]:sum});
                    totalScore.push(sum);
                    // the maxScore is the higher sum of card ranks
                    maxScore = Math.max(...totalScore);

                   
                    }
                })
                /*CASE: SUM OF CARDS HAVE EQUAL RANKS AMONG PLAYERS
                if there are two players with the same score and same cards rank sum*/
                let sameSum = [];
                if((totalScore.filter(e => e === maxScore).length > 1)) {
                    sumcardRanks.forEach(function(e, index) {
                        // push the player number with the same total ranks inside the array sameSum
                        sameSum.push(Object.keys(sumcardRanks[index]).find(e => sumcardRanks[index][e] === maxScore));     
                    })
                    //Flip a coin..
                    winner = sameSum[Math.round(Math.random())];
                } else { 
                    sumcardRanks.forEach(function(e, index) {
                        /*
                        here I try to find the keys (player number) which value match the max Score
                        previous ex.
                        {3: 72}    3 is the result
                        */
                        if(Object.keys(sumcardRanks[index]).find(e => sumcardRanks[index][e] === maxScore) !== undefined) {
                            winner = Object.keys(sumcardRanks[index]).find(e => sumcardRanks[index][e] === maxScore);
                        }
                    })
            
                    //Here i pass the fishes that are in the game to the WINNER
                    ingame.forEach(e => {
                        total[winner].textContent = parseInt(total[winner].textContent) + parseInt(e.textContent);
                        //e.innerHTML = "";
                    })
                }
            } else {
                scoreIn.forEach(function(e,index) {
                    if(Object.keys(scoreIn[index]).find(e => scoreIn[index][e] === winner) !== undefined) {
                        winner = Object.keys(scoreIn[index]).find(e => scoreIn[index][e] === winner);
                    }
                })
                ingame.forEach(e => {
                    total[winner].textContent = parseInt(total[winner].textContent) + parseInt(e.textContent);
                    //e.innerHTML = "";
                })
            }
        }
    
        function blufforNot(randomMove ,currentFish, betPrev, total, index) {
            if(randomMove > 6) {
                let bluff = parseInt(betPrev) + Math.round(parseInt(total.textContent) * 1/10);
                currentFish.textContent = Math.round(bluff / 10) * 10;
                ontablefish[index] = currentFish.textContent;
                total.textContent -= currentFish.textContent;
            } else {
                currentFish.textContent = 10;
            }
        }
    
    
    
        nextTurn.addEventListener("click",function() {
            rank = [];
            suit = [];
            result = [];
          
            
            cardGenerator();
            btnOpen.style.display = "inline-block";

            let j = 0;
            for(let i =0; i<playerNumbers; i++) {
                ingame[i].textContent = "";
            
                if(total[i].textContent == 0) {
                    if(i>0) {
                        j++;
                        document.querySelector(`.player${i}`).remove();
                        console.log(`player${i} lose`);
                        delete result[i];
                    } else  {
                        console.log("you lose");
                    }
                }
            
            }
        modifyPlayers(playerNumbers, j);
        ingame = document.querySelectorAll(".in-game-fish");
        total = document.querySelectorAll(".total-fish");
        })

}

export {playAndResponse}