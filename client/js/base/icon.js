"use strict";
import attr from "./attr.js";
import * as core from "./core.js";
import tag from "./tag.js";

/**
 * icon
 * [style,icon]
 * style,icon
 * option
 */
export default class icon extends tag {
	constructor(...arg) {
		let t = {};
		if (arg && arg.length === 1) {
			if (typeof arg[0] === "string") {
				t = {
					style: "fas",
					icon: arg[0],
				};
			} else if (Array.isArray(arg[0]) && arg[0].length === 2) {
				t = {
					style: arg[0][0],
					icon: arg[0][1],
				};
			} else {
				t = arg[0];
			}
		} else if (arg.length === 2) {
			t = {
				style: arg[0],
				icon: arg[1],
			};
		}

		let d = core.extend(
			{},
			{
				attr: null,
				style: null,
				icon: null,
				weight: null,
				fixwidth: true,
				spin: false,
				rotate: null,
				color: null,
				inverse: false,
				elem: null,
				stack: 0,
			},
			t
		);

		let rotate = null;
		switch (d.rotate) {
			case 90:
			case 180:
			case 270:
				rotate = `fa-rotate-${d.rotate}`;
				break;
			case "horizontal":
			case "vertical":
			case "both":
				rotate = `fa-flip-${d.rotate}`;
				break;
		}

		super({
			tag: d.icon ? "i" : "span",
			attr: attr.merge(d.attr, {
				class: [
					d.style ? d.style : d.icon ? "fas" : null,
					d.icon ? `fa-${d.icon}` : null,
					d.weight ? `fa-${d.weight}` : null,
					d.fixwidth ? "fa-fw" : null,
					d.spin ? "fa-spin" : null,
					d.elem ? "fa-stack" : null,
					d.stack > 0 ? `fa-stack-${d.stack}x` : null,
					d.inverse ? "fa-inverse" : null,
					d.color ? `text-${d.color}` : null,
					rotate,
				],
			}),
			elem: d.elem,
		});
	}
}
