"use strict";
import * as core from "../cl/base/core.js";
import sample from "./sample.js";
import carousel from "../cl/base/carousel.js";
import toast from "../cl/base/toast.js";
import * as table from "../cl/base/table.js";
import button from "../cl/base/button.js";
import div from "../cl/base/div.js";
import ul from "../cl/base/ul.js";
import li from "../cl/base/li.js";

export default [
	{
		title: "Carousel",
		msg: "A slideshow component for cycling through elements—images or slides of text—like a carousel.",
		anchor: false,
	},

	{
		title: "Slide only",
		import: ["carousel", "sample"],
		code: () => {
			return new carousel({
				item: [
					sample.img(857, 428),
					sample.img(857, 428),
					sample.img(857, 428),
					sample.img(857, 428),
					sample.img(857, 428),
					sample.img(857, 428),
				],
			});
		},
	},

	{
		title: "With control",
		import: ["carousel", "sample"],
		code: () => {
			return new carousel({
				control: true, //marker
				item: [
					sample.img(857, 428),
					sample.img(857, 428),
					sample.img(857, 428),
					sample.img(857, 428),
					sample.img(857, 428),
					sample.img(857, 428),
				],
			});
		},
	},

	{
		title: "With indicator",
		import: ["carousel", "sample"],
		code: () => {
			return new carousel({
				indicators: true, //marker
				control: true,
				item: [
					sample.img(857, 428),
					sample.img(857, 428),
					sample.img(857, 428),
					sample.img(857, 428),
					sample.img(857, 428),
					sample.img(857, 428),
				],
			});
		},
	},

	{
		title: "With caption",
		import: ["carousel", "sample"],
		code: () => {
			return new carousel({
				control: true,
				indicators: true,
				item: [
					{
						caption: "Title #1", //marker
						text: "This is text for image no #1",
						src: sample.img(857, 428, "primary"),
					},
					{
						caption: "Title #2", //marker
						text: "This is text for image no #2",
						src: sample.img(857, 428, "secondary"),
					},
					{
						caption: "Title #3", //marker
						text: "This is text for image no #3",
						src: sample.img(857, 428, "success"),
					},
					{
						caption: "Title #4", //marker
						text: "This is text for image no #4",
						src: sample.img(857, 428, "danger"),
					},
					{
						caption: "Title #5", //marker
						text: "This is text for image no #5",
						src: sample.img(857, 428, "info"),
					},
					{
						caption: "Title #6", //marker
						text: "This is text for image no #6",
						src: sample.img(857, 428, "dark"),
					},
				],
			});
		},
	},

	{
		title: "Crossfade",
		import: ["carousel", "sample"],
		code: () => {
			return new carousel({
				fade: true, //marker
				control: true,
				item: [
					sample.img(857, 428),
					sample.img(857, 428),
					sample.img(857, 428),
					sample.img(857, 428),
					sample.img(857, 428),
					sample.img(857, 428),
				],
			});
		},
	},

	{
		title: "Individual interval",
		import: ["carousel", "sample"],
		code: () => {
			return new carousel({
				control: true,
				indicators: true,
				item: [
					{
						interval: 10000, //marker
						src: sample.img(857, 428, "primary"),
					},
					{
						interval: 2000, //marker
						src: sample.img(857, 428, "secondary"),
					},
					{
						interval: 5000, //marker
						src: sample.img(857, 428, "success"),
					},
					{
						interval: 1000, //marker
						src: sample.img(857, 428, "danger"),
					},
					{
						interval: 3000, //marker
						src: sample.img(857, 428, "info"),
					},
					{
						interval: 7500, //marker
						src: sample.img(857, 428, "dark"),
					},
				],
			});
		},
	},

	{
		title: "Disable touch swiping",
		import: ["carousel", "sample"],
		code: () => {
			return new carousel({
				touch: false, //marker
				control: true,
				item: [
					sample.img(857, 428),
					sample.img(857, 428),
					sample.img(857, 428),
					sample.img(857, 428),
					sample.img(857, 428),
					sample.img(857, 428),
				],
			});
		},
	},

	{
		title: "Dark variant",
		import: ["carousel", "sample"],
		code: () => {
			return new carousel({
				dark: true, //marker
				control: true,
				indicators: true,
				item: [
					{
						caption: "Title #1",
						text: "This is text for image no #1",
						src: sample.img(857, 428, "primary"),
					},
					{
						caption: "Title #2",
						text: "This is text for image no #2",
						src: sample.img(857, 428, "secondary"),
					},
					{
						caption: "Title #3",
						text: "This is text for image no #3",
						src: sample.img(857, 428, "success"),
					},
					{
						caption: "Title #4",
						text: "This is text for image no #4",
						src: sample.img(857, 428, "danger"),
					},
					{
						caption: "Title #5",
						text: "This is text for image no #5",
						src: sample.img(857, 428, "info"),
					},
					{
						caption: "Title #6",
						text: "This is text for image no #6",
						src: sample.img(857, 428, "dark"),
					},
				],
			});
		},
	},

	{
		title: "Event",
		msg: [
			"Carousel exposes two events for hooking into carousel functionality. Both events have the following additional properties:",
			new ul({
				elem: [
					new li({
						elem: "<code>direction</code>: The direction in which the carousel is sliding (either <code>left</code> or <code>right</code>)",
					}),
					new li({
						elem: "<code>relatedTarget</code>: The DOM element that is being slid into place as the active item.",
					}),
					new li({
						elem: "<code>from</code>: The index of the current item",
					}),
					new li({
						elem: "<code>to</code>: The index of the next item",
					}),
				],
			}),
			new table.container({
				item: [
					["Option", "Description"],
					[
						"<code>slide</code>",
						"This event fires immediately when the <code>slide</code> instance method is invoked.",
					],
					["<code>slid</code>", "This event is fired when the carousel has completed its slide transition."],
				],
			}),
		],
		import: ["carousel", "sample", "toast"],
		code: () => {
			let fn = (sender, event) => `Carousel <b>${core.elemInfo(sender)}</b> event <b>${event}</b> trigged`;
			let divOutput = core.UUID();
			let btnGenerate = core.UUID();

			return [
				new button({
					id: btnGenerate,
					label: "Run Code",
					icon: "play",
					color: "primary",
					click: () => {
						document.getElementById(btnGenerate).classList.add("d-none");
						document.getElementById(divOutput).classList.remove("d-none");

						core.replaceChild(
							document.getElementById(divOutput),
							new carousel({
								control: true,
								indicators: true,
								item: [
									sample.img(857, 428),
									sample.img(857, 428),
									sample.img(857, 428),
									sample.img(857, 428),
									sample.img(857, 428),
									sample.img(857, 428),
								],

								//marker
								slide: (event) => {
									console.info("relatedTarget", event.relatedTarget);
									console.info("direction", event.direction);
									console.info("from", event.from);
									console.info("to", event.to);

									new toast("i", fn(event.currentTarget, "onslide")).show();
								},
								slid: (event) => {
									new toast("/", fn(event.currentTarget, "onslid")).show();
								},
								//-
							})
						);
					},
				}),
				new div({ id: divOutput, class: "d-none" }),
			];
		},
	},
];
