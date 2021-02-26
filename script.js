const btnOpen = document.querySelector(".player-active__btn");
const generateBtn = document.querySelector(".generate");
const btnPlay = document.querySelector(".input-fish");
const btnStay = document.querySelector(".stay");
const btnLeave = document.querySelector(".leave");
const btnShow = document.querySelector(".show");

let cardsPlayer = document.querySelectorAll(".player__card");
let playerCommand =document.querySelector(".player-active");
let nextTurn = document.querySelector(".next-turn");
let option = document.querySelectorAll(".option-fish");

const cardSuit = ["C", "D", "H", "S"];



let randomCard = [];
let result = [];
let rank = [];
let suit = [];

let score = {
    "highCard":0,
    "pair": 1,
    "twopair":2,
    "threeofaKind":3,
    "straight":4,
    "flush":5,
    "fullHouse":6,
    "fourofaKind":7,
    "straightFlush":8,
    "royalFlush":9,
}


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
        for(j=0; j <= playerNumbers-1; j++) {
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

function fishSelector(ingame) {
    
    let selectorFish = document.querySelector(".input-fish__selector");
    let optionFish;
    if(selectorFish.children.length >0) {
        selectorFish.innerHTML = "";
    };
    for(let i=0; i < totalFish[0].textContent; i+=10) {
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


generateBtn.addEventListener("click", cardGenerator);

// CARD GENERATION
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
let ingameFish = document.querySelectorAll(".in-game-fish");
let totalFish = document.querySelectorAll(".total-fish");
btnOpen.addEventListener("click", function() {
     // here rank, suit and result'll empty and refill every time btnplay is clicked
     rank = [];
     suit = [];
     result = [];    
     fishSelector(ingameFish);
   // here function players is call passing randomCard, the array that contain all the cards
     players(randomCard);
     
    if(result.every(e => e === 0)) {
        console.log("no one can open");
        rank = [];
        suit = [];
        result = [];
        cardGenerator();

    } else {
        let j = 0;
        for(let i=0; i<playerNumbers; i++) {
            if(totalFish[i].textContent > 0) {
                totalFish[i].textContent = totalFish[i].textContent - 10;
                ingameFish[i].textContent = 10;
            } else if(totalFish[i].textContent == 0) {
                if(i>0) {
                    j++;
                    document.querySelector(`.player${i}`).remove();
                    console.log(`player${i} lose`);
                    delete result[i];
                } else {
                    console.log("you lose");
                }
            
            }
        }
        playerNumbers -= j;
        btnOpen.style.display = "none";
        btnPlay.style.display = "block";
       
    }

   
      
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
    let totalRanks;
function players(random) {
    /*for each card of the game call the hand function passing the single card and index
    to separate the rank and the suit*/
    random.forEach(function(element, index) {   
    hand(element, index); 
    })
    // here the totalRanks and totalSuits are emptyed and refilled every time btn is clicked
    totalRanks= [];
    const totalSuits = [];
    
    /* cardSplit is used to deal the card to the players rounding with ceil in combination
    with dealingCards function.
    here cardSplit = 5 (5 cards per player)*/
    let cardSplit = Math.ceil(random.length / playerNumbers);
    
    /*here I Call dealingCards function passing: totalRanks and Suits, the empty arrays
    , cardSplit, rank and suit arrays. 
    The goal is to divide the cards among the players, 5 per player with their rank and suit*/
        dealingCards(totalRanks,totalSuits,cardSplit,rank,suit);
        handCombination(totalRanks,totalSuits); 
}
    
// FUNCTION HAND: random = randomCard (all card of the game)
function hand(random) {
    //separate rank and suit into separate array
        rank.push(random.slice(0,-1));
        suit.push(random[random.length-1]);
    }

// DEALINGCARDS: tr= totalrank empty array, ts=totalsuit empty array, cs=cardSplit, r = rank array, s=suit array
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

/* HAND COMBINATION: rank array and suit array*/
let totalCount;
let cardNumber;
let key;
function handCombination(rank, suit) {
    //variables for counting the elements: useful for pair or threes or others
    let count = {};
    let countSuit = {};
    totalCount = [];
    let totalSuit = [];
    let values;
    
    // combination variable for functions
    let pairComb;
    let threefullComb;
    let straightComb;
    count = {};
    countSuit = {};
    for(let i=0; i<playerNumbers; i++) {
        
        count = {};
        countSuit = {};
        //I called two functions to count: 1^rank of cards; 2^suit of cards 
        /*here I pass to the function the rank array ex. ["2","3","4","5", "6"], the count obj
        
        i need to create an array of objects of the player's ranks; the i(players); totalCount that
        is empty but it's going to be the new array of objects with the count divided among players*/
        countValues(rank,count,i, totalCount);

        /*here the same I did for the rank but for the suit*/
        countValues(suit,countSuit,i, totalSuit);

        //take the values of rank and suit: the values of the objects
        values = Object.values(totalCount[i]);
        suitvalues = Object.values(totalSuit[i]);
        key = Object.keys(totalCount[i]);
        pairComb = findPair(values, key);
        threefullComb = threeOrFull(values);
        straightComb = straigth(rank[i], suitvalues);
        if(pairComb == undefined && threefullComb == undefined && straightComb == undefined) {
           high = noOther(); 
        }

           
    }

}

// COUNTVALUES: array=rank or suit array, c=count or countSuit, index=i, total suit or count array empty
function countValues (array,c,index,total) {
   /*example letter and number count
   [
    0: {C: 2, D: 1, H: 2}
    1: {C: 1, H: 2, S: 1, D: 1}
   ]
   [
    0: {3: 1, 5: 1, 6: 1, 9: 1, 12: 1}
    1: {2: 1, 4: 1, 7: 2, 14: 1}
   ]
   */
    array[index].forEach(function(e) { 
        c[e] = (c[e]||0) + 1;
    });
    total.push(c);
}



function findPair(howmany) {
    //if there are 2 equal cards then it means that it could be a pair or a two pair.
    if(howmany.filter(e => e == 2).length === 1 && howmany.filter(e => e !== 2).length > 1) {
        //if the array length is = 4 ex. ["2","1","1","1"] it means there is a pair
            return result.push(score["pair"]);
        /*if the array length is = 3 you could have three equal cards and two different
          ones or two pairs and another one like ex. ["2", "2", "1"] */
        } else if(howmany.filter(e => e == 2).length === 2) {
            // so if there aren't no 3 inside the array than it is a two pair for sure
            return result.push(score["twopair"]);
        }
    }

function threeOrFull(howmany) {
    if(howmany.filter(e => e == 4).length === 1) {
        return result.push(score["fourofaKind"]);
    } else if(howmany.filter(e => e == 3).length === 1) {
        if(howmany.filter(e => e == 2).length === 1) {
            return result.push(score["fullHouse"]);
        } else {
            return result.push(score["threeofaKind"]);
        }
    } 
}

function straigth(arrayRank, arraySuit) {
    let consecutiveArray = [];
    arrayRank.sort(function(a, b) {
        return a - b;
    });
    
    consecutiveArray = [];  
 
    arrayRank.forEach(function(element, index){
        if(arrayRank[index+1] - element == 1) {
            consecutiveArray.push(element);
        }
    });
    if(arraySuit.length === 1) {
        if(consecutiveArray.length == 4) {
            if(Math.min.apply(Math, consecutiveArray) === 10) {
                return result.push(score["royalFlush"]);
            } else {
                return result.push(score["straightFlush"]);
            }
            
        } else {
            return result.push(score["flush"]);
        }
    } else if(consecutiveArray.length == 4) {
        return result.push(score["straight"]);
    }

}

function noOther () {
    return result.push(score["highCard"]);
}




let ontablefish;
let randomNumber = Math.floor(Math.random() * 11);
document.querySelector(".input-fish__btn").addEventListener("click", function(){
    const cpuContainer = document.querySelector(".cpu-container");
    const cpuPlayers = cpuContainer.querySelectorAll(".cpu");
    // + 10 is the open fish that I don't want to be counted two times
    totalFish[0].textContent = (parseInt(totalFish[0].textContent) - parseInt(ingameFish[0].textContent))+10;

    let x=5;

    let cpuCurrent = [];
    let discardedCard= [];
    let ranking = [];
    cardNumber = [];
    let replaceIndex;  
    
    for(let j=5; j<randomCard.length; j+=5) {
        cpuCurrent.push(randomCard.slice(j, j+5));  
    }
    for(let i=0;i<playerNumbers-1;i++) {
        cardNumber = Object.entries(totalCount[i+1]);
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
    players(randomCard);
    ontablefish = [...ingameFish].map(e => e.textContent);
    let riskValue;
    for(let i=1; i<playerNumbers; i++) {
        let addedNumber;
        //if(parseInt(ingameFish[i-1].textContent) > 10) {

            if(totalFish[i].textContent >= Math.max(...ontablefish)) {
                if(result[i] === 0) {
                    console.log("result = 0");
                    blufforNot(randomNumber, ingameFish[i], Math.max(...ontablefish), totalFish[i], i);
                } else if(result[i] >= 1 && result[i] <= 3 ) {
                    console.log("result = 1 a 3");
                    addedNumber = totalFish[i].textContent * 2/10;
                    riskValue = totalFish[i].textContent * 2/5;
                    if((Math.round(riskValue/10)*10) >= Math.max(...ontablefish)) {
                        ingameFish[i].textContent = Math.max(...ontablefish) + Math.round(addedNumber / 10) * 10;
                        ontablefish[i] = ingameFish[i].textContent;
                        //ingameFish[i+1].textContent = 20;
                        totalFish[i].textContent = parseInt(totalFish[i].textContent) - parseInt(ingameFish[i].textContent) + 10;  
                    } else {
                        console.log("non scommetto sono tra 1 e 3");
                        ingameFish[i].textContent = 10;
                    }
                } else if(result[i] >= 4 && result[i] <= 6 ) {
                    console.log("result = 4 a 6");
                    riskValue = totalFish[i].textContent * 3/5;
                    if((Math.round(riskValue/10)*10) >= Math.max(...ontablefish)) {
                        ingameFish[i].textContent = Math.max(...ontablefish);
                        ontablefish[i] = ingameFish[i].textContent;
                        totalFish[i].textContent = parseInt(totalFish[i].textContent) - parseInt(ingameFish[i].textContent) +10;  
                    } else {
                        console.log("non scommetto sono tra 4 e 6");
                        ingameFish[i].textContent = 10;
                    }
                } else if(result[i] >= 7 ) {
                    console.log("result = + di 7");
                    ingameFish[i].textContent = totalFish[i].textContent;
                    ontablefish[i] = ingameFish[i].textContent;
                    totalFish[i].textContent = parseInt(totalFish[i].textContent) - parseInt(ingameFish[i].textContent) +10;   
                }
            } else {
                continue;
            }
    }    
  
    ontablefish = [...ingameFish].map(e => e.textContent);
   
    if(ingameFish[0].textContent < Math.max(...ontablefish)) {
        if(ingameFish[0].textContent != 10) {
            btnStay.style.display = "inline-block";
            btnLeave.style.display = "inline-block";
        } else {
            btnShow.style.display = "inline-block";
        }
    }
       //     }
    
})


let previous;
let difference;
btnStay.addEventListener("click", function() {
    ingameFish[0].removeAttribute("id");
    previous = ingameFish[0].textContent;
    difference = Math.max(...ontablefish) - previous;
    if(totalFish[0].textContent >= difference){
        ingameFish[0].textContent = parseInt(ingameFish[0].textContent) + difference;
        totalFish[0].textContent = parseInt(totalFish[0].textContent) - difference;
    } else {
        ingameFish[0].setAttribute("id","stayIn");
        ingameFish[0].textContent = totalFish[0].textContent;
        totalFish[0].textContent = parseInt(totalFish[0].textContent) - parseInt(totalFish[0].textContent);
    }


    cpuSecondRound();

    /*
        here playersIn are the players that match the max bet of fish on the table
        here is returned the index of the players that play the max and accept the bet 
        ex.[0, undefined, 2, undefined] the players in the game are the number 0 and 2
    */
    let playersIn = [...ingameFish].map((e,index) =>{
        if(e.textContent == Math.max(...ontablefish) || e.id == "stayIn") return index;
    }).filter(e => e != undefined);
    console.log(playersIn);
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
    console.log(compareScores);
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
    console.log(winner);
// FIND THE CORRESPONDING KEY (PLAYER NUMBER).
    /*we found the max score that won the game, but whose player is it?
    TWO CASES:
    1. more than a winner: 2 or more players with the same score;
    2. one winner;
    */  
    let keyPlayers = [];
    console.log(keyPlayers);
    let totalCardSum = [];
    console.log(totalCardSum);
/*1. More than a winner
    if the scores that are equal to winner are more than 1 we have multiple players with
    the same score and we've to found a different method to declare the winner
    Here among the players with the same score, the one which sum of the rank of the
    cards is higher win.
*/
  findtheWinner(keyPlayers, totalCardSum, winner, ingameScores, compareScores)
    console.log(result);
    console.log(ingameScores);
    console.log(playersIn);
    console.log(winner);
   
})

btnShow.addEventListener("click", function() {
    cpuSecondRound();

        /*
            here playersIn are the players that match the max bet of fish on the table
            here is returned the index of the players that play the max and accept the bet 
            ex.[0, undefined, 2, undefined] the players in the game are the number 0 and 2
        */
        let playersIn = [...ingameFish].map((e,index) =>{
            if(e.textContent == Math.max(...ontablefish) || e.id == "stayIn") return index;
        }).filter(e => e != undefined);
        console.log(playersIn);
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
        console.log(compareScores);
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
        console.log(winner);
    // FIND THE CORRESPONDING KEY (PLAYER NUMBER).
        /*we found the max score that won the game, but whose player is it?
        TWO CASES:
        1. more than a winner: 2 or more players with the same score;
        2. one winner;
        */  
        let keyPlayers = [];
        console.log(keyPlayers);
        let totalCardSum = [];
        console.log(totalCardSum);
/*1. More than a winner
        if the scores that are equal to winner are more than 1 we have multiple players with
        the same score and we've to found a different method to declare the winner
        Here among the players with the same score, the one which sum of the rank of the
        cards is higher win.
*/
      findtheWinner(keyPlayers, totalCardSum, winner, ingameScores, compareScores)
        console.log(result);
        console.log(ingameScores);
        console.log(playersIn);
        console.log(winner);
})

btnLeave.addEventListener("click", function() {
    cpuSecondRound();

        /*
            here playersIn are the players that match the max bet of fish on the table
            here is returned the index of the players that play the max and accept the bet 
            ex.[0, undefined, 2, undefined] the players in the game are the number 0 and 2
        */
        let playersIn = [...ingameFish].map((e,index) =>{
            if(e.textContent == Math.max(...ontablefish) || e.id == "stayIn") return index;
        }).filter(e => e != undefined);
        console.log(playersIn);
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
        console.log(compareScores);
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
        console.log(winner);
    // FIND THE CORRESPONDING KEY (PLAYER NUMBER).
        /*we found the max score that won the game, but whose player is it?
        TWO CASES:
        1. more than a winner: 2 or more players with the same score;
        2. one winner;
        */  
        let keyPlayers = [];
        console.log(keyPlayers);
        let totalCardSum = [];
        console.log(totalCardSum);
/*1. More than a winner
        if the scores that are equal to winner are more than 1 we have multiple players with
        the same score and we've to found a different method to declare the winner
        Here among the players with the same score, the one which sum of the rank of the
        cards is higher win.
*/
      findtheWinner(keyPlayers, totalCardSum, winner, ingameScores, compareScores)
        console.log(result);
        console.log(ingameScores);
        console.log(playersIn);
        console.log(winner);
})



    function cpuMove(n, dCard, cpuP, newIndex, index,cardRank,x) { 
        dCard = [];
        n.forEach(function(element) {
            if(element[1] === 1) {
                dCard.push(element[0]);
            }   
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

    function cpuSecondRound() {
        for(let i=1; i<playerNumbers; i++) {
            previous = ingameFish[i].textContent;
            ingameFish[i].removeAttribute("id");
            let riskValue;
            if(totalFish[i].textContent >= (Math.max(...ontablefish) - previous)) {
                if(result[i] === 0) {
                    if(ingameFish[i].textContent == 10) {
                        continue;
                    } else {
                        ingameFish[i].textContent = Math.max(...ontablefish);
                        difference = parseInt(ingameFish[i].textContent) - previous;
                        totalFish[i].textContent = parseInt(totalFish[i].textContent) - difference;
                    }
                    //blufforNot(randomNumber, ingameFish[i], Math.max(...ontablefish), totalFish[i]);
                } else if(result[i] >= 1 && result[i] <= 3 ) {
                    riskValue = totalFish[i].textContent * 2/5;
                    if((Math.round(riskValue/10)*10) >= Math.max(...ontablefish)) {
                        ingameFish[i].textContent = Math.max(...ontablefish);
                        //ingameFish[i+1].textContent = 20;
                        difference = ingameFish[i].textContent - previous;
                        totalFish[i].textContent = parseInt(totalFish[i].textContent) - difference;  
                } else {
                        console.log("ok");
                        continue;
                    }
                }
                    
                else if(result[i] >= 4 && result[i] <= 6 ) {
                    riskValue = totalFish[i].textContent * 3/5;
                    if((Math.round(riskValue/10)*10) >= Math.max(...ontablefish)) {
                        ingameFish[i].textContent = Math.max(...ontablefish);
                        difference = ingameFish[i].textContent - previous;
                        totalFish[i].textContent = parseInt(totalFish[i].textContent) - difference; 
                    } else {
                        continue;
                    }
                } else if(result[i] >= 7 ) {
                    ingameFish[i].textContent = Math.max(...ontablefish);
                    difference = ingameFish[i].textContent - previous;
                        totalFish[i].textContent = parseInt(totalFish[i].textContent) - difference;  
                }
            } else {
        /*here is the case when the player has not enough fish to bet again and match the max
        bet that is on the table. 
        
        In this case I added an ID to highlight that he's in the game
        despite he hasn't enough money. This "id" let me to consider the player score for comparation
        inside findthewinner function
        */
                ingameFish[i].setAttribute("id", "stayIn");
                ingameFish[i].textContent = parseInt(ingameFish[i].textContent) + parseInt(totalFish[i].textContent);
                totalFish[i].textContent = parseInt(totalFish[i].textContent) - parseInt(totalFish[i].textContent);
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
            console.log(totalScore);
            let maxScore;
            /*
            Among the players with the same
            for each player still in the game(excluding undefined players that don't have the max score)
            loop and sum the rank of his cards
            */ 
           playerNumber.forEach(function(e) {
                let sum = 0;
                if(e !== undefined) {
                    /*here I found the totalRanks of the players that bet the max
                      and sum every cards.
                    */
                    totalRanks[e].forEach(function(element) {
                        console.log(element);
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
                console.log(totalScore);
                console.log(sumcardRanks);
               
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
                ingameFish.forEach(e => {
                    totalFish[winner].textContent = parseInt(totalFish[winner].textContent) + parseInt(e.textContent);
                    //e.innerHTML = "";
                })
            }
        } else {
            scoreIn.forEach(function(e,index) {
                if(Object.keys(scoreIn[index]).find(e => scoreIn[index][e] === winner) !== undefined) {
                    winner = Object.keys(scoreIn[index]).find(e => scoreIn[index][e] === winner);
                }
            })
            ingameFish.forEach(e => {
                totalFish[winner].textContent = parseInt(totalFish[winner].textContent) + parseInt(e.textContent);
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
        totalCount = [];
        totalSuit = []; 
        for(let i =0; i<playerNumbers; i++) {
            ingameFish[i].textContent = "";
        }
        cardGenerator();
        btnOpen.style.display = "inline-block";
    })