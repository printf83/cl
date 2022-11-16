"use strict";
import * as core from "../cl/base/core.js";
import sample from "./sample.js";
import tab from "../cl/base/tab.js";
import modal from "../cl/base/modal.js";
import toast from "../cl/base/toast.js";
import * as table from "../cl/base/table.js";

export default [
	{
		title: "Navs and tabs",
		msg: "Documentation and examples for how to use Bootstrap’s included navigation components.",
		anchor: false,
	},

	{
		title: "Base nav",
		import: ["tab", "sample"],
		code: () => {
			return new tab({
				item: [
					{
						label: "First",
						elem: `<b>This is the first item's tab body.</b> ${sample.text()}`,
					},
					{ label: "Second", elem: `<b>This is the second item's tab body.</b> ${sample.text()}` },
					{ label: "Third", elem: `<b>This is the third item's tab body.</b> ${sample.text()}` },
					{ label: "Disabled", disabled: true, elem: "This is the last item's tab body." },
				],
			});
		},
	},

	{
		title: "Nav tab",
		import: ["tab", "sample"],
		code: () => {
			return new tab({
				item: [
					{ label: "First", elem: `<b>This is the first item's tab body.</b> ${sample.text()}` },
					{ label: "Second", elem: `<b>This is the second item's tab body.</b> ${sample.text()}` },
					{ label: "Third", elem: `<b>This is the third item's tab body.</b> ${sample.text()}` },
					{ label: "Disabled", disabled: true, elem: "This is the last item's tab body." },
				],

				//marker
				type: "tab",
			});
		},
	},

	{
		title: "Nav pill",
		import: ["tab", "sample"],
		code: () => {
			return new tab({
				item: [
					{ label: "First", elem: `<b>This is the first item's tab body.</b> ${sample.text()}` },
					{ label: "Second", elem: `<b>This is the second item's tab body.</b> ${sample.text()}` },
					{ label: "Third", elem: `<b>This is the third item's tab body.</b> ${sample.text()}` },
					{ label: "Disabled", disabled: true, elem: "This is the last item's tab body." },
				],

				//marker
				type: "pill",
			});
		},
	},

	{
		title: "Horizontal center alignment",
		import: ["tab", "sample"],
		code: () => {
			return new tab({
				type: "pill",
				item: [
					{ label: "First", elem: `<b>This is the first item's tab body.</b> ${sample.text()}` },
					{ label: "Second", elem: `<b>This is the second item's tab body.</b> ${sample.text()}` },
					{ label: "Third", elem: `<b>This is the third item's tab body.</b> ${sample.text()}` },
					{ label: "Disabled", disabled: true, elem: "This is the last item's tab body." },
				],

				//marker
				headAlign: "center",
			});
		},
	},

	{
		title: "Horizontal right alignment",
		import: ["tab", "sample"],
		code: () => {
			return new tab({
				type: "pill",
				item: [
					{ label: "First", elem: `<b>This is the first item's tab body.</b> ${sample.text()}` },
					{ label: "Second", elem: `<b>This is the second item's tab body.</b> ${sample.text()}` },
					{ label: "Third", elem: `<b>This is the third item's tab body.</b> ${sample.text()}` },
					{ label: "Disabled", disabled: true, elem: "This is the last item's tab body." },
				],

				//marker
				headAlign: "right",
			});
		},
	},

	{
		title: "Vertical left",
		import: ["tab", "sample"],
		code: () => {
			return new tab({
				type: "pill",
				item: [
					{ label: "First", elem: `<b>This is the first item's tab body.</b> ${sample.text()}` },
					{ label: "Second", elem: `<b>This is the second item's tab body.</b> ${sample.text()}` },
					{ label: "Third", elem: `<b>This is the third item's tab body.</b> ${sample.text()}` },
					{ label: "Disabled", disabled: true, elem: "This is the last item's tab body." },
				],

				//marker
				headAlign: "vertical",
			});
		},
	},

	{
		title: "Vertical right",
		import: ["tab", "sample"],
		code: () => {
			return new tab({
				type: "pill",
				item: [
					{ label: "First", elem: `<b>This is the first item's tab body.</b> ${sample.text()}` },
					{ label: "Second", elem: `<b>This is the second item's tab body.</b> ${sample.text()}` },
					{ label: "Third", elem: `<b>This is the third item's tab body.</b> ${sample.text()}` },
					{ label: "Disabled", disabled: true, elem: "This is the last item's tab body." },
				],

				//marker
				headAlign: "vertical-right",
			});
		},
	},

	{
		title: "Fill",
		import: ["tab", "sample"],
		code: () => {
			return new tab({
				type: "pill",
				item: [
					{ label: "First", elem: `<b>This is the first item's tab body.</b> ${sample.text()}` },
					{ label: "Second", elem: `<b>This is the second item's tab body.</b> ${sample.text()}` },
					{ label: "Third", elem: `<b>This is the third item's tab body.</b> ${sample.text()}` },
					{ label: "Disabled", disabled: true, elem: "This is the last item's tab body." },
				],

				//marker
				headAlign: "fill",
			});
		},
	},

	{
		title: "Flush",
		import: ["tab", "sample"],
		code: () => {
			return new tab({
				type: "tab",
				item: [
					{ label: "First", elem: `<b>This is the first item's tab body.</b> ${sample.text()}` },
					{ label: "Second", elem: `<b>This is the second item's tab body.</b> ${sample.text()}` },
					{ label: "Third", elem: `<b>This is the third item's tab body.</b> ${sample.text()}` },
					{ label: "Disabled", disabled: true, elem: "This is the last item's tab body." },
				],

				//marker
				flush: true,
			});
		},
	},

	{
		title: "Dropdown tab",
		import: ["tab", "sample"],
		code: () => {
			return new tab({
				type: "tab",
				item: [
					{ label: "First", elem: `<b>This is the first item's tab body.</b> ${sample.text()}` },
					{
						label: "Second",
						elem: "This is second tab",

						//marker
						option: [
							{ href: "#", label: "Action" },
							{ href: "#", label: "Another action" },
							{ value: "-", label: "" },
							{ href: "#", label: "Something else here" },
						],
						//-
					},
					{ label: "Third", elem: `<b>This is the third item's tab body.</b> ${sample.text()}` },
					{ label: "Disabled", disabled: true, elem: "This is the last item's tab body." },
				],
			});
		},
	},

	{
		title: "Dropdown pill",
		import: ["tab", "sample"],
		code: () => {
			return new tab({
				type: "pill",
				item: [
					{ label: "First", elem: `<b>This is the first item's tab body.</b> ${sample.text()}` },
					{
						label: "Second",
						elem: "This is second tab",
						option: [
							{ href: "#", label: "Action" },
							{ href: "#", label: "Another action" },
							{ value: "-", label: "" },
							{ href: "#", label: "Something else here" },
						],
					},
					{ label: "Third", elem: `<b>This is the third item's tab body.</b> ${sample.text()}` },
					{ label: "Disabled", disabled: true, elem: "This is the last item's tab body." },
				],
			});
		},
	},

	{
		title: "Nav tab in dialog",
		viewclass: "cl-modal-preview",
		import: ["modal", "tab", "sample"],
		code: () => {
			return new modal({
				elem: new tab({
					type: "tab",
					flush: true, //marker
					item: [
						{ label: "First", elem: `<b>This is the first item's tab body.</b> ${sample.text()}` },
						{
							label: "Second",
							elem: "This is second tab",
							option: [
								{ href: "#", label: "Action" },
								{ href: "#", label: "Another action" },
								{ value: "-", label: "" },
								{ href: "#", label: "Something else here" },
							],
						},
						{ label: "Third", elem: `<b>This is the third item's tab body.</b> ${sample.text()}` },
						{ label: "Disabled", disabled: true, elem: "This is the last item's tab body." },
					],
				}),
				button: ["Understand", "Close"],
				debug: true, // documentation purpose only
			});
		},
	},

	{
		title: "Tab nav pill in dialog",
		viewclass: "cl-modal-preview",
		import: ["modal", "tab", "sample"],
		code: () => {
			return new modal({
				elem: new tab({
					type: "pill",
					flush: true, //marker
					item: [
						{ label: "First", elem: `<b>This is the first item's tab body.</b> ${sample.text()}` },
						{
							label: "Second",
							elem: "This is second tab",
							option: [
								{ href: "#", label: "Action" },
								{ href: "#", label: "Another action" },
								{ value: "-", label: "" },
								{ href: "#", label: "Something else here" },
							],
						},
						{ label: "Third", elem: `<b>This is the third item's tab body.</b> ${sample.text()}` },
						{ label: "Disabled", disabled: true, elem: "This is the last item's tab body." },
					],
				}),
				button: ["Understand", "Close"],
				debug: true, // documentation purpose only
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
						"This event is fired when the tab body has been made visible to the user (will wait for CSS transitions to complete).",
					],
					[
						"<code>onhide</code>",
						"This event is fired immediately when the <code>hide</code> instance method has been called.",
					],
					[
						"<code>onhidden</code>",
						"This event is fired when the tab body has finished being hidden from the user (will wait for CSS transitions to complete).",
					],
				],
			}),
		],
		import: ["tab", "toast", "sample"],
		code: () => {
			let fn = (sender, event) => `Tab <b>${core.elemInfo(sender)}</b> event <b>${event}</b> trigged`;

			return new tab({
				item: [
					{
						label: "First",
						elem: `<b>This is the first item's tab body.</b> ${sample.text()}`,

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
						//-
					},
					{
						label: "Second",
						elem: `<b>This is the second item's tab body.</b> ${sample.text()}`,

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
						//-
					},
					{
						label: "Third",
						elem: `<b>This is the third item's tab body.</b> ${sample.text()}`,

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
						//-
					},
					{ label: "Disabled", disabled: true, elem: "This is the last item's tab body." },
				],
			});
		},
	},
];
