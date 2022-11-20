"use strict";
import icon from "../dist/cl/base/icon.js";
import toast from "../dist/cl/base/toast.js";
import paging from "../dist/cl/base/paging.js";

export default [
	{
		title: "Paging",
		msg: "Documentation and examples for showing paging to indicate a series of related content exists across multiple pages.",
		anchor: false,
	},

	{
		title: "Example",
		import: ["paging"],
		code: () => {
			return new paging({
				limit: 10, // limit record in one page
				skip: 20, // record number to show
				total: 1260, // total record
				max: 3, // max number show in control
			});
		},
	},

	{
		title: "Show 5 button ",
		import: ["paging"],
		code: () => {
			return new paging({
				limit: 10,
				skip: 60,
				total: 1260,

				//marker
				max: 5,
			});
		},
	},

	{
		title: "Custom icon",
		import: ["icon", "paging"],
		code: () => {
			return new paging({
				limit: 10,
				skip: 60,
				total: 1260,
				max: 3,

				//marker
				labelfirst: "First",
				labellast: "Last",
				labelnext: new icon("arrow-right"),
				labelprev: new icon("arrow-left"),
				//-
			});
		},
	},

	{
		title: "Hide first and last control",
		import: ["paging"],
		code: () => {
			return new paging({
				limit: 10,
				skip: 60,
				total: 1260,
				max: 3,

				//marker
				firstlast: false,
			});
		},
	},

	{
		title: "Hide next and prev control",
		import: ["paging"],
		code: () => {
			return new paging({
				limit: 10,
				skip: 60,
				total: 1260,
				max: 3,

				//marker
				nextprev: false,
			});
		},
	},

	{
		title: "Disable auto update",
		import: ["paging"],
		code: () => {
			return new paging({
				limit: 10,
				skip: 60,
				total: 1260,
				max: 3,

				//marker
				autoupdate: false,
			});
		},
	},

	{
		title: "Size",
	},

	{
		title: "Large",
		import: ["paging"],
		code: () => {
			return new paging({
				limit: 10,
				skip: 60,
				total: 1260,
				max: 3,

				//marker
				weight: "lg",
			});
		},
	},

	{
		title: "Small",
		import: ["paging"],
		code: () => {
			return new paging({
				limit: 10,
				skip: 60,
				total: 1260,
				max: 3,

				//marker
				weight: "sm",
			});
		},
	},

	{
		title: "Aligment",
	},

	{
		title: "Start",
		import: ["paging"],
		code: () => {
			return new paging({
				limit: 10,
				skip: 60,
				total: 1260,
				max: 3,

				//marker
				align: "start",
			});
		},
	},

	{
		title: "End",
		import: ["paging"],
		code: () => {
			return new paging({
				limit: 10,
				skip: 60,
				total: 1260,
				max: 3,

				//marker
				align: "end",
			});
		},
	},

	{
		title: "Event",
		msg: ["Paging support {{change}} event. The {{skip}} value return in {{event.detail.skip}}"],
		import: ["toast", "paging"],
		code: () => {
			return new paging({
				limit: 10,
				skip: 20,
				total: 1260,
				max: 3,

				//marker
				change: (event) => {
					//function called when skip change
					new toast("i", `Skip changed to ${event.detail.skip}`).show();
				},
				//-
			});
		},
	},
];
