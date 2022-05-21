const fs = require("fs");
const path = require("path");
const readline = require("readline");
const { stdin: input, stdout: output } = require("process");

const filePath = path.join(__dirname, "text.txt");
const stream = fs.createWriteStream(filePath);
const rl = readline.createInterface({ input, output });

rl.write("Please enter any text! (for exit enter 'exit' or use exit hotkey)\n");

rl.on("line", (text) => {
    if (text === "exit") process.exit();
    stream.write(`${text}\n`);
});

process.on("exit", (code) => {
    if (code === 0) console.log("Process exit, the text has been written to a file");
});
