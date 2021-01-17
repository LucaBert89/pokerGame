const gameCards = document.querySelectorAll(".player__card");
const playerActive = [...document.querySelector(".second").children];
console.log(gameCards);
const btnPlay = document.querySelector(".player-active__btn");
const cardSuit = ["C", "D", "H", "S"];
let randomCard = [];
let playerCards = [];
let cpuCards = [];

let rank = [];
let suit = [];
let i = 0;

// assignment of the cards: i looped through the card of the players and assign a random number and suit letter

gameCards.forEach(function(element, index) {
        // you can't have the same card for two times, so if the current card is already on the table you have to
        // generate another card
        generateCard(element, index); 
        // you can click only on your cards to change them. From 5 start active player cards
        if(index >= 5) {
            gameCards[index].addEventListener("click", function() {
                // rules of poker: you can't change the card more than two times
                if(i < 2) {
                    replaceCard(index);
                    element.style.backgroundImage = cardImage;
                    i++;
                } else {
                    return false;
                }  
            })
        } 

        btnPlay.addEventListener("click", function() {
            hand(randomCard, index);
            players(randomCard, index);
            
        })     
});

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
function players(random, i) {
    if(i >= 5) {
        playerCards.push(random[i]);
    } else {
        cpuCards.push(random[i]);
    }
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


function hand(random, selected) {  
    rank.push(random[selected].slice(0,-1));
    suit.push(random[selected][random[selected].length-1]);
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