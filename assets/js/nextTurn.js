
    import {cardGenerator, btnOpen, modalMessage, initialNumber, selectNofPlayers, selectNofPoints, modalStart} from "./index.js"

    function nextPlaying(nextTurn,btnStay, btnLeave, playerNumbers, points, btnPlay, result, ingame, total, rank, suit) {
        const modalEndGame = document.querySelector(".modal-end");
        const btnPlayAgain = document.querySelector(".modal-gameover__start-again");

        nextTurn.addEventListener("click",next)
         // next turn button is clicked
        function next() {
            nextTurn.removeEventListener("click",next)
            // remove the total animation and the background around ingamefiche
            total.forEach(e => e.classList.remove("total-animation"));
            ingame.forEach(e => e.style.backgroundColor = "");
           
            
            nextTurn.style.display = "none";
           
            ingame = document.querySelectorAll(".in-game-fiche");
            total = document.querySelectorAll(".total-fiches");
            ingame.forEach(e => e.textContent = "");
            /*I call this function to check if the players've enough fichees to open the game */
            loseOrOpen(total, result);

                // if there aren't a modalMessage, the active player hasn't lose and you can go ahead into the game
            if(modalMessage.textContent === "") {
                // if there aren't cpu Players anymore the active player 'll win the game and the message'll appear
                if(document.querySelector(".cpu-container").querySelectorAll(".cpu").length === 0) {
                    gameOver();
                    modalMessage.textContent = "You Win, the planet is saved!";
                } else {
                // if there are cpu Players:
                        // empty all the arrays
                    rank = [];
                    suit = [];
                    result = [];
                    // remove the images and add the card-cover
                    document.querySelectorAll(".cpu").forEach(function(e) {
                        e.querySelectorAll(".player__card").forEach(function(e) {
                            e.classList.add("card-cover");
                            e.style.backgroundImage = ``;
                            e.innerHTML = "";
                        })
                    })
                    // generate the cards again
                    cardGenerator();
        
                    
                    btnPlay.style.display = "none";
                    btnStay.style.display = "none";
                    btnLeave.style.display = "none";
                    setTimeout(function(){ 
                        btnOpen.style.display = "inline-block";
                    }, 4000);    
    
                }
            }
        
        }

        function gameOver() {
            // game is over: you win or lose
            document.querySelector(".players-table").innerHTML = "";
            modalEndGame.style.display = "block";
                
            //click on play again to get back to the start board
            btnPlayAgain.addEventListener("click", function() {
                selectNofPlayers.selectedIndex = 0;
                selectNofPoints.selectedIndex = 0;
                modalMessage.textContent = "";
                modalEndGame.style.display = "none";
                modalStart.style.display = "block";
            })
        }

        function loseOrOpen(total, result) {
            let current;
            let j = 0;
            for(let i=0; i<initialNumber; i++) {
                current = document.querySelector(`.player${i}`);
                if(current !== null && total[j] !== undefined) {
                    if(total[j].innerText == 0) { 
                    // if they've enough fichees than the players pays 10 fichees to enter the game
                    // if the cpuPlayers doesn't even enough fichees they'll be deleted from the game
                        if(i>0 && modalMessage.textContent === "") {
                                current.remove();
                                delete result[i];
                        } else  {
                        // if the active player doesn't have enough fichees to open the game the messagge'll be shown and you can play again
                                gameOver();
                                modalMessage.textContent = "You lose, the planet is fucked!";
                        }
                    }
                } else {
                    /* i've to do that because after 1 player is removed, the total Node has less elements than the i counter
                    loop. Current instead keep the same number (player1, 2,3 ecc) after one element is removed
                    */
                    j=j-1;
                }
                    j++;
            }
        }

    }

    export {nextPlaying};