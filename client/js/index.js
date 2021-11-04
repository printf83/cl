"use strict";
import * as core from "./base/core.js";
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

core.documentReady(() => {
	var root = document.getElementById("root");

	console.time("b");

	// let b = new div(
	// 	"container p-2",
	// 	new div(
	// 		"row",
	// 		new div("col", [
	// new dropdown({
	// 	label: "Hello world",
	// 	color: "primary",
	// 	weight: "sm",
	// 	splittoggle: true,
	// 	offset: "20,30",
	// 	// arrow: "end",
	// 	dark: true,
	// 	option: [
	// 		{ href: "javascript:void(0);", label: "Action" },
	// 		{ href: "javascript:void(0);", label: "Another action" },
	// 		{ href: "javascript:void(0);", label: "Something else here" },
	// 		{ value: "-" },
	// 		{ href: "javascript:void(0);", label: "Separated link" },
	// 	],
	// }),
	// 		])
	// 	)
	// );

	let b = new div("my-5 container", [
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
				new inputgroup.text([new icon("fire")]),
				new button("Hello", "primary"),
				new inputgroup.text([new icon("fire")]),
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

		new div(
			"container",
			new div("row g-2", [
				new input({
					label: "Hello",
					type: "text",
					//size: "col-12",
					option: ["Aase qwe", "Bas tes", "Cde kil", "Def ghi"],
					before: "A",
				}),
				new input({
					label: "Hello",
					type: "text",
					plaintext: true,
					value: "Hello",
					//size: "col-12",
					before: "A",
				}),
				new input({
					label: "Hello",
					hidelabel: true,
					type: "text",
					//size: "col-12",
					before: "A",
				}),
				new input({
					label: "Hello1",
					type: "text",
					floatlabel: true,
					//size: "col-12",
					after: "B",
				}),
				new dropdown({
					label: "Hello world",
					color: "primary",
					splittoggle: false,
					arrow: "start",
					dark: true,
					container: "col",
					option: [
						{ href: "javascript:void(0);", label: "Action" },
						{ href: "javascript:void(0);", label: "Another action" },
						{ href: "javascript:void(0);", label: "Something else here" },
						{ value: "-" },
						{ href: "javascript:void(0);", label: "Separated link" },
					],
				}),
				new input({
					label: "Hello2 required",
					type: "text",
					required: true,
					valid: "ok",
					invalid: "emmmm",
					//size: "col-12",
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
							{ href: "javascript:void(0);", label: "Action" },
							{ href: "javascript:void(0);", label: "Another action" },
							{ href: "javascript:void(0);", label: "Something else here" },
							{ value: "-" },
							{ href: "javascript:void(0);", label: "Separated link" },
						],
					}),
				}),
				new input({
					label: "Hello2",
					type: "text",
					//size: "col-12",
					before: [new icon("fire")],
					aftertype: "button",
					after: [new button({ label: "Hello", color: "primary" })],
				}),

				new input({
					label: "Hello2",
					type: "select",
					//size: "col-12",
					value: "2",
					option: [
						{ value: "1", label: "One" },
						{ value: "2", label: "Two" },
						{ value: "3", label: "Three" },
					],
					before: [new icon("fire")],
					addctl: function (event) {
						alert("Add ctl");
					},
				}),

				new input({
					label: "Name",
					required: true,
					invalid: "Please provide name",
					name: "name",
					type: "text",
					labelsize: "col-3",
					size: "col",
				}),
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
					labelsize: "col-3",
					size: "col",
				}),
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
					before: [new icon("fire")],
				}),

				new input({
					label: "Example Range",
					type: "range",
					value: 2.5,
					min: 0,
					max: 5,
					step: 0.5,
				}),
			])
		),
	]);

	b.replaceChild(root);
	console.timeEnd("b");
});
