"use strict";

///library
import * as core from "./base/core.js";
import * as dlg from "./base/dlg.js";
import * as list from "./base/list.js";
import btngroup from "./base/btngroup.js";
import button from "./base/button.js";
import div from "./base/div.js";
import input from "./base/input.js";
import sample from "./doc/sample.js"; //for documentation purpose only

///code
let code = () => {
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
			onclick: (event) => {
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
							file: ["picture"],
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
			marginbottom: 2,
			display: "none",
			elem: [
				new button({
					label: "Check mode",
					showlabel: "lg",
					icon: "list-check",
					color: "warning",
					onclick: () => {
						list.container.check.mode(resultOutputId);
					},
				}),

				new button({
					label: "Select all",
					showlabel: "lg",
					icon: "check-double",
					color: "warning",
					onclick: () => {
						list.container.check.all(resultOutputId);
					},
				}),

				new button({
					label: "Delete checked",
					showlabel: "lg",
					icon: "trash-can",
					color: "danger",
					onclick: (event) => {
						list.container.check.delete(resultOutputId, event.currentTarget);
					},
				}),
				new button({
					label: "Get checked",
					showlabel: "lg",
					icon: "download",
					color: "primary",
					onclick: () => {
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
					onclick: () => {
						new dlg.inputbox("textarea", "ID", (_event, data) => {
							let checked = data.value.split(",");
							list.container.check.set(resultOutputId, checked);
						}).show();
					},
				}),
			],
		}),

		//output list container
		new div({
			id: resultOutputId,
			display: "none",
		}),
	];
};

///loader
core.documentReady(() => {
	core.replaceChild(document.getElementById("root"), code());
});
