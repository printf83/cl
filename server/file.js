//---------------------------------
// PACKAGE SOURCE MANNUALY
//---------------------------------

const USINGWEBPACK = false;
const DEBUG = true;

const $ = require("./models/file.js");
const fs = require("fs");
// const path = require("path");

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

// //function to copy
// function copyFileSync(source, target) {
// 	var targetFile = target;

// 	// If target is a directory, a new file with the same name will be created
// 	if (fs.existsSync(target)) {
// 		if (fs.lstatSync(target).isDirectory()) {
// 			targetFile = path.join(target, path.basename(source));
// 		}
// 	}

// 	fs.writeFileSync(targetFile, fs.readFileSync(source));
// }

// function copyFolderRecursiveSync(source, target) {
// 	var files = [];

// 	// Check if folder needs to be created or integrated
// 	var targetFolder = path.join(target, path.basename(source));
// 	if (!fs.existsSync(targetFolder)) {
// 		fs.mkdirSync(targetFolder);
// 	}

// 	// Copy
// 	if (fs.lstatSync(source).isDirectory()) {
// 		files = fs.readdirSync(source);
// 		files.forEach((file) => {
// 			var curSource = path.join(source, file);
// 			if (fs.lstatSync(curSource).isDirectory()) {
// 				copyFolderRecursiveSync(curSource, targetFolder);
// 			} else {
// 				copyFileSync(curSource, targetFolder);
// 			}
// 		});
// 	}
// }

module.exports = () => {
	//delete tmp folder
	fs.rmSync("./tmp", { recursive: true, force: true });
	removeTempFileFromDB();
	fs.mkdirSync("./tmp");
	console.info("Complete remove tmp file and folder");

	// //delete lib from client
	// fs.rmSync("./client/src/cl", { recursive: true, force: true });
	// console.info("Remove client/src/cl");

	// //copy all cl framework into client lib
	// fs.mkdir("./client/src", (err) => {
	// 	fs.mkdir("./client/src/cl", (err) => {
	// 		copyFileSync("./source/cl/all.js", "./client/src/cl/all.js");
	// 		console.info("Copy source/cl/all.js into client/src/cl/all.js");

	// 		copyFolderRecursiveSync("./source/cl/base", "./client/src/cl");
	// 		console.info("Copy source/cl/base into client/src/cl/base");

	// 		// copyFolderRecursiveSync("./source/cl/css", "./client/css");
	// 		// console.info("Copy source/cl/css into client/css/cl");

	// 		// read css then combine
	// 		// fs.readdir("./source/cl/css", (err, files) => {
	// 		// 	let str = "";
	// 		// 	files.forEach((file) => {
	// 		// 		str += fs.readFileSync(`./source/cl/css/${file}`);
	// 		// 	});

	// 		// 	fs.mkdir("./client/css", (err) => {
	// 		// 		fs.mkdir("./client/css/cl", (err) => {
	// 		// 			fs.writeFileSync("./client/css/cl/style.css", str);
	// 		// 			console.info("Combine css file");
	// 		// 		});
	// 		// 	});
	// 		// });
	// 	});
	// });
};
