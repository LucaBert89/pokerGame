function firstBet(total, ingame, ontablefish, result, random, i) {
    let riskValue;
    let addedNumber;

    if(total[i].innerText >= Math.max(...ontablefish)) {
        if(result === 0) {
            
            ingame[i].innerText = blufforNot(random, Math.max(...ontablefish), total);

        } else if(result[i] >= 1 && result[i] <= 3 ) {
 
            addedNumber = parseInt(total[i].innerText) * 2/10;
            riskValue = parseInt(total[i].innerText) * 2/5;
            
            if((Math.round(riskValue/10)*10) >= Math.max(...ontablefish)) {
  
                ingame[i].innerText = cpuBet(ontablefish, addedNumber);      
            } else {
                console.log(total[i].innerText)
                ingame[i].innerText = riskyAnswer(Math.max(...ontablefish), random);
                console.log(ingame[i].innerText);
            }
        } else if(result[i] >= 4 && result[i] <= 6 ) {

            addedNumber = parseInt(total[i].innerText) * 4/10;
            riskValue = parseInt(total[i].innerText) * 3/5;
            if((Math.round(riskValue/10)*10) >= Math.max(...ontablefish)) {
                ingame[i].innerText = cpuBet(ontablefish, addedNumber);
            } else {
                console.log(total[i].innerText)
                ingame[i].innerText = riskyAnswer(Math.max(...ontablefish), random);
            }
        } else if(result[i] >= 7 ) {
            ingame[i].innerText = parseInt(total[i].innerText) + parseInt(ingame[i].innerText);
        }
    } else {
        if(result[i] >= 1 && result[i] <= 3) {

            random = Math.floor(Math.random() * 11);
            console.log(random);
            if(random > 1) {
                ingame[i].innerText = parseInt(total[i].innerText) + parseInt(ingame[i].innerText);

            }
        } else if(result[i] >= 4 && result[i] <= 6 || result[i] >= 7) {
            ingame[i].innerText = parseInt(total[i].innerText) + parseInt(ingame[i].innerText);
 
        }
    }
console.log(total[i]);
return ingame[i].innerText;
}   



function cpuBet(ontablefish, addedNumber) {
    return Math.max(...ontablefish) + Math.round(addedNumber / 10) * 10;
}

function blufforNot(randomMove, betPrev, total) {
    randomMove =  Math.floor(Math.random() * 11);

    if(randomMove > 1) {
        let bluff;
        bluff = parseInt(betPrev) + Math.round(parseInt(total * 1/10));
        return Math.round(bluff / 10) * 10;
    } else {
        return 10;
    }
}

function riskyAnswer(max, random) {
    
    random = Math.floor(Math.random() * 11);    
    console.log(random)
    if(random > 1) {
        return max;
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