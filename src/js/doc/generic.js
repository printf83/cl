"use strict";
import sample from "./sample.js";
import $ from "../component.js";

function beautifyjs(str) {
	return js_beautify(str, {
		preserve_newlines: true,
		max_preserve_newlines: 100,
		keep_array_indentation: false,
		brace_style: "collapse,preserve-inline",
	});
}

export default [
	{
		title: "Database",
		msg: "Provide access to database.",
		anchor: false,
	},

	{
		msg: [
			"Please create table using generic database in <b>./server.js</b>. For this example, we create <b>customer</b> table with this code :",
			new $.card.container({
				marginy: 3,
				elem: new $.card.body(
					new $.code(
						new $.pre({
							class: "prettyprint lang-js",
							marginbottom: 0,
							elem: beautifyjs(`
								require("./routes/generic.js")(app, "customer");
							`),
						})
					)
				),
			}),
			"Then we create models for <b>customer</b> table in <b>./models/customer.js</b>",
			new $.card.container({
				marginy: 3,
				elem: new $.card.body(
					new $.code(
						new $.pre({
							class: "prettyprint lang-js",
							marginbottom: 0,
							elem: beautifyjs(`
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

							`),
						})
					)
				),
			}),
		],
	},

	{
		title: "Create",
		msg: [
			"Create new record from generic database using {{$.db.api.create}} function. Example :",
			new $.ul({
				item: [
					"<code>$.db.api.create(opt,callback)</code>",
					"<code>$.db.api.create({name:tablename,data:object},callback)</code>",
					"<code>$.db.api.create({name:tablename,data:[object]},callback)</code>",
				],
			}),
			"This function will return <b>id</b> or <b>array of id</b> on callback if record successfuly created",
			new $.card.container({
				marginy: 3,
				elem: new $.card.body(
					new $.code(
						new $.pre({
							class: "prettyprint lang-js",
							marginbottom: 0,
							elem: beautifyjs(`
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
							`),
						})
					)
				),
			}),
		],
	},

	{
		msg: "Live example",
		code: function () {
			return new $.button({
				label: "Create record",
				color: "success",
				icon: "floppy-disk",
				onclick: function () {
					//create record
					$.db.api.create(
						{
							name: "customer",
							data: {
								name: "Test user",
								dob: "1987-06-05",
								phone: "0123456789",
							},
						},
						function (result) {
							new $.dlg.inputbox(
								[
									new $.input({
										type: "text",
										value: result,
										label: "Result (copy this for future use)",
									}),
								],
								null,
								function () {}
							).show();
						}
					);
				},
			});
		},
	},

	{
		title: "Update",
		msg: [
			"Update existing record from generic database using {{$.db.api.update}} function. Example :",
			new $.ul({
				item: [
					"<code>$.db.api.update(opt,callback)</code>",
					"<code>$.db.api.update({name:tablename,data:object,id:id},callback)</code>",
				],
			}),
			"This function will return <b>id</b> on callback if record successfuly updated",
			new $.card.container({
				marginy: 3,
				elem: new $.card.body(
					new $.code(
						new $.pre({
							class: "prettyprint lang-js",
							marginbottom: 0,
							elem: beautifyjs(`
								$.db.api.update(
									{
										name: "customer",
										data: {
											name: "Test user update",
											phone: "012987654",
											email: "test@test.com",
										},
										id: "id",
									},
									function (result) {
									}
								);
							`),
						})
					)
				),
			}),
		],
	},

	{
		msg: "Live example",
		code: function () {
			return new $.button({
				label: "Update record",
				color: "primary",
				icon: "pen-to-square",
				onclick: function () {
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
							},
							function (result) {
								//result
								new $.toast("i", result).show();
							}
						);
					}).show();
				},
			});
		},
	},

	{
		title: "Load",
		msg: [
			"Load existing record from generic database using {{$.db.api.load}} function. Example :",
			new $.ul({
				item: [
					"<code>$.db.api.load(opt,callback)</code>",
					"<code>$.db.api.load({name:tablename,id:id},callback)</code>",
					"<code>$.db.api.load({name:tablename,id:[id]},callback)</code>",
				],
			}),
			"This function will return <b>object</b> or <b>array of object</b> on callback if record found",
			new $.card.container({
				marginy: 3,
				elem: new $.card.body(
					new $.code(
						new $.pre({
							class: "prettyprint lang-js",
							marginbottom: 0,
							elem: beautifyjs(`
								$.db.api.load(
									{
										name: "customer",
										id: "id",
									},
									function (result) {
									}
								);
							`),
						})
					)
				),
			}),
		],
	},

	{
		msg: "Live example",
		code: function () {
			return new $.button({
				label: "Load record",
				color: "primary",
				icon: "folder-open",
				onclick: function () {
					//get id
					new $.dlg.inputbox("text", "ID", function (_event, data) {
						//get record
						$.db.api.load(
							{
								name: "customer",
								id: data.value,
							},
							function (result) {
								//result
								new $.toast("i", JSON.stringify(result)).show();
							}
						);
					}).show();
				},
			});
		},
	},

	{
		title: "Delete",
		msg: [
			"Delete existing record from generic database using {{$.db.api.delete}} function. Example :",
			new $.ul({
				item: [
					"<code>$.db.api.delete(opt,callback)</code>",
					"<code>$.db.api.delete({name:tablename,id:id},callback)</code>",
					"<code>$.db.api.delete({name:tablename,id:[id]},callback)</code>",
				],
			}),
			"This function will return <b>id</b> or <b>array of id</b> on callback if record found and deleted",
			new $.card.container({
				marginy: 3,
				elem: new $.card.body(
					new $.code(
						new $.pre({
							class: "prettyprint lang-js",
							marginbottom: 0,
							elem: beautifyjs(`
								$.db.api.delete(
									{
										name: "customer",
										id: "id",
									},
									function (result) {
									}
								);
							`),
						})
					)
				),
			}),
		],
	},

	{
		msg: "Live example",
		code: function () {
			return new $.button({
				label: "Delete record",
				color: "danger",
				icon: "trash-can",
				onclick: function () {
					//get id
					new $.dlg.inputbox("text", "ID", function (_event, data) {
						//delete record
						$.db.api.delete(
							{
								name: "customer",
								id: data.value,
							},
							function (result) {
								//result
								new $.toast("i", result).show();
							}
						);
					}).show();
				},
			});
		},
	},

	{
		title: "List",
		msg: [
			"Get list of record from generic database using {{$.db.api.list}} function. Example :",
			new $.ul({
				item: [
					"<code>$.db.api.list(opt,callback)</code>",
					"<code>$.db.api.list({name:tablename},callback)</code>",
					"<code>$.db.api.list({name:tablename,data:query},callback)</code>",
				],
			}),
			"This function will return <b>array of object</b> on callback if process is successful",
			new $.card.container({
				marginy: 3,
				elem: new $.card.body(
					new $.code(
						new $.pre({
							class: "prettyprint lang-js",
							marginbottom: 0,
							elem: beautifyjs(`
								$.db.api.list(
									{
										name: "customer",
									},
									function (result) {
									}
								);
							`),
						})
					)
				),
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
						//delete record
						$.db.api.list(
							{
								name: "customer",
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
						//delete record
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
];
