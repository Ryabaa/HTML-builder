const { readdir, mkdir, copyFile } = require("fs/promises");
const fs = require("fs");
const path = require("path");

const stylesPath = path.join(__dirname, "styles");
const templatePath = path.join(__dirname, "template.html");
const componentsPath = path.join(__dirname, "components");
const assetsPath = path.join(__dirname, "assets");
const distPath = path.join(__dirname, "project-dist");
const bundleCssPath = path.join(distPath, "style.css");
const bundleHtmlPath = path.join(distPath, "template.html");

mkdir(distPath, { recursive: true });

const stylesWritableStream = fs.createWriteStream(bundleCssPath);

readdir(stylesPath, { withFileTypes: true }).then((files) => {
    files.forEach((file) => {
        const filePath = path.join(stylesPath, file.name);
        const fileExt = path.extname(filePath).slice(1);
        if (fileExt === "css") {
            const stylesReadableStream = fs.createReadStream(filePath);
            stylesReadableStream.on("data", (chunk) => {
                const fileData = `${chunk.toString()}\n`;
                stylesWritableStream.write(fileData);
            });
        }
    });
});

const templateReadableStream = fs.createReadStream(templatePath);
const htmlWriteableStream = fs.createWriteStream(bundleHtmlPath);

readdir(componentsPath, { withFileTypes: true }).then((files) => {
    files.forEach((file) => {
        const filePath = path.join(componentsPath, file.name);
        const fileExt = path.extname(filePath).slice(1);
        const fileBaseName = path.basename(file.name, path.extname(file.name));

        if (fileExt === "html") {
            const componentReadableStream = fs.createReadStream(filePath);
            templateReadableStream.on("data", (chunk) => {
                componentReadableStream.on("data", (section) => {
                    let fileData = chunk.toString();
                    let a = fileData.replace(`{{${fileBaseName}}}`, section.toString());
                    htmlWriteableStream.write(a);
                });
            });
        }
    });
});

function copyAssets(assetsPath, distPath) {
    readdir(assetsPath, { withFileTypes: true }).then((files) => {
        files.forEach((file) => {
            const filePath = path.join(assetsPath, file.name);
            const distAssetsPath = path.join(distPath, "assets", file.name);
            const distFilePath2 = path.join(distPath, file.name);
            fs.stat(filePath, (err, stats) => {
                if (!stats.isDirectory()) {
                    copyFile(filePath, distFilePath2);
                } else {
                    mkdir(distAssetsPath, { recursive: true }).then(() => {
                        copyAssets(filePath, distAssetsPath);
                    });
                }
            });
        });
    });
}

copyAssets(assetsPath, distPath);
