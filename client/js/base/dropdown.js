"use strict";
import * as core from "./core.js";
import tag from "./tag.js";
import button from "./button.js";
import * as option from "./option.js";
import ul from "./ul.js";
import btngroup from "./btngroup.js";

const defaultOption = {
	option: null,
	container: "btn-group",
	arrow: "down",
	splittoggle: false,
	aligment: null,
	offset: null,
	reference: null,
	autoclose: true,
	dark: false,
	vertical: false,
	weight: null,
};

/**
 * opt {...buttonopt,option,container,arrow,splittoggle,aligment,offset,autoclose}
 */
export default class dropdown extends tag {
	constructor(opt) {
		super(opt);
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		if (opt) {
			opt = core.extend({}, defaultOption, opt);

			opt.id = opt.id || core.UUID();
			opt.option = Array.isArray(opt.option) ? opt.option : [opt.option];

			let menuctl = new ul({
				class: ["dropdown-menu", opt.dark ? "dropdown-menu-dark" : null],
				attr: { "aria-labelledby": opt.id },
				elem: new option.dropdown({ item: opt.option, selected: opt.value }),
			});

			let m = core.extend({}, opt);

			delete m.option;
			delete m.container;
			delete m.arrow;
			delete m.splittoggle;
			delete m.aligment;
			delete m.offset;
			delete m.reference;
			delete m.autoclose;
			delete m.dark;

			let s = core.extend({}, m);

			delete m.id;

			s.class = core.merge.class(s.class, "dropdown-toggle");
			s.attr = core.merge.attr(s.attr, {
				"aria-expanded": "false",
				"data-bs-auto-close": opt.autoclose,
				"data-bs-reference": opt.reference,
				"data-bs-offset": opt.offset,
				"data-bs-toggle": "dropdown",
			});

			let btnctl = opt.splittoggle ? new button(m) : new button(s);

			let t = core.extend({}, s);
			t.label = "Toggle Dropdown";
			t.hidelabel = true;
			t.icon = null;
			t.class = core.merge.class(t.class, "dropdown-toggle-split");

			let splitctl = opt.splittoggle ? new button(t) : null;

			if (opt.splittoggle && opt.arrow === "start") {
				super.data = {
					tag: opt.container ? "div" : null,
					class: opt.container ? ["btn-group", opt.container, opt.arrow ? `drop${opt.arrow}` : null] : null,
					elem: [
						new btngroup({
							weight: opt.weight,
							vertical: opt.vertical,
							elem: [splitctl, menuctl],
						}),
						btnctl,
					],
				};
			} else {
				super.data = {
					tag: opt.container ? "div" : null,
					class: opt.container ? [opt.container, opt.arrow ? `drop${opt.arrow}` : null] : null,
					elem: [btnctl, splitctl, menuctl],
				};
			}
		}
	}
}
