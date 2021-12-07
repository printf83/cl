"use strict";
import * as core from "./core.js";
import icon from "./icon.js";
import div from "./div.js";
import h from "./h.js";

/**
 * opt : {tagoption,icon,weight,elem}
 */
export default class msg extends div {
	constructor(opt) {
		super(
			core.extend(
				{},
				{
					icon: null,
					weight: "md",
					elem: null,
				},
				opt
			)
		);
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		if (opt) {
			switch (opt.weight) {
				case "sm":
				case "md":
					opt.display = "flex";
					opt.alignItem = "stretch";
					opt.gap = 2;
					opt.elem = [
						opt.icon
							? new div({
									display: "flex",
									alignItem: "start",
									marginEnd: 2,
									elem: new div({
										class: opt.weight === "sm" ? "fs-5" : "display-4",
										elem: new icon(opt.icon),
									}),
							  })
							: null,
						new div({
							display: "flex",
							alignItem: "center",
							elem: new div({ class: "text-break", elem: opt.elem }),
						}),
					];

					break;
				case "lg":
					if (opt.icon && typeof opt.icon === "object") {
						opt.icon.weight = "2x";
					}

					opt.elem = [
						opt.icon
							? new h(1, {
									class: "display-1",
									align: "center",
									marginX: 3,
									elem: new icon(opt.icon),
							  })
							: null,
						new div({
							align: "center",
							elem: new div({ class: "text-break", elem: opt.elem }),
						}),
					];

					break;
				default:
					console.error("Unsupported weight", opt.weight);
			}

			delete opt.weight;
			delete opt.icon;

			super.data = opt;
		}
	}
}
