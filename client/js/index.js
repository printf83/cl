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
import a from "./base/a.js";

core.documentReady(() => {
	let loream =
		"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce hendrerit tincidunt nibh ut condimentum. Nulla vitae vulputate elit. Sed accumsan varius mauris, vel bibendum magna consequat eget. Vivamus felis dolor, laoreet et blandit ut, iaculis eu arcu. Proin dapibus, metus vitae iaculis venenatis, lacus purus commodo tellus, aliquam commodo ex metus vulputate mi. Nam eu lorem vel nisi scelerisque hendrerit et id justo. Nunc vestibulum eget est sed ullamcorper. Etiam pulvinar, dui eget vehicula molestie, sapien sapien lobortis nulla, nec cursus urna sapien imperdiet tortor. Nam vitae lacus sem. Praesent id arcu vitae sem ultrices rutrum ut ac mi.";
	let root = document.getElementById("root");

	// console.time("Proccesing Time");
	let tid1 = core.UUID();
	let tid2 = core.UUID();

	let b = new div("my-5 container", [
		new tab({
			style: "tab",
			item: [
				{ label: "First", icon: "fire", elem: "This is first tab. " },
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
							new button("Test Modal", "primary me-2", function () {
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
													elem: new msg("md", "fire", loream),
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
														{
															icon: "fire",
															weight: "3x",
															color: "danger",
														},
														new div([new h(4, "Loream"), loream])
													),
													button: ["Okay", "Cancel"],
												}).show();

												return false; //prevent auto destroy
											},
										},
										"Cancel",
									],
									footer: new input({ type: "switch", name: "showagain", label: "Show again" }),
								});
								m.show();
							}),
							new button("Test Long Toast", "secondary me-2", function () {
								new toast({
									// title: "Title",
									// icon: "fire",
									elem: new msg("sm", "fire", loream),
									color: "primary",
									textcolor: "light",
									// autohide: false,
								}).show();
							}),
							new button("Test Short Toast", "info me-2", function () {
								new toast({
									// title: "Title",
									// icon: "fire",
									elem: new msg("sm", "fire", "loream"),
									color: "primary",
									textcolor: "light",
									// autohide: false,
								}).show();
							}),
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
										new toast({
											title: "Result",
											icon: "fire",
											elem: JSON.stringify(core.getValue(c)),
											color: "primary",
											textcolor: "light",
										}).show();
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
					class: ["makkauhijau", "btn", "btn", null, null, null, "makkaubiru", "makkaubiru", "makkaubiru"],
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
				new button("Hello", "primary"),
				new inputgroup.text(new icon("fire")),
				new inputgroup.text({ elem: new icon("fire"), attr: { class: "text-danger" } }),
				new button("World", "info", function () {
					alert("Clicked");
				}),
				new inputgroup.text([new icon("fire"), new icon("fire"), new icon("fire")]),
			]),
		]),
		new div("mb-5", [
			new icon("fab", "bootstrap"),
			new icon("home"),
			new icon({ icon: "home", color: "success" }),
			new icon({ icon: "home", color: "danger", rotate: 90 }),
			new icon({ icon: "home", color: "warning", rotate: "both" }),
		]),

		new div("mb-5", [
			new icon({ icon: "home", color: "danger", weight: "5x" }),
			new icon({
				elem: [new icon({ stack: 1, icon: "camera" }), new icon({ stack: 2, icon: "ban", color: "danger" })],
			}),
			new icon({
				color: "info",
				elem: [
					new icon({ stack: 2, icon: "square" }),
					new icon({ stack: 1, style: "fab", icon: "twitter", inverse: true }),
				],
			}),
		]),
		new div("mb-5", [
			new badge("primary", "primary"),
			new badge("success", "success"),
			new badge("danger", "danger"),
			new badge("warning", "warning", true),
			new badge("info", "info", true),
			new badge("secondary", "secondary", true),
		]),

		new div("mt-5", [
			new btngroup([
				new collapse.toggle(new button("Hello", "primary"), `#${tid1}`),
				new collapse.toggle(new button("World", "secondary"), `#${tid2}`),
				new collapse.toggle(new button("Yay", "secondary"), `.anak-ayam`),
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
							src: "https://picsum.photos/seed/103/800/400.webp",
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
	]);

	cl.replaceChild(root, b);
});
