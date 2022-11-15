"use strict";
import sample from "./sample.js";
import * as core from "../../cl/js/base/core.js";
import label from "../../cl/js/base/label.js";
import input from "../../cl/js/base/input.js";

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
				label: "Label", //marker
			});
		},
	},

	{
		title: "With icon",
		import: ["label", "sample"],
		code: () => {
			return new label({
				label: "Label",
				icon: sample.icon(), //marker
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
				iconafter: true, //marker
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
					for: id, //marker
					label: "Label",
					icon: sample.icon(),
				}),
				new input({
					id: id, //marker
					type: "text",
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
				hidelabel: true, //marker
				label: "This is .visually-hidden label",
				icon: sample.icon(),
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
					showlabel: i, //marker
					label: i ? `Show on ${i}` : "Always show label",
					icon: sample.icon(),
				});
			});
		},
	},
];
