const { mkdir, readdir, copyFile } = require("fs/promises");
const { unlink } = require("fs");
const path = require("path");

const srcPath = path.join(__dirname, "files");
const distPath = path.join(__dirname, "files-copy");

mkdir(distPath, { recursive: true });

readdir(distPath, { withFileTypes: true }).then((files) => {
    files.forEach((file) => {
        const filePath = path.join(distPath, file.name);
        unlink(filePath, () => {});
    });
});

readdir(srcPath, { withFileTypes: true }).then((files) => {
    files.forEach((file) => {
        const srcFilePath = path.join(srcPath, file.name);
        const distFilePath = path.join(distPath, file.name);
        copyFile(srcFilePath, distFilePath);
    });
});
