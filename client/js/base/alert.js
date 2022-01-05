"use strict";
import * as core from "./core.js";
import a from "./a.js";
import h from "./h.js";
import msg from "./msg.js";
import div from "./div.js";
import btnclose from "./btnclose.js";

const defaultOption = { icon: null, color: null, elem: null, close: false };
/**
 * opt : {tagoption,icon,color,elem,close}
 */
export class container extends div {
	constructor(...opt) {
		super(...opt);
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		if (opt) {
			opt = core.extend({}, defaultOption, opt);

			let bI = core.getBaseIcon(opt.icon);
			if (bI) {
				opt.color = opt.color || bI.color;
				opt.elem = new msg({
					weight: "sm",
					icon: {
						icon: bI.icon,
						type: bI.type,
					},
					elem: opt.elem,
				});
			}

			opt.class = core.merge.class(opt.class, [
				"alert",
				opt.color ? `alert-${opt.color}` : null,
				opt.close ? "fade show" : null,
			]);

			opt.attr = core.merge.attr(opt.attr, {
				role: "alert",
			});

			opt.elem = new div({
				display: "flex",
				alignitem: "stretch",
				elem: [
					new div({ class: "w-100", elem: opt.elem }),
					opt.close
						? new btnclose({
								dismiss: "alert",
						  })
						: null,
				],
			});

			delete opt.icon;
			delete opt.color;
			delete opt.close;
			delete opt.msg;

			super.data = opt;
		}
	}
}

export class link extends a {
	constructor(...opt) {
		super(...opt);
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		if (opt) {
			opt.class = core.merge.class(opt.class, "alert-link");
			super.data = opt;
		}
	}
}

const defaultHeadingOption = {
	level: 4,
};
export class heading extends h {
	constructor(...opt) {
		super(...opt);
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		if (opt) {
			opt = core.extend({}, defaultHeadingOption, opt);
			opt.class = core.merge.class(opt.class, "heading");
			super.data = opt;
		}
	}
}
