"use strict";
import ul from "../cl/base/ul.js";
import li from "../cl/base/li.js";
import div from "../cl/base/div.js";
import sample from "./sample.js";

export default [
	{
		title: "Containers",
		msg: "Containers are a fundamental building block of Bootstrap that contain, pad, and align your content within a given device or viewport.",
		anchor: false,
	},

	{
		title: "How they work",
		option: {
			"Max width vs container": [
				[
					"",
					"<b>Extra small</b><br/>&lt;576px",
					"<b>Small</b><br/>≥576px",
					"<b>Medium</b><br/>≥768px",
					"<b>Large</b><br/>≥992px",
					"<b>X-Large</b><br/>≥1200px",
					"<b>XX-Large</b><br/>≥1400px",
				],
				["<code>.container</code>", "100%", "540px", "720px", "960px", "1140px", "1320px"],
				["<code>.container-sm</code>", "100%", "540px", "720px", "960px", "1140px", "1320px"],
				["<code>.container-md</code>", "100%", "100%", "720px", "960px", "1140px", "1320px"],
				["<code>.container-lg</code>", "100%", "100%", "100%", "960px", "1140px", "1320px"],
				["<code>.container-xl</code>", "100%", "100%", "100%", "100%", "1140px", "1320px"],
				["<code>.container-xxl</code>", "100%", "100%", "100%", "100%", "100%", "1320px"],
				["<code>.container-fluid</code>", "100%", "100%", "100%", "100%", "100%", "100%"],
			],
		},
		msg: [
			"Containers are the most basic layout element in Bootstrap and are <b>required when using Bootstrap default grid system</b>. Containers are used to contain, pad, and (sometimes) center the content within them. While containers can be nested, most layouts do not require a nested container.",
			"Bootstrap comes with three different containers:",
			new ul({
				elem: [
					new li({
						elem: "<code>.container</code>, which sets a <code>max-width</code> at each responsive breakpoint",
					}),
					new li({
						elem: "<code>.container-fluid</code>, which is <code>width: 100%</code> at all breakpoints",
					}),
					new li({
						elem: "<code>.container-{breakpoint&#125;</code> which is <code>width: 100%</code> until the specified breakpoint",
					}),
				],
			}),
			"The table below illustrates how each container’s {{max-width}} compares to the original {{.container}} and {{.container-fluid}} across each breakpoint.",
			"See them in action and compare them in Bootstrap <a href='https://getbootstrap.com/docs/5.1/examples/grid/#containers'>Grid example</a>.",
		],
	},

	{
		title: "Default container",
		msg: "Bootstrap default .container class is a responsive, fixed-width container, meaning its max-width changes at each breakpoint.",
		viewclass: "cl-highlight-container",
		import: ["div"],
		code: () => {
			return [
				//direct class and elem
				new div(/*marker*/ "container", "Content here"),

				//object
				new div({
					//marker
					container: true,

					elem: "Content here",
				}),
			];
		},
	},

	{
		title: "Responsive containers",
		msg: "Responsive containers allow you to specify a class that is 100% wide until the specified breakpoint is reached, after which we apply max-widths for each of the higher breakpoints. For example, .container-sm is 100% wide to start until the sm breakpoint is reached, where it will scale up with md, lg, xl, and xxl.",
		viewclass: "cl-highlight-container",
		import: ["div"],
		code: () => {
			return [
				new div(/*marker*/ "container-sm", "100% wide until small breakpoint"),
				new div(/*marker*/ "container-md", "100% wide until medium breakpoint"),
				new div(/*marker*/ "container-lg", "100% wide until large breakpoint"),
				new div(/*marker*/ "container-xl", "100% wide until extra large breakpoint"),
				new div(/*marker*/ "container-xxl", "100% wide until extra extra large breakpoint"),
			];
		},
	},

	{
		msg: sample.usingclobject(),
		viewclass: "cl-highlight-container",
		import: ["div"],
		code: () => {
			return Object.entries({
				sm: "small",
				md: "medium",
				lg: "large",
				xl: "extra large",
				xxl: "extra extra large",
			}).map((i) => {
				let [key, value] = i;
				return new div({
					container: key, //marker
					elem: `100% wide until ${value} breakpoint`,
				});
			});
		},
	},

	{
		title: "Fluid containers",
		msg: "Use .container-fluid for a full width container, spanning the entire width of the viewport.",
		viewclass: "cl-highlight-container",
		import: ["div"],
		code: () => {
			return [
				//easy option
				new div(/*marker*/ "container-fluid", "Content here"),

				//option
				new div({
					//marker
					container: "fluid",

					elem: "Content here",
				}),
			];
		},
	},
];
