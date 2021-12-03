"use strict";
import * as core from "./core.js";
import tag from "./tag.js";
import icon from "./icon.js";
import div from "./div.js";
import h from "./h.js";

/**
 * opt : {tagoption,icon,weight,elem}
 */
export default class msg extends tag {
	constructor(opt) {
		super(
			core.extend(
				{},
				{
					icon: null,
					weight: "md", //font size fs-1 to fs-6 or display-1 to display-6 (any class for i)
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
					opt.class = core.merge.class(opt.class, ["d-flex", "align-items-stretch", "gap-2"]);
					opt.elem = [
						opt.icon
							? new div({
									class: "d-flex align-item-start",
									elem: new div({
										class: opt.weight === "sm" ? "fs-4" : "display-4",
										elem: new icon(opt.icon),
									}),
							  })
							: null,
						new div({
							class: "d-flex align-items-center",
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
									class: "display-1 text-center mx-3",
									elem: new icon(opt.icon),
							  })
							: null,
					];

					break;
				default:
					console.error("Unsupported weight", opt.weight);
			}

			delete opt.weight;
			delete opt.icon;

			super.data = opt;
		} else {
			super.data = null;
		}
	}
}
