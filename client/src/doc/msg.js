"use strict";
import sample from "./sample.js";
import msg from "../cl/base/msg.js";
import toast from "../cl/base/toast.js";
import * as alert from "../cl/base/alert.js";
import modal from "../cl/base/modal.js";

export default [
	{
		title: "Msg",
		anchor: false,
	},

	{
		title: "Label only",
		container: sample.vstackcontainer,
		import: ["msg"],
		code: () => {
			return [
				new msg("classname", "Message with class"),
				new msg("Message only"),
				new msg({
					"data-test": "test",
					class: "classname",
					elem: "Message option",
				}),
			];
		},
	},

	{
		title: "With icon",
		import: ["msg", "sample"],
		code: () => {
			return new msg({
				icon: sample.icon(), //marker
				elem: sample.text(),
			});
		},
	},

	{
		title: "Weight",
		container: sample.vstackcontainer,
		viewclass: "cl-highlight-col",
		import: ["msg", "sample"],
		code: () => {
			return [
				new msg({
					weight: "sm", //marker
					icon: sample.icon(),
					elem: `<b>Weight: sm</b>. ${sample.text()}`,
				}),
				new msg({
					weight: "md", //marker
					icon: sample.icon(),
					elem: `<b>Weight: md</b>. ${sample.text()}`,
				}),
				new msg({
					weight: "lg", //marker
					icon: sample.icon(),
					elem: `<b>Weight: lg</b>. ${sample.text()}`,
				}),
			];
		},
	},

	{
		title: "Weight : sm",
		container: sample.vstackcontainer,
		viewclass: "cl-modal-preview",
		import: ["toast", "alert", "msg", "sample"],
		code: () => {
			return [
				new toast({
					color: "primary",
					elem: new msg({
						weight: "sm", //marker
						icon: sample.icon(),
						elem: `<b>In toast</b>. ${sample.text()}`,
					}),
					debug: true,
				}),
				new alert.container({
					color: "primary",
					elem: new msg({
						weight: "sm", //marker
						icon: sample.icon(),
						elem: `<b>In alert</b>. ${sample.text()}`,
					}),
					debug: true,
				}),
			];
		},
	},

	{
		title: "Weight : md",
		viewclass: "cl-modal-preview",
		import: ["modal", "msg", "sample"],
		code: () => {
			return new modal({
				elem: new msg({
					weight: "md", //marker
					icon: { icon: sample.icon(), color: "danger" },
					elem: `<b>In modal</b>. ${sample.text()}`,
				}),
				button: ["Okay", "Cancel"],
				debug: true,
			});
		},
	},

	{
		title: "Weight : lg",
		viewclass: "cl-modal-preview",
		import: ["modal", "msg", "sample"],
		code: () => {
			return new modal({
				title: null,
				icon: null,
				color: "primary",
				divider: false, //marker
				centerbutton: true, //marker

				elem: new msg({
					weight: "lg", //marker
					icon: sample.icon(),
					elem: `<h3>In modal</h3> <p>${sample.text()}</p>`,
				}),
				button: [
					{
						color: "light",
						label: "Okay",
					},
					{
						btnColor: "transparent",
						textBgColor: "primary",
						label: "Cancel",
					},
				],
				debug: true,
			});
		},
	},
];
