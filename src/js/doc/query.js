"use strict";
import sample from "./sample.js";
import $ from "../component.js";

const fn = {
	setting: {
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
	},
	query: {
		filter: null,
		sort: { state: 1, name: 1 },
		field: { __v: 0 },
		limit: 10,
		skip: 0,
	},
};

export default [
	{
		title: "Query",
		msg: "Provide access to make simpel query for <b>cl generic database</b>.",
		anchor: false,
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
					new $.query.dialog(
						{
							field: value, 		//field setting
							limit: value, 		//limit setting
							skip: value, 		//skip setting
							useopricon: value, 	//useopricon setting
							data: value, 		//data
						},
						[
							function (_event, result) {	},
						]
					).show();
			`,
			}),
			"In this example we will use some outside variable that we declare as fn.",
			new $.codepreview({
				container: "card",
				code: `
					const fn = {
						setting: {
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
						},
						query: {
							filter: null,
							sort: { state: 1, name: 1 },
							field: { __v: 0 },
							limit: 10,
							skip: 0,
						},
					};
			`,
			}),
		],
	},

	{
		title: "Query dialog",
		container: sample.formcontainer,
		code: function () {
			let resultOutputId = $.core.UUID();

			return [
				new $.button({
					label: "Query Dialog",
					icon: "fire",
					color: "primary",
					onclick: function () {
						//edit query
						new $.query.dialog(
							{
								field: fn.setting.field,
								limit: fn.setting.limit,
								skip: fn.setting.skip,
								useopricon: fn.setting.useopricon,
								data: fn.query,
							},
							[
								function (_event, data) {
									fn.query = data;

									//get record
									$.db.api.list(
										{
											name: "customer",
											data: fn.query,
										},
										function (result) {
											//result
											document.getElementById(resultOutputId).value = JSON.stringify(result);
										}
									);
								},
							]
						).show();
					},
				}),
				new $.input({ type: "textarea", label: "Result", id: resultOutputId, rows: 10 }),
			];
		},
	},

	{
		Title: "Filter dialog",
		container: sample.formcontainer,
		code: function () {
			let resultOutputId = $.core.UUID();

			return [
				new $.button({
					label: "Filter Dialog",
					icon: "filter",
					color: "primary",
					onclick: function () {
						//edit query
						new $.query.filter(
							{
								field: fn.setting.field,
								useopricon: fn.setting.useopricon,
								data: fn.query.filter,
							},
							[
								function (_event, data) {
									fn.query.filter = data;

									//get record
									$.db.api.list(
										{
											name: "customer",
											data: fn.query,
										},
										function (result) {
											//result
											document.getElementById(resultOutputId).value = JSON.stringify(result);
										}
									);
								},
							]
						).show();
					},
				}),
				new $.input({ type: "textarea", label: "Result", id: resultOutputId, rows: 10 }),
			];
		},
	},

	{
		Title: "Sort dialog",
		container: sample.formcontainer,
		code: function () {
			let resultOutputId = $.core.UUID();

			return [
				new $.button({
					label: "Sort Dialog",
					icon: "sort",
					color: "primary",
					onclick: function () {
						//edit query
						new $.query.sort(
							{
								field: fn.setting.field,
								useopricon: fn.setting.useopricon,
								data: fn.query.sort,
							},
							[
								function (_event, data) {
									fn.query.sort = data;

									//get record
									$.db.api.list(
										{
											name: "customer",
											data: fn.query,
										},
										function (result) {
											//result
											document.getElementById(resultOutputId).value = JSON.stringify(result);
										}
									);
								},
							]
						).show();
					},
				}),
				new $.input({ type: "textarea", label: "Result", id: resultOutputId, rows: 10 }),
			];
		},
	},

	{
		Title: "Field dialog",
		container: sample.formcontainer,
		code: function () {
			let resultOutputId = $.core.UUID();

			return [
				new $.button({
					label: "Field Dialog",
					icon: "tasks",
					color: "primary",
					onclick: function () {
						//edit query
						new $.query.field(
							{
								field: fn.setting.field,
								data: fn.query.field,
							},
							[
								function (_event, data) {
									fn.query.field = data;

									//get record
									$.db.api.list(
										{
											name: "customer",
											data: fn.query,
										},
										function (result) {
											//result
											document.getElementById(resultOutputId).value = JSON.stringify(result);
										}
									);
								},
							]
						).show();
					},
				}),
				new $.input({ type: "textarea", label: "Result", id: resultOutputId, rows: 10 }),
			];
		},
	},

	{
		Title: "Limit dialog",
		container: sample.formcontainer,
		code: function () {
			let resultOutputId = $.core.UUID();

			return [
				new $.button({
					label: "Limit Dialog",
					icon: "list-ol",
					color: "primary",
					onclick: function () {
						//edit query
						new $.query.limit(
							{
								min: fn.setting.limit.min,
								max: fn.setting.limit.max,
								step: fn.setting.limit.step,
								data: fn.query.limit,
							},
							[
								function (_event, data) {
									let skip = fn.query.skip / fn.query.limit;
									fn.query.limit = data;
									fn.query.skip = skip * fn.query.limit;

									//get record
									$.db.api.list(
										{
											name: "customer",
											data: fn.query,
										},
										function (result) {
											//result
											document.getElementById(resultOutputId).value = JSON.stringify(result);
										}
									);
								},
							]
						).show();
					},
				}),
				new $.input({ type: "textarea", label: "Result", id: resultOutputId, rows: 10 }),
			];
		},
	},

	{
		Title: "Page dialog",
		container: sample.formcontainer,
		code: function () {
			let resultOutputId = $.core.UUID();

			return [
				new $.button({
					label: "Page Dialog",
					icon: "list-ol",
					color: "primary",
					onclick: function () {
						//edit query
						new $.query.page(
							{
								min: fn.setting.skip.min,
								max: fn.setting.skip.max,
								step: fn.setting.skip.step,
								data: fn.query.skip,
							},
							[
								function (_event, data) {
									fn.query.skip = data;

									//get record
									$.db.api.list(
										{
											name: "customer",
											data: fn.query,
										},
										function (result) {
											//result
											document.getElementById(resultOutputId).value = JSON.stringify(result);
										}
									);
								},
							]
						).show();
					},
				}),
				new $.input({ type: "textarea", label: "Result", id: resultOutputId, rows: 10 }),
			];
		},
	},
];
