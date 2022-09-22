"use strict";
import sample from "./sample.js";
import toast from "../base/toast.js";
import button from "../base/button.js";
import input from "../base/input.js";
import msg from "../base/msg.js";

export default [
	{
		title: "Toasts",
		msg: "Push notifications to your visitors with a toast, a lightweight and easily customizable alert message.",
		anchor: false,
	},

	{
		title: "Example",
	},

	{
		title: "Basic",
		msg: [
			"To encourage extensible and predictable toasts, we recommend a header and body. Toast headers use {{display: flex}}, allowing easy alignment of content thanks to Bootstrap margin and flexbox utilities.",
			"Toasts are as flexible as you need and have very little required markup. At a minimum, we require a single element to contain your “toasted” content and strongly encourage a dismiss button.",
		],

		import: ["toast", "sample"],
		code: () => {
			return new toast({
				color: "primary",
				elem: sample.text(),
				debug: true, // documentation purpose only
			});
		},
	},

	{
		title: "Without title & icon",

		import: ["toast", "sample"],
		code: () => {
			return new toast({
				color: "primary",
				elem: sample.text(),

				//marker
				icon: null,
				title: null,
				//-

				debug: true, // documentation purpose only
			});
		},
	},

	{
		title: "Custom title & icon",

		import: ["toast", "sample"],
		code: () => {
			return new toast({
				color: "primary",
				elem: sample.text(),

				//marker
				icon: { type: "fab", icon: "bootstrap" },
				title: "Bootstrap",
				//-

				debug: true, // documentation purpose only
			});
		},
	},

	{
		title: "Live",
		msg: "Click the button below to show a toast (positioned with Bootstrap utilities in the top right corner)",
		import: ["toast", "button", "sample"],
		code: () => {
			return new button({
				label: "Show live toast",
				color: "primary",
				click: () => {
					new toast({
						color: "primary",
						elem: sample.text(),
					}).show();
				},
			});
		},
	},

	{
		title: "Translucent",
		msg: "Toasts are slightly translucent to blend in with what’s below them.",
		dark: true,
		import: ["toast"],
		code: () => {
			return new toast({
				color: "primary",
				elem: "Hello, world! This is a toast message.",
				debug: true, // documentation purpose only
			});
		},
	},

	{
		title: "Stacking",
		msg: "Toast automatically stacking",
		import: ["toast", "button"],
		code: () => {
			return new button({
				label: "Show live toast",
				color: "primary",
				click: () => {
					new toast({
						color: "primary",
						elem: "Heads up, toasts will stack automatically. Second toast will appear in 2 second.",
					}).show();

					//show second toast after 2 second
					setTimeout(() => {
						new toast({
							color: "success",
							elem: "See? Just like this.",
						}).show();
					}, 2000);
				},
			});
		},
	},

	{
		title: "Base icon",
		container: sample.vstackcontainer,

		import: ["toast"],
		code: () => {
			return ["i", "!!", "!", "?", "-", "x", "/"].map((i) => {
				//this last argument is for this documentation preview only
				return new toast(/*marker*/ i, `Example <b>${i}</b> icon toast`, { debug: true });
			});
		},
	},

	{
		title: "Base icon live",
		import: ["toast", "input", "button"],
		code: () => {
			return [
				new input({
					type: "select",
					before: "icon:",
					aftertype: "button",
					after: new button({
						label: "Show",
						color: "primary",
						click: (event) => {
							let sender = event.currentTarget;
							let icon = sender.previousSibling.value;
							new toast(/*marker*/ icon, `Example <b>${icon}</b> icon toast`).show();
						},
					}),
					option: ["i", "!!", "!", "?", "-", "x", "/"],
				}),
			];
		},
	},

	{
		title: "Color",
		container: sample.vstackcontainer,
		import: ["toast", "msg", "sample"],
		code: () => {
			return ["primary", "secondary", "success", "danger", "warning", "info", "light", "dark"].map((i) => {
				return new toast({
					elem: new msg({ weight: "sm", icon: sample.icon(), elem: `Example <b>${i}</b> toast` }),

					//marker
					color: i,

					debug: true, //this last argument is for this documentation preview only
				});
			});
		},
	},

	{
		title: "Position",
		container: sample.stackcontainer,
		import: ["toast", "msg", "button", "sample"],
		code: () => {
			return [
				{ label: "Top left", position: "top-0 start-0" },
				{ label: "Top center", position: "top-0 start-50 translate-middle-x" },
				{ label: "Top right", position: "top-0 end-0" },

				{ label: "Middle left", position: "top-50 start-0 translate-middle-y" },
				{ label: "Middle center", position: "top-50 start-50 translate-middle" },
				{ label: "Middle right", position: "top-50 end-0 translate-middle-y" },

				{ label: "Bottom left", position: "bottom-0 start-0" },
				{ label: "Bottom center", position: "bottom-0 start-50 translate-middle-x" },
				{ label: "Bottom right", position: "bottom-0 end-0" },
			].map((i) => {
				return new button({
					color: "primary",
					label: i.label,
					click: () => {
						new toast({
							elem: new msg({ weight: "sm", icon: sample.icon(), elem: `${i.label} toast.` }),

							//marker
							position: i.position,
						}).show();
					},
				});
			});
		},
	},

	{
		title: "Disable autoclose",
		import: ["toast", "button"],
		code: () => {
			return new button({
				label: "Show live toast",
				color: "primary",
				click: () => {
					new toast({
						icon: undefined,
						title: undefined,
						color: "warning",
						elem: "Hello, world! This is a toast message.",

						//marker
						autohide: false,
					}).show();
				},
			});
		},
	},

	{
		title: "Delay autoclose",
		import: ["toast", "button"],
		code: () => {
			return new button({
				label: "Show live toast",
				color: "primary",
				click: () => {
					new toast({
						color: "primary",
						elem: "This toast will close in 10 seconds.",

						//marker
						delay: 10000,
					}).show();
				},
			});
		},
	},
];
