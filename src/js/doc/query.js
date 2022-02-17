"use strict";
import sample from "./sample.js";
import $ from "../component.js";

let dbstate = null;

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
				option: dbstate,
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
	state: function (callback, sender) {
		if (!dbstate) {
			console.log("Init state database");

			//get record
			$.db.api.option(
				{
					name: "state",
					fieldkey: "_id",
					fieldname: "name",
					sender: sender,
				},
				function (result) {
					dbstate = result;
					fn.setting.field[fn.setting.field.length - 1].option = dbstate;
					callback();
				}
			);
		} else {
			callback();
		}
	},
};

export default [
	{
		title: "Query",
		msg: "Provide access to make simpel query for <b>cl generic database</b>.",
		anchor: false,
	},

	{
		msg: [
			"fn.setting",
			new $.codepreview({
				container: "card",
				code: `
					function() {
						return {
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
									option: dbstate,
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
					}
			`,
			}),
			"fn.query",
			new $.codepreview({
				container: "card",
				code: `
					function() {
						return {
							filter: null,
							sort: { state: 1, name: 1 },
							field: { __v: 0 },
							limit: 10,
							skip: 0,
						};
					}
			`,
			}),
			"fn.state",
			new $.codepreview({
				container: "card",
				code: `
					function (callback, sender) {
						if (!dbstate) {
							console.log("Init state database");

							//get record
							$.db.api.option(
								{
									name: "state",
									fieldkey: "_id",
									fieldname: "name",
									sender: sender,
								},
								function (result) {
									dbstate = result;
									fn.setting.field[fn.setting.field.length - 1].option = dbstate;
									callback();
								}
							);
						} else {
							callback();
						}
					}
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
					onclick: function (event) {
						let sender = event.currentTarget;

						fn.state(function () {
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
												sender: sender,
											},
											function (result) {
												//result
												document.getElementById(resultOutputId).value = JSON.stringify(result);
											}
										);
									},
								]
							).show();
						}, sender);
					},
				}),
				new $.input({ type: "textarea", label: "Result", id: resultOutputId, rows: 10 }),
			];
		},
	},

	{
		title: "Filter dialog",
		container: sample.formcontainer,
		code: function () {
			let resultOutputId = $.core.UUID();

			return [
				new $.button({
					label: "Filter Dialog",
					icon: "filter",
					color: "primary",
					onclick: function (event) {
						let sender = event.currentTarget;

						fn.state(function () {
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
												sender: sender,
											},
											function (result) {
												//result
												document.getElementById(resultOutputId).value = JSON.stringify(result);
											}
										);
									},
								]
							).show();
						}, sender);
					},
				}),
				new $.input({ type: "textarea", label: "Result", id: resultOutputId, rows: 10 }),
			];
		},
	},

	{
		title: "Sort dialog",
		container: sample.formcontainer,
		code: function () {
			let resultOutputId = $.core.UUID();

			return [
				new $.button({
					label: "Sort Dialog",
					icon: "sort",
					color: "primary",
					onclick: function (event) {
						let sender = event.currentTarget;

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
											sender: sender,
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
		title: "Field dialog",
		container: sample.formcontainer,
		code: function () {
			let resultOutputId = $.core.UUID();

			return [
				new $.button({
					label: "Field Dialog",
					icon: "tasks",
					color: "primary",
					onclick: function (event) {
						let sender = event.currentTarget;

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
											sender: sender,
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
		title: "Limit dialog",
		container: sample.formcontainer,
		code: function () {
			let resultOutputId = $.core.UUID();

			return [
				new $.button({
					label: "Limit Dialog",
					icon: "list-ol",
					color: "primary",
					onclick: function (event) {
						let sender = event.currentTarget;

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
											sender: sender,
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
		title: "Page dialog",
		container: sample.formcontainer,
		code: function () {
			let resultOutputId = $.core.UUID();

			return [
				new $.button({
					label: "Page Dialog",
					icon: { icon: "sort", rotate: 90 },
					color: "primary",
					onclick: function (event) {
						let sender = event.currentTarget;

						//edit query
						new $.query.page(
							{
								min: fn.setting.skip.min,
								max: fn.setting.skip.max,
								step: fn.setting.skip.step,
								limit: fn.query.limit,
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
											sender: sender,
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
