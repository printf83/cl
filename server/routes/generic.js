const core = require(`../core.js`);
const { Readable } = require("stream");

module.exports = (app, dbname, setting) => {
	console.log(`Setup ${dbname} db`);

	const $ = require(`../models/${dbname}.js`);

	const fn = {
		/**
		 * use to create excel file
		 */
		colName(n) {
			let ordA = "A".charCodeAt(0);
			let ordZ = "Z".charCodeAt(0);
			let len = ordZ - ordA + 1;

			let s = "";
			while (n >= 0) {
				s = String.fromCharCode((n % len) + ordA) + s;
				n = Math.floor(n / len) - 1;
			}
			return s;
		},
		/**
		 * get list of data in excel format (for download)
		 */
		excel: (req, res) => {
			try {
				let q = req.query.q ? JSON.parse(req.query.q) : null;

				let d = $.db.find(q?.filter ? q.filter : null, q?.field ? q.field : null);
				d.collation({ locale: "en" });
				d.sort(q?.sort ? q.sort : null);

				//not need to crop list
				//d.skip(qs.skip ? qs.skip : null);
				//d.limit(qs.limit ? qs.limit : null);

				d.then((tmp) => {
					if (tmp) {
						//convert data to json and back to array
						let data = JSON.parse(JSON.stringify(tmp));

						//generate excel
						const exceljs = require("exceljs");
						const wb = new exceljs.Workbook();

						wb.calcProperties.fullCalcOnLoad = true;

						const ws = wb.addWorksheet("Sheet 1", {
							pageSetup: {
								paperSize: 9,
								orientation: "landscape",
								fitToPage: true,
								fitToHeight: 0,
								printTitlesRow: "1:1",
								margin: {
									left: 0.1,
									right: 0.1,
									top: 0.1,
									bottom: 0.1,
									header: 0.0,
									footer: 0.0,
								},
							},
						});

						//populate data into excel
						if (data && data.length > 0) {
							let keys = Object.keys(data[0]);
							keys.forEach((i, colIndex) => {
								let col = fn.colName(colIndex);
								ws.getCell(col + "1").value = i;
								data.forEach((j, rowIndex) => {
									ws.getCell(col + (rowIndex + 2)).value = j[i];
								});
							});
						}

						//row header
						ws.getRow(1).font = { bold: true };

						//auto width column
						ws.columns.forEach((column, i) => {
							let maxLength = 0;
							column["eachCell"]({ includeEmpty: true }, (cell) => {
								let columnLength = cell.value ? cell.value.toString().length + 2 : 10;
								if (columnLength > maxLength) {
									maxLength = columnLength;
								}
							});
							column.width = maxLength < 10 ? 10 : maxLength;
						});

						//save file into buffer and return promise
						return wb.xlsx.writeBuffer();
					} else {
						res.send(null);
					}
				})
					.then((buffer) => {
						if (buffer) {
							//send file
							let strFileName = `${new Date().toISOString().replace(/[^0-9]/g, "")}`;
							const stream = Readable.from(buffer);

							res.setHeader("Content-Disposition", `inline; filename=${strFileName}`);
							res.setHeader(
								"Content-Type",
								"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
							);
							res.setHeader("Content-Length", buffer.length);
							res.setHeader("Cache-Control", "public, max-age=604800, immutable");

							stream.pipe(res);

							// console.log(`Sending file ${strFileName}`);
						} else {
							res.status(404).send("Not found");
						}
					})
					.catch((err) => {
						res.status(500).send(err.message);
					});
			} catch (err) {
				res.status(500).send(err.message);
			}
		},

		/**
		 * get list of data
		 */
		list: (req, res) => {
			try {
				let q = req.body;
				$.db
					.aggregate(
						[
							q.filter ? { $match: q.filter } : null,
							q.sort ? { $sort: q.sort } : null,
							q.field ? { $project: q.field } : null,
							{
								$facet: {
									data: [
										q.skip ? { $skip: q.skip } : null,
										q.limit ? { $limit: q.limit } : null,
									].filter(Boolean),
									total: [{ $count: "count" }],
								},
							},
						].filter(Boolean)
					)
					.then((data) => {
						let t = JSON.parse(JSON.stringify(data));
						res.send({
							data: t[0].data,
							total: t[0].total.length > 0 ? t[0].total[0].count : 0,
						});
					})
					.catch((err) => {
						res.status(500).send(err.message);
					});
			} catch (err) {
				res.status(500).send(err.message);
			}
		},
		/**
		 * get count of data
		 */
		aggregate: (req, res) => {
			try {
				let d;
				if (req.body.pipe) {
					if (req.body.opt) {
						d = $.db.aggregate(req.body.pipe, req.body.opt);
					} else {
						d = $.db.aggregate(req.body.pipe);
					}
				} else {
					if (req.body.opt) {
						d = $.db.aggregate(null, req.body.opt);
					} else {
						d = $.db.aggregate();
					}
				}

				d.then((data) => {
					if (data) {
						if (data.length === 1) {
							res.send(data[0]);
						} else {
							res.send(data);
						}
					} else {
						res.send(null);
					}
				}).catch((err) => {
					//console.error(err);
					res.status(500).send(err.message);
				});
			} catch (err) {
				//console.error(err);
				res.status(500).send(err.message);
			}
		},
		/**
		 * create new record
		 * can create multiple or single record
		 * single record not have only object in req.body
		 * multiple record not have array of object in req.body
		 * example single 	: req.body = {object}
		 * example multiple : req.body = [{object1},{object2},{object3}]
		 * single create return one record id, example : id1
		 * multiple create return array of record id, example : [id1,id2,id3]
		 */
		create: (req, res) => {
			let i = req.body;
			if (i) {
				if (!Array.isArray(i)) {
					//handle single
					fn.createOne(i)
						.then((result) => {
							if (typeof result === "object") {
								res.send(result.id);
							} else if (result === "Not found") {
								res.status(404).send("Not found");
							} else {
								res.status(500).send(result);
							}
						})
						.catch((err) => {
							res.status(500).send(err);
						});
				} else {
					//handle multiple
					let p = [];
					i.forEach((data) => {
						p.push(fn.createOne(data));
					});

					Promise.all(p)
						.then((result) => {
							res.send(
								result.map((item) => (typeof item.result === "object" ? item.id : null)).filter(Boolean)
							);
						})
						.catch((err) => {
							res.status(500).send(err);
						});
				}
			} else {
				res.status(500).send("Please provide data");
			}
		},
		/**
		 * find record
		 * can find multiple or single record
		 * single record not have "," on params.id (example : id1)
		 * multiple record must have "," on params.id (example : id1,id2,id3)
		 * example single 	: HTTP-GET api/controller/id
		 * example multiple : HTTP-GET api/controller/id1,id2,id3
		 * single find return one record, example : record1
		 * multiple find return array of record, example : [record1,record2,record3]
		 */
		find: (req, res) => {
			let i = req.params.id.split(",");
			if (i && i.length > 0) {
				if (i.length === 1) {
					//handle single
					fn.findOne(i[0])
						.then((item) => {
							if (typeof item.result === "object") {
								res.status(200).send(item.result);
							} else if (item.result === "Not found") {
								res.status(404).send("Not found");
							} else {
								res.status(500).send(item.result);
							}
						})
						.catch((err) => {
							//console.error(err);
							res.status(500).send(err);
						});
				} else {
					//handle multiple
					let p = [];
					i.forEach((id) => {
						p.push(fn.findOne(id));
					});

					Promise.all(p)
						.then((result) => {
							res.send(
								result
									.map((item) => (typeof item.result === "object" ? item.result : null))
									.filter(Boolean)
							);
						})
						.catch((err) => {
							//console.error(err);
							res.status(500).send(err);
						});
				}
			} else {
				res.status(500).send("Please provide ID");
			}
		},
		/**
		 * update record
		 * can update multiple or single record
		 * single record not have "," on params.id (example : id1)
		 * multiple record must have "," on params.id (example : id1,id2,id3)
		 * data must be pass using req.body
		 * example single 	: HTTP-PUT api/controller/id
		 * example multiple : HTTP-PUT api/controller/id1,id2,id3
		 * single update return id updated record, example : id1
		 * multiple update return array of id updated record, example : [id1,id2,id3]
		 */
		update: (req, res) => {
			let i = req.params.id.split(",");
			if (i && i.length > 0) {
				if (i.length === 1) {
					//handle single
					fn.updateOne(i[0], req.body)
						.then((item) => {
							if (item.result === true) {
								res.send(i[0]);
							} else if (item.result === "Not found") {
								res.status(404).send("Not found");
							} else {
								res.status(500).send(item.result);
							}
						})
						.catch((err) => {
							res.status(500).send(err);
						});
				} else {
					//handle multiple
					let p = [];
					i.forEach((id) => {
						p.push(fn.updateOne(id, req.body));
					});

					Promise.all(p)
						.then((result) => {
							res.send(result.map((item) => (item.result === true ? item.id : null)).filter(Boolean));
						})
						.catch((err) => {
							res.status(500).send(err);
						});
				}
			} else {
				res.status(500).send("Please provide ID");
			}
		},
		/**
		 * delete record
		 * can delete multiple or single record
		 * single record not have "," on params.id (example : id1)
		 * multiple record must have "," on params id (example : id1,id2,id3)
		 * example single 	: HTTP-DELETE api/controller/id
		 * example multiple : HTTP-DELETE api/controller/id1,id2,id3
		 * single delete return id deleted record, example : id1
		 * multiple delete return array of id deleted record, example : [id1,id2,id3]
		 */
		delete: (req, res) => {
			let i = req.params.id.split(",");
			if (i && i.length > 0) {
				if (i.length === 1) {
					//handle single
					fn.deleteOne(i[0])
						.then((item) => {
							if (item.result === true) {
								res.send(i[0]);
							} else if (item.result === "Not found") {
								res.status(404).send("Not found");
							} else {
								res.status(500).send(item.result);
							}
						})
						.catch((err) => {
							res.status(500).send(err);
						});
				} else {
					//handle multiple
					let p = [];
					i.forEach((id) => {
						p.push(fn.deleteOne(id));
					});

					Promise.all(p)
						.then((result) => {
							res.send(result.map((item) => (item.result === true ? item.id : null)).filter(Boolean));
						})
						.catch((err) => {
							res.status(500).send(err);
						});
				}
			} else {
				res.status(500).send("Please provide ID");
			}
		},
		/**
		 * basic function to make ONE operation
		 * create, find, update, delete
		 * all function return PROMISE
		 */
		createOne: (data) => {
			return new Promise((res, rej) => {
				if (data) {
					// create a new record
					const item = new $.db(data);

					// save into mongodb
					item.save()
						.then((data) => {
							if (data) {
								//send {record} if record created
								res(data);
							} else {
								//send "Operation fail" message if record cannot be created
								res("Operation fail");
							}
						})
						.catch((err) => {
							//send error message if something wrong happend
							res(err.message);
						});
				} else {
					rej("Please provide DATA");
				}
			});
		},
		/**
		 * get one record
		 * @param {string} id record id that need to get
		 * if success 	: {id: id, result: object (record)}
		 * if fail 		: {id: id, result: error message}
		 */
		findOne: (id) => {
			return new Promise((res, rej) => {
				try {
					if (id) {
						$.db
							.findById(id)
							.then((data) => {
								if (data) {
									//send {id:record} if found
									res({ id: id, result: data });
								} else {
									//send {id:"Not found"} if not found
									res({ id: id, result: "Not found" });
								}
							})
							.catch((err) => {
								//send {id: id, result: "Error Message"} if something wrong
								res({ id: id, result: err.message });
							});
					} else {
						rej("Please provide ID");
					}
				} catch (err) {
					rej(err);
				}
			});
		},
		/**
		 * update one record
		 * @param {string} id record id that need to change
		 * @param {object} data that need to change (you may no need to send unchange data)
		 * if success 	: {id: id, result: true}
		 * if fail 		: {id: id, result: error message}
		 */
		updateOne: (id, data) => {
			return new Promise((res, rej) => {
				if (id && data) {
					$.db
						.findByIdAndUpdate(id, data)
						.then((data) => {
							if (data) {
								//send {id: id, result: true} if updated
								res({ id: id, result: true });
							} else {
								//send {id: id, result: "Not found"} if not found
								res({ id: id, result: "Not found" });
							}
						})
						.catch((err) => {
							//send {id: id, result: "Error Message"} if something wrong
							res({ id: id, result: err.message });
						});
				} else {
					rej("Please provide ID and DATA");
				}
			});
		},
		/**
		 * delete record
		 * @param {string} id record id in db
		 * if success 	: {id: id, result: true}
		 * if fail 		: {id: id, result: "error message"}
		 */
		deleteOne: (id) => {
			return new Promise((res, rej) => {
				if (id) {
					$.db
						.findByIdAndRemove(id)
						.then((success) => {
							if (success) {
								//send {id: id, result: true} if deleted
								res({ id: id, result: true });
							} else {
								//send {id: id, result: "Operation fail"} if found but cannot delete
								res({ id: id, result: "Operation fail" });
							}
						})
						.catch((err) => {
							//send {id: id, result: "Error Message"} if something wrong
							res({ id: id, result: err.message });
						});
				} else {
					rej("Please provide ID");
				}
			});
		},
	};

	setting = core.extend(
		{},
		{
			create: "auth",
			find: true,
			update: "auth",
			delete: "auth",
			list: true,
			excel: false,
			aggregate: false,
		},
		setting
	);

	// Create a new record
	if (setting.create) {
		if (setting.create === "auth") {
			app.post(`/api/${dbname}`, core.auth, fn.create);
		} else {
			app.post(`/api/${dbname}`, fn.create);
		}
	}

	// Retrieve a single record by Id
	if (setting.find) {
		if (setting.find === "auth") {
			app.get(`/api/${dbname}/:id`, core.auth, fn.find);
		} else {
			app.get(`/api/${dbname}/:id`, fn.find);
		}
	}

	// Update a record with Id
	if (setting.update) {
		if (setting.update === "auth") {
			app.put(`/api/${dbname}/:id`, core.auth, fn.update);
		} else {
			app.put(`/api/${dbname}/:id`, fn.update);
		}
	}

	// Delete a record with Id
	if (setting.delete) {
		if (setting.delete === "auth") {
			app.delete(`/api/${dbname}/:id`, core.auth, fn.delete);
		} else {
			app.delete(`/api/${dbname}/:id`, fn.delete);
		}
	}

	// Get list of record
	if (setting.list) {
		if (setting.list === "auth") {
			app.post(`/api/${dbname}-list`, core.auth, fn.list);
		} else {
			app.post(`/api/${dbname}-list`, fn.list);
		}
	}

	// Get list of record in excel
	if (setting.excel) {
		if (setting.excel === "auth") {
			app.get(`/api/${dbname}-excel`, core.auth, fn.excel);
		} else {
			app.get(`/api/${dbname}-excel`, fn.excel);
		}
	}

	// Get COUNT or SUM of record
	if (setting.aggregate) {
		if (setting.aggregate === "auth") {
			app.post(`/api/${dbname}-aggregate`, core.auth, fn.aggregate);
		} else {
			app.post(`/api/${dbname}-aggregate`, fn.aggregate);
		}
	}
};
