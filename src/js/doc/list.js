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
				option: null,
				value: data ? data.state : null,
			}),
		];
	},
};

export default [
	{
		title: "List",
		msg: "Provide access to easy access <b>cl generic database</b>.",
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
			"fn.editor",
			new $.codepreview({
				container: "card",
				code: `
					function (data, readonly) {
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
								option: null,
								value: data ? data.state : null,
							}),
						]
					}
			`,
			}),
		],
	},

	{
		title: "Example",
		container: sample.formcontainer,
		code: function () {
			let resultOutputId = $.core.UUID();

			return [
				new $.button({
					label: "Reload",
					icon: "fire",
					color: "primary",
					onclick: function (event) {
						$.list.container.reload(resultOutputId, event.currentTarget);
					},
				}),

				new $.list.container({
					id: resultOutputId,
					setting: fn.setting,
					query: fn.query,
					name: "customer",
				}),
			];
		},
	},

	{
		title: "No paging",
		container: sample.formcontainer,
		code: function () {
			let resultOutputId = $.core.UUID();

			return [
				new $.button({
					label: "Reload",
					icon: "fire",
					color: "primary",
					onclick: function (event) {
						$.list.container.reload(resultOutputId, event.currentTarget);
					},
				}),

				new $.list.container({
					id: resultOutputId,
					setting: fn.setting,
					query: fn.query,
					name: "customer",
					paging: false,
				}),
			];
		},
	},

	{
		title: "Item",
		container: sample.formcontainer,
		code: function () {
			let resultOutputId = $.core.UUID();

			return [
				new $.button({
					label: "Reload",
					icon: "fire",
					color: "primary",
					onclick: function (event) {
						$.list.container.reload(resultOutputId, event.currentTarget);
					},
				}),

				new $.list.container({
					id: resultOutputId,
					setting: fn.setting,
					query: fn.query,
					name: "customer",
					item: function (data) {
						return new $.list.item({
							key: data._id,
							name: data.name,
							picture: data.picture,
							detail: new $.small([data.phone, data.dob, data.email].filter(Boolean).join(" | ")),
						});
					},
				}),
			];
		},
	},

	{
		title: "Allow delete",
		container: sample.formcontainer,
		code: function () {
			let resultOutputId = $.core.UUID();

			return [
				new $.button({
					label: "Reload",
					icon: "fire",
					color: "primary",
					onclick: function (event) {
						$.list.container.reload(resultOutputId, event.currentTarget);
					},
				}),

				new $.list.container({
					id: resultOutputId,
					setting: fn.setting,
					query: fn.query,
					name: "customer",
					item: function (data) {
						return new $.list.item({
							key: data._id,
							name: data.name,
							picture: data.picture,
							detail: new $.small([data.phone, data.dob, data.email].filter(Boolean).join(" | ")),
							allow_delete: true,
						});
					},
				}),
			];
		},
	},

	{
		title: "Editor",
		container: sample.formcontainer,
		code: function () {
			let resultOutputId = $.core.UUID();

			return [
				new $.button({
					label: "Reload",
					icon: "fire",
					color: "primary",
					onclick: function (event) {
						$.list.container.reload(resultOutputId, event.currentTarget);
					},
				}),

				new $.list.container({
					id: resultOutputId,
					setting: fn.setting,
					query: fn.query,
					editor: fn.editor,
					name: "customer",
					item: function (data) {
						return new $.list.item({
							key: data._id,
							name: data.name,
							picture: data.picture,
							detail: new $.small([data.phone, data.dob, data.email].filter(Boolean).join(" | ")),
							allow_delete: true,
							allow_copy: true,
							allow_action: true,
						});
					},
				}),
			];
		},
	},

	{
		title: "Add new record",
		container: sample.formcontainer,
		code: function () {
			let resultOutputId = $.core.UUID();

			return [
				new $.btngroup([
					new $.button({
						label: "Reload",
						icon: "fire",
						color: "primary",
						onclick: function (event) {
							$.list.container.reload(resultOutputId, event.currentTarget);
						},
					}),

					new $.button({
						label: "Add new",
						icon: "floppy-disk",
						color: "success",
						onclick: function (event) {
							$.list.container.item.add(resultOutputId, event.currentTarget);
						},
					}),
				]),

				new $.list.container({
					id: resultOutputId,
					setting: fn.setting,
					query: fn.query,
					editor: fn.editor,
					name: "customer",
					item: function (data) {
						return new $.list.item({
							key: data._id,
							name: data.name,
							picture: data.picture,
							detail: new $.small([data.phone, data.dob, data.email].filter(Boolean).join(" | ")),
							allow_delete: true,
							allow_copy: true,
							allow_action: true,
						});
					},
				}),
			];
		},
	},

	{
		title: "Check mode",
		container: sample.formcontainer,
		code: function () {
			let resultOutputId = $.core.UUID();

			return [
				new $.btngroup([
					new $.button({
						label: "Reload",
						icon: "fire",
						color: "primary",
						onclick: function (event) {
							$.list.container.reload(resultOutputId, event.currentTarget);
						},
					}),

					new $.button({
						label: "Add new",
						showlabel: "lg",
						icon: "floppy-disk",
						color: "success",
						onclick: function (event) {
							$.list.container.item.add(resultOutputId, event.currentTarget);
						},
					}),

					new $.button({
						label: "Check mode",
						showlabel: "lg",
						icon: "list-check",
						color: "warning",
						onclick: function () {
							$.list.container.check.mode(resultOutputId);
						},
					}),

					new $.button({
						label: "Check all",
						showlabel: "lg",
						icon: "check-double",
						color: "warning",
						onclick: function () {
							$.list.container.check.all(resultOutputId);
						},
					}),

					new $.button({
						label: "Delete checked",
						showlabel: "lg",
						icon: "trash-can",
						color: "danger",
						onclick: function (event) {
							$.list.container.check.delete(resultOutputId, event.currentTarget);
						},
					}),
				]),

				new $.list.container({
					id: resultOutputId,
					setting: fn.setting,
					query: fn.query,
					editor: fn.editor,
					name: "customer",
					item: function (data) {
						return new $.list.item({
							key: data._id,
							name: data.name,
							picture: data.picture,
							detail: new $.small([data.phone, data.dob, data.email].filter(Boolean).join(" | ")),
							allow_delete: true,
							allow_copy: true,
							allow_action: true,
						});
					},
				}),
			];
		},
	},

	{
		title: "Query dialog",
		container: sample.formcontainer,
		code: function () {
			let resultOutputId = $.core.UUID();

			return [
				new $.btngroup([
					new $.button({
						label: "Reload",
						icon: "fire",
						color: "primary",
						onclick: function (event) {
							$.list.container.reload(resultOutputId, event.currentTarget);
						},
					}),

					new $.button({
						label: "Add new",
						showlabel: "lg",
						icon: "floppy-disk",
						color: "success",
						onclick: function (event) {
							$.list.container.item.add(resultOutputId, event.currentTarget);
						},
					}),

					new $.button({
						label: "Check mode",
						showlabel: "lg",
						icon: "list-check",
						color: "warning",
						onclick: function () {
							$.list.container.check.mode(resultOutputId);
						},
					}),

					new $.button({
						label: "Check all",
						showlabel: "lg",
						icon: "check-double",
						color: "warning",
						onclick: function () {
							$.list.container.check.all(resultOutputId);
						},
					}),

					new $.button({
						label: "Delete checked",
						showlabel: "lg",
						icon: "trash-can",
						color: "danger",
						onclick: function (event) {
							$.list.container.check.delete(resultOutputId, event.currentTarget);
						},
					}),
				]),
				new $.btngroup([
					new $.button({
						label: "Query",
						showlabel: "lg",
						icon: "fire",
						color: "primary",
						onclick: function (event) {
							$.list.container.query.all(resultOutputId, event.currentTarget);
						},
					}),

					new $.button({
						icon: "filter",
						color: "primary",
						onclick: function (event) {
							$.list.container.query.filter(resultOutputId, event.currentTarget);
						},
					}),

					new $.button({
						icon: "sort",
						color: "primary",
						onclick: function (event) {
							$.list.container.query.sort(resultOutputId, event.currentTarget);
						},
					}),

					new $.button({
						icon: "tasks",
						color: "primary",
						onclick: function (event) {
							$.list.container.query.field(resultOutputId, event.currentTarget);
						},
					}),

					new $.button({
						icon: "list-ol",
						color: "primary",
						onclick: function (event) {
							$.list.container.query.limit(resultOutputId, event.currentTarget);
						},
					}),

					new $.button({
						icon: { icon: "sort", rotate: 90 },
						color: "primary",
						onclick: function (event) {
							$.list.container.query.page(resultOutputId, event.currentTarget);
						},
					}),
				]),
				new $.list.container({
					id: resultOutputId,
					setting: fn.setting,
					query: fn.query,
					editor: fn.editor,
					name: "customer",
					item: function (data) {
						return new $.list.item({
							key: data._id,
							name: data.name,
							picture: data.picture,
							detail: new $.small([data.phone, data.dob, data.email].filter(Boolean).join(" | ")),
							allow_delete: true,
							allow_copy: true,
							allow_action: true,
						});
					},
				}),
			];
		},
	},
];
