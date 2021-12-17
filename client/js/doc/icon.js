"use strict";
import * as doc_core from "./core.js";
import * as sample from "./sample.js";
import * as navbar from "../base/navbar.js";
import icon from "../base/icon.js";
import tab from "../base/tab.js";
import input from "../base/input.js";
import button from "../base/button.js";
import dropdown from "../base/dropdown.js";

export default [
	{
		title: "Icons",
		msg: "Guidance and suggestions for using external icon libraries with Bootstrap.",
		anchor: false,
	},

	{
		msg: [
			"While Bootstrap doesn’t include an icon set by default, we do have our own comprehensive icon library called Bootstrap Iconew  Feel free to use them or any other icon set in your project. We’ve included details for Bootstrap Icons and other preferred icon sets below.",
			"While most icon sets include multiple file formats, we prefer SVG implementations for their improved accessibility and vector support.",
		],
	},

	// {
	// 	title: "Favicon",
	// 	container: doc_core.stackcontainer,
	// 	code: function () {
	// 		return new icon("favicon");
	// 	},
	// },

	{
		title: "Base icon",
		container: doc_core.stackcontainer,
		code: function () {
			return ["i", "!!", "!", "?", "-", "x", "/"].map(function (i) {
				return new icon(i);
			});
		},
	},

	{
		title: "Fontawesome icon",
		container: doc_core.stackcontainer,
		code: function () {
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
			].map(function (i) {
				return new icon(i);
			});
		},
	},

	{
		title: "Fontawesome brand icon",
		container: doc_core.stackcontainer,
		code: function () {
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
			].map(function (i) {
				return new icon({ type: "fab", icon: i });
			});
		},
	},

	{
		title: "Color",
		code: function () {
			return new icon({ type: "fab", icon: "node-js", color: "success" });
		},
	},

	{
		title: "Fixwidth",
		container: doc_core.stackcontainer,
		code: function () {
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
		container: doc_core.stackcontainer,
		code: function () {
			return ["xs", "sm", null, "lg", "2x", "3x", "4x"].map(function (i) {
				return new icon({ type: "fab", icon: "node-js", weight: i });
			});
		},
	},

	{
		title: "Rotate",
		container: doc_core.stackcontainer,
		code: function () {
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
		title: "Spin",
		container: doc_core.stackcontainer,
		code: function () {
			return [
				new icon({ type: "fab", icon: "node-js", spin: true }),
				new icon({ icon: "spinner", spin: true }),
				new icon({ icon: "circle-notch", spin: true }),
				new icon({ icon: "slash", spin: true }),
				new icon({ icon: "fan", spin: true }),
				new icon({ icon: "crosshairs", spin: true }),
				new icon({ icon: "sync", spin: true }),
				new icon({ icon: "cog", spin: true }),
				new icon({ icon: "compact-disc", spin: true }),
				new icon({ icon: "compass", spin: true }),
				new icon({ icon: "wrench", spin: true }),
				new icon({ icon: "snowflake", spin: true }),
			];
		},
	},

	{
		title: "Using with another object",
	},

	{
		title: "Button",
		container: doc_core.stackcontainer,
		code: function () {
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
			];
		},
	},

	{
		title: "Textbox",
		container: doc_core.stackcontainer,
		code: function () {
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
		container: doc_core.stackcontainer,
		sample: { "sample.dropdownitem": sample.dropdownitem },
		code: function () {
			return new dropdown({
				label: "Dropdown",
				color: "primary",
				icon: "fire",
				option: [
					{ href: "#;", label: "Copy", icon: "copy" },
					{ href: "#;", label: "Cut", icon: "cut" },
					{ href: "#;", label: "Paste", icon: "paste" },
					{ value: "-" },
					{ href: "#;", label: "Setting", icon: "sliders-h" },
				],
			});
		},
	},

	{
		title: "Navbar",
		container: doc_core.stackcontainer,
		code: function () {
			return new navbar.container({
				expand: "lg",
				elem: [
					new navbar.brand({
						label: "Navbar",
						icon: { icon: "fire", color: "danger" },
						href: "#;",
					}),
				],
			});
		},
	},

	{
		title: "Nav tab",
		sample: { "sample.text": sample.text },
		code: function () {
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