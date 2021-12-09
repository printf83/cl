"use strict";
import * as core from "./base/core.js";
import * as cl from "./base/cl.js";
import div from "./base/div.js";
// import p from "./base/p.js";
import a from "./base/a.js";
import button from "./base/button.js";
// import * as inputgroup from "./base/inputgroup.js";
// import icon from "./base/icon.js";
import badge from "./base/badge.js";
// import input from "./base/input.js";
// import label from "./base/label.js";
import carousel from "./base/carousel.js";
import tab from "./base/tab.js";
import * as collapse from "./base/collapse.js";
import * as card from "./base/card.js";
import small from "./base/small.js";
import modal from "./base/modal.js";
import toast from "./base/toast.js";
// import msg from "./base/msg.js";
import * as dlg from "./base/dlg.js";
import * as container from "./base/container.js";
import * as alert from "./base/alert.js";
import h from "./base/h.js";
import hr from "./base/hr.js";
import btngroup from "./base/btngroup.js";
import input from "./base/input.js";
import icon from "./base/icon.js";
import * as table from "./base/table.js";
import dropdown from "./base/dropdown.js";
import accordion from "./base/accordion.js";
import breadcrumb from "./base/breadcrumb.js";
import paging from "./base/paging.js";
import * as navbar from "./base/navbar.js";
import p from "./base/p.js";
import tooltip from "./base/tooltip.js";
import msg from "./base/msg.js";
import menu from "./base/menu.js";
import * as progress from "./base/progress.js";
import offcanvas from "./base/offcanvas.js";
import toc from "./base/toc.js";

let increeseImgUrlIndex = true;
let imgurlindex = 0;
function imgurl(width, height) {
	// if (increeseImgUrlIndex) {
	// 	return `https://picsum.photos/seed/${imgurlindex++}/${width ? width : 800}/${height ? height : 400}.webp`;
	// } else {
	// 	return `https://picsum.photos/seed/${imgurlindex}/${width ? width : 800}/${height ? height : 400}.webp`;
	// }

	return "../img/img.svg";
}
let loream =
	"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce hendrerit tincidunt nibh ut condimentum. Nulla vitae vulputate elit. Sed accumsan varius mauris, vel bibendum magna consequat eget. Vivamus felis dolor, laoreet et blandit ut, iaculis eu arcu. Proin dapibus, metus vitae iaculis venenatis, lacus purus commodo tellus, aliquam commodo ex metus vulputate mi. Nam eu lorem vel nisi scelerisque hendrerit et id justo. Nunc vestibulum eget est sed ullamcorper. Etiam pulvinar, dui eget vehicula molestie, sapien sapien lobortis nulla, nec cursus urna sapien imperdiet tortor. Nam vitae lacus sem. Praesent id arcu vitae sem ultrices rutrum ut ac mi.";

let dropdownOption = [
	{ href: "#", label: "Action" },
	{
		href: "#",
		label: "Another action",
	},
	{
		href: "#",
		label: "Something else here",
	},
	{ value: "-" },
	{
		href: "#",
		label: "Separated link",
	},
];

function repeatdoform(max, cur, callback) {
	if (cur >= 0) {
		doForm(max, cur);
		if (max > 10) {
			setTimeout(
				function (m, t, c) {
					repeatdoform(m, t, c);
				},
				0,
				max,
				cur - 1,
				callback
			);
		} else {
			repeatdoform(max, cur - 1, callback);
		}
	} else {
		callback();
	}
}
function doForm(max, cur) {
	let root = document.getElementById("root");

	// console.time("Proccesing Time");
	let tid1 = core.UUID();
	let tid2 = core.UUID();
	let tid3 = core.UUID();
	let tid4 = core.UUID();

	cl.replaceChild(
		root,

		new container.form([
			new container.stack([
				new button({
					color: "primary",
					label: `Regenerate root 1 times`,
					onclick: function () {
						console.time("Regenerate");
						repeatdoform(1, 0, function () {
							console.timeEnd("Regenerate");
							cl.init(root);
						});
					},
				}),
				new button({
					color: "warning",
					label: `Regenerate root 100 times`,
					onclick: function () {
						increeseImgUrlIndex = false;
						console.time("Regenerate");
						repeatdoform(100, 99, function () {
							console.timeEnd("Regenerate");
							cl.init(root);
							increeseImgUrlIndex = true;
						});
					},
				}),
				new button({
					color: "danger",
					label: `Regenerate root 5000 times`,
					onclick: function () {
						increeseImgUrlIndex = false;
						console.time("Regenerate");
						repeatdoform(5000, 4999, function () {
							console.timeEnd("Regenerate");
							cl.init(root);
							increeseImgUrlIndex = true;
						});
					},
				}),
			]),
			new progress.container({
				item: { min: 0, max: max, value: max - cur, label: true, stripe: true, animate: true, color: "danger" },
			}),
			new btngroup({
				elem: [
					new button({
						color: "primary",
						outline: true,
						label: "Modal With Tab",
						onclick: function () {
							new modal({
								elem: new tab({
									border: false,
									rounded: false,
									item: [
										{ label: "1", elem: "1" },
										{ label: "2", elem: "2" },
										{ label: "3", elem: "3" },
									],
								}),
								button: [
									{
										label: "AAA",
										onclick: function (_sender, data) {
											new toast("i", JSON.stringify(data)).show();
											return true;
										},
									},
									{
										label: "BBB",
										onclick: function () {
											return true;
										},
									},
								],
								footer: new input({ type: "switch", name: "showagain", label: "Show again" }),
							}).show();
						},
					}),
					new button({
						color: "primary",
						label: "Msgbox",
						onclick: function () {
							new dlg.msgbox("/", "This is success msgbox", function () {
								new toast("/", "This is success toast").show();
							}).show();
						},
					}),
					new button({
						color: "secondary",
						label: "Confirmbox",
						onclick: function () {
							new dlg.confirmbox("x", "This is confirmbox", [
								function () {
									new toast("!", "First button callback").show();
								},
								function () {
									new toast("!", "Second button callback").show();
								},
							]).show();
						},
					}),
					new button({
						icon: "fire",
						color: "info",
						label: "Inputbox",
						onclick: function () {
							new dlg.inputbox("date", "Textbox Input", function (_sender, data) {
								new toast("!!", JSON.stringify(data)).show();
							}).show();
						},
					}),
					new button({
						icon: "fire",
						color: "warning",
						label: "Large Modal",
						onclick: function () {
							new modal({
								divider: false,
								centerbutton: true,
								elem: new msg({
									weight: "lg",
									icon: "i",
									elem: [new h({ level: 3, elem: "Hello world" }), loream],
								}),
								button: [
									{
										label: "Okay",
										color: "primary",
										onclick: function (_sender, data) {
											return true;
										},
									},
									{
										label: "Cancel",
										onclick: function () {
											return true;
										},
									},
								],
								footer: new input({ type: "switch", name: "showagain", label: "Show again" }),
							}).show();
						},
					}),
				],
			}),
			new a({
				label: "Link to google",
				href: "https://www.google.com",
			}),
			new alert.container({
				color: "primary",
				close: true,
				elem: [
					new alert.heading({ elem: "Head" }),
					new hr(),
					"Hello ",
					new alert.link({ label: "Google", href: "http://google.com" }),
				],
			}),
			new h({
				level: 3,
				elem: ["Hello World H3", new badge({ label: "Test Badge", marginStart: 2, pill: true })],
			}),
			new p({ elem: "Test p" }),

			new div({
				elem: new container.stack([
					new button({
						label: "Badge in button",
						color: "primary",
						badge: {
							color: "danger",
							notification: true,
						},
					}),
					new button({
						label: "Badge in button",
						color: "primary",
						badge: {
							label: "45",
							color: "danger",
							marginStart: 2,
						},
					}),

					new tooltip({
						type: "popover",
						msg: "This is popover",
						title: "Title",
						elem: new button({ color: "primary", label: "Test popover" }),
					}),
					new tooltip({
						type: "tooltip",
						msg: "This is tooltip",
						elem: new button({ color: "primary", label: "Test tooltip" }),
					}),

					new button({
						label: "Offcanvas",
						color: "primary",
						onclick: function () {
							new offcanvas({
								color: "dark",
								textcolor: "light",
								title: "Title",
								icon: "fire",
								elem: [
									new menu({ label: "AAA", item: [{ label: "1" }, { label: "2" }, { label: "3" }] }),
									new menu({
										label: "BBB",
										active: true,
										item: [{ label: "1", active: true }, { label: "2" }, { label: "3" }],
									}),
									new menu({ label: "CCC", item: [{ label: "1" }, { label: "2" }, { label: "3" }] }),
								],
							}).show();
						},
					}),
				]),
			}),

			new div({
				rounded: true,
				shadow: true,
				elem: new carousel({
					item: [
						{ src: imgurl(600, 300) },
						{ src: imgurl(600, 300) },
						{ src: imgurl(600, 300) },
						{ src: imgurl(600, 300) },
					],
				}),
			}),

			new btngroup({
				shadow: true,
				elem: [
					new collapse.toggle({
						target: `#${tid1}`,
						elem: new button({ icon: "fire", label: "Test 1", color: "danger" }),
					}),
					new collapse.toggle({
						target: `#${tid2}`,
						elem: new button({ label: "Test 2", color: "warning" }),
					}),
					new collapse.toggle({
						target: `.${tid3}`,
						elem: new button({ label: "Both", color: "success" }),
					}),
				],
			}),

			new collapse.container({
				id: tid1,
				class: tid3,
				elem: new card.container({
					color: "primary",
					coloropacity: 25,
					textcolor: "danger",
					borderweight: 3,
					bordercolor: "success",
					elem: new card.horizontal({
						left: new card.img({
							placement: "left",
							src: imgurl(400, 300),
						}),
						right: [
							new card.header({ elem: "Card 1" }),
							new card.body({
								elem: [
									new card.title({ elem: "Card title" }),
									new card.subtitle({ elem: "Card subtitle" }),
									new card.text({
										elem: "Some quick example text to build on the card title and make up the bulk of the card's content.",
									}),
									new card.text({
										elem: new small({ textcolor: "muted", elem: "Small muted text" }),
									}),
									new card.link({ elem: "Hello world", href: "http://www.google.com" }),
								],
							}),
							new card.footer({ elem: "Footer 1" }),
						],
					}),
				}),
			}),
			new collapse.container({
				id: tid2,
				class: tid3,
				elem: new card.container({
					elem: new card.horizontal({
						size: "md-8",
						left: [
							new card.header({ elem: "Card 2" }),
							new card.body({
								elem: [
									new card.title({ elem: "Card title" }),
									new card.subtitle({ elem: "Card subtitle" }),
									new card.text({
										elem: "Some quick example text to build on the card title and make up the bulk of the card's content.",
									}),
									new card.text({
										elem: new small({ textcolor: "muted", elem: "Small muted text" }),
									}),
									new card.link({ elem: "Hello world", href: "http://www.google.com" }),
								],
							}),
							new card.footer({ elem: "Footer 2" }),
						],
						right: new card.img({
							placement: "right",
							src: imgurl(400, 300),
						}),
					}),
				}),
			}),
			new input({ type: "text", label: "Input Text", before: new icon("fire") }),
			new input({
				type: "email",
				label: "Email address",
				textcolor: "light",
				color: "danger",
				floatlabel: true,
			}),
			new input({
				type: "select",
				label: "Select Box",
				before: new icon("fire"),
				option: ["A", "B", "C"],
				addctl: function () {
					new toast("i", "Addctl function").show();
				},
			}),
			new container.stack([
				new dropdown({
					label: "Drowpdown",
					color: "primary",
					outline: true,
					splittoggle: true,
					option: dropdownOption,
				}),
				new dropdown({
					label: "Drowpdown",
					icon: "fire",
					color: "success",
					splittoggle: true,
					arrow: "start",
					option: dropdownOption,
				}),
				new dropdown({
					label: "Drowpdown",
					color: "warning",
					arrow: "up",
					option: dropdownOption,
				}),
				new dropdown({
					label: "Drowpdown",
					color: "danger",
					arrow: "end",
					option: dropdownOption,
				}),
				new dropdown({
					weight: "lg",
					label: "Drowpdown",
					color: "info",
					outline: true,
					arrow: "end",
					option: dropdownOption,
				}),
				new dropdown({
					dark: true,
					weight: "md",
					label: "Drowpdown",
					color: "secondary",
					arrow: "end",
					splittoggle: true,
					outline: true,
					option: dropdownOption,
				}),
				new dropdown({
					dark: true,
					weight: "sm",
					label: "Drowpdown",
					color: "secondary",
					arrow: "end",
					splittoggle: true,
					option: dropdownOption,
				}),
			]),
			new tab({
				type: "pill",
				align: "center",
				item: [
					{ label: "1", icon: "fire", elem: "1" },
					{ label: "2", elem: "2" },
					{ label: "3", elem: "3" },
					{ label: "4", elem: "4" },
				],
			}),
			new tab({
				type: "pill",
				headalign: "right",
				item: [
					{ label: "1", icon: "fire", elem: "1" },
					{ label: "2", elem: "2" },
					{ label: "3", elem: "3" },
					{ label: "4", elem: "4" },
				],
			}),
			new paging({
				total: 1260,
				skip: 0,
				limit: 10,
				max: 5,
				shadow: true,
				onchange: function (event) {
					console.log("Current skip:", event.detail.skip);
				},
			}),
			new input({ type: "number", min: 1, max: 20, value: 5, label: "Number", numctl: true }),
			new input({ type: "range", min: 1, max: 20, value: 5, label: "Range" }),

			new div({
				class: "col",
				elem: [
					new input({ name: "ctlgroup", value: "a", type: "switch", label: "A", inline: true }),
					new input({ name: "ctlgroup", value: "b", type: "switch", label: "B", inline: true }),
					new input({ name: "ctlgroup", value: "c", type: "switch", label: "C", inline: true }),
					new input({ name: "ctlgroup", value: "d", type: "switch", label: "D", inline: true }),
				],
			}),

			new div({
				class: "col",
				elem: [
					new input({ name: "ctlgroup2", value: "e", type: "checkbox", label: "E", inline: true }),
					new input({ name: "ctlgroup2", value: "f", type: "checkbox", label: "F", inline: true }),
					new input({ name: "ctlgroup2", value: "g", type: "checkbox", label: "G", inline: true }),
					new input({ name: "ctlgroup2", value: "h", type: "checkbox", label: "H", inline: true }),
				],
			}),

			new div({
				class: "col",
				elem: [
					new input({ name: "ctlgroup3", value: "i", type: "radio", label: "I", inline: true }),
					new input({ name: "ctlgroup3", value: "j", type: "radio", label: "J", inline: true }),
					new input({ name: "ctlgroup3", value: "k", type: "radio", label: "K", inline: true }),
					new input({ name: "ctlgroup3", value: "l", type: "radio", label: "L", inline: true }),
				],
			}),

			new navbar.container({
				expand: "lg",
				color: "light",
				elem: [
					new navbar.brand({
						label: "Navbar",
					}),
					new navbar.formcontainer({
						elem: [
							new input({
								type: "search",
								placeholder: "Search",
								hiddenlabel: "Search",
							}),
							new button({ label: "Search", color: "success", outline: true, marginStart: 2 }),
						],
					}),
				],
			}),

			new navbar.container({
				expand: "lg",
				color: "light",
				elem: [
					new navbar.toggle({
						target: `#${tid4}`, //this id must same with ns.navbar.collapsecontainer id
						toggle: "collapse",
					}),
					new navbar.brand({
						label: "Navbar",
						icon: "fire",
					}),
					new navbar.collapsecontainer({
						id: tid4,
						elem: new navbar.itemcontainer({
							parenttype: "collapse",
							elem: [
								new navbar.item({
									label: "Home",
									active: "true",
								}),
								new navbar.item({
									label: "Features",
								}),
								new navbar.item({
									label: "Pricing",
									option: dropdownOption,
								}),
								new navbar.item({
									label: "Disabled",
									disabled: true,
								}),
							],
						}),
					}),
				],
			}),

			new breadcrumb({
				color: "light",
				padding: 3,
				rounded: true,
				shadow: true,
				item: [
					{ label: "Live", href: "https://www.live.com" },
					{ label: "Github", href: "https://www.github.com" },
					{ label: "Bing", href: "https://www.bing.com" },
				],
			}),

			new accordion({
				shadow: true,
				item: [
					{ label: "A1", elem: "A1 Item" },
					{ label: "A2", elem: "A2 Item" },
					{
						label: "A3",
						elem: new table.container({
							item: [
								["A", "B", "C"],
								["A", "B", "C"],
								["A", "B", "C"],
								["A", "B", "C"],
							],
						}),
					},
					{ label: "A4", elem: new toc({ item: [{ label: "A" }, { label: "B" }, { label: "C" }] }) },
				],
			}),
		])
	);
}
//test upload from laptop
core.documentReady(() => {
	repeatdoform(1, 0, function () {
		let root = document.getElementById("root");
		cl.init(root);
		console.log("Complete generate");
	});
});
