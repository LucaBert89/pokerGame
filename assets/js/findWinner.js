function findPlayersIn(ontablefiche, ingameScores, compareScores, ingame,result) {
    /*
        here playersIn are the players that match the max bet of fiche on the table
        here is returned the index of the players that play the max and accept the bet 
        ex.[0, undefined, 2, undefined] the players in the game are the number 0 and 2
    */
    let playersIn = [...ingame].map((e,index) =>{
        if(e.textContent == Math.max(...ontablefiche) || e.id == "stayIn") return index;
    }).filter(e => e != undefined);

    // show the hidden cards removing the class card-cover and giving the card text to the path image
    playersIn.forEach(e => {
        document.querySelectorAll(".ingame").forEach(function(event,index) {
            if(e === index && e != 0) {
                event.querySelectorAll(".player__card").forEach(e => {
                    e.classList.remove("card-cover");
                    e.style.backgroundImage = `url("./assets/images/cards/${e.textContent}.jpg")`;
                    e.textContent = "";
                })
            }
        })
    })

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


    ingameScores.forEach(function(e,index) {
        //push the scores inside the compareScores array
        /*
            ex. e = {0:1}
            playersIn = [0,1,2]
            e[playersIn[index]] = e[0] = 1 (score)
        */ 
        compareScores.push(e[playersIn[index]]);
    })
}

function findtheWinner(winner, winnerScore, compareScores, scoreIn, playerRanksArray) {
    
    let playerNumber = [];
    let sumcardRanks = [];
     /*1. More than a winner
        if the scores that are equal to winner are more than 1 we have multiple players with
        the same score and we've to found a different method to declare the winner
        Here among the players with the same score, the one which sum of the rank of the
        cards is higher win.
      */
    if(compareScores.filter(e => e === winnerScore).length > 1) {
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
       playerNumber.push( Object.keys(scoreIn[index]).find(e => scoreIn[index][e] === winnerScore));
        })
        let totalScore = [];
        let maxScore;
        /*
        Among the players with the same score
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
                 Here I pushed them inside sumCardRanks array as object with the relative
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
        if(totalScore.filter(e => e === maxScore).length > 1) {
            sumcardRanks.forEach(function(e, index) {
                // push the player number with the same total ranks inside the array sameSum
                sameSum.push(Object.keys(sumcardRanks[index]).find(e => sumcardRanks[index][e] === maxScore));     
            })
            //Flip a coin..
            winner = sameSum[Math.round(Math.random() * (sameSum.length-1))];

        } else { 

            sumcardRanks.forEach(function(e, index) {
                /*
                here I try to find the keys (player number) which value match the max Score
                previous found ex.
                {3: 72}    3 is the result
                */
                if(Object.keys(sumcardRanks[index]).find(e => sumcardRanks[index][e] === maxScore) !== undefined) {
                    winner = Object.keys(sumcardRanks[index]).find(e => sumcardRanks[index][e] === maxScore);
                }
              
            })

            //Here i pass the fichees that are in the game to the WINNER
          
        }
    } else if(compareScores.filter(e => e === winnerScore).length === 1) {
         /*1. Only one winner
            here I find the keys of object scoreIn to find the player number which
            score is higher
         */
        
        scoreIn.forEach(function(e,index) {
            if(Object.keys(scoreIn[index]).find(e => scoreIn[index][e] === winnerScore) !== undefined) {
                winner = Object.keys(scoreIn[index]).find(e => scoreIn[index][e] === winnerScore);
            }
        })
    }
    return winner;
}

export {findtheWinner, findPlayersIn}