"use strict";
import * as core from "../base/core.js";
import sample from "./sample.js";
import button from "../base/button.js";
import * as card from "../base/card.js";
import * as collapse from "../base/collapse.js";
import toast from "../base/toast.js";
import * as table from "../base/table.js";
import p from "../base/p.js";

export default [
	{
		title: "Collapse",
		msg: "Toggle the visibility of content across your project with a few classes and Bootstrap JavaScript plugin",
		anchor: false,
	},

	{
		title: "Example",
		container: sample.stackcontainer,
		import: ["button", "card", "collapse", "sample", "p"],
		code: () => {
			let id = core.UUID();

			return [
				new collapse.toggle({
					//marker
					target: `#${id}`,
					control: `${id}`,
					//-
					elem: new button({ label: "Toggle button", color: "primary" }),
				}),
				new collapse.container({
					id: id, //marker
					elem: new card.container({
						elem: new card.body({
							elem: [
								new p(
									"Some placeholder content for the collapse component. This panel is hidden by default but revealed when the user activates the relevant trigger."
								),
								new p(sample.text()),
								new p(sample.text()),
							],
						}),
					}),
				}),
			];
		},
	},

	{
		title: "Multiple toggle",
		container: sample.stackcontainer,
		import: ["button", "card", "collapse", "sample", "p"],
		code: () => {
			let id = core.UUID();

			return [
				new collapse.toggle({
					//marker
					target: `#${id}`,
					control: `${id}`,
					//-
					elem: new button({ label: "Toggle button", color: "primary" }),
				}),
				new collapse.toggle({
					//marker
					target: `#${id}`,
					control: `${id}`,
					//-
					elem: new button({
						icon: sample.icon(),
						label: "Toggle with icon",
						color: "warning",
					}),
				}),
				new collapse.container({
					id: id, //marker
					elem: new card.container({
						elem: new card.body({
							elem: [
								new p(
									"Some placeholder content for the collapse component. This panel is hidden by default but revealed when the user activates the relevant trigger."
								),
								new p(sample.text()),
								new p(sample.text()),
							],
						}),
					}),
				}),
			];
		},
	},

	{
		title: "Multiple targets",
		container: sample.stackcontainer,
		import: ["button", "card", "collapse"],
		code: () => {
			let id1 = core.UUID();
			let id2 = core.UUID();
			let id3 = core.UUID();

			return [
				new collapse.toggle({
					//marker
					target: `#${id1}`,
					control: `${id1}`,
					//-
					elem: new button({ label: "Toggle first element", color: "primary" }),
				}),
				new collapse.toggle({
					//marker
					target: `#${id2}`,
					control: `${id2}`,
					//-
					elem: new button({ label: "Toggle second element", color: "primary" }),
				}),
				new collapse.toggle({
					//marker
					target: `.${id3}`,
					control: `${id1} ${id2}`,
					//-
					elem: new button({ label: "Toggle both element", color: "primary" }),
				}),
				new collapse.container({
					//marker
					id: id1,
					class: id3,
					//-

					elem: new card.container({
						elem: [
							new card.header("Card 1"),
							new card.body(
								"Some placeholder content for the collapse component. This panel is hidden by default but revealed when the user activates the relevant trigger."
							),
						],
					}),
				}),
				new collapse.container({
					//marker
					id: id2,
					class: id3,
					//-

					elem: new card.container({
						elem: [
							new card.header("Card 2"),
							new card.body(
								"Some placeholder content for the collapse component. This panel is hidden by default but revealed when the user activates the relevant trigger."
							),
						],
					}),
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
						"This event is fired when the collapse container has been made visible to the user (will wait for CSS transitions to complete).",
					],
					[
						"<code>onhide</code>",
						"This event is fired immediately when the <code>hide</code> instance method has been called.",
					],
					[
						"<code>onhidden</code>",
						"This event is fired when the collapse container has finished being hidden from the user (will wait for CSS transitions to complete).",
					],
				],
			}),
		],
		container: sample.stackcontainer,
		import: ["button", "card", "collapse", "toast", "sample"],
		code: () => {
			let id = core.UUID();
			let fn = (sender, event) =>
				`Collapse container <b>${core.elemInfo(sender)}</b> event <b>${event}</b> trigged`;

			return [
				new collapse.toggle({
					target: `#${id}`,
					elem: new button({ label: "Toggle button", color: "primary" }),
				}),
				new collapse.toggle({
					target: `#${id}`,
					elem: new button({
						icon: sample.icon(),
						label: "Toggle with icon",
						color: "warning",
					}),
				}),
				new collapse.container({
					id: id,
					elem: new card.container({
						elem: new card.body({
							elem: "Some placeholder content for the collapse component. This panel is hidden by default but revealed when the user activates the relevant trigger.",
						}),
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
				}),
			];
		},
	},
];
