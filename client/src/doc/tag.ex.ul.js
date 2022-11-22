"use strict";
import sample from "./sample.js";
import * as alert from "../dist/cl/base/alert.js";
import ul from "../dist/cl/base/ul.js";
import li from "../dist/cl/base/li.js";

export default [
	{
		title: "Unordered list",
		msg: ["Helper to create {{&lt;ul&gt;&lt;/ul&gt;}} tag"],
		anchor: false,
	},

	{
		msg: [
			"Shortcut for {{new tag({tag:'ul'})}}",
			"This component is extended from {{tag}} component, so any property on tag component, will also work on this component.",
			"CL option property that inherits from tag component :",
			sample.tagpropCl(),
			"Bootstrap option property that inherits from tag component :",
			sample.tagpropBootstrap(),
			new alert.container({
				color: "primary",
				elem: new alert.container({
					color: "primary",
					elem: 'If the Bootstrap property value is not supported by bootstrap, it will be process as <b>style</b> or <b>html</b> property (if supported). <br/><br/><small>Example: <code>padding:1</code> will be processed as Bootstrap (will be translated as <code>class="p-1"</code>) and <code>padding:1rem</code> will be processed as style (will be translated as <code>style="padding: 1rem;"</code>)</small>',
				}),
			}),
			"CSS option property that inherits from tag component :",
			sample.tagpropCss(),
			"Html option property that inherits from tag component (if supported by the tag) :",
			sample.tagpropHtml(),
		],
	},

	{
		title: "Example",
		import: ["ul", "li"],
		code: () => {
			return new ul({
				"data-test": "test",
				elem: [new li("Item 1"), new li("Item 2"), new li("Item 3"), new li("Item 4")],
			});
		},
	},

	{
		title: "Addtional property",
		msg: [
			"We add some special property into this component:",
			new ul({
				item: ["<code>item</code> - only works if elem not provided. Shorcut for create li item"],
			}),
		],
		import: ["ul"],
		code: () => {
			return new ul({
				"data-test": "test",
				item: ["Item 1", "Item 2", "Item 3", "Item 4"],
			});
		},
	},

	{
		title: "Easy option",
		msg: [
			"This component also supported easy option.",
			new ul({
				item: ["option", "class,elem", "class,item", "elem"].map((i) => {
					return `<code>new ul(${i})</code>`;
				}),
			}),
		],
		import: ["ul", "li"],
		code: () => {
			return [
				new ul({
					class: "classname",
					item: ["Item 1", "Item 2", "Item 3", "Item 4"],
				}),
				new ul({
					class: "classname",
					elem: [new li("Item 1"), new li("Item 2"), new li("Item 3"), new li("Item 4")],
				}),
				new ul("classname", [new li("Item 1"), new li("Item 2"), new li("Item 3"), new li("Item 4")]),
				new ul([new li("Item 1"), new li("Item 2"), new li("Item 3"), new li("Item 4")]),
			];
		},
	},
];
