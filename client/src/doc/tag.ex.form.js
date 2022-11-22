"use strict";
import sample from "./sample.js";
import form from "../dist/cl/base/form.js";
import ul from "../dist/cl/base/ul.js";
import button from "../dist/cl/base/button.js";
import toast from "../dist/cl/base/toast.js";
import input from "../dist/cl/base/input.js";
import div from "../dist/cl/base/div.js";

export default [
	{
		title: "Form",
		msg: ["Helper to create {{&lt;form&gt;&lt;/form&gt;}} tag"],
		anchor: false,
	},

	{
		msg: [
			"Shortcut for {{new tag({tag:'form'})}}",
			"This component is extended from {{tag}} component, so any property on tag component, will also work on this component.",
			"CL option property that inherits from tag component :",
			sample.tagpropCl(),
			"Bootstrap option property that inherits from tag component :",
			sample.tagpropBootstrap(),
			"If the Bootstrap property value is not supported by bootstrap, it will be process as html property (if supported)",
			"Html option property that inherits from tag component (if supported by the tag) :",
			sample.tagpropHtml(),
		],
	},

	{
		title: "Example",
		import: ["form"],
		code: () => {
			return new form({
				"data-test": "test",
				elem: "Example",
			});
		},
	},

	{
		title: "Easy option",
		msg: [
			"This component also supported easy option.",
			new ul({
				item: ["option", "class,elem", "elem"].map((i) => {
					return `<code>new form(${i})</code>`;
				}),
			}),
		],
		container: sample.vstackcontainer,
		import: ["form"],
		code: () => {
			return [
				new form({ class: "classname", elem: "Using elem property" }),
				new form("Direct elem property"),
				new form("classname", "Direct class and elem property"),
			];
		},
	},

	{
		title: "Event",
		msg: ["Form support {{onsubmit}} event."],
		import: ["button", "toast", "input", "container"],
		code: () => {
			return new form({
				//marker
				row: true,
				gap: 3,
				novalidate: true,
				onsubmit: (event) => {
					let sender = event.currentTarget;
					event.preventDefault();
					event.stopPropagation();
					sender.classList.add("was-validated");

					if (!sender.checkValidity()) {
						new toast("-", "Invalid input value").show();
					} else {
						new toast("/", "Valid input value").show();
					}
				},
				//-

				elem: [
					new input({
						label: "Email",
						type: "email",
						autocomplete: "email",
						required: true,
						validitytype: "tooltip",
						invalid: "Its required!",
						valid: "Looks good.",
					}),
					new input({
						label: "Password",
						type: "password",
						autocomplete: "current-password",
						required: true,
						validitytype: "tooltip",
						invalid: "Its required",
						valid: "Looks good.",
					}),

					new button({
						col: true,
						type: "submit",
						label: "Submit",
						color: "primary",
					}),
				].map((i) => {
					return new div({ col: true, elem: i });
				}),
			});
		},
	},
];
