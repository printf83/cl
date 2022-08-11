"use strict";
import sample from "./sample.js";
import $ from "../component.js";

export default [
	{
		title: "Accordion",
		msg: "Build vertically collapsing accordions in combination with Bootstrap Collapse JavaScript plugin.",
		anchor: false,
	},
	{
		title: "Example",
		msg: "Click the accordions below to expand/collapse the accordion content.",
		sample: { "sample.text": sample.text },
		code: () => {
			return new $.accordion({
				item: [
					{
						label: "Accordion Item 1",
						elem: ["<b>This is the first item's accordion body.</b> ", sample.text()],
					},
					{
						label: "Accordion Item 2",
						elem: ["<b>This is the second item's accordion body.</b> ", sample.text()],
					},
					{
						label: "Accordion Item 3",
						elem: ["<b>This is the third item's accordion body.</b> ", sample.text()],
					},
				],
			});
		},
	},

	{
		title: "Flush",
		msg: "Set {{flush:true}} to remove the default background-color, some borders, and some rounded corners to render accordions edge-to-edge with their parent container.",
		sample: { "sample.text": sample.text, "sample.accordionitem": sample.accordionitem },
		code: () => {
			return new $.accordion({
				flush: true,
				item: sample.accordionitem(),
			});
		},
	},

	{
		title: "Always open",
		msg: "Set {{autoclose:false}} to make accordion items stay open when another item is opened.",
		sample: { "sample.text": sample.text, "sample.accordionitem": sample.accordionitem },
		code: () => {
			return new $.accordion({
				autoclose: false,
				item: sample.accordionitem(),
			});
		},
	},
];
