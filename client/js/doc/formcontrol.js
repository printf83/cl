"use strict";
import * as doc_core from "./core.js";
import input from "../base/input.js";
import button from "../base/button.js";
export default [
	{
		title: "Form controls",
		msg: "Give textual form controls like {{&lt;input&gt;}}s and {{&lt;textarea&gt;}}s an upgrade with custom styles, sizing, focus states, and more.",
		anchor: false,
	},

	{
		title: "Example",
		container: doc_core.formcontainer,
		code: function () {
			return [
				new input({
					label: "Email address",
					type: "email",
					placeholder: "name@example.com",
				}),
				new input({
					label: "Example textarea",
					type: "textarea",
				}),
			];
		},
	},

	{
		title: "Sizing",
		container: doc_core.formcontainer,
		code: function () {
			return [
				new input({
					weight: "lg",
					type: "text",
					placeholder: 'weight:"lg"',
				}),
				new input({
					type: "text",
					placeholder: "Default input",
				}),
				new input({
					weight: "sm",
					type: "text",
					placeholder: 'weight:"sm"',
				}),
			];
		},
	},

	{
		title: "Disabled",
		container: doc_core.formcontainer,
		code: function () {
			return [
				new input({
					disabled: true,
					type: "text",
					placeholder: "Disabled input",
				}),
				new input({
					disabled: true,
					readonly: true,
					type: "text",
					placeholder: "Disabled readonly input",
				}),
			];
		},
	},

	{
		title: "Readonly",
		container: doc_core.formcontainer,
		code: function () {
			return new input({
				readonly: true,
				type: "text",
				placeholder: "Readonly input here...",
			});
		},
	},

	{
		title: "Readonly plain text",
		container: doc_core.formcontainer,
		code: function () {
			return [
				new input({
					label: "Email",
					labelsize: "sm-2",
					ctlsize: "sm-10",
					type: "email",
					readonly: true,
					plaintext: true,
					value: "name@example.com",
				}),
				new input({
					label: "Password",
					labelsize: "sm-2",
					ctlsize: "sm-10",
					type: "password",
				}),
			];
		},
	},

	{
		title: "Readonly plain text (Stack)",
		container: doc_core.stackcontainer,
		code: function () {
			return [
				new input({
					label: "Email",
					hidelabel: true,
					type: "email",
					readonly: true,
					plaintext: true,
					value: "name@example.com",
				}),
				new input({
					label: "Password",
					hidelabel: true,
					placeholder: "Password",
					type: "password",
				}),
				new button({
					type: "submit",
					label: "Confirm identity",
					color: "primary",
				}),
			];
		},
	},

	{
		title: "File input",
		container: doc_core.formcontainer,
		code: function () {
			return [
				new input({ label: "Default file input example", type: "file" }),
				new input({ label: "Multiple files input example", type: "file", multiple: true }),
				new input({ label: "Disabled file input example", type: "file", disabled: true }),
				new input({ label: "Small file input example", type: "file", weight: "sm" }),
				new input({ label: "Large file input example", type: "file", weight: "lg" }),
			];
		},
	},

	// {
	// 	title: "File Input",
	// 	msg: "This control is {{link}} to backend",
	// 	container: doc_core.formcontainer,
	// 	code: function () {
	// 		return new file.ctl({
	// 			label: "Picture",
	// 			accepe: "image/gif,image/bmp,image/x-windows-bmp,image/jpeg,image/png",
	// 			value: null,
	// 			multiple: false,
	// 		});
	// 	},
	// },

	{
		title: "Color",
		container: doc_core.formcontainer,
		code: function () {
			return new input({ label: "Color picker", type: "color" });
		},
	},

	{
		title: "Datalist",
		container: doc_core.formcontainer,
		code: function () {
			return new input({
				label: "Datalist example",
				type: "text",
				option: ["San Francisco", "New York", "Seattle", "Los Angeles", "Chicago"],
			});
		},
	},
];