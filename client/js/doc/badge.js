import * as core from "../base/core.js";
import * as doc_core from "./core.js";
import badge from "../base/badge.js";
import h from "../base/h.js";
import button from "../base/button.js";

export default [
	{
		title: "Badges",
		msg: "Documentation and examples for badges, our small count and labeling component.",
		anchor: false,
	},

	{
		title: "Example",
		code: function () {
			return [1, 2, 3, 4, 5, 6].map(function (i) {
				return new h({
					level: i,
					elem: [`Example heading #${i}`, new badge({ label: "New", marginStart: 3 })],
				});
			});
		},
	},

	{
		title: "Buttons",
		code: function () {
			return new button({
				label: "Notifications",
				color: "primary",
				badge: { label: "4", marginStart: 3 },
			});
		},
	},

	{
		title: "Positioned",
		code: function () {
			return new button({
				label: "Inbox",
				color: "primary",
				badge: {
					label: "99+",
					color: "danger",
					notification: true,
					pill: true,
				},
			});
		},
	},

	{
		title: "Notification",
		code: function () {
			return new button({
				label: "Profile",
				color: "primary",
				badge: {
					border: "light",
					color: "danger",
					notification: true,
					asst: "New Message",
				},
			});
		},
	},

	{
		title: "Background color",
		container: doc_core.stackcontainer,
		code: function () {
			return ["primary", "secondary", "success", "danger", "warning", "info", "light", "dark"].map(function (i) {
				return new badge({ label: core.capitalize(i), color: i });
			});
		},
	},

	{
		title: "Pill badge",
		container: doc_core.stackcontainer,
		code: function () {
			return ["primary", "secondary", "success", "danger", "warning", "info", "light", "dark"].map(function (i) {
				return new badge({ pill: true, label: core.capitalize(i), color: i });
			});
		},
	},
];
