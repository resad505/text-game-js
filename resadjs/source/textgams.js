const readline = require("readline-sync");

// ============================================
// PLAYER INITIALIZATION
// ============================================
let playername = readline.question("Enter your name: ");

// ============================================
// GAME CONSTANTS
// ============================================
const MAX_HEALTH = 100;
const MIN_HEALTH = 0;
const DEFEATED_RESTORE_HEALTH = 50;
const INVENTORY_SLOTS = 10;
const MAX_STRENGTH = 50;
const MAX_LUCK = 20;

// Potion values
const HEALTH_POTION_VALUE = 20;
const STRENGTH_POTION_VALUE = 5;
const LUCK_POTION_VALUE = 3;

// Shop prices
const SWORD_1_PRICE = 50;
const SWORD_2_PRICE = 100;
const SWORD_3_PRICE = 150;
const HEALTH_POTION_PRICE = 20;

// Sword damage
const SWORD_1_DAMAGE = 5;
const SWORD_2_DAMAGE = 10;
const SWORD_3_DAMAGE = 15;

// ============================================
// PLAYER STATS
// ============================================
let health = MAX_HEALTH;
let strength = 10;
let gold = 0;
let level = 1;
let durability = 10;
let luck = 1;
let weapondamage = 0;
let armor = 0;

// ============================================
// INVENTORY & LOCATION
// ============================================
let inventory = [];
let currentLocation = "town";
let visitedLocations = {};

// ============================================
// LOCATION DEFINITIONS
// ============================================
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

// ============================================
// MONSTER DEFINITIONS
// ============================================
const monsterTypes = {
  1: { name: "Goblin", health: 50, defense: 5, strength: 10 },
  2: { name: "Orc", health: 100, defense: 10, strength: 15 },
  3: { name: "Troll", health: 150, defense: 15, strength: 20 },
  4: { name: "Dragon", health: 200, defense: 20, strength: 30 }
};

// ============================================
// ITEM DEFINITIONS & EFFECTS
// ============================================
const itemEffects = {
  "health potion": { stat: "health", value: HEALTH_POTION_VALUE, maxStat: MAX_HEALTH },
  "strength potion": { stat: "strength", value: STRENGTH_POTION_VALUE, maxStat: MAX_STRENGTH },
  "luck potion": { stat: "luck", value: LUCK_POTION_VALUE, maxStat: MAX_LUCK }
};

// ============================================
// DISPLAY & UTILITY FUNCTIONS
// ============================================

/**
 * Displays the welcome message and introduction to the game
 * Shows game title and welcome greeting for the player
 */
function displayWelcomeMessage() {
  console.log("\n==============================================");
  console.log("   WELCOME TO THE TEXT RPG GAME   ");
  console.log("==============================================");
  console.log(`Welcome ${playername} to the adventure game!`);
  console.log("hello from resad, Hi everyone i am here to learn js code this is fun");
  console.log("==============================================\n");
}

/**
 * Displays location information and tracks first-time visits
 * @param {string} locationKey - The key of the location to display
 */
function displayLocationInfo(locationKey) {
  if (locations[locationKey]) {
    const location = locations[locationKey];
    console.log("\n>>> " + location.name + " <<<");
    
    if (!visitedLocations[locationKey]) {
      console.log(location.firstVisit);
      visitedLocations[locationKey] = true;
    } else {
      console.log(location.description);
    }
  }
}

/**
 * Calculates and returns current health status with visual indicators
 * @returns {Object} Health status object with health, maxHealth, percent, status, and healthBar
 */
function getHealthStatus() {
  const percent = (health / MAX_HEALTH) * 100;
  let status = "";
  
  if (percent === 100) {
    status = "Perfect ✓";
  } else if (percent >= 75) {
    status = "Good";
  } else if (percent >= 50) {
    status = "Fair";
  } else if (percent >= 25) {
    status = "Low ⚠";
  } else {
    status = "Critical ✗";
  }
  
  return {
    health: health,
    maxHealth: MAX_HEALTH,
    percent: percent.toFixed(1),
    status: status,
    healthBar: `[${"|".repeat(Math.floor(percent / 10))}${" ".repeat(10 - Math.floor(percent / 10))}]`
  };
}

/**
 * Displays a visual health bar with current health status
 */
function displayHealthBar() {
  const healthInfo = getHealthStatus();
  console.log(`\nHealth: ${healthInfo.health}/${healthInfo.maxHealth} (${healthInfo.percent}%)`);
  console.log(`${healthInfo.healthBar} ${healthInfo.status}`);
}

/**
 * Displays comprehensive player statistics including gold, health, strength, level, and location
 */
function mystats() {
  console.log("\n=== PLAYER STATS ===");
  console.log(`Gold: ${gold}`);
  console.log(`Health: ${health}`);
  console.log(`Strength: ${strength}`);
  console.log(`Level: ${level}`);
  console.log(`Durability: ${durability}`);
  console.log(`Luck: ${luck}`);
  console.log(`Weapon Damage: ${weapondamage}`);
  console.log(`Location: ${currentLocation}\n`);
}

// ============================================
// INVENTORY MANAGEMENT FUNCTIONS
// ============================================

/**
 * Displays all items currently in the player's inventory
 * Shows current slots used and maximum inventory capacity
 */
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
  console.log(`Slots used: ${inventory.length} / ${INVENTORY_SLOTS}`);
}

/**
 * Checks if the inventory has available space for new items
 * @returns {boolean} True if inventory has space, false if full
 */
function hasInventorySpace() {
  return inventory.length < INVENTORY_SLOTS;
}

/**
 * Adds an item to the player's inventory if space is available
 * @param {string} item - The name of the item to add
 * @returns {boolean} True if item was added, false if inventory is full
 */
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

// ============================================
// HEALTH & DAMAGE FUNCTIONS
// ============================================

/**
 * Checks if the player is still alive
 * @returns {boolean} True if player health is above minimum, false if defeated
 */
function isPlayerAlive() {
  return health > MIN_HEALTH;
}

/**
 * Updates player health with bounds checking and logging
 * @param {number} amount - The amount to change health (positive or negative)
 * @param {string} reason - Optional reason for the health change
 * @returns {Object} Health change information including old/new values and status
 */
function updateHealth(amount, reason = "") {
  const oldHealth = health;
  health = Math.max(MIN_HEALTH, Math.min(health + amount, MAX_HEALTH));
  
  const changeAmount = health - oldHealth;
  const changeSymbol = changeAmount > 0 ? "+" : "";
  
  if (reason) {
    console.log(`[${reason}] Health: ${oldHealth} → ${health} (${changeSymbol}${changeAmount})`);
  } else {
    console.log(`Health updated: ${oldHealth} → ${health} (${changeSymbol}${changeAmount})`);
  }
  
  return {
    newHealth: health,
    oldHealth: oldHealth,
    changeAmount: changeAmount,
    isDead: health <= MIN_HEALTH,
    isHealed: changeAmount > 0
  };
}

/**
 * Restores player health with healing reason logged
 * @param {number} amount - The amount of health to restore
 * @returns {Object} Health change information
 */
function restoreHealth(amount) {
  return updateHealth(amount, "Restored");
}

/**
 * Applies damage to the player and handles defeat if health drops to zero
 * @param {number} amount - The amount of damage to take
 * @param {string} source - The source of the damage (e.g., monster name)
 * @returns {Object} Damage information including whether player was defeated
 */
function takeDamage(amount, source = "Unknown") {
  const result = updateHealth(-amount, `Damage from ${source}`);
  
  if (result.isDead) {
    console.log(`\n*** You were defeated! ***`);
    restoreHealth(DEFEATED_RESTORE_HEALTH - health);
  }
  
  return result;
}

// ============================================
// ITEM & POTION FUNCTIONS
// ============================================

/**
 * Convenience function to use a health potion from inventory
 */
function useHealthPotion() {
  useItem("health potion");
}

/**
 * Uses an item from the player's inventory and applies its effects
 * @param {string} itemName - The name of the item to use
 * @returns {boolean} True if item was used successfully, false if item not found or invalid
 */
function useItem(itemName) {
  if (!inventory.includes(itemName)) {
    console.log(`\nYou don't have a ${itemName}!`);
    return false;
  }

  const effect = itemEffects[itemName];
  
  if (!effect) {
    console.log(`\nUnknown item: ${itemName}`);
    return false;
  }

  const statName = effect.stat;
  let currentValue = eval(statName);
  const newValue = Math.min(currentValue + effect.value, effect.maxStat);
  
  eval(`${statName} = ${newValue}`);
  
  console.log(`\n✓ You used a ${itemName}!`);
  console.log(`  ${statName.charAt(0).toUpperCase() + statName.slice(1)} increased by ${newValue - currentValue}!`);
  console.log(`  Current ${statName}: ${newValue}`);
  
  inventory.splice(inventory.indexOf(itemName), 1);
  return true;
}

/**
 * Displays a menu for the player to choose and use an item from inventory
 */
function useItemFromMenu() {
  if (inventory.length === 0) {
    console.log("Your inventory is empty!");
    return;
  }

  console.log("\n=== Use Item ===");
  const usableItems = inventory.filter(item => itemEffects[item]);
  
  if (usableItems.length === 0) {
    console.log("No usable items in inventory!");
    return;
  }

  usableItems.forEach((item, index) => {
    console.log(`${index + 1}. ${item}`);
  });
  console.log(`${usableItems.length + 1}. Cancel`);

  const choice = readline.question("Choose an item to use: ");
  const choiceNum = parseInt(choice);

  if (choiceNum > 0 && choiceNum <= usableItems.length) {
    useItem(usableItems[choiceNum - 1]);
  } else if (choiceNum === usableItems.length + 1) {
    console.log("Cancelled.");
  } else {
    console.log("Invalid choice!");
  }
}

// ============================================
// SHOP FUNCTIONS
// ============================================

/**
 * Displays the shop menu and processes player purchases
 * Allows buying weapons (swords) and potions with gold
 */
function shop() {
  console.log("\n=== Shop ===");
  console.log(`1. Buy Sword 1 (${SWORD_1_PRICE} gold) - Damage +${SWORD_1_DAMAGE}`);
  console.log(`2. Buy Sword 2 (${SWORD_2_PRICE} gold) - Damage +${SWORD_2_DAMAGE}`);
  console.log(`3. Buy Sword 3 (${SWORD_3_PRICE} gold) - Damage +${SWORD_3_DAMAGE}`);
  console.log(`4. Buy Health Potion (${HEALTH_POTION_PRICE} gold)`);
  console.log("5. Back to Menu");
  
  let choice = readline.question("Choose an option: ");
  
  switch (choice) {
    case "1":
      buySword(SWORD_1_PRICE, SWORD_1_DAMAGE, "Sword 1");
      break;
    case "2":
      buySword(SWORD_2_PRICE, SWORD_2_DAMAGE, "Sword 2");
      break;
    case "3":
      buySword(SWORD_3_PRICE, SWORD_3_DAMAGE, "Sword 3");
      break;
    case "4":
      buyHealthPotion();
      break;
    case "5":
      console.log("Leaving the shop.");
      break;
    default:
      console.log("Invalid choice.");
  }
}

/**
 * Handles purchasing a sword and adds it to inventory
 * Increases weapon damage if player has enough gold
 * @param {number} price - The cost of the sword in gold
 * @param {number} damage - The damage increase provided by the sword
 * @param {string} swordName - The name of the sword being purchased
 */
function buySword(price, damage, swordName) {
  if (gold >= price) {
    gold -= price;
    weapondamage += damage;
    addToInventory(swordName);
    console.log(`Weapon damage increased to: ${weapondamage}`);
  } else {
    console.log("Not enough gold!");
  }
}

/**
 * Handles purchasing a health potion and adds it to inventory
 */
function buyHealthPotion() {
  if (gold >= HEALTH_POTION_PRICE) {
    gold -= HEALTH_POTION_PRICE;
    addToInventory("health potion");
  } else {
    console.log(`Not enough gold! Health potion costs ${HEALTH_POTION_PRICE} gold.`);
  }
}

// ============================================
// MOVEMENT & LOCATION FUNCTIONS
// ============================================

/**
 * Displays location options and handles player travel between locations
 */
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
      moveToLocation("town", "Town Square");
      break;
    case "2":
      moveToLocation("blacksmith", "Blacksmith's Forge");
      break;
    case "3":
      moveToLocation("tavern", "The Wandering Tavern");
      break;
    case "4":
      console.log("You decide to stay where you are.");
      break;
    default:
      console.log("Invalid choice. You stay in your current location.");
  }
}

/**
 * Moves the player to a new location if not already there
 * @param {string} location - The location key to move to
 * @param {string} name - The display name of the location
 */
function moveToLocation(location, name) {
  if (currentLocation !== location) {
    currentLocation = location;
    displayLocationInfo(currentLocation);
    console.log(`You have arrived at ${name}.`);
  } else {
    console.log(`You are already at ${name}!`);
  }
}

/**
 * Displays town-specific movement options
 * Allows movement to shop, blacksmith, or staying in town
 */
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
      shop();
      break;
    case "2":
      currentLocation = "blacksmith";
      displayLocationInfo(currentLocation);
      break;
    case "3":
      console.log("You stay in the town square.");
      break;
    default:
      console.log("Invalid choice.");
  }
}

/**
 * Convenience function that calls the player movement handler
 */
function travel() {
  handlePlayerMovement();
}

// ============================================
// BATTLE FUNCTIONS
// ============================================

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
        const damageDealt = calculatePlayerDamage(monsterType);
        currentMonsterHealth -= damageDealt;
        console.log(`You dealt ${damageDealt} damage to the ${monsterType.name}!`);
        console.log(`${monsterType.name} health: ${Math.max(0, currentMonsterHealth)}`);
        
        if (currentMonsterHealth <= 0) {
          completeBattle(monsterType, monsterChoice);
          battleActive = false;
        } else {
          executeMonsterAttack(monsterType);
        }
        break;
        
      case "2":
        useHealthPotion();
        executeMonsterAttack(monsterType);
        break;
        
      case "3":
        if (!attemptFlee(monsterType)) {
          executeMonsterAttack(monsterType);
        } else {
          battleActive = false;
        }
        break;
        
      default:
        console.log("Invalid choice!");
    }
  }
}

/**
 * Calculates total damage dealt by the player to a monster
 * Takes into account player strength, weapon damage, and random variance
 * @param {Object} monsterType - The monster object with defense stat
 * @returns {number} Total damage dealt (cannot be negative)
 */
function calculatePlayerDamage(monsterType) {
  const playerDamage = strength + weapondamage + Math.floor(Math.random() * 5);
  return Math.max(0, playerDamage - monsterType.defense);
}

/**
 * Executes a monster's attack on the player during battle
 * Applies damage and checks if player is defeated
 * @param {Object} monsterType - The monster object with strength stat
 */
function executeMonsterAttack(monsterType) {
  const monsterDamage = monsterType.strength - Math.floor(Math.random() * 3);
  health -= monsterDamage;
  console.log(`${monsterType.name} attacks! You take ${monsterDamage} damage.`);
  console.log(`Your health: ${health}`);
  
  if (health <= 0) {
    console.log("\n*** You were defeated! ***");
    health = DEFEATED_RESTORE_HEALTH;
  }
}

/**
 * Attempts to flee from combat with a 50% success rate
 * If flee fails, the monster attacks before the function returns
 * @param {Object} monsterType - The monster object with strength stat
 * @returns {boolean} True if flee was successful, false if failed
 */
function attemptFlee(monsterType) {
  const fleeChance = Math.random();
  if (fleeChance > 0.5) {
    console.log(`You successfully fled from the ${monsterType.name}!`);
    return true;
  } else {
    console.log(`Failed to flee! The ${monsterType.name} attacks!`);
    const fleeMonsterDmg = monsterType.strength;
    health -= fleeMonsterDmg;
    console.log(`You take ${fleeMonsterDmg} damage!`);
    console.log(`Your health: ${health}`);
    
    if (health <= 0) {
      console.log("\n*** You were defeated! ***");
      health = DEFEATED_RESTORE_HEALTH;
    }
    return false;
  }
}

/**
 * Handles battle completion - awards gold and experience to the player
 * @param {Object} monsterType - The defeated monster object
 * @param {number} monsterChoice - The monster type index (used to calculate rewards)
 */
function completeBattle(monsterType, monsterChoice) {
  console.log(`\n*** ${monsterType.name} defeated! ***`);
  const goldReward = (monsterChoice * 10) + Math.floor(Math.random() * 10);
  gold += goldReward;
  level += 1;
  console.log(`You gained ${goldReward} gold and leveled up! Level: ${level}`);
}

// ============================================
// MENU FUNCTIONS
// ============================================

/**
 * Displays the main game menu with all available commands
 */
function showMenu() {
  console.log("\n=== Main Menu ===");
  console.log("1. Attack Monster");
  console.log("2. Use Health Potion");
  console.log("3. Shop");
  console.log("4. Travel");
  console.log("5. Show Stats");
  console.log("6. Show Inventory");
  console.log("7. Help");
  console.log("8. Quit");
}

// ============================================
// HELP SYSTEM
// ============================================

/**
 * Displays comprehensive help information including:
 * - All available menu commands and their descriptions
 * - Battle commands and mechanics
 * - Shop items and prices
 * - Monster types and their statistics
 * - Gameplay tips and strategies
 */
function showHelp() {
  console.log("\n==============================================");
  console.log("   HELP - AVAILABLE COMMANDS   ");
  console.log("==============================================\n");
  
  console.log("📋 MAIN MENU COMMANDS:");
  console.log("  1. Attack Monster     - Fight monsters to gain gold and experience");
  console.log("  2. Use Health Potion  - Restore health if you have potions");
  console.log("  3. Shop              - Buy weapons and potions with gold");
  console.log("  4. Travel            - Move to different locations");
  console.log("  5. Show Stats        - View your character statistics");
  console.log("  6. Show Inventory    - See what items you're carrying");
  console.log("  7. Help              - Display this help information");
  console.log("  8. Quit              - Exit the game\n");
  
  console.log("⚔️  BATTLE COMMANDS:");
  console.log("  During combat, you can:");
  console.log("  1. Attack   - Deal damage to the monster");
  console.log("  2. Potion   - Use a health potion to restore health");
  console.log("  3. Flee     - Attempt to escape from battle\n");
  
  console.log("🏪 SHOP COMMANDS:");
  console.log("  1. Buy Sword 1 (50 gold)  - Increases damage by 5");
  console.log("  2. Buy Sword 2 (100 gold) - Increases damage by 10");
  console.log("  3. Buy Sword 3 (150 gold) - Increases damage by 15");
  console.log("  4. Buy Health Potion      - Restore 20 health (20 gold)\n");
  
  console.log("👾 MONSTER TYPES:");
  console.log("  1. Goblin  - Health: 50,  Defense: 5,  Strength: 10");
  console.log("  2. Orc     - Health: 100, Defense: 10, Strength: 15");
  console.log("  3. Troll   - Health: 150, Defense: 15, Strength: 20");
  console.log("  4. Dragon  - Health: 200, Defense: 20, Strength: 30\n");
  
  console.log("💡 TIPS:");
  console.log("  - Defeat monsters to gain gold and level up");
  console.log("  - Use the shop to upgrade your weapons");
  console.log("  - Keep health potions for emergency healing");
  console.log("  - Higher level means stronger attacks");
  console.log("  - Defense reduces the damage you take");
  console.log("  - Luck can affect battle outcomes\n");
  
  console.log("==============================================\n");
}

// ============================================
// MAIN GAME LOOP
// ============================================

displayWelcomeMessage();
console.log("Monster stats: health: 50, defense: 5, strength: 10\n");
displayLocationInfo(currentLocation);

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
      showHelp();
      break;
    case "8":
      console.log("Thanks for playing!");
      gameRunning = false;
      break;
    default:
      console.log("Invalid choice. Please try again.");
  }
}

