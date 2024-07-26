// 1: How would you order the following array of number strings by descending numeric value (largest number value to smallest)?

let arr = ['10', '11', '9', '7', '8'];

arr = arr.sort((a, b) => b - a);

console.log(arr);

// 2: How would you order the following array of objects based on the year of publication of each book, from the earliest to the latest?

let books = [
  { title: 'One Hundred Years of Solitude', author: 'Gabriel Garcia Marquez', published: '1967' },
  { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', published: '1925' },
  { title: 'War and Peace', author: 'Leo Tolstoy', published: '1869' },
  { title: 'Ulysses', author: 'James Joyce', published: '1922' },
  { title: 'The Book of Kells', author: 'Multiple Authors', published: '800' },
];

books.sort((a, b) => a.published - b.published)
console.log(books)

// 3: For each of these collection objects, demonstrate how you would access the letter g.

let arr1 = ['a', 'b', ['c', ['d', 'e', 'f', 'g']]];
let arr2 = [{ first: ['a', 'b', 'c'], second: ['d', 'e', 'f'] }, { third: ['g', 'h', 'i'] }];
let arr3 = [['abc'], ['def'], { third: ['ghi'] }];
let obj1 = { a: ['d', 'e'], b: ['f', 'g'], c: ['h', 'i'] };
let obj2 = { first: { d: 3 }, second: { e: 2, f: 1 }, third: { g: 0 }};

function log (input) {
  console.log(input)
}

log(arr1[2][1][3])
log(arr2[1]['third'][0])
log(arr3[2]['third'][0][0])
log(obj1.b[1])
log(Object.keys(obj2.third)[0])

// 4: For each of these collection objects, demonstrate how you would change the value 3 to 4.

let arr1 = [1, [2, 3], 4];
let arr2 = [{ a: 1 }, { b: 2, c: [7, 6, 5], d: 4 }, 3];
let obj1 = { first: [1, 2, [3]] };
let obj2 = { a: { a: ['1', 'two', 3], b: 4 }, b: 5 };

function log (input) {
  console.log(input)
}

arr1[1][1] = 4;
arr2[2] = 4;
obj1['first'][2][0] = 4;
obj2.a.a[2] = 4;

log(arr1);
log(arr2);
log(obj1);
log(obj2);

//5: Compute and display the total age of the male members of the family.

let munsters = {
  Herman: { age: 32, gender: 'male' },
  Lily: { age: 30, gender: 'female' },
  Grandpa: { age: 402, gender: 'male' },
  Eddie: { age: 10, gender: 'male' },
  Marilyn: { age: 23, gender: 'female'}
};

let totalAge = Object.values(munsters).map((prop) => (prop['gender'] === 'male') && (prop['age'])).reduce((a, b) => a + b);

console.log(totalAge);

//6: One of the most frequently used real-world string operations is that of "string substitution," 
//where we take a hard-coded string and modify it with various parameters from our program.
//Given this previously seen family object, print the name, age, and gender of each family member

let munsters = {
  herman: { age: 32, gender: 'male' },
  lily: { age: 30, gender: 'female' },
  grandpa: { age: 402, gender: 'male' },
  eddie: { age: 10, gender: 'male' },
  marilyn: { age: 23, gender: 'female'}
};

//Each output line should follow this pattern:
//(Name) is a (age)-year-old (male or female).

function printData (family) {
  let propertyList = Object.keys(family);

  propertyList.forEach((member) => {
  console.log(`${member.slice(0, 1).toUpperCase() + member.slice(1)} is a ${family[member]['age']}-year-old ${family[member]['gender']}.`)
  })
}

printData(munsters);

// 7: Given the following code, what will the final values of a and b be? Try to answer without running the code.

let a = 2;
let b = [5, 8];
let arr = [a, b];//[2 [5,8]]

arr[0] += 2;//[4 [5,8]]
arr[1][0] -= a;//[4 [3,8]]

console.log(arr);

//

// 8: Using the forEach method, write some code to output all vowels from the strings in the arrays. 
// Don't use a for or while loop.

let obj1 = {
  first: ['the', 'quick'],
  second: ['brown', 'fox'],
  third: ['jumped'],
  fourth: ['over', 'the', 'lazy', 'dog'],
};

function printVowels (obj) {
  let vowels = ['a', 'i', 'o', 'u', 'e'];
  let valuesofObject = Object.values(obj);


  valuesofObject.forEach((arr) => {
    arr.forEach((string) => {
        string.split('').forEach((char) => {
        if(vowels.includes(char)){
          console.log(char);
        }})
      })
    })
  }
printVowels(obj1);

// 9: Given the following data structure, return a new array with the same structure, 
//but with the values in each subarray ordered -- alphabetically or numerically as appropriate -- 
//in ascending order.

let arr = [['b', 'c', 'a'], [2, 11, -3], ['blue', 'black', 'green']];

let seralizedArr = JSON.stringify(arr);
let newArr = JSON.parse(seralizedArr);

newArr.forEach((subArray) => {
  if(typeof(subArray[0]) === 'number') {
  subArray.sort((a, b) => b - a);
  } else {
    subArray.sort();
  }
})

console.log(newArr)

// 10: Perform the same transformation of sorting the subarrays we did 
//in the previous exercise with one difference; sort the elements in descending order.

let arr = [['b', 'c', 'a'], [2, 11, -3], ['blue', 'black', 'green']];

let sortedArr = arr.map((subArr) => {
  return subArr.slice().sort((a, b) => {
    if(a > b) return -1;
    if(b > a) return 1; 
    return 0;
  })
}
)

console.log(sortedArr)

//11: Given the following data structure, use the map method to return a new array identical in structure to the original but,
// with each number incremented by 1. Do not modify the original data structure.

let arr = [{ a: 1 }, { b: 2, c: 3 }, { d: 4, e: 5, f: 6 }];

let newArray = arr.map((nestedObj) => {
  let newObj = {};
  for(let prop in nestedObj) {
    newObj[prop] = nestedObj[prop] += 1
  }
  return newObj
})

console.log(newArray);

let arr = [{ a: 1 }, { b: 2, c: 3 }, { d: 4, e: 5, f: 6 }];

let newArray = arr.map((element) => {
  for(let prop in element) {
   element.prop += 1
  }
  return element 
})

console.log(newArray);

// 12: Create a deep copy of the following nested array.

const arr = [
  ['b', 'c', 'a'],
  ['blue', 'black', 'green'],
  { b: [2, 4, 6], c: [3, 6], d: [4] },
  { e: [8], f: [6, 10] },
];

let serializedArr = JSON.stringify(arr);
let newArr = JSON.parse(serializedArr)
;

//13: Similar to the previous question, you need to create a deep copy of the following nested object.

const truthiness = {
  falsy: [ null, undefined, '', false, NaN, 0 ],
  truthy: ['everything else...']
};

let deepCopy = {};

for(let prop in truthiness) {
  deepCopy[prop] = [...truthiness[prop].slice()]
}

console.log(deepCopy);

// 14: Given the following data structure, use a combination of methods, including filter,
// to return a new array identical in structure to the original, but containing only the numbers that are multiples of 3.


let arr = [[2], [3, 5, 7], [9], [11, 15, 18]];

//15: Given the following data structure, 
//sort the array so that the sub-arrays are ordered based on the sum of the odd numbers that they contain.

let arr = [[1, 6, 7], [1, 5, 3], [1, 8, 3]]; 

function sumOfOddNumbers(array) {
  let sum = 0;
  array.forEach(digit => {
    if(digit % 2 === 1) {
      sum += digit;
    }
  })
  return sum;
}

arr.sort((a,b) => {
 if(sumOfOddNumbers(a) > sumOfOddNumbers(b)) {
  return 1;
 } else if (sumOfOddNumbers(b) > sumOfOddNumbers(a)) {
  return -1; 
 } else {
  return 0;
 }
})

console.log(arr);

//16: Given the following data structure write some code to return an array 
//containing the colors of the fruits and the sizes of the vegetables. 
//The sizes should be uppercase, and the colors should be capitalized.


let obj = {
  grape: { type: 'fruit', colors: ['red', 'green'], size: 'small' },
  carrot: { type: 'vegetable', colors: ['orange'], size: 'medium' },
  apple: { type: 'fruit', colors: ['red', 'green'], size: 'medium' },
  apricot: { type: 'fruit', colors: ['orange'], size: 'medium' },
  marrow: { type: 'vegetable', colors: ['green'], size: 'large' },
};

//[["Red", "Green"], "MEDIUM", ["Red", "Green"], ["Orange"], "LARGE"]


let sizesAndColors = Object.values(obj).map(food => {
  if(food['type'] === 'fruit'){
    return food['colors'].map(color => {
      return color.slice(0, 1).toUpperCase() + color.slice(1);
    })
  } else {
    return food['size'].toUpperCase();
  }
})

console.log(sizesAndColors);

//17: Given the following data structure, write some code to return an array 
//which contains only the objects where all the numbers are even.


let arr = [
  { a: [1, 2, 3] },// [[1, 2, 3]]
  { b: [2, 4, 6], c: [3, 6], d: [4] },
  { e: [8], f: [6, 10] },
];

let newArray = arr.filter ((obj) => {
  return Object.values(obj).every((nestedArr => {
    return nestedArr.every((elm) => elm % 2 === 0);
  }))
}
)

console.log(newArray);

// 18: Given the following data structure, write some code that defines an object where the key is 
//the first item in each subarray, and the value is the second.


let arr = [['a', 1], ['b', 'two'], ['sea', {'c': 3}], ['D', ['a', 'b', 'c']]];

let obj = {};

arr.forEach((nestedArr) => {
  obj[nestedArr[0]] = nestedArr[1];
})

console.log(obj); // { a: 1, b: 'two', sea: { c: 3 }, D: [ 'a', 'b', 'c' ] }

//19 Remember The Munsters from earlier questions? For this problem, you are tasked with creating a deep copy 
//of the munsters object, whose nested objects cannot be altered.

let munsters = {
  herman: { age: 32, gender: 'male' },
  lily: { age: 30, gender: 'female' },
  grandpa: { age: 402, gender: 'male' },
  eddie: { age: 10, gender: 'male' },
  marilyn: { age: 23, gender: 'female'}
};

let copyMunsters = JSON.parse(JSON.stringify(munsters)); 
copyMunsters.herman = {a: "test"}
console.log(munsters);
console.log(copyMunsters)

/* 20: 
A UUID is a type of identifier often used to uniquely identify items, 
even when some of those items were created on a different server or by a different application. 
That is, without any synchronization, two or more computer systems can create new items and label them 
with a UUID with no significant risk of stepping on each other's toes. It accomplishes this feat 
through massive randomization. The number of possible UUID values is approximately 3.4 X 10E38, 
which is a huge number. The chance of a conflict is vanishingly small with such a large number of possible values.
Each UUID consists of 32 hexadecimal characters (the digits 0-9 and the letters a-f) 
represented as a string. The value is typically broken into 5 sections in an 8-4-4-4-12 pattern, e.g., 'f65c57f6-a6aa-17a8-faa1-a67f2dc9fa91'.

*/

function chainElements (elm) {
  let char = '0123456789abcdef';
  let element = '';
  for (let idx = 0; idx < elm; idx ++) {
    let randomNumber = Math.floor(Math.random() * 16);
    element += char[randomNumber];
  }
  return element;
}

let chain = `${chainElements(8)}-${chainElements(4)}-${chainElements(4)}-${chainElements(4)}-${chainElements(12)}`

console.log(chain)







