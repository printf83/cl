"use strict";
import sample from "./sample.js";
import tab from "../base/tab.js";
import modal from "../base/modal.js";

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
					{ label: "First", elem: "This is first tab. " + sample.text() },
					{ label: "Second", elem: "This is second tab. " + sample.text() },
					{ label: "Third", elem: "This is third tab. " + sample.text() },
					{ label: "Disabled", disabled: true, elem: "This is last tab. " + sample.text() },
				],
			});
		},
	},

	{
		title: "Nav tab",
		import: ["tab", "sample"],
		code: () => {
			return new tab({
				type: "tab",
				item: [
					{ label: "First", elem: "This is first tab. " + sample.text() },
					{ label: "Second", elem: "This is second tab. " + sample.text() },
					{ label: "Third", elem: "This is third tab. " + sample.text() },
					{ label: "Disabled", disabled: true, elem: "This is last tab. " + sample.text() },
				],
			});
		},
	},

	{
		title: "Nav pill",
		import: ["tab", "sample"],
		code: () => {
			return new tab({
				type: "pill",
				item: [
					{ label: "First", elem: "This is first tab. " + sample.text() },
					{ label: "Second", elem: "This is second tab. " + sample.text() },
					{ label: "Third", elem: "This is third tab. " + sample.text() },
					{ label: "Disabled", disabled: true, elem: "This is last tab. " + sample.text() },
				],
			});
		},
	},

	{
		title: "Horizontal center alignment",
		import: ["tab", "sample"],
		code: () => {
			return new tab({
				type: "pill",
				headAlign: "center",
				item: [
					{ label: "First", elem: "This is first tab. " + sample.text() },
					{ label: "Second", elem: "This is second tab. " + sample.text() },
					{ label: "Third", elem: "This is third tab. " + sample.text() },
					{ label: "Disabled", disabled: true, elem: "This is last tab. " + sample.text() },
				],
			});
		},
	},

	{
		title: "Horizontal right alignment",
		import: ["tab", "sample"],
		code: () => {
			return new tab({
				type: "pill",
				headAlign: "right",
				item: [
					{ label: "First", elem: "This is first tab. " + sample.text() },
					{ label: "Second", elem: "This is second tab. " + sample.text() },
					{ label: "Third", elem: "This is third tab. " + sample.text() },
					{ label: "Disabled", disabled: true, elem: "This is last tab. " + sample.text() },
				],
			});
		},
	},

	{
		title: "Vertical left",
		import: ["tab", "sample"],
		code: () => {
			return new tab({
				type: "pill",
				headAlign: "vertical",
				item: [
					{ label: "First", elem: "This is first tab. " + sample.text() },
					{ label: "Second", elem: "This is second tab. " + sample.text() },
					{ label: "Third", elem: "This is third tab. " + sample.text() },
					{ label: "Disabled", disabled: true, elem: "This is last tab. " + sample.text() },
				],
			});
		},
	},

	{
		title: "Vertical right",
		import: ["tab", "sample"],
		code: () => {
			return new tab({
				type: "pill",
				headAlign: "vertical-right",
				item: [
					{ label: "First", elem: "This is first tab. " + sample.text() },
					{ label: "Second", elem: "This is second tab. " + sample.text() },
					{ label: "Third", elem: "This is third tab. " + sample.text() },
					{ label: "Disabled", disabled: true, elem: "This is last tab. " + sample.text() },
				],
			});
		},
	},

	{
		title: "Fill",
		import: ["tab", "sample"],
		code: () => {
			return new tab({
				type: "pill",
				headAlign: "fill",
				item: [
					{ label: "First", elem: "This is first tab. " + sample.text() },
					{ label: "Second", elem: "This is second tab. " + sample.text() },
					{ label: "Third", elem: "This is third tab. " + sample.text() },
					{ label: "Disabled", disabled: true, elem: "This is last tab. " + sample.text() },
				],
			});
		},
	},

	{
		title: "Flush",
		import: ["tab", "sample"],
		code: () => {
			return new tab({
				type: "tab",
				flush: true,
				item: [
					{ label: "First", elem: "This is first tab. " + sample.text() },
					{ label: "Second", elem: "This is second tab. " + sample.text() },
					{ label: "Third", elem: "This is third tab. " + sample.text() },
					{ label: "Disabled", disabled: true, elem: "This is last tab. " + sample.text() },
				],
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
					{ label: "First", elem: "This is first tab. " + sample.text() },
					{
						label: "Second",
						elem: "This is second tab. " + sample.text(),
						option: [
							{ href: "#", label: "Action" },
							{ href: "#", label: "Another action" },
							{ value: "-", label: "" },
							{ href: "#", label: "Something else here" },
						],
					},
					{ label: "Third", elem: "This is third tab. " + sample.text() },
					{ label: "Disabled", disabled: true, elem: "This is last tab. " + sample.text() },
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
					{ label: "First", elem: "This is first tab. " + sample.text() },
					{
						label: "Second",
						elem: "This is second tab. " + sample.text(),
						option: [
							{ href: "#", label: "Action" },
							{ href: "#", label: "Another action" },
							{ value: "-", label: "" },
							{ href: "#", label: "Something else here" },
						],
					},
					{ label: "Third", elem: "This is third tab. " + sample.text() },
					{ label: "Disabled", disabled: true, elem: "This is last tab. " + sample.text() },
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
				title: "Modal title",
				elem: new tab({
					type: "tab",
					flush: true, //!important
					item: [
						{ label: "First", elem: "This is first tab. " + sample.text() },
						{
							label: "Second",
							elem: "This is second tab. " + sample.text(),
							option: [
								{ href: "#", label: "Action" },
								{ href: "#", label: "Another action" },
								{ value: "-", label: "" },
								{ href: "#", label: "Something else here" },
							],
						},
						{ label: "Third", elem: "This is third tab. " + sample.text() },
						{ label: "Disabled", disabled: true, elem: "This is last tab. " + sample.text() },
					],
				}),
				button: ["Understand", "Close"],
				debug: true, //this last option is for this documentation preview only
			});
		},
	},

	{
		title: "Tab nav pill in dialog",
		viewclass: "cl-modal-preview",
		import: ["modal", "tab", "sample"],
		code: () => {
			return new modal({
				title: "Modal title",
				elem: new tab({
					type: "pill",
					flush: true, //!important
					item: [
						{ label: "First", elem: "This is first tab. " + sample.text() },
						{
							label: "Second",
							elem: "This is second tab. " + sample.text(),
							option: [
								{ href: "#", label: "Action" },
								{ href: "#", label: "Another action" },
								{ value: "-", label: "" },
								{ href: "#", label: "Something else here" },
							],
						},
						{ label: "Third", elem: "This is third tab. " + sample.text() },
						{ label: "Disabled", disabled: true, elem: "This is last tab. " + sample.text() },
					],
				}),
				button: ["Understand", "Close"],
				debug: true, //this last option is for this documentation preview only
			});
		},
	},
];
