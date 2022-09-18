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
	reference: undefined,
	autoclose: true,
	color: null,
	dark: null,
	vertical: false,
	weight: null,

	onshow: null,
	onshown: null,
	onhide: null,
	onhidden: null,
};

/**
 * opt {...buttonopt,option,container,arrow,splittoggle,aligment,offset,autoclose}
 */
export default class dropdown extends tag {
	cldropdown = 1;

	constructor(...opt) {
		super(...opt);
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		if (opt) {
			opt = core.extend({}, defaultOption, opt);

			opt.id = opt.id || core.UUID();

			if (opt.splittoggle && opt.reference === undefined) {
				opt.reference = "parent";
			}

			opt.option = Array.isArray(opt.option) ? opt.option : [opt.option];

			let menuctl = new ul({
				class: ["dropdown-menu", opt.dark ? "dropdown-menu-dark" : null],
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

			delete m.onshow;
			delete m.onshown;
			delete m.onhide;
			delete m.onhidden;

			let s = core.extend({}, m);

			delete m.id;

			s = core.merge(s, {
				class: "dropdown-toggle",
				"aria-expanded": "false",
				dataBsAutoClose: opt.autoclose,
				dataBsReference: opt.reference,
				dataBsOffset: opt.offset,
				"data-bs-toggle": "dropdown",

				"aria-labelledby": opt.id,

				"show.bs.dropdown": opt.onshow,
				"shown.bs.dropdown": opt.onshown,
				"hide.bs.dropdown": opt.onhide,
				"hidden.bs.dropdown": opt.onhidden,
			});

			let btnctl = opt.splittoggle ? new button(m) : new button(s);

			let t = core.extend({}, s);

			t.label = "Toggle Dropdown";
			t.hidelabel = true;
			t.icon = null;
			t = core.merge(t, {
				class: "dropdown-toggle-split",
			});

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
