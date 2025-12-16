const readline = require("readline-sync");
let playername = "";
playername = readline.question("Enter your name: ");
let inventory = [];
let health = 100;
let strength = 10;
let gold = 0;
let level = 1;
let durabity = 10;
let luck = 1;
let currentLocation = "town"; // Track the player's current location
console.log("Welcome " + playername + " to the adventure game!");
console.log("============================================");
console.log("   WELCOME TO THE TEXT RPG GAME   ");
console.log("=============================================");
console.log(
  "hello from resad,Hi everyone i am here to learn js code this is fun"
);
mystats(); // Display initial player stats
function mystats(){
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
    luck +
    ", location: " +
    currentLocation
);}
let weapon = 0;
let armor = 0;
let weapondamage = 0;
console.log("Your current weapon damage is: " + weapondamage);
console.log("When you buy a sword, your weapon damage will increase.");
// Create variable to track weapon damage
let sword1price = 50;
let sword2price = 100;
let sword3price = 150;
console.log("Sword 1 price: " + sword1price);
let monsterdefense = 5;
let monsterhealth = 50;
let monsterstrength = 10;
console.log(
  "Monster stats: health: " +
    monsterhealth +
    ", defense: " +
    monsterdefense +
    ", strength: " +
    monsterstrength
);
// Check if player is in tavern and display appropriate message
if (currentLocation === "tavern") {
    console.log("You are in the tavern. You can rest here to recover health.");
} else {
    console.log("You are in the " + currentLocation + ".");
} 

function attackMonster() {
  let playerAttack = strength + weapondamage;
  let damageDealt = Math.max(0, playerAttack - monsterdefense);
  monsterhealth -= damageDealt;
  console.log("You dealt " + damageDealt + " damage to the monster!");
  console.log("Monster health: " + monsterhealth);
  if (monsterhealth <= 0) {
    console.log("Monster defeated!");
    gold += 10;
    console.log("You gained 10 gold. Total gold: " + gold);
  } else {
    // Monster counterattack
    let monsterAttack = monsterstrength;
    health -= monsterAttack;
    console.log("Monster attacks back! You take " + monsterAttack + " damage.");
    console.log("Your health: " + health);
    if (health <= 0) {
      console.log("You died!");
    }
  }
}
let healthpotionvalue = 20;
function useHealthPotion() {
  health += healthpotionvalue;
  if (health > 100) health = 100; // Max health
  console.log("You used a health potion! Health restored to " + health);
}
function showMenu() {
  console.log("\n=== Main Menu ===");
  console.log("1. Attack Monster");
  console.log("2. Use Health Potion");
  console.log("3. Shop");
  console.log("4. Travel");
  console.log("5. Quit");
}
function shop() {
  console.log("\n=== Shop ===");
  console.log("1. Buy Sword 1 (50 gold) - Damage +5");
  console.log("2. Buy Sword 2 (100 gold) - Damage +10");
  console.log("3. Buy Sword 3 (150 gold) - Damage +15");
  console.log("4. Back to Menu");
  let choice = readline.question("Choose an option: ");
  switch (choice) {
    case "1":
      if (gold >= 50) {
        gold -= 50;
        weapondamage += 5;
        console.log("You bought Sword 1! Weapon damage: " + weapondamage);
      } else {
        console.log("Not enough gold!");
      }
      break;
    case "2":
      if (gold >= 100) {
        gold -= 100;
        weapondamage += 10;
        console.log("You bought Sword 2! Weapon damage: " + weapondamage);
      } else {
        console.log("Not enough gold!");
      }
      break;
    case "3":
      if (gold >= 150) {
        gold -= 150;
        weapondamage += 15;
        console.log("You bought Sword 3! Weapon damage: " + weapondamage);
      } else {
        console.log("Not enough gold!");
      }
      break;
    case "4":
      break;
    default:
      console.log("Invalid choice.");
  }
}
function travel() {
  console.log("\n=== Travel ===");
  console.log("1. Go to Town");
  console.log("2. Go to Tavern");
  console.log("3. Go to Forest");
  console.log("4. Back to Menu");
  let choice = readline.question("Choose a location: ");
  switch (choice) {
    case "1":
      currentLocation = "town";
      console.log("You traveled to the town.");
      break;
    case "2":
      currentLocation = "tavern";
      console.log("You traveled to the tavern.");
      break;
    case "3":
      currentLocation = "forest";
      console.log("You traveled to the forest.");
      break;
    case "4":
      break;
    default:
      console.log("Invalid choice.");
  }
}
let gameRunning = true;
while (gameRunning) {
  showMenu();
  let choice = readline.question("Choose an option: ");
  switch (choice) {
    case "1":
      let monsterChoice = readline.question("which monster? 1 or 2 or 3 or 4 ");
      if (monsterChoice === "1") {
        monsterhealth = 50;
        monsterdefense = 5;
        monsterstrength = 10;
      } else if (monsterChoice === "2") {
        monsterhealth = 100;
        monsterdefense = 10;
        monsterstrength = 15;
      } else if (monsterChoice === "3") {
        monsterhealth = 150;
        monsterdefense = 15;
        monsterstrength = 20;
      } else if (monsterChoice === "4") {
        monsterhealth = 200;
        monsterdefense = 20;
        monsterstrength = 30;
      }
      attackMonster();
      break;
    case "2":
      useHealthPotion();
      break;
    case "3":
      shop();
      break;
    case "4":
      travel();
      break;
    case "5":
      mystats();
      break;
    case "6":
      console.log("Thanks for playing!");
      gameRunning = false;
      break;
    default:
      console.log("Invalid choice. Please try again.");
  }
}