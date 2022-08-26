"use strict";
import sample from "./sample.js";
import input from "../base/input.js";

export default [
	{
		title: "Select",
		msg: "Customize the native {{&lt;select&gt;}}s with custom CSS that changes the element’s initial appearance.",
		anchor: false,
	},

	{
		title: "Default",
		sample: { "sample.optionitem": sample.optionitem },
		import: ["input"],
		code: () => {
			return new input({
				label: "Default select example",
				hidelabel: true,
				type: "select",
				option: sample.optionitem(),
			});
		},
	},

	{
		title: "Sizing",
		container: sample.formcontainer,
		sample: { "sample.optionitem": sample.optionitem },
		import: ["input"],
		code: () => {
			return [
				new input({
					weight: "lg",
					label: "Large select example",
					hidelabel: true,
					type: "select",
					option: sample.optionitem(),
				}),
				new input({
					label: "Small select example",
					hidelabel: true,
					type: "select",
					option: sample.optionitem(),
				}),
				new input({
					weight: "sm",
					label: "Small select example",
					hidelabel: true,
					type: "select",
					option: sample.optionitem(),
				}),
			];
		},
	},

	{
		title: "Multiple",
		sample: { "sample.optionitem": sample.optionitem },
		import: ["input"],
		code: () => {
			return new input({
				multiple: true,
				label: "Multiple select example",
				hidelabel: true,
				type: "select",
				option: sample.optionitem(),
			});
		},
	},

	{
		title: "Size",
		sample: { "sample.optionitem": sample.optionitem },
		import: ["input"],
		code: () => {
			return new input({
				size: 3,
				label: "Size 3 select example",
				hidelabel: true,
				type: "select",
				option: sample.optionitem(),
			});
		},
	},

	{
		title: "Disabled",
		sample: { "sample.optionitem": sample.optionitem },
		import: ["input"],
		code: () => {
			return new input({
				disabled: true,
				label: "Disabled select example",
				hidelabel: true,
				type: "select",
				option: sample.optionitem(),
			});
		},
	},
];
