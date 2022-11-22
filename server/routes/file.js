const $ = require("../models/file.js");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const uploader = multer({ dest: "./tmp/" });
const core = require(`../core.js`);
const { Readable } = require("stream");

module.exports = (app, setting) => {
	console.log(`Setup file db`);

	const fn = {
		upload: (req, res) => {
			if (req.files && req.files.length > 0) {
				let files = [];
				req.files.forEach((file) => {
					let data = fs.readFileSync(path.join(__dirname, `../../${file.path}`));
					// let encodeData = data.toString("base64");

					files.push({
						fieldname: file.fieldname,
						originalname: file.originalname,
						encoding: file.encoding,
						mimetype: file.mimetype,
						saved: false,
						filename: file.filename,
						size: file.size,
						data: data,
					});

					//console.info(file);
				});

				// Save a file info in the MongoDB
				$.db
					.insertMany(files)
					.then((data) => {
						res.send(
							data.map((item) => {
								return item._id;
							})
						);
					})
					.catch((err) => {
						//console.error(err);
						res.status(500).send(err);
					});
			}
		},
		download: (req, res) => {
			$.db
				.findOne({ _id: req.params.id })
				.then((data) => {
					if (data) {
						if (data.data) {
							const stream = Readable.from(data.data);

							res.setHeader("Content-Disposition", `inline; filename=${data.originalname}`);
							res.setHeader("Content-Type", `${data.mimetype}`);
							res.setHeader("Content-Length", data.data.length);
							res.setHeader("Cache-Control", "public, max-age=604800, immutable");

							stream.pipe(res);

							console.log(`Sending file ${data.id}`);
						} else {
							res.status(404).send("Not found");
						}
					} else {
						res.status(404).send("Not found");
					}
				})
				.catch((err) => {
					//console.error(err);
					res.status(500).send(err);
				});
		},
		info: (req, res) => {
			let i = req.params.id.split(",");
			let p = [];
			i.forEach((id) => {
				p.push(
					new Promise((res, _rej) => {
						$.db
							.findOne({ _id: id })
							.then((data) => {
								if (data) {
									res({
										id: data._id,
										result: true,
										filename: data.originalname,
										mimetype: data.mimetype,
										size: data.size,
									});
								} else {
									res({
										id: id,
										result: "Not found",
									});
								}
							})
							.catch((err) => {
								//console.error(err);
								res({
									id: id,
									result: err.message,
								});
							});
					})
				);
			});

			Promise.all(p)
				.then((result) => {
					res.send(
						result
							.map((item) => {
								if (item.result === true) {
									return {
										id: item.id,
										filename: item.filename,
										mimetype: item.mimetype,
										size: item.size,
									};
								} else {
									return null;
								}
							})
							.filter(Boolean)
					);
				})
				.catch((err) => {
					//console.error(err);
					res.status(500).send(err);
				});
		},
		duplicate: (req, res) => {
			let i = req.params.id.split(",");
			let p = [];
			i.forEach((id) => {
				p.push(fn.duplicateuploadedfile(id));
			});

			Promise.all(p)
				.then((result) => {
					res.send(
						result
							.map((item) => {
								if (item.result === true) {
									return item.id;
								} else {
									return null;
								}
							})
							.filter(Boolean)
					);
				})
				.catch((err) => {
					//console.error(err);
					res.status(500).send(err);
				});
		},
		delete: (req, res) => {
			let i = req.params.id.split(",");
			let p = [];
			i.forEach((id) => {
				p.push(fn.deleteuploadedfile(id));
			});

			Promise.all(p)
				.then((result) => {
					res.send(
						result
							.map((item) => {
								if (item.result === true) {
									return item.id;
								} else {
									return null;
								}
							})
							.filter(Boolean)
					);
				})
				.catch((err) => {
					//console.error(err);
					res.status(500).send(err);
				});
		},
		save: (req, res) => {
			let i = req.params.id.split(",");
			let p = [];
			i.forEach((id) => {
				p.push(fn.saveuploadedfile(id));
			});

			Promise.all(p)
				.then((result) => {
					res.send(
						result
							.map((item) => {
								if (item.result === true) {
									return item.id;
								} else {
									return null;
								}
							})
							.filter(Boolean)
					);
				})
				.catch((err) => {
					//console.error(err);
					res.status(500).send(err);
				});
		},
		deleteuploadedfile: (id) => {
			// Find file in db then delete the original file from tmp or file

			return new Promise((res, _rej) => {
				$.db
					.findOne({ _id: id })
					.then((data) => {
						if (data) {
							// Find file and remove it
							$.db
								.findByIdAndRemove({ _id: id })
								.then((data) => {
									if (data) {
										res({ id: id, result: true });
									} else {
										res({
											id: id,
											result: "Operation fail",
										});
									}
								})
								.catch((err) => {
									res({ id: id, result: err.message });
								});
						} else {
							res({ id: id, result: "Not found" });
						}
					})
					.catch((err) => {
						res({ id: id, result: err.message });
					});
			});
		},
		saveuploadedfile: (id) => {
			// Find file in db then move the original file from tmp to file

			return new Promise((res, rej) => {
				$.db
					.findOne({ _id: id })
					.then((data) => {
						if (data) {
							if (!data.saved) {
								//create file dir if not exists

								// Find file and update it
								$.db
									.findOneAndUpdate(
										{ _id: id },
										{
											saved: true,
										},
										{ new: false }
									)
									.then((data) => {
										if (data) {
											res({ id: data.id, result: true });
										} else {
											rej({
												id: id,
												result: "Operation fail",
											});
										}
									})
									.catch((err) => {
										rej({ id: id, result: err.message });
									});
							} else {
								res({ id: id, result: true });
							}
						} else {
							rej({ id: id, result: "Not found" });
						}
					})
					.catch((err) => {
						rej({ id: id, result: err.message });
					});
			});
		},
		duplicateuploadedfile: (id) => {
			// Find file in db then move the original file from tmp to file

			return new Promise((res, rej) => {
				$.db
					.findOne({ _id: id })
					.then((data) => {
						if (data) {
							$.db
								.create({
									fieldname: data.fieldname,
									originalname: data.originalname,
									encoding: data.encoding,
									mimetype: data.mimetype,
									saved: false,
									filename: data.filename,
									size: data.size,
									data: data.data,
								})
								.then((data) => {
									res({ id: data._id, result: true });
								})
								.catch((err) => {
									rej({ id: id, result: err.message });
								});
						} else {
							rej({ id: id, result: "Not found" });
						}
					})
					.catch((err) => {
						rej({ id: id, result: err.message });
					});
			});
		},
	};

	setting = core.extend(
		{},
		{
			upload: "auth",
			download: true,
			info: true,
			duplicate: "auth",
			save: "auth",
			delete: "auth",
		},
		setting
	);

	//upload file
	if (setting.upload) {
		if (setting.upload === "auth") {
			app.post("/api/file", core.auth, uploader.array("file"), fn.upload);
		} else {
			app.post("/api/file", uploader.array("file"), fn.upload);
		}
	}

	//download file
	if (setting.download) {
		if (setting.download === "auth") {
			app.get("/api/file/:id", core.auth, fn.download);
		} else {
			app.get("/api/file/:id", fn.download);
		}
	}

	//download file info
	if (setting.info) {
		if (setting.info === "auth") {
			app.get("/api/file-info/:id", core.auth, fn.info);
		} else {
			app.get("/api/file-info/:id", fn.info);
		}
	}

	//duplicate file
	if (setting.duplicate) {
		if (setting.info === "auth") {
			app.get("/api/file-duplicate/:id", core.auth, fn.duplicate);
		} else {
			app.get("/api/file-duplicate/:id", fn.duplicate);
		}
	}

	//save file
	//move from tmp to upload
	if (setting.save) {
		if (setting.save === "auth") {
			app.put("/api/file/:id", core.auth, fn.save);
		} else {
			app.put("/api/file/:id", fn.save);
		}
	}

	//delete file
	//move from tmp or file to deleted
	if (setting.delete) {
		if (setting.delete === "auth") {
			app.delete("/api/file/:id", core.auth, fn.delete);
		} else {
			app.delete("/api/file/:id", fn.delete);
		}
	}
};
