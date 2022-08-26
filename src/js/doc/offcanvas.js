"use strict";
import sample from "./sample.js";
import offcanvas from "../base/offcanvas.js";
import button from "../base/button.js";
import div from "../base/div.js";
import dropdown from "../base/dropdown.js";
import p from "../base/p.js";

export default [
	{
		title: "Offcanvas",
		msg: "Build hidden sidebars into your project for navigation, shopping carts, and more with a few classes and Bootstrap JavaScript plugin.",
		anchor: false,
	},

	{
		title: "Offcanvas",
		import: ["button", "offcanvas", "div", "p", "dropdown"],
		code: () => {
			return new button({
				label: "Show offcanvas",
				color: "primary",
				onclick: () => {
					new offcanvas({
						close: true,
						backdrop: true,
						color: "light",
						title: "Offcanvas",
						elem: new div({
							elem: [
								new p({
									elem: "Some text as placeholder. In real life you can have the elements you have chosen. Like, text, images, lists, etc.",
								}),
								new dropdown({
									label: "Drowdown button",
									color: "secondary",
									option: [
										{ href: "#", label: "Action" },
										{ href: "#", label: "Another action" },
										{ href: "#", label: "Something else here" },
										{ value: "-" },
										{ href: "#", label: "Separated link" },
									],
								}),
							],
						}),
					}).show();
				},
			});
		},
	},

	{
		title: "Placement",
	},

	{
		title: "Top",
		import: ["button", "offcanvas", "div", "p", "dropdown"],
		code: () => {
			return new button({
				label: "Show top offcanvas",
				color: "primary",
				onclick: () => {
					new offcanvas({
						close: true,
						backdrop: true,
						placement: "top",
						color: "light",
						title: "Top Offcanvas",
						elem: new div({
							elem: [
								new p({
									elem: "Some text as placeholder. In real life you can have the elements you have chosen. Like, text, images, lists, etc.",
								}),
								new dropdown({
									label: "Drowdown button",
									color: "secondary",
									option: [
										{ href: "#", label: "Action" },
										{ href: "#", label: "Another action" },
										{ href: "#", label: "Something else here" },
										{ value: "-" },
										{ href: "#", label: "Separated link" },
									],
								}),
							],
						}),
					}).show();
				},
			});
		},
	},

	{
		title: "Bottom",
		label: "Show bottom offcanvas",
		import: ["button", "offcanvas", "div", "p", "dropdown"],
		code: () => {
			return new button({
				label: "Show bottom offcanvas",
				color: "primary",
				onclick: () => {
					new offcanvas({
						close: true,
						backdrop: true,
						placement: "bottom",
						color: "light",
						title: "Bottom Offcanvas",
						elem: new div({
							elem: [
								new p({
									elem: "Some text as placeholder. In real life you can have the elements you have chosen. Like, text, images, lists, etc.",
								}),
								new dropdown({
									label: "Drowdown button",
									color: "secondary",
									option: [
										{ href: "#", label: "Action" },
										{ href: "#", label: "Another action" },
										{ href: "#", label: "Something else here" },
										{ value: "-" },
										{ href: "#", label: "Separated link" },
									],
								}),
							],
						}),
					}).show();
				},
			});
		},
	},

	{
		title: "End",
		label: "Show end offcanvas",
		import: ["button", "offcanvas", "div", "p", "dropdown"],
		code: () => {
			return new button({
				label: "Show end offcanvas",
				color: "primary",
				onclick: () => {
					new offcanvas({
						close: true,
						backdrop: true,
						placement: "end",
						color: "light",
						title: "End Offcanvas",
						elem: new div({
							elem: [
								new p({
									elem: "Some text as placeholder. In real life you can have the elements you have chosen. Like, text, images, lists, etc.",
								}),
								new dropdown({
									label: "Drowdown button",
									color: "secondary",
									option: [
										{ href: "#", label: "Action" },
										{ href: "#", label: "Another action" },
										{ href: "#", label: "Something else here" },
										{ value: "-" },
										{ href: "#", label: "Separated link" },
									],
								}),
							],
						}),
					}).show();
				},
			});
		},
	},

	{
		title: "Backdrop",
		container: sample.stackcontainer,
		import: ["button", "offcanvas", "div", "p", "dropdown"],
		code: () => {
			let fn = new div({
				elem: [
					new p({
						elem: "Some text as placeholder. In real life you can have the elements you have chosen. Like, text, images, lists, etc.",
					}),
					new dropdown({
						label: "Drowdown button",
						color: "secondary",
						option: [
							{ href: "#", label: "Action" },
							{ href: "#", label: "Another action" },
							{ href: "#", label: "Something else here" },
							{ value: "-" },
							{ href: "#", label: "Separated link" },
						],
					}),
				],
			});

			return [
				new button({
					label: "Enable body scrolling",
					color: "primary",
					onclick: () => {
						new offcanvas({
							close: true,
							scroll: true,
							backdrop: false,
							color: "light",
							title: "Offcanvas",
							elem: fn,
						}).show();
					},
				}),

				new button({
					label: "Enable backdrop",
					color: "primary",
					onclick: () => {
						new offcanvas({
							close: true,
							scroll: false,
							backdrop: true,
							color: "light",
							title: "Offcanvas",
							elem: fn,
						}).show();
					},
				}),

				new button({
					label: "Enable both scrolling & backdrop",
					color: "primary",
					onclick: () => {
						new offcanvas({
							close: true,
							backdrop: true,
							scroll: true,
							color: "light",
							title: "Offcanvas",
							elem: fn,
						}).show();
					},
				}),
			];
		},
	},
];
