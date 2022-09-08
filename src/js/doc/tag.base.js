"use strict";
import sample from "./sample.js";
import tag from "../base/tag.js";

export default [
	{
		title: "Tag base property",
		msg: "Every component is extended from this component. This is base property for tag component.",
		anchor: false,
	},

	//=============================
	//BASE
	//=============================

	{
		title: "tag",
		msg: ["Create tag name for tag"],
		container: sample.vstackcontainer,
		import: ["tag"],
		code: () => {
			return [
				new tag({ tag: "div", elem: "DIV element" }),
				new tag({ tag: "span", elem: "SPAN element" }),
				new tag({ tag: "p", elem: "P element" }),
				new tag({ tag: "b", elem: "B element" }),
				new tag({ tag: "i", elem: "I element" }),
			];
		},
	},

	{
		title: "elem",
		msg: ["Create element inside tag"],
		container: sample.vstackcontainer,
		import: ["tag"],
		code: () => {
			return [
				new tag({ tag: "div", class: "cl-highlight-div cl-highlight-element", elem: "String" }),
				new tag({
					tag: "div",
					class: "cl-highlight-div cl-highlight-element",
					elem: ["String", "<div>Sub element</div>"],
				}),
				new tag({
					tag: "div",
					class: "cl-highlight-div cl-highlight-element",
					elem: new tag({ tag: "div", elem: "Sub element" }),
				}),
				new tag({
					tag: "div",
					class: "cl-highlight-div cl-highlight-element",
					elem: ["Sub element 1", "<div>Sub element 2</div>", new tag({ tag: "div", elem: "Sub element 3" })],
				}),
			];
		},
	},

	{
		title: "elem (without tag)",
		msg: ["Create element inside tag that change parent property"],
		import: ["tag"],
		code: () => {
			return new tag({
				tag: "div",
				elem: new tag({
					attr: { class: "hello" },
					elem: "This sub element tag not have tag property",
				}),
			});
		},
	},

	{
		title: "attr",
		msg: ["Create attribute for element"],
		import: ["tag"],
		code: () => {
			return new tag({
				tag: "div",
				attr: { id: "elementID", class: "elementClass", style: { color: "#555" } },
				elem: "Example element",
			});
		},
	},

	//=============================
	//HELPER
	//=============================
	{
		anchor: true,
		title: "Helper property",
		msg: "This property is create to help user to create <code>attr</code> property.",
	},
	{
		title: "id",
		msg: ["Create attribute <code>id</code> for element", "Shortcut for : <code>attr:{id:value}</code>"],
		import: ["tag"],
		code: () => {
			return new tag({
				tag: "div",
				id: "elementID2",
				elem: "Example element",
			});
		},
	},
	{
		title: "name",
		msg: ["Create attribute <code>name</code> for element", "Shortcut for : <code>attr:{id:value}</code>"],
		import: ["tag"],
		code: () => {
			return new tag({
				tag: "div",
				name: "elementName",
				elem: "Example element",
			});
		},
	},

	{
		title: "href",
		msg: [
			"Create attribute <code>href</code> for <code>a</code> element",
			"Shortcut for : <code>attr:{href:value}</code>",
		],
		import: ["tag"],
		code: () => {
			return new tag({
				tag: "a",
				href: "https://www.getbootstrap.com",
				elem: "www.getbootstrap.com",
			});
		},
	},

	{
		title: "onclick",
		msg: ["Create attribute <code>onclick</code> for  element", "Shortcut for : <code>attr:{onclick:value}</code>"],
		import: ["tag"],
		code: () => {
			return new tag({
				tag: "button",
				class: "btn btn-primary",
				onclick: (event) => {
					event.currentTarget.innerText = "onclick trigged";
				},
				elem: "Example button",
			});
		},
	},

	{
		title: "onchange",
		msg: [
			"Create attribute <code>onchange</code> for  element",
			"Shortcut for : <code>attr:{onchange:value}</code>",
		],
		import: ["tag"],
		code: () => {
			return new tag({
				tag: "input",
				attr: {
					class: "form-control",
					type: "text",
					placeholder: "Type some text here",
				},
				onchange: (event) => {
					event.currentTarget.value = "onchange trigged";
				},
			});
		},
	},

	{
		title: "onfocus",
		msg: ["Create attribute <code>onfocus</code> for  element", "Shortcut for : <code>attr:{onfocus:value}</code>"],
		import: ["tag"],
		code: () => {
			return new tag({
				tag: "input",
				attr: {
					class: "form-control",
					type: "text",
					placeholder: "Example input",
				},
				onfocus: (event) => {
					event.currentTarget.value = "onfocus trigged";
				},
			});
		},
	},

	{
		title: "onblur",
		msg: ["Create attribute <code>onblur</code> for  element", "Shortcut for : <code>attr:{onblur:value}</code>"],
		import: ["tag"],
		code: () => {
			return new tag({
				tag: "input",
				attr: {
					class: "form-control",
					type: "text",
					value: "Example input",
				},
				onblur: (event) => {
					event.currentTarget.value = "onblur trigged";
				},
			});
		},
	},

	{
		title: "style",
		msg: ["Create attribute <code>style</code> for  element", "Shortcut for : <code>attr:{style:value}</code>"],
		import: ["tag"],
		code: () => {
			return new tag({
				tag: "div",
				style: {
					border: "1px solid rgba(95,95,95,0.5)",
					"background-color": "rgba(155,155,155,0.4)",
					padding: "1rem",
				},
				elem: "Example element",
			});
		},
	},
];
