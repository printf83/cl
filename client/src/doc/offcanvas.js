"use strict";
import sample from "./sample.js";
import offcanvas from "../cl/base/offcanvas.js";
import button from "../cl/base/button.js";
import div from "../cl/base/div.js";
import dropdown from "../cl/base/dropdown.js";
import p from "../cl/base/p.js";
import * as core from "../cl/base/core.js";
import toast from "../cl/base/toast.js";
import * as table from "../cl/base/table.js";
import pill from "../cl/base/pill.js";
import small from "../cl/base/small.js";
import * as alert from "../cl/base/alert.js";
import tag from "../cl/base/tag.js";

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
				click: () => {
					new offcanvas({
						close: true,
						backdrop: true,
						color: "light",
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
		title: "Color",
		container: sample.stackcontainer,
		import: ["button", "offcanvas", "div", "p", "dropdown"],
		code: () => {
			return ["primary", "secondary", "success", "danger", "warning", "info", "light", "dark"].map((i) => {
				return new button({
					label: `Show ${i} offcanvas`,
					color: i,
					click: () => {
						new offcanvas({
							//marker
							color: i,

							close: true,
							backdrop: true,
							elem: new div({
								elem: [
									new p({
										elem: "Some text as placeholder. In real life you can have the elements you have chosen. Like, text, images, lists, etc.",
									}),
									new dropdown({
										label: "Drowdown button",
										dark: true,
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
			});
		},
	},

	{
		title: "Placement",
		container: sample.stackcontainer,
		import: ["button", "offcanvas", "div", "p", "dropdown"],
		code: () => {
			return ["start", "top", "end", "bottom"].map(
				(i) =>
					new button({
						label: `Show ${i} offcanvas`,
						color: "primary",
						click: () => {
							new offcanvas({
								//marker
								placement: i,

								bodyoverflow: i === "top" ? "visible" : null, //some tweak
								close: true,
								backdrop: true,
								color: "light",
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
					})
			);
		},
	},

	{
		title: "Auto close",
		msg: ["Offcanvas only hide when screen reach {{autohide}} setting view size"],
		container: sample.stackcontainer,
		import: ["button", "offcanvas", "div", "p", "dropdown"],
		code: () => {
			return [null, "xxl", "xl", "lg", "md", "sm"]
				.map(
					(i) =>
						new button({
							label: i ? `Offcanvas hide on ${i} screen` : "Normal offcanvas",
							display: i ? `${i}-none` : null, //marker
							color: "primary",
							click: () => {
								new offcanvas({
									//marker
									autoclose: i,

									close: true,
									elem: new div({
										elem: [
											new p({
												elem: [
													i
														? new p(
																new pill({
																	icon: "eye",
																	title: "Viewport",
																	color: "primary",
																	viewport: true,
																})
														  )
														: null,

													i
														? new p(
																`This offcanvas automaticly close when your screen reach <code>${i}</code> size.`
														  )
														: null,
													new p(
														"Some text as placeholder. In real life you can have the elements you have chosen. Like, text, images, lists, etc."
													),
												].filter(Boolean),
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
						})
				)
				.concat(
					new tag({
						col: 12,
						elem: new alert.container({
							icon: "i",
							marginBottom: 0,
							display: ["none", "xxl-block"],
							elem: "Resize your screen size to smaller size to view other offcanvas option.",
						}),
					})
				);
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
					click: () => {
						new offcanvas({
							//marker
							scroll: true,

							close: true,
							backdrop: false,
							color: "light",
							elem: fn,
						}).show();
					},
				}),

				new button({
					label: "Enable backdrop",
					color: "primary",
					click: () => {
						new offcanvas({
							//marker
							backdrop: true,

							close: true,
							scroll: false,
							color: "light",
							elem: fn,
						}).show();
					},
				}),

				new button({
					label: "Enable both scrolling & backdrop",
					color: "primary",
					click: () => {
						new offcanvas({
							//marker
							backdrop: true,
							scroll: true,
							//-

							close: true,
							color: "light",
							elem: fn,
						}).show();
					},
				}),
			];
		},
	},

	{
		title: "Event",
		msg: [
			new table.container({
				item: [
					["Option", "Description"],
					[
						"<code>onshow</code>",
						"This event fires immediately when the <code>show</code> instance method is called.",
					],
					[
						"<code>onshown</code>",
						"This event is fired when the offcanvas has been made visible to the user (will wait for CSS transitions to complete).",
					],
					[
						"<code>onhide</code>",
						"This event is fired immediately when the <code>hide</code> instance method has been called.",
					],
					[
						"<code>onhidden</code>",
						"This event is fired when the offcanvas has finished being hidden from the user (will wait for CSS transitions to complete).",
					],
				],
			}),
		],
		container: sample.stackcontainer,
		import: ["button", "offcanvas", "div", "p", "dropdown", "toast"],
		code: () => {
			let fn = (sender, event) => `Offcanvas <b>${core.elemInfo(sender)}</b> event <b>${event}</b> trigged`;

			return new button({
				label: "Show offcanvas",
				color: "primary",
				click: () => {
					new offcanvas({
						close: true,
						backdrop: true,
						color: "light",
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

						//marker
						onshow: (event) => {
							new toast("i", fn(event.currentTarget, "onshow")).show();
						},
						onshown: (event) => {
							new toast("/", fn(event.currentTarget, "onshown")).show();
						},
						onhide: (event) => {
							new toast("!", fn(event.currentTarget, "onhide")).show();
						},
						onhidden: (event) => {
							new toast("x", fn(event.currentTarget, "onhidden")).show();
						},
						//-
					}).show();
				},
			});
		},
	},
];