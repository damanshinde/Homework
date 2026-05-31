//1.

function reverseNumber(num) {
  return Number(num.toString().split("").reverse().join(""));
}

console.log(reverseNumber(32243));

//2.

function isPalindrome(str) {
  let cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, "");
  let reversed = cleaned.split("").reverse().join("");
  return cleaned === reversed;
}

console.log(isPalindrome("madam"));
console.log(isPalindrome("nurses run"));

//3.
function stringCombinations(str) {
  let result = [];

  for (let i = 0; i < str.length; i++) {
    for (let j = i + 1; j <= str.length; j++) {
      result.push(str.slice(i, j));
    }
  }
  return result;
}

console.log(stringCombinations("dog"));

//4.
function alphabeticalOrder(str) {
  return str.split("").sort().join("");
}

console.log(alphabeticalOrder("webmaster"));

// 5.

function capitalizeWords(str) {
  let words = str.split(" ");

  for (let i = 0; i < words.length; i++) {
    words[i] = words[i][0].toUpperCase() + words[i].slice(1);
  }
  return words.join(" ");
}

console.log(capitalizeWords("the quick brown fox"));

// 6.
function longestWord(str) {
  let words = str.split(" ");
  let longest = words[0];

  for (let i = 1; i < words.length; i++) {
    if (words[i].length > longest.length) {
      longest = words[i];
    }
  }

  return longest;
}

console.log(longestWord("Web Development Tutorial"));

// 7.
function countVowels(str) {
  let vowels = "aeiouAEIOU";
  let count = 0;

  for (let i = 0; i < str.length; i++) {
    if (vowels.includes(str[i])) {
      count++;
    }
  }

  return count;
}

console.log(countVowels("The quick brown fox"));

// 8.
function isPrime(num) {
  if (num <= 1) {
    return false;
  }

  for (let i = 2; i < num; i++) {
    if (num % i === 0) {
      return false;
    }
  }

  return true;
}

console.log(isPrime(7));
console.log(isPrime(10));

// 9.
function getType(value) {
  return typeof value;
}

console.log(getType(10));
console.log(getType("hello"));
console.log(getType(true));

// 10.
function identityMatrix(n) {
  let matrix = [];

  for (let i = 0; i < n; i++) {
    let row = [];

    for (let j = 0; j < n; j++) {
      if (i === j) {
        row.push(1);
      } else {
        row.push(0);
      }
    }

    matrix.push(row);
  }

  return matrix;
}

console.log(identityMatrix(3));

// 11.

function secondLowestGreatest(arr) {
  let sorted = arr.sort(function (a, b) {
    return a - b;
  });

  return [sorted[1], sorted[sorted.length - 2]];
}

console.log(secondLowestGreatest([1, 2, 3, 4, 5]));

// 12.
function isPerfectNumber(num) {
  let sum = 0;

  for (let i = 1; i < num; i++) {
    if (num % i === 0) {
      sum += i;
    }
  }

  return sum === num;
}

console.log(isPerfectNumber(6));
console.log(isPerfectNumber(28));

// 13.
function factors(num) {
  let result = [];

  for (let i = 1; i <= num; i++) {
    if (num % i === 0) {
      result.push(i);
    }
  }

  return result;
}

console.log(factors(12));

// 14.
function amountToCoins(amount, coins) {
  let result = [];

  for (let i = 0; i < coins.length; i++) {
    while (amount >= coins[i]) {
      result.push(coins[i]);
      amount -= coins[i];
    }
  }

  return result;
}

console.log(amountToCoins(46, [25, 10, 5, 2, 1]));

// 15.
function power(b, n) {
  let result = 1;

  for (let i = 1; i <= n; i++) {
    result *= b;
  }

  return result;
}

console.log(power(2, 3));

// 16.
function uniqueCharacters(str) {
  let result = "";

  for (let i = 0; i < str.length; i++) {
    if (!result.includes(str[i])) {
      result += str[i];
    }
  }

  return result;
}

console.log(uniqueCharacters("thequickbrownfoxjumpsoverthelazydog"));

// 17.
function letterOccurrences(str) {
  let result = {};

  for (let i = 0; i < str.length; i++) {
    let letter = str[i];

    if (letter !== " ") {
      if (result[letter]) {
        result[letter]++;
      } else {
        result[letter] = 1;
      }
    }
  }

  return result;
}

console.log(letterOccurrences("hello"));

// 18.
function binarySearch(arr, value) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    let middle = Math.floor((left + right) / 2);

    if (arr[middle] === value) {
      return middle;
    }

    if (arr[middle] < value) {
      left = middle + 1;
    } else {
      right = middle - 1;
    }
  }

  return -1;
}

console.log(binarySearch([1, 2, 3, 4, 5], 4));

// 19.
function largerThanNumber(arr, num) {
  let result = [];

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > num) {
      result.push(arr[i]);
    }
  }

  return result;
}

console.log(largerThanNumber([1, 5, 10, 15], 6));

// 20.
function randomId(length) {
  let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  for (let i = 0; i < length; i++) {
    let index = Math.floor(Math.random() * chars.length);
    result += chars[index];
  }

  return result;
}

console.log(randomId(8));

// 21.
function fixedLengthCombinations(arr) {
  let result = [];

  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      result.push([arr[j], arr[i]]);
    }
  }

  return result;
}

console.log(fixedLengthCombinations([1, 2, 3]));

// 22.
function countLetter(str, letter) {
  let count = 0;

  for (let i = 0; i < str.length; i++) {
    if (str[i] === letter) {
      count++;
    }
  }

  return count;
}

console.log(countLetter("microsoft.com", "o"));

// 23.
function firstNonRepeatedChar(str) {
  for (let i = 0; i < str.length; i++) {
    if (str.indexOf(str[i]) === str.lastIndexOf(str[i])) {
      return str[i];
    }
  }

  return null;
}

console.log(firstNonRepeatedChar("abacddbec"));

// 24.
function bubbleSortDescending(arr) {
  let temp;

  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - 1 - i; j++) {
      if (arr[j] < arr[j + 1]) {
        temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }

  return arr;
}

console.log(
  bubbleSortDescending([
    12, 345, 4, 546, 122, 84, 98, 64, 9, 1, 3223, 455, 23, 234, 213,
  ]),
);

// 25.
function longestCountryName(countries) {
  let longest = countries[0];

  for (let i = 1; i < countries.length; i++) {
    if (countries[i].length > longest.length) {
      longest = countries[i];
    }
  }

  return longest;
}

console.log(
  longestCountryName(["Australia", "Germany", "United States of America"]),
);

// 26.
function longestUniqueSubstring(str) {
  let longest = "";

  for (let i = 0; i < str.length; i++) {
    let current = "";

    for (let j = i; j < str.length; j++) {
      if (current.includes(str[j])) {
        break;
      }

      current += str[j];
    }

    if (current.length > longest.length) {
      longest = current;
    }
  }

  return longest;
}

console.log(longestUniqueSubstring("abcabcbb"));

// 27.
function longestPalindrome(str) {
  let longest = "";

  for (let i = 0; i < str.length; i++) {
    for (let j = i + 1; j <= str.length; j++) {
      let word = str.slice(i, j);
      let reversed = word.split("").reverse().join("");

      if (word === reversed && word.length > longest.length) {
        longest = word;
      }
    }
  }

  return longest;
}

console.log(longestPalindrome("bananas"));

// 28.
function greet(name) {
  return "Hi " + name + "! How are you?";
}

function useFunction(func, value) {
  return func(value);
}

console.log(useFunction(greet, "Daman"));

// 29.
function getFunctionName(func) {
  return func.name;
}

function testFunction() {
  return "Testing";
}

console.log(getFunctionName(testFunction));
