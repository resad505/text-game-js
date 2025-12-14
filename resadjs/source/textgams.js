const readline = require("readline-sync");
let playername = "";
playername = readline.question("Enter your name: ");
let inventory = [];
// Create variables for player stats
let health = 100;
let strength = 10;
let gold = 0;
let level = 1;
let durabity = 10;
let luck = 1;

console.log("Welcome " + playername + " to the adventure game!");
//create a welcome message for the player
console.log("============================================");
console.log("   WELCOME TO THE TEXT RPG GAME   ");
console.log("=============================================");
console.log(
  "hello from resad,Hi everyone i am here to learn js code this is fun"
);
// Display initial player stats
console.log(
  "Player Stats:" +
    gold +
    ", health: " +
    health +
    ", strength: " +
    strength +
    ", level: " +
    level +
    ",durability:" +
    durabity +
    ", luck:" +
    luck
);
let weapon=0;
let armor=0;
let help='';
help=readline.question("Do you need help?");
if(help==='yes'){console.log(
  "player stats:" +"gold: " +
    gold +
    ", health: " +health +
    ", strength: " +
    strength +",durability:" +
    durabity +
    ", luck:" +
    luck
);}else{console.log("Good luck on your adventure!");}
let weapondamage=0;
console.log("Your current weapon damage is: " + weapondamage);
console.log("When you buy a sword, your weapon damage will increase.");