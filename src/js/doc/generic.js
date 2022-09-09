"use strict";
import sample from "./sample.js";
import * as core from "../base/core.js";
import * as db from "../base/api.js";
import codepreview from "../base/codepreview.js";
import ul from "../base/ul.js";
import button from "../base/button.js";
import input from "../base/input.js";
import * as option from "../base/option.js";
import * as dlg from "../base/dlg.js";
import div from "../base/div.js";

export default [
	{
		title: "Generic database",
		msg: "Provide access to the <b>cl generic database</b> to make easy <b>CRUD operations</b> and other tasks easy",
		anchor: false,
	},

	{
		msg: [
			"Please create table using <b>cl generic database</b> in <b>./server-db.js</b>. For this example, we create <b>customer</b> table with this code :",
			new codepreview({
				title: "customer db without setting",
				container: "card",
				code: `
					require("./routes/generic.js")(app, "customer");
			`,
			}),
			new codepreview({
				title: "customer db with setting",
				container: "card",
				code: `
					require("./routes/generic.js")(app, "customer", {
						create: "auth",	 	// require sign in to create new customer
						find: true,		 	// allow find customer without sign in
						update: "auth",	 	// require sign in to update customer
						delete: "auth",	 	// require sign in to delete customer
						list: true,		 	// allow list customer without sign in
						excel: "auth",	 	// require sign in to download customer excel file
						aggregate: false,	// disable aggregate function
					});
			`,
			}),
			"Then we create models for <b>customer</b> table in <b>./models/customer.js</b>",
			new codepreview({
				title: "customer.js",
				container: "card",
				code: `
					const mongoose = require("mongoose");

					const schema = mongoose.Schema({
						name: { type: String, require: true },
						dob: { type: String, require: true },
						phone: { type: String, require: true },
						email: String,
						picture: String,
						state: String,
					});
					const db = mongoose.model("customer", schema);
					module.exports = { db, schema };
			`,
			}),
		],
	},

	{
		title: "Create",
		msg: [
			"Create new record from <b>cl generic database</b> using {{db.api.create}} function. Example :",
			new ul({
				item: [
					"<code>db.api.create(opt,callback)</code>",
					"<code>db.api.create({name:tablename,data:object},callback)</code>",
					"<code>db.api.create({name:tablename,data:[object]},callback)</code>",
				],
			}),
			"This function will return <b>id</b> or <b>array of id</b> on callback if record successfuly created",
			new codepreview({
				container: "card",
				code: `
					db.api.create(
						{
							name: "customer",
							data: {
								name: "Test user",
								dob: "1987-06-05",
								phone: "0123456789",
							},
						},
						(result) => {}
					);
			`,
			}),
		],
	},

	{
		msg: "Live example",
		container: sample.vstackcontainer,
		import: ["button", "input", "db"],
		code: () => {
			let resultOutputId = core.UUID();

			return [
				new button({
					label: "Create record",
					color: "success",
					icon: "floppy-disk",
					onclick: (event) => {
						let sender = event.currentTarget;
						//create record

						//marker
						db.api.create(
							{
								name: "customer",
								data: {
									name: "Test user",
									dob: "1987-06-05",
									phone: "0123456789",
								},
								sender: sender,
							},
							(result) => {
								//result
								document.getElementById(resultOutputId).value = result;
							}
						);
					},
				}),
				new input({ type: "text", label: "Result", id: resultOutputId, copyctl: true }),
			];
		},
	},

	{
		title: "Update",
		msg: [
			"Update existing record from <b>cl generic database</b> using {{db.api.update}} function. Example :",
			new ul({
				item: [
					"<code>db.api.update(opt,callback)</code>",
					"<code>db.api.update({name:tablename,data:object,id:id},callback)</code>",
					"<code>db.api.update({name:tablename,data:object,id:[id]},callback)</code>",
				],
			}),
			"This function will return <b>id</b> or <b>array of id</b> on callback if record successfuly updated",
			new codepreview({
				container: "card",
				code: `
					db.api.update(
						{
							name: "customer",
							data: {
								state: "stateid",
							},
							id: "id",
						},
						(result) => {
						}
					);
			`,
			}),
		],
	},

	{
		msg: "Live example",
		container: sample.vstackcontainer,
		import: ["button", "input", "dlg", "db"],
		code: () => {
			let resultOutputId = core.UUID();

			return [
				new button({
					label: "Update record",
					color: "primary",
					icon: "pen-to-square",
					onclick: (event) => {
						let sender = event.currentTarget;

						//get id
						new dlg.inputbox("text", "ID", (_event, data) => {
							//update record

							//marker
							db.api.update(
								{
									name: "customer",
									data: {
										name: "Test user update",
										phone: "012987654",
										email: "test@test.com",
									},
									id: data.value,
									sender: sender,
								},
								(result) => {
									//result
									document.getElementById(resultOutputId).value = result;
								}
							);
						}).show();
					},
				}),
				new input({ type: "text", label: "Result", id: resultOutputId, copyctl: true }),
			];
		},
	},

	{
		title: "Load",
		msg: [
			"Load existing record from <b>cl generic database</b> using {{db.api.load}} function. Example :",
			new ul({
				item: [
					"<code>db.api.load(opt,callback)</code>",
					"<code>db.api.load({name:tablename,id:id},callback)</code>",
					"<code>db.api.load({name:tablename,id:[id]},callback)</code>",
				],
			}),
			"This function will return <b>object</b> or <b>array of object</b> on callback if record found",
			new codepreview({
				container: "card",
				code: `
					db.api.load(
						{
							name: "customer",
							id: "id",
						},
						(result) => {
						}
					);
			`,
			}),
		],
	},

	{
		msg: "Live example",

		import: ["button", "input", "dlg", "db"],
		code: () => {
			let resultOutputId = core.UUID();

			return [
				new button({
					label: "Load record",
					color: "primary",
					icon: "folder-open",
					onclick: (event) => {
						let sender = event.currentTarget;

						//get id
						new dlg.inputbox("text", "ID", (_event, data) => {
							//get record

							//marker
							db.api.load(
								{
									name: "customer",
									id: data.value,
									sender: sender,
								},
								(result) => {
									//result
									core.replaceWith(
										document.getElementById(resultOutputId),
										new div({
											id: resultOutputId,
											elem: new codepreview({
												title: "Result",
												container: "card",

												maxheight: "10rem",
												code: JSON.stringify(result),
											}),
										})
									);
									PR.prettyPrint();
								}
							);
						}).show();
					},
				}),
				new div({
					id: resultOutputId,
					elem: new codepreview({
						title: "Result",
						container: "card",

						code: `//result`,
					}),
				}),
			];
		},
	},

	{
		title: "Delete",
		msg: [
			"Delete existing record from <b>cl generic database</b> using {{db.api.delete}} function. Example :",
			new ul({
				item: [
					"<code>db.api.delete(opt,callback)</code>",
					"<code>db.api.delete({name:tablename,id:id},callback)</code>",
					"<code>db.api.delete({name:tablename,id:[id]},callback)</code>",
				],
			}),
			"This function will return <b>id</b> or <b>array of id</b> on callback if record found and deleted",
			new codepreview({
				container: "card",
				code: `
					db.api.delete(
						{
							name: "customer",
							id: "id",
						},
						(result) => {
						}
					);
			`,
			}),
		],
	},

	{
		msg: "Live example",
		container: sample.vstackcontainer,
		import: ["button", "input", "dlg", "db"],
		code: () => {
			let resultOutputId = core.UUID();

			return [
				new button({
					label: "Delete record",
					color: "danger",
					icon: "trash-can",
					onclick: (event) => {
						let sender = event.currentTarget;

						//get id
						new dlg.inputbox("text", "ID", (_event, data) => {
							//delete record

							//marker
							db.api.delete(
								{
									name: "customer",
									id: data.value,
									sender: sender,
								},
								(result) => {
									//result
									document.getElementById(resultOutputId).value = result;
								}
							);
						}).show();
					},
				}),
				new input({ type: "text", label: "Result", id: resultOutputId, copyctl: true }),
			];
		},
	},

	{
		title: "List",
		msg: [
			"Get list of record from <b>cl generic database</b> using {{db.api.list}} function. Example :",
			new ul({
				item: [
					"<code>db.api.list(opt,callback)</code>",
					"<code>db.api.list({name:tablename},callback)</code>",
					"<code>db.api.list({name:tablename,data:query},callback)</code>",
				],
			}),
			"This function will return <b>array of object</b> on callback if process is successful",
			new codepreview({
				container: "card",
				code: `
					db.api.list(
						{
							name: "customer",
							data: {query}
						},
						(result) => {
						}
					);
			`,
			}),
		],
	},

	{
		msg: "Live example",

		import: ["button", "input", "db"],
		code: () => {
			let resultOutputId = core.UUID();

			return [
				new button({
					label: "Load list",
					color: "primary",
					icon: "folder-open",
					onclick: (event) => {
						let sender = event.currentTarget;

						//get record

						//marker
						db.api.list(
							{
								name: "customer",
								sender: sender,
							},
							(result) => {
								//result
								core.replaceWith(
									document.getElementById(resultOutputId),
									new div({
										id: resultOutputId,
										elem: new codepreview({
											title: "Result",
											container: "card",

											maxheight: "10rem",
											code: JSON.stringify(result),
										}),
									})
								);
								PR.prettyPrint();
							}
						);
					},
				}),
				new div({
					id: resultOutputId,
					elem: new codepreview({
						title: "Result",
						container: "card",

						code: `//result`,
					}),
				}),
			];
		},
	},

	{
		msg: "Live example with query",

		import: ["button", "input", "db"],
		code: () => {
			let resultOutputId = core.UUID();

			return [
				new button({
					label: "Load list",
					color: "primary",
					icon: "folder-open",
					onclick: (event) => {
						let sender = event.currentTarget;

						//get record
						db.api.list(
							{
								name: "customer",
								sender: sender,

								//marker
								data: {
									filter: null,
									sort: { state: 1, name: 1 },
									field: { __v: 0, email: 0, dob: 0 },
									limit: 10,
									skip: 0,
								},
							},
							(result) => {
								//result
								core.replaceWith(
									document.getElementById(resultOutputId),
									new div({
										id: resultOutputId,
										elem: new codepreview({
											title: "Result",
											container: "card",

											maxheight: "10rem",
											code: JSON.stringify(result),
										}),
									})
								);
								PR.prettyPrint();
							}
						);
					},
				}),
				new div({
					id: resultOutputId,
					elem: new codepreview({
						title: "Result",
						container: "card",

						code: `//result`,
					}),
				}),
			];
		},
	},

	{
		title: "Option",
		msg: [
			"Get list of record from <b>cl generic database</b> using {{db.api.option}} function for {{select input}}. Example :",
			new ul({
				item: [
					"<code>db.api.option(opt,callback)</code>",
					"<code>db.api.option({name:tablename},callback)</code>",
					"<code>db.api.option({name:tablename,fieldkey:_id,fieldname:name},callback)</code>",
				],
			}),
			"This function will return <b>array of object</b> on callback if process is successful",
			new codepreview({
				container: "card",
				code: `
					db.api.option(
						{
							name: "customer",
							fieldkey: "_id",
							fieldname: "name",
						},
						(result) => {
						}
					);
			`,
			}),
		],
	},

	{
		msg: "Live example",

		import: ["button", "input", "option", "db"],
		code: () => {
			let resultOutputId = core.UUID();
			let selectInputId = core.UUID();

			return [
				new button({
					label: "Load list option",
					color: "primary",
					icon: "folder-open",
					onclick: (event) => {
						let sender = event.currentTarget;

						//get record
						//marker
						db.api.option(
							{
								name: "customer",
								sender: sender,
								fieldkey: "_id", //marker
								fieldname: "name", //marker
							},
							(result) => {
								//result
								core.replaceWith(
									document.getElementById(resultOutputId),
									new div({
										id: resultOutputId,
										elem: new codepreview({
											title: "Result",
											container: "card",

											maxheight: "10rem",
											code: JSON.stringify(result),
										}),
									})
								);
								PR.prettyPrint();

								core.replaceChild(
									document.getElementById(selectInputId),
									new option.select({ item: result })
								);
							}
						);
					},
				}),
				new div({
					id: resultOutputId,
					elem: new codepreview({
						title: "Result",
						container: "card",
						code: `//result`,
					}),
				}),
				new input({ type: "select", label: "Sample", id: selectInputId }),
			];
		},
	},

	{
		msg: "Live example with filter",

		import: ["button", "input", "option", "db"],
		code: () => {
			let resultOutputId = core.UUID();
			let selectInputId = core.UUID();

			return [
				new button({
					label: "Load list option",
					color: "primary",
					icon: "folder-open",
					onclick: (event) => {
						let sender = event.currentTarget;

						//get record
						db.api.option(
							{
								name: "customer",
								sender: sender,
								fieldkey: "_id",
								fieldname: "name",
								filter: { $and: [{ name: { $regex: "s", $options: "i" } }] }, //marker
							},
							(result) => {
								//result
								core.replaceWith(
									document.getElementById(resultOutputId),
									new div({
										id: resultOutputId,
										elem: new codepreview({
											title: "Result",
											container: "card",

											maxheight: "10rem",
											code: JSON.stringify(result),
										}),
									})
								);
								PR.prettyPrint();

								core.replaceChild(
									document.getElementById(selectInputId),
									new option.select({ item: result })
								);
							}
						);
					},
				}),
				new div({
					id: resultOutputId,
					elem: new codepreview({
						title: "Result",
						container: "card",

						code: `//result`,
					}),
				}),
				new input({ type: "select", label: "Sample", id: selectInputId }),
			];
		},
	},

	{
		title: "XLSX file",
		msg: [
			"Get list of record from <b>cl generic database</b> in xlsx format using {{db.api.excel}} function. Example :",
			new ul({
				item: [
					"<code>db.api.excel(opt)</code>",
					"<code>db.api.excel({name:tablename})</code>",
					"<code>db.api.excel({name:tablename,data:query})</code>",
				],
			}),
			"This function will download <b>xlsx file</b> if process is successful",
			new codepreview({
				container: "card",
				code: `
					db.api.excel(
						{
							name: "customer",
							data: {query}
						}
					);
			`,
			}),
		],
	},

	{
		msg: "Live example",
		import: ["button", "db"],
		code: () => {
			return new button({
				label: "Download XLSX file",
				color: "primary",
				icon: "download",
				onclick: (event) => {
					let sender = event.currentTarget;

					db.api.excel({
						name: "customer",
						sender: sender,
					});
				},
			});
		},
	},

	{
		msg: "Live example with query",
		import: ["button", "db"],
		code: () => {
			return new button({
				label: "Download XLSX file",
				color: "primary",
				icon: "download",
				onclick: (event) => {
					let sender = event.currentTarget;

					//marker
					db.api.excel({
						name: "customer",
						data: {
							filter: null,
							sort: { state: 1, name: 1 },
							field: { __v: 0, email: 0, dob: 0 },
						},
						sender: sender,
					});
				},
			});
		},
	},
];
