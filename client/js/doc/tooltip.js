"use strict";
import * as doc_core from "./core.js";
import * as sample from "./sample.js";
import listgroup from "../base/listgroup.js";
import div from "../base/div.js";
import p from "../base/p.js";
import small from "../base/small.js";
import h from "../base/h.js";
import badge from "../base/badge.js";

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
		title: "Tooltips",
		msg: "Documentation and examples for adding custom Bootstrap tooltips with CSS and JavaScript using CSS3 for animations and data-bs-attributes for local title storage.",
		anchor: false,
	},

	{
		title: "Four direction",
		container: doc_core.stackcontainer,
		code: function () {
			return [
				new button({
					label: "Tooltip on top",
					color: "secondary",
					tooltip: {
						type: "tooltip",
						msg: "Top tooltip",
						placement: "top",
					},
				}),

				new button({
					label: "Tooltip on left",
					color: "secondary",
					tooltip: {
						type: "tooltip",
						msg: "Left tooltip",
						placement: "left",
					},
				}),

				new button({
					label: "Tooltip on right",
					color: "secondary",
					tooltip: {
						type: "tooltip",
						msg: "Right tooltip",
						placement: "right",
					},
				}),

				new button({
					label: "Tooltip on bottom",
					color: "secondary",
					tooltip: {
						type: "tooltip",
						msg: "Bottom tooltip",
						placement: "bottom",
					},
				}),

				new button({
					label: "Tooltip with HTML",
					color: "secondary",
					tooltip: {
						type: "tooltip",
						msg: "<em>Tooltip</em> <u>with</u> <b>HTML</b>",
						placement: "right",
					},
				}),
			];
		},
	},

	{
		title: "Disabled elements",
		msg: [
			"Elements with the disabled attribute aren’t interactive, meaning users cannot hover or click them to trigger a tooltip (or popover). As a workaround, you’ll want to trigger the popover from a wrapper {{div}} or {{span}}, ideally made keyboard-focusable using {{tabindex='0'}}.",
		],
		code: function () {
			return new tooltip(
				{
					type: "tooltip",
					msg: "And here's some amazing content. It's very engaging. Right?",
					placement: "right",
				},
				{
					tag: "span",
					class: "d-inline-block",
					attr: { tabindex: "0" },
					elem: new button({
						label: "Dismissible tooltip",
						color: "primary",
						disabled: true,
					}),
				}
			);
		},
	},
]