"use strict";
import * as doc_core from "./core.js";
import * as sample from "./sample.js";
import listgroup from "../base/listgroup.js";
import div from "../base/div.js";
import p from "../base/p.js";
import small from "../base/small.js";
import h from "../base/h.js";
import badge from "../base/badge.js";
import button from "./button.js";

/* 
    \}\),\n+\t+new example\(\{
    },\n\n\t{
    
    new  
    new 

    elem:
    elem:

    sample
    sample

    #
    #

	container: doc_core.stackcontainer(),
	container: doc_core.stackcontainer,
*/

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
			"To encourage extensible and predictable toasts, we recommend a header and body. Toast headers use {{display: flex}}, allowing easy alignment of content thanks to our margin and flexbox utilities.",
			"Toasts are as flexible as you need and have very little required markup. At a minimum, we require a single element to contain your “toasted” content and strongly encourage a dismiss button.",
		],
		viewclass: "cl-modal-preview",
		code: function () {
			return new toast({
				icon: { icon: "fire", color: "primary" },
				title: "Bootstrap",
                msg: "Hello, world! This is a toast message.",
            });
		},
	},

	{
		title: "Live",
		msg: "Click the button below to show a toast (positioned with our utilities in the top right corner)",
		label: "Show live toast",
        code: function () {
            return new button({ label: "", color: "primary", onclick: function () { } });
			new toast({
				icon: { icon: "fire", color: "primary" },
				title: "Bootstrap",
				msg: "Hello, world! This is a toast message.",
			});
		},
	},

	{
		title: "Translucent",
		msg: "Toasts are slightly translucent to blend in with what’s below them.",
		dark: true,
		code: function () {
			return new toast({
				icon: { icon: "fire", color: "primary" },
				title: "Bootstrap",
				msg: "Hello, world! This is a toast message.",
				show: false, //for example only (should be remove for live version)
			});
		},
	},

	{
		title: "Stacking",
		msg: "Toast automatically stacking",
		label: "Show live toast",
        code: function () {
            return new button({ label: "", color: "primary", onclick: function () { } });
			new toast({
				icon: { icon: "fire", color: "primary" },
				title: "Bootstrap",
				msg: "Heads up, toasts will stack automatically. Second toast will appear in 2 second.",
			});

			//show second toast after 2 second
			setTimeout(function () {
				new toast({
					icon: { icon: "fire", color: "primary" },
					title: "Bootstrap",
					msg: "See? Just like this.",
				});
			}, 2000);
		},
	},

	{
		title: "Base icon",
		container: new cont.formcontainer,
		code: function () {
			return ["i", "!!", "!", "?", "-", "x", "/", "dosave", "dodelete", "lock", "shield", "logout"].map(function (
				i
			) {
				//for example only (last and second last argument should be remove for live version)
				return new toast(i, `Example <b>${i}</b> icon toast`, null, false);
			});
		},
	},

	{
		title: "Base icon live",
		code: function () {
			return [
				new input({
					type: "select",
					before: "icon:",
					aftertype: "button",
					after: new button({
						label: "Show",
						color: "primary",
						onclick: function (sender) {
							var icon = new core.getvalue($(sender).parent().find("select"));
							new toast(icon, `Example <b>${icon}</b> icon toast`);
						},
					}),
					option: ["i", "!!", "!", "?", "-", "x", "/", "dosave", "dodelete", "lock", "shield", "logout"],
				}),
			];
		},
	},

	{
		title: "Color",
		container: new cont.formcontainer,
		code: function () {
			return ["primary", "secondary", "success", "danger", "warning", "info", "light", "dark"].map(function (i) {
				//for example only (show option should be remove for live version)
				return new toast({ color: i, msg: `Example <b>${i}</b> toast`, show: false });
			});
		},
	},

	{
		title: "Color live",
		code: function () {
			return [
				new input({
					type: "select",
					before: "color:",
					aftertype: "button",
					after: new button({
						label: "Show",
						color: "primary",
						onclick: function (sender) {
							var color = new core.getvalue($(sender).parent().find("select"));
							new toast({ color: color, msg: `Example <b>${color}</b> toast` });
						},
					}),
					option: ["primary", "secondary", "success", "danger", "warning", "info", "light", "dark"],
				}),
			];
		},
	},

	// {
	// 	title: "Color",
	// 	container: doc_core.stackcontainer,
	// 	code: function () {
	// 		return ["primary", "secondary", "success", "danger", "warning", "info", "light", "dark"].map(function (i) {
	// 			return new button({
	// 				color: i,
	// 				label: i.capitalize(),
	// 				onclick: function () {
	// 					new toast({
	// 						color: i,
	// 						msg: `Example <b>${i}</b> toast`,
	// 					});
	// 				},
	// 			});
	// 		});
	// 	},
	// },

	{
		title: "Position",
		container: doc_core.stackcontainer,
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
				return new button({
					color: "primary",
					label: i.label,
					onclick: function () {
						new toast({ position: i.position, icon: "i", msg: `${i.label} toast.` }).show();
					},
				});
			});
		},
	},

	{
		title: "Disable autoclose",
		label: "Show toast",
        code: function () {
            return new button({
                label: "", color: "primary", onclick: function () { 
                    new toast({
				autohide: false,
				color: "warning",
				icon: { icon: "fire", color: "danger" },
				title: "Toast header",
				msg: "Hello, world! This is a toast message.",
			});
            } });
			
		},
	},

	{
		title: "Delay autoclose",
		label: "Show toast",
        code: function () {
            return new button({ label: "", color: "primary", onclick: function () { } });
			new toast({
				delay: 10000,
				color: "primary",
				icon: { icon: "fire", color: "info" },
				title: "Toast header",
				msg: "This toast will close in 10 seconds.",
			});
		},
    },
]