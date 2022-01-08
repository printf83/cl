"use strict";
import * as sample from "./sample.js";
import $ from "../component.js";

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
		viewclass: "cl-modal-preview",
		code: function () {
			return new $.toast({
				color: "primary",
				textcolor: "light",
				icon: { icon: "fire", color: "primary" },
				title: "Bootstrap",
				elem: "Hello, world! This is a toast message.",
				debug: true, //this last option is for this documentation preview only
			});
		},
	},

	{
		title: "Live",
		msg: "Click the button below to show a toast (positioned with Bootstrap utilities in the top right corner)",
		code: function () {
			return new $.button({
				label: "Show live toast",
				color: "primary",
				onclick: function () {
					new $.toast({
						color: "primary",
						textcolor: "light",
						icon: { icon: "fire", color: "primary" },
						title: "Bootstrap",
						elem: "Hello, world! This is a toast message.",
					}).show();
				},
			});
		},
	},

	{
		title: "Translucent",
		msg: "Toasts are slightly translucent to blend in with what’s below them.",
		dark: true,
		code: function () {
			return new $.toast({
				color: "primary",
				textcolor: "light",
				icon: { icon: "fire", color: "primary" },
				title: "Bootstrap",
				elem: "Hello, world! This is a toast message.",
				debug: true, //this last option is for this documentation preview only
			});
		},
	},

	{
		title: "Stacking",
		msg: "Toast automatically stacking",
		code: function () {
			return new $.button({
				label: "Show live toast",
				color: "primary",
				onclick: function () {
					new $.toast({
						color: "primary",
						textcolor: "light",
						icon: { icon: "fire", color: "primary" },
						title: "Bootstrap",
						elem: "Heads up, toasts will stack automatically. Second toast will appear in 2 second.",
					}).show();

					//show second toast after 2 second
					setTimeout(function () {
						new $.toast({
							color: "success",
							textcolor: "light",
							icon: { icon: "fire", color: "success" },
							title: "Bootstrap",
							elem: "See? Just like this.",
						}).show();
					}, 2000);
				},
			});
		},
	},

	{
		title: "Base icon",
		container: sample.formcontainer,
		code: function () {
			return ["i", "!!", "!", "?", "-", "x", "/"].map(function (i) {
				//this last argument is for this documentation preview only
				return new $.toast(i, `Example <b>${i}</b> icon toast`, { debug: true });
			});
		},
	},

	{
		title: "Base icon live",
		code: function () {
			return [
				new $.input({
					type: "select",
					before: "icon:",
					aftertype: "button",
					after: new $.button({
						label: "Show",
						color: "primary",
						textcolor: "light",
						onclick: function (event) {
							let sender = event.currentTarget;
							let icon = sender.previousSibling.value;
							new $.toast(icon, `Example <b>${icon}</b> icon toast`).show();
						},
					}),
					option: ["i", "!!", "!", "?", "-", "x", "/"],
				}),
			];
		},
	},

	{
		title: "Color",
		container: sample.formcontainer,
		code: function () {
			return [
				{ color: "primary", textcolor: "light" },
				{ color: "secondary", textcolor: "light" },
				{ color: "success", textcolor: "light" },
				{ color: "danger", textcolor: "light" },
				{ color: "warning", textcolor: "dark" },
				{ color: "info", textcolor: "dark" },
				{ color: "light", textcolor: "dark" },
				{ color: "dark", textcolor: "light" },
			].map(function (i) {
				return new $.toast({
					color: i.color,
					textcolor: i.textcolor,
					elem: new $.msg({ weight: "sm", icon: "fire", elem: `Example <b>${i.color}</b> toast` }),
					debug: true, //this last argument is for this documentation preview only
				});
			});
		},
	},

	{
		title: "Position",
		container: sample.stackcontainer,
		code: function () {
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
			].map(function (i) {
				return new $.button({
					color: "primary",
					label: i.label,
					onclick: function () {
						new $.toast({
							position: i.position,
							elem: new $.msg({ weight: "sm", icon: "fire", elem: `${i.label} toast.` }),
						}).show();
					},
				});
			});
		},
	},

	{
		title: "Disable autoclose",
		code: function () {
			return new $.button({
				label: "Show live toast",
				color: "primary",
				onclick: function () {
					new $.toast({
						autohide: false,
						color: "warning",
						icon: { icon: "fire", color: "danger" },
						title: "Toast header",
						elem: "Hello, world! This is a toast message.",
					}).show();
				},
			});
		},
	},

	{
		title: "Delay autoclose",
		code: function () {
			return new $.button({
				label: "Show live toast",
				color: "primary",
				onclick: function () {
					new $.toast({
						delay: 10000,
						color: "primary",
						icon: { icon: "fire", color: "info" },
						title: "Toast header",
						elem: "This toast will close in 10 seconds.",
					}).show();
				},
			});
		},
	},
];
