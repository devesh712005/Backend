const fs = require("fs");

// --sync-- //

console.time("sync-read");
fs.readFileSync("1.js", "utf-8");
fs.readFileSync("2.js", "utf-8");
console.timeEnd("sync-read"); //  print

// --async-- //

console.time("async-read");
fs.readFile("1.js", "utf-8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  fs.readFile("2.js", "utf-8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
  });
  console.timeEnd("async-read"); // print
});
