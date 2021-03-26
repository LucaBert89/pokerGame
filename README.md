# pokerGame


DEPLOY LINK: https://classicpokergame.netlify.app/

**WORK IN PROGRESS** - 

## DESCRIPTION

This is a Javascript space poker game! It's a classic poker game, not texas holden, where the user can play with a max of others 4 players.

## RULES OF THE GAME AND HOW IT WORKS

You choose the number of players and points in the first Start board. After you click on play than **your card'll be displayed** and you can press the **"OPEN"** button. 
This button is to **open the game**, you can do that if there's at least one player with some points (a pair, two pair etc) in his hand. If no one have point than other cards'll be dealt until someone have points. The **"cost" to play is 10 fishes** that every player has to pay.

After the game is opened you've **5 seconds to change your cards** (only one per card) clicking on the card you want to change. Than you can **choose to bet** selecting how much fishes. Once you bet the **other players'll change their cards** or **bet based on a riskAnalysis** algorithm and on the points in their hand. They can choose to bet even if they don't have points in their hand, **trying to bluff** based on **random number**. Or they can try to bet despite the riskAnalysis said that they shouldn't do that.

After the first round of bet you can choose if **stay (match the maxBet)** or **leave (no match and lose the fishes you've already bet)** or **show** if you're the only one who bet or you didn't bet in the first round of bet.

To find the winner only the scores of the player that match the max on table'll count. If someone has the highest score than he'll get all the fishes on the tabel. If there are more than 1 player that bet the max and has the same score than the player that has the higher sum of the cards'll win. If the sum is equal than a coin'll be flipped..
If the cpuPlayer doesn't have enough fishes'll **lose the game** after the open button is press in the next turn. He doesn't have the 10 fishes cost, so he'll lose. The same can happen to you!

## TECHNOLOGY

To realize this game I used **HTML,CSS and JAVASCRIPT**. I used **mocha and chai** for testing some functions inside the game and **babel** to use ES6 with mocha. I used **trello** to create the tasks and **toggle** to time my activity. 

The list of hands in ranking order are as follows:

Royal Flush	🃁🃎🃍🃋🃊	Ten to Ace of the same suit

Straight Flush	🃛🃚🃙🃘🃗	Five consecutive cards of the same suit

Four of a Kind	🃕🃅🂵🂥🃂	Four cards of the same rank

Full House	🂦🂶🃆🃞🂾	Three of a Kind combined with a Pair

Flush	🃋🃉🃈🃄🃃	Five cards of the same suit

Straight	🃊🂩🂸🃇🃖	Five consecutive cards

Three of a Kind	🃝🂭🂽🂹🂢	Three cards of the same rank

Two Pair	🂻🂫🃓🂣🂲	Two separate pairs

Pair	🂪🂺🂨🂷🃔	Two cards of the same rank

High Card	🃎🃍🂧🂤🂳	No other hand applies


