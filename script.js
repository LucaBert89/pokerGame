function hand() {
    let rank = [];
    let suit = [];
  
    // separate rank from suit
        for(let i=0; i < 5; i++) {
            if(arguments[i].length >2) {
                rank.push(arguments[i].slice(0,2));
                suit.push(arguments[i].slice(2,3));
            } else {
                rank.push(arguments[i].slice(0,1));
                suit.push (arguments[i].slice(1,2));
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
            }

        // check right rank or suit
            if(!(suit[i] == "C" ||  suit[i] == "D" || suit[i] == "S" || suit[i] == "H" ) || !(rank[i] < 15 && rank[i] >0)) {
                console.log("invalid rank or suit card");
                return false;
            }
            
        }


 
        // sort the number inside the array
        rank.sort(function(a, b) {
            return a - b;
        });
    

        if(rank.every(e => e >= 9) && suit.every(e => e == suit[0])){
            console.log("Royal Flush");
        // Straight Flush: the cards are in order by rank. So the difference between the max and min should always be 4 if all the cards are different in rank
        } else if(Math.max.apply(Math, rank) - Math.min.apply(Math, rank) == 4) {
            if(suit.every(e => e == suit[0])){
                let result = [];
                for(i=0; i<rank.length; i++){
                    if(rank[i] == rank[i+1]) {
                        result.push("not different");
                    } 
                }  
                if(result.length < 1) {
                    console.log("Straight Flush");
                } else {
                    return false;
                } 
            } else {
                console.log("Straight");
            }
            
            
        // five card of same suit  
        } else if(suit.every(e => e == suit[0])) {
            console.log("Five cards of the same suit");
        }

        //Four cards of the same rank
        else if(rank.some(e=> e !== rank[0])) {
            for(let i=0; i<rank.length; i++) {
                if(rank.filter(e => e !== rank[i]).length == 1) {   
                    return console.log("four");;
                }
            }
            
        }
}


hand("2C", "3D", "4C", "5S","6C")

hand("8C", "8D", "8C", "8S","13C")
