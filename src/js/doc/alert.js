"use strict";
import * as alert from "../base/alert.js";
import hr from "../base/hr.js";
import p from "../base/p.js";
import * as core from "../base/core.js";
import toast from "../base/toast.js";
import * as table from "../base/table.js";

export default [
	{
		title: "Alert",
		msg: "Provide contextual feedback messages for typical user actions with the handful of available and flexible alert messages.",
		anchor: false,
	},

	{
		title: "Example",
		import: ["alert"],
		code: () => {
			return ["primary", "secondary", "success", "danger", "warning", "info", "light", "dark"].map((i) => {
				return new alert.container({ color: i, elem: `A simple ${i} alert—check it out!` });
			});
		},
	},

	{
		title: "Link color",
		import: ["alert"],
		code: () => {
			return ["primary", "secondary", "success", "danger", "warning", "info", "light", "dark"].map((i) => {
				return new alert.container({
					color: i, //marker
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
		import: ["alert", "p", "hr"],
		code: () => {
			return new alert.container({
				color: "success",
				elem: [
					//marker
					new alert.heading("Well done!"),
					new p(
						"Aww yeah, you successfully read this important alert message. This example text is going to run a bit longer so that you can see how spacing within an alert works with this kind of content."
					),
					new hr(),
					new p({
						marginbottom: 0,
						elem: "Whenever you need to, be sure to use margin utilities to keep things nice and tidy.",
					}),
				],
			});
		},
	},

	{
		title: "Icons",
		import: [`import * as alert from "./base/alert.js";`],
		code: () => {
			return ["i", "!!", "!", "?", "-", "x", "/"].map((i) => {
				return new alert.container({
					icon: i, //marker
					elem: `An example alert with an <b>"${i}"</b> icon code`,
				});
			});
		},
	},

	{
		title: "Dismissing",
		import: ["alert"],
		code: () => {
			return ["primary", "secondary", "success", "danger", "warning", "info", "light", "dark"].map((i) => {
				return new alert.container({
					color: i,
					close: true, //marker
					elem: `<strong>Holy guacamole!</strong> You should check in on some of those fields below.`,
				});
			});
		},
	},

	{
		title: "Event",
		msg: [
			new table.container({
				item: [
					["Option", "Description"],
					[
						"<code>onclose</code>",
						"This event is fired immediately when the <code>close</code> instance method has been called.",
					],
					[
						"<code>onclosed</code>",
						"This event is fired when the alert has been closed (will wait for CSS transitions to complete).",
					],
				],
			}),
		],
		import: ["alert", "toast"],
		code: () => {
			let fn = (sender, event) => `Alert <b>${core.elemInfo(sender)}</b> event <b>${event}</b> trigged`;

			return new alert.container({
				close: true,
				color: "danger",
				elem: "<strong>Holy guacamole!</strong> You should check in on some of those fields below.",
				//marker
				onclose: (event) => {
					new toast("!", fn(event.currentTarget, "onclose")).show();
				},
				//marker
				onclosed: (event) => {
					new toast("x", fn(event.currentTarget, "onclosed")).show();
				},
			});
		},
	},
];
