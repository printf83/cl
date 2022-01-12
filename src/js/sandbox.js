"use strict";
import $ from "./component.js";
import * as db from "../js/base/api.js";
import button from "./base/button.js";

$.core.documentReady(() => {
	$.core.replaceChild(
		document.getElementById("root"),
		new $.container.stack([
			new button({
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
							console.log(result);
						}
					);
				},
			}),
			new button({
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
								console.log(result);
							}
						);
					}).show();
				},
			}),
			new button({
				label: "api.update",
				color: "success",
				onclick: function () {
					new $.dlg.inputbox("text", "ID", function (_event, data) {
						db.api.delete(
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
								console.log(result);
							}
						);
					}).show();
				},
			}),
			new button({
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
								console.log(result);
							}
						);
					}).show();
				},
			}),
			new button({
				label: "api.list",
				color: "primary",
				onclick: function () {
					db.api.list(
						{
							name: "customer",
						},
						function (result) {
							console.log(result);
						}
					);
				},
			}),
			new button({
				label: "api.option",
				color: "primary",
				onclick: function () {
					db.api.option(
						{
							name: "customer",
						},
						function (result) {
							console.log(result);
						}
					);
				},
			}),
			new $.button({
				label: "Show Query Dialog",
				color: "primary",
				icon: "fire",
				onclick: function () {
					new $.query(
						{
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
							data: {
								filter: null,
								sort: { state: -1, name: 1 },
								field: { __v: 0 },
								limit: 10,
								skip: 0,
							},
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
						},
						[
							function (event, data) {
								new $.toast("/", JSON.stringify(data)).show();
							},
						]
					).show();
				},
			}),
		])
	);
});
