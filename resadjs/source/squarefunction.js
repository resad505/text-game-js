// Create a product catalog using an array of objects
const readline = require("readline");
let productCatalog = [
  {
    id: 101,
    name: "Wireless Headphones",
    price: 79.99,
    category: "Electronics",
    inStock: true,
  },
  {
    id: 102,
    name: "Running Shoes",
    price: 59.95,
    category: "Footwear",
    inStock: false,
  },
  {
    id: 103,
    name: "Coffee Mug",
    price: 12.5,
    category: "Kitchen",
    inStock: true,
  },
];
// Display all product names
console.log("Products in catalog:");
for (let i = 0; i < productCatalog.length; i++) {
  console.log(productCatalog[i].name + " - $" + productCatalog[i].price);
}
// Find products in a specific category
console.log("\nElectronics products:");
for (let i = 0; i < productCatalog.length; i++) {
  if (productCatalog[i].category === "Electronics") {
    console.log(productCatalog[i].name);
  }
}
console.log("\nAdding a new product to the catalog...");
// Add a new product to the catalog
let newProduct = {
    id: "",
    name: "",
    price: "",
    category: "",
    inStock: true,
};
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
function addProduct() {
  rl.question("Enter product ID: ", (id) => {
    // Create a new object for the new product to avoid reference issues
    let currentProduct = { ...newProduct };
    currentProduct.id = parseInt(id);
    
    rl.question("Enter product name: ", (name) => {
      currentProduct.name = name;
      
      rl.question("Enter product price: ", (price) => {
        currentProduct.price = parseFloat(price);
        
        rl.question("Enter product category: ", (category) => {
          currentProduct.category = category;
          
          rl.question("Is the product in stock? (yes/no): ", (inStock) => {
            currentProduct.inStock = inStock.toLowerCase() === "yes";
            productCatalog.push(currentProduct);
            console.log("\nUpdated product catalog:");
            productCatalog.forEach(p => console.log(`${p.name} - $${p.price}`));
            rl.close();
          });
        });
      });
    });
  });
}
console.log("do you want to add a new product?");
rl.question("(yes/no): ", (answer) => {
  if (answer.toLowerCase() === "yes") {
    addProduct();
  } else {
    rl.close();
  }
});
console.log("new product added successfully.",++productCatalog.length);
