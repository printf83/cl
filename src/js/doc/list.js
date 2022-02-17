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
	items: function (data, item) {
		let lastgroup = null;
		let result = [];
		data.forEach(function (i) {
			if (dbstate) {
				if (i.state && lastgroup !== i.state) {
					lastgroup = i.state;
					let iname = dbstate.filter(function (el) {
						return el.value === i.state;
					})[0]?.label;

					result.push({
						elem: new $.list.group({ key: i.state, name: iname }),
					});
				}
			}

			result.push({
				elem: item(i),
			});
		});

		return result;
	},
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
					item: fn.item,
				}),
			];
		},
	},

	{
		title: "Group",
		container: sample.formcontainer,
		code: function () {
			let resultOutputId = $.core.UUID();

			return [
				new $.button({
					label: "Reload",
					icon: "fire",
					color: "primary",
					onclick: function (event) {
						let sender = event.currentTarget;
						fn.state(function () {
							$.list.container.set(resultOutputId, "items", fn.items);
							$.list.container.reload(resultOutputId, sender);
						}, sender);
					},
				}),

				new $.list.container({
					id: resultOutputId,
					setting: fn.setting,
					query: fn.query,
					name: "customer",
					items: fn.items,
					item: fn.item,
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
						$.list.container.set(resultOutputId, "items", fn.items);
						$.list.container.reload(resultOutputId, event.currentTarget);
					},
				}),

				new $.list.container({
					id: resultOutputId,
					setting: fn.setting,
					query: fn.query,
					name: "customer",
					items: fn.items,
					item: fn.item,
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
						let sender = event.currentTarget;
						fn.state(function () {
							$.list.container.set(resultOutputId, "items", fn.items);
							$.list.container.set(resultOutputId, "setting", fn.setting);
							$.list.container.reload(resultOutputId, sender);
						}, sender);
					},
				}),

				new $.list.container({
					id: resultOutputId,
					setting: fn.setting,
					query: fn.query,
					editor: fn.editor,
					name: "customer",
					items: fn.items,
					item: fn.item,
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
							let sender = event.currentTarget;
							fn.state(function () {
								$.list.container.set(resultOutputId, "items", fn.items);
								$.list.container.set(resultOutputId, "setting", fn.setting);
								$.list.container.set(resultOutputId, "editor", fn.editor);
								$.list.container.reload(resultOutputId, sender);
							}, sender);
						},
					}),

					new $.button({
						label: "Add new",
						icon: "floppy-disk",
						color: "success",
						onclick: function (event) {
							let sender = event.currentTarget;
							fn.state(function () {
								$.list.container.set(resultOutputId, "items", fn.items);
								$.list.container.set(resultOutputId, "editor", fn.editor);
								$.list.container.item.add(resultOutputId, sender);
							}, sender);
						},
					}),
				]),

				new $.list.container({
					id: resultOutputId,
					setting: fn.setting,
					query: fn.query,
					editor: fn.editor,
					name: "customer",
					items: fn.items,
					item: fn.item,
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
							let sender = event.currentTarget;
							fn.state(function () {
								$.list.container.set(resultOutputId, "items", fn.items);
								$.list.container.set(resultOutputId, "setting", fn.setting);
								$.list.container.set(resultOutputId, "editor", fn.editor);
								$.list.container.reload(resultOutputId, sender);
							}, sender);
						},
					}),

					new $.button({
						icon: "floppy-disk",
						color: "success",
						outline: true,
						onclick: function (event) {
							let sender = event.currentTarget;
							fn.state(function () {
								$.list.container.set(resultOutputId, "items", fn.items);
								$.list.container.set(resultOutputId, "editor", fn.editor);
								$.list.container.item.add(resultOutputId, sender);
							}, sender);
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
					items: fn.items,
					item: fn.item,
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
							let sender = event.currentTarget;
							fn.state(function () {
								$.list.container.set(resultOutputId, "setting", fn.setting);
								$.list.container.set(resultOutputId, "editor", fn.editor);
								$.list.container.set(resultOutputId, "items", fn.items);
								$.list.container.reload(resultOutputId, sender);
							}, sender);
						},
					}),

					new $.button({
						icon: "floppy-disk",
						color: "success",
						outline: true,
						onclick: function (event) {
							let sender = event.currentTarget;
							fn.state(function () {
								$.list.container.set(resultOutputId, "editor", fn.editor);
								$.list.container.set(resultOutputId, "items", fn.items);
								$.list.container.item.add(resultOutputId, sender);
							}, sender);
						},
					}),

					new $.button({
						icon: "list-check",
						color: "warning",
						outline: true,
						onclick: function () {
							$.list.container.check.mode(resultOutputId);
						},
					}),

					new $.button({
						icon: "check-double",
						color: "warning",
						outline: true,
						onclick: function () {
							$.list.container.check.all(resultOutputId);
						},
					}),

					new $.button({
						icon: "trash-can",
						color: "danger",
						outline: true,
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
							let sender = event.currentTarget;
							fn.state(function () {
								$.list.container.set(resultOutputId, "items", fn.items);
								$.list.container.set(resultOutputId, "setting", fn.setting);
								$.list.container.query.all(resultOutputId, sender);
							}, sender);
						},
					}),

					new $.button({
						icon: "filter",
						color: "primary",
						onclick: function (event) {
							let sender = event.currentTarget;
							fn.state(function () {
								$.list.container.set(resultOutputId, "items", fn.items);
								$.list.container.set(resultOutputId, "setting", fn.setting);
								$.list.container.query.filter(resultOutputId, sender);
							}, sender);
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
					items: fn.items,
					item: fn.item,
				}),
			];
		},
	},
];
