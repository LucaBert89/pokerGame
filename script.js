const btnPlay = document.querySelector(".player-active__btn");
const cardSuit = ["C", "D", "H", "S"];
const body = document.querySelector("body");
let player;
let card;


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

let randomCard = [];
let playerCards = [];
let cpuCards = [];
let result = [];

let rank = [];
let suit = [];
let i = 0;

let playerNumbers = prompt("how many players?");

function generatePlayers(playerNumbers) {
    if(playerNumbers <= 4) {
        for(j=1; j <= playerNumbers; j++) {
            player = document.createElement("div");

            player.classList.add(`player`);
            
            if(j==1) {
                player.classList.add("active");
            } else {
                player.classList.add(`${j}`);
            }
            body.appendChild(player);
            
            for(x=1; x <= 5;x++) {
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

function cardGenerator() {
    const gameCards = document.querySelectorAll(".player__card");
    // assignment of the cards: i looped through the card of the players and assign a random number and suit letter
    let e = true;

    gameCards.forEach(function(element, index) {
        // you can't have the same card for two times, so if the current card is already on the table you have to
        // generate another card
        generateCard(element, index); 
        // you can click only on your cards to change them. From 5 start active player cards
        if(index < 5) {
            gameCards[index].addEventListener("click", function() {
                // rules of poker: you can't change the card more than two times
                //if(i < 2) {
                    replaceCard(index);
                    element.style.backgroundImage = cardImage;
                    /*
                    i++;
                } else {
                    return false;
                }  
                */
            })
        }    
});
btnPlay.addEventListener("click", function() {
        players(randomCard);
        compare(result)
}) 
}

cardGenerator();


function generateCard(selectedCard, current) {
    card = (Math.floor(Math.random()*13)+2) + cardSuit[Math.floor(Math.random() * cardSuit.length)];

    if(!randomCard.includes(card)) {
        randomCard.push(card);
        cardImage = `url("./assets/images/${randomCard[current]}.jpg")`;
        selectedCard.style.backgroundImage = cardImage;
    } else {
        generateCard(selectedCard, current);
    }  
}

// separate player cards from cpuCards

function players(random) {
    /*console.log(random.length);
        playerCards = random.slice(0,5);

        cpuCards = random.slice(5,random.length);

    playerCards.forEach(function(element, index) {
        hand(element, index); 
    })
    handCombination(rank, suit);
    */
    random.forEach(function(element, index) {   
    hand(element, index); 
    })

    const cpuPlayers = [];
    let cardSplit = Math.ceil(random.length / playerNumbers);
    console.log(cardSplit);
    for(let i=0;i < playerNumbers;i++) {
        cpuPlayers[i] = [];
        for(let j=0;j<cardSplit;j++) {
            const value = rank[j+i*cardSplit];
            if (!value) continue
           cpuPlayers[i].push(value);
        }
        /*cpuCards[i].forEach(function(element, index) {
            hand(element, index);*/ 
    };
        handCombination(cpuPlayers,suit); 
    }
    




function replaceCard(current) {
    card = (Math.floor(Math.random()*13)+2) + cardSuit[Math.floor(Math.random() * cardSuit.length)];
    if(randomCard.includes(card)) {
        return replaceCard(current);
    } else {
        randomCard.splice(current,1,card);

        cardImage = `url("./assets/images/${randomCard[current]}.jpg")`;
    }
}


function hand(random) {
        rank.push(random.slice(0,-1));
        suit.push(random[random.length-1]);
    }

function handCombination(cpuRank, suit) {
    var count = {};
    let totalCount = [];
    let values;
    let find;
    let three;
    for(let i=0; i<playerNumbers; i++) {
        count = {};
        cpuRank[i].forEach(function(e) { 
            count[e] = (count[e]||0) + 1;
        });
        totalCount.push(count);
        values = Object.values(totalCount[i])
        
        find = findPair(values);
        three = threeOrFull(values);
        //let strai = straigth(rank);
        //let flus = flush(suit, sameSuit);
        if(find == undefined && three == undefined) {
           high = noOther(); 
        }
    }
    
    let sameSuit = [];
}

function noOther () {
    return result.push(score["highCard"]);
}

function findPair(howmany) {
    //if there are 2 equal cards then it means that it could be a pair or a two pair.
    if(howmany.filter(e => e == 2).length === 1) {
        //if the array length is = 4 ex. ["2","1","1","1"] it means there is a pair
            return result.push(score["pair"]);
            
            console.log("pair");
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

function straigth(arrayRank) {
   
    arrayRank.sort(function(a, b) {
        return a - b;
    });
    let consecutiveArray = [];
 
    arrayRank.forEach(function(element, index){
        if(arrayRank[index+1] - element == 1) {
            consecutiveArray.push(element);
        }
    });
    if(consecutiveArray.length == 4) {
            arraySuit.forEach(function(element, index){
                if(element == arraySuit[index+1]){
                    sameSuit.push(element);
                }
            })

            if(sameSuit.length == 4) {
                if(Math.min.apply(Math, consecutiveArray) === 10) {
                    return result.push(score["royalFlush"]);
                } else {
                    return result.push(score["straightFlush"]);
                }
            } else {
                return result.push(score["straight"]);
            }
    }   
        
}

function flush(arraySuit, suit) {
    arraySuit.forEach(function(element, index){
        if(element == arraySuit[index+1]){
            suit.push(element);
        }
    })

    if(suit.length == 4) {
        return result.push(score["flush"]);
    } 
} 

function compare(r) {
    if(r.filter(e => e > r[0]).length > 0) {
        console.log(r);
        console.log(`you ${player.classList.contains(`player ${r[0]}`)} lose`)
        console.log("you lose")
    } else if(r.filter(e => e < r[0]).length > 0){
        console.log(r);
        console.log("win");
    } else {
        console.log("pair");
    }
}

 
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