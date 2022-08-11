"use strict";
import $ from "../component.js";

export default [
	{
		title: "Position",
		msg: "Use these shorthand utilities for quickly configuring the position of an element.",
		anchor: false,
	},

	{
		title: "Position values",
		msg: [
			"Quick {{position}} property are available, though they are not responsive.",
			new $.ul({
				item: ["static", "relative", "absolute", "fixed", "sticky"].map((i) => {
					return `<code>${i}</code>`;
				}),
			}),
		],
		anchor: true,
	},

	{
		title: "Arrange elements",
		msg: [
			"Arrange elements easily with the edge positioning utilities. The format is <code>{property}-{position}</code>.",
			"Where <i>property</i> is one of:",
			new $.ul({
				item: [
					"<code>top</code> - for the vertical <code>top</code> position",
					"<code>start</code> - for the vertical <code>left</code> position (in LTR)",
					"<code>bottom</code> - for the vertical <code>bottom</code> position",
					"<code>end</code> - for the vertical <code>right</code> position (in LTR)",
				],
			}),
			"Where <i>position</i> is one of:",
			new $.ul({
				item: [
					"<code>0</code> - for <code>0</code> edge position",
					"<code>50</code> - for <code>50%</code> edge position",
					"<code>100</code> - for <code>100%</code> edge position",
				],
			}),
		],
		anchor: true,
	},

	{
		viewclass: "cl-highlight-position",
		code: () => {
			return new $.tag({
				tag: "div",
				position: "relative",
				elem: [
					{ tag: "div", position: "absolute", top: 0, start: 0 },
					{ tag: "div", position: "absolute", top: 0, end: 0 },
					{ tag: "div", position: "absolute", top: 50, start: 50 },
					{ tag: "div", position: "absolute", bottom: 50, end: 50 },
					{ tag: "div", position: "absolute", bottom: 0, start: 0 },
					{ tag: "div", position: "absolute", bottom: 0, end: 0 },
				].map((i) => {
					return new $.tag(i);
				}),
			});
		},
	},

	{
		title: "Center elements",
		msg: [
			"In addition, you can also center the elements with the transform utility class {{.translate-middle}}.",
			"This class applies the transformations {{translateX(-50%)}} and {{translateY(-50%)}} to the element which, in combination with the edge positioning utilities, allows you to absolute center an element.",
		],
		viewclass: "cl-highlight-position",
		code: () => {
			return new $.tag({
				tag: "div",
				position: "relative",
				elem: [
					{ tag: "div", position: "absolute", top: 0, start: 0, tmiddle: true },
					{ tag: "div", position: "absolute", top: 0, start: 50, tmiddle: true },
					{ tag: "div", position: "absolute", top: 0, start: 100, tmiddle: true },
					{ tag: "div", position: "absolute", top: 50, start: 0, tmiddle: true },
					{ tag: "div", position: "absolute", top: 50, start: 50, tmiddle: true },
					{ tag: "div", position: "absolute", top: 50, start: 100, tmiddle: true },
					{ tag: "div", position: "absolute", top: 100, start: 0, tmiddle: true },
					{ tag: "div", position: "absolute", top: 100, start: 50, tmiddle: true },
					{ tag: "div", position: "absolute", top: 100, start: 100, tmiddle: true },
				].map((i) => {
					return new $.tag(i);
				}),
			});
		},
	},

	{
		msg: [
			"By adding {{.translate-middle-x}} or {{.translate-middle-y}} classes, elements can be positioned only in horizontal or vertical direction.",
		],
		viewclass: "cl-highlight-position",
		code: () => {
			return new $.tag({
				tag: "div",
				position: "relative",
				elem: [
					{ tag: "div", position: "absolute", top: 0, start: 0 },
					{ tag: "div", position: "absolute", top: 0, start: 50, tmiddle: "x" },
					{ tag: "div", position: "absolute", top: 0, end: 0 },
					{ tag: "div", position: "absolute", top: 50, start: 0, tmiddle: "y" },
					{ tag: "div", position: "absolute", top: 50, start: 50, tmiddle: true },
					{ tag: "div", position: "absolute", top: 50, end: 0, tmiddle: "y" },
					{ tag: "div", position: "absolute", bottom: 0, start: 0 },
					{ tag: "div", position: "absolute", bottom: 0, start: 50, tmiddle: "x" },
					{ tag: "div", position: "absolute", bottom: 0, end: 0 },
				].map((i) => {
					return new $.tag(i);
				}),
			});
		},
	},

	{
		title: "Examples",
		msg: "Here are some real life examples of these classes:",
		container: (elem) => {
			return new $.div({ display: "flex", justifycontent: "around", elem: elem });
		},
		code: () => {
			return [
				new $.tag({
					tag: "button",
					position: "relative",
					class: "btn btn-primary",
					elem: [
						"Mail",
						new $.tag({
							tag: "span",
							position: "absolute",
							top: 0,
							start: 100,
							tmiddle: true,
							class: "badge",
							rounded: "pill",
							color: "secondary",
							elem: ["+99", new $.tag({ tag: "span", class: "visually-hidden", elem: "unread message" })],
						}),
					],
				}),

				new $.tag({
					tag: "button",
					position: "relative",
					class: "btn btn-dark",
					elem: [
						"Marker",
						new $.tag({
							tag: "svg",
							attr: {
								height: "1em",
								width: "1em",
								viewBox: "0 0 16 16",
								fill: "#212529",
								xmlns: "http://www.w3.org/2000/svg",
							},
							position: "absolute",
							top: 100,
							start: 50,
							tmiddle: true,
							class: "bi bi-caret-down-fill",
							margintop: 1,
							elem: new $.tag({
								tag: "path",
								attr: {
									d: "M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z",
								},
							}),
						}),
					],
				}),

				new $.tag({
					tag: "button",
					position: "relative",
					class: "btn btn-primary",
					elem: [
						"Alerts",
						new $.tag({
							tag: "span",
							position: "absolute",
							top: 0,
							start: 100,
							tmiddle: true,
							class: "badge",
							rounded: "circle",
							bordercolor: "light",
							color: "danger",
							padding: 2,
							elem: new $.tag({ tag: "span", class: "visually-hidden", elem: "unread message" }),
						}),
					],
				}),
			];
		},
	},

	{
		msg: "You can use these classes with existing components to create new $.ones. Remember that you can extend its functionality by adding entries to the $position-values variable.",
		code: () => {
			return new $.div({
				position: "relative",
				margin: 4,
				elem: [
					new $.progress.container({
						height: 1,
						elem: new $.progress.bar({
							value: 50,
						}),
					}),

					new $.button({
						position: "absolute",
						top: 0,
						start: 0,
						tmiddle: true,
						color: "primary",
						rounded: "pill",
						weight: "sm",
						style: { width: "2rem", height: "2rem" },
						label: "1",
					}),
					new $.button({
						position: "absolute",
						top: 0,
						start: 50,
						tmiddle: true,
						color: "primary",
						rounded: "pill",
						weight: "sm",
						style: { width: "2rem", height: "2rem" },
						label: "2",
					}),
					new $.button({
						position: "absolute",
						top: 0,
						start: 100,
						tmiddle: true,
						color: "secondary",
						rounded: "pill",
						weight: "sm",
						style: { width: "2rem", height: "2rem" },
						label: "3",
					}),
				],
			});
		},
	},
];
