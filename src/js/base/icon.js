"use strict";
import * as core from "./core.js";
import tag from "./tag.js";

const defaultOption = {
	tag: "i",
	type: "fas",
	icon: null,
	weight: null,
	fixwidth: true,
	spin: false,
	rotate: null,
	color: null,
	inverse: false,
	elem: null,
	stack: 0,
};
/**
 * opt : {tagoption,type,icon,weight,fixwidth,spin,rotate,color,inverse,elem,stack}
 */

export default class icon extends tag {
	clicon = 1;

	constructor(...opt) {
		super();
		if (opt && opt.length > 0) {
			let t = {
				type: null,
				icon: null,
			};
			if (opt.length === 1) {
				if (typeof opt[0] === "string") {
					t = {
						type: "fas",
						icon: opt[0],
					};
				} else if (Array.isArray(opt[0]) && opt[0].length === 2) {
					t = {
						type: opt[0][0],
						icon: opt[0][1],
					};
				} else {
					t = opt[0];
				}
			} else if (opt.length === 2) {
				t = {
					type: opt[0],
					icon: opt[1],
				};
			} else {
				console.error("Unsupported argument", opt);
			}

			this.data = core.extend({}, defaultOption, t);
		} else {
			this.data = null;
		}
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		if (opt) {
			opt = core.extend({}, defaultOption, opt);

			//baseicon
			let bI = core.getBaseIcon(opt.icon);
			if (bI) {
				opt.icon = bI.icon;
				opt.color = opt.color || bI.color;
				opt.type = bI.type ? bI.type : opt.type;
			}

			let rotate = null;
			switch (opt.rotate) {
				case 90:
				case 180:
				case 270:
					rotate = `fa-rotate-${opt.rotate}`;
					break;
				case "horizontal":
				case "vertical":
				case "both":
					rotate = `fa-flip-${opt.rotate}`;
					break;
			}

			opt.textcolor = opt.color;
			opt.class = core.merge.class(opt.class, [
				opt.type ? opt.type : null,
				opt.icon ? `fa-${opt.icon}` : null,
				opt.weight ? `fa-${opt.weight}` : null,
				opt.fixwidth ? "fa-fw" : null,
				opt.spin ? "fa-spin" : null,
				opt.elem ? "fa-stack" : null,
				opt.stack > 0 ? `fa-stack-${opt.stack}x` : null,
				opt.inverse ? "fa-inverse" : null,
				rotate,
			]);

			delete opt.type;
			delete opt.icon;
			delete opt.weight;
			delete opt.fixwidth;
			delete opt.spin;
			delete opt.rotate;
			delete opt.color;
			delete opt.inverse;
			delete opt.stack;

			super.data = opt;
		}
	}
}
