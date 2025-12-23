const readline = require("readline-sync");
let playername = "";
playername = readline.question("Enter your name: ");
let inventory = []; // Initialize inventory array
let inventorySlots = 10; // Maximum inventory slots
let health = 100;
let strength = 10;
let gold = 0;
let level = 1;
let durabity = 10;
let luck = 1;
let currentLocation = "town"; // Track the player's current location
let visitedLocations = {}; // Track which locations have been visited

// Display location information and first-visit messages
const locations = {
  town: {
    name: "Town Square",
    description: "A bustling marketplace with shops and taverns.",
    firstVisit: "You arrive at the Town Square for the first time. People bustle about, and you notice a shop and blacksmith nearby."
  },
  blacksmith: {
    name: "Blacksmith's Forge",
    description: "A hot forge where armor and weapons are crafted.",
    firstVisit: "You step into the Blacksmith's Forge. The sound of hammers rings out as the blacksmith greets you."
  },
  tavern: {
    name: "The Wandering Tavern",
    description: "A warm and welcoming tavern where adventurers gather.",
    firstVisit: "You enter the tavern and are greeted by the smell of ale and hearty food. This place looks like a good spot to rest."
  }
};

function displayLocationInfo(locationKey) {
  if (locations[locationKey]) {
    const location = locations[locationKey];
    console.log("\n>>> " + location.name + " <<<");
    
    // Show first-visit message if this is the player's first time here
    if (!visitedLocations[locationKey]) {
      console.log(location.firstVisit);
      visitedLocations[locationKey] = true;
    } else {
      console.log(location.description);
    }
  }
}

// Create function to handle player movement between locations
function handlePlayerMovement() {
  console.log("\n=== Travel to Another Location ===");
  console.log("Available locations:");
  console.log("1. Town Square");
  console.log("2. Blacksmith's Forge");
  console.log("3. The Wandering Tavern");
  console.log("4. Stay here");
  
  let choice = readline.question("Where would you like to go? (1-4): ");
  
  switch (choice) {
    case "1":
      if (currentLocation !== "town") {
        currentLocation = "town";
        displayLocationInfo(currentLocation);
        console.log("You have arrived at the Town Square.");
      } else {
        console.log("You are already in the Town Square!");
      }
      break;
      
    case "2":
      if (currentLocation !== "blacksmith") {
        currentLocation = "blacksmith";
        displayLocationInfo(currentLocation);
        console.log("You have arrived at the Blacksmith's Forge.");
      } else {
        console.log("You are already at the Blacksmith's Forge!");
      }
      break;
      
    case "3":
      if (currentLocation !== "tavern") {
        currentLocation = "tavern";
        displayLocationInfo(currentLocation);
        console.log("You have arrived at The Wandering Tavern.");
      } else {
        console.log("You are already at The Wandering Tavern!");
      }
      break;
      
    case "4":
      console.log("You decide to stay where you are.");
      break;
      
    default:
      console.log("Invalid choice. You stay in your current location.");
  }
}
console.log("Welcome " + playername + " to the adventure game!");
console.log("============================================");
console.log("   WELCOME TO THE TEXT RPG GAME   ");
console.log("=============================================");
console.log(
  "hello from resad,Hi everyone i am here to learn js code this is fun"
);
function mystats(){
    console.log(
  "Player Stats: gold: " +
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
let sword1price = 50;
let sword2price = 100;
let sword3price = 150;
let monsterdefense = 5;
let monsterhealth = 50;
let monsterstrength = 10;
let armor1price = 50;
let armor2price = 100;
let armor3price = 150;
console.log(
  "Monster stats: health: " +
    monsterhealth +
    ", defense: " +
    monsterdefense +
    ", strength: " +
    monsterstrength
);

// Display initial location information on game start
displayLocationInfo(currentLocation);

// Define monster types
const monsterTypes = {
  1: { name: "Goblin", health: 50, defense: 5, strength: 10 },
  2: { name: "Orc", health: 100, defense: 10, strength: 15 },
  3: { name: "Troll", health: 150, defense: 15, strength: 20 },
  4: { name: "Dragon", health: 200, defense: 20, strength: 30 }
};

// Create function to handle monster battles
function handleMonsterBattle(monsterChoice) {
  const monsterType = monsterTypes[monsterChoice];
  
  if (!monsterType) {
    console.log("Invalid monster choice!");
    return;
  }
  
  let currentMonsterHealth = monsterType.health;
  let battleActive = true;
  
  console.log("\n=== Battle Start ===");
  console.log(`You encounter a ${monsterType.name}!`);
  console.log(`Monster Stats - Health: ${currentMonsterHealth}, Defense: ${monsterType.defense}, Strength: ${monsterType.strength}`);
  console.log(`Your Stats - Health: ${health}, Strength: ${strength}, Weapon Damage: ${weapondamage}\n`);
  
  while (battleActive && currentMonsterHealth > 0 && health > 0) {
    console.log("\n--- Round ---");
    const battleChoice = readline.question("1. Attack  2. Use Potion  3. Flee: ");
    
    switch (battleChoice) {
      case "1":
        // Player attacks
        const playerDamage = strength + weapondamage + Math.floor(Math.random() * 5);
        const damageDealt = Math.max(0, playerDamage - monsterType.defense);
        currentMonsterHealth -= damageDealt;
        console.log(`You dealt ${damageDealt} damage to the ${monsterType.name}!`);
        console.log(`${monsterType.name} health: ${Math.max(0, currentMonsterHealth)}`);
        
        if (currentMonsterHealth <= 0) {
          console.log(`\n*** ${monsterType.name} defeated! ***`);
          const goldReward = (monsterChoice * 10) + Math.floor(Math.random() * 10);
          gold += goldReward;
          level += 1;
          console.log(`You gained ${goldReward} gold and leveled up! Level: ${level}`);
          battleActive = false;
        } else {
          // Monster counterattack
          const monsterDamage = monsterType.strength - Math.floor(Math.random() * 3);
          health -= monsterDamage;
          console.log(`${monsterType.name} attacks! You take ${monsterDamage} damage.`);
          console.log(`Your health: ${health}`);
          
          if (health <= 0) {
            console.log("\n*** You were defeated! ***");
            health = 50; // Restore health after defeat
            battleActive = false;
          }
        }
        break;
        
      case "2":
        // Use potion
        useHealthPotion();
        // Monster still attacks
        const monsterDmg = monsterType.strength - Math.floor(Math.random() * 3);
        health -= monsterDmg;
        console.log(`${monsterType.name} attacks! You take ${monsterDmg} damage.`);
        console.log(`Your health: ${health}`);
        
        if (health <= 0) {
          console.log("\n*** You were defeated! ***");
          health = 50;
          battleActive = false;
        }
        break;
        
      case "3":
        // Flee battle
        const fleeChance = Math.random();
        if (fleeChance > 0.5) {
          console.log(`You successfully fled from the ${monsterType.name}!`);
          battleActive = false;
        } else {
          console.log(`Failed to flee! The ${monsterType.name} attacks!`);
          const fleeMonsterDmg = monsterType.strength;
          health -= fleeMonsterDmg;
          console.log(`You take ${fleeMonsterDmg} damage!`);
          console.log(`Your health: ${health}`);
          
          if (health <= 0) {
            console.log("\n*** You were defeated! ***");
            health = 50;
            battleActive = false;
          }
        }
        break;
        
      default:
        console.log("Invalid choice!");
    }
  }
}

let healthpotionvalue = 20;
function useHealthPotion() {
  if (inventory.includes("health potion")) {
    health += healthpotionvalue;
    if (health > 100) health = 100; // Max health
    console.log("You used a health potion! Health restored to " + health);
    inventory.splice(inventory.indexOf("health potion"), 1); // Remove from inventory
  } else {
    console.log("You don't have a health potion!");
  }
}

// Create for loop to check inventory slots
function showInventory() {
  console.log("\n=== Inventory ===");
  if (inventory.length === 0) {
    console.log("Your inventory is empty!");
  } else {
    console.log("Items in inventory:");
    for (let i = 0; i < inventory.length; i++) {
      console.log((i + 1) + ". " + inventory[i]);
    }
  }
  console.log("Slots used: " + inventory.length + " / " + inventorySlots);
}

// Check if inventory has space
function hasInventorySpace() {
  return inventory.length < inventorySlots;
}

// Add item to inventory
function addToInventory(item) {
  if (hasInventorySpace()) {
    inventory.push(item);
    console.log(item + " added to inventory!");
    return true;
  } else {
    console.log("Your inventory is full! Cannot carry more items.");
    return false;
  }
}

function showMenu() {
  console.log("\n=== Main Menu ===");
  console.log("1. Attack Monster");
  console.log("2. Use Health Potion");
  console.log("3. Shop");
  console.log("4. Travel");
  console.log("5. Show Stats");
  console.log("6. Show Inventory");
  console.log("7. Quit");
}
function shop() {
  console.log("\n=== Shop ===");
  console.log("1. Buy Sword 1 (50 gold) - Damage +5");
  console.log("2. Buy Sword 2 (100 gold) - Damage +10");
  console.log("3. Buy Sword 3 (150 gold) - Damage +15");
  console.log("4. Buy Health Potion (20 gold)");
  console.log("5. Back to Menu");
  let choice = readline.question("Choose an option: ");
  switch (choice) {
    case "1":
      if (gold >= 50) {
        gold -= 50;
        weapondamage += 5;
        addToInventory("Sword 1");
        console.log("Weapon damage: " + weapondamage);
      } else {
        console.log("Not enough gold!");
      }
      break;
    case "2":
      if (gold >= 100) {
        gold -= 100;
        weapondamage += 10;
        addToInventory("Sword 2");
        console.log("Weapon damage: " + weapondamage);
      } else {
        console.log("Not enough gold!");
      }
      break;
    case "3":
      if (gold >= 150) {
        gold -= 150;
        weapondamage += 15;
        addToInventory("Sword 3");
        console.log("Weapon damage: " + weapondamage);
      } else {
        console.log("Not enough gold!");
      }
      break;
    case "4":
      if (gold >= 20) {
        gold -= 20;
        addToInventory("health potion");
      } else {
        console.log("Not enough gold! Health potion costs 20 gold.");
      }
      break;
    case "5":
      console.log("Leaving the shop.");
      break;
    default:
      console.log("Invalid choice.");
  }
}
function handleTownMovement() {
  console.log("\nFrom the town square, where do you want to go?");
  console.log("1. Go to Shop");
  console.log("2. Go to Blacksmith");
  console.log("3. Stay in Town");
  let choice = readline.question("Choose an option: ");
  switch (choice) {
    case "1":
      currentLocation = "shop";
      displayLocationInfo(currentLocation);
      shop(); // Call shop function
      break;
    case "2":
      currentLocation = "blacksmith";
      displayLocationInfo(currentLocation);
      // Blacksmith logic here
      break;
    case "3":
      console.log("You stay in the town square.");
      break;
    default:
      console.log("Invalid choice.");
  }
}
function travel() {
  handlePlayerMovement();
}
let gameRunning = true;
while (gameRunning) {
  showMenu();
  let choice = readline.question("Choose an option: ");
  switch (choice) {
    case "1":
      let monsterChoice = readline.question("Which monster? (1-Goblin, 2-Orc, 3-Troll, 4-Dragon): ");
      handleMonsterBattle(parseInt(monsterChoice));
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
      showInventory();
      break;
    case "7":
      console.log("Thanks for playing!");
      gameRunning = false;
      break;
    default:
      console.log("Invalid choice. Please try again.");
  }
}