const fs = require("fs");
const path = require("path");
const readline = require("readline");
const { stdin: input, stdout: output } = require("process");

let filePath = path.join(__dirname, "text.txt");
let stream = fs.createWriteStream(filePath);

const rl = readline.createInterface({ input, output });

const handler = (answer) => {
    stream.write(`${answer} \n`);
    stream.end();
    rl.close();
};

rl.question("Hello! Type anything text! \n", handler);

//process.on("exit", () => {});
