"use strict";
import sample from "./sample.js";
import input from "../dist/cl/base/input.js";
import toast from "../dist/cl/base/toast.js";
import * as core from "../dist/cl/base/core.js";
import button from "../dist/cl/base/button.js";
import div from "../dist/cl/base/div.js";

export default [
	{
		title: "Select",
		msg: "Customize the native {{&lt;select&gt;}}s with custom CSS that changes the element’s initial appearance.",
		anchor: false,
	},

	{
		title: "Default",
		import: ["input"],
		code: () => {
			return new input({
				label: "Default select example",
				hidelabel: true,
				type: "select",

				//marker
				option: [
					{ value: "", label: "Open this select menu", selected: true },
					{ value: "1", label: "One" },
					{ value: "2", label: "Two" },
					{ value: "3", label: "Three" },
					{ value: "-", label: "Group 1" },
					{ value: "4", label: "Four" },
					{ value: "5", label: "Five" },
					{ value: "6", label: "Six" },
					{ value: "-", label: "Group 2" },
					{ value: "7", label: "Seven" },
					{ value: "8", label: "Eight" },
					{ value: "9", label: "Nine" },
				],
				//-
			});
		},
	},

	{
		title: "Sizing",
		container: sample.vstackcontainer,
		import: ["input"],
		code: () => {
			let optitem = [
				{ value: "", label: "Open this select menu", selected: true },
				{ value: "1", label: "One" },
				{ value: "2", label: "Two" },
				{ value: "3", label: "Three" },
			];

			return [
				new input({
					label: "Large select example",
					hidelabel: true,
					type: "select",
					option: optitem,

					//marker
					weight: "lg",
				}),
				new input({
					label: "Default select example",
					hidelabel: true,
					type: "select",
					option: optitem,
				}),
				new input({
					label: "Small select example",
					hidelabel: true,
					type: "select",
					option: optitem,

					//marker
					weight: "sm",
				}),
			];
		},
	},

	{
		title: "Multiple",
		import: ["input"],
		code: () => {
			return new input({
				label: "Multiple select example",
				hidelabel: true,
				type: "select",
				option: [
					{ value: "", label: "Open this select menu", selected: true },
					{ value: "1", label: "One" },
					{ value: "2", label: "Two" },
					{ value: "3", label: "Three" },
				],

				//marker
				multiple: true,
			});
		},
	},

	{
		title: "Size",
		import: ["input"],
		code: () => {
			return new input({
				label: "Size 3 select example",
				hidelabel: true,
				type: "select",
				option: [
					{ value: "", label: "Open this select menu", selected: true },
					{ value: "1", label: "One" },
					{ value: "2", label: "Two" },
					{ value: "3", label: "Three" },
				],

				//marker
				size: 3,
			});
		},
	},

	{
		title: "Disabled",
		import: ["input"],
		code: () => {
			return new input({
				label: "Disabled select example",
				hidelabel: true,
				type: "select",
				option: [
					{ value: "", label: "Open this select menu", selected: true },
					{ value: "1", label: "One" },
					{ value: "2", label: "Two" },
					{ value: "3", label: "Three" },
				],

				//marker
				disabled: true,
			});
		},
	},

	{
		title: "Control",
		import: ["input", "button", "list", "div", "sample", "toast"],
		code: () => {
			let resultOutputId = core.UUID();
			let btnGenerate = core.UUID();

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
							//generate select input
							core.appendChild(
								document.getElementById(resultOutputId),

								new div(
									"col",
									new input({
										label: "State",
										type: "select",
										option: dbstate,

										//marker
										dbname: "state",
										addctl: true,
										deletectl: true,
										editctl: true,
										copyctl: true,
										modify: (e) => {
											new toast("i", "State modify").show();
											sample.reset_list_state();
										},
										//-
									})
								)
							);

							//hide run code button
							document.getElementById(btnGenerate).classList.add("d-none");
							document.getElementById(resultOutputId).classList.remove("d-none");
						}, sender);
					},
				}),

				//output list container
				new div({ id: resultOutputId, display: "none" }),
			];
		},
	},

	{
		title: "Custom Control",
		import: ["input", "button", "list", "div", "sample", "toast"],
		code: () => {
			let resultOutputId = core.UUID();
			let btnGenerate = core.UUID();

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
							//generate select input
							core.appendChild(
								document.getElementById(resultOutputId),

								new div(
									"col",
									new input({
										label: "State",
										type: "select",
										option: dbstate,

										//marker
										addctl: (e) => {
											new toast("i", "Add your <b>add code</b> here").show();
										},
										deletectl: (e) => {
											new toast("i", "Add your <b>delete code</b> here").show();
										},
										editctl: (e) => {
											new toast("i", "Add your <b>edit code</b> here").show();
										},
										copyctl: (e) => {
											new toast("i", "Add your <b>copy code</b> here").show();
										},
										managectl: (e) => {
											new toast("i", "Add your <b>manage code</b> here").show();
										},
										//-
									})
								)
							);

							//hide run code button
							document.getElementById(btnGenerate).classList.add("d-none");
							document.getElementById(resultOutputId).classList.remove("d-none");
						}, sender);
					},
				}),

				//output list container
				new div({ id: resultOutputId, display: "none" }),
			];
		},
	},
];
