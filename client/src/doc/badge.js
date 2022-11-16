"use strict";
import sample from "./sample.js";
import * as core from "../cl/base/core.js";
import h from "../cl/base/h.js";
import badge from "../cl/base/badge.js";
import button from "../cl/base/button.js";
import div from "../cl/base/div.js";
import input from "../cl/base/input.js";
import * as alert from "../cl/base/alert.js";
import dropdown from "../cl/base/dropdown.js";

export default [
	{
		title: "Badges",
		msg: "Documentation and examples for badges, Bootstrap small count and labeling component.",
		anchor: false,
	},

	{
		title: "Example",
		import: ["h", "badge"],
		code: () => {
			return [1, 2, 3, 4, 5, 6].map((i) => {
				return new h({
					level: i,
					elem: [
						`Example heading #${i}`,
						new badge({ label: "New", marginStart: 3 }), //marker
					],
				});
			});
		},
	},

	{
		title: "Buttons",
		import: ["button"],
		code: () => {
			return new button({
				label: "Notifications",
				color: "primary",
				badge: { label: "4", marginStart: 3 }, //marker
			});
		},
	},

	{
		title: "Positioned",
		import: ["button"],
		code: () => {
			return new button({
				label: "Inbox",
				color: "primary",

				//marker
				badge: {
					label: "99+",
					color: "danger",
					notification: true,
				},
				//-
			});
		},
	},

	{
		title: "Notification",
		import: ["button"],
		code: () => {
			return new button({
				label: "Profile",
				color: "primary",

				//marker
				badge: {
					color: "danger",
					notification: true,
					label: "New message",
					rounded: "pill",
					hidelabel: true,
				},
				//-
			});
		},
	},

	{
		title: "Background color",
		container: sample.stackcontainer,

		import: ["badge"],
		code: () => {
			return ["primary", "secondary", "success", "danger", "warning", "info", "light", "dark"].map((i) => {
				return new badge({
					label: core.capitalize(i),
					color: i, //marker
				});
			});
		},
	},

	{
		title: "Pill badge",
		container: sample.stackcontainer,
		import: ["badge"],
		code: () => {
			return ["primary", "secondary", "success", "danger", "warning", "info", "light", "dark"].map((i) => {
				return new badge({
					label: core.capitalize(i),
					color: i,
					rounded: "pill", //marker
				});
			});
		},
	},

	{
		title: "Global property",
		msg: ["Use badge on any cl element"],
		container: sample.stackcontainer,
		import: ["div", "button", "input", "dropdown", "alert"],
		code: () => {
			return [
				new div({
					elem: "DIV with tooltip",
					badge: { label: "New", marginStart: 3 },
				}),
				new button({
					color: "primary",
					click: () => {},
					elem: "Button with tooltip",
					badge: {
						color: "danger",
						notification: true,
						label: "New message",
						rounded: "pill",
						hidelabel: true,
					},
				}),
				new alert.container({
					color: "warning",
					elem: `A simple alert — check it out!`,
					badge: {
						color: "danger",
						notification: true,
						label: "New message",
						rounded: "pill",
						hidelabel: true,
					},
				}),
				new dropdown({
					label: "Drowdown button",
					color: "secondary",
					badge: {
						color: "danger",
						notification: true,
						label: "New message",
						rounded: "pill",
						hidelabel: true,
					},
					option: [
						{ href: "#", label: "Action" },
						{ href: "#", label: "Another action" },
						{ href: "#", label: "Something else here" },
						{ value: "-" },
						{ href: "#", label: "Separated link" },
					],
				}),
				new input({
					label: "Email address",
					type: "email",
					placeholder: "name@example.com",
					helper: "We'll never share your email with anyone else.",
					badge: {
						marginTop: "2rem", //need to set manually
						label: "99+",
						color: "danger",
						notification: true,
					},
				}),
			];
		},
	},
];
