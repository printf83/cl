"use strict";
import sample from "./sample.js";
import * as alert from "../dist/cl/base/alert.js";
import ul from "../dist/cl/base/ul.js";
import img from "../dist/cl/base/img.js";
import div from "../dist/cl/base/div.js";

export default [
	{
		title: "Image",
		msg: ["Helper to create {{&lt;img&gt;}} tag"],
		anchor: false,
	},

	{
		msg: [
			"Shortcut for {{new tag({tag:'img'})}}",
			"This component is extended from {{tag}} component, so any property on tag component, will also work on this component.",
			"CL option property that inherits from tag component :",
			sample.tagpropCl("elem"),
			"Bootstrap option property that inherits from tag component :",
			sample.tagpropBootstrap(),
			new alert.container({
				color: "primary",
				elem: 'If the Bootstrap property value is not supported by bootstrap, it will be process as <b>style</b> or <b>html</b> property (if supported). <br/><br/><small>Example: <code>padding:1</code> will be processed as Bootstrap (will be translated as <code>class="p-1"</code>) and <code>padding:1rem</code> will be processed as style (will be translated as <code>style="padding: 1rem;"</code>)</small>',
			}),
			"CSS option property that inherits from tag component :",
			sample.tagpropCss(),
			"Html option property that inherits from tag component (if supported by the tag) :",
			sample.tagpropHtml(),
			"Event option property that inherits from tag component (if supported by the tag) :",
			sample.tagpropEvent(),
		],
	},

	{
		title: "Responsive images",
		msg: [
			"Images in Bootstrap are made responsive with {{fluid:true}}. This applies {{max-width: 100%;}} and {{height: auto;}} to the image so that it scales with the parent element.",
		],
		import: ["img", "sample"],
		code: () => {
			return new img({
				fluid: true, //marker
				rounded: true,
				src: sample.img(800, 200),
				alt: "Image",
			});
		},
	},

	{
		title: "Image thumbnails",
		msg: [
			"In addition to our border-radius utilities, you can use {{thumbnail:true}} to give an image a rounded 1px border appearance.",
		],
		import: ["img", "sample"],
		code: () => {
			return new img({
				thumbnail: true, //marker
				rounded: true,
				src: sample.img(200, 200),
				alt: "Image",
			});
		},
	},

	{
		title: "Aligning images",
		msg: [
			"Align images with the helper float classes or text alignment classes. {{block-level}} images can be centered using the {{marginX:'auto'}} margin utility class.",
		],
		import: ["img", "sample"],
		code: () => {
			return [
				new img({
					src: sample.img(200, 200),
					alt: "Image",
					rounded: true,
					float: "start", //marker
				}),
				new img({
					src: sample.img(200, 200),
					alt: "Image",
					rounded: true,
					float: "end", //marker
				}),
			];
		},
	},

	{
		import: ["img", "sample"],
		code: () => {
			return new img({
				src: sample.img(200, 200),
				alt: "Image",
				rounded: true,

				//marker
				display: "block",
				marginX: "auto",
				//-
			});
		},
	},

	{
		import: ["img", "div", "sample"],
		code: () => {
			return new div({
				align: "center", //marker
				elem: new img({
					src: sample.img(200, 200),
					alt: "Image",
					rounded: true,
				}),
			});
		},
	},

	{
		title: "Figures",
		msg: ["Displaying related images and text with the figure component in Bootstrap"],
		import: ["img", "sample"],
		code: () => {
			return new img({
				src: sample.img(400, 300),
				alt: "Image",
				rounded: true,
				fluid: true,
				caption: "A caption for the above image.", //marker
			});
		},
	},

	{
		msg: ["Aligning the figure’s caption is easy with {{captionalign}} property."],
		import: ["img", "sample"],
		code: () => {
			return new img({
				src: sample.img(400, 300),
				alt: "Image",
				rounded: true,
				fluid: true,
				caption: "A caption for the above image.",
				captionalign: "end", //marker
			});
		},
	},

	{
		title: "Addtional property",
		msg: [
			"We add some special property into this component:",
			new ul({
				item: [
					"<code>src</code> - to set src attribute. Shortcut from <code>{attr:src}</code>",
					"<code>alt</code> - to set alt attribute. Shortcut from <code>{attr:alt}</code>",
					"<code>fluid</code> - to set class <code>img-fluid</code>",
					"<code>thumbnail</code> - to set class <code>img-thumbnail</code>",
					"<code>caption</code> - to set image caption",
					"<code>captionalign</code> - to align the image caption",
				],
			}),
		],
	},

	{
		title: "Easy option",
		msg: [
			"This component also supported easy option.",
			new ul({
				item: ["option", "class,src", "src"].map((i) => {
					return `<code>new img(${i})</code>`;
				}),
			}),
		],
		container: sample.stackcontainer,
		import: ["img", "sample"],
		code: () => {
			return [
				new img({ src: sample.img(100, 100), thumbnail: true, alt: "Sample Image" }),
				new img("img-thumbnail", sample.img(100, 100)),
				new img(sample.img(100, 100)),
			];
		},
	},
];
