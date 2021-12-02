"use strict";
import * as core from "./core.js";
import a from "./a.js";
import h from "./h.js";
import msg from "./msg.js";
import div from "./div.js";
import btnclose from "./btnclose.js";

/**
 * opt : {tagoption,icon,color,close}
 */
export class container extends div {
	constructor(opt) {
		super(opt);
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		if (opt) {
			opt = core.extend({}, { icon: null, close: false }, opt);

			let bI = core.getBaseIcon(opt.icon);
			if (bI) {
				opt.color = opt.color || bI.color;
				opt.elem = new msg(
					"sm",
					{
						icon: bI.icon,
						style: bI.style,
					},
					opt.elem
				);
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
				class: "d-flex align-items-stretch",
				elem: [
					new div({ class: "me-auto", elem: opt.elem }),
					opt.close
						? new btnclose({
								dismiss: "alert",
								class: "my-1",
						  })
						: null,
				],
			});

			delete opt.icon;
			delete opt.color;
			delete opt.close;

			super.data = d;
		} else {
			super.data = null;
		}
	}
}

export class link extends a {
	constructor(opt) {
		super(opt);
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		if (opt) {
			opt.class = core.merge.class(opt.class, "alert-link");
		}

		super.data = opt;
	}
}

export class heading extends h {
	constructor(opt) {
		super(4, opt);
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		if (opt) {
			opt.class = core.merge.class(opt.class, "heading");
		}

		super.data = opt;
	}
}
