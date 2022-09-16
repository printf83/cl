"use strict";
import sample from "./sample.js";
import * as core from "../base/core.js";
import tooltip from "../base/tooltip.js";
import button from "../base/button.js";
import span from "../base/span.js";
import * as table from "../base/table.js";
import toast from "../base/toast.js";
import pill from "../base/pill.js";

export default [
	{
		title: "Popover",
		msg: "Documentation and examples for adding Bootstrap popovers, like those found in iOS, to any element on your site.",
		anchor: false,
	},

	{
		title: "Popover",
		import: ["button", "tooltip"],
		code: () => {
			return new tooltip({
				//marker
				type: "popover",

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
		import: ["button", "tooltip"],
		code: () => {
			return [
				new tooltip({
					//marker
					type: "popover",
					placement: "top",
					//-

					msg: "Top popover",
					elem: new button({
						label: "Popover on top",
						color: "secondary",
					}),
				}),

				new tooltip({
					//marker
					type: "popover",
					placement: "left",
					//-

					msg: "Left popover",
					elem: new button({
						label: "Popover on left",
						color: "secondary",
					}),
				}),

				new tooltip({
					//marker
					type: "popover",
					placement: "right",
					//-

					msg: "Right popover",
					elem: new button({
						label: "Popover on right",
						color: "secondary",
					}),
				}),

				new tooltip({
					//marker
					type: "popover",
					placement: "bottom",
					//-

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
		import: ["button", "tooltip"],
		code: () => {
			return new tooltip({
				type: "popover",
				title: "Popover title",
				msg: "And here's some amazing content. It's very engaging. Right?",
				elem: new button({
					label: "Dismissible popover",
					weight: "lg",
					color: "danger",
				}),

				//marker
				trigger: "focus", //set dismiss on focus another element
			});
		},
	},

	{
		title: "Disabled elements",
		msg: [
			"Elements with the disabled attribute aren’t interactive, meaning users cannot hover or click them to trigger a popover (or tooltip). As a workaround, you’ll want to trigger the popover from a wrapper {{div}} or {{span}}, ideally made keyboard-focusable using {{tabindex='0'}}.",
			"For disabled popover triggers, you may also prefer {{trigger:'hover focus'}} on {{new tooltip}} option so that the popover appears as immediate visual feedback to your users as they may not expect to click on a disabled element.",
		],
		import: ["span", "button", "tooltip"],
		code: () => {
			return new tooltip({
				type: "popover",
				title: "Popover title",
				msg: "And here's some amazing content. It's very engaging. Right?",
				elem: new span({
					class: "d-inline-block",
					tabindex: 0,
					elem: new button({
						label: "Dismissible popover",
						color: "primary",

						//marker
						disabled: true,
					}),
				}),

				//marker
				trigger: "focus hover", //set dismiss on focus or hover another element
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
						"<code>onshow</code>",
						"This event fires immediately when the <code>show</code> instance method is called.",
					],
					[
						"<code>onshown</code>",
						"This event is fired when the popover has been made visible to the user (will wait for CSS transitions to complete).",
					],
					[
						"<code>onhide</code>",
						"This event is fired immediately when the <code>hide</code> instance method has been called.",
					],
					[
						"<code>onhidden</code>",
						"This event is fired when the popover has finished being hidden from the user (will wait for CSS transitions to complete).",
					],
					[
						"<code>oninserted</code>",
						"This event is fired after the <code>show</code> event when the popover template has been added to the DOM.",
					],
				],
			}),
		],
		import: ["button", "tooltip", "toast"],
		code: () => {
			let fn = (sender, event) => `Popover <b>${core.elemInfo(sender)}</b> event <b>${event}</b> trigged`;

			return new tooltip({
				type: "popover",
				title: "Popover title",
				msg: "And here's some amazing content. It's very engaging. Right?",
				trigger: null,
				//marker
				onshow: (event) => {
					new toast("i", fn(event.currentTarget, "onshow")).show();
				},
				onshown: (event) => {
					new toast("/", fn(event.currentTarget, "onshown")).show();
				},
				onhide: (event) => {
					new toast("!", fn(event.currentTarget, "onhide")).show();
				},
				onhidden: (event) => {
					new toast("x", fn(event.currentTarget, "onhidden")).show();
				},
				oninserted: (event) => {
					new toast("/", fn(event.currentTarget, "oninserted")).show();
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
