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
       
        //Royal Flush
        if(suit.every(e => e == suit[0])){
            if(rank.every(e => e >= 9)) {
                console.log("Royal Flush");
            } else {
        // Flush
                console.log("Flush");
            }
            
        // Straight Flush: the cards are in order by rank. So the difference between the max and min should always be 4 if all the cards are different in rank
        } else if(Math.max.apply(Math, rank) - Math.min.apply(Math, rank) == 4) {
            if(suit.every(e => e == suit[0]) && rank.filter(e=>e !== rank[0])){
                console.log("Straight flush");
            } else if (rank.filter(e=>e !== rank[0])) {
                console.log("Straight");
            } 
                /*
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

        // Straight correggereeeee
            } else {
                for(i=0; i<rank.length; i++){
                    if(rank[i] == rank[i+1]) {
                        console.log("Straight");
                    } 
                }  
              
            }
            */
            
        // five card of same suit  
        } else if(suit.every(e => e == suit[0])) {
            console.log("Five cards of the same suit");
        }
        
       else if(rank.filter(e => e !== rank[0]).length == 3) {
        let newArray = rank.filter(e => e !== rank[0]);
    // two pair
     if(newArray.filter(e => e !== newArray[0]).length == 1) {
             console.log("two pair");
    // pair
         } else if(newArray.filter(e => e !== newArray[0]).length == 2) {
             console.log("pair")
    // three and pair
         } else if(newArray.filter(e => e !== newArray[0]).length == 0) {
             console.log("three and pair")
         }
      
     } else if(rank.filter(e => e !== rank[0]).length == 2) {
          let newArray = rank.filter(e => e !== rank[0]);
         if(newArray.filter(e => e !== newArray[0]).length == 1) {
    // three
             console.log("three");
         } else if(newArray.filter(e => e !== newArray[0]).length == 0) {
    // three and pair
             console.log("three and pair")
         }
    //Four cards of the same rank
     } else if(rank.filter(e => e !== rank[0]).length == 1 || rank.filter(e => e == rank[0]).length == 4) {
         console.log("four");
     }
     
     
}


hand("9C", "JC", "QC", "KC","AC")

hand("7C", "8C", "9C", "JC","QC")

hand("1C", "1D", "1C", "2S","2C")

hand("2C", "1D", "1C", "1S","1C")
