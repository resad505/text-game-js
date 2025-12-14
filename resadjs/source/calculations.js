const readline = require("readline-sync");
let cappucinopirce=5;
let espressoprice=3;
let lattepirce=4;
let mochaprice=6;
let blackcoffeprice=2;
let totalprice=0;
let consumerbirthday=true;
console.log("Welcome to the Coffee Shop!");
console.log("Here are our prices:cappucino:$5, espresso:$3, latte:$4, mocha:$6, blackcoffee:$2");
let coffeetype = readline.question("Enter the type of coffee you want (cappucino, espresso, latte, mocha, blackcoffee): ");
let quantity = parseInt(readline.question("Enter the quantity you want: "));
if (coffeetype === "cappucino") {
    totalprice = cappucinopirce * quantity;
} else if (coffeetype === "espresso") {
    totalprice = espressoprice * quantity;
} else if (coffeetype === "latte") {
    totalprice = lattepirce * quantity;
}   else if (coffeetype === "mocha") {
    totalprice = mochaprice * quantity;
} else if (coffeetype === "blackcoffee") {
    totalprice = blackcoffeprice * quantity;
}
if (consumerbirthday) {
    totalprice = totalprice * 0.9; // Apply 10% discount
}

console.log("The total price for " + quantity + " " + coffeetype + "(s) is: $" + totalprice);