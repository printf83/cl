"use strict";
import * as core from "./core.js";
import a from "./a.js";
import h from "./h.js";
import p from "./p.js";
import div from "./div.js";
import imgtag from "./img.js";

const defaultContainerOption = { flush: false };
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

			if (opt.flush) {
				opt.rounded = false;
				opt.border = false;
			}

			opt = core.merge(opt, {
				class: "card",
			});

			delete opt.flush;

			super.data = opt;
		}
	}
}
export class header extends div {
	constructor(...opt) {
		super(...opt);
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		if (opt) {
			opt = core.merge(opt, { class: "card-header" });
			super.data = opt;
		}
	}
}
export class body extends div {
	constructor(...opt) {
		super(...opt);
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		if (opt) {
			opt = core.merge(opt, { class: "card-body" });
			super.data = opt;
		}
	}
}
export class footer extends div {
	constructor(...opt) {
		super(...opt);
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		if (opt) {
			opt = core.merge(opt, { class: "card-footer" });
			super.data = opt;
		}
	}
}
export class group extends div {
	constructor(...opt) {
		super(...opt);
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		if (opt) {
			opt = core.merge(opt, { class: "card-group" });
			super.data = opt;
		}
	}
}
const defaultTitleOption = { level: 5 };
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
			opt = core.merge(opt, { class: "card-title" });
			super.data = opt;
		}
	}
}

const defaultSubtitleOption = { level: 6, marginBottom: 2 };
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
			opt = core.merge(opt, { class: "card-subtitle" });
			super.data = opt;
		}
	}
}
export class text extends p {
	constructor(...opt) {
		super(...opt);
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		if (opt) {
			opt = core.merge(opt, { class: "card-text" });
			super.data = opt;
		}
	}
}
export class imgoverlay extends div {
	constructor(...opt) {
		super(...opt);
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		if (opt) {
			opt = core.merge(opt, { class: "card-img-overlay" });
			super.data = opt;
		}
	}
}

const defaultHorizontalOption = { left: null, right: null, size: "auto", gap: 0 };
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

			opt.row = true;
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

export class link extends a {
	constructor(...opt) {
		super(...opt);
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		if (opt) {
			opt = core.merge(opt, { class: "card-link" });
			super.data = opt;
		}
	}
}

const defaultImgOption = { placement: "top" };
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

			opt = core.merge(opt, {
				class: opt.placement
					? [
							opt.placement === "full" ? "card-img" : null,
							opt.placement === "top" ? "card-img-top" : null,
							opt.placement === "bottom" ? "card-img-bottom" : null,
							opt.placement === "left" ? "img-fluid rounded-end-0" : null,
							opt.placement === "right" ? "img-fluid rounded-start-0" : null,
							opt.placement === "middle" ? "card-img rounded-0" : null,
					  ]
					: opt.class,
			});

			delete opt.placement;

			super.data = opt;
		}
	}
}
