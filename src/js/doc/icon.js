"use strict";
import sample from "./sample.js";
import icon from "../base/icon.js";
import * as navbar from "../base/navbar.js";
import tab from "../base/tab.js";
import dropdown from "../base/dropdown.js";
import input from "../base/input.js";
import button from "../base/button.js";

export default [
	{
		title: "Icons",
		msg: "Using icon from FontAwesome with BS5 Js Builder",
		anchor: false,
	},

	{
		msg: [
			"While Bootstrap doesn’t include an icon set by default, so we add support for FontAwesome because it has more icon.",
		],
	},

	{
		title: "Base icon",
		container: sample.stackcontainer,
		import: ["icon"],
		code: () => {
			return ["i", "!!", "!", "?", "-", "x", "/"].map((i) => {
				return new icon(i);
			});
		},
	},

	{
		title: "Image icon",
		msg: [
			"Any icon that start with  {{/}}, {{./}}, {{../}}, {{http://}} or {{https://}} will be threat as <b>Image icon</b>. Image icon {{not support}} colouring.",
		],
		import: ["icon"],
		code: () => {
			return new icon({
				icon: "./favicon.png",
				weight: "lg",
				shake: true,
			});
		},
	},

	{
		title: "SVG icon",
		msg: [
			"Any icon that start with  {{&lt;svg}} will be threat as <b>SVG icon</b>. SVG icon {{support}} colouring if your svg has {{fill}} tag in it.",
		],
		import: ["icon"],
		code: () => {
			return ["primary", "secondary", "success", "danger", "warning", "info", "light", "dark", "muted"].map(
				(i) => {
					return new icon({
						icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="#999"><path d="M159.3 5.4c7.8-7.3 19.9-7.2 27.7 .1c27.6 25.9 53.5 53.8 77.7 84c11-14.4 23.5-30.1 37-42.9c7.9-7.4 20.1-7.4 28 .1c34.6 33 63.9 76.6 84.5 118c20.3 40.8 33.8 82.5 33.8 111.9C448 404.2 348.2 512 224 512C98.4 512 0 404.1 0 276.5c0-38.4 17.8-85.3 45.4-131.7C73.3 97.7 112.7 48.6 159.3 5.4zM225.7 416c25.3 0 47.7-7 68.8-21c42.1-29.4 53.4-88.2 28.1-134.4c-2.8-5.6-5.6-11.2-9.8-16.8l-50.6 58.8s-81.4-103.6-87.1-110.6C133.1 243.8 112 273.2 112 306.8C112 375.4 162.6 416 225.7 416z"/></svg>`,
						color: i,
					});
				}
			);
		},
	},

	{
		title: "Fontawesome icon",
		container: sample.stackcontainer,
		import: ["icon"],
		code: () => {
			return [
				sample.icon(),
				sample.icon(),
				sample.icon(),
				sample.icon(),
				sample.icon(),
				sample.icon(),
				sample.icon(),
				sample.icon(),
				sample.icon(),
				sample.icon(),
				sample.icon(),
			].map((i) => {
				return new icon(i);
			});
		},
	},

	{
		title: "Fontawesome brand icon",
		container: sample.stackcontainer,
		import: ["icon"],
		code: () => {
			return [
				"github",
				"css3",
				"html5",
				"js-square",
				"node-js",
				"font-awesome",
				"bootstrap",
				"edge",
				"firefox",
				"chrome",
			].map((i) => {
				return new icon({ type: "fab", icon: i });
			});
		},
	},

	{
		title: "Color",
		container: sample.stackcontainer,
		import: ["icon", "sample"],
		code: () => {
			return ["primary", "secondary", "success", "danger", "warning", "info", "light", "dark", "muted"].map(
				(i) => {
					return new icon({ icon: sample.icon(), color: i });
				}
			);
		},
	},

	{
		title: "Fixwidth",
		container: sample.stackcontainer,
		import: ["icon", "sample"],
		code: () => {
			let d = sample.icon();

			return [
				new icon({
					icon: d,
					fixwidth: true,
					border: true,
					weight: "lg",
				}),
				new icon({
					icon: d,
					fixwidth: false,
					border: true,
					weight: "lg",
				}),
			];
		},
	},

	{
		title: "Size",
		container: sample.stackcontainer,
		import: ["icon", "sample"],
		code: () => {
			let d = sample.icon();
			return ["xs", "sm", null, "lg", "2x", "3x", "4x"].map((i) => {
				return new icon({ icon: d, weight: i });
			});
		},
	},

	{
		title: "Rotate",
		container: sample.stackcontainer,
		import: ["icon", "sample"],
		code: () => {
			let d = sample.icon();
			return [90, 180, 270, "horizontal", "vertical", "both"].map((i) => {
				return new icon({ icon: d, rotate: i });
			});
		},
	},

	{
		title: "Animation",
	},

	{
		title: "Spin",
		container: sample.stackcontainer,
		import: ["icon", "sample"],
		code: () => {
			return [
				sample.icon(),
				sample.icon(),
				sample.icon(),
				sample.icon(),
				sample.icon(),
				sample.icon(),
				sample.icon(),
				sample.icon(),
				sample.icon(),
				sample.icon(),
				sample.icon(),
			].map((i) => {
				return new icon({ icon: i, spin: true });
			});
		},
	},

	{
		title: "Fade",
		container: sample.stackcontainer,
		import: ["icon", "sample"],
		code: () => {
			return [
				sample.icon(),
				sample.icon(),
				sample.icon(),
				sample.icon(),
				sample.icon(),
				sample.icon(),
				sample.icon(),
				sample.icon(),
				sample.icon(),
				sample.icon(),
				sample.icon(),
			].map((i) => {
				return new icon({ icon: i, fade: true });
			});
		},
	},

	{
		title: "Beat",
		container: sample.stackcontainer,
		import: ["icon", "sample"],
		code: () => {
			return [
				sample.icon(),
				sample.icon(),
				sample.icon(),
				sample.icon(),
				sample.icon(),
				sample.icon(),
				sample.icon(),
				sample.icon(),
				sample.icon(),
				sample.icon(),
				sample.icon(),
			].map((i) => {
				return new icon({ icon: i, beat: true });
			});
		},
	},

	{
		title: "Fade beat",
		container: sample.stackcontainer,
		import: ["icon", "sample"],
		code: () => {
			return [
				sample.icon(),
				sample.icon(),
				sample.icon(),
				sample.icon(),
				sample.icon(),
				sample.icon(),
				sample.icon(),
				sample.icon(),
				sample.icon(),
				sample.icon(),
				sample.icon(),
			].map((i) => {
				return new icon({ icon: i, beat: true, fade: true });
			});
		},
	},

	{
		title: "Bounce",
		container: sample.stackcontainer,
		import: ["icon", "sample"],
		code: () => {
			return [
				sample.icon(),
				sample.icon(),
				sample.icon(),
				sample.icon(),
				sample.icon(),
				sample.icon(),
				sample.icon(),
				sample.icon(),
				sample.icon(),
				sample.icon(),
				sample.icon(),
			].map((i) => {
				return new icon({ icon: i, bounce: true });
			});
		},
	},

	{
		title: "Flip",
		container: sample.stackcontainer,
		import: ["icon", "sample"],
		code: () => {
			return [
				sample.icon(),
				sample.icon(),
				sample.icon(),
				sample.icon(),
				sample.icon(),
				sample.icon(),
				sample.icon(),
				sample.icon(),
				sample.icon(),
				sample.icon(),
				sample.icon(),
			].map((i) => {
				return new icon({ icon: i, flip: true });
			});
		},
	},

	{
		title: "Shake",
		container: sample.stackcontainer,
		import: ["icon", "sample"],
		code: () => {
			return [
				sample.icon(),
				sample.icon(),
				sample.icon(),
				sample.icon(),
				sample.icon(),
				sample.icon(),
				sample.icon(),
				sample.icon(),
				sample.icon(),
				sample.icon(),
				sample.icon(),
			].map((i) => {
				return new icon({ icon: i, shake: true });
			});
		},
	},

	{
		title: "Using with another object",
	},

	{
		title: "Button",
		container: sample.stackcontainer,
		import: ["button", "sample"],
		code: () => {
			return [
				new button({
					label: "Button",
					color: "primary",
					icon: sample.icon(),
				}),
				new button({
					label: "Button",
					color: "warning",
					icon: {
						color: "danger",
						icon: sample.icon(),
					},
				}),
				new button({
					label: "Button",
					color: "success",
					icon: sample.icon(),
				}),
				new button({
					label: "Button",
					color: "primary",
					icon: sample.icon(),
					iconafter: true,
					showlabel: "md",
				}),
				new button({
					label: "Button",
					color: "warning",
					icon: sample.icon(),
					iconafter: true,
					showlabel: "md",
				}),
				new button({
					label: "Button",
					color: "success",
					icon: sample.icon(),
					iconafter: true,
					showlabel: "md",
				}),
			];
		},
	},

	{
		title: "Textbox",
		container: sample.stackcontainer,
		import: ["input", "icon", "sample"],
		code: () => {
			return [
				new input({ type: "text", before: new icon(sample.icon()) }),
				new input({
					type: "text",
					before: new icon(sample.icon()),
				}),
			];
		},
	},

	{
		title: "Dropdown & item",
		container: sample.formcontainer,
		import: ["dropdown", "sample"],
		code: () => {
			return [
				new dropdown({
					label: "Dropdown",
					color: "primary",
					icon: sample.icon(),
					option: [
						{ href: "#", label: "Copy", icon: "copy" },
						{ href: "#", label: "Cut", icon: "cut" },
						{ href: "#", label: "Paste", icon: "paste" },
						{ value: "-" },
						{ href: "#", label: "Setting", icon: "sliders-h" },
					],
				}),
				new dropdown({
					label: "Dropdown",
					color: "primary",
					icon: sample.icon(),
					iconafter: true,
					option: [
						{ href: "#", label: "Copy", icon: "copy", iconafter: true },
						{ href: "#", label: "Cut", icon: "cut", iconafter: true },
						{ href: "#", label: "Paste", icon: "paste", iconafter: true },
						{ value: "-" },
						{ href: "#", label: "Setting", icon: "sliders-h", iconafter: true },
					],
				}),
			];
		},
	},

	{
		title: "Navbar",
		container: sample.formcontainer,
		import: ["navbar", "sample"],
		code: () => {
			return [
				new navbar.container({
					expand: "lg",
					elem: [
						new navbar.brand({
							label: "Navbar",
							icon: { icon: sample.icon(), shake: true },
							href: "#",
						}),
					],
				}),

				new navbar.container({
					expand: "lg",
					elem: [
						new navbar.brand({
							label: "Navbar",
							icon: { icon: sample.icon(), color: "danger", bounce: true },
							iconafter: true,
							showlabel: "md",
							href: "#",
						}),
					],
				}),
			];
		},
	},

	{
		title: "Nav tab",
		import: ["tab", "sample"],
		code: () => {
			return new tab({
				type: "tab",
				item: [
					{ icon: sample.icon(), label: "First", elem: "This is first tab. " + sample.text() },
					{
						label: "Second",
						elem: "This is second tab. " + sample.text(),
					},
					{ label: "Third", elem: "This is third tab. " + sample.text() },
					{ label: "Disabled", disabled: true, elem: "This is last tab. " + sample.text() },
				],
			});
		},
	},
];
