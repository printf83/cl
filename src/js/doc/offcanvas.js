"use strict";
import sample from "./sample.js";
import offcanvas from "../base/offcanvas.js";
import button from "../base/button.js";
import div from "../base/div.js";
import dropdown from "../base/dropdown.js";
import p from "../base/p.js";
import * as core from "../base/core.js";
import toast from "../base/toast.js";
import * as table from "../base/table.js";
import pill from "../base/pill.js";
import small from "../base/small.js";
import * as alert from "../base/alert.js";
import tag from "../base/tag.js";

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
					onclick: () => {
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
						onclick: () => {
							new offcanvas({
								//marker
								placement: i,

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
		title: "Weight",
		msg: [
			"Warning! Offcanvas only hide when screen reach {{xxl}}, {{xl}}, {{lg}}, {{md}} or {{sm}} view size",
			new pill({ icon: "!!", marginbottom: 3, label: "Unsuspecting behavior" }),
		],
		container: sample.stackcontainer,
		import: ["button", "offcanvas", "div", "p", "dropdown"],
		code: () => {
			return [null, "xxl", "xl", "lg", "md", "sm"]
				.map(
					(i) =>
						new button({
							label: i ? `Offcanvas hide on ${i} screen` : "Normal offcanvas",
							display: i ? `${i}-none` : null, //marker
							color: i !== null ? "warning" : "primary",
							badge:
								i !== null
									? {
											border: "body",
											color: "danger",
											notification: true,
											asst: "Broken",
									  }
									: null,
							onclick: () => {
								new offcanvas({
									//marker
									weight: i,

									// close: false, //close not working
									// backdrop: false, //close not working

									color: "light",
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
																	elem: [
																		new small("d-inline d-sm-none", "XS"),
																		new small("d-none d-sm-inline d-md-none", "SM"),
																		new small("d-none d-md-inline d-lg-none", "MD"),
																		new small("d-none d-lg-inline d-xl-none", "LG"),
																		new small(
																			"d-none d-xl-inline d-xxl-none",
																			"XL"
																		),
																		new small("d-none d-xxl-inline", "XXL"),
																	],
																})
														  )
														: null,

													i
														? new p(
																`This offcanvas only hide when your screen reach <code>${i}</code> size. If you can't close this offcanvas, please resize or refresh your browser.`
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
							marginbottom: 0,
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
					onclick: () => {
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
					onclick: () => {
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
					onclick: () => {
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
				onclick: () => {
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
