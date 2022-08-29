"use strict";
import sample from "./sample.js";
import * as core from "../base/core.js";
import accordion from "../base/accordion.js";
import toast from "../base/toast.js";

export default [
	{
		title: "Accordion",
		msg: "Build vertically collapsing accordions in combination with Bootstrap Collapse JavaScript plugin.",
		anchor: false,
	},
	{
		title: "Example",
		msg: "Click the accordions below to expand/collapse the accordion content.",
		import: ["accordion", "sample"],
		code: () => {
			return new accordion({
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
		import: ["accordion", "sample"],
		code: () => {
			let fn = (i) => {
				return {
					label: `Accordion Item ${i}`,
					elem: `<b>This is the ${core.num2EnT(i)} item's accordion body.</b> ${sample.text()}`,
				};
			};

			return new accordion({
				flush: true,
				item: [fn(1), fn(2), fn(3)],
			});
		},
	},

	{
		title: "Always open",
		msg: "Set {{autoclose:false}} to make accordion items stay open when another item is opened.",
		import: ["accordion", "sample"],
		code: () => {
			let fn = (i) => {
				return {
					label: `Accordion Item ${i}`,
					elem: `<b>This is the ${core.num2EnT(i)} item's accordion body.</b> ${sample.text()}`,
				};
			};

			return new accordion({
				autoclose: false,
				item: [fn(1), fn(2), fn(3)],
			});
		},
	},

	{
		title: "Event",
		import: ["accordion", "toast", "sample"],
		code: () => {
			let fn = (sender, event) => `Accordion <b>${core.elemInfo(sender)}</b> event <b>${event}</b> trigged`;

			return new accordion({
				item: [
					{
						label: "Accordion Item 1",
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
						elem: ["<b>This is the first item's accordion body.</b> ", sample.text()],
					},
					{
						label: "Accordion Item 2",
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
						elem: ["<b>This is the second item's accordion body.</b> ", sample.text()],
					},
					{
						label: "Accordion Item 3",
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
						elem: ["<b>This is the third item's accordion body.</b> ", sample.text()],
					},
				],
			});
		},
	},
];
