"use strict";
import * as alert from "../base/alert.js";
import p from "../base/p.js";
import hr from "../base/hr.js";

export default [
	{
		title: "Alert",
		msg: "Provide contextual feedback messages for typical user actions with the handful of available and flexible alert messages.",
		anchor: false,
	},

	{
		title: "Example",
		code: function () {
			return ["primary", "secondary", "success", "danger", "warning", "info", "light", "dark"].map(function (i) {
				return new alert.container({ color: i, elem: `A simple ${i} alert—check it out!` });
			});
		},
	},

	{
		title: "Link color",
		code: function () {
			return ["primary", "secondary", "success", "danger", "warning", "info", "light", "dark"].map(function (i) {
				return new alert.container({
					color: i,
					elem: [
						`A simple ${i} alert with `,
						new alert.link({ label: "an example link", href: "javascript:void(0);" }),
						`. Give it a click if you like.`,
					],
				});
			});
		},
	},

	{
		title: "Additional content",
		code: function () {
			return new alert.container({
				color: "success",
				elem: [
					new alert.heading("Well done!"),
					new p(
						"Aww yeah, you successfully read this important alert message. This example text is going to run a bit longer so that you can see how spacing within an alert works with this kind of content."
					),
					new hr(),
					new p({
						marginBottom: 0,
						elem: "Whenever you need to, be sure to use margin utilities to keep things nice and tidy.",
					}),
				],
			});
		},
	},

	{
		title: "Icons",
		code: function () {
			return ["i", "!!", "!", "?", "-", "x", "/"].map(function (i) {
				return new alert.container({ icon: i, elem: `An example alert with an <b>"${i}"</b> icon code` });
			});
		},
	},

	{
		title: "Dismissing",
		code: function () {
			return new alert.container({
				close: true,
				color: "warning",
				elem: "<strong>Holy guacamole!</strong> You should check in on some of those fields below.",
			});
		},
	},
];
