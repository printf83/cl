"use strict";

///library
import * as core from "./base/core.js";
import * as list from "./base/list.js";
import btngroup from "./base/btngroup.js";
import button from "./base/button.js";
import div from "./base/div.js";
import sample from "./doc/sample.js"; //for documentation purpose only

///code
let code = () => {
	let resultOutputId = core.UUID();
	let btnGenerate = core.UUID();
	let btnQuery = core.UUID();

	return new div({
		elem: [
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
				marginbottom: 2,
				display: "none",
				elem: [
					new button({
						label: "Query",
						showlabel: "lg",
						icon: "fire",
						color: "primary",
						onclick: (event) => {
							list.container.query.all(resultOutputId, event.currentTarget);
						},
					}),

					new button({
						icon: "filter",
						color: "primary",
						onclick: (event) => {
							list.container.query.filter(resultOutputId, event.currentTarget);
						},
					}),

					new button({
						icon: "sort",
						color: "primary",
						onclick: (event) => {
							list.container.query.sort(resultOutputId, event.currentTarget);
						},
					}),

					new button({
						icon: "tasks",
						color: "primary",
						onclick: (event) => {
							list.container.query.field(resultOutputId, event.currentTarget);
						},
					}),

					new button({
						icon: "list-ol",
						color: "primary",
						onclick: (event) => {
							list.container.query.limit(resultOutputId, event.currentTarget);
						},
					}),

					new button({
						icon: {
							icon: "sort",
							rotate: 90,
						},
						color: "primary",
						onclick: (event) => {
							list.container.query.page(resultOutputId, event.currentTarget);
						},
					}),
				],
			}),

			//output list container
			new div({
				id: resultOutputId,
				display: "none",
			}),
		],
	});
};

///loader
core.documentReady(() => {
	core.appendChild(document.body, code());
});
