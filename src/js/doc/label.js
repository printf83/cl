"use strict";
import sample from "./sample.js";

import * as core from "../base/core.js";
import label from "../base/label.js";
import input from "../base/input.js";

export default [
	{
		title: "Label",
		anchor: false,
	},

	{
		title: "Label only",
		import: ["label"],
		code: () => {
			return new label({
				label: "Label",
			});
		},
	},

	{
		title: "With icon",
		import: ["label"],
		code: () => {
			return new label({
				icon: "fire",
				label: "Label",
			});
		},
	},

	{
		title: "Icon after",
		import: ["label"],
		code: () => {
			return new label({
				icon: "fire",
				label: "Label",
				iconafter: true,
			});
		},
	},

	{
		title: "Label for",
		container: sample.formcontainer,
		import: ["input", "label"],
		code: () => {
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

	{
		title: "Label hide",
		msg: "Show icon only and label is hidden. Put label inside {{span.visually-hidden}}",
		container: sample.formcontainer,
		import: ["label"],
		code: () => {
			return new label({
				icon: "fire",
				label: "This is .visually-hidden label",
				hidelabel: true,
			});
		},
	},

	{
		title: "Label show",
		msg: "Show icon only until viewport or higher",
		container: sample.formcontainer,
		import: ["label"],
		code: () => {
			return [null, "sm", "md", "lg", "xl", "xxl"].map((i) => {
				return new label({
					icon: "fire",
					showlabel: i,
					label: i ? `Show on ${i}` : "Always show label",
				});
			});
		},
	},
];
