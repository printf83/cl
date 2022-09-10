"use strict";
import sample from "./sample.js";
import msg from "../base/msg.js";
import toast from "../base/toast.js";
import * as alert from "../base/alert.js";
import modal from "../base/modal.js";

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
				new msg("Message"),
				new msg({
					elem: "Message",
				}),
			];
		},
	},

	{
		title: "With icon",
		import: ["msg", "sample"],
		code: () => {
			return new msg({
				elem: sample.text(),

				//marker
				icon: sample.icon(),
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
					icon: sample.icon(),
					elem: `<b>Weight: sm</b>. ${sample.text()}`,

					//marker
					weight: "sm",
				}),
				new msg({
					icon: sample.icon(),
					elem: `<b>Weight: md</b>. ${sample.text()}`,

					//marker
					weight: "md",
				}),
				new msg({
					icon: sample.icon(),
					elem: `<b>Weight: lg</b>. ${sample.text()}`,

					//marker
					weight: "lg",
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
						icon: sample.icon(),
						elem: `<b>In toast</b>. ${sample.text()}`,

						//marker
						weight: "sm",
					}),
					debug: true,
				}),
				new alert.container({
					color: "primary",
					elem: new msg({
						icon: sample.icon(),
						elem: `<b>In alert</b>. ${sample.text()}`,

						//marker
						weight: "sm",
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
					icon: { icon: sample.icon(), color: "danger" },
					elem: `<b>In modal</b>. ${sample.text()}`,

					//marker
					weight: "md",
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

				//marker
				divider: false,
				centerbutton: true,
				//-

				elem: new msg({
					icon: sample.icon(),
					elem: `<h3>In modal</h3> <p>${sample.text()}</p>`,

					//marker
					weight: "lg",
				}),
				button: [
					{
						color: "light",
						label: "Okay",
					},
					{
						color: "primary",
						label: "Cancel",
					},
				],
				debug: true,
			});
		},
	},
];
