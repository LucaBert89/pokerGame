function findtheWinner(winner, winnerScore, compareScores, scoreIn, playerRanksArray) {
    
    let playerNumber = [];
    let sumcardRanks = [];
     /*1. More than a winner
        if the scores that are equal to winner are more than 1 we have multiple players with
        the same score and we've to found a different method to declare the winner
        Here among the players with the same score, the one which sum of the rank of the
        cards is higher win.
      */
    console.log(compareScores);
    if(compareScores.filter(e => e === winnerScore).length > 1) {
        console.log("ok");
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
        Among the players with the same
        for each player still in the game(excluding undefined players that don't have the max score)
        loop and sum the rank of his cards
        */ 
       console.log(playerNumber);
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
        let prova = totalScore.filter(e => e === maxScore)
        console.log(prova); 
        console.log(totalScore);
        console.log(sumcardRanks);
        console.log(maxScore);
        /*CASE: SUM OF CARDS HAVE EQUAL RANKS AMONG PLAYERS
        if there are two players with the same score and same cards rank sum*/
        let sameSum = [];
        if(totalScore.filter(e => e === maxScore).length > 1) {
            sumcardRanks.forEach(function(e, index) {
                // push the player number with the same total ranks inside the array sameSum
                sameSum.push(Object.keys(sumcardRanks[index]).find(e => sumcardRanks[index][e] === maxScore));     
            })
            //Flip a coin..
           
            winner = sameSum[Math.round(Math.random())];
            console.log(winner);
           
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
                console.log(winner);
                
            })
            console.log(winner);
            //Here i pass the fishes that are in the game to the WINNER
          
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
        console.log(winner);
        
    }
    return winner;
}

export {findtheWinner}