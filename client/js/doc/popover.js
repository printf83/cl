"use strict";
import sample from "./sample.js";
import * as core from "../../cl/js/base/core.js";
import popover from "../../cl/js/base/popover.js";
import button from "../../cl/js/base/button.js";
import span from "../../cl/js/base/span.js";
import * as table from "../../cl/js/base/table.js";
import toast from "../../cl/js/base/toast.js";
import div from "../../cl/js/base/div.js";
import input from "../../cl/js/base/input.js";
import * as alert from "../../cl/js/base/alert.js";
import dropdown from "../../cl/js/base/dropdown.js";

export default [
	{
		title: "Popover",
		msg: "Documentation and examples for adding Bootstrap popovers, like those found in iOS, to any element on your site.",
		anchor: false,
	},

	{
		title: "Popover",
		import: ["button", "popover"],
		code: () => {
			return new popover({
				title: "Popover title",
				msg: "And here's some amazing content. It's very engaging. Right?",
				trigger: null,
				elem: new button({
					label: "Click to toggle popover",
					weight: "lg",
					color: "danger",
				}),
			});
		},
	},

	{
		title: "Four direction",
		container: sample.stackcontainer,
		import: ["button", "popover"],
		code: () => {
			return [
				new popover({
					placement: "top", //marker
					msg: "Top popover",
					elem: new button({
						label: "Popover on top",
						color: "secondary",
					}),
				}),

				new popover({
					placement: "left", //marker
					msg: "Left popover",
					elem: new button({
						label: "Popover on left",
						color: "secondary",
					}),
				}),

				new popover({
					placement: "right", //marker
					msg: "Right popover",
					elem: new button({
						label: "Popover on right",
						color: "secondary",
					}),
				}),

				new popover({
					placement: "bottom",
					msg: "Bottom popover",
					elem: new button({
						label: "Popover on bottom",
						color: "secondary",
					}),
				}),
			];
		},
	},

	{
		title: "Dismiss on next click",
		import: ["button", "popover"],
		code: () => {
			return new popover({
				trigger: "focus", //marker
				title: "Popover title",
				msg: "And here's some amazing content. It's very engaging. Right?",
				elem: new button({
					label: "Dismissible popover",
					weight: "lg",
					color: "danger",
				}),
			});
		},
	},

	{
		title: "Disabled elements",
		msg: [
			"Elements with the disabled attribute aren’t interactive, meaning users cannot hover or click them to trigger a popover. As a workaround, you’ll want to trigger the popover from a wrapper {{div}} or {{span}}, ideally made keyboard-focusable using {{tabindex='0'}}.",
			"For disabled popover triggers, you may also prefer {{trigger:'hover focus'}} on {{new popover}} option so that the popover appears as immediate visual feedback to your users as they may not expect to click on a disabled element.",
		],
		import: ["span", "button", "popover"],
		code: () => {
			return new popover({
				trigger: "focus hover", //marker
				title: "Popover title",
				msg: "And here's some amazing content. It's very engaging. Right?",
				elem: new span({
					class: "d-inline-block",
					tabindex: 0,
					elem: new button({
						label: "Dismissible popover",
						color: "primary",
						disabled: true, //marker
					}),
				}),
			});
		},
	},

	{
		title: "Global property",
		msg: ["Use popover on any cl element"],
		container: sample.stackcontainer,
		import: ["div", "button", "input", "dropdown", "alert"],
		code: () => {
			return [
				new div({
					elem: "DIV with tooltip",
					popover: {
						title: "Test",
						msg: "Example",
						placement: "left",
					},
				}),
				new button({
					color: "primary",
					click: () => {},
					elem: "Button with tooltip",
					popover: {
						title: "Test",
						msg: "Example",
						placement: "right",
					},
				}),
				new alert.container({
					color: "warning",
					elem: `A simple alert — check it out!`,
					popover: {
						title: "Test",
						msg: "Example",
						placement: "bottom",
					},
				}),
				new dropdown({
					label: "Drowdown button",
					color: "secondary",
					option: [
						{ href: "#", label: "Action" },
						{
							href: "#",
							label: "Hover here",
							icon: {
								beat: true,
								color: "danger",
								icon: "star",
							},
							popover: {
								title: "Test",
								msg: "Example",
								placement: "right",
							},
						},
						{ href: "#", label: "Something else here" },
						{ value: "-" },
						{ href: "#", label: "Separated link" },
					],
					shown: (event) => {
						let sender = event.currentTarget;
						let container = sender.closest("div.dropdown");
						core.init(container);
					},
				}),
				new input({
					label: "Email address",
					type: "email",
					placeholder: "name@example.com",
					helper: "We'll never share your email with anyone else.",
					popover: {
						title: "Test",
						msg: "Example",
						placement: "top",
					},
				}),
			];
		},
	},

	{
		title: "Event",
		msg: [
			new table.container({
				item: [
					["Option", "Description"],
					[
						"<code>show</code>",
						"This event fires immediately when the <code>show</code> instance method is called.",
					],
					[
						"<code>shown</code>",
						"This event is fired when the popover has been made visible to the user (will wait for CSS transitions to complete).",
					],
					[
						"<code>hide</code>",
						"This event is fired immediately when the <code>hide</code> instance method has been called.",
					],
					[
						"<code>hidden</code>",
						"This event is fired when the popover has finished being hidden from the user (will wait for CSS transitions to complete).",
					],
					[
						"<code>inserted</code>",
						"This event is fired after the <code>show</code> event when the popover template has been added to the DOM.",
					],
				],
			}),
		],
		import: ["button", "popover", "toast"],
		code: () => {
			let fn = (sender, event) => `Popover <b>${core.elemInfo(sender)}</b> event <b>${event}</b> trigged`;

			return new popover({
				title: "Popover title",
				msg: "And here's some amazing content. It's very engaging. Right?",
				trigger: null,
				//marker
				show: (event) => {
					new toast("i", fn(event.currentTarget, "show")).show();
				},
				shown: (event) => {
					new toast("/", fn(event.currentTarget, "shown")).show();
				},
				hide: (event) => {
					new toast("!", fn(event.currentTarget, "hide")).show();
				},
				hidden: (event) => {
					new toast("x", fn(event.currentTarget, "hidden")).show();
				},
				inserted: (event) => {
					new toast("/", fn(event.currentTarget, "inserted")).show();
				},
				//-
				elem: new button({
					label: "Click to toggle popover",
					weight: "lg",
					color: "danger",
				}),
			});
		},
	},
];
