/*
Explicit rules: 
- When  a players deck exceeds 21 points they loose ('bust')
- The game always only has 2 people, a dealer and a player
- At the start of a round, both dealer and player get dealt 2 cards
- The player can see their 2 cards and one of the cards of the dealer
- Card values: 
  - number cards have their face value
  - jack, queen and king are worth 10 points
  - ace > is worth 11 points if the current value of the hand doesn't exceed 21
  otherwise it's worth 1 point. 
  - If there a second ace is drawn, one of the aces takes the value of 1 if the current
  hand exceeds the value of 21
- Players turn: Each round the player chooses to 'hit' or 'stay' With a hit
the player will be dealt another card.
- Dealers turn: The dealer hits must hit until their total is at least 17
  - If the dealer busts, the player wins
- Cards are compared when both the dealer and the player stay

Implicit rules: 
- At each turn, the player see

Questions: 
- Does the player only see the dealers card at the beginning of a round? 
- Is the card the player sees determined at random? 
- Can the dealer continue to hit after their cards reached 17? 

Data structure: 
  - Deck: nested array

Algorithm: 

1. Initialize deck
2. Deal cards to player and dealer
3. Player turn: hit or stay
   - repeat until bust or stay
4. If player bust, dealer wins.
5. Dealer turn: hit or stay
   - repeat until total >= 17
6. If dealer busts, player wins.
7. Compare cards and declare winner.


*/
const readline = require("readline-sync");

let player;
let dealer;
let deck;

function prompt (message) {
  console.log(`=> ${message}`);
}

function initializeDeck() {
  let suits = ['Spades', 'Diamonds', 'Clubs', 'Heart'];
  let values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
  let deck = [];
  suits.forEach(suit => {
    values.forEach(value => {
      deck.push([suit, value]);
    }
    )
  }
  )
  return deck;
}

function assignInitialCards (deck) {
  let cards = [];
  for(idx = 0; idx < 2; idx ++) {
    let randomIndex = Math.floor(Math.random() * deck.length);
    cards.push(deck[randomIndex])
    deck.splice(deck[randomIndex], 1);
  }
  return cards
}

function hit(deck) {
  let randomIndex = Math.floor(Math.random() * deck.length);
  let card = deck[randomIndex];
  deck.splice(randomIndex, 1);
  return card; 
}

function busted (cards) {
   return calculateTotal(cards) > 21 
}

function playersTurn () {
  while(true) {
  prompt('Do you want to hit or stay?');
  let answer = readline.question();
 
  if (answer === "hit") {
    player.push(hit(deck));
    console.log(player);
    prompt(`Your current hand is ${player.join(" ")}.`)
  }

    if (busted(player)) {
    break;
    }

    if (answer === "stay") {
      prompt('You decided to stay!')
        break;
      }
  }
}
 function dealersTurn () {
  while(calculateTotal(dealer) < 17) {
   dealer.push(hit(deck));
   console.log(dealer);
  }
 }

function calculateTotal(cards) {

  let values = cards.map(card => card[1]);

  let sum = 0;
  values.forEach(value => {
    if (value === "A") {
      sum += 11;
    } else if (['J', 'Q', 'K'].includes(value)) {
      sum += 10;
    } else {
      sum += Number(value);
    }
  });

  values.filter(value => value === "A").forEach(_ => {
    if (sum > 21) sum -= 10;
  });

  return sum;
}

function declareWinner () {
  let playersTotal = calculateTotal(player);
  console.log(playersTotal);
  let dealersTotal = calculateTotal(dealer);
  console.log(dealersTotal);

  if(playersTotal > dealersTotal) {
    prompt(`You have ${playersTotal} points. The dealer has ${dealersTotal} points. You won!`);
  } else if(playersTotal < dealersTotal) {
    prompt(`You have ${playersTotal} points. The dealer has ${dealersTotal} points. You lost!`);
  } else {
    prompt(`You both have ${playersTotal} points. It's a tie!`);
  }
}

while(true) {

  prompt('Welcome to twenty-one. Let us play!')
  deck = initializeDeck();
  player = assignInitialCards(deck);
  console.log(player);
  prompt(`Your current hand is ${player.join(" ")}`)
  dealer = assignInitialCards(deck);
  console.log(dealer);
  prompt(`The dealers card is ${dealer[0].join(" ")}`);

while(true){
  playersTurn();
  if(busted(player)) {
    prompt('You got busted and lost!')
    break;
  }

  dealersTurn();
  if(busted(dealer)) {
    prompt('The dealer got busted and you won!')
    break;
  }

  declareWinner();
  break;
}

prompt('Do you want to play again? Hit n to exit the game.')
let answer = readline.question().toLowerCase();
if(answer === "n") break;
}


