"use strict";
import sample from "./sample.js";
import button from "../base/button.js";
import * as card from "../base/card.js";
import div from "../base/div.js";
import span from "../base/span.js";
import p from "../base/p.js";
import * as alert from "../base/alert.js";

export default [
	{
		anchor: false,
		title: "Placeholders",
		msg: "Use loading placeholders for your components or pages to indicate something may still be loading.",
	},

	{
		title: "About",
		msg: "Placeholders can be used to enhance the experience of your application. They’re built only with HTML and CSS, meaning you don’t need any JavaScript to create them. You will, however, need some custom JavaScript to toggle their visibility. Their appearance, color, and sizing can be easily customized with our utility classes.",
	},

	{
		title: "Examples",
		import: ["button", "card", "sample", "span"],
		code: () => {
			return new div({
				container: true,
				padding: 0,
				elem: new div({
					row: true,
					gap: 3,
					justifycontent: "center",
					elem: [
						new div({
							col: [12, "md-6", "lg-4"],
							elem: new card.container({
								elem: [
									new card.img({
										placement: "top",
										src: sample.img(286, 143),
									}),
									new card.body({
										elem: [
											new card.title("Card Title"),
											new card.text(
												"Some quick example text to build on the card title and make up the bulk of the card's content."
											),
											new button({
												label: "Go somewhere",
												color: "primary",
											}),
										],
									}),
								],
							}),
						}),

						new div({
							col: [12, "md-6", "lg-4"],
							ariahidden: true,
							//marker
							elem: new card.container({
								elem: [
									new card.img({
										placement: "top",
										src: "...",
										alt: "...",
										placeholder: true,
										height: "143px",
									}),
									new card.body({
										elem: [
											new card.title({
												placeholderanimation: "glow",
												elem: new span({ placeholder: true, col: 6 }),
											}),
											new card.text({
												placeholderanimation: "glow",
												elem: [
													new span({ placeholder: true, col: 7, marginend: 1 }),
													new span({ placeholder: true, col: 4, marginend: 1 }),
													new span({ placeholder: true, col: 4, marginend: 1 }),
													new span({ placeholder: true, col: 6, marginend: 1 }),
													new span({ placeholder: true, col: 8, marginend: 1 }),
													new span({ placeholder: true, col: 7, marginend: 1 }),
												],
											}),
											new button({
												label: "&nbsp;",
												col: 8,
												color: "primary",
												placeholder: true,
											}),
										],
									}),
								],
							}),
							//-
						}),
					],
				}),
			});
		},
	},

	{
		title: "How it works ",
		msg: [
			"Create placeholders with the {{.placeholder}} class and a grid column class (e.g., {{.col-6}}) to set the {{width}}. They can replace the text inside an element or be added as a modifier class to an existing component.",
			"We apply additional styling to {{.btns}} via {{::before}} to ensure the {{height}} is respected. You may extend this pattern for other situations as needed, or add a {{&amp;nbsp&#59;}} within the element to reflect the height when actual text is rendered in its place.",
		],
		import: ["button", "span", "p"],
		code: () => {
			return [
				new p({
					//marker
					ariahidden: true,
					elem: new span({
						placeholder: true,
						col: 6,
					}),
					//-
				}),
				new button({
					//marker
					ariahidden: true,
					color: "primary",
					href: "#",
					col: 4,
					label: "&nbsp;",
					//-
				}),
			];
		},
	},

	{
		msg: [
			new alert.container({
				color: "primary",
				elem: `The use of <code>aria-hidden="true"</code> only indicates that the element should be hidden to screen readers. The loading behavior of the placeholder depends on how authors will actually use the placeholder styles, how they plan to update things, etc. Some JavaScript code may be needed to swap the state of the placeholder and inform AT users of the update. `,
			}),
		],
	},

	{
		title: "Width",
		msg: "You can change the {{width}} through grid column classes, width utilities, or inline styles.",
		import: ["span"],
		code: () => {
			return [
				new div({
					placeholder: true,
					col: 6, //marker
				}),
				new div({
					placeholder: true,
					width: 75, //marker
				}),
				new div({
					placeholder: true,
					width: 27, //marker
				}),
			];
		},
	},

	{
		title: "Color",
		msg: "You can change the {{width}} through grid column classes, width utilities, or inline styles.",
		import: ["span"],
		code: () => {
			return [null, "primary", "secondary", "success", "danger", "warning", "info", "light", "dark", "link"].map(
				(i) => {
					return new span({
						placeholder: true,
						col: 12,
						color: i, //marker
					});
				}
			);
		},
	},

	{
		title: "Sizing",
		msg: "The size of {{.placeholder}} are based on the typographic style of the parent element. Customize them with sizing modifiers: {{.placeholder-lg}}, {{.placeholder-sm}}, or {{.placeholder-xs}}.",
		import: ["span"],
		code: () => {
			return ["lg", "sm", "xs"].map((i) => {
				return new span({
					placeholderweight: i, //marker
					col: 12,
				});
			});
		},
	},

	{
		title: "Animation",
		msg: "Animate placeholders with {{.placeholder-glow}} or {{.placeholder-wave}} to better convey the perception of something being actively loaded.",
		import: ["span", "p"],
		code: () => {
			return ["wave", "glow"].map((i) => {
				return new p({
					placeholderanimation: i, //marker
					elem: new span({
						placeholder: true,
						col: 12,
					}),
				});
			});
		},
	},
];
