"use strict";
import sample from "./sample.js";
import $ from "../component.js";

export default [
	{
		title: "Msg",
		anchor: false,
	},

	{
		title: "Label only",
		container: sample.formcontainer,
		code: function () {
			return [
				new $.msg("Message"),
				new $.msg({
					elem: "Message",
				}),
			];
		},
	},

	{
		title: "With icon",
		sample: { "sample.text": sample.text },
		code: function () {
			return new $.msg({
				icon: "fire",
				elem: sample.text(),
			});
		},
	},

	{
		title: "Weight",
		container: sample.formcontainer,
		viewclass: "cl-highlight-col",
		sample: { "sample.text": sample.text },
		code: function () {
			let id = $.core.UUID();
			return [
				new $.msg({
					weight: "sm",
					icon: "fire",
					elem: `<b>Weight: sm</b>. ${sample.text()}`,
				}),
				new $.msg({
					weight: "md",
					icon: "fire",
					elem: `<b>Weight: md</b>. ${sample.text()}`,
				}),
				new $.msg({
					weight: "lg",
					icon: "fire",
					elem: `<b>Weight: lg</b>. ${sample.text()}`,
				}),
			];
		},
	},

	{
		title: "Weight : sm",
		container: sample.formcontainer,
		viewclass: "cl-modal-preview",
		sample: { "sample.text": sample.text },
		code: function () {
			let id = $.core.UUID();
			return [
				new $.toast({
					title: "Title",
					color: "primary",
					textcolor: "light",
					elem: new $.msg({ weight: "sm", icon: "fire", elem: `<b>In toast</b>. ${sample.text()}` }),
					debug: true,
				}),
				new $.alert.container({
					color: "primary",
					elem: new $.msg({ weight: "sm", icon: "fire", elem: `<b>In alert</b>. ${sample.text()}` }),
					debug: true,
				}),
			];
		},
	},

	{
		title: "Weight : md",
		viewclass: "cl-modal-preview",
		sample: { "sample.text": sample.text },
		code: function () {
			let id = $.core.UUID();
			return new $.modal({
				title: "Title",
				elem: new $.msg({
					weight: "md",
					icon: { icon: "fire", color: "danger" },
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
		sample: { "sample.text": sample.text },
		code: function () {
			let id = $.core.UUID();
			return new $.modal({
				color: "primary",
				textcolor: "light",
				divider: false,
				centerbutton: true,
				elem: new $.msg({ weight: "lg", icon: "fire", elem: `<h3>In modal</h3> <p>${sample.text()}</p>` }),
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
