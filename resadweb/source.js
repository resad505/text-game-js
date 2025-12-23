console.log("hello from resad,Hi everyone i am here to learn js code this is fun");
const readline = require('readline-sync');
let playername= "";
//get player name using readline sync
playername= readline.question("Enter your name: ");
console.log("Welcome " + playername + " to the adventure game!");
let inverntory=[];
// Create variables for player stats
let health = 100;
let strength = 10;
let gold = 0;