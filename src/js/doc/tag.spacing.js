"use strict";
import sample from "./sample.js";
import tag from "../base/tag.js";
import ul from "../base/ul.js";

export default [
	{
		title: "Spacing",
		msg: "Bootstrap includes a wide range of shorthand responsive margin, padding, and gap utility classes to modify an element’s appearance.",
		anchor: false,
	},

	{
		title: "Margin and padding",
		msg: [
			"Assign responsive-friendly {{margin}} or {{padding}} values to an element or a subset of its sides with shorthand classes. Includes support for individual properties, all properties, and vertical and horizontal properties. Classes are built from a default Sass map ranging from {{.25rem}} to {{3rem}}.",
			"Using the CSS Grid layout module? Consider using <b>the gap utility</b>.",
		],
	},

	{
		title: "Notation",
		msg: [
			"Spacing utilities that apply to all breakpoints, from {{xs}} to {{xxl}}, have no breakpoint abbreviation in them. This is because those classes are applied from {{min-width: 0}} and up, and thus are not bound by a media query. The remaining breakpoints, however, do include a breakpoint abbreviation.",
			"The classes are named using the format <code>{property}:{sides}-{size} for xs and {property}{sides}:{breakpoint}-{size}</code> for {{sm}}, {{md}}, {{lg}}, {{xl}}, and {{xxl}}.",
			"Where <i>property</i> is one of:",
			new ul({
				item: ["margin", "padding"],
			}),
			"Where <i>sides</i> is one of:",
			new ul({
				item: [
					"<code>top</code> - for set <code>margin-top</code> or <code>padding-top</code>",
					"<code>bottom</code> - for set <code>margin-bottom</code> or <code>padding-bottom</code>",
					"<code>start</code> - for set <code>margin-left</code> or <code>padding-left</code> in LTR, <code>margin-right</code> or <code>padding-right</code> in RTL,",
					"<code>end</code> - for set <code>margin-right</code> or <code>padding-right</code> in LTR, <code>margin-left</code> or <code>padding-left</code> in RTL,",
					"<code>x</code> - for set both <code>*-left</code> and <code>*-right</code>",
					"<code>y</code> - for set both <code>*-top</code> and <code>*-bottom</code>",
					"blank - for set <code>margin</code> and <code>padding</code> on all 4 sides of the element",
				],
			}),
			"Where <i>size</i> is one on:",
			new ul({
				item: [
					"<code>0</code> - for eliminate the <code>margin</code> or <code>padding</code> by setting it to <code>0</code>",
					"<code>1</code> - (by default) to set <code>margin</code> or <code>padding</code> to <code>$spacer * .25</code>",
					"<code>2</code> - (by default) to set <code>margin</code> or <code>padding</code> to <code>$spacer * .5</code>",
					"<code>3</code> - (by default) to set <code>margin</code> or <code>padding</code> to <code>$spacer</code>",
					"<code>4</code> - (by default) to set <code>margin</code> or <code>padding</code> to <code>$spacer * 1.5</code>",
					"<code>5</code> - (by default) to set <code>margin</code> or <code>padding</code> to <code>$spacer * 3</code>",
					"<code>auto</code> - to set <code>margin</code> to <code>auto</code>",
				],
			}),
		],
	},

	{
		title: "Horizontal centering",
		msg: "Additionally, Bootstrap also includes an {{marginX:auto}} property for horizontally centering fixed-width block level content—that is, content that has {{display:block}} and a {{width}} set—by setting the horizontal margins to {{auto}}.",
		viewclass: "cl-highlight-div",
		import: ["tag"],
		code: () => {
			return new tag({
				tag: "div",
				width: "12rem",
				marginX: "auto", //marker
				elem: `Centered element`,
			});
		},
	},

	{
		title: "Negative margin",
		msg: [
			"In CSS, {{margin}} properties can utilize negative values ({{padding}} cannot). These negative margins are <b>disabled by default</b>, but can be enabled in Sass by setting {{$enable-negative-margins: true}}.",
			"The syntax is nearly the same as the default, positive margin utilities, but with the addition of {{n}} before the requested size. Here’s an example margin value that’s the opposite of {{marginTop:1}}:",
		],

		viewclass: "cl-highlight-col-div",
		container: sample.stackcontainer,
		import: ["tag"],
		code: () => {
			return [null, 1, "n1"].map((i) => {
				return new tag({
					tag: "div",
					marginTop: i, //marker
					elem: `Example element`,
				});
			});
		},
	},

	{
		title: "Gap",
		msg: "When using {{display:grid}}, you can make use of {{gap}} property on the parent grid container. This can save on having to add margin utilities to individual grid items (children of a {{display:grid}} container). Gap utilities are responsive by default, and are generated via Bootstrap utilities API, based on the {{$spacers}} Sass map.",
		viewclass: "cl-highlight-grid-div",
		import: ["tag"],
		code: () => {
			return new tag({
				tag: "div",
				display: "grid",
				gap: 3, //marker
				elem: [
					new tag({ tag: "div", elem: "Grid item 1" }),
					new tag({ tag: "div", elem: "Grid item 2" }),
					new tag({ tag: "div", elem: "Grid item 3" }),
				],
			});
		},
	},
];
