"use strict";
import sample from "./sample.js";
import $ from "../component.js";

export default [
	{
		title: "Generic database",
		msg: "Provide access to <b>cl genaric database</b> to make easy <b>CRUD</b> operation and others.",
		anchor: false,
	},

	{
		msg: [
			"Please create table using <b>cl generic database</b> in <b>./server.js</b>. For this example, we create <b>customer</b> table with this code :",
			new $.codepreview({
				container: "card",
				code: `
					require("./routes/generic.js")(app, "customer");
			`,
			}),
			"Then we create models for <b>customer</b> table in <b>./models/customer.js</b>",
			new $.codepreview({
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
			"Create new record from <b>cl generic database</b> using {{$.db.api.create}} function. Example :",
			new $.ul({
				item: [
					"<code>$.db.api.create(opt,callback)</code>",
					"<code>$.db.api.create({name:tablename,data:object},callback)</code>",
					"<code>$.db.api.create({name:tablename,data:[object]},callback)</code>",
				],
			}),
			"This function will return <b>id</b> or <b>array of id</b> on callback if record successfuly created",
			new $.codepreview({
				container: "card",
				code: `
					$.db.api.create(
						{
							name: "customer",
							data: {
								name: "Test user",
								dob: "1987-06-05",
								phone: "0123456789",
							},
						},
						function (result) {}
					);
			`,
			}),
		],
	},

	{
		msg: "Live example",
		container: sample.formcontainer,
		code: function () {
			let resultOutputId = $.core.UUID();

			return [
				new $.button({
					label: "Create record",
					color: "success",
					icon: "floppy-disk",
					onclick: function (event) {
						let sender = event.currentTarget;

						//create record
						$.db.api.create(
							{
								name: "customer",
								data: {
									name: "Test user",
									dob: "1987-06-05",
									phone: "0123456789",
								},
								sender: sender,
							},
							function (result) {
								//result
								document.getElementById(resultOutputId).value = result;
							}
						);
					},
				}),
				new $.input({ type: "text", label: "Result", id: resultOutputId }),
			];
		},
	},

	{
		title: "Update",
		msg: [
			"Update existing record from <b>cl generic database</b> using {{$.db.api.update}} function. Example :",
			new $.ul({
				item: [
					"<code>$.db.api.update(opt,callback)</code>",
					"<code>$.db.api.update({name:tablename,data:object,id:id},callback)</code>",
					"<code>$.db.api.update({name:tablename,data:object,id:[id]},callback)</code>",
				],
			}),
			"This function will return <b>id</b> or <b>array of id</b> on callback if record successfuly updated",
			new $.codepreview({
				container: "card",
				code: `
					$.db.api.update(
						{
							name: "customer",
							data: {
								state: "stateid",
							},
							id: "id",
						},
						function (result) {
						}
					);
			`,
			}),
		],
	},

	{
		msg: "Live example",
		container: sample.formcontainer,
		code: function () {
			let resultOutputId = $.core.UUID();

			return [
				new $.button({
					label: "Update record",
					color: "primary",
					icon: "pen-to-square",
					onclick: function (event) {
						let sender = event.currentTarget;

						//get id
						new $.dlg.inputbox("text", "ID", function (_event, data) {
							//update record
							$.db.api.update(
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
								function (result) {
									//result
									document.getElementById(resultOutputId).value = result;
								}
							);
						}).show();
					},
				}),
				new $.input({ type: "text", label: "Result", id: resultOutputId }),
			];
		},
	},

	{
		title: "Load",
		msg: [
			"Load existing record from <b>cl generic database</b> using {{$.db.api.load}} function. Example :",
			new $.ul({
				item: [
					"<code>$.db.api.load(opt,callback)</code>",
					"<code>$.db.api.load({name:tablename,id:id},callback)</code>",
					"<code>$.db.api.load({name:tablename,id:[id]},callback)</code>",
				],
			}),
			"This function will return <b>object</b> or <b>array of object</b> on callback if record found",
			new $.codepreview({
				container: "card",
				code: `
					$.db.api.load(
						{
							name: "customer",
							id: "id",
						},
						function (result) {
						}
					);
			`,
			}),
		],
	},

	{
		msg: "Live example",
		container: sample.formcontainer,
		code: function () {
			let resultOutputId = $.core.UUID();

			return [
				new $.button({
					label: "Load record",
					color: "primary",
					icon: "folder-open",
					onclick: function (event) {
						let sender = event.currentTarget;

						//get id
						new $.dlg.inputbox("text", "ID", function (_event, data) {
							//get record
							$.db.api.load(
								{
									name: "customer",
									id: data.value,
									sender: sender,
								},
								function (result) {
									//result
									document.getElementById(resultOutputId).value = JSON.stringify(result);
								}
							);
						}).show();
					},
				}),
				new $.input({ type: "textarea", label: "Result", id: resultOutputId, rows: 3 }),
			];
		},
	},

	{
		title: "Delete",
		msg: [
			"Delete existing record from <b>cl generic database</b> using {{$.db.api.delete}} function. Example :",
			new $.ul({
				item: [
					"<code>$.db.api.delete(opt,callback)</code>",
					"<code>$.db.api.delete({name:tablename,id:id},callback)</code>",
					"<code>$.db.api.delete({name:tablename,id:[id]},callback)</code>",
				],
			}),
			"This function will return <b>id</b> or <b>array of id</b> on callback if record found and deleted",
			new $.codepreview({
				container: "card",
				code: `
					$.db.api.delete(
						{
							name: "customer",
							id: "id",
						},
						function (result) {
						}
					);
			`,
			}),
		],
	},

	{
		msg: "Live example",
		container: sample.formcontainer,
		code: function () {
			let resultOutputId = $.core.UUID();

			return [
				new $.button({
					label: "Delete record",
					color: "danger",
					icon: "trash-can",
					onclick: function (event) {
						let sender = event.currentTarget;

						//get id
						new $.dlg.inputbox("text", "ID", function (_event, data) {
							//delete record
							$.db.api.delete(
								{
									name: "customer",
									id: data.value,
									sender: sender,
								},
								function (result) {
									//result
									document.getElementById(resultOutputId).value = result;
								}
							);
						}).show();
					},
				}),
				new $.input({ type: "text", label: "Result", id: resultOutputId }),
			];
		},
	},

	{
		title: "List",
		msg: [
			"Get list of record from <b>cl generic database</b> using {{$.db.api.list}} function. Example :",
			new $.ul({
				item: [
					"<code>$.db.api.list(opt,callback)</code>",
					"<code>$.db.api.list({name:tablename},callback)</code>",
					"<code>$.db.api.list({name:tablename,data:query},callback)</code>",
				],
			}),
			"This function will return <b>array of object</b> on callback if process is successful",
			new $.codepreview({
				container: "card",
				code: `
					$.db.api.list(
						{
							name: "customer",
							data: {query}
						},
						function (result) {
						}
					);
			`,
			}),
		],
	},

	{
		msg: "Live example",
		container: sample.formcontainer,
		code: function () {
			let resultOutputId = $.core.UUID();

			return [
				new $.button({
					label: "Load list",
					color: "primary",
					icon: "folder-open",
					onclick: function (event) {
						let sender = event.currentTarget;

						//get record
						$.db.api.list(
							{
								name: "customer",
								sender: sender,
							},
							function (result) {
								//result
								document.getElementById(resultOutputId).value = JSON.stringify(result);
							}
						);
					},
				}),
				new $.input({ type: "textarea", label: "Result", id: resultOutputId, rows: 10 }),
			];
		},
	},

	{
		msg: "Live example with query",
		container: sample.formcontainer,
		code: function () {
			let resultOutputId = $.core.UUID();

			return [
				new $.button({
					label: "Load list",
					color: "primary",
					icon: "folder-open",
					onclick: function (event) {
						let sender = event.currentTarget;

						//get record
						$.db.api.list(
							{
								name: "customer",
								data: {
									filter: null,
									sort: { state: 1, name: 1 },
									field: { __v: 0, email: 0, dob: 0 },
									limit: 10,
									skip: 0,
								},
								sender: sender,
							},
							function (result) {
								//result
								document.getElementById(resultOutputId).value = JSON.stringify(result);
							}
						);
					},
				}),
				new $.input({ type: "textarea", label: "Result", id: resultOutputId, rows: 10 }),
			];
		},
	},

	{
		title: "Option",
		msg: [
			"Get list of record from <b>cl generic database</b> using {{$.db.api.option}} function for {{select input}}. Example :",
			new $.ul({
				item: [
					"<code>$.db.api.option(opt,callback)</code>",
					"<code>$.db.api.option({name:tablename},callback)</code>",
					"<code>$.db.api.option({name:tablename,fieldkey:_id,fieldname:name},callback)</code>",
				],
			}),
			"This function will return <b>array of object</b> on callback if process is successful",
			new $.codepreview({
				container: "card",
				code: `
					$.db.api.option(
						{
							name: "customer",
							fieldkey: "_id",
							fieldname: "name",
						},
						function (result) {
						}
					);
			`,
			}),
		],
	},

	{
		msg: "Live example",
		container: sample.formcontainer,
		code: function () {
			let resultOutputId = $.core.UUID();
			let selectInputId = $.core.UUID();

			return [
				new $.button({
					label: "Load list option",
					color: "primary",
					icon: "folder-open",
					onclick: function (event) {
						let sender = event.currentTarget;

						//get record
						$.db.api.option(
							{
								name: "customer",
								fieldkey: "_id",
								fieldname: "name",
								sender: sender,
							},
							function (result) {
								//result
								document.getElementById(resultOutputId).value = JSON.stringify(result);
								$.core.replaceChild(
									document.getElementById(selectInputId),
									new $.option.select({ item: result })
								);
							}
						);
					},
				}),
				new $.input({ type: "textarea", label: "Result", id: resultOutputId, rows: 10 }),
				new $.input({ type: "select", label: "Sample", id: selectInputId }),
			];
		},
	},

	{
		msg: "Live example with filter",
		container: sample.formcontainer,
		code: function () {
			let resultOutputId = $.core.UUID();
			let selectInputId = $.core.UUID();

			return [
				new $.button({
					label: "Load list option",
					color: "primary",
					icon: "folder-open",
					onclick: function (event) {
						let sender = event.currentTarget;

						//get record
						$.db.api.option(
							{
								name: "customer",
								filter: { $and: [{ name: { $regex: "s", $options: "i" } }] },
								fieldkey: "_id",
								fieldname: "name",
								sender: sender,
							},
							function (result) {
								//result
								document.getElementById(resultOutputId).value = JSON.stringify(result);
								$.core.replaceChild(
									document.getElementById(selectInputId),
									new $.option.select({ item: result })
								);
							}
						);
					},
				}),
				new $.input({ type: "textarea", label: "Result", id: resultOutputId, rows: 10 }),
				new $.input({ type: "select", label: "Sample", id: selectInputId }),
			];
		},
	},

	{
		title: "XLSX file",
		msg: [
			"Get list of record from <b>cl generic database</b> in xlsx format using {{$.db.api.excel}} function. Example :",
			new $.ul({
				item: [
					"<code>$.db.api.excel(opt)</code>",
					"<code>$.db.api.excel({name:tablename})</code>",
					"<code>$.db.api.excel({name:tablename,data:query})</code>",
				],
			}),
			"This function will download <b>xlsx file</b> if process is successful",
			new $.codepreview({
				container: "card",
				code: `
					$.db.api.excel(
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
		code: function () {
			return new $.button({
				label: "Download XLSX file",
				color: "primary",
				icon: "download",
				onclick: function (event) {
					let sender = event.currentTarget;

					$.db.api.excel({
						name: "customer",
						sender: sender,
					});
				},
			});
		},
	},

	{
		msg: "Live example with query",
		code: function () {
			return new $.button({
				label: "Download XLSX file",
				color: "primary",
				icon: "download",
				onclick: function (event) {
					let sender = event.currentTarget;

					$.db.api.excel({
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
