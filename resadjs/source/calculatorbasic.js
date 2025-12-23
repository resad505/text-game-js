const readline = require("readline-sync");
let userinput = "";
let a=parseFloat(readline.question("Enter a number: "));
let b=parseFloat(readline.question("Enter another number: "));
  let choice = readline.question("1 2 3 4: ");
  switch (choice) {
    case "1":
      console.log(a+b);
      break;
      case "2":
      console.log(a-b);
      break;
      case "3":
      console.log(a*b);
      break;
      case "4":
      console.log(a/b);
      break;
      default:
      console.log("Invalid choice.");
}