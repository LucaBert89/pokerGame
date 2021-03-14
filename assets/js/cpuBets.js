function firstBet(total, ingame, ontablefish, result, random) {
    let riskValue;
    let addedNumber;
    if(total >= Math.max(...ontablefish)) {
        if(result === 0) {
            
            ingame = blufforNot(random, Math.max(...ontablefish), total);
        } else if(result >= 1 && result <= 3 ) {
           
            addedNumber = parseInt(total) * 2/10;
            riskValue = parseInt(total) * 2/5;
            
            if((Math.round(riskValue/10)*10) >= Math.max(...ontablefish)) {
                ingame = cpuBet(ontablefish, addedNumber);      
            } else {
                ingame = riskyAnswer(ontablefish, random);
            }
        } else if(result >= 4 && result <= 6 ) {
          
            addedNumber = parseInt(total) * 4/10;
            riskValue = total * 3/5;
            if((Math.round(riskValue/10)*10) >= Math.max(...ontablefish)) {
                ingame= cpuBet(ontablefish, addedNumber);
            } else {
              
                ingame = riskyAnswer(ontablefish, random, total);
            }
        } else if(result >= 7 ) {
            
            ingame = allIn(ingame, total);
        }
    } else {
        if(result >= 1 && result <= 3) {
            if(random > 5) {
                ingame = allIn(ingame, total);
            }
        } else if(result >= 4 && result <= 6 || result >= 7) {
            ingame = allIn(ingame, total);
        }
    }
return ingame;
}   

function allIn(ingame, total) {
    return parseInt(total) + parseInt(ingame);
}

function cpuBet(ontablefish, addedNumber) {
    
    return Math.max(...ontablefish) + Math.round(addedNumber / 10) * 10;
}

function blufforNot(randomMove, betPrev, total) {
    randomMove =  Math.floor(Math.random() * 11);
    if(randomMove > 5) {
        let bluff;
        bluff = parseInt(betPrev) + Math.round(parseInt(total) * 1/10);
        return Math.round(bluff / 10) * 10;
    } else {
        return 10;
    }
}

function riskyAnswer(ontablefish, random) {
  
    random = Math.floor(Math.random() * 11);    
    if(random > 5) {
        return Math.max(...ontablefish);
    } else {
        return 10;
    }
}


function cpuSecondRound(difference, previous,ingame,total, ontablefish,result) {
        let riskValue;
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