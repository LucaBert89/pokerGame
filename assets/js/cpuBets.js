function firstBet(total, ingame, ontablefish, result, random) {
    let riskValue;
    let addedNumber;
    if(total >= Math.max(...ontablefish)) {
        if(result === 0) {
            console.log("result = 0");
            ingame = blufforNot(random, Math.max(...ontablefish), total);
        } else if(result >= 1 && result <= 3 ) {
            console.log("result = 1 a 3");
            addedNumber = parseInt(total) * 2/10;
            riskValue = parseInt(total) * 2/5;
            console.log(addedNumber);
            if((Math.round(riskValue/10)*10) >= Math.max(...ontablefish)) {
                ingame = cpuBet(ontablefish, addedNumber);      
            } else {
                ingame = riskyAnswer(ontablefish, random);
            }
        } else if(result >= 4 && result <= 6 ) {
            console.log("result = 4 a 6");
            addedNumber = parseInt(total) * 4/10;
            riskValue = total * 3/5;
            if((Math.round(riskValue/10)*10) >= Math.max(...ontablefish)) {
                ingame= cpuBet(ontablefish, addedNumber);
            } else {
                console.log("non scommetto sono tra 4 e 6");
                ingame = riskyAnswer(ontablefish, random);
            }
        } else if(result >= 7 ) {
            console.log("result = + di 7");
            ingame = allIn(ingame, total);
        }
    } else {
        if(result >= 1 && result <= 3) {
            if(randomNumber > 5) {
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

function riskyAnswer(ontablefish, randomNumber) {
    randomNumber = Math.floor(Math.random() * 11);
    if(randomNumber > 5) {
        if(total -Math.max(...ontablefish) > 0) return Math.max(...ontablefish);
    } else {
        return 10;
    }
}

export {firstBet};