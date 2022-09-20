"use strict";
import sample from "./sample.js";
import * as core from "../base/core.js";
import tooltip from "../base/tooltip.js";
import button from "../base/button.js";
import span from "../base/span.js";
import pill from "../base/pill.js";
import * as table from "../base/table.js";
import toast from "../base/toast.js";

export default [
	{
		title: "Tooltips",
		msg: "Documentation and examples for adding custom Bootstrap tooltips with CSS and JavaScript using CSS3 for animations and data-bs-attributes for local title storage.",
		anchor: false,
	},

	{
		title: "Four direction",
		container: sample.stackcontainer,
		import: ["button", "tooltip"],
		code: () => {
			return [
				new tooltip({
					type: "tooltip",
					msg: "Top tooltip",
					elem: new button({
						label: "Tooltip on top",
						color: "secondary",
					}),

					//marker
					placement: "top",
				}),

				new tooltip({
					type: "tooltip",
					msg: "Left tooltip",
					elem: new button({
						label: "Tooltip on left",
						color: "secondary",
					}),

					//marker
					placement: "left",
				}),

				new tooltip({
					type: "tooltip",
					msg: "Right tooltip",
					placement: "right",
					elem: new button({
						label: "Tooltip on right",
						color: "secondary",
					}),
				}),

				new tooltip({
					type: "tooltip",
					msg: "Bottom tooltip",
					elem: new button({
						label: "Tooltip on bottom",
						color: "secondary",
					}),

					//marker
					placement: "bottom",
				}),

				new tooltip({
					type: "tooltip",
					msg: "<em>Tooltip</em> <u>with</u> <b>HTML</b>",
					elem: new button({
						label: "Tooltip with HTML",
						color: "secondary",
					}),

					//marker
					placement: "right",
				}),
			];
		},
	},

	{
		title: "Disabled elements",
		msg: [
			"Elements with the disabled attribute aren’t interactive, meaning users cannot hover or click them to trigger a tooltip (or popover). As a workaround, you’ll want to trigger the popover from a wrapper {{div}} or {{span}}, ideally made keyboard-focusable using {{tabindex='0'}}.",
		],
		import: ["span", "button", "tooltip"],
		code: () => {
			return new tooltip({
				type: "tooltip",
				msg: "And here's some amazing content. It's very engaging. Right?",
				placement: "right",
				elem: new span({
					display: "inline-block",
					tabindex: 0,
					elem: new button({
						label: "Dismissible tooltip",
						color: "primary",

						//marker
						disabled: true,
					}),
				}),
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
		import: ["button", "tooltip", "toast"],
		code: () => {
			let fn = (sender, event) => `Tooltip <b>${core.elemInfo(sender)}</b> event <b>${event}</b> trigged`;

			return new tooltip({
				type: "tooltip",
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
					label: "Click to toggle tooltip",
					weight: "lg",
					color: "danger",
				}),
			});
		},
	},
];
