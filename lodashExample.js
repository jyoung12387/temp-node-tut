// let nums = [1, 2, 3, 4];

// nums.forEach((num) => {
//   console.log(num);
// });

// nums.reverse(nums);

// nums.forEach((num) => {
//   console.log(num);
// });

const _ = require("lodash");

const items = [1, [2, [3, [4]]]];
const newItems = _.flattenDeep(items);
console.log(newItems);
