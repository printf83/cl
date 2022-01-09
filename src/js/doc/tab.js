"use strict";
import sample from "./sample.js";
import $ from "../component.js";

export default [
	{
		title: "Navs and tabs",
		msg: "Documentation and examples for how to use Bootstrap’s included navigation components.",
		anchor: false,
	},

	{
		title: "Base nav",
		sample: { "sample.tab": sample.tab },
		code: function () {
			return new $.tab({
				item: sample.tab(),
			});
		},
	},

	{
		title: "Nav tab",
		sample: { "sample.tab": sample.tab },
		code: function () {
			return new $.tab({
				type: "tab",
				item: sample.tab(),
			});
		},
	},

	{
		title: "Nav pill",
		sample: { "sample.tab": sample.tab },
		code: function () {
			return new $.tab({
				type: "pill",
				item: sample.tab(),
			});
		},
	},

	{
		title: "Horizontal center alignment",
		sample: { "sample.tab": sample.tab },
		code: function () {
			return new $.tab({
				type: "pill",
				headAlign: "center",
				item: sample.tab(),
			});
		},
	},

	{
		title: "Horizontal right alignment",
		sample: { "sample.tab": sample.tab },
		code: function () {
			return new $.tab({
				type: "pill",
				headAlign: "right",
				item: sample.tab(),
			});
		},
	},

	{
		title: "Vertical left",
		sample: { "sample.tab": sample.tab },
		code: function () {
			return new $.tab({
				type: "pill",
				headAlign: "vertical",
				item: sample.tab(),
			});
		},
	},

	{
		title: "Vertical right",
		sample: { "sample.tab": sample.tab },
		code: function () {
			return new $.tab({
				type: "pill",
				headAlign: "vertical-right",
				item: sample.tab(),
			});
		},
	},

	{
		title: "Fill",
		sample: { "sample.tab": sample.tab },
		code: function () {
			return new $.tab({
				type: "pill",
				headAlign: "fill",
				item: sample.tab(),
			});
		},
	},

	{
		title: "Flush",
		sample: { "sample.tab": sample.tab },
		code: function () {
			return new $.tab({
				type: "tab",
				flush: true,
				item: sample.tab(),
			});
		},
	},

	{
		title: "Dropdown tab",
		sample: { "sample.dropdowntab": sample.dropdowntab },
		code: function () {
			return new $.tab({
				type: "tab",
				item: sample.dropdowntab(),
			});
		},
	},

	{
		title: "Dropdown pill",
		sample: { "sample.dropdowntab": sample.dropdowntab },
		code: function () {
			return new $.tab({
				type: "pill",
				item: sample.dropdowntab(),
			});
		},
	},

	{
		title: "Nav tab in dialog",
		viewclass: "cl-modal-preview",
		sample: { "sample.dropdowntab": sample.dropdowntab },
		code: function () {
			return new $.modal({
				title: "Modal title",
				elem: new $.tab({
					type: "tab",
					flush: true, //!important
					item: sample.dropdowntab(),
				}),
				button: ["Understand", "Close"],
				debug: true, //this last option is for this documentation preview only
			});
		},
	},

	{
		title: "Tab nav pill in dialog",
		viewclass: "cl-modal-preview",
		sample: { "sample.dropdowntab": sample.dropdowntab },
		code: function () {
			return new $.modal({
				title: "Modal title",
				elem: new $.tab({
					type: "pill",
					flush: true, //!important
					item: sample.dropdowntab(),
				}),
				button: ["Understand", "Close"],
				debug: true, //this last option is for this documentation preview only
			});
		},
	},
];
