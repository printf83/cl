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
		title: "Fontawesome icon",
		container: sample.stackcontainer,
		import: ["icon"],
		code: () => {
			return [
				"address-book",
				"arrow-alt-circle-down",
				"bell",
				"calendar-alt",
				"chart-bar",
				"check-circle",
				"clipboard",
				"clock",
				"credit-card",
				"file-image",
				"hand-peace",
				"kiss-wink-heart",
				"star",
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
		import: ["icon"],
		code: () => {
			return new icon({ type: "fab", icon: "node-js", color: "success" });
		},
	},

	{
		title: "Fixwidth",
		container: sample.stackcontainer,
		import: ["icon"],
		code: () => {
			return [
				new icon({
					type: "fab",
					icon: "node-js",
					fixwidth: true,
					class: "border p-3",
					size: "lg",
				}),
				new icon({
					type: "fab",
					icon: "node-js",
					fixwidth: false,
					class: "border p-3",
					size: "lg",
				}),
			];
		},
	},

	{
		title: "Size",
		container: sample.stackcontainer,
		import: ["icon"],
		code: () => {
			return ["xs", "sm", null, "lg", "2x", "3x", "4x"].map((i) => {
				return new icon({ type: "fab", icon: "node-js", weight: i });
			});
		},
	},

	{
		title: "Rotate",
		container: sample.stackcontainer,
		import: ["icon"],
		code: () => {
			return [
				new icon({ type: "fab", icon: "node-js", rotate: 90 }),
				new icon({ type: "fab", icon: "node-js", rotate: 180 }),
				new icon({ type: "fab", icon: "node-js", rotate: 270 }),
				new icon({ type: "fab", icon: "node-js", rotate: "horizontal" }),
				new icon({ type: "fab", icon: "node-js", rotate: "vertical" }),
				new icon({ type: "fab", icon: "node-js", rotate: "both" }),
			];
		},
	},

	{
		title: "Animation",
	},

	{
		title: "Spin",
		container: sample.stackcontainer,
		import: ["icon"],
		code: () => {
			return [
				"spinner",
				"circle-notch",
				"slash",
				"fan",
				"crosshairs",
				"sync",
				"cog",
				"compact-disc",
				"compass",
				"wrench",
				"snowflake",
			].map((i) => {
				return new icon({ icon: i, spin: true });
			});
		},
	},

	{
		title: "Fade",
		container: sample.stackcontainer,
		import: ["icon"],
		code: () => {
			return [
				"spinner",
				"circle-notch",
				"slash",
				"fan",
				"crosshairs",
				"sync",
				"cog",
				"compact-disc",
				"compass",
				"wrench",
				"snowflake",
			].map((i) => {
				return new icon({ icon: i, fade: true });
			});
		},
	},

	{
		title: "Beat",
		container: sample.stackcontainer,
		import: ["icon"],
		code: () => {
			return [
				"spinner",
				"circle-notch",
				"slash",
				"fan",
				"crosshairs",
				"sync",
				"cog",
				"compact-disc",
				"compass",
				"wrench",
				"snowflake",
			].map((i) => {
				return new icon({ icon: i, beat: true });
			});
		},
	},

	{
		title: "Fade beat",
		container: sample.stackcontainer,
		import: ["icon"],
		code: () => {
			return [
				"spinner",
				"circle-notch",
				"slash",
				"fan",
				"crosshairs",
				"sync",
				"cog",
				"compact-disc",
				"compass",
				"wrench",
				"snowflake",
			].map((i) => {
				return new icon({ icon: i, beat: true, fade: true });
			});
		},
	},

	{
		title: "Bounce",
		container: sample.stackcontainer,
		import: ["icon"],
		code: () => {
			return [
				"spinner",
				"circle-notch",
				"slash",
				"fan",
				"crosshairs",
				"sync",
				"cog",
				"compact-disc",
				"compass",
				"wrench",
				"snowflake",
			].map((i) => {
				return new icon({ icon: i, bounce: true });
			});
		},
	},

	{
		title: "Flip",
		container: sample.stackcontainer,
		import: ["icon"],
		code: () => {
			return [
				"spinner",
				"circle-notch",
				"slash",
				"fan",
				"crosshairs",
				"sync",
				"cog",
				"compact-disc",
				"compass",
				"wrench",
				"snowflake",
			].map((i) => {
				return new icon({ icon: i, flip: true });
			});
		},
	},

	{
		title: "Shake",
		container: sample.stackcontainer,
		import: ["icon"],
		code: () => {
			return [
				"spinner",
				"circle-notch",
				"slash",
				"fan",
				"crosshairs",
				"sync",
				"cog",
				"compact-disc",
				"compass",
				"wrench",
				"snowflake",
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
		import: ["button"],
		code: () => {
			return [
				new button({ label: "Button", color: "primary", icon: "fire" }),
				new button({
					label: "Button",
					color: "warning",
					icon: {
						color: "danger",
						icon: "fire",
					},
				}),
				new button({
					label: "Button",
					color: "success",
					icon: {
						color: "warning",
						icon: "fire",
					},
				}),
				new button({ label: "Button", color: "primary", icon: "fire", iconafter: true, showlabel: "md" }),
				new button({
					label: "Button",
					color: "warning",
					icon: {
						color: "danger",
						icon: "fire",
					},
					iconafter: true,
					showlabel: "md",
				}),
				new button({
					label: "Button",
					color: "success",
					icon: {
						color: "warning",
						icon: "fire",
					},
					iconafter: true,
					showlabel: "md",
				}),
			];
		},
	},

	{
		title: "Textbox",
		container: sample.stackcontainer,
		import: ["input", "icon"],
		code: () => {
			return [
				new input({ type: "text", before: new icon("fire") }),
				new input({
					type: "text",
					before: new icon({
						color: "danger",
						icon: "fire",
					}),
				}),
			];
		},
	},

	{
		title: "Dropdown & item",
		container: sample.formcontainer,
		import: ["dropdown"],
		code: () => {
			return [
				new dropdown({
					label: "Dropdown",
					color: "primary",
					icon: "fire",
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
					icon: "fire",
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
		import: ["navbar"],
		code: () => {
			return [
				new navbar.container({
					expand: "lg",
					elem: [
						new navbar.brand({
							label: "Navbar",
							icon: { icon: "fire", color: "danger", shake: true },
							href: "#",
						}),
					],
				}),
				new navbar.container({
					expand: "lg",
					elem: [
						new navbar.brand({
							label: "Navbar",
							icon: { icon: "fire", color: "danger", bounce: true },
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
					{ icon: "fire", label: "First", elem: "This is first tab. " + sample.text() },
					{ label: "Second", elem: "This is second tab. " + sample.text() },
					{ label: "Third", elem: "This is third tab. " + sample.text() },
					{ label: "Disabled", disabled: true, elem: "This is last tab. " + sample.text() },
				],
			});
		},
	},
];
