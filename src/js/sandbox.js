"use strict";
import $ from "./component.js";
import * as db from "../js/base/api.js";

let q = {
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
	useopricon: true,
};

let qr = {
	filter: null,
	sort: { state: -1, name: 1 },
	field: { __v: 0 },
	limit: 10,
	skip: 0,
};

$.core.documentReady(() => {
	$.core.replaceChild(
		document.getElementById("root"),
		new $.container.form([
			new $.container.stack([
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
								data: qr,
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
								data: qr,
							},
							function (result) {
								$.core.setValue(document.getElementById("output"), JSON.stringify(result));
							}
						);
					},
				}),
				new $.button({
					label: "Query",
					color: "primary",
					icon: "fire",
					onclick: function () {
						new $.query.dialog(
							{
								field: q.field,
								limit: q.limit,
								skip: q.skip,
								useopricon: q.useopricon,
								data: qr,
							},
							[
								function (event, data) {
									qr = data;
									$.core.setValue(document.getElementById("output"), JSON.stringify(data));
								},
							]
						).show();
					},
				}),
				new $.button({
					label: "Filter",
					color: "primary",
					icon: "fire",
					onclick: function () {
						new $.query.filter(
							{
								field: q.field,
								useopricon: q.useopricon,
								data: qr.filter,
							},
							[
								function (event, data) {
									qr.filter = data;
									$.core.setValue(document.getElementById("output"), JSON.stringify(data));
								},
							]
						).show();
					},
				}),
				new $.button({
					label: "Sort",
					color: "primary",
					icon: "fire",
					onclick: function () {
						new $.query.sort(
							{
								field: q.field,
								useopricon: q.useopricon,
								data: qr.sort,
							},
							[
								function (event, data) {
									qr.sort = data;
									$.core.setValue(document.getElementById("output"), JSON.stringify(data));
								},
							]
						).show();
					},
				}),
				new $.button({
					label: "Field",
					color: "primary",
					icon: "fire",
					onclick: function () {
						new $.query.field(
							{
								field: q.field,
								data: qr.field,
							},
							[
								function (event, data) {
									qr.field = data;
									$.core.setValue(document.getElementById("output"), JSON.stringify(data));
								},
							]
						).show();
					},
				}),
				new $.button({
					label: "Limit",
					color: "primary",
					icon: "fire",
					onclick: function () {
						new $.query.limit(
							{
								min: q.limit.min,
								max: q.limit.max,
								step: q.limit.step,
								data: qr.limit,
							},
							[
								function (event, data) {
									let skip = qr.skip / qr.limit;
									qr.limit = data;
									qr.skip = skip * qr.limit;
									$.core.setValue(document.getElementById("output"), JSON.stringify(data));
								},
							]
						).show();
					},
				}),
				new $.button({
					label: "Page",
					color: "primary",
					icon: "fire",
					onclick: function () {
						new $.query.page(
							{
								min: q.skip.min,
								max: q.skip.max,
								step: q.skip.step,
								limit: qr.limit,
								data: qr.skip,
							},
							[
								function (event, data) {
									qr.skip = data;
									$.core.setValue(document.getElementById("output"), JSON.stringify(data));
								},
							]
						).show();
					},
				}),
			]),
			new $.input({ type: "textarea", id: "output", rows: 10 }),
		])
	);
});
