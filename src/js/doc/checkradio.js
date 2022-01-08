"use strict";
import $ from "../component.js";

export default [
	{
		title: "Checks & radios",
		msg: "Create consistent cross-browser and cross-device checkboxes and radios with our completely rewritten checks component.",
		anchor: false,
	},

	{
		title: "Checks",
		container: $.container.form,
		code: function () {
			return [
				new $.input({ label: "Default checkbox", type: "checkbox" }),
				new $.input({ label: "Checked checkbox", type: "checkbox", checked: true }),
			];
		},
	},

	{
		title: "Indeterminate",
		code: function () {
			return new $.input({ label: "Indeterminate checkbox", type: "checkbox" });
		},
	},

	{
		title: "Disabled",
		container: $.container.form,
		code: function () {
			return [
				new $.input({ label: "Disabled checkbox", type: "checkbox", disabled: true }),
				new $.input({
					label: "Disabled checked checkbox",
					type: "checkbox",
					checked: true,
					disabled: true,
				}),
			];
		},
	},

	{
		title: "Radio",
		container: $.container.form,
		code: function () {
			return [
				new $.input({ name: "g1", label: "Default radio", type: "radio" }),
				new $.input({ name: "g1", label: "Checked radio", type: "radio", checked: true }),
			];
		},
	},

	{
		title: "Disabled",
		container: $.container.form,
		code: function () {
			return [
				new $.input({ name: "g2", label: "Disabled radio", type: "radio", disabled: true }),
				new $.input({
					name: "g2",
					label: "Disabled checked radio",
					type: "radio",
					checked: true,
					disabled: true,
				}),
			];
		},
	},

	{
		title: "Switch",
		container: $.container.form,
		code: function () {
			return [
				new $.input({ label: "Default switch checkbox input", type: "switch" }),
				new $.input({ label: "Checked switch checkbox input", type: "switch", checked: true }),
				new $.input({
					label: "Disabled switch checkbox input",
					type: "switch",
					disabled: true,
				}),
				new $.input({
					label: "Disabled checked switch checkbox input",
					type: "switch",
					checked: true,
					disabled: true,
				}),
			];
		},
	},

	{
		title: "Default (stacked)",
		container: $.container.form,
		code: function () {
			return [
				new $.input({ label: "Disabled checkbox", type: "checkbox", checked: true }),
				new $.input({ label: "Disabled checkbox", type: "checkbox", disabled: true }),
				new $.input({ name: "g3", label: "Default radio", type: "radio" }),
				new $.input({ name: "g3", label: "Second radio", type: "radio", checked: true }),
				new $.input({ name: "g3", label: "Disabled radio", type: "radio", disabled: true }),
			];
		},
	},

	{
		title: "Disabled",
		container: $.container.form,
		code: function () {
			return [
				new $.input({ name: "g4", label: "Disabled radio", type: "radio", disabled: true }),
				new $.input({
					name: "g4",
					label: "Disabled checked radio",
					type: "radio",
					checked: true,
					disabled: true,
				}),
			];
		},
	},

	{
		title: "Inline Check",
		container: $.container.stack,
		code: function () {
			return [
				new $.input({ label: "1", type: "checkbox", inline: true }),
				new $.input({ label: "2", type: "checkbox", inline: true }),
				new $.input({ label: "3 (disabled)", type: "checkbox", disabled: true, inline: true }),
			];
		},
	},

	{
		title: "Inline Radio",
		container: $.container.stack,
		code: function () {
			return [
				new $.input({ name: "g5", label: "1", type: "radio", inline: true }),
				new $.input({ name: "g5", label: "2", type: "radio", inline: true }),
				new $.input({
					name: "g5",
					label: "3 (disabled)",
					type: "radio",
					disabled: true,
					inline: true,
				}),
			];
		},
	},

	{
		title: "Without label",
		container: $.container.form,
		code: function () {
			return [new $.input({ type: "checkbox" }), new $.input({ name: "g6", type: "radio" })];
		},
	},

	{
		title: "Checkbox toggle button",
		code: function () {
			return new $.button({ type: "checkbox", label: "Single toggle", color: "primary" });
		},
	},

	{
		title: "Checkbox toggle button checked",
		code: function () {
			return new $.button({
				type: "checkbox",
				checked: true,
				label: "Checked",
				color: "primary",
			});
		},
	},

	{
		title: "Checkbox toggle button disabled",
		code: function () {
			return new $.button({
				type: "checkbox",
				disabled: true,
				label: "Disabled",
				color: "primary",
			});
		},
	},

	{
		title: "Radio toggle buttons",
		container: $.container.stack,
		code: function () {
			return [
				new $.button({
					type: "radio",
					name: "g7",
					label: "Checked",
					checked: true,
					color: "secondary",
				}),
				new $.button({ type: "radio", name: "g7", label: "Radio", color: "secondary" }),
				new $.button({
					type: "radio",
					name: "g7",
					label: "Disabled",
					disabled: true,
					color: "secondary",
				}),
				new $.button({ type: "radio", name: "g7", label: "Radio", color: "secondary" }),
			];
		},
	},

	{
		title: "Outlined styles",
		container: $.container.stack,
		code: function () {
			return [
				new $.button({
					type: "checkbox",
					outline: true,
					label: "Single toggle",
					color: "primary",
				}),
				new $.button({
					type: "checkbox",
					outline: true,
					label: "Checked",
					checked: true,
					color: "secondary",
				}),
				new $.button({
					type: "radio",
					outline: true,
					name: "g8",
					label: "Checked success radio",
					checked: true,
					color: "success",
				}),
				new $.button({
					type: "radio",
					outline: true,
					name: "g8",
					label: "Danger radio",
					color: "danger",
				}),
			];
		},
	},
];
