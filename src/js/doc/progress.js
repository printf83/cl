"use strict";
import sample from "./sample.js";
import tooltip from "../base/tooltip.js";
import * as progress from "../base/progress.js";

export default [
	{
		title: "Progress",
		msg: "Documentation and examples for using Bootstrap custom progress bars featuring support for stacked bars, animated backgrounds, and text labels.",
		anchor: false,
	},

	{
		title: "Example",
		container: sample.vstackcontainer,
		import: ["progress"],
		code: () => {
			return [
				new progress.container({ item: { value: 0 } }),
				new progress.container({ item: { value: 25 } }),
				new progress.container({ item: { value: 50 } }),
				new progress.container({ item: { value: 75 } }),
				new progress.container({ item: { value: 100 } }),
			];
		},
	},

	{
		title: "Label",
		import: ["progress"],
		code: () => {
			return new progress.container({
				item: {
					//marker
					label: true,

					value: 25,
				},
			});
		},
	},

	{
		title: "Min & max",
		import: ["progress"],
		code: () => {
			return new progress.container({
				item: {
					label: true,
					value: 154,

					//marker
					min: 75,
					max: 300,
				},
			});
		},
	},

	{
		title: "Color",
		container: sample.vstackcontainer,
		import: ["progress"],
		code: () => {
			let fn = (color, value) => {
				return new progress.container({
					item: {
						//marker
						color: color,
						value: value,
					},
				});
			};

			return [fn("primary", 10), fn("success", 25), fn("info", 50), fn("warning", 75), fn("danger", 100)];
		},
	},

	{
		title: "Height",
		container: sample.vstackcontainer,
		import: ["progress"],
		code: () => {
			return [
				new progress.container({
					//marker
					height: 1,

					item: { value: 25 },
				}),
				new progress.container({
					//marker
					height: 20,
					item: { value: 75 },
				}),
			];
		},
	},

	{
		title: "Multiple bars",
		import: ["progress"],
		code: () => {
			return new progress.container({
				//marker
				item: [
					{ color: "primary", value: 15 },
					{ color: "secondary", value: 30 },
					{ color: "info", value: 20 },
				],
			});
		},
	},

	{
		title: "Striped",
		container: sample.vstackcontainer,
		import: ["progress"],
		code: () => {
			let fn = (color, value) => {
				return new progress.container({
					item: {
						//marker
						stripe: true,

						color: color,
						value: value,
					},
				});
			};

			return [fn("primary", 10), fn("success", 25), fn("info", 50), fn("warning", 75), fn("danger", 100)];
		},
	},

	{
		title: "Animated",
		container: sample.vstackcontainer,
		import: ["progress"],
		code: () => {
			let fn = (color, value) => {
				return new progress.container({
					item: {
						//marker
						animated: true,

						stripe: true,
						color: color,
						value: value,
					},
				});
			};

			return [fn("primary", 10), fn("success", 25), fn("info", 50), fn("warning", 75), fn("danger", 100)];
		},
	},

	{
		title: "Kitchen Sink",
		import: ["progress"],
		code: () => {
			return new progress.container({
				height: 30,
				item: [
					{ label: true, color: "success", value: 15 },
					new tooltip({
						type: "tooltip",
						msg: "Tooltip over progress bar is supported",
						elem: new progress.bar({
							stripe: true,
							color: "warning",
							value: 30,
						}),
					}),
					{ label: true, stripe: true, animate: true, color: "danger", value: 99 },
				],
			});
		},
	},
];
