const fs = require("fs");
const path = require("path");

//function to copy
function copyFileSync(source, target) {
	var targetFile = target;

	// If target is a directory, a new file with the same name will be created
	if (fs.existsSync(target)) {
		if (fs.lstatSync(target).isDirectory()) {
			targetFile = path.join(target, path.basename(source));
		}
	}

	fs.writeFileSync(targetFile, fs.readFileSync(source));
}

function copyFolderRecursiveSync(source, target) {
	var files = [];

	// Check if folder needs to be created or integrated
	var targetFolder = path.join(target, path.basename(source));
	if (!fs.existsSync(targetFolder)) {
		fs.mkdirSync(targetFolder);
	}

	// Copy
	if (fs.lstatSync(source).isDirectory()) {
		files = fs.readdirSync(source);
		files.forEach(function (file) {
			var curSource = path.join(source, file);
			if (fs.lstatSync(curSource).isDirectory()) {
				copyFolderRecursiveSync(curSource, targetFolder);
			} else {
				copyFileSync(curSource, targetFolder);
			}
		});
	}
}

module.exports = function () {
	//delete tmp folder
	fs.rmSync("./tmp", { recursive: true, force: true });

	//create file folder
	fs.mkdir("./file", (err) => {});
	console.info("Remove tmp folder");

	//delete dist
	fs.rmSync("./docs/dist", { recursive: true, force: true });
	console.info("Remove docs/dist");

	//copy all jsfile into dist
	fs.mkdir("./docs/dist", (err) => {});
	fs.mkdir("./docs/dist/js", (err) => {});

	copyFolderRecursiveSync("./src/js", "./docs/dist");
	console.info("Copy src/js into docs/dist");

	// read css
	fs.readdir("./src/css", (err, files) => {
		let str = "";
		files.forEach((file) => {
			str += fs.readFileSync(`./src/css/${file}`);
		});
		fs.writeFileSync("./docs/dist/style.css", str);

		console.info("Combine css file");
	});
};
