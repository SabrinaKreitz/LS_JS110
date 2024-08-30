
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


