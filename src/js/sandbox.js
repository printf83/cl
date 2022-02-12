"use strict";
import $ from "./component.js";
import * as db from "../js/base/api.js";
import { item } from "./base/list.js";
import span from "./base/span.js";
import div from "./base/div.js";

let query_setting = {
	field: [
		{ value: "name", label: "Name", type: "text" },
		{ value: "dob", label: "Date Of Birth", type: "date" },
		{ value: "phone", label: "Phone", type: "tel" },
		{ value: "picture", label: "Picture", type: "check" },
		{ value: "email", label: "Email", type: "email" },
		{
			value: "state",
			label: "State",
			type: "select",
			option: null,
			placeholder: "Please Choose One",
		},
	],
	limit: {
		min: 1,
		max: 100,
		step: 5,
	},
	skip: {
		min: 1,
		max: 100,
		step: 1,
	},
	useopricon: false,
};

let query_data = {
	filter: null,
	sort: { name: 1 },
	field: { __v: 0 },
	limit: 10,
	skip: 0,
};

$.core.documentReady(() => {
	db.api.option(
		{
			name: "state",
		},
		function (dbstate) {
			$.core.replaceChild(
				document.getElementById("root"),
				new $.container.form([
					new $.container.stack([
						new $.file({ id: "test-file-uploader", multiple: true }),
						new $.button({
							label: "save file",
							color: "success",
							icon: "save",
							onclick: function () {
								let ctl = document.getElementById("test-file-uploader");
								$.file.save(ctl);
							},
						}),
						new $.button({
							label: "api.create",
							color: "primary",
							onclick: function () {
								db.api.create(
									{
										name: "customer",
										data: {
											name: "Test User",
											dob: "1983-09-13",
											phone: "0123456789",
										},
									},
									function (result) {
										$.core.setValue(document.getElementById("output"), result);
									}
								);
							},
						}),
						new $.button({
							label: "api.load",
							color: "info",
							onclick: function () {
								new $.dlg.inputbox("text", "ID", function (_event, data) {
									db.api.load(
										{
											name: "customer",
											id: data.value,
										},
										function (result) {
											$.core.setValue(document.getElementById("output"), result);
										}
									);
								}).show();
							},
						}),
						new $.button({
							label: "api.update",
							color: "success",
							onclick: function () {
								new $.dlg.inputbox("text", "ID", function (_event, data) {
									db.api.update(
										{
											name: "customer",
											id: data.value,
											data: {
												name: "Test User Update",
												dob: "1983-09-13",
												phone: "0123456789",
											},
										},
										function (result) {
											$.core.setValue(document.getElementById("output"), result);
										}
									);
								}).show();
							},
						}),
						new $.button({
							label: "api.delete",
							color: "danger",
							onclick: function () {
								new $.dlg.inputbox("text", "ID", function (_event, data) {
									db.api.delete(
										{
											name: "customer",
											id: data.value,
										},
										function (result) {
											$.core.setValue(document.getElementById("output"), result);
										}
									);
								}).show();
							},
						}),
						new $.button({
							label: "api.list",
							color: "primary",
							onclick: function () {
								db.api.list(
									{
										name: "customer",
										data: query_data,
									},
									function (result) {
										$.core.setValue(document.getElementById("output"), JSON.stringify(result));
									}
								);
							},
						}),
						new $.button({
							label: "api.option",
							color: "primary",
							onclick: function () {
								db.api.option(
									{
										name: "customer",
										data: query_data,
									},
									function (result) {
										$.core.setValue(document.getElementById("output"), JSON.stringify(result));
									}
								);
							},
						}),
						new $.button({
							label: "api.excel",
							color: "primary",
							onclick: function () {
								$.list.container.excel("main_list");
								// db.api.excel({
								// 	name: "customer",
								// 	data: query_data,
								// });
							},
						}),
						new $.button({
							label: "Query",
							color: "primary",
							icon: "fire",
							onclick: function () {
								$.list.container.query.all("main_list");
								// new $.query.dialog(
								// 	{
								// 		field: query_setting.field,
								// 		limit: query_setting.limit,
								// 		skip: query_setting.skip,
								// 		useopricon: query_setting.useopricon,
								// 		data: query_data,
								// 	},
								// 	[
								// 		function (event, data) {
								// 			query_data = data;
								// 			$.core.setValue(document.getElementById("output"), JSON.stringify(data));
								// 		},
								// 	]
								// ).show();
							},
						}),
						new $.button({
							label: "Filter",
							color: "primary",
							icon: "fire",
							onclick: function () {
								$.list.container.query.filter("main_list");
								// new $.query.filter(
								// 	{
								// 		field: query_setting.field,
								// 		useopricon: query_setting.useopricon,
								// 		data: query_data.filter,
								// 	},
								// 	[
								// 		function (event, data) {
								// 			query_data.filter = data;
								// 			$.core.setValue(document.getElementById("output"), JSON.stringify(data));
								// 		},
								// 	]
								// ).show();
							},
						}),
						new $.button({
							label: "Sort",
							color: "primary",
							icon: "fire",
							onclick: function () {
								$.list.container.query.sort("main_list");
								// new $.query.sort(
								// 	{
								// 		field: query_setting.field,
								// 		useopricon: query_setting.useopricon,
								// 		data: query_data.sort,
								// 	},
								// 	[
								// 		function (event, data) {
								// 			query_data.sort = data;
								// 			$.core.setValue(document.getElementById("output"), JSON.stringify(data));
								// 		},
								// 	]
								// ).show();
							},
						}),
						new $.button({
							label: "Field",
							color: "primary",
							icon: "fire",
							onclick: function () {
								$.list.container.query.field("main_list");
								// new $.query.field(
								// 	{
								// 		field: query_setting.field,
								// 		data: query_data.field,
								// 	},
								// 	[
								// 		function (event, data) {
								// 			query_data.field = data;
								// 			$.core.setValue(document.getElementById("output"), JSON.stringify(data));
								// 		},
								// 	]
								// ).show();
							},
						}),
						new $.button({
							label: "Limit",
							color: "primary",
							icon: "fire",
							onclick: function () {
								$.list.container.query.limit("main_list");
								// new $.query.limit(
								// 	{
								// 		min: query_setting.limit.min,
								// 		max: query_setting.limit.max,
								// 		step: query_setting.limit.step,
								// 		data: query_data.limit,
								// 	},
								// 	[
								// 		function (event, data) {
								// 			let skip = query_data.skip / query_data.limit;
								// 			query_data.limit = data;
								// 			query_data.skip = skip * query_data.limit;
								// 			$.core.setValue(document.getElementById("output"), JSON.stringify(data));
								// 		},
								// 	]
								// ).show();
							},
						}),
						new $.button({
							label: "Page",
							color: "primary",
							icon: "fire",
							onclick: function () {
								$.list.container.query.page("main_list");
								// new $.query.page(
								// 	{
								// 		min: query_setting.skip.min,
								// 		max: query_setting.skip.max,
								// 		step: query_setting.skip.step,
								// 		limit: query_data.limit,
								// 		data: query_data.skip,
								// 	},
								// 	[
								// 		function (event, data) {
								// 			query_data.skip = data;
								// 			$.core.setValue(document.getElementById("output"), JSON.stringify(data));
								// 		},
								// 	]
								// ).show();
							},
						}),

						new $.button({
							label: "Check Mode",
							color: "warning",
							onclick: function () {
								$.list.container.check.mode("main_list");
							},
						}),
						new $.button({
							label: "Check All",
							color: "warning",
							onclick: function () {
								$.list.container.check.all("main_list");
							},
						}),
						new $.button({
							label: "Delete checked",
							color: "danger",
							onclick: function () {
								$.list.container.check.delete("main_list");
							},
						}),
					]),
					new $.input({ type: "textarea", id: "output", rows: 10 }),
					new $.list.container({
						id: "main_list",
						setting: query_setting,
						query: query_data,
						name: "customer",
						paging: true,
						editor: function (data, readonly) {
							return [
								new $.input({
									type: "text",
									label: "Name",
									name: "name",
									value: data ? data.name : null,
								}),
								new $.input({
									type: "date",
									label: "Date of birth",
									name: "dob",
									value: data ? data.dob : null,
								}),
								new $.input({
									type: "text",
									label: "Phone",
									name: "phone",
									value: data ? data.phone : null,
								}),
								new $.file({ label: "Picture", name: "picture", value: data ? data.picture : null }),
								new $.input({
									type: "email",
									label: "Email",
									name: "email",
									value: data ? data.email : null,
								}),
								new $.input({
									type: "select",
									label: "State",
									name: "state",
									option: dbstate,
									value: data ? data.state : null,
								}),
							];
						},
						item: function (data) {
							return new $.list.item({
								key: data._id,
								name: data.name,
								picture: data.picture,
								// detail: new $.small([data.phone, data.dob, data.email].filter(Boolean).join(" | ")),
								detail: new $.div(
									"container p-0",
									new $.div("g-2 row row-cols-auto", [
										data.phone
											? new $.pill({
													icon: "phone",
													label: data.phone,
											  })
											: null,
										data.email
											? new $.pill({
													icon: "at",
													label: data.email,
											  })
											: null,
									])
								),
							});
						},
					}),
				])
			);

			$.list.container.reload("main_list");
		}
	);
});
