"use strict";
import * as core from "./core.js";
import tag from "./tag.js";
import div from "./div.js";
import button from "./button.js";

const defaultToggleOption = {
	elem: null,

	target: null,
	show: false,

	toggle: "collapse", //collapse | offcanvas
};

/**
 * opt: {tagoption,elem,target,show,toggle}
 */
export class toggle extends tag {
	constructor(...opt) {
		super(...opt);
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		if (opt) {
			opt = core.extend({}, defaultToggleOption, opt);

			if (!opt.elem) {
				opt.elem = new button({
					icon: "bars",
				});
			}

			let t = opt.elem.data;
			t.class = core.merge.class(t.class, [
				opt.toggle === "collapse" ? "btn-toggle" : null,
				opt.show && opt.toggle === "collapse" ? "collapsed" : null,
			]);
			t.attr = core.merge.attr(t.attr, {
				"aria-controls": opt.target,
				"aria-expanded": opt.show ? "true" : "false",
				"data-bs-target": opt.target,
				"data-bs-toggle": opt.toggle,
			});

			super.data = t;
		}
	}
}

const defaultContainerOption = {
	elem: null,
	id: null,
	class: null,
	show: false,
};

/**
 * opt: {tagoption,elem,id,show}
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

			if (!opt.elem) {
				opt.elem = new div({ elem: "" });
			}

			let t = opt.elem.data;

			t.class = core.merge.class(opt.class, core.merge.class(t.class, ["collapse", opt.show ? "show" : null]));
			t.id = t.id || opt.id;

			super.data = t;
		}
	}
}
