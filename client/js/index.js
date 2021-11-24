"use strict";
import * as core from "./base/core.js";
import * as cl from "./base/cl.js";
import div from "./base/div.js";
import p from "./base/p.js";
import h from "./base/h.js";
import button from "./base/button.js";
import * as inputgroup from "./base/inputgroup.js";
import btngroup from "./base/btngroup.js";
import icon from "./base/icon.js";
import tooltip from "./base/tooltip.js";
import badge from "./base/badge.js";
import input from "./base/input.js";
import label from "./base/label.js";
import dropdown from "./base/dropdown.js";
import tab from "./base/tab.js";
import * as collapse from "./base/collapse.js";
import * as card from "./base/card.js";
import small from "./base/small.js";
import modal from "./base/modal.js";
import toast from "./base/toast.js";
import msg from "./base/msg.js";
import * as dlg from "./base/dlg.js";
import * as container from "./base/container.js";
import * as alert from "./base/alert.js";
import hr from "./base/hr.js";
import accordion from "./base/accordion.js";
import breadcrumb from "./base/breadcrumb.js";
import paging from "./base/paging.js";

let imgurlindex = 0;
function imgurl(width, height) {
	return `https://picsum.photos/seed/${++imgurlindex}/${width ? width : 800}/${height ? height : 400}.webp`;
}
let loream =
	"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce hendrerit tincidunt nibh ut condimentum. Nulla vitae vulputate elit. Sed accumsan varius mauris, vel bibendum magna consequat eget. Vivamus felis dolor, laoreet et blandit ut, iaculis eu arcu. Proin dapibus, metus vitae iaculis venenatis, lacus purus commodo tellus, aliquam commodo ex metus vulputate mi. Nam eu lorem vel nisi scelerisque hendrerit et id justo. Nunc vestibulum eget est sed ullamcorper. Etiam pulvinar, dui eget vehicula molestie, sapien sapien lobortis nulla, nec cursus urna sapien imperdiet tortor. Nam vitae lacus sem. Praesent id arcu vitae sem ultrices rutrum ut ac mi.";

function repeatdoform(timestorepeat) {
	if (timestorepeat > 0) {
		doForm();
		setTimeout(repeatdoform(timestorepeat - 1), 10);
	} else {
		console.log("End repeat");
	}
}
function doForm() {
	let root = document.getElementById("root");

	// console.time("Proccesing Time");
	let tid1 = core.UUID();
	let tid2 = core.UUID();

	cl.replaceChild(
		root,
		new div("my-5 container", [
			new button("danger mb-2", "Generate Root", function () {
				repeatdoform(500);
			}),
			new tab({
				style: "tab",
				item: [
					{
						label: "1",
						elem: [
							new accordion({
								item: [
									{
										title: "Hello",
										elem: new breadcrumb({
											item: [
												{ label: "Google", href: "https://www.google.com" },
												{ label: "Facebook", href: "https://www.facebook.com" },
												{ label: "Bing", href: "https://www.bing.com" },
											],
										}),
									},
									{
										title: "Hello1",
										icon: "fire",
										elem: new paging({
											total: 1260,
											skip: 0,
											limit: 10,
											max: 5,
											onchange: function (event) {
												console.log("Current skip:", event.detail.skip);
											},
										}),
									},
									{ title: "Hello2", elem: "World2" },
									{ title: "Hello3", elem: "World3" },
								],
							}),
						],
					},
					{
						label: "First",
						icon: "fire",
						elem: [
							new alert.container("i", "Info alert"),
							new alert.container({ icon: "/", elem: "Success", close: true }),
							new alert.container({
								color: "primary",
								elem: [
									new alert.heading("Well done!"),
									new p(
										"Aww yeah, you successfully read this important alert message. This example text is going to run a bit longer so that you can see how spacing within an alert works with this kind of content."
									),
									new hr(),
									new p("mb-0", [
										"Whenever you need to, be sure to use margin utilities to ",
										new alert.link("keep things", "#"),
										" nice and tidy.",
									]),
									new alert.link("Goto Google", "https://www.google.com"),
								],
							}),

							new toast({
								title: "Title",
								icon: "fire",
								elem: new msg("sm", "!", "Testing Toast"),
								debug: true,
							}),
							new modal({
								title: "Title",
								icon: "fire",
								elem: new msg("md", "!!", "Testing Modal"),
								button: "Okay",
								debug: true,
							}),
							new button("primary", "Hello World", function () {
								new dlg.inputbox(
									[
										new input({
											type: "text",
											value: "aaa",
											required: true,
											label: "hehehe",
											name: "vx",
										}),
										new input({
											type: "number",
											value: 123,
											min: 10,
											max: 300,
											required: true,
											label: "hehehe2",
											name: "vy",
										}),
									],
									function (_sender, data) {
										new toast("i", JSON.stringify(data)).show();
									}
								).show();
							}),
						],
					},
					{
						label: "Second",
						elem: "This is second tab. ",
						option: [
							{ onclick: function () {}, label: "Action" },
							{ onclick: function () {}, label: "Another action" },
							{ onclick: function () {}, label: "Something else here" },
							{ value: "-" },
							{ onclick: function () {}, label: "Separated link" },
						],
					},
					{
						label: "Third",
						elem: new card.container(
							new card.body([
								"This is third tab. ",
								new container.stack([
									new button("primary", "Test Modal", function () {
										let m = new modal({
											title: "Title",
											icon: "fire",
											elem: new tab({
												border: false,
												item: [
													{ label: "First", icon: "fire", elem: "This is first tab. " },
													{ label: "Second", icon: "fire", elem: "This is second tab. " },
													{ label: "Third", icon: "fire", elem: "This is third tab. " },
													{ label: "Fourth", icon: "fire", elem: "This is fourth tab. " },
												],
											}),
											button: [
												{
													label: "Long",
													onclick: function (sender) {
														new modal({
															title: "Hei",
															elem: new msg("md", "i", loream),
															button: "Okay",
														}).show();

														return false; //prevent auto destroy
													},
												},
												{
													label: "Short",
													onclick: function (sender) {
														new modal({
															title: "Hei",
															elem: new msg("md", "fire", "loream"),
															button: "Okay",
														}).show();

														return false; //prevent auto destroy
													},
												},
												,
												{
													label: "Large",
													onclick: function (sender) {
														new modal({
															divider: false,
															centerbutton: true,
															// color: "primary",
															// textcolor: "light",
															elem: new msg(
																"lg",
																"i",
																new div([new h(4, "Loream"), loream])
															),
															button: ["Okay", "Cancel"],
														}).show();

														return false; //prevent auto destroy
													},
												},
												"Cancel",
											],
											footer: new input({
												type: "switch",
												name: "showagain",
												label: "Show again",
											}),
										});
										m.show();
									}),
									new button("success", "Test Long Toast", function () {
										new toast("x", loream).show();
									}),
									new button("info", "Test Short Toast", function () {
										new toast("!", "loream").show();
									}),
									new button("secondary", "Test Msgbox", function () {
										new dlg.msgbox("?", "This is info msg", function () {
											new toast("?", "Hello world").show();
										}).show();
									}),
									new button("warning", "Test Confirmbox", function () {
										new dlg.confirmbox("!", "This is confirmbox", function () {
											new dlg.confirmbox("!", "This is confirmbox", [
												{
													label: "Yesss",
													onclick: function () {
														new toast("x", "Hello world").show();
													},
												},
												"No",
												"Cancel",
											]).show();
										}).show();
									}),

									new button("danger", "Test2 Confirmbox", function () {
										new dlg.confirmbox("x", "This is confirmbox2", [
											{
												label: "Yesss",
												onclick: function () {
													new toast("x", "Hello world").show();
												},
											},
											"No",
											"Cancel",
										]).show();
									}),
								]),
							])
						),
					},
					{
						label: "Form",
						elem: [
							new div(
								"container form-try-get-data",
								new div("row g-2", [
									new input({
										label: "Hello",
										type: "text",
										option: ["Aase qwe", "Bas tes", "Cde kil", "Def ghi"],
										before: "A",
									}),
									new input({
										label: "Hello",
										type: "text",
										plaintext: true,
										value: "Hello",
										before: "A",
										size: 5,
									}),
									new input({
										label: "Hello",
										hidelabel: true,
										type: "text",
										before: "A",
										size: 7,
									}),
									new input({
										label: "Hello1",
										type: "text",
										floatlabel: true,
										after: "B",
									}),
									new dropdown({
										label: "Hello world",
										color: "primary",
										splittoggle: true,
										arrow: "start",
										dark: true,
										container: "col",
										option: [
											{ onclick: function () {}, label: "Action" },
											{ onclick: function () {}, label: "Another action" },
											{ onclick: function () {}, label: "Something else here" },
											{ value: "-" },
											{ onclick: function () {}, label: "Separated link" },
										],
									}),
									new input({
										label: "Hello2 required",
										type: "text",
										required: true,
										valid: "ok",
										invalid: "emmmm",
										before: "A",
										aftertype: "dropdown",
										after: new dropdown({
											label: "Hello world",
											color: "primary",
											// splittoggle: true,
											// offset: "20,30",
											container: null,
											arrow: "start",
											dark: true,
											option: [
												{ onclick: function () {}, label: "Action" },
												{ onclick: function () {}, label: "Another action" },
												{ onclick: function () {}, label: "Something else here" },
												{ value: "-" },
												{ onclick: function () {}, label: "Separated link" },
											],
										}),
									}),
									new input({
										label: "Hello2",
										type: "text",
										before: new icon("fire"),
										aftertype: "button",
										after: new button({ label: "Hello", color: "primary" }),
									}),

									new input({
										label: "Hello2",
										type: "select",
										value: "2",
										option: [
											{ value: "1", label: "One" },
											{ value: "2", label: "Two" },
											{ value: "3", label: "Three" },
										],
										before: new icon("fire"),
										addctl: function (event) {
											alert("Add ctl");
										},
									}),

									new div("container", [
										new div(
											"row py-2",
											new input({
												label: "Name",
												required: true,
												invalid: "Please provide name",
												name: "name",
												type: "text",
												labelsize: ["lg-3", "md-6", "sm-12"],
												ctlsize: ["lg-9", "md-6", "sm-12"],
											})
										),

										new div(
											"row py-2",
											new input({
												label: "Age",
												required: true,
												invalid: "Please provide age",
												name: "age",
												type: "number",
												min: 13,
												max: 90,
												step: 5,
												numctl: true,
												labelsize: ["lg-3", "md-6", "sm-12"],
												ctlsize: ["lg-9", "md-6", "sm-12"],
											})
										),
									]),

									new label("Sex"),
									new input({
										type: "radio",
										label: "Secret",
										name: "sex",
										value: "s",
										checked: true,
									}),
									new input({
										type: "radio",
										label: "Male",
										name: "sex",
										value: "m",
									}),
									new input({
										type: "radio",
										label: "Female",
										name: "sex",
										value: "f",
									}),
									new label("Interest"),
									new input({
										type: "switch",
										label: "Internet",
										name: "interest",
										value: "internet",
									}),
									new input({
										type: "switch",
										label: "Shopping",
										name: "interest",
										value: "shopping",
									}),
									new input({
										type: "switch",
										label: "Sport",
										name: "interest",
										value: "Sport",
									}),

									new input({
										name: "state",
										label: "State",
										type: "select",
										weight: "lg",
										value: "my",
										option: [
											{ value: "my", label: "Malaysia" },
											{ value: "us", label: "United State" },
											{ value: "sg", label: "Singapore" },
										],
									}),

									new input({
										type: "textarea",
										label: "Karangan",
										floatlabel: true,
										name: "karangan",
										attr: { style: { height: "150px" } },
										before: new icon("fire"),
									}),

									new input({
										name: "rng",
										label: "Example Range",
										type: "range",
										value: 2.5,
										min: 0,
										max: 5,
										step: 0.5,
									}),

									new button({
										label: "Test Read Data",
										onclick: function () {
											let c = document.getElementsByClassName("form-try-get-data")[0];
											// new toast({
											// 	title: "Result",
											// 	icon: "fire",
											// 	elem: JSON.stringify(core.getValue(c)),
											// 	color: "primary",
											// 	textcolor: "light",
											// }).show();

											new toast(
												"primary",
												"light",
												"fire",
												JSON.stringify(core.getValue(c))
											).show();
										},
									}),
									new button({
										label: "Test Write Data",
										onclick: function () {
											let c = document.getElementsByClassName("form-try-get-data")[0];
											core.setValue(c, {
												name: "Abu Bakar Ella",
												rng: 1,
												interest: "shopping",
												sex: "f",
											});
										},
									}),
								])
							),
						],
					},
				],
			}),
			new p("display-1", "Hello World"),
			new btngroup([
				new button({
					label: "Primary",
					color: "primary",
					id: core.UUID("btn-xxxxxxx"),
					badge: {
						// label: "45",
						color: "danger",
						bordercolor: "white",
						notification: true,
						// attr: { class: "ms-2" },
					},
				}),
				new tooltip(
					new button({
						label: "Danger",
						color: "danger",
						type: "submit",
						outline: true,
						icon: { style: "fab", icon: "facebook", spin: true },
						attr: { style: { width: "150px" } },
					}),
					{
						title: "Title",
						msg: "Message",
						type: "popover",
						postition: "end",
					}
				),
				new button({
					label: "Yay",
					disabled: true,
					hidelabel: true,
					color: "success",
					type: "reset",
					icon: "fire",
					attr: {
						class: [
							"makkauhijau",
							"btn",
							"btn",
							null,
							null,
							null,
							"makkaubiru",
							"makkaubiru",
							"makkaubiru",
						],
					},
				}),
				new button({
					label: "hello",
					color: "primary",
					badge: {
						label: "45",
						color: "danger",
						bordercolor: "white",
						notification: true,
						pill: true,
					},
				}),
			]),
			new tooltip(
				new h(3, "text-primary my-5", [
					"This is h3 Title",
					new badge({
						label: "+99",
						icon: "fire",
						color: "danger",
						pill: true,
					}),
				]),
				{
					type: "tooltip",
					msg: "Yeessss!!!",
					placement: "left",
				}
			),
			new div("mb-5", [
				new inputgroup.container([
					new inputgroup.text(new icon("fire")),
					new button("primary", "Hello"),
					new inputgroup.text(new icon("fire")),
					new inputgroup.text({ elem: new icon("fire"), attr: { class: "text-danger" } }),
					new button("info", "World", function () {
						alert("Clicked");
					}),
					new inputgroup.text([new icon("fire"), new icon("fire"), new icon("fire")]),
				]),
			]),
			new div(
				"mb-5",
				new container.stack([
					new icon("fab", "bootstrap"),
					new icon("home"),
					new icon({ icon: "home", color: "success" }),
					new icon({ icon: "home", color: "danger", rotate: 90 }),
					new icon({ icon: "home", color: "warning", rotate: "both" }),
				])
			),

			new div("mb-5", [
				new icon({ icon: "home", color: "danger", weight: "5x" }),
				new icon({
					elem: [
						new icon({ stack: 1, icon: "camera" }),
						new icon({ stack: 2, icon: "ban", color: "danger" }),
					],
				}),
				new icon({
					color: "info",
					elem: [
						new icon({ stack: 2, icon: "square" }),
						new icon({ stack: 1, style: "fab", icon: "twitter", inverse: true }),
					],
				}),
			]),
			new div(
				"mb-5",
				new container.stack([
					new badge("primary", "primary"),
					new badge("success", "success"),
					new badge("danger", "danger"),
					new badge("warning", "warning", true),
					new badge("info", "info", true),
					new badge("secondary", "secondary", true),
				])
			),

			new div("mt-5", [
				new btngroup([
					new collapse.toggle(new button("danger", "Hello"), `#${tid1}`),
					new collapse.toggle(new button("warning", "World"), `#${tid2}`),
					new collapse.toggle(new button("success", "Yay"), `.anak-ayam`),
				]),

				new collapse.container(new card.container(new card.body("Body anak ayam 1")), {
					id: tid1,
					class: "anak-ayam m-2",
				}),

				new collapse.container(
					new card.container([
						new card.horizontal(
							new card.img({
								placement: "top",
								src: imgurl(400, 300),
							}),
							[
								new card.header("Card header"),
								new card.body([
									new card.title("Card title"),
									new card.subtitle("Card subtitle"),
									new card.text(
										"Some quick example text to build on the card title and make up the bulk of the card's content."
									),
									new card.text({
										textcolor: "muted",
										elem: new small("bg-primary", "Small muted text"),
									}),
									new card.link("Hello world", "http://www.google.com"),
								]),
								new card.footer("Footer"),
							]
						),
					]),
					{
						id: tid2,
						class: "anak-ayam m-2",
					}
				),
			]),
		])
	);
}
//test upload from laptop
core.documentReady(() => {
	doForm();
});
