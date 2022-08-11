const $ = require("./models/file.js");
const fs = require("fs");
const path = require("path");

//cleanup temp file
function cleanuptmpfile() {
	$.db
		.find({ saved: { $eq: false } })
		.then((data) => {
			data.forEach((item) => {
				$.db.findByIdAndRemove({ _id: item.id }).then((data) => {
					console.log(`Remove tmp file ${item.id} from db`);
				});
			});
		})
		.catch((err) => {
			console.error(err);
		});
}

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
		files.forEach((file) => {
			var curSource = path.join(source, file);
			if (fs.lstatSync(curSource).isDirectory()) {
				copyFolderRecursiveSync(curSource, targetFolder);
			} else {
				copyFileSync(curSource, targetFolder);
			}
		});
	}
}

module.exports = () => {
	//delete tmp folder
	fs.rmSync("./tmp", { recursive: true, force: true });

	cleanuptmpfile();
	console.info("Remove tmp file and folder");

	//delete dist
	fs.rmSync("./docs/dist", { recursive: true, force: true });

	console.info("Remove docs/dist");

	//copy all jsfile into dist
	fs.mkdir("./docs/dist", (err) => {
		fs.mkdir("./docs/dist/js", (err) => {
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
		});
	});
};
