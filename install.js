var fs = require("fs");
var path = require("path");

// Helper function that copies all files within a directory file by file,.
// Main functionality it to merge the contents of two folders in the same destination location.
function copyFolderContents(src, dst, includeDir = true, filter = (file) => true ) {
  fs.readdir(`${src}`, {withFileTypes: true}, (err, entries) => {
    if (err) {
      console.error(err);
      return;
    }

    entries.forEach(entry => {
      if (entry.isDirectory()) {
        if (!includeDir) {
          return;
        }

        if (filter(entry.name)) {
          if (!fs.existsSync(`${dst}/${entry.name}`)){
            fs.mkdirSync(`${dst}/${entry.name}`);
          }
          copyFolderContents(`${src}/${entry.name}`, `${dst}/${entry.name}`, includeDir, filter);
        }

      } else {
        if (filter(entry.name)) {
          fs.copyFile(`${src}/${entry.name}`, `${dst}/${entry.name}`, (err) => {
            if (err) {
              console.error("FILE", err);
            }
          } )
        }
      }
    });
  })  
}

// Copy the cldr-core supplemental folder.
fs.cp(path.join(process.env.INIT_CWD, "/node_modules/cldr-core/supplemental"), path.join(__dirname, "/supplemental"), {recursive: true}, (err) => {
  if (err) {
    console.error(err);
  }
});

// Copy the cldr-core data json files
copyFolderContents(path.join(process.env.INIT_CWD, "/node_modules/cldr-core"), __dirname, false, (fileName) => fileName.includes(".json") && !fileName.includes("package"));

// Create the merged folder
if (!fs.existsSync(path.join(__dirname, "/main"))){
  fs.mkdirSync(path.join(__dirname, "/main"));
}

// copy the dates and number packages
copyFolderContents(path.join(process.env.INIT_CWD, "/node_modules/cldr-dates-modern/main"), path.join(__dirname, "/main"));
copyFolderContents(path.join(process.env.INIT_CWD, "/node_modules/cldr-numbers-modern/main"), path.join(__dirname, "/main"));