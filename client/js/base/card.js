"use strict";
import * as core from "./core.js";
import a from "./a.js";
import h from "./h.js";
import p from "./p.js";
import div from "./div.js";
import imgtag from "./img.js";

const defaultContainerOption = { flush: false };
/**
 * opt:{tagoption}
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
			opt = core.extend({}, defaultContainerOption, opt);
			opt.class = core.merge.class(opt.class, "card");

			if (opt.flush) {
				opt.rounded = false;
				opt.border = false;
			}

			delete opt.flush;

			super.data = opt;
		}
	}
}
/**
 * opt:{tagoption}
 */
export class header extends div {
	constructor(...opt) {
		super(...opt);
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		if (opt) {
			opt.class = core.merge.class(opt.class, "card-header");
			super.data = opt;
		}
	}
}
/**
 * opt:{tagoption}
 */
export class body extends div {
	constructor(...opt) {
		super(...opt);
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		if (opt) {
			opt.class = core.merge.class(opt.class, "card-body");
			super.data = opt;
		}
	}
}
/**
 * opt:{tagoption}
 */
export class footer extends div {
	constructor(...opt) {
		super(...opt);
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		if (opt) {
			opt.class = core.merge.class(opt.class, "card-footer");
			super.data = opt;
		}
	}
}
/**
 * opt:{tagoption}
 */
export class group extends div {
	constructor(...opt) {
		super(...opt);
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		if (opt) {
			opt.class = core.merge.class(opt.class, "card-group");
			super.data = opt;
		}
	}
}
const defaultTitleOption = { level: 5 };
/**
 * opt:{tagoption}
 */
export class title extends h {
	constructor(...opt) {
		super(...opt);
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		if (opt) {
			opt = core.extend({}, defaultTitleOption, opt);
			opt.class = core.merge.class(opt.class, "card-title");
			super.data = opt;
		}
	}
}

const defaultSubtitleOption = { level: 6, marginbottom: 2 };
/**
 * opt:{tagoption}
 */
export class subtitle extends h {
	constructor(...opt) {
		super(...opt);
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		if (opt) {
			opt = core.extend({}, defaultSubtitleOption, opt);
			opt.class = core.merge.class(opt.class, "card-subtitle");
			super.data = opt;
		}
	}
}
/**
 * opt:{tagoption}
 */
export class text extends p {
	constructor(...opt) {
		super(...opt);
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		if (opt) {
			opt.class = core.merge.class(opt.class, "card-text");
			super.data = opt;
		}
	}
}
/**
 * opt:{tagoption}
 */
export class imgoverlay extends div {
	constructor(...opt) {
		super(...opt);
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		if (opt) {
			opt.class = core.merge.class(opt.class, "card-img-overlay");
			super.data = opt;
		}
	}
}

const defaultHorizontalOption = { left: null, right: null, size: "auto", gap: 0 };
/**
 * opt:{tagoption,left,right,size,gap}
 */
export class horizontal extends div {
	constructor(...opt) {
		super(...opt);
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		if (opt) {
			opt = core.extend({}, defaultHorizontalOption, opt);

			opt.class = core.merge.class(opt.class, "row");
			opt.elem = [
				new div({
					col: opt.size === "col" ? true : opt.size,
					elem: opt.left,
				}),
				new div({
					col: true,
					elem: opt.right,
				}),
			];

			delete opt.left;
			delete opt.right;
			delete opt.size;

			super.data = opt;
		}
	}
}

/**
 * opt:{tagoption}
 */
export class link extends a {
	constructor(...opt) {
		super(...opt);
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		if (opt) {
			opt.class = core.merge.class(opt.class, "card-link");
			super.data = opt;
		}
	}
}

const defaultImgOption = { placement: "top" };
/**
 * opt:{tagoption,imgoption,placement}
 */
export class img extends imgtag {
	constructor(...opt) {
		super(...opt);
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		if (opt) {
			opt = core.extend({}, defaultImgOption, opt);

			opt.class = opt.placement
				? core.merge.class(opt.class, [
						opt.placement === "full" ? "card-img" : null,
						opt.placement === "top" ? "card-img-top" : null,
						opt.placement === "bottom" ? "card-img-bottom" : null,
						opt.placement === "left" ? "img-fluid rounded-start" : null,
						opt.placement === "right" ? "img-fluid rounded-end" : null,
				  ])
				: opt.class;

			delete opt.placement;

			super.data = opt;
		}
	}
}
