module.exports = function (app) {
	const db = require("../models/file.js");
	const fs = require("fs");
	const multer = require("multer");
	const uploader = multer({ dest: "tmp/" });

	var fn = {
		upload: function (req, res) {
			if (req.files && req.files.length > 0) {
				var files = [];
				req.files.forEach((file) => {
					files.push({
						fieldname: file.fieldname,
						originalname: file.originalname,
						encoding: file.encoding,
						mimetype: file.mimetype,
						destination: file.destination,
						filename: file.filename,
						path: file.path,
						size: file.size,
					});

					//console.info(file);
				});

				// Save a file info in the MongoDB
				db.insertMany(files)
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
		download: function (req, res) {
			db.findOne({ _id: req.params.id })
				.then((data) => {
					if (data) {
						fs.access(data.path, fs.constants.R_OK, (err) => {
							if (!err) {
								res.writeHead(200, {
									"Content-Disposition": `attachment; filename=${data.originalname}`,
									"Content-Type": data.mimetype,
									"Content-Length": data.size,
									"Cache-Control": "public, max-age=604800, immutable",
								});

								var filestream = fs.createReadStream(data.path);

								filestream.pipe(res);
							} else {
								res.status(404).send("Not found");
							}
						});
					} else {
						res.status(404).send("Not found");
					}
				})
				.catch((err) => {
					//console.error(err);
					res.status(500).send(err);
				});
		},
		info: function (req, res) {
			var i = req.params.id.split(",");
			var p = [];
			i.forEach((id) => {
				p.push(
					new Promise((res, _rej) => {
						db.findOne({ _id: id })
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
		delete: function (req, res) {
			var i = req.params.id.split(",");
			var p = [];
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
		save: function (req, res) {
			var i = req.params.id.split(",");
			var p = [];
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
		deleteuploadedfile: function (id) {
			// Find file in db then delete the original file from tmp or file

			return new Promise((res, _rej) => {
				db.findOne({ _id: id })
					.then((data) => {
						if (data) {
							//move file to deleted dir
							fn.fs_unlink(data.path)
								.then(() => {
									// Find file and remove it
									db.findByIdAndRemove({ _id: id })
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
		saveuploadedfile: function (id) {
			// Find file in db then move the original file from tmp to file

			return new Promise((res, _rej) => {
				db.findOne({ _id: id })
					.then((data) => {
						if (data) {
							if (data.destination === "tmp/") {
								//move file to file dir
								fn.fs_move(data.path, `file/${data.filename}`)
									.then(function () {
										// Find file and update it
										db.findOneAndUpdate(
											{ _id: id },
											{
												destination: "file/",
												path: `file/${data.filename}`,
											},
											{ new: false }
										)
											.then((data) => {
												if (data) {
													res({ id: id, result: true });
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
		fs_move: function (oldPath, newPath) {
			return new Promise((res, rej) => {
				fs.rename(oldPath, newPath, function (err) {
					if (err) {
						if (err.code === "EXDEV") {
							var readStream = fs.createReadStream(oldPath);
							var writeStream = fs.createWriteStream(newPath);

							readStream.on("error", rej);
							writeStream.on("error", rej);

							readStream.on("close", function () {
								fs.unlink(oldPath, (err) => {
									if (err) {
										rej(err);
									} else {
										res();
									}
								});
							});

							readStream.pipe(writeStream);
						} else {
							rej(err);
						}
					}
					res();
				});
			});
		},
		fs_unlink: function (path) {
			return new Promise((res, rej) => {
				fs.unlink(path, (err) => {
					if (err) {
						rej(err);
					} else {
						res();
					}
				});
			});
		},
	};

	//upload file
	app.post("/api/file", uploader.array("file"), fn.upload);

	//download file
	app.get("/api/file/:id", fn.download);

	//download file info
	app.get("/api/file-info/:id", fn.info);

	//save file
	//move from tmp to upload
	app.put("/api/file/:id", fn.save);

	//delete file
	//move from tmp or file to deleted
	app.delete("/api/file/:id", fn.delete);
};