"use strict";
import * as core from "../base/core.js";
import sample from "./sample.js";
import button from "../base/button.js";
import * as card from "../base/card.js";
import * as collapse from "../base/collapse.js";
import toast from "../base/toast.js";

export default [
	{
		title: "Collapse",
		msg: "Toggle the visibility of content across your project with a few classes and Bootstrap JavaScript plugin",
		anchor: false,
	},
	{
		title: "Example",
		container: sample.stackcontainer,
		import: ["button", "card", "collapse"],
		code: () => {
			let id = core.UUID();

			return [
				new collapse.toggle({
					target: `#${id}`,
					elem: new button({ label: "Toggle button", color: "primary" }),
				}),
				new collapse.toggle({
					target: `#${id}`,
					elem: new button({
						icon: { icon: "fire", color: "danger" },
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
					target: `#${id1}`,
					elem: new button({ label: "Toggle first element", color: "primary" }),
				}),
				new collapse.toggle({
					target: `#${id2}`,
					elem: new button({ label: "Toggle second element", color: "primary" }),
				}),
				new collapse.toggle({
					target: `.${id3}`,
					elem: new button({ label: "Toggle both element", color: "primary" }),
				}),
				new collapse.container({
					id: id1,
					class: id3,
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
					id: id2,
					class: id3,
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
		container: sample.stackcontainer,
		import: ["button", "card", "collapse", "toast"],
		code: () => {
			let id = core.UUID();

			return [
				new collapse.toggle({
					target: `#${id}`,
					elem: new button({ label: "Toggle button", color: "primary" }),
				}),
				new collapse.toggle({
					target: `#${id}`,
					elem: new button({
						icon: { icon: "fire", color: "danger" },
						label: "Toggle with icon",
						color: "warning",
					}),
				}),
				new collapse.container({
					id: id,
					onshow: (sender) => {
						new toast(
							"i",
							`Collapse container <b>${core.elemInfo(sender)}</b> event <b>onshow</b> trigged`
						).show();
					},
					onshown: (sender) => {
						new toast(
							"/",
							`Collapse container <b>${core.elemInfo(sender)}</b> event <b>onshown</b> trigged`
						).show();
					},
					onhide: (sender) => {
						new toast(
							"!",
							`Collapse container <b>${core.elemInfo(sender)}</b> event <b>onhide</b> trigged`
						).show();
					},
					onhidden: (sender) => {
						new toast(
							"x",
							`Collapse container <b>${core.elemInfo(sender)}</b> event <b>onhidden</b> trigged`
						).show();
					},
					elem: new card.container({
						elem: new card.body({
							elem: "Some placeholder content for the collapse component. This panel is hidden by default but revealed when the user activates the relevant trigger.",
						}),
					}),
				}),
			];
		},
	},
];
