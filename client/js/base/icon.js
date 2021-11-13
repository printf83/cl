"use strict";
import * as core from "./core.js";
import { mergeAttr } from "./cl.js";
import tag from "./tag.js";

/**
 * icon
 * [style,icon]
 * style,icon
 * opt : {attr,style,icon,weight,fixwidth,spin,rotate,color,inverse,elem,stack}
 */
export default class icon extends tag {
	_d = null;

	constructor(...arg) {
		super();
		if (arg && arg.length > 0) {
			let t = {
				style: null,
				icon: null,
			};

			if (arg.length === 1) {
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
			} else {
				console.error("Unsupported argument", arg);
			}

			this.data = core.extend(
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
		} else {
			this.data = null;
		}
	}

	clicon = 1;

	get data() {
		return this._d;
	}
	set data(d) {
		if (d) {
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

			this._d = {
				tag: d.icon ? "i" : "span",
				attr: mergeAttr(d.attr, {
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
			};
		} else {
			this._d = null;
		}

		super.data = this._d;
	}
}
