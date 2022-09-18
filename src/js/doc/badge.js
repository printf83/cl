"use strict";
import sample from "./sample.js";
import * as core from "../base/core.js";
import h from "../base/h.js";
import badge from "../base/badge.js";
import button from "../base/button.js";

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

						//marker
						new badge({ label: "New", marginStart: 3 }),
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

				//marker
				badge: { label: "4", marginStart: 3 },
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
					pill: true,
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
					border: "light",
					color: "danger",
					notification: true,
					asst: "new message",
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

					//marker
					color: i,
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

					//marker
					pill: true,
				});
			});
		},
	},
];
