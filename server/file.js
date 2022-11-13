const DEBUG = true;

const $ = require("./models/file.js");
const fs = require("fs");
const path = require("path");

//cleanup temp file
function removeTempFileFromDB() {
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

	// if (DEBUG && source.indexOf("/doc/") === -1) {
	// 	minify.js(fs.readFileSync(source), (err, data) => {
	// 		fs.writeFileSync(targetFile, data);
	// 	});
	// } else {
	fs.writeFileSync(targetFile, fs.readFileSync(source));
	// }
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
	removeTempFileFromDB();
	console.info("Complete remove tmp file and folder");

	//delete lib from client
	fs.rmSync("./client/cl", { recursive: true, force: true });
	console.info("Remove client/cl");

	//copy all cl framework into client lib
	fs.mkdir("./client/cl", (err) => {
		fs.mkdir("./client/cl/js", (err) => {
			copyFolderRecursiveSync("./source/cl/js", "./client/cl");
			console.info("Copy source/cl/js into client/cl/js");

			// read css then combine
			fs.readdir("./source/cl/css", (err, files) => {
				let str = "";
				files.forEach((file) => {
					str += fs.readFileSync(`./source/cl/css/${file}`);
				});

				fs.mkdir("./client/cl/css", (err) => {
					// if (DEBUG) {
					// 	minify.css(str, (err, data) => {
					// 		if (err) {
					// 			console.error(err);
					// 		} else {
					// 			fs.writeFileSync("./client/cl/css/style.css", data);
					// 			console.info("Combine css file");
					// 		}
					// 	});
					// } else {
					fs.writeFileSync("./client/cl/css/style.css", str);
					console.info("Combine css file");
					// }
				});
			});
		});
	});
};
