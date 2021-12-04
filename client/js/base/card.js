"use strict";
import * as core from "./core.js";
import a from "./a.js";
import h from "./h.js";
import p from "./p.js";
import div from "./div.js";
import imgtag from "./img.js";

/**
 * opt:{tagoption}
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
			opt.class = core.merge.class(opt.class, "card");
			super.data = opt;
		} else {
			super.data = null;
		}
	}
}
/**
 * opt:{tagoption}
 */
export class header extends div {
	constructor(opt) {
		super(opt);
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		if (opt) {
			opt.class = core.merge.class(opt.class, "card-header");
			super.data = opt;
		} else {
			super.data = null;
		}
	}
}
/**
 * opt:{tagoption}
 */
export class body extends div {
	constructor(opt) {
		super(opt);
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		if (opt) {
			opt.class = core.merge.class(opt.class, "card-body");
			super.data = opt;
		} else {
			super.data = null;
		}
	}
}
/**
 * opt:{tagoption}
 */
export class footer extends div {
	constructor(opt) {
		super(opt);
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		if (opt) {
			opt.class = core.merge.class(opt.class, "card-footer");
			super.data = opt;
		} else {
			super.data = null;
		}
	}
}
/**
 * opt:{tagoption}
 */
export class group extends div {
	constructor(opt) {
		super(opt);
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		if (opt) {
			opt.class = core.merge.class(opt.class, "card-group");
			super.data = opt;
		} else {
			super.data = null;
		}
	}
}
/**
 * opt:{tagoption}
 */
export class title extends h {
	constructor(opt) {
		super(5, opt);
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		if (opt) {
			opt.class = core.merge.class(opt.class, "card-title");
			super.data = opt;
		} else {
			super.data = null;
		}
	}
}
/**
 * opt:{tagoption}
 */
export class subtitle extends h {
	constructor(opt) {
		super(6, opt);
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		if (opt) {
			opt.class = core.merge.class(opt.class, "card-subtitle mb-2");
			super.data = opt;
		} else {
			super.data = null;
		}
	}
}
/**
 * opt:{tagoption}
 */
export class text extends p {
	constructor(opt) {
		super(opt);
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		if (opt) {
			opt.class = core.merge.class(opt.class, "card-text");
			super.data = opt;
		} else {
			super.data = null;
		}
	}
}
/**
 * opt:{tagoption}
 */
export class imgoverlay extends div {
	constructor(opt) {
		super(opt);
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		if (opt) {
			opt.class = core.merge.class(opt.class, "card-img-overlay");
			super.data = opt;
		} else {
			super.data = null;
		}
	}
}
/**
 * opt:{tagoption,left,right,size,gap}
 */
export class horizontal extends div {
	constructor(opt) {
		super(
			core.extend(
				{},
				{
					left: null,
					right: null,
					size: "md-4",
					gap: 0,
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
			opt.class = core.merge.class(opt.class, ["row", opt.gap !== null ? `g-${opt.gap}` : null]);
			opt.elem = [
				new div({
					class: core.multiClass(opt.size, "col-$1", null, "col"),
					elem: opt.left,
				}),
				new div({
					class: "col",
					elem: opt.right,
				}),
			];

			delete opt.left;
			delete opt.right;
			delete opt.size;
			delete opt.gap;

			super.data = opt;
		} else {
			super.data = null;
		}
	}
}

/**
 * opt:{tagoption}
 */
export class link extends a {
	constructor(opt) {
		super(opt);
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		if (opt) {
			opt.class = core.merge.class(opt.class, "card-link");
			super.data = opt;
		} else {
			super.data = null;
		}
	}
}

/**
 * opt:{tagoption,imgoption,placement}
 */
export class img extends imgtag {
	constructor(opt) {
		super(opt);
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		if (opt) {
			opt = core.extend(
				{},
				{
					placement: "top",
				},
				opt
			);

			opt.class = core.merge.class(opt.class, [
				opt.placement === "full" ? "card-img" : null,
				opt.placement === "top" ? "card-img-top" : null,
				opt.placement === "bottom" ? "card-img-bottom" : null,
				opt.placement === "left" ? "img-fluid rounded-start" : null,
				opt.placement === "right" ? "img-fluid rounded-end" : null,
			]);

			delete opt.placement;

			super.data = opt;
		} else {
			super.data = null;
		}
	}
}
