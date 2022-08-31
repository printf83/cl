"use strict";
import sample from "./sample.js";
import tooltip from "../base/tooltip.js";
import button from "../base/button.js";
import span from "../base/span.js";

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
					placement: "top",
					elem: new button({
						label: "Tooltip on top",
						color: "secondary",
					}),
				}),

				new tooltip({
					type: "tooltip",
					msg: "Left tooltip",
					placement: "left",
					elem: new button({
						label: "Tooltip on left",
						color: "secondary",
					}),
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
					placement: "bottom",
					elem: new button({
						label: "Tooltip on bottom",
						color: "secondary",
					}),
				}),

				new tooltip({
					type: "tooltip",
					msg: "<em>Tooltip</em> <u>with</u> <b>HTML</b>",
					placement: "right",
					elem: new button({
						label: "Tooltip with HTML",
						color: "secondary",
					}),
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
					attr: { tabindex: "0" },
					elem: new button({
						label: "Dismissible tooltip",
						color: "primary",
						disabled: true,
					}),
				}),
			});
		},
	},

	// unsupported. will check later - 20220831
	// need to add this into core.init
	// {
	// 	title: "Event",
	// 	msg: [
	// 		new table.container({
	// 			item: [
	// 				["Option", "Description"],
	// 				[
	// 					"<code>onshow</code>",
	// 					"This event fires immediately when the <code>show</code> instance method is called.",
	// 				],
	// 				[
	// 					"<code>onshown</code>",
	// 					"This event is fired when the popover has been made visible to the user (will wait for CSS transitions to complete).",
	// 				],
	// 				[
	// 					"<code>onhide</code>",
	// 					"This event is fired immediately when the <code>hide</code> instance method has been called.",
	// 				],
	// 				[
	// 					"<code>onhidden</code>",
	// 					"This event is fired when the popover has finished being hidden from the user (will wait for CSS transitions to complete).",
	// 				],
	// 				[
	// 					"<code>oninserted</code>",
	// 					"This event is fired after the <code>show</code> event when the popover template has been added to the DOM.",
	// 				],
	// 			],
	// 		}),
	// 	],
	// 	import: ["button", "tooltip", "toast"],
	// 	code: () => {
	// 		return new tooltip({
	// 			type: "tooltip",
	// 			msg: "And here's some amazing content. It's very engaging. Right?",
	// 			trigger: null,
	// 			onshow: (event) => {
	// 				new toast("i", fn(event.currentTarget, "onshow")).show();
	// 			},
	// 			onshown: (event) => {
	// 				new toast("/", fn(event.currentTarget, "onshown")).show();
	// 			},
	// 			onhide: (event) => {
	// 				new toast("!", fn(event.currentTarget, "onhide")).show();
	// 			},
	// 			onhidden: (event) => {
	// 				new toast("x", fn(event.currentTarget, "onhidden")).show();
	// 			},
	// 			oninserted: (event) => {
	// 				new toast("/", fn(event.currentTarget, "oninserted")).show();
	// 			},
	// 			elem: new button({
	// 				label: "Click to toggle tooltip",
	// 				weight: "lg",
	// 				color: "danger",
	// 			}),
	// 		});
	// 	},
	// },
];
