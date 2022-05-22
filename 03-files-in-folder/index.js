const { readdir } = require("fs/promises");
const fs = require("fs");
const path = require("path");

const dirPath = path.join(__dirname, "secret-folder");

readdir(dirPath, { withFileTypes: true }).then((files) => {
    files.forEach((file) => {
        const filePath = path.join(dirPath, file.name);
        fs.stat(filePath, (err, stats) => {
            if (!stats.isDirectory()) {
                const fileName = path.basename(file.name, path.extname(file.name));
                const fileExt = path.extname(filePath).slice(1);
                const fileSize = stats.size / 1000;
                console.log(`${fileName} - ${fileExt} - ${fileSize}kb`);
            }
        });
    });
});
