function firstBet(total, ingame, ontablefish, result, random, i) {
    let riskValue;
    let addedNumber;
// if the total of the current player is >= than the max bet on the table
    if(total[i].innerText >= Math.max(...ontablefish)) {
        if(result === 0) {
            //here result = 0 and the cpu'll decide if bluffing or not
            ingame[i].innerText = blufforNot(random, Math.max(...ontablefish), total);
            // if result is between 1 and 3
        } else if(result[i] >= 1 && result[i] <= 3 ) {
            //risk analysis: the riskvalue is 2/5 of total
            addedNumber = parseInt(total[i].innerText) * 2/10;
            riskValue = parseInt(total[i].innerText) * 2/5;
            // if riskvalue is higher than the max on the table
            if((Math.round(riskValue/10)*10) >= Math.max(...ontablefish)) {
                // ingame is defined by cpuBet passing the ontablefish array and addedNumber
                ingame[i].innerText = cpuBet(ontablefish, addedNumber);      
            } else {
                /* ingame is defined by riskyAnswer passing the max on the table and the random. 
                This function check if to risk to bet or not also beyond the riskvalue
                */
                ingame[i].innerText = riskyAnswer(Math.max(...ontablefish), random);

            }
            // if result between 4 and 6
        } else if(result[i] >= 4 && result[i] <= 6 ) {

            addedNumber = parseInt(total[i].innerText) * 4/10;
            riskValue = parseInt(total[i].innerText) * 3/5;
            if((Math.round(riskValue/10)*10) >= Math.max(...ontablefish)) {
                ingame[i].innerText = cpuBet(ontablefish, addedNumber);
            } else {

                ingame[i].innerText = riskyAnswer(Math.max(...ontablefish), random);
            }
            // if result > 7
        } else if(result[i] >= 7 ) {
            // go allin
            ingame[i].innerText = parseInt(total[i].innerText) + parseInt(ingame[i].innerText);
        }
        // if the total of the current player is <= than the max bet on the table
    } else {
        /* here my total fishes are below the max of the bets on the table.
        if result is between 1 and 3*/
        if(result[i] >= 1 && result[i] <= 3) {
            // set a random number
            random = Math.floor(Math.random() * 11);
            // if the random number is > 4 try to bet all your total (that is less than Math.max(ontable))
            if(random > 4) {
                ingame[i].innerText = parseInt(total[i].innerText) + parseInt(ingame[i].innerText);
            } 
       // if result is >= 4 try to bet all your total (that is less than Math.max(ontable))
        } else if(result[i] >= 4) {
            ingame[i].innerText = parseInt(total[i].innerText) + parseInt(ingame[i].innerText);
        }
    }
return ingame[i].innerText;
}   



function cpuBet(ontablefish, addedNumber) {
    // the ingame is = to the max of the current table bets + addedNumber
    return Math.max(...ontablefish) + Math.round(addedNumber / 10) * 10;
}

// blufforNot(randomNumber, Math.max(ontablefish), total)
function blufforNot(randomMove, betPrev, total) {
    // random number among 0 and 10
    randomMove =  Math.floor(Math.random() * 11);
    // based on randomnumber
    if(randomMove > 3) {
        let bluff;
        // bluff is equal the max of the card on the table + 1/10 of the total rouded to 10.
        bluff = parseInt(betPrev) + Math.round(parseInt(total * 1/10));
        return Math.round(bluff / 10) * 10;
    } else {
        return 10;
    }
}

function riskyAnswer(max, random) {
    
    random = Math.floor(Math.random() * 11);  
    // if random >2 bet the max also if the riskvalue analysis failed  
    if(random > 2) {
        return max;
    } else {
        return 10;
    }
}


function cpuSecondRound(difference, previous,ingame,total, ontablefish,result) {
        let riskValue;
    /*in the second round the players have already change their cards and they've to dedice to match another players
    higher bet or not*/
  
        if(result === 0) {
                ingame = Math.max(...ontablefish);
                difference = parseInt(ingame) - previous;
                total = parseInt(total) - difference; 
        } else if(result >= 1 && result <= 3 ) {
            riskValue = total * 2/5;
            if((Math.round(riskValue/10)*10) >= Math.max(...ontablefish)) {
                ingame = Math.max(...ontablefish);
                difference = parseInt(ingame) - previous;
                total = parseInt(total) - difference; 
            } else {
                ingame = previous;
                difference = 0;
                total = parseInt(total) - difference; 
            }
        } else if(result >= 4 && result <= 6 ) {
            riskValue = total * 3/5;
            if((Math.round(riskValue/10)*10) >= Math.max(...ontablefish)) {
                ingame = Math.max(...ontablefish);
                difference = parseInt(ingame) - previous;
                total = parseInt(total) - difference; 
            } else {
                ingame = previous;
                difference = 0;
                total = parseInt(total) - difference; 
            }
        } else if(result >= 7 ) {
            ingame = Math.max(...ontablefish);    
            difference = parseInt(ingame) - previous;
            total = parseInt(total) - difference;     
        }
        
        return ingame;
}


export {firstBet, cpuSecondRound};