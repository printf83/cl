"use strict";
import sample from "./sample.js";
import $ from "../component.js";

export default [
	{
		title: "List",
		msg: "Provide access to easy access <b>cl generic database</b>.",
		anchor: false,
	},

	{
		title: "Example",
		sample: {
			"sample.query_setting": sample.query_setting,
			"sample.query_data": sample.query_data_view,
			"sample.list_state": sample.list_state,
		},
		code: function () {
			let resultOutputId = $.core.UUID();
			let btnGenerate = $.core.UUID();

			return [
				//run code button
				new $.button({
					id: btnGenerate,
					label: "Run Code",
					icon: "play",
					color: "primary",
					onclick: function (event) {
						//get button to show loading
						let sender = event.currentTarget;

						//get list of state
						sample.list_state(function (dbstate) {
							//generate list container
							$.core.replaceWith(
								document.getElementById(resultOutputId),

								//list container option
								new $.list.container({
									id: resultOutputId,
									setting: sample.query_setting(dbstate),
									query: sample.query_data,
									name: "customer",
								})
							);

							//load data into generated list container
							$.list.container.reload(resultOutputId, sender, function () {
								//hide run code button
								document.getElementById(btnGenerate).classList.add("d-none");
								document.getElementById(resultOutputId).classList.remove("d-none");
							});
						}, sender);
					},
				}),

				//output list container
				new $.div({ id: resultOutputId, display: "none" }),
			];
		},
	},

	{
		title: "No paging",
		sample: {
			"sample.query_setting": sample.query_setting,
			"sample.query_data": sample.query_data_view,
			"sample.list_state": sample.list_state,
		},
		code: function () {
			let resultOutputId = $.core.UUID();
			let btnGenerate = $.core.UUID();

			return [
				//run code button
				new $.button({
					id: btnGenerate,
					label: "Run Code",
					icon: "play",
					color: "primary",
					onclick: function (event) {
						//get button to show loading
						let sender = event.currentTarget;

						//get list of state
						sample.list_state(function (dbstate) {
							//generate list container
							$.core.replaceWith(
								document.getElementById(resultOutputId),

								//list container option
								new $.list.container({
									id: resultOutputId,
									setting: sample.query_setting(dbstate),
									query: sample.query_data,
									name: "customer",
									paging: false, //disable paging
								})
							);

							//load data into generated list container
							$.list.container.reload(resultOutputId, sender, function () {
								//hide run code button
								document.getElementById(btnGenerate).classList.add("d-none");
								document.getElementById(resultOutputId).classList.remove("d-none");
							});
						}, sender);
					},
				}),

				//output list container
				new $.div({ id: resultOutputId, display: "none" }),
			];
		},
	},

	{
		title: "Item",
		sample: {
			"sample.query_setting": sample.query_setting,
			"sample.query_data": sample.query_data_view,
			"sample.list_state": sample.list_state,
		},
		code: function () {
			let resultOutputId = $.core.UUID();
			let btnGenerate = $.core.UUID();

			return [
				//run code button
				new $.button({
					id: btnGenerate,
					label: "Run Code",
					icon: "play",
					color: "primary",
					onclick: function (event) {
						//get button to show loading
						let sender = event.currentTarget;

						//get list of state
						sample.list_state(function (dbstate) {
							//generate list container
							$.core.replaceWith(
								document.getElementById(resultOutputId),

								//list container option
								new $.list.container({
									id: resultOutputId,
									setting: sample.query_setting(dbstate),
									query: sample.query_data,
									name: "customer",
									item: function (data) {
										//custom item template
										return new $.list.item({
											key: data._id,
											name: data.name,
											picture: data.picture,
											detail: new $.small(
												[data.phone, data.dob, data.email].filter(Boolean).join(" | ")
											),
										});
									},
								})
							);

							//load data into generated list container
							$.list.container.reload(resultOutputId, sender, function () {
								//hide run code button
								document.getElementById(btnGenerate).classList.add("d-none");
								document.getElementById(resultOutputId).classList.remove("d-none");
							});
						}, sender);
					},
				}),

				//output list container
				new $.div({ id: resultOutputId, display: "none" }),
			];
		},
	},

	{
		title: "Group",
		sample: {
			"sample.query_setting": sample.query_setting,
			"sample.query_data": sample.query_data_view,
			"sample.list_items": sample.list_items,
			"sample.list_group": sample.list_group,
			"sample.list_state": sample.list_state,
		},
		code: function () {
			let resultOutputId = $.core.UUID();
			let btnGenerate = $.core.UUID();

			return [
				new $.button({
					id: btnGenerate,
					label: "Run Code",
					icon: "play",
					color: "primary",
					onclick: function (event) {
						//run code button
						let sender = event.currentTarget;

						//get list of state
						sample.list_state(function (dbstate) {
							//generate list container
							$.core.replaceWith(
								document.getElementById(resultOutputId),

								//list container option
								new $.list.container({
									id: resultOutputId,
									setting: sample.query_setting(dbstate),
									query: sample.query_data,
									name: "customer",
									items: sample.list_items,
									item: function (data) {
										//custom list item
										return new $.list.item({
											key: data._id,
											name: data.name,
											picture: data.picture,
											detail: new $.small(
												[data.phone, data.dob, data.email].filter(Boolean).join(" | ")
											),
										});
									},
									group: sample.list_group, //list item group setup
								})
							);

							//load data into generated list container
							$.list.container.reload(resultOutputId, sender, function () {
								//hide run code button
								document.getElementById(btnGenerate).classList.add("d-none");
								document.getElementById(resultOutputId).classList.remove("d-none");
							});
						}, sender);
					},
				}),

				//output list container
				new $.div({ id: resultOutputId, display: "none" }),
			];
		},
	},

	{
		title: "Allow delete",
		msg: [
			"You can set allowed action on {{$.list.item}}",
			new $.ul({
				item: [
					"<code>allow_delete: true</code> to add delete button on item.",
					"<code>allow_copy: true</code> to add copy button on item.",
					"<code>allow_action: true</code> to allow edit and check on item.",
				],
			}),
		],
		sample: {
			"sample.query_setting": sample.query_setting,
			"sample.query_data": sample.query_data_view,
			"sample.list_editor": sample.list_editor,
			"sample.list_items": sample.list_items,
			"sample.list_group": sample.list_group,
			"sample.list_state": sample.list_state,
		},
		code: function () {
			let resultOutputId = $.core.UUID();
			let btnGenerate = $.core.UUID();

			return [
				//run code button
				new $.button({
					id: btnGenerate,
					label: "Run Code",
					icon: "play",
					color: "primary",
					onclick: function (event) {
						//get button to show loading
						let sender = event.currentTarget;

						//get list of state
						sample.list_state(function (dbstate) {
							//generate list container
							$.core.replaceWith(
								document.getElementById(resultOutputId),

								//list container option
								new $.list.container({
									id: resultOutputId,
									setting: sample.query_setting(dbstate),
									query: sample.query_data,
									editor: sample.list_editor,
									name: "customer",
									items: sample.list_items,
									item: function (data) {
										return new $.list.item({
											key: data._id,
											name: data.name,
											picture: data.picture,
											detail: new $.small(
												[data.phone, data.dob, data.email].filter(Boolean).join(" | ")
											),
											allow_delete: true, //set allow delete
										});
									},
									group: sample.list_group,
								})
							);

							//load data into generated list container
							$.list.container.reload(resultOutputId, sender, function () {
								//hide run code button
								document.getElementById(btnGenerate).classList.add("d-none");
								document.getElementById(resultOutputId).classList.remove("d-none");
							});
						}, sender);
					},
				}),

				//output list container
				new $.div({ id: resultOutputId, display: "none" }),
			];
		},
	},

	{
		title: "Editor",
		msg: ["Please provide editor to allow <b>Add</b>, <b>Edit</b> and <b>Copy</b> function to work."],
		sample: {
			"sample.query_setting": sample.query_setting,
			"sample.query_data": sample.query_data_view,
			"sample.list_editor": sample.list_editor,
			"sample.list_items": sample.list_items,
			"sample.list_item": sample.list_item,
			"sample.list_group": sample.list_group,
			"sample.list_state": sample.list_state,
			"sample.list_more": sample.list_more,
		},
		code: function () {
			let resultOutputId = $.core.UUID();
			let btnGenerate = $.core.UUID();

			return [
				//run code button
				new $.button({
					id: btnGenerate,
					label: "Run Code",
					icon: "play",
					color: "primary",
					onclick: function (event) {
						//get button to show loading
						let sender = event.currentTarget;

						//get list of state
						sample.list_state(function (dbstate) {
							//generate list container
							$.core.replaceWith(
								document.getElementById(resultOutputId),

								//list container option
								new $.list.container({
									id: resultOutputId,
									setting: sample.query_setting(dbstate),
									query: sample.query_data,
									editor: sample.list_editor, //editor setting
									name: "customer",
									items: sample.list_items,
									item: sample.list_item,
									group: sample.list_group,
									more: sample.list_more,
								})
							);

							//load data into generated list container
							$.list.container.reload(resultOutputId, sender, function () {
								//hide run code button
								document.getElementById(btnGenerate).classList.add("d-none");
								document.getElementById(resultOutputId).classList.remove("d-none");
							});
						}, sender);
					},
				}),

				//output list container
				new $.div({ id: resultOutputId, display: "none" }),
			];
		},
	},

	{
		title: "Add new record",
		msg: [
			"Use {{$.list.container.item.add(containerID, sender)}} to add new record into <b>cl generic database</b>. Please provide editor to use this function.",
		],
		sample: {
			"sample.query_setting": sample.query_setting,
			"sample.query_data": sample.query_data_view,
			"sample.list_editor": sample.list_editor,
			"sample.list_items": sample.list_items,
			"sample.list_item": sample.list_item,
			"sample.list_group": sample.list_group,
			"sample.list_state": sample.list_state,
			"sample.list_more": sample.list_more,
		},
		code: function () {
			let resultOutputId = $.core.UUID();
			let btnGenerate = $.core.UUID();
			let btnAdd = $.core.UUID();

			return [
				//run code button
				new $.button({
					id: btnGenerate,
					label: "Run Code",
					icon: "play",
					color: "primary",
					onclick: function (event) {
						//get button to show loading
						let sender = event.currentTarget;

						//get list of state
						sample.list_state(function (dbstate) {
							//generate list container
							$.core.replaceWith(
								document.getElementById(resultOutputId),

								//list container option
								new $.list.container({
									id: resultOutputId,
									setting: sample.query_setting(dbstate),
									query: sample.query_data,
									editor: sample.list_editor,
									name: "customer",
									items: sample.list_items,
									item: sample.list_item,
									group: sample.list_group,
									more: sample.list_more,
								})
							);

							//load data into generated list container
							$.list.container.reload(resultOutputId, sender, function () {
								//hide run code button and show add button
								document.getElementById(btnGenerate).classList.add("d-none");
								document.getElementById(btnAdd).classList.remove("d-none");
								document.getElementById(resultOutputId).classList.remove("d-none");
							});
						}, sender);
					},
				}),

				//add button
				new $.button({
					display: "none",
					marginbottom: 2,
					id: btnAdd,
					label: "Add new",
					icon: "floppy-disk",
					color: "success",
					onclick: function (event) {
						$.list.container.item.add(resultOutputId, event.currentTarget);
					},
				}),

				//output list container
				new $.div({ id: resultOutputId, display: "none" }),
			];
		},
	},

	{
		title: "Check mode",
		msg: [
			"Using shortcut to handle check mode for {{$.list.container}}.",
			new $.ul({
				item: [
					"<code>$.list.container.check.mode(containerID)</code> to change check mode.",
					"<code>$.list.container.check.all(containerID)</code> to select, decelect all item.",
					"<code>$.list.container.check.delete(containerID)</code> to delete all selected item.",
					"<code>$.list.container.check.get(containerID)</code> to get selected item.",
					"<code>$.list.container.check.set(containerID,data)</code> to set selected item.",
				],
			}),
		],
		sample: {
			"sample.query_setting": sample.query_setting,
			"sample.query_data": sample.query_data_view,
			"sample.list_editor": sample.list_editor,
			"sample.list_items": sample.list_items,
			"sample.list_item": sample.list_item,
			"sample.list_group": sample.list_group,
			"sample.list_state": sample.list_state,
			"sample.list_more": sample.list_more,
		},
		code: function () {
			let resultOutputId = $.core.UUID();
			let btnGenerate = $.core.UUID();
			let btnCheck = $.core.UUID();

			return [
				//run code button
				new $.button({
					id: btnGenerate,
					label: "Run Code",
					icon: "play",
					color: "primary",
					onclick: function (event) {
						//get button to show loading
						let sender = event.currentTarget;

						//get list of state
						sample.list_state(function (dbstate) {
							//generate list container
							$.core.replaceWith(
								document.getElementById(resultOutputId),

								//list container option
								new $.list.container({
									id: resultOutputId,
									setting: sample.query_setting(dbstate),
									query: sample.query_data,
									editor: sample.list_editor,
									name: "customer",
									items: sample.list_items,
									item: sample.list_item,
									group: sample.list_group,
									more: sample.list_more,
								})
							);

							//load data into generated list container
							$.list.container.reload(resultOutputId, sender, function () {
								//hide run code button and show check control
								document.getElementById(btnGenerate).classList.add("d-none");
								document.getElementById(btnCheck).classList.remove("d-none");
								document.getElementById(resultOutputId).classList.remove("d-none");
							});
						}, sender);
					},
				}),

				//check control
				new $.btngroup({
					id: btnCheck,
					marginbottom: 2,
					display: "none",
					elem: [
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
							label: "Select all",
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
						new $.button({
							label: "Get checked",
							showlabel: "lg",
							icon: "download",
							color: "primary",
							onclick: function () {
								let checked = $.list.container.check.get(resultOutputId);
								//checked : [{key:value,name:value}]
								if (checked) {
									new $.dlg.inputbox(
										new $.input({
											type: "textarea",
											value: checked
												.map(function (i) {
													return i.key;
												})
												.join(","),
											name: "value",
										}),
										"ID",
										function (_event, data) {}
									).show();
								}
							},
						}),

						new $.button({
							label: "Set checked",
							showlabel: "lg",
							icon: "upload",
							color: "primary",
							onclick: function () {
								new $.dlg.inputbox("textarea", "ID", function (_event, data) {
									let checked = data.value.split(",");
									$.list.container.check.set(resultOutputId, checked);
								}).show();
							},
						}),
					],
				}),

				//output list container
				new $.div({ id: resultOutputId, display: "none" }),
			];
		},
	},

	{
		title: "Query dialog",
		msg: [
			"Using shortcut to show query dialog from {{$.list.container}}.",
			new $.ul({
				item: [
					"<code>$.list.container.query.all(containerID,sender)</code> to show <b>Query Editor</b> dialog.",
					"<code>$.list.container.query.filter(containerID,sender)</code> to show <b>Query Filter Editor</b> dialog.",
					"<code>$.list.container.query.sort(containerID,sender)</code> to show <b>Query Sort Editor</b> dialog.",
					"<code>$.list.container.query.field(containerID,sender)</code> to show <b>Query Field Editor</b> dialog.",
					"<code>$.list.container.query.limit(containerID,sender)</code> to show <b>Query Limit Editor</b> dialog.",
					"<code>$.list.container.query.page(containerID,sender)</code> to show <b>Query Page Editor</b> dialog.",
				],
			}),
		],
		sample: {
			"sample.query_setting": sample.query_setting,
			"sample.query_data": sample.query_data_view,
			"sample.list_editor": sample.list_editor,
			"sample.list_items": sample.list_items,
			"sample.list_item": sample.list_item,
			"sample.list_group": sample.list_group,
			"sample.list_state": sample.list_state,
			"sample.list_more": sample.list_more,
		},
		code: function () {
			let resultOutputId = $.core.UUID();
			let btnGenerate = $.core.UUID();
			let btnQuery = $.core.UUID();

			return [
				//run code button
				new $.button({
					id: btnGenerate,
					label: "Run Code",
					icon: "play",
					color: "primary",
					onclick: function (event) {
						//get button to show loading
						let sender = event.currentTarget;

						//get list of state
						sample.list_state(function (dbstate) {
							//generate list container
							$.core.replaceWith(
								document.getElementById(resultOutputId),

								//list container option
								new $.list.container({
									id: resultOutputId,
									setting: sample.query_setting(dbstate),
									query: sample.query_data,
									editor: sample.list_editor,
									name: "customer",
									items: sample.list_items,
									item: sample.list_item,
									group: sample.list_group,
									more: sample.list_more,
								})
							);

							//load data into generated list container
							$.list.container.reload(resultOutputId, sender, function () {
								//hide run code button and show query control
								document.getElementById(btnGenerate).classList.add("d-none");
								document.getElementById(btnQuery).classList.remove("d-none");
								document.getElementById(resultOutputId).classList.remove("d-none");
							});
						}, sender);
					},
				}),

				//query control
				new $.btngroup({
					id: btnQuery,
					marginbottom: 2,
					display: "none",
					elem: [
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
					],
				}),

				//output list container
				new $.div({ id: resultOutputId, display: "none" }),
			];
		},
	},
];
