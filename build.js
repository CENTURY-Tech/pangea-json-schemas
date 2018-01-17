// import { compile, compileFromFile } from "json-schema-to-typescript";
const compileFromFile = require("json-schema-to-typescript").compileFromFile;
const fs = require("fs");

// prep dir
const dir = process.env.OUT_PATH;
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

const rootPath = process.env.ROOT_PATH;
scanForFilesToCompile(rootPath, dir);

function scanForFilesToCompile(inPath, outPath) {
  const filesOrDirs = fs.readdir(inPath, (err, filesOrFolders) => {
    filesOrFolders.forEach((fileOrFolder) => {
      const newPath = `${inPath}/${fileOrFolder}`;
      fs.stat(newPath, (err, result) => {
        if (result.isDirectory()) {
          return scanForFilesToCompile(newPath, `${outPath}/${fileOrFolder}`);
        }
        if (newPath.split(".")[2] === "json") {
          return compileFromFile(newPath)
            .then((ts) => {
              const outPut = `namespace Ctek {\r\n\r\n${ts}\r\n}`;
              fs.writeFileSync(`${outPath}/${fileOrFolder.split(".")[0]}.d.ts`, outPut)
            });
        }
      });
    });
  });
}
