const readline = require('readline');

// Currency exchange rates (base: USD)
const exchangeRates = {
  USD: 1.0,           // US Dollar
  EUR: 0.92,          // Euro
  AZN: 1.70,          // Azerbaijani Manat
  GBP: 0.79,          // British Pound
  JPY: 149.50,        // Japanese Yen
  CNY: 7.24,          // Chinese Yuan
  INR: 83.12,         // Indian Rupee
  CAD: 1.32,          // Canadian Dollar
  AUD: 1.53,          // Australian Dollar
  CHF: 0.88,          // Swiss Franc
};

// Currency symbols
const currencySymbols = {
  USD: '$',
  EUR: '€',
  AZN: '₼',
  GBP: '£',
  JPY: '¥',
  CNY: '¥',
  INR: '₹',
  CAD: 'C$',
  AUD: 'A$',
  CHF: 'CHF',
};

console.log('Welcome to the Money Exchange Program. In this program, you can convert amounts between different currencies based on predefined exchange rates.');
console.log('Available currencies: USD, EUR, AZN, GBP, JPY, CNY, INR, CAD, AUD, CHF');
console.log('Exchange rates are based on USD');
console.log('\nWhich currency do you want to convert from?');

// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Function to format currency output
function formatCurrency(amount, currency) {
  const symbol = currencySymbols[currency] || currency;
  const rate = exchangeRates[currency];
  
  if (!rate) {
    return `Invalid currency: ${currency}`;
  }
  
  // Convert to 2 decimal places
  const formattedAmount = amount.toFixed(2);
  return `${symbol}${formattedAmount}`;
}

// Function to convert currency
function convertCurrency(amount, fromCurrency, toCurrency) {
  const fromRate = exchangeRates[fromCurrency];
  const toRate = exchangeRates[toCurrency];
  
  if (!fromRate || !toRate) {
    return null;
  }
  
  // Convert to USD first, then to target currency
  const amountInUSD = amount / fromRate;
  const convertedAmount = amountInUSD * toRate;
  
  return convertedAmount;
}

// Example usage with formatted output
rl.question('Enter the currency code (e.g., USD, EUR): ', (fromCurrency) => {
  rl.question('Enter amount to convert: ', (amount) => {
    rl.question('Convert to currency code: ', (toCurrency) => {
      
      const fromCode = fromCurrency.toUpperCase();
      const toCode = toCurrency.toUpperCase();
      const numAmount = parseFloat(amount);
      
      // Validate inputs
      if (!exchangeRates[fromCode] || !exchangeRates[toCode]) {
        console.log('Invalid currency code!');
        rl.close();
        return;
      }
      
      if (isNaN(numAmount)) {
        console.log('Invalid amount!');
        rl.close();
        return;
      }
      
      // Convert and display
      const converted = convertCurrency(numAmount, fromCode, toCode);
      const originalFormatted = formatCurrency(numAmount, fromCode);
      const convertedFormatted = formatCurrency(converted, toCode);
      
      console.log(`\n--- Conversion Result ---`);
      console.log(`${originalFormatted} = ${convertedFormatted}`);
      console.log(`Exchange Rate: 1 ${fromCode} = ${(exchangeRates[toCode] / exchangeRates[fromCode]).toFixed(4)} ${toCode}`);
      
      rl.close();
    });
  });
});


