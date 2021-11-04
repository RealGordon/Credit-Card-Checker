// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8];
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9];
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6];
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5];
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6];

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5];
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3];
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4];
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5];
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4];

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4];
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9];
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3];
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3];
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3];

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5];


// Add your functions below:
/**implementing Luhn algorithm : https://en.wikipedia.org/wiki/Luhn_algorithm#Description
* 
*@param {array}  array: array of credit card digits
*@return {boolean}  `true`  when an array contains digits of a valid credit card number or `false` otherwise 
*/
function validateCred(array) {
  const lastIndex = array.length - 1;
  let check = 0;
  const s = array.reduceRight((a, n, i) => {

    //do not  double the last digit
    if (i === lastIndex) { check++; return n }

    //double every other digit
    if (((check++) % 2) !== 0) n *= 2;

    //add to total
    return a + ((n > 9) ? n - 9 : n)
  }, 0);

  //return true or false, if (s mod 10) equals 0 
  return ((s % 10) === 0)
}



/**
 * @param {array} array: nested array of credit card numbers  
 * @return {array} invalid cards
 */
function findInvalidCards(array) {
  return array.filter(a => !validateCred(a))
}


function idInvalidCardCompanies(array) {
  const invalidCompanies = [];
  const companies = {
    3: "Amex (American Express)",
    4: "Visa", 5: "Mastercard", 6: "Discover"
  };
  let fDigit;
  array.forEach(a => {
    fDigit = a[0];
    if (fDigit in companies) {
      if (!(fDigit in invalidCompanies)) invalidCompanies[fDigit] = companies[fDigit];
    } else console.log("Company not found for first digit: " + fDigit);
  });

  //convert possibly sparse array to dense array
  return invalidCompanies.filter(() => true)
}

//**tests**
//for valid credit card numbers
console.log("\nvalidateCred function output for valid credit cards")
batch.slice(0, 5).forEach((v, i) => console.log("valid" + (++i) + ": " + validateCred(v)));

//for invalid credit card numbers
console.log("\nvalidateCred function output for invalid credit cards")
batch.slice(5, 10).forEach((v, i) => console.log("invalid" + (++i) + ": " + validateCred(v)));

//for mystery credit cards
console.log("\nvalidateCred function output for mystery credit cards")
batch.slice(10).forEach((v, i) => console.log("mystery" + (++i) + ": " + validateCred(v)));

//companies distributing invalid credit card numbers
const invalidCards = findInvalidCards(batch);
console.log("\nCompanies distributing invalid credit card numbers: " + idInvalidCardCompanies(invalidCards).join(", "));
