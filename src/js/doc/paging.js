"use strict";
import $ from "../component.js";

export default [
	{
		title: "Paging",
		msg: "Documentation and examples for showing paging to indicate a series of related content exists across multiple pages.",
		anchor: false,
	},

	{
		title: "Example",
		code: () => {
			return new $.paging({
				limit: 10, // limit record in one page
				skip: 20, // record number to show
				total: 1260, // total record
				max: 3, // max number show in control
				onchange: (event) => {
					//function called when skip change
					new $.toast("i", `Skip changed to ${event.detail.skip}`).show();
				},
			});
		},
	},

	{
		title: "Show 5 button ",
		code: () => {
			return new $.paging({
				limit: 10,
				skip: 60,
				total: 1260,
				max: 5,
				onchange: (event) => {
					new $.toast("i", `Skip changed to ${event.detail.skip}`).show();
				},
			});
		},
	},

	{
		title: "Custom icon",
		code: () => {
			return new $.paging({
				limit: 10,
				skip: 60,
				total: 1260,
				max: 3,
				labelfirst: "First",
				labellast: "Last",
				labelnext: new $.icon("arrow-right"),
				labelprev: new $.icon("arrow-left"),
				onchange: (event) => {
					new $.toast("i", `Skip changed to ${event.detail.skip}`).show();
				},
			});
		},
	},

	{
		title: "Hide first and last control",
		code: () => {
			return new $.paging({
				limit: 10,
				skip: 60,
				total: 1260,
				max: 3,
				firstlast: false,
				onchange: (event) => {
					new $.toast("i", `Skip changed to ${event.detail.skip}`).show();
				},
			});
		},
	},

	{
		title: "Hide next and prev control",
		code: () => {
			return new $.paging({
				limit: 10,
				skip: 60,
				total: 1260,
				max: 3,
				nextprev: false,
				onchange: (event) => {
					new $.toast("i", `Skip changed to ${event.detail.skip}`).show();
				},
			});
		},
	},

	{
		title: "Disable auto update",
		code: () => {
			return new $.paging({
				limit: 10,
				skip: 60,
				total: 1260,
				max: 3,
				autoupdate: false,
				onchange: (event) => {
					new $.toast("i", `Skip changed to ${event.detail.skip}`).show();
				},
			});
		},
	},

	{
		title: "Size",
	},

	{
		title: "Large",
		code: () => {
			return new $.paging({
				limit: 10,
				skip: 60,
				total: 1260,
				max: 3,
				weight: "lg",
				onchange: (event) => {
					new $.toast("i", `Skip changed to ${event.detail.skip}`).show();
				},
			});
		},
	},

	{
		title: "Small",
		code: () => {
			return new $.paging({
				limit: 10,
				skip: 60,
				total: 1260,
				max: 3,
				weight: "sm",
				onchange: (event) => {
					new $.toast("i", `Skip changed to ${event.detail.skip}`).show();
				},
			});
		},
	},

	{
		title: "Aligment",
	},

	{
		title: "Start",
		code: () => {
			return new $.paging({
				limit: 10,
				skip: 60,
				total: 1260,
				max: 3,
				align: "start",
				onchange: (event) => {
					new $.toast("i", `Skip changed to ${event.detail.skip}`).show();
				},
			});
		},
	},

	{
		title: "End",
		code: () => {
			return new $.paging({
				limit: 10,
				skip: 60,
				total: 1260,
				max: 3,
				align: "end",
				onchange: (event) => {
					new $.toast("i", `Skip changed to ${event.detail.skip}`).show();
				},
			});
		},
	},
];
