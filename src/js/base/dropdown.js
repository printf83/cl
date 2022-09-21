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

	show: null,
	shown: null,
	hide: null,
	hidden: null,
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

			let dropdown_menu = new ul({
				class: [
					"dropdown-menu",
					opt.dark ? "dropdown-menu-dark" : null,
					core.multiClass(opt.aligment, { format: "dropdown-menu-$1" }),
				],
				elem: new option.dropdown({ item: opt.option, selected: opt.value }),
			});

			let normal_ctl = core.extend({}, opt);

			delete normal_ctl.option;
			delete normal_ctl.container;
			delete normal_ctl.arrow;
			delete normal_ctl.splittoggle;
			delete normal_ctl.aligment;
			delete normal_ctl.offset;
			delete normal_ctl.reference;
			delete normal_ctl.autoclose;
			delete normal_ctl.dark;
			delete normal_ctl.vertical;
			delete normal_ctl.weight;

			delete normal_ctl.show;
			delete normal_ctl.shown;
			delete normal_ctl.hide;
			delete normal_ctl.hidden;

			let split_ctl = core.extend({}, normal_ctl);

			delete normal_ctl.id;

			split_ctl = core.merge(split_ctl, {
				class: "dropdown-toggle",
				"aria-expanded": "false",
				"data-bs-auto-close": opt.autoclose,
				"data-bs-reference": opt.reference,
				"data-bs-offset": opt.offset,
				"data-bs-toggle": "dropdown",
				"aria-labelledby": opt.id,

				"show.bs.dropdown": opt.show,
				"shown.bs.dropdown": opt.shown,
				"hide.bs.dropdown": opt.hide,
				"hidden.bs.dropdown": opt.hidden,
			});

			let btn_main = opt.splittoggle ? new button(normal_ctl) : new button(split_ctl);

			split_ctl.label = "Toggle Dropdown";
			split_ctl.hidelabel = true;
			split_ctl.icon = null;
			split_ctl = core.merge(split_ctl, {
				class: "dropdown-toggle-split",
			});

			let btn_split = opt.splittoggle ? new button(split_ctl) : null;

			if (opt.splittoggle && opt.arrow === "start") {
				super.data = {
					tag: opt.container ? "div" : null,
					class: opt.container ? ["btn-group", opt.container, opt.arrow ? `drop${opt.arrow}` : null] : null,
					elem: [
						new btngroup({
							weight: opt.weight,
							vertical: opt.vertical,
							elem: [btn_split, dropdown_menu],
						}),
						btn_main,
					],
				};
			} else {
				super.data = {
					tag: opt.container ? "div" : null,
					class: opt.container ? [opt.container, opt.arrow ? `drop${opt.arrow}` : null] : null,
					elem: [btn_main, btn_split, dropdown_menu],
				};
			}
		}
	}
}
