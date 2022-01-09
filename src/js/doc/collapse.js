"use strict";
import sample from "./sample.js";
import $ from "../component.js";

export default [
	{
		title: "Collapse",
		msg: "Toggle the visibility of content across your project with a few classes and Bootstrap JavaScript pluginew $.",
		anchor: false,
	},
	{
		title: "Example",
		container: sample.stackcontainer,
		code: function () {
			let id = $.core.UUID();

			return [
				new $.collapse.toggle({
					target: `#${id}`,
					elem: new $.button({ label: "Toggle button", color: "primary" }),
				}),
				new $.collapse.toggle({
					target: `#${id}`,
					elem: new $.button({
						icon: { icon: "fire", color: "danger" },
						label: "Toggle with icon",
						color: "warning",
					}),
				}),
				new $.collapse.container({
					id: id,
					elem: new $.card.container({
						elem: new $.card.body({
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
		code: function () {
			let id1 = $.core.UUID();
			let id2 = $.core.UUID();
			let id3 = $.core.UUID();

			return [
				new $.collapse.toggle({
					target: `#${id1}`,
					elem: new $.button({ label: "Toggle first element", color: "primary" }),
				}),
				new $.collapse.toggle({
					target: `#${id2}`,
					elem: new $.button({ label: "Toggle second element", color: "primary" }),
				}),
				new $.collapse.toggle({
					target: `.${id3}`,
					elem: new $.button({ label: "Toggle both element", color: "primary" }),
				}),
				new $.collapse.container({
					id: id1,
					class: id3,
					elem: new $.card.container({
						elem: [
							new $.card.header("Card 1"),
							new $.card.body(
								"Some placeholder content for the collapse component. This panel is hidden by default but revealed when the user activates the relevant trigger."
							),
						],
					}),
				}),
				new $.collapse.container({
					id: id2,
					class: id3,
					elem: new $.card.container({
						elem: [
							new $.card.header("Card 2"),
							new $.card.body(
								"Some placeholder content for the collapse component. This panel is hidden by default but revealed when the user activates the relevant trigger."
							),
						],
					}),
				}),
			];
		},
	},
];
