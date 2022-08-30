"use strict";
import sample from "../doc/sample.js";

import a from "../base/a.js";
import accordion from "../base/accordion.js";
import * as alert from "../base/alert.js";
import b from "../base/b.js";
import badge from "../base/badge.js";
import blockquote from "../base/blockquote.js";
import breadcrumb from "../base/breadcrumb.js";
import btnclose from "../base/btnclose.js";
import btngroup from "../base/btngroup.js";
import btntoolbar from "../base/btntoolbar.js";
import button from "../base/button.js";
import * as card from "../base/card.js";
import carousel from "../base/carousel.js";
import cite from "../base/cite.js";
import code from "../base/code.js";
import codepreview from "../base/codepreview.js";
import * as collapse from "../base/collapse.js";
import * as container from "../base/container.js";
import * as core from "../base/core.js";
import * as db from "../base/api.js";
import div from "../base/div.js";
import * as dlg from "../base/dlg.js";
import dropdown from "../base/dropdown.js";
import example from "../base/example.js";
import file from "../base/file.js";
import form from "../base/form.js";
import footer from "../base/footer.js";
import h from "../base/h.js";
import hr from "../base/hr.js";
import icon from "../base/icon.js";
import img from "../base/img.js";
import input from "../base/input.js";
import * as inputgroup from "../base/inputgroup.js";
import label from "../base/label.js";
import * as layout from "../base/layout.js";
import li from "../base/li.js";
import listgroup from "../base/listgroup.js";
import * as list from "../base/list.js";
import menu from "../base/menu.js";
import modal from "../base/modal.js";
import msg from "../base/msg.js";
import nav from "../base/nav.js";
import * as navbar from "../base/navbar.js";
import offcanvas from "../base/offcanvas.js";
import ol from "../base/ol.js";
import * as option from "../base/option.js";
import p from "../base/p.js";
import paging from "../base/paging.js";
import pill from "../base/pill.js";
import pre from "../base/pre.js";
import * as progress from "../base/progress.js";
import * as query from "../base/query.js";
import small from "../base/small.js";
import span from "../base/span.js";
import strong from "../base/strong.js";
import tab from "../base/tab.js";
import * as table from "../base/table.js";
import tag from "../base/tag.js";
import toast from "../base/toast.js";
import toc from "../base/toc.js";
import tooltip from "../base/tooltip.js";
import ul from "../base/ul.js";
import * as user from "../base/user.js";

export default [
	{
		title: "Kitchen Sink",
		msg: "Themes from bootswatch",
		anchor: false,
	},

	{
		title: "Navbars",
		container: sample.formcontainer,
		import: ["input", "button", "navbar"],
		code: () => {
			let id1 = core.UUID();
			let id2 = core.UUID();
			let id3 = core.UUID();

			let fn = (id) => {
				return [
					new navbar.toggle({
						target: `#${id}`,
						toggle: "collapse",
					}),

					new navbar.brand({
						label: "Navbar",
					}),

					new navbar.collapsecontainer({
						id: id,
						elem: [
							new navbar.itemcontainer({
								parenttype: "collapse",
								elem: [
									new navbar.item({
										label: "Home",
										active: true,
									}),
									new navbar.item({
										label: "Features",
									}),
									new navbar.item({
										label: "Pricing",
									}),
									new navbar.item({
										label: "About",
									}),
									new navbar.item({
										label: "Dropdown",
										option: [
											{
												href: "#",
												label: "Action",
											},
											{
												href: "#",
												label: "Another action",
											},
											{
												href: "#",
												label: "Something else here",
											},
											{
												value: "-",
											},
											{
												href: "#",
												label: "Separated link",
											},
										],
									}),
								],
							}),
							new navbar.formcontainer([
								new input({
									type: "search",
									placeholder: "Search",
									hiddenlabel: "Search",
									class: "me-2",
								}),
								new button({
									label: "Search",
									color: "secondary",
								}),
							]),
						],
					}),
				];
			};

			return [
				new navbar.container({
					expand: "lg",
					dark: true,
					color: "primary",
					elem: fn(id1),
				}),
				new navbar.container({
					expand: "lg",
					dark: true,
					color: "dark",
					elem: fn(id2),
				}),
				new navbar.container({
					expand: "lg",
					color: "light",
					elem: fn(id3),
				}),
			];
		},
	},

	{
		title: "Buttons",
		container: sample.stackcontainer,
		import: ["button"],
		code: () => {
			return ["primary", "secondary", "success", "danger", "warning", "info", "light", "dark", "link"].map(
				(i) => {
					return new button({ label: core.capitalize(i), color: i });
				}
			);
		},
	},

	{
		container: sample.stackcontainer,
		import: ["button"],
		code: () => {
			return ["primary", "secondary", "success", "danger", "warning", "info", "light", "dark", "link"].map(
				(i) => {
					return new button({ label: core.capitalize(i), color: i, disabled: true });
				}
			);
		},
	},

	{
		container: sample.stackcontainer,
		import: ["button"],
		code: () => {
			return ["primary", "secondary", "success", "danger", "warning", "info", "light", "dark", "link"].map(
				(i) => {
					return new button({ label: core.capitalize(i), color: i, outline: true });
				}
			);
		},
	},

	{
		container: sample.stackcontainer,
		import: ["dropdown"],
		code: () => {
			let fn = (color) => {
				return new dropdown({
					label: core.capitalize(color),
					color: color,
					splittoggle: true,
					option: [
						{
							label: "Dropdown link",
						},
						{
							label: "Dropdown link",
						},
					],
				});
			};

			return ["primary", "success", "info", "danger"].map((i) => {
				return fn(i);
			});
		},
	},

	{
		container: sample.stackcontainer,
		import: ["button"],
		code: () => {
			return [
				new button({ label: "Large button", color: "primary", weight: "lg" }),
				new button({ label: "Default button", color: "primary" }),
				new button({ label: "Small button", color: "primary", weight: "sm" }),
			];
		},
	},

	{
		import: ["container", "button"],
		code: () => {
			return new container.grid([
				new button({ label: "Block button", color: "primary" }),
				new button({ label: "Block button", color: "primary" }),
			]);
		},
	},

	{
		import: ["button", "btngroup"],
		code: () => {
			return new btngroup({
				elem: [
					new button({
						type: "checkbox",
						checked: true,
						label: "Checkbox 1",
						color: "primary",
					}),
					new button({
						type: "checkbox",
						checked: true,
						label: "Checkbox 2",
						color: "primary",
					}),
					new button({
						type: "checkbox",
						checked: true,
						label: "Checkbox 3",
						color: "primary",
					}),
				],
			});
		},
	},

	{
		import: ["button", "btngroup"],
		code: () => {
			return new btngroup({
				elem: [
					new button({
						type: "radio",
						name: "g7",
						label: "Radio 1",

						color: "primary",
					}),
					new button({
						type: "radio",
						name: "g7",
						label: "Radio 2",
						color: "primary",
					}),
					new button({
						type: "radio",
						name: "g7",
						label: "Radio 3",
						checked: true,
						color: "primary",
					}),
				],
			});
		},
	},

	{
		import: ["button", "btngroup"],
		code: () => {
			return new btngroup({
				vertical: true,
				elem: [
					new button({
						label: "Button",
						color: "primary",
					}),
					new button({
						label: "Button",
						color: "primary",
					}),
					new button({
						label: "Button",
						color: "primary",
					}),
					new button({
						label: "Button",
						color: "primary",
					}),
					new button({
						label: "Button",
						color: "primary",
					}),
					new button({
						label: "Button",
						color: "primary",
					}),
				],
			});
		},
	},

	{
		import: ["button", "btngroup"],
		code: () => {
			return new btngroup({
				elem: [
					new button({
						label: "Left",
						color: "secondary",
					}),
					new button({
						label: "Middle",
						color: "secondary",
					}),
					new button({
						label: "Right",
						color: "secondary",
					}),
				],
			});
		},
	},

	{
		import: ["button", "btngroup", "btntoolbar"],
		code: () => {
			return new btntoolbar({
				gap: 2,
				elem: [
					new btngroup({
						elem: [
							new button({
								label: "1",
								color: "secondary",
							}),
							new button({
								label: "2",
								color: "secondary",
							}),
							new button({
								label: "3",
								color: "secondary",
							}),
							new button({
								label: "4",
								color: "secondary",
							}),
						],
					}),
					new btngroup({
						elem: [
							new button({
								label: "5",
								color: "secondary",
							}),
							new button({
								label: "6",
								color: "secondary",
							}),
							new button({
								label: "7",
								color: "secondary",
							}),
						],
					}),
					new btngroup({
						elem: [
							new button({
								label: "8",
								color: "secondary",
							}),
						],
					}),
				],
			});
		},
	},

	{
		title: "Typography",
		import: ["h"],
		code: () => {
			return [1, 2, 3, 4, 5, 6].map((i) => {
				return new h(i, `Heading ${i}`);
			});
		},
	},

	{
		import: ["h", "small"],
		code: () => {
			return [1, 2, 3, 4, 5, 6].map((i) => {
				return new h(i, `Heading ${i}`);
			});
		},
	},
];
