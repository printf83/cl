"use strict";
import sample from "./sample.js";
import * as core from "../base/core.js";
import button from "../base/button.js";
import * as list from "../base/list.js";
import input from "../base/input.js";
import btngroup from "../base/btngroup.js";
import * as dlg from "../base/dlg.js";
import small from "../base/small.js";
import div from "../base/div.js";
import ul from "../base/ul.js";
import file from "../base/file.js";
import toast from "../base/toast.js";

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
		import: ["button", "list", "div", "sample"],
		code: () => {
			let resultOutputId = core.UUID();
			let btnGenerate = core.UUID();

			let d = {};

			return [
				//run code button
				new button({
					id: btnGenerate,
					label: "Run Code",
					icon: "play",
					color: "primary",
					click: (event) => {
						//get button to show loading
						let sender = event.currentTarget;

						//get list of state
						sample.list_state((dbstate) => {
							//generate list container
							core.replaceWith(
								document.getElementById(resultOutputId),

								//list container option

								//marker
								new list.container({
									id: resultOutputId,
									setting: sample.query_setting(dbstate),
									query: sample.query_data,
									name: "customer",
								})
								//-
							);

							//load data into generated list container

							//marker
							list.container.reload(resultOutputId, sender, () => {
								//hide run code button
								document.getElementById(btnGenerate).classList.add("d-none");
								document.getElementById(resultOutputId).classList.remove("d-none");
							});
							//-
						}, sender);
					},
				}),

				//output list container
				new div({ id: resultOutputId, display: "none" }),
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
		import: ["button", "list", "div", "sample"],
		code: () => {
			let resultOutputId = core.UUID();
			let btnGenerate = core.UUID();

			let d = {};

			return [
				//run code button
				new button({
					id: btnGenerate,
					label: "Run Code",
					icon: "play",
					color: "primary",
					click: (event) => {
						//get button to show loading
						let sender = event.currentTarget;

						//get list of state
						sample.list_state((dbstate) => {
							//generate list container
							core.replaceWith(
								document.getElementById(resultOutputId),

								//list container option
								new list.container({
									id: resultOutputId,
									setting: sample.query_setting(dbstate),
									query: sample.query_data,
									name: "customer",

									//marker
									paging: false,
								})
							);

							//load data into generated list container
							list.container.reload(resultOutputId, sender, () => {
								//hide run code button
								document.getElementById(btnGenerate).classList.add("d-none");
								document.getElementById(resultOutputId).classList.remove("d-none");
							});
						}, sender);
					},
				}),

				//output list container
				new div({ id: resultOutputId, display: "none" }),
			];
		},
	},

	{
		title: "Container",
		sample: {
			"sample.query_setting": sample.query_setting,
			"sample.query_data": sample.query_data_view,
			"sample.list_state": sample.list_state,
		},
		import: ["button", "list", "div", "small", "ul", "sample"],
		code: () => {
			let resultOutputId = core.UUID();
			let btnGenerate = core.UUID();

			let d = {};

			return [
				//run code button
				new button({
					id: btnGenerate,
					label: "Run Code",
					icon: "play",
					color: "primary",
					click: (event) => {
						//get button to show loading
						let sender = event.currentTarget;

						//get list of state
						sample.list_state((dbstate) => {
							//generate list container
							core.replaceWith(
								document.getElementById(resultOutputId),

								//list container option
								new list.container({
									id: resultOutputId,
									setting: sample.query_setting(dbstate),
									query: sample.query_data,
									name: "customer",

									//marker
									container: (data, opt) => {
										//custom container template
										return new ul({ class: "list-group", elem: opt.row(data, opt) });
									},
									//-
								})
							);

							//load data into generated list container
							list.container.reload(resultOutputId, sender, () => {
								//hide run code button
								document.getElementById(btnGenerate).classList.add("d-none");
								document.getElementById(resultOutputId).classList.remove("d-none");
							});
						}, sender);
					},
				}),

				//output list container
				new div({ id: resultOutputId, display: "none" }),
			];
		},
	},

	{
		title: "Row",
		sample: {
			"sample.query_setting": sample.query_setting,
			"sample.query_data": sample.query_data_view,
			"sample.list_container": sample.list_container,
			"sample.list_state": sample.list_state,
		},
		import: ["button", "list", "div", "small", "sample"],
		code: () => {
			let resultOutputId = core.UUID();
			let btnGenerate = core.UUID();

			let d = {};

			return [
				new button({
					id: btnGenerate,
					label: "Run Code",
					icon: "play",
					color: "primary",
					click: (event) => {
						//run code button
						let sender = event.currentTarget;

						//get list of state
						sample.list_state((dbstate) => {
							//generate list container
							core.replaceWith(
								document.getElementById(resultOutputId),

								//list container option

								new list.container({
									id: resultOutputId,
									setting: sample.query_setting(dbstate),
									query: sample.query_data,
									name: "customer",
									container: sample.list_container,

									//marker
									row: (data, opt) => {
										let lastgroup = null;
										let result = [];
										data.forEach((i) => {
											if (dbstate) {
												if (i.state && lastgroup !== i.state) {
													lastgroup = i.state;
													let state_name = dbstate.filter((el) => {
														return el.value === i.state;
													})[0]?.label;

													result.push(
														opt.group(
															{
																key: i.state,
																name: state_name,
															},
															opt
														)
													);
												}
											}

											result.push(opt.item(i, opt));
										});

										return result;
									},
									//-
								})
							);

							//load data into generated list container
							list.container.reload(resultOutputId, sender, () => {
								//hide run code button
								document.getElementById(btnGenerate).classList.add("d-none");
								document.getElementById(resultOutputId).classList.remove("d-none");
							});
						}, sender);
					},
				}),

				//output list container
				new div({ id: resultOutputId, display: "none" }),
			];
		},
	},

	{
		title: "Group",
		sample: {
			"sample.query_setting": sample.query_setting,
			"sample.query_data": sample.query_data_view,
			"sample.list_container": sample.list_container,
			"sample.list_row": sample.list_row,
			"sample.list_group": sample.list_group,
			"sample.list_state": sample.list_state,
		},
		import: ["button", "list", "div", "small", "sample"],
		code: () => {
			let resultOutputId = core.UUID();
			let btnGenerate = core.UUID();

			let d = {};

			return [
				new button({
					id: btnGenerate,
					label: "Run Code",
					icon: "play",
					color: "primary",
					click: (event) => {
						//run code button
						let sender = event.currentTarget;

						//get list of state
						sample.list_state((dbstate) => {
							//generate list container
							core.replaceWith(
								document.getElementById(resultOutputId),

								//list container option
								new list.container({
									id: resultOutputId,
									setting: sample.query_setting(dbstate),
									query: sample.query_data,
									name: "customer",
									container: sample.list_container,
									row: sample.list_row,

									//marker
									group: (data, opt) => {
										//custom group setup
										return new list.group({ view: opt.view, key: data.key, name: data.name });
									},
									//-
								})
							);

							//load data into generated list container
							list.container.reload(resultOutputId, sender, () => {
								//hide run code button
								document.getElementById(btnGenerate).classList.add("d-none");
								document.getElementById(resultOutputId).classList.remove("d-none");
							});
						}, sender);
					},
				}),

				//output list container
				new div({ id: resultOutputId, display: "none" }),
			];
		},
	},

	{
		title: "Item",
		sample: {
			"sample.query_setting": sample.query_setting,
			"sample.query_data": sample.query_data_view,
			"sample.list_container": sample.list_container,
			"sample.list_row": sample.list_row,
			"sample.list_group": sample.list_group,
			"sample.list_state": sample.list_state,
		},
		import: ["button", "list", "div", "small", "sample"],
		code: () => {
			let resultOutputId = core.UUID();
			let btnGenerate = core.UUID();

			let d = {};

			return [
				//run code button
				new button({
					id: btnGenerate,
					label: "Run Code",
					icon: "play",
					color: "primary",
					click: (event) => {
						//get button to show loading
						let sender = event.currentTarget;

						//get list of state
						sample.list_state((dbstate) => {
							//generate list container
							core.replaceWith(
								document.getElementById(resultOutputId),

								//list container option
								new list.container({
									id: resultOutputId,
									setting: sample.query_setting(dbstate),
									query: sample.query_data,
									name: "customer",
									container: sample.list_container,
									row: sample.list_row,
									group: sample.list_group,

									//marker
									item: (data, opt) => {
										//custom item template
										return new list.item({
											view: opt.view,
											key: data._id,
											name: data.name,
											picture: data.picture,
											detail: new small(
												[data.phone, data.dob, data.email].filter(Boolean).join(" | ")
											),
											allow_delete: opt.allow_delete,
											allow_copy: opt.allow_copy,
											allow_action: opt.allow_action,
											allow_more: opt.allow_more,
										});
									},
									//-
								})
							);

							//load data into generated list container
							list.container.reload(resultOutputId, sender, () => {
								//hide run code button
								document.getElementById(btnGenerate).classList.add("d-none");
								document.getElementById(resultOutputId).classList.remove("d-none");
							});
						}, sender);
					},
				}),

				//output list container
				new div({ id: resultOutputId, display: "none" }),
			];
		},
	},

	{
		title: "Allow action",
		msg: [
			"You can set allowed action on {{list.item}} or {{list.container}}",
			new ul({
				item: [
					"<code>allow_delete: true</code> to add delete button on item.",
					"<code>allow_copy: true</code> to add copy button on item.",
					"<code>allow_action: true</code> to allow edit and check on item.",
					"<code>allow_more true</code> to add more button on item.",
				],
			}),
		],
		sample: {
			"sample.query_setting": sample.query_setting,
			"sample.query_data": sample.query_data_view,
			"sample.list_editor": sample.list_editor,
			"sample.list_container": sample.list_container,
			"sample.list_row": sample.list_row,
			"sample.list_group": sample.list_group,
			"sample.list_state": sample.list_state,
		},
		import: ["button", "list", "div", "small", "sample"],
		code: () => {
			let resultOutputId = core.UUID();
			let btnGenerate = core.UUID();

			let d = {};

			return [
				//run code button
				new button({
					id: btnGenerate,
					label: "Run Code",
					icon: "play",
					color: "primary",
					click: (event) => {
						//get button to show loading
						let sender = event.currentTarget;

						//get list of state
						sample.list_state((dbstate) => {
							//generate list container
							core.replaceWith(
								document.getElementById(resultOutputId),

								//list container option
								new list.container({
									name: "customer",
									id: resultOutputId,
									setting: sample.query_setting(dbstate),
									query: sample.query_data,
									editor: sample.list_editor,
									container: sample.list_container,
									row: sample.list_row,
									group: sample.list_group,
									item: sample.list_item,

									//marker
									allow_delete: true,
									allow_action: true,
									allow_copy: true,
									//-
								})
							);

							//load data into generated list container
							list.container.reload(resultOutputId, sender, () => {
								//hide run code button
								document.getElementById(btnGenerate).classList.add("d-none");
								document.getElementById(resultOutputId).classList.remove("d-none");
							});
						}, sender);
					},
				}),

				//output list container
				new div({ id: resultOutputId, display: "none" }),
			];
		},
	},

	{
		title: "Allow more button",
		msg: ["You can set allowed more action on {{list.more}}"],
		sample: {
			"sample.query_setting": sample.query_setting,
			"sample.query_data": sample.query_data_view,
			"sample.list_editor": sample.list_editor,
			"sample.list_container": sample.list_container,
			"sample.list_row": sample.list_row,
			"sample.list_item": sample.list_item,
			"sample.list_group": sample.list_group,
			"sample.list_state": sample.list_state,
			"sample.list_more": sample.list_more,
		},
		import: ["button", "list", "div", "small", "sample"],
		code: () => {
			let resultOutputId = core.UUID();
			let btnGenerate = core.UUID();

			let d = {};

			return [
				//run code button
				new button({
					id: btnGenerate,
					label: "Run Code",
					icon: "play",
					color: "primary",
					click: (event) => {
						//get button to show loading
						let sender = event.currentTarget;

						//get list of state
						sample.list_state((dbstate) => {
							//generate list container
							core.replaceWith(
								document.getElementById(resultOutputId),

								//list container option
								new list.container({
									name: "customer",
									id: resultOutputId,
									setting: sample.query_setting(dbstate),
									query: sample.query_data,
									editor: sample.list_editor,
									container: sample.list_container,
									row: sample.list_row,
									group: sample.list_group,
									item: sample.list_item,
									allow_delete: true,
									allow_action: true,
									allow_copy: true,

									//marker
									allow_more: true,
									item_more: (sender, id) => {
										//custom action when more button is clicked
										new toast("i", `Call from id:${id}`).show();
									},
									//-
								})
							);

							//load data into generated list container
							list.container.reload(resultOutputId, sender, () => {
								//hide run code button
								document.getElementById(btnGenerate).classList.add("d-none");
								document.getElementById(resultOutputId).classList.remove("d-none");
							});
						}, sender);
					},
				}),

				//output list container
				new div({ id: resultOutputId, display: "none" }),
			];
		},
	},

	{
		title: "Editor",
		msg: ["Please provide editor to allow <b>Add</b>, <b>Edit</b> and <b>Copy</b> function to work."],
		sample: {
			"sample.query_setting": sample.query_setting,
			"sample.query_data": sample.query_data_view,
			"sample.list_container": sample.list_container,
			"sample.list_row": sample.list_row,
			"sample.list_item": sample.list_item,
			"sample.list_group": sample.list_group,
			"sample.list_state": sample.list_state,
			"sample.list_more": sample.list_more,
		},
		import: ["button", "list", "div", "sample", "file", "input"],
		code: () => {
			let resultOutputId = core.UUID();
			let btnGenerate = core.UUID();

			let d = {};

			return [
				//run code button
				new button({
					id: btnGenerate,
					label: "Run Code",
					icon: "play",
					color: "primary",
					click: (event) => {
						//get button to show loading
						let sender = event.currentTarget;

						//get list of state
						sample.list_state((dbstate) => {
							//generate list container
							core.replaceWith(
								document.getElementById(resultOutputId),

								//list container option
								new list.container({
									name: "customer",
									file: ["picture"], // file will be saved automaticly
									id: resultOutputId,
									setting: sample.query_setting(dbstate),
									query: sample.query_data,
									container: sample.list_container,
									row: sample.list_row,
									group: sample.list_group,
									item: sample.list_item,
									more: sample.list_more,
									allow_delete: true,
									allow_action: true,
									allow_copy: true,
									allow_more: true,

									//marker
									editor: (data) => {
										//custom editor setting
										return [
											new input({
												type: "text",
												label: "Name",
												name: "name",
												required: true,
												value: data ? data.name : null,
											}),
											new input({
												type: "date",
												label: "Date of birth",
												name: "dob",
												value: data ? data.dob : null,
											}),
											new input({
												type: "text",
												label: "Phone",
												name: "phone",
												value: data ? data.phone : null,
											}),
											new file({
												label: "Picture",
												name: "picture",
												value: data ? data.picture : null,
											}),
											new input({
												type: "email",
												label: "Email",
												name: "email",
												value: data ? data.email : null,
											}),
											new input({
												type: "select",
												label: "State",
												name: "state",
												required: true,
												option: dbstate,
												value: data ? data.state : null,
											}),
										];
									},
									//-
								})
							);

							//load data into generated list container
							list.container.reload(resultOutputId, sender, () => {
								//hide run code button
								document.getElementById(btnGenerate).classList.add("d-none");
								document.getElementById(resultOutputId).classList.remove("d-none");
							});
						}, sender);
					},
				}),

				//output list container
				new div({ id: resultOutputId, display: "none" }),
			];
		},
	},

	{
		title: "Add new record",
		msg: [
			"Use {{list.container.item.add(containerID, sender)}} to add new record into <b>cl generic database</b>. Please provide editor to use this function.",
		],
		sample: {
			"sample.query_setting": sample.query_setting,
			"sample.query_data": sample.query_data_view,
			"sample.list_editor": sample.list_editor,
			"sample.list_container": sample.list_container,
			"sample.list_row": sample.list_row,
			"sample.list_item": sample.list_item,
			"sample.list_group": sample.list_group,
			"sample.list_state": sample.list_state,
			"sample.list_more": sample.list_more,
		},
		import: ["button", "list", "div", "sample"],
		code: () => {
			let resultOutputId = core.UUID();
			let btnGenerate = core.UUID();
			let btnAdd = core.UUID();

			let d = {};

			return [
				//run code button
				new button({
					id: btnGenerate,
					label: "Run Code",
					icon: "play",
					color: "primary",
					click: (event) => {
						//get button to show loading
						let sender = event.currentTarget;

						//get list of state
						sample.list_state((dbstate) => {
							//generate list container
							core.replaceWith(
								document.getElementById(resultOutputId),

								//list container option
								new list.container({
									name: "customer",
									file: ["picture"], // file will be saved automaticly
									id: resultOutputId,
									setting: sample.query_setting(dbstate),
									query: sample.query_data,
									editor: sample.list_editor,
									container: sample.list_container,
									row: sample.list_row,
									item: sample.list_item,
									group: sample.list_group,
									more: sample.list_more,
									allow_delete: true,
									allow_action: true,
									allow_copy: true,
									allow_more: true,
								})
							);

							//load data into generated list container
							list.container.reload(resultOutputId, sender, () => {
								//hide run code button and show add button
								document.getElementById(btnGenerate).classList.add("d-none");
								document.getElementById(btnAdd).classList.remove("d-none");
								document.getElementById(resultOutputId).classList.remove("d-none");
							});
						}, sender);
					},
				}),

				//add button
				new button({
					display: "none",
					marginBottom: 2,
					id: btnAdd,
					label: "Add new",
					icon: "floppy-disk",
					color: "success",
					click: (event) => {
						//marker
						list.container.item.add(resultOutputId, event.currentTarget);
					},
				}),

				//output list container
				new div({ id: resultOutputId, display: "none" }),
			];
		},
	},

	{
		title: "Check mode",
		msg: [
			"Using shortcut to handle check mode for {{list.container}}.",
			new ul({
				item: [
					"<code>list.container.check.mode(containerID)</code> to change check mode.",
					"<code>list.container.check.all(containerID)</code> to select, decelect all item.",
					"<code>list.container.check.delete(containerID)</code> to delete all selected item.",
					"<code>list.container.check.get(containerID)</code> to get selected item.",
					"<code>list.container.check.set(containerID,data)</code> to set selected item.",
				],
			}),
		],
		sample: {
			"sample.query_setting": sample.query_setting,
			"sample.query_data": sample.query_data_view,
			"sample.list_editor": sample.list_editor,
			"sample.list_container": sample.list_container,
			"sample.list_row": sample.list_row,
			"sample.list_item": sample.list_item,
			"sample.list_group": sample.list_group,
			"sample.list_state": sample.list_state,
			"sample.list_more": sample.list_more,
		},
		import: ["button", "list", "div", "btngroup", "dlg", "input", "sample"],
		code: () => {
			let resultOutputId = core.UUID();
			let btnGenerate = core.UUID();
			let btnCheck = core.UUID();

			let d = {};

			return [
				//run code button
				new button({
					id: btnGenerate,
					label: "Run Code",
					icon: "play",
					color: "primary",
					click: (event) => {
						//get button to show loading
						let sender = event.currentTarget;

						//get list of state
						sample.list_state((dbstate) => {
							//generate list container
							core.replaceWith(
								document.getElementById(resultOutputId),

								//list container option
								new list.container({
									name: "customer",
									file: ["picture"], // file will be saved automaticly
									query: sample.query_data,
									id: resultOutputId,
									setting: sample.query_setting(dbstate),
									editor: sample.list_editor,
									container: sample.list_container,
									row: sample.list_row,
									item: sample.list_item,
									group: sample.list_group,
									more: sample.list_more,
									allow_delete: true,
									allow_action: true,
									allow_copy: true,
									allow_more: true,
								})
							);

							//load data into generated list container
							list.container.reload(resultOutputId, sender, () => {
								//hide run code button and show check control
								document.getElementById(btnGenerate).classList.add("d-none");
								document.getElementById(btnCheck).classList.remove("d-none");
								document.getElementById(resultOutputId).classList.remove("d-none");
							});
						}, sender);
					},
				}),

				//check control
				new btngroup({
					id: btnCheck,
					marginBottom: 2,
					display: "none",
					elem: [
						new button({
							label: "Check mode",
							showlabel: "lg",
							icon: "list-check",
							color: "warning",
							click: () => {
								//marker
								list.container.check.mode(resultOutputId);
							},
						}),

						new button({
							label: "Select all",
							showlabel: "lg",
							icon: "check-double",
							color: "warning",
							click: () => {
								//marker
								list.container.check.all(resultOutputId);
							},
						}),

						new button({
							label: "Delete checked",
							showlabel: "lg",
							icon: "trash-can",
							color: "danger",
							click: (event) => {
								//marker
								list.container.check.delete(resultOutputId, event.currentTarget);
							},
						}),
						new button({
							label: "Get checked",
							showlabel: "lg",
							icon: "download",
							color: "primary",
							click: () => {
								//marker
								let checked = list.container.check.get(resultOutputId);

								//checked : [{key:value,name:value}]
								if (checked) {
									new dlg.inputbox(
										new input({
											type: "textarea",
											value: checked
												.map((i) => {
													return i.key;
												})
												.join(","),
											name: "value",
										}),
										"ID",
										(_event, data) => {}
									).show();
								}
							},
						}),

						new button({
							label: "Set checked",
							showlabel: "lg",
							icon: "upload",
							color: "primary",
							click: () => {
								new dlg.inputbox("textarea", "ID", (_event, data) => {
									let checked = data.value.split(",");

									//marker
									list.container.check.set(resultOutputId, checked);
								}).show();
							},
						}),
					],
				}),

				//output list container
				new div({ id: resultOutputId, display: "none" }),
			];
		},
	},

	{
		title: "Query dialog",
		msg: [
			"Using shortcut to show query dialog from {{list.container}}.",
			new ul({
				item: [
					"<code>list.container.query.all(containerID,sender)</code> to show <b>Query Editor</b> dialog.",
					"<code>list.container.query.filter(containerID,sender)</code> to show <b>Query Filter Editor</b> dialog.",
					"<code>list.container.query.sort(containerID,sender)</code> to show <b>Query Sort Editor</b> dialog.",
					"<code>list.container.query.field(containerID,sender)</code> to show <b>Query Field Editor</b> dialog.",
					"<code>list.container.query.limit(containerID,sender)</code> to show <b>Query Limit Editor</b> dialog.",
					"<code>list.container.query.page(containerID,sender)</code> to show <b>Query Page Editor</b> dialog.",
				],
			}),
		],
		sample: {
			"sample.query_setting": sample.query_setting,
			"sample.query_data": sample.query_data_view,
			"sample.list_editor": sample.list_editor,
			"sample.list_container": sample.list_container,
			"sample.list_row": sample.list_row,
			"sample.list_item": sample.list_item,
			"sample.list_group": sample.list_group,
			"sample.list_state": sample.list_state,
			"sample.list_more": sample.list_more,
		},
		import: ["button", "list", "div", "btngroup", "dlg", "input", "sample"],
		code: () => {
			let resultOutputId = core.UUID();
			let btnGenerate = core.UUID();
			let btnQuery = core.UUID();

			return [
				//run code button
				new button({
					id: btnGenerate,
					label: "Run Code",
					icon: "play",
					color: "primary",
					click: (event) => {
						//get button to show loading
						let sender = event.currentTarget;

						//get list of state
						sample.list_state((dbstate) => {
							//generate list container
							core.replaceWith(
								document.getElementById(resultOutputId),

								//list container option
								new list.container({
									name: "customer",
									file: ["picture"],
									id: resultOutputId,
									setting: sample.query_setting(dbstate),
									query: sample.query_data,
									editor: sample.list_editor,
									container: sample.list_container,
									row: sample.list_row,
									item: sample.list_item,
									group: sample.list_group,
									more: sample.list_more,
									allow_delete: true,
									allow_action: true,
									allow_copy: true,
									allow_more: true,
								})
							);

							//load data into generated list container
							list.container.reload(resultOutputId, sender, () => {
								//hide run code button and show query control
								document.getElementById(btnGenerate).classList.add("d-none");
								document.getElementById(btnQuery).classList.remove("d-none");
								document.getElementById(resultOutputId).classList.remove("d-none");
							});
						}, sender);
					},
				}),

				//query control
				new btngroup({
					id: btnQuery,
					marginBottom: 2,
					display: "none",
					elem: [
						new button({
							label: "Query",
							showlabel: "lg",
							icon: "fire",
							color: "primary",
							click: (event) => {
								//marker
								list.container.query.all(resultOutputId, event.currentTarget);
							},
						}),

						new button({
							icon: "filter",
							color: "primary",
							click: (event) => {
								//marker
								list.container.query.filter(resultOutputId, event.currentTarget);
							},
						}),

						new button({
							icon: "sort",
							color: "primary",
							click: (event) => {
								//marker
								list.container.query.sort(resultOutputId, event.currentTarget);
							},
						}),

						new button({
							icon: "tasks",
							color: "primary",
							click: (event) => {
								//marker
								list.container.query.field(resultOutputId, event.currentTarget);
							},
						}),

						new button({
							icon: "list-ol",
							color: "primary",
							click: (event) => {
								//marker
								list.container.query.limit(resultOutputId, event.currentTarget);
							},
						}),

						new button({
							icon: { icon: "sort", rotate: 90 },
							color: "primary",
							click: (event) => {
								//marker
								list.container.query.page(resultOutputId, event.currentTarget);
							},
						}),
					],
				}),

				//output list container
				new div({ id: resultOutputId, display: "none" }),
			];
		},
	},
];
