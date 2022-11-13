"use strict";
import sample from "./sample.js";
import tag from "../../cl/js/base/tag.js";

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
			return ["div", "span", "p", "b", "i", "unknow"].map((i) => {
				return new tag({
					tag: i, //marker
					elem: `The ${i.toUpperCase()} element`,
				});
			});
		},
	},

	{
		title: "elem",
		msg: ["Create element inside tag"],
		container: sample.vstackcontainer,
		import: ["tag"],
		code: () => {
			return [
				new tag({
					tag: "div",
					class: "cl-highlight-div cl-highlight-element",
					elem: "String", //marker
				}),
				new tag({
					tag: "div",
					class: "cl-highlight-div cl-highlight-element",
					elem: ["String", "<div>Sub element</div>"], //marker
				}),
				new tag({
					tag: "div",
					class: "cl-highlight-div cl-highlight-element",
					elem: new tag({ tag: "div", elem: "Sub element" }), //marker
				}),
				new tag({
					tag: "div",
					class: "cl-highlight-div cl-highlight-element",
					elem: ["Sub element 1", "<div>Sub element 2</div>", new tag({ tag: "div", elem: "Sub element 3" })], //marker
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
					//marker
					//tag:"no tag element"
					class: "hello",
					//-

					elem: "This sub element tag not have tag property. The class will be set on the parent.",
				}),
			});
		},
	},

	{
		title: "Attribute",
		msg: ["Create attribute for element"],
		import: ["tag"],
		code: () => {
			return new tag({
				tag: "div",
				//marker
				id: "elementID",
				class: "elementClass",
				color: "#555",
				//-
				elem: "Example element",
			});
		},
	},

	//=============================
	//HELPER
	//=============================
	{
		anchor: true,
		title: "Another example",
	},
	{
		title: "id",
		import: ["tag"],
		code: () => {
			return new tag({
				tag: "div",
				id: "elementID2", //marker
				elem: "Example element",
			});
		},
	},
	{
		title: "name",
		import: ["tag"],
		code: () => {
			return new tag({
				tag: "div",
				name: "elementName", //marker
				elem: "Example element",
			});
		},
	},

	{
		title: "href",
		import: ["tag"],
		code: () => {
			return new tag({
				tag: "a",
				href: "https://www.getbootstrap.com", //marker
				elem: "www.getbootstrap.com",
			});
		},
	},

	{
		title: "Event",
		msg: ["Create event by set function as value for the event"],
		import: ["tag"],
		code: () => {
			return new tag({
				tag: "button",
				class: "btn btn-primary",
				elem: "Example button",
				//marker
				click: (event) => {
					event.currentTarget.innerText = "click trigged";
				},
				//-
			});
		},
	},

	{
		title: "style",
		import: ["tag"],
		code: () => {
			return new tag({
				tag: "div",
				elem: "Example element",
				//marker
				border: "1px solid rgba(95,95,95,0.5)",
				backgroundColor: "rgba(155,155,155,0.4)",
				padding: "1rem",
				style: {
					"unsupported-style-1": "style-1",
					unsupportedStyle2: "style-2",
				},
				//-
			});
		},
	},

	{
		title: "Bootstrap style",
		msg: ["Create attribute <code>style</code> for  element", "Shortcut for : <code>attr:{style:value}</code>"],
		import: ["tag"],
		code: () => {
			return new tag({
				tag: "div",
				elem: "Example element",
				//marker
				border: true,
				bgColor: "primary",
				padding: 3,
				//-
			});
		},
	},

	{
		title: "Mix value support",
		msg: ["CL automaticly create style or bootstrap class base on property value"],
		import: ["tag"],
		container: sample.vstackcontainer,
		code: () => {
			return [
				new tag({
					tag: "div",
					elem: "Example with style",

					//marker
					border: "2px solid #aaa",
					backgroundColor: "rgba(255,0,0,0.5)",
					padding: "1rem",
					//-
				}),

				new tag({
					tag: "div",
					elem: "Example with bootstrap",

					//marker
					border: true,
					bgColor: "primary",
					padding: 3,
					//-
				}),

				new tag({
					tag: "div",
					elem: "Example with style and bootstrap (mixing)",

					//marker
					border: true,
					backgroundColor: "rgba(0,255,0,0.5)",
					padding: 3,
					//-
				}),
			];
		},
	},
];
