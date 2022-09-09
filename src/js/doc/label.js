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
				//marker
				label: "Label",
			});
		},
	},

	{
		title: "With icon",
		import: ["label", "sample"],
		code: () => {
			return new label({
				label: "Label",

				//marker
				icon: sample.icon(),
			});
		},
	},

	{
		title: "Icon after",
		import: ["label", "sample"],
		code: () => {
			return new label({
				label: "Label",
				icon: sample.icon(),

				//marker
				iconafter: true,
			});
		},
	},

	{
		title: "Label for",
		container: sample.vstackcontainer,
		import: ["input", "label", "sample"],
		code: () => {
			let id = core.UUID();
			return [
				new label({
					label: "Label",
					icon: sample.icon(),

					//marker
					for: id,
				}),
				new input({
					type: "text",

					//marker
					id: id,
				}),
			];
		},
	},

	{
		title: "Label hide",
		msg: "Show icon only and label is hidden. Put label inside {{span.visually-hidden}}",
		container: sample.vstackcontainer,
		import: ["label", "sample"],
		code: () => {
			return new label({
				label: "This is .visually-hidden label",
				icon: sample.icon(),

				//marker
				hidelabel: true,
			});
		},
	},

	{
		title: "Label show",
		msg: "Show icon only until viewport or higher",
		container: sample.vstackcontainer,
		import: ["label", "sample"],
		code: () => {
			return [null, "sm", "md", "lg", "xl", "xxl"].map((i) => {
				return new label({
					label: i ? `Show on ${i}` : "Always show label",
					icon: sample.icon(),

					//marker
					showlabel: i,
				});
			});
		},
	},
];
