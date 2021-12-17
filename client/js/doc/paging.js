"use strict";
import paging from "../base/paging.js";
import icon from "../base/icon.js";

export default [
	{
		title: "paging",
		msg: "Documentation and examples for showing paging to indicate a series of related content exists across multiple pages.",
		anchor: false,
	},

	{
		title: "Example",
		code: function () {
			return new paging({
				limit: 10, // limit record in one page
				skip: 20, // record number to show
				total: 1260, // total record
				max: 3, // max number show in control
				onchange: function (skip, sender) {
					//function called when skip change
					new toast("i", `Skip changed to ${skip}`).show();
				},
			});
		},
	},

	{
		title: "Show 5 button ",
		code: function () {
			return new paging({
				limit: 10,
				skip: 60,
				total: 1260,
				max: 5,
				onchange: function (skip, sender) {
					new toast("i", `Skip changed to ${skip}`).show();
				},
			});
		},
	},

	{
		title: "Custom icon",
		code: function () {
			return new paging({
				limit: 10,
				skip: 60,
				total: 1260,
				max: 3,
				labelfirst: "First",
				labellast: "Last",
				labelnext: new icon("arrow-right"),
				labelprev: new icon("arrow-left"),
				onchange: function (skip, sender) {
					new toast("i", `Skip changed to ${skip}`).show();
				},
			});
		},
	},

	{
		title: "Hide first and last control",
		code: function () {
			return new paging({
				limit: 10,
				skip: 60,
				total: 1260,
				max: 3,
				showfirstlast: false,
				onchange: function (skip, sender) {
					new toast("i", `Skip changed to ${skip}`).show();
				},
			});
		},
	},

	{
		title: "Hide next and prev control",
		code: function () {
			return new paging({
				limit: 10,
				skip: 60,
				total: 1260,
				max: 3,
				shownextprev: false,
				onchange: function (skip, sender) {
					new toast("i", `Skip changed to ${skip}`).show();
				},
			});
		},
	},

	{
		title: "Size",
	},

	{
		title: "Large",
		code: function () {
			return new paging({
				limit: 10,
				skip: 60,
				total: 1260,
				max: 3,
				weight: "lg",
				onchange: function (skip, sender) {
					new toast("i", `Skip changed to ${skip}`).show();
				},
			});
		},
	},

	{
		title: "Small",
		code: function () {
			return new paging({
				limit: 10,
				skip: 60,
				total: 1260,
				max: 3,
				weight: "sm",
				onchange: function (skip, sender) {
					new toast("i", `Skip changed to ${skip}`).show();
				},
			});
		},
	},

	{
		title: "Aligment",
	},

	{
		title: "Start",
		code: function () {
			return new paging({
				limit: 10,
				skip: 60,
				total: 1260,
				max: 3,
				align: "start",
				onchange: function (skip, sender) {
					new toast("i", `Skip changed to ${skip}`).show();
				},
			});
		},
	},

	{
		title: "End",
		code: function () {
			return new paging({
				limit: 10,
				skip: 60,
				total: 1260,
				max: 3,
				align: "end",
				onchange: function (skip, sender) {
					new toast("i", `Skip changed to ${skip}`).show();
				},
			});
		},
	},
];
