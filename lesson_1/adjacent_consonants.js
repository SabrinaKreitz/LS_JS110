/* 
Algorithm Sabrina: 

Take and array of strings. 

Create an empty array. 

Assign each string a number which represents the highest amount of adjacent consonants in this string. Ignore empty spaces while doing that. 

Sub-algorithm: 

- Create a variable called ‘currentCount’ and set it to 0
- Create a variable called ‘highestCount’ and set it to 0
- For each given string, walk through each string[idx]acter and if that string[idx]acter is not a vowel increment ‘currentCount’ by 1.
- Each time you encounter a vowel, compare ‘highestCount’ to the value of ‘currentCount’, and if ‘highestCount’ is smaller, replace ‘highestCount’ with the value of ‘currentCount’
- Now set ‘currentCount’ to 0 and continue until you reached the last string[idx]acter of the string.
- Now assign the string the value of ‘highestCount’

Save those information in a new data structure. 

Now walk through each string in the new data structure starting with the first one and if it’s assigned a higher number or an equal number to any other string, add that string to the empty array and remove it from the data structure. 

Sub-algorithm: 
Input: object
Output: array 
intermediate structure: array

Create an empty array called "sortedArray"
The input will be the data structure from the previous sub-algorithm which is an object. 
Create an array from all the properties of the object and call it "objectProperties"
Create an array from all the values of the object and call it "objectValues"
Create an array called "indexOfSortedList" and set it equal to 0
Create a variable called "currentHighest" and set it equal to the "indesOfSortedList" - indexed element of a shallow copy of "objectValues" sorted in descending order
Now loop through the elements of "objectValues" by index. If the element is equal to "currentHighest", add the same-indexed element of "objectProperties" to "sortedArray".
Now increment "indexOfSortedList" by ones and reassign "currentHighest" to the "indesOfSortedList" - indexed element of a shallow copy of "objectValues" sorted in descending order. 
Do this, as until the length of "sortedArray" is the same as the length of "objectValues".
Return "sortedArray"

*/

function countConsonants (list) {
  countAssigned = {};

  list.forEach((string) => {
    currentCount = 0;
    highestCount = 0;
    countAssigned[string] = currentCount;

    for(let idx = 0; idx < string.length; idx ++) {
      if (string[idx] === ' ') continue;
      if(string[idx] != 'o' && string[idx] != 'O' && string[idx] != 'u' && string[idx] != 'U' && string[idx] != 'a' && string[idx] != 'A' && string[idx] != 'i' && string[idx] !='I' && string[idx] != 'e' && string[idx] !='E') {
        currentCount += 1;
      } else {
        currentCount = 0;
      }
     if(countAssigned[string] <= currentCount){
      countAssigned[string] = currentCount;
     }
    }
}
)
return countAssigned;
}

function sortStringsByConsonants(list) {
  let sortedObject = countConsonants(list);
  let sortedArray = [];
  let objectProperties = Object.keys(sortedObject);
  let objectValues = Object.values(sortedObject);
  let sortedValues = [...objectValues].sort((a, b) => b - a);
  let indexSortedList = 0;
  let currentHighest = sortedValues[indexSortedList];

  while(sortedArray.length < objectValues.length) {
    objectValues.forEach((element, idx) => {
      if(element === currentHighest && !sortedArray.includes(objectProperties[idx])){
        sortedArray.push(objectProperties[idx]);
      }
    }
    )
    indexSortedList += 1;
    currentHighest = sortedValues[indexSortedList];;
  }
return sortedArray;
}


let list1 = ['aa', 'baa', 'ccaa', 'dddaa'];
console.log(sortStringsByConsonants(list1));
// ['dddaa', 'ccaa', 'aa', 'baa']

let list2 = ['can can', 'toucan', 'batman', 'salt pan'];
console.log(sortStringsByConsonants(list2));
// ['salt pan', 'can can', 'batman', 'toucan']

let list3 = ['bar', 'car', 'far', 'jar'];
console.log(sortStringsByConsonants(list3));
// ['bar', 'car', 'far', 'jar']

let list4 = ['day', 'week', 'month', 'year'];
console.log(sortStringsByConsonants(list4));
// ['month', 'day', 'week', 'year']
