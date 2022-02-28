"use strict";
import sample from "./sample.js";
import $ from "../component.js";

export default [
	{
		title: "Query",
		msg: "Provide access to make simpel query for <b>cl generic database</b>.",
		anchor: false,
	},

	{
		title: "Query dialog",
		msg: [
			"Using {{$.query.dialog}} to edit query for <b>cl generic database</b>.",
			new $.codepreview({
				container: "card",
				code: `
					new $.query.dialog(
						{
							field: setting_fileld,
							limit: setting_limit,
							skip: setting_skip,
							useopricon: setting_use_operation_icon,
							data: query_data,
						},
						[
							function (event, query_result) {
								//callback if user press okay
							},
							function (event){
								//callback if user press cancel
							}
						]
					).show();
			`,
			}),
		],
		sample: {
			"sample.query_setting": sample.query_setting,
			"sample.query_data": sample.query_data_view,
		},
		viewclass: "cl-modal-preview",
		code: function () {
			let dbstate = [
				{ value: "value1", label: "Label 1" },
				{ value: "value2", label: "Label 2" },
				{ value: "value3", label: "Label 3" },
				{ value: "value4", label: "Label 4" },
				{ value: "value5", label: "Label 5" },
			];

			return [
				new $.query.dialog(
					{
						field: sample.query_setting(dbstate).field,
						limit: sample.query_setting(dbstate).limit,
						skip: sample.query_setting(dbstate).skip,
						useopricon: sample.query_setting(dbstate).useopricon,
						data: sample.query_data,
					},
					[
						function (_event, data) {
							sample.query_data = data;
						},
					],
					{ debug: true }
				),
			];
		},
	},

	{
		title: "Live preview",
		sample: {
			"sample.query_setting": sample.query_setting,
			"sample.query_data": sample.query_data_view,
			"sample.list_state": sample.list_state,
		},
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

						sample.list_state(function (dbstate) {
							//edit query
							new $.query.dialog(
								{
									field: sample.query_setting(dbstate).field,
									limit: sample.query_setting(dbstate).limit,
									skip: sample.query_setting(dbstate).skip,
									useopricon: sample.query_setting(dbstate).useopricon,
									data: sample.query_data,
								},
								[
									function (_event, data) {
										sample.query_data = data;

										//get record
										$.db.api.list(
											{
												name: "customer",
												data: sample.query_data,
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
		msg: [
			"Using {{$.query.filter}} to edit query filter only for <b>cl generic database</b>.",
			new $.codepreview({
				container: "card",
				code: `
					new $.query.filter(
						{
							field: setting_fileld,
							useopricon: setting_use_operation_icon,
							data: query_filter_data,
						},
						[
							function (event, query_filter_result) {
								//callback if user press okay
							},
							function (event){
								//callback if user press cancel
							}
						]
					).show();
			`,
			}),
		],
		sample: {
			"sample.query_setting": sample.query_setting,
			"sample.query_data": sample.query_data_view,
		},
		viewclass: "cl-modal-preview",
		code: function () {
			let dbstate = [
				{ value: "value1", label: "Label 1" },
				{ value: "value2", label: "Label 2" },
				{ value: "value3", label: "Label 3" },
				{ value: "value4", label: "Label 4" },
				{ value: "value5", label: "Label 5" },
			];

			return [
				new $.query.filter(
					{
						field: sample.query_setting(dbstate).field,
						useopricon: sample.query_setting(dbstate).useopricon,
						data: sample.query_data.filter,
					},
					[
						function (_event, data) {
							sample.query_data.filter = data;
						},
					],
					{ debug: true }
				),
			];
		},
	},

	{
		title: "Live preview",

		sample: {
			"sample.query_setting": sample.query_setting,
			"sample.query_data": sample.query_data_view,
			"sample.list_state": sample.list_state,
		},
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

						sample.list_state(function (dbstate) {
							//edit query
							new $.query.filter(
								{
									field: sample.query_setting(dbstate).field,
									useopricon: sample.query_setting(dbstate).useopricon,
									data: sample.query_data.filter,
								},
								[
									function (_event, data) {
										sample.query_data.filter = data;

										//get record
										$.db.api.list(
											{
												name: "customer",
												data: sample.query_data,
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
		msg: [
			"Using {{$.query.sort}} to edit query sort only for <b>cl generic database</b>.",
			new $.codepreview({
				container: "card",
				code: `
					new $.query.sort(
						{
							field: setting_fileld,
							useopricon: setting_use_operation_icon,
							data: query_sort_data,
						},
						[
							function (event, query_sort_result) {
								//callback if user press okay
							},
							function (event){
								//callback if user press cancel
							}
						]
					).show();
			`,
			}),
		],
		sample: {
			"sample.query_setting": sample.query_setting,
			"sample.query_data": sample.query_data_view,
		},
		viewclass: "cl-modal-preview",
		code: function () {
			return [
				new $.query.sort(
					{
						field: sample.query_setting().field,
						useopricon: sample.query_setting().useopricon,
						data: sample.query_data.sort,
					},
					[
						function (_event, data) {
							sample.query_data.sort = data;
						},
					],
					{ debug: true }
				),
			];
		},
	},

	{
		title: "Live preview",

		sample: {
			"sample.query_setting": sample.query_setting,
			"sample.query_data": sample.query_data_view,
		},
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
								field: sample.query_setting().field,
								useopricon: sample.query_setting().useopricon,
								data: sample.query_data.sort,
							},
							[
								function (_event, data) {
									sample.query_data.sort = data;

									//get record
									$.db.api.list(
										{
											name: "customer",
											data: sample.query_data,
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
		msg: [
			"Using {{$.query.field}} to edit query field only for <b>cl generic database</b>.",
			new $.codepreview({
				container: "card",
				code: `
					new $.query.field(
						{
							field: setting_fileld,
							data: query_field_data,
						},
						[
							function (event, query_field_result) {
								//callback if user press okay
							},
							function (event){
								//callback if user press cancel
							}
						]
					).show();
			`,
			}),
		],
		sample: {
			"sample.query_setting": sample.query_setting,
			"sample.query_data": sample.query_data_view,
		},
		viewclass: "cl-modal-preview",
		code: function () {
			return [
				new $.query.field(
					{
						field: sample.query_setting().field,
						data: sample.query_data.field,
					},
					[
						function (_event, data) {
							sample.query_data.field = data;
						},
					],
					{ debug: true }
				),
			];
		},
	},

	{
		title: "Live preview",

		sample: {
			"sample.query_setting": sample.query_setting,
			"sample.query_data": sample.query_data_view,
		},
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
								field: sample.query_setting().field,
								data: sample.query_data.field,
							},
							[
								function (_event, data) {
									sample.query_data.field = data;

									//get record
									$.db.api.list(
										{
											name: "customer",
											data: sample.query_data,
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
		msg: [
			"Using {{$.query.limit}} to edit query limit only for <b>cl generic database</b>.",
			new $.codepreview({
				container: "card",
				code: `
					new $.query.limit(
						{
							min: setting_limit_min,
							max: setting_limit_max,
							step: setting_limit_step,
							data: limit_data,
						},
						[
							function (event, limit_result) {
								//callback if user press okay
							},
							function (event){
								//callback if user press cancel
							}
						]
					).show();
			`,
			}),
		],
		sample: {
			"sample.query_setting": sample.query_setting,
			"sample.query_data": sample.query_data_view,
		},
		viewclass: "cl-modal-preview",
		code: function () {
			return [
				new $.query.limit(
					{
						min: sample.query_setting().limit.min,
						max: sample.query_setting().limit.max,
						step: sample.query_setting().limit.step,
						data: sample.query_data.limit,
					},
					[
						function (_event, data) {
							let skip = sample.query_data.skip / sample.query_data.limit;
							sample.query_data.limit = data;
							sample.query_data.skip = skip * sample.query_data.limit;
						},
					],
					{ debug: true }
				),
			];
		},
	},

	{
		title: "Live preview",

		sample: {
			"sample.query_setting": sample.query_setting,
			"sample.query_data": sample.query_data_view,
		},
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
								min: sample.query_setting().limit.min,
								max: sample.query_setting().limit.max,
								step: sample.query_setting().limit.step,
								data: sample.query_data.limit,
							},
							[
								function (_event, data) {
									let skip = sample.query_data.skip / sample.query_data.limit;
									sample.query_data.limit = data;
									sample.query_data.skip = skip * sample.query_data.limit;

									//get record
									$.db.api.list(
										{
											name: "customer",
											data: sample.query_data,
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
		msg: [
			"Using {{$.query.page}} to edit query page only for <b>cl generic database</b>.",
			new $.codepreview({
				container: "card",
				code: `
					new $.query.page(
						{
							min: setting_page_min,
							max: setting_page_max,
							step: setting_page_step,
							limit: limit_data,
							data: page_data,
						},
						[
							function (event, page_result) {
								//callback if user press okay
							},
							function (event){
								//callback if user press cancel
							}
						]
					).show();
			`,
			}),
		],
		sample: {
			"sample.query_setting": sample.query_setting,
			"sample.query_data": sample.query_data_view,
		},
		viewclass: "cl-modal-preview",
		code: function () {
			return [
				new $.query.page(
					{
						min: sample.query_setting().skip.min,
						max: sample.query_setting().skip.max,
						step: sample.query_setting().skip.step,
						limit: sample.query_data.limit,
						data: sample.query_data.skip,
					},
					[
						function (_event, data) {
							sample.query_data.skip = data;
						},
					],
					{ debug: true }
				),
			];
		},
	},

	{
		title: "Live preview",

		sample: {
			"sample.query_setting": sample.query_setting,
			"sample.query_data": sample.query_data_view,
		},
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
								min: sample.query_setting().skip.min,
								max: sample.query_setting().skip.max,
								step: sample.query_setting().skip.step,
								limit: sample.query_data.limit,
								data: sample.query_data.skip,
							},
							[
								function (_event, data) {
									sample.query_data.skip = data;

									//get record
									$.db.api.list(
										{
											name: "customer",
											data: sample.query_data,
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
