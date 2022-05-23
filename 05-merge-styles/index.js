const { readdir } = require("fs/promises");
const fs = require("fs");
const path = require("path");

const stylesPath = path.join(__dirname, "styles");
const distPath = path.join(__dirname, "project-dist");
const bundleCssPath = path.join(distPath, "bundle.css");

const writableStream = fs.createWriteStream(bundleCssPath);

readdir(stylesPath, { withFileTypes: true }).then((files) => {
    files.forEach((file) => {
        const filePath = path.join(stylesPath, file.name);
        const fileExt = path.extname(filePath).slice(1);
        if (fileExt === "css") {
            const readableStream = fs.createReadStream(filePath);
            readableStream.on("data", (chunk) => {
                const fileData = `${chunk.toString()}\n`;
                writableStream.write(fileData);
            });
        }
    });
});
