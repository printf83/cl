"use strict";
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
		title: "Create record live example",
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
						function (data) {
							//result
							new $.dlg.inputbox(
								[
									new $.input({
										type: "text",
										value: data,
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
							function (data) {
								//result
								new $.toast("i", data).show();
							}
						);
					}).show();
				},
			});
		},
	},

	{
		title: "Load",
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
							function (data) {
								//result
								new $.toast("i", JSON.stringify(data)).show();
							}
						);
					}).show();
				},
			});
		},
	},

	{
		title: "Delete",
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
							function (data) {
								//result
								new $.toast("i", data).show();
							}
						);
					}).show();
				},
			});
		},
	},
];
