const isPrime = number => {
  // find 2 to square number
  for(let i = 2, s = Math.sqrt(number); i <= s; i++)
    if(number % i === 0) return false; 
  return number > 1;
}

const countPimes = (input, i) => {
  const MAX_NUMER = 100000;
  const MODULO = 1000000007;

  // input > 0 and input < MAX_NUMER
  if (!input || parseInt(input) > MAX_NUMER) return "Invalid numeric";

  // not leading with zero
  if (input.substring(0, 1) === "0") return "Invalid numeric";

  if (i == 0) return 1;
  
  let count = 0;

	for(let j = 1; j <= input.length; j++) {
    if (i - j >= 0 && isPrime(input.substring(i - j, i))) {
      count += countPimes(input, i - j);
      count %= MODULO;
    }
	}
	
	return count;

}

const countPrimeStrings = (input) => {
  const length = input.length;
  return countPimes(input, length);
};

/* For Testing: */

// const count = countPrimeStrings("11373");
// console.log(count);