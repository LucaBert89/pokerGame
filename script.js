const btnOpen = document.querySelector(".player-active__btn");
const generateBtn = document.querySelector(".generate");
const btnPlay = document.querySelector(".input-fish");
let cardsPlayer = document.querySelectorAll(".player__card");
let playerCommand =document.querySelector(".player-active");
let nextTurn = document.querySelector(".next-turn");
let option = document.querySelectorAll(".option-fish");

const cardSuit = ["C", "D", "H", "S"];
const body = document.querySelector("body");
const playersContainer = document.querySelector(".players");

let consecutiveArray = [];
let randomCard = [];
let playerCards = [];
let cpuCards = [];
let result = [];
let rank = [];
let suit = [];
let i = 0;

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
    let player;
    let totalCash;
    let fishBet;
    let card;
    let cpu = document.createElement("div");
    cpu.classList.add("cpu-container");
//max of the player is four: a class and a div will be generated for each player
    if(playerNumbers <= 4) {
        for(j=1; j <= playerNumbers; j++) {
            player = document.createElement("div");
            fishBet = document.createElement("div");
            
            playerCash(player, fishBet,j, totalCash);
            // to the user will be assigned the active class
            if(j==1) {
                player.classList.add("active");
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
    for(let i=0; i < points; i+=10) {
        if(selectorFish.children.length === 10) {
            selectorFish.innerHTML = "";
        };
        optionFish = document.createElement("option");
        optionFish.classList.add("option-fish")
        optionFish.value = i;
        optionFish.innerHTML = i;
        selectorFish.appendChild(optionFish);
    }
    selectorFish.addEventListener("change", function(e){
        ingame[0].textContent = e.target.value;
    })
}


generateBtn.addEventListener("click", cardGenerator);

// CARD GENERATION
function cardGenerator() {
    randomCard = [];
    let gameCards = document.querySelectorAll(".player__card");
    const player = document.querySelector(".active");
    const activeCard = player.querySelectorAll(".player__card");

   
    // assignment of the cards: i looped through the card of the players and assign a random number and suit letter
    gameCards.forEach(function(element, index) {
       //here I call the function passing the element (card class) and index;
        generateCard(element, index); 
        /*the first 5 cards are yours (index<5) so you can click only on your cards 
        if you want to change them*/
    });
    activeCard.forEach(function(element, index) {
        element.addEventListener("click", function() {
            // rules of poker: you can't change more than 4 cards
            //if(i < 4) {
                /*call the function replace card passing the index to replace your card
                with another*/
                replaceCard(index, element);
                
                /*
                i++;
            } else {
                return false;
            }  
            */
        })
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
      
        /* here the compare function is called passing result. Result are the scores based on
        the card combinations, displayed like this:
        [
            0: 9  (royal flush)
            1: 1  (pair)
        ]*/

        
        /*poker rule:
        if no one of the player have points on their hand, than no one can open, randomCard
        will be empty and refilled than cardGenerator generate new card for every one*/
        if(result.every(e => e === 0)) {
            console.log("no one can open");
            rank = [];
            suit = [];
            result = [];
            cardGenerator();
            
            
        } else {
            for(let i=0; i<playerNumbers; i++) {
                totalFish[i].innerHTML = totalFish[i].innerHTML - 10;
            }
            btnOpen.style.display = "none";
            btnPlay.style.display = "block";
           
        }
      
        compare(result);
}) 

/* PLAYER FUNCTION: to separate rank and suit and use them to display combinations
random = randomCard (the array that contains all the cards of the game*/
function players(random) {
    /*for each card of the game call the hand function passing the single card and index
    to separate the rank and the suit*/
    random.forEach(function(element, index) {   
    hand(element, index); 
    })
    // here the totalRanks and totalSuits are emptyed and refilled every time btn is clicked
    const totalRanks= [];
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

        pairComb = findPair(values);
        threefullComb = threeOrFull(values);
        straightComb = straigth(rank[i], suitvalues);
        if(pairComb == undefined && threefullComb == undefined && straightComb == undefined) {
           high = noOther(); 
        }

           
    }
    console.log("ok");

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
    if(howmany.filter(e => e == 2).length === 1) {
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

function compare(r) {
    if(r.filter(e => e > r[0]).length > 0) {
        console.log(r);
        console.log("you lose")
    } else if(r.every(e => e < r[0])){
        console.log(r);
        console.log("win");
    } else {
        console.log(r);
        console.log("pair");
    }
}



document.querySelector(".input-fish__btn").addEventListener("click", function(){
    const cpuContainer = document.querySelector(".cpu-container");
    const cpuPlayers = cpuContainer.querySelectorAll(".cpu");
    let totalF;
    console.log("mi ripeto");
    console.log(cardNumber);
    console.log(totalCount);
    totalF = document.querySelectorAll(".total-fish").innerHTML;

    let x=5;
    /*totalFish.innerHTML = parseInt(totalFish.innerHTML) - inputFish.value;
    tableBet.innerHTML = inputFish.value;*/
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
    compare(result);
    
    for(let i=1; i<playerNumbers; i++) {
        console.log(ingameFish[i-1]);
        let randomNumber = Math.floor(Math.random() * 11);
        let addedNumber;
        if(ingameFish[i-1].textContent > 0) {
            console.log("qui");
            if(totalFish[i].textContent >= ingameFish[i-1].textContent) {
                if(result[i] === 0) {
                    blufforNot(randomNumber, ingameFish[i], ingameFish[i-1], totalFish[i]);
                } else if(result[i] >= 1 && result[i] <= 3 ) {
                    if(ingameFish[i-1].textContent <= (totalFish[i].textContent * 2/5)) {
                        ingameFish[i].textContent = ingameFish[i-1].textContent;
                        //ingameFish[i+1].textContent = 20;
                        console.log(">1 e <3");
                        totalFish[i].textContent -= ingameFish[i].textContent;  
                } else {
                        console.log("ok");
                        ingameFish[i].textContent = 0;
                    }
                }
                    
                else if(result[i] >= 4 && result[i] <= 6 ) {
                    if(ingameFish[i-1].textContent <= (totalF[i].textContent) * 3/5) {
                        ingameFish[i].textContent = ingameFish[i-1].textContent;
                        totalFish[i].textContent -= ingameFish[i].textContent; 
                    } else {
                        ingameFish[i].textContent = 0;
                    }
                } else if(result[i] >= 7 ) {
                    ingameFish[i].textContent = totalFish[i].textContent;
                    totalFish[i].textContent -= ingameFish[i].textContent; 
                }
            }
        } else if(totalFish[i].textContent >= 0 && ingameFish[i-1].textContent == 0) {
            console.log("ok");
            
            if(result[i] === 0) {
                addedNumber = totalFish[i].textContent * 2/10;
                ingameFish[i].textContent = Math.round(addedNumber / 10) * 10;
            } else if(result[i] >= 1 && result[i] <= 3 ) {
                addedNumber = totalFish[i].textContent * 1/10;
                ingameFish[i].textContent = Math.round(addedNumber / 10) * 10;
            } else if(result[i] >= 4 && result[i] <= 6 ) {
                addedNumber = totalFish[i].textContent * 4/10;
                ingameFish[i].textContent = Math.round(addedNumber / 10) * 10;
            } else if(result[i] >= 7) {
                addedNumber = totalFish[i].textContent * 7/10;
                ingameFish[i].textContent = Math.round(addedNumber / 10) * 10;
            } 
        }
                    
    }                          
       //     }
       
    
    
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

    function blufforNot(randomMove ,currentFish, betPrev, total) {
       /* console.log(randomMove,currentFish, betPrev);
        if(randomMove > 6) {*/
            console.log("bluff");
            let bluff = parseInt(betPrev.textContent) + Math.round(parseInt(total.textContent) * 1/10);
            console.log(bluff);
            currentFish.textContent = Math.round(bluff / 10) * 10;;
            total.textContent -= currentFish.textContent;
            /*
        } else {
            console.log("passo");
        }*/
    }


    nextTurn.addEventListener("click",function() {
        rank = [];
        suit = [];
        result = [];
        totalCount = [];
        totalSuit = []; 
        for(let i =0; i<playerNumbers; i++) {
            ingameFish[i].innerHTML = "";
        }
        cardGenerator();
        btnOpen.style.display = "inline-block";
    })

 
        /* 
        console.log(cpuPlayers[i].querySelectorAll(".player__card"));
        array.push(cpuCards[i]);
        ranking.push(array[x].slice(0,-1));
        if(ranking.length === 5) {
            x=0;
            if(number[x][1] === 1) {
                let index = ranking.indexOf(number[x][0]);
                console.log(number[x]);
                console.log(ranking);
                console.log(array[i]);
                console.log(index);
                replaceCard(index, cpuCards[i]);
            }
        }
       
        x++;
       
        j++;
        
        console.log(j);
    }*/
      
      /*
      array.forEach(function(e,i){
        ranking.push(e.slice(0,-1));
      })
      if(number[j][1] === 1) {
        let index = ranking.indexOf(number[j][0]);
        console.log(number[j]);
        console.log(ranking);
        console.log(index);
        replaceCard(index, cpuCards[5]);
    }
      */
/*
function hand() {
    let rank = [];
    let suit = [];
  
    // separate rank from suit
        for(let i=0; i < 5; i++) {
            if(arguments[i].length >2) {
                rank.push(arguments[i].slice(0,2).toUpperCase());
                suit.push(arguments[i].slice(2,3).toUpperCase());
            } else {
                rank.push(arguments[i].slice(0,1).toUpperCase());
                suit.push (arguments[i].slice(1,2).toUpperCase());
            };
  
        
       
    // converting letter cards to number
            switch(rank[i]){
                case "J":
                    rank[i] = "11";
                    break;
                case "Q":
                    rank[i] = "12";
                    break;
                case "K":
                    rank[i] = "13";
                    break;
                case "A":
                    rank[i] = "14";
                    break;
                default:
                  break;
            }
  
        // check right rank or suit
            if(!(suit[i] === "C" ||  suit[i] === "D" || suit[i] === "S" || suit[i] === "H" ) || !(rank[i] < 15 && rank[i] >0)) {
                console.log("invalid rank or suit card");
                return false;
            }
            
        }
  
        // sort the number inside the array
        rank.sort(function(a, b) {
            return a - b;
        });
       
        
        // Straight Flush: the cards are in order by rank. So the difference between the max and min should always be 4 if all the cards are different in rank
        if (Math.max.apply(Math, rank) - Math.min.apply(Math, rank) === 4) {
        
        for(let i=0; i<rank.length; i++) {
            if(rank[i+1] - rank[i] !== 1) {
                break;
            } 
        }
        //Royal Flush
        if(suit.every(e => e === suit[0])) {
            if(rank.every(e => e >= 10)) {
                console.log("Royal Flush");
            } else {
        // five card of same suit 
                console.log("Straight Flush")
            }
        } else {
        // Straight
            console.log("Straight");
        } 
       
        // Flush 
        } else if(suit.every(e => e === suit[0])) {
            console.log("Flush");
        }
        
       else if(rank.filter(e => e !== rank[0]).length === 3) {
        let newArray = rank.filter(e => e !== rank[0]);
    
        if(newArray.filter(e => e !== newArray[0]).length === 2) {
            let pairArray = newArray.filter(e => e !== newArray[0]);
            if(pairArray[0] === pairArray[1]){
    // two pair
                console.log("two pair");
            }  else {
    // pair
                console.log("pair");
            }
            
    // three and pair
         } else if(newArray.filter(e => e !== newArray[0]).length === 0) {
             console.log("Full house")
    // pair
         } else if(newArray.filter(e => e !== newArray[0]).length === 1) {
             console.log("pair");
         }
        }
      
      else if(rank.filter(e => e !== rank[0]).length === 2) {
          let newArray = rank.filter(e => e !== rank[0]);
         if(newArray.filter(e => e !== newArray[0]).length === 1) {
    // three of a Kind
             console.log("three of a Kind");
         } else if(newArray.filter(e => e !== newArray[0]).length === 0) {
    // three and pair
             console.log("Full house")
         }
    //Four cards of the same rank
     } else if(rank.filter(e => e !== rank[0]).length === 1 || rank.filter(e => e === rank[0]).length === 4) {
         console.log("four of a kind");
     } else {
    // No other hands
         console.log("High card")
     }
    
  }
  
  
  // C = clubs ; H = hearts; S = spades; D = diamonds 
  
  hand("AC", "JC", "QC", "KC","10C")
  
  hand("9C", "10C", "JC", "QC","KC")
  
  hand("1C", "1D", "1C", "1S","2C")
  
  hand("2H", "2H", "1C", "1S","1C")
  
  hand("2C", "2D", "3C", "3S","4C")
  
  hand("2C", "3C", "AC", "5C","6C")
  
  hand("2C", "3H", "4C", "5D","6C")
  
  hand("2C", "2H", "2C", "KD","6C")
  
  hand("AC", "AH", "4C", "4D","6C")
  
  hand("AC", "2H", "3C", "4D","6C")

  */