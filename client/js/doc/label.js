import * as core from "../base/core.js";
import * as doc_core from "./core.js";
import label from "../base/label.js";
import input from "../base/input.js";

export default [
	{
		title: "Label",
		anchor: false,
	},

	{
		title: "Label only",
		code: function () {
			return new label({
				label: "Label",
			});
		},
	},

	{
		title: "With icon",
		code: function () {
			return new label({
				icon: "fire",
				label: "Label",
			});
		},
	},

	{
		title: "Label for",
		container: doc_core.formcontainer,
		code: function () {
			let id = core.UUID();
			return [
				new label({
					for: id,
					icon: "fire",
					label: "Label",
				}),
				new input({ type: "text", id: id }),
			];
		},
	},
];