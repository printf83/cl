"use strict";
import sample from "./sample.js";
import * as core from "../base/core.js";
import button from "../base/button.js";
import * as card from "../base/card.js";
import div from "../base/div.js";
import input from "../base/input.js";
import toast from "../base/toast.js";
import span from "../base/span.js";

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
		import: ["button", "card", "sample"],
		code: () => {
			return new div({
				container: true,
				elem: new div({
					row: true,
					justifycontent: "center",
					elem: [
						new div({
							col: 4,
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
							col: 4,
							attr: {
								//mark as hidden object for screen reader
								"aria-hidden": "true",
							},
							//marker
							elem: new card.container({
								elem: [
									new card.img({
										placement: "top",
										src: "...",
										alt: "...",
										placeholder: true,
										height: "130px",
									}),
									new card.body({
										elem: [
											new card.title({
												placeholder: "glow",
												elem: new span({ placeholder: true, col: 6 }),
											}),
											new card.text({
												placeholder: "glow",
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
			"Create placeholders with the .placeholder class and a grid column class (e.g., .col-6) to set the width. They can replace the text inside an element or be added as a modifier class to an existing component.",
			"We apply additional styling to .btns via ::before to ensure the height is respected. You may extend this pattern for other situations as needed, or add a &nbsp; within the element to reflect the height when actual text is rendered in its place.",
		],
	},
];
