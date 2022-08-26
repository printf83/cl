"use strict";
import icon from "../base/icon.js";
import toast from "../base/toast.js";
import paging from "../base/paging.js";

export default [
	{
		title: "Paging",
		msg: "Documentation and examples for showing paging to indicate a series of related content exists across multiple pages.",
		anchor: false,
	},

	{
		title: "Example",
		import: ["toast", "paging"],
		code: () => {
			return new paging({
				limit: 10, // limit record in one page
				skip: 20, // record number to show
				total: 1260, // total record
				max: 3, // max number show in control
				onchange: (event) => {
					//function called when skip change
					new toast("i", `Skip changed to ${event.detail.skip}`).show();
				},
			});
		},
	},

	{
		title: "Show 5 button ",
		import: ["toast", "paging"],
		code: () => {
			return new paging({
				limit: 10,
				skip: 60,
				total: 1260,
				max: 5,
				onchange: (event) => {
					new toast("i", `Skip changed to ${event.detail.skip}`).show();
				},
			});
		},
	},

	{
		title: "Custom icon",
		import: ["icon", "toast", "paging"],
		code: () => {
			return new paging({
				limit: 10,
				skip: 60,
				total: 1260,
				max: 3,
				labelfirst: "First",
				labellast: "Last",
				labelnext: new icon("arrow-right"),
				labelprev: new icon("arrow-left"),
				onchange: (event) => {
					new toast("i", `Skip changed to ${event.detail.skip}`).show();
				},
			});
		},
	},

	{
		title: "Hide first and last control",
		import: ["toast", "paging"],
		code: () => {
			return new paging({
				limit: 10,
				skip: 60,
				total: 1260,
				max: 3,
				firstlast: false,
				onchange: (event) => {
					new toast("i", `Skip changed to ${event.detail.skip}`).show();
				},
			});
		},
	},

	{
		title: "Hide next and prev control",
		import: ["toast", "paging"],
		code: () => {
			return new paging({
				limit: 10,
				skip: 60,
				total: 1260,
				max: 3,
				nextprev: false,
				onchange: (event) => {
					new toast("i", `Skip changed to ${event.detail.skip}`).show();
				},
			});
		},
	},

	{
		title: "Disable auto update",
		import: ["toast", "paging"],
		code: () => {
			return new paging({
				limit: 10,
				skip: 60,
				total: 1260,
				max: 3,
				autoupdate: false,
				onchange: (event) => {
					new toast("i", `Skip changed to ${event.detail.skip}`).show();
				},
			});
		},
	},

	{
		title: "Size",
	},

	{
		title: "Large",
		import: ["toast", "paging"],
		code: () => {
			return new paging({
				limit: 10,
				skip: 60,
				total: 1260,
				max: 3,
				weight: "lg",
				onchange: (event) => {
					new toast("i", `Skip changed to ${event.detail.skip}`).show();
				},
			});
		},
	},

	{
		title: "Small",
		import: ["toast", "paging"],
		code: () => {
			return new paging({
				limit: 10,
				skip: 60,
				total: 1260,
				max: 3,
				weight: "sm",
				onchange: (event) => {
					new toast("i", `Skip changed to ${event.detail.skip}`).show();
				},
			});
		},
	},

	{
		title: "Aligment",
	},

	{
		title: "Start",
		import: ["toast", "paging"],
		code: () => {
			return new paging({
				limit: 10,
				skip: 60,
				total: 1260,
				max: 3,
				align: "start",
				onchange: (event) => {
					new toast("i", `Skip changed to ${event.detail.skip}`).show();
				},
			});
		},
	},

	{
		title: "End",
		import: ["toast", "paging"],
		code: () => {
			return new paging({
				limit: 10,
				skip: 60,
				total: 1260,
				max: 3,
				align: "end",
				onchange: (event) => {
					new toast("i", `Skip changed to ${event.detail.skip}`).show();
				},
			});
		},
	},
];
