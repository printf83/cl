"use strict";
import * as core from "../base/core.js";
import * as doc_core from "./core.js";
import * as sample from "./sample.js";
import button from "../base/button.js";
import input from "../base/input.js";
import toast from "../base/toast.js";

export default [
	{
		title: "Floating labels",
		msg: "Create beautifully simple form labels that float over your input fields.",
		anchor: false,
	},

	{
		title: "Example",
		container: doc_core.formcontainer,
		code: function () {
			return [
				new input({
					type: "email",
					label: "Email address",
					floatlabel: true,
				}),

				new input({
					type: "password",
					label: "Password",
					floatlabel: true,
				}),
			];
		},
	},

	{
		title: "Value already defind",
		code: function () {
			return new input({
				type: "email",
				label: "Email address",
				floatlabel: true,
				value: "user@example.com",
			});
		},
	},

	{
		title: "Validation",
		code: function () {
			return new input({
				type: "email",
				name: "email",
				label: "Email address",
				floatlabel: true,
				required: true,
				invalid: "Please provide email",
				aftertype: "button",
				after: new button({
					label: "Validate",
					color: "primary",
					onclick: function (event) {
						core.validate(event.currentTarget.parentElement, function (result) {
							new toast("i", `Result: ${result}`).show();
						});
					},
				}),
			});
		},
	},

	{
		title: "Textareas",
		code: function () {
			return new input({
				type: "textarea",
				label: "Comments",
				floatlabel: true,
			});
		},
	},

	{
		title: "Textareas With Height Setting",
		code: function () {
			return new input({
				type: "textarea",
				label: "Comments",
				style: { height: "100px" },
				floatlabel: true,
			});
		},
	},

	{
		title: "Select",
		sample: { "sample.optionitem": sample.optionitem },
		code: function () {
			return new input({
				label: "Works with selects",
				type: "select",
				floatlabel: true,
				option: sample.optionitem(),
			});
		},
	},
];
