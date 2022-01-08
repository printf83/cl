"use strict";
import * as sample from "./sample.js";
import $ from "../component.js";

export default [
	{
		title: "Popover",
		msg: "Documentation and examples for adding Bootstrap popovers, like those found in iOS, to any element on your site.",
		anchor: false,
	},

	{
		title: "Popover",
		code: function () {
			return new $.tooltip({
				type: "popover",
				title: "Popover title",
				msg: "And here's some amazing content. It's very engaging. Right?",
				trigger: null,
				elem: new $.button({
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
		code: function () {
			return [
				new $.tooltip({
					type: "popover",
					msg: "Top popover",
					placement: "top",
					elem: new $.button({
						label: "Popover on top",
						color: "secondary",
					}),
				}),

				new $.tooltip({
					type: "popover",
					msg: "Left popover",
					placement: "left",
					elem: new $.button({
						label: "Popover on left",
						color: "secondary",
					}),
				}),

				new $.tooltip({
					type: "popover",
					msg: "Right popover",
					placement: "right",
					elem: new $.button({
						label: "Popover on right",
						color: "secondary",
					}),
				}),

				new $.tooltip({
					type: "popover",
					msg: "Bottom popover",
					placement: "bottom",
					elem: new $.button({
						label: "Popover on bottom",
						color: "secondary",
					}),
				}),
			];
		},
	},

	{
		title: "Dismiss on next click",
		code: function () {
			return new $.tooltip({
				type: "popover",
				title: "Popover title",
				msg: "And here's some amazing content. It's very engaging. Right?",
				trigger: "focus", //set dismiss on focus another element
				elem: new $.button({
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
			"Elements with the disabled attribute aren’t interactive, meaning users cannot hover or click them to trigger a popover (or tooltip). As a workaround, you’ll want to trigger the popover from a wrapper {{div}} or {{span}}, ideally made keyboard-focusable using {{tabindex='0'}}.",
			"For disabled popover triggers, you may also prefer {{trigger:'hover focus'}} on {{new $.tooltip}} option so that the popover appears as immediate visual feedback to your users as they may not expect to click on a disabled element.",
		],
		code: function () {
			return new $.tooltip({
				type: "popover",
				title: "Popover title",
				msg: "And here's some amazing content. It's very engaging. Right?",
				trigger: "focus hover", //set dismiss on focus or hover another element
				elem: new $.span({
					class: "d-inline-block",
					attr: { tabindex: "0" },
					elem: new $.button({
						label: "Dismissible popover",
						color: "primary",
						disabled: true,
					}),
				}),
			});
		},
	},
];
