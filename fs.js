//import fs module
const { readFileSync, writeFileSync } = require("fs");

//read files
const first = readFileSync("./content/first.txt", "utf8");
const second = readFileSync("./content/second.txt", "utf8");

//log output
console.log(first);
console.log(second);

//create a new file if it doesn't alrady exist
writeFileSync(
  "./content/result.txt",
  `Full Name: ${second}, ${first}`,
  { flag: "a" } // Third argument gives you options, 'a' appends the text
);
