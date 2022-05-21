const fs = require("fs");
const path = require("path");

let filePath = path.join(__dirname, "text.txt");
let stream = fs.createReadStream(filePath);

stream.on("data", (chunk) => {
    console.log(chunk.toString());
});
