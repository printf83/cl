"use strict";
import sample from "./sample.js";
import $ from "../component.js";

export default [
	{
		title: "Image",
		msg: ["Helper to create {{&lt;img&gt;}} tag"],
		anchor: false,
	},

	{
		msg: [
			"Shortcut for {{new $.tag({tag:'img'})}}",
			"This component is extended from {{tag}} component, so any property on tag component, will also work on this component.",
			"Property inherits from tag component:",
			sample.tagprop("elem"),
		],
	},

	{
		title: "Example",
		sample: { "sample.img": sample.img },
		code: function () {
			return new $.img({
				src: sample.img(100, 100),
				alt: "Sample Image",
				class: "img-fluid",
				rounded: true,
			});
		},
	},

	{
		title: "Addtional property",
		msg: [
			"We add some special property into this component:",
			new $.ul({
				item: [
					"<code>src</code> - to set src attribute. Shortcut from <code>{attr:src}</code>",
					"<code>alt</code> - to set alt attribute. Shortcut from <code>{attr:alt}</code>",
				],
			}),
		],
	},

	{
		title: "Easy option",
		msg: "This component also supported easy option.",
		sample: { "sample.img": sample.img },
		container: sample.stackcontainer,
		code: function () {
			return [
				new $.img({ src: sample.img(100, 100), class: "img-thumbnail", alt: "Sample Image" }),
				new $.img("img-thumbnail", sample.img(100, 100)),
				new $.img(sample.img(100, 100)),
			];
		},
	},
];
