"use strict";
import sample from "./sample.js";
import tag from "../base/tag.js";
import ul from "../base/ul.js";

export default [
	{
		title: "Flex",
		msg: "Quickly manage the layout, alignment, and sizing of grid columns, navigation, components, and more with a full suite of responsive flexbox utilities. For more complex implementations, custom CSS may be necessary.",
		anchor: false,
	},

	{
		title: "Enable flex behaviors",
		msg: [
			"Apply {{display}} utilities to create a flexbox container and transform <b>direct children elements</b> into flex items. Flex containers and items are able to be modified further with additional flex properties.",
		],
		container: sample.vstackcontainer,
		import: ["tag"],
		code: () => {
			return new tag({
				tag: "div",
				class: "cl-highlight-padding",
				elem: "I'm a flexbox container!",

				//marker
				display: "flex",
			});
		},
	},

	{
		container: sample.vstackcontainer,
		import: ["tag"],
		code: () => {
			return new tag({
				tag: "div",
				class: "cl-highlight-padding",
				elem: "I'm a inline flexbox container!",

				//marker
				display: "inline-flex",
			});
		},
	},

	{
		msg: [
			"Responsive variations also exist for {{display:flex}} and {{display:inline-flex}}.",
			new ul({
				item: ["", "sm-", "md-", "lg-", "xl-", "xxl-"]
					.map((i) => {
						return ["flex", "inline-flex"].map((j) => {
							return `<code>${i}${j}</code>`;
						});
					})
					.flat(),
			}),
		],
	},

	{
		title: "Row direction",
		msg: [
			"Set the direction of flex items in a flex container with direction utilities. In most cases you can omit the horizontal class here as the browser default is row. However, you may encounter situations where you needed to explicitly set this value (like responsive layouts).",
			"Use {{flex:row}} to set a horizontal direction (the browser default), or {{flex:row-reverse}} to start the horizontal direction from the opposite side.",
		],
		container: sample.vstackcontainer,
		viewclass: "cl-highlight-flex",
		import: ["tag"],
		code: () => {
			return ["row", "row-reverse"].map((i) => {
				return new tag({
					tag: "div",
					elem: [
						new tag({ tag: "div", elem: "Flex item 1" }),
						new tag({ tag: "div", elem: "Flex item 2" }),
						new tag({ tag: "div", elem: "Flex item 3" }),
					],

					//marker
					display: "flex",
					flex: i,
					//-
				});
			});
		},
	},

	{
		title: "Column direction",
		msg: "Use {{flex:column}} to set a vertical direction, or {{flex:column-reverse}} to start the vertical direction from the opposite side.",
		container: sample.vstackcontainer,
		viewclass: "cl-highlight-flex",
		import: ["tag"],
		code: () => {
			return ["column", "column-reverse"].map((i) => {
				return new tag({
					tag: "div",
					elem: [
						new tag({ tag: "div", elem: "Flex item 1" }),
						new tag({ tag: "div", elem: "Flex item 2" }),
						new tag({ tag: "div", elem: "Flex item 3" }),
					],

					//marker
					display: "flex",
					flex: i,
					//-
				});
			});
		},
	},

	{
		msg: [
			"Responsive variations also exist for {{flex}} property.",
			new ul({
				item: ["", "sm-", "md-", "lg-", "xl-", "xxl-"]
					.map((i) => {
						return ["row", "row-reverse", "column", "column-reverse"].map((j) => {
							return `<code>${i}${j}</code>`;
						});
					})
					.flat(),
			}),
		],
	},

	{
		title: "Justify content",
		msg: "Use {{justifycontent}} property on {{display:flex|flex-inline}} containers to change the alignment of flex items on the main axis (the x-axis to start, y-axis if {{flex:column}}). Choose from {{start}} (browser default), {{end}}, {{center}}, {{between}}, {{around}}, or {{evenly}}.",
		container: sample.vstackcontainer,
		viewclass: "cl-highlight-flex",
		import: ["tag"],
		code: () => {
			return ["start", "end", "center", "between", "around", "evenly"].map((i) => {
				return new tag({
					tag: "div",
					elem: Array(3).fill(new tag({ tag: "div", elem: "Flex item" })),

					//marker
					display: "flex",
					justifycontent: i,
					//-
				});
			});
		},
	},

	{
		msg: [
			"Responsive variations also exist for {{justifycontent}} property.",
			new ul({
				item: ["", "sm-", "md-", "lg-", "xl-", "xxl-"]
					.map((i) => {
						return ["start", "end", "center", "between", "around", "evenly"].map((j) => {
							return `<code>${i}${j}</code>`;
						});
					})
					.flat(),
			}),
		],
	},

	{
		title: "Align items",
		msg: "Use {{alignitem}} property on {{display:flex|flex-inline}} containers to change the alignment of flex items on the cross axis (the y-axis to start, x-axis if {{flex:column}}). Choose from {{start}}, {{end}}, {{center}}, {{baseline}}, or {{stretch}} (browser default).",
		container: sample.vstackcontainer,
		viewclass: "cl-highlight-flex",
		import: ["tag"],
		code: () => {
			return ["start", "end", "center", "baseline", "stretch"].map((i) => {
				return new tag({
					tag: "div",
					style: { height: "6rem" },
					elem: Array(3).fill(new tag({ tag: "div", elem: "Flex item" })),

					//marker
					display: "flex",
					alignitem: i,
					//-
				});
			});
		},
	},

	{
		msg: [
			"Responsive variations also exist for {{alignitem}} property.",
			new ul({
				item: ["", "sm-", "md-", "lg-", "xl-", "xxl-"]
					.map((i) => {
						return ["start", "end", "center", "baseline", "stretch"].map((j) => {
							return `<code>${i}${j}</code>`;
						});
					})
					.flat(),
			}),
		],
	},

	{
		title: "Align self",
		msg: "Use {{alignself}} property on {{display:flex|flex-inline}} containers to change the alignment of flex items on the cross axis (the y-axis to start, x-axis if {{flex:column}}). Choose from {{start}}, {{end}}, {{center}}, {{baseline}}, or {{stretch}} (browser default).",
		container: sample.vstackcontainer,
		viewclass: "cl-highlight-flex",
		import: ["tag"],
		code: () => {
			return ["start", "end", "center", "baseline", "stretch"].map((i) => {
				return new tag({
					tag: "div",
					style: { height: "6rem" },
					elem: [
						new tag({ tag: "div", elem: "Flex item" }),
						new tag({ tag: "div", /*marker*/ alignself: i, elem: "Flex item" }),
						new tag({ tag: "div", elem: "Flex item" }),
					],

					//marker
					display: "flex",
				});
			});
		},
	},

	{
		msg: [
			"Responsive variations also exist for {{alignself}} property.",
			new ul({
				item: ["", "sm-", "md-", "lg-", "xl-", "xxl-"]
					.map((i) => {
						return ["start", "end", "center", "baseline", "stretch"].map((j) => {
							return `<code>${i}${j}</code>`;
						});
					})
					.flat(),
			}),
		],
	},

	{
		title: "Fill",
		msg: "Use the {{flex:fill}} property on a series of sibling elements to force them into widths equal to their content (or equal widths if their content does not surpass their border-boxes) while taking up all available horizontal space.",
		container: sample.vstackcontainer,
		viewclass: "cl-highlight-flex",
		import: ["tag"],
		code: () => {
			return new tag({
				tag: "div",
				elem: [
					new tag({ tag: "div", /*marker*/ flex: "fill", elem: "Flex item with a lot of content" }),
					new tag({ tag: "div", /*marker*/ flex: "fill", elem: "Flex item" }),
					new tag({ tag: "div", /*marker*/ flex: "fill", elem: "Flex item" }),
				],

				//marker
				display: "flex",
			});
		},
	},

	{
		msg: [
			"Responsive variations also exist for {{flex:fill}} property.",
			new ul({
				item: ["", "sm-", "md-", "lg-", "xl-", "xxl-"]
					.map((i) => {
						return `<code>${i}fill</code>`;
					})
					.flat(),
			}),
		],
	},

	{
		title: "Grow and shrink",
		msg: "Use {{flex:grow-*}} property to toggle a flex item’s ability to grow to fill available space. In the example below, the {{flex:grow-1}} elements uses all available space it can, while allowing the remaining two flex items their necessary space.",
		container: sample.vstackcontainer,
		viewclass: "cl-highlight-flex",
		import: ["tag"],
		code: () => {
			return new tag({
				tag: "div",
				elem: [
					new tag({ tag: "div", /*marker*/ flex: "glow-1", elem: "Flex item" }),
					new tag({ tag: "div", elem: "Flex item" }),
					new tag({ tag: "div", elem: "Third flex item" }),
				],

				//marker
				display: "flex",
			});
		},
	},

	{
		msg: "Use {{flex:shrink-*}} property to toggle a flex item’s ability to shrink to fill available space. In the example below, the second flex item with {{flex:shrink-1}} is forced to wrap its contents to a new line, “shrinking” to allow more space for the previous flex item with {{.w-100}}",
		container: sample.vstackcontainer,
		viewclass: "cl-highlight-flex",
		import: ["tag"],
		code: () => {
			return new tag({
				tag: "div",
				elem: [
					new tag({ tag: "div", class: "w-100", elem: "Flex item" }),
					new tag({ tag: "div", /*marker*/ flex: "shrink-1", elem: "Flex item" }),
				],

				//marker
				display: "flex",
			});
		},
	},

	{
		msg: [
			"Responsive variations also exist for {{flex:grow}} and {{flex:shrink}} property.",
			new ul({
				item: ["", "sm-", "md-", "lg-", "xl-", "xxl-"]
					.map((i) => {
						return ["grow-0", "grow-1", "shrink-0", "shrink-1"].map((j) => {
							return `<code>${i}${j}</code>`;
						});
					})
					.flat(),
			}),
		],
	},

	{
		title: "Auto margins",
		msg: "Flexbox can do some pretty awesome things when you mix flex alignments with auto margins. Shown below are three examples of controlling flex items via auto margins: default (no auto margin), pushing two items to the right ({{marginend:auto}}), and pushing two items to the left ({{marginstart:auto}}).",
		container: sample.vstackcontainer,
		viewclass: "cl-highlight-flex",
		import: ["tag"],
		code: () => {
			return [
				new tag({
					tag: "div",
					elem: Array(3).fill(new tag({ tag: "div", elem: "Flex item" })),

					//marker
					display: "flex",
				}),
				new tag({
					tag: "div",
					elem: [
						new tag({ tag: "div", /*marker*/ marginend: "auto", elem: "Flex item" }),
						new tag({ tag: "div", elem: "Flex item" }),
						new tag({ tag: "div", elem: "Flex item" }),
					],

					//marker
					display: "flex",
				}),
				new tag({
					tag: "div",
					elem: [
						new tag({ tag: "div", elem: "Flex item" }),
						new tag({ tag: "div", elem: "Flex item" }),
						new tag({ tag: "div", /*marker*/ marginstart: "auto", elem: "Flex item" }),
					],

					//marker
					display: "flex",
				}),
			];
		},
	},

	{
		title: "With alignitem property",
		msg: "Vertically move one flex item to the top or bottom of a container by mixing {{alignitem}}, {{flex:column}}, and {{margintop:auto}} or {{marginbottom:auto}}.",
		container: sample.vstackcontainer,
		viewclass: "cl-highlight-flex",
		import: ["tag"],
		code: () => {
			return [
				new tag({
					tag: "div",
					style: { height: "12rem" },

					//marker
					display: "flex",
					alignitem: "start",
					flex: "column",
					//-

					elem: [
						new tag({ tag: "div", /*marker*/ marginbottom: "auto", elem: "Flex item" }),
						new tag({ tag: "div", elem: "Flex item" }),
						new tag({ tag: "div", elem: "Flex item" }),
					],
				}),
				new tag({
					tag: "div",
					style: { height: "12rem" },

					//marker
					display: "flex",
					alignitem: "end",
					flex: "column",
					//-

					elem: [
						new tag({ tag: "div", elem: "Flex item" }),
						new tag({ tag: "div", elem: "Flex item" }),
						new tag({ tag: "div", /*marker*/ margintop: "auto", elem: "Flex item" }),
					],
				}),
			];
		},
	},

	{
		title: "Warp",
		msg: "Change how flex items wrap in a {{display:flex}} container. Choose from no wrapping at all (the browser default) with {{flex:nowrap}}, wrapping with {{flex:wrap}}, or reverse wrapping with {{flex:wrap-reverse}}",
		container: sample.vstackcontainer,
		viewclass: "cl-highlight-flex",
		import: ["tag"],
		code: () => {
			return new tag({
				tag: "div",
				display: "flex",
				elem: Array(6).fill(new tag({ tag: "div", elem: "Flex item" })),

				//marker
				flex: "nowrap",
			});
		},
	},

	{
		container: sample.vstackcontainer,
		viewclass: "cl-highlight-flex",
		import: ["tag"],
		code: () => {
			return new tag({
				tag: "div",
				elem: Array(15).fill(new tag({ tag: "div", elem: "Flex item" })),

				//marker
				flex: "wrap",
				flex: "wrap-reverse",
				//-
			});
		},
	},

	{
		container: sample.vstackcontainer,
		viewclass: "cl-highlight-flex",
		import: ["tag"],
		code: () => {
			return new tag({
				tag: "div",
				elem: Array(15).fill(new tag({ tag: "div", elem: "Flex item" })),

				//marker
				display: "flex",
				flex: "wrap-reverse",
				//-
			});
		},
	},

	{
		msg: [
			"Responsive variations also exist for {{flex:wrap}} property.",
			new ul({
				item: ["", "sm-", "md-", "lg-", "xl-", "xxl-"]
					.map((i) => {
						return ["nowrap", "wrap", "wrap-reverse"].map((j) => {
							return `<code>${i}${j}</code>`;
						});
					})
					.flat(),
			}),
		],
	},

	{
		title: "Order",
		msg: "Change the <i>visual</i> order of specific flex items with a handful of {{order}} property. We only provide options for making an item first or last, as well as a reset to use the DOM order. As {{order}} takes any integer value from 0 to 5, add custom CSS for any additional values needed.",
		container: sample.vstackcontainer,
		viewclass: "cl-highlight-flex",
		import: ["tag"],
		code: () => {
			return new tag({
				tag: "div",
				elem: [
					new tag({ tag: "div", /*marker*/ order: 3, elem: "First flex item" }),
					new tag({ tag: "div", /*marker*/ order: 2, elem: "Second flex item" }),
					new tag({ tag: "div", /*marker*/ order: 1, elem: "Third flex item" }),
				],

				//marker
				display: "flex",
				flex: "nowrap",
				//-
			});
		},
	},

	{
		msg: [
			"Responsive variations also exist for {{order}} property.",
			new ul({
				item: ["", "sm-", "md-", "lg-", "xl-", "xxl-"]
					.map((i) => {
						return [0, 1, 2, 3, 4, 5].map((j) => {
							return `<code>${i}${j}</code>`;
						});
					})
					.flat(),
			}),
		],
	},

	{
		msg: [
			"Additionally there are also responsive {{order:first}} and {{order:last}} property that change the order of an element by applying order: -1 and order: 6, respectively.",
			new ul({
				item: ["", "sm-", "md-", "lg-", "xl-", "xxl-"]
					.map((i) => {
						return ["first", "last"].map((j) => {
							return `<code>${i}${j}</code>`;
						});
					})
					.flat(),
			}),
		],
	},

	{
		title: "Align content",
		msg: [
			"Use {{aligncontent}} property on {{display:flex}} containers to align flex items together on the cross axis. Choose from {{start}} (browser default), {{end}}, {{center}}, {{between}}, {{around}}, or {{stretch}}. To demonstrate these utilities, we’ve enforced {{flex:wrap}} and increased the number of flex items.",
			"<b>Heads up!</b> This property has no effect on single rows of flex items.",
		],
		container: sample.vstackcontainer,
		viewclass: "cl-highlight-flex",
		import: ["tag"],
		code: () => {
			return ["start", "end", "center", "between", "around", "stretch"].map((i) => {
				return new tag({
					tag: "div",
					style: { height: "12rem" },
					elem: Array(15).fill(new tag({ tag: "div", elem: "Flex item" })),

					//marker
					display: "flex",
					flex: "wrap",
					aligncontent: i,
					//-
				});
			});
		},
	},

	{
		msg: [
			"Additionally there are also responsive {{aligncontent}} property.",
			new ul({
				item: ["", "sm-", "md-", "lg-", "xl-", "xxl-"]
					.map((i) => {
						return ["start", "end", "center", "between", "around", "stretch"].map((j) => {
							return `<code>${i}${j}</code>`;
						});
					})
					.flat(),
			}),
		],
	},

	{
		title: "Media object",
		msg: "Looking to replicate the media object component from Bootstrap 4? Recreate it in no time with a few flex utilities that allow even more flexibility and customization than before.",
		import: ["tag", "sample"],
		code: () => {
			return new tag({
				tag: "div",
				elem: [
					new tag({
						tag: "div",
						elem: new tag({
							tag: "img",
							attr: { alt: "Image", src: sample.img(84, 80) },
							style: { height: "5rem" },
						}),

						//marker
						flex: "shrink-0",
					}),
					new tag({
						tag: "div",
						marginstart: 3,
						elem: "This is some content from a media component. You can replace this with any content and adjust it as needed.",

						//marker
						flex: "grow-1",
					}),
				],

				//marker
				display: "flex",
			});
		},
	},

	{
		msg: "And say you want to vertically center the content next to the image:",
		import: ["tag", "sample"],
		code: () => {
			return new tag({
				tag: "div",
				elem: [
					new tag({
						tag: "div",
						elem: new tag({
							tag: "img",
							attr: { alt: "Image", src: sample.img(84, 80) },
							style: { height: "5rem" },
						}),

						//marker
						flex: "shrink-0",
					}),
					new tag({
						tag: "div",
						marginstart: 3,
						elem: "This is some content from a media component. You can replace this with any content and adjust it as needed.",

						//marker
						flex: "grow-1",
					}),
				],

				//marker
				display: "flex",
				alignitem: "center",
				//-
			});
		},
	},
];
