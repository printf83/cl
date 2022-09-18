"use strict";
import * as core from "./core.js";
import tag from "./tag.js";
import label from "./label.js";
import li from "./li.js";
import span from "./span.js";
import hr from "./hr.js";
import h from "./h.js";

const defaultOption = {
	item: null,
	selected: null,
};
const defaultSelectItemOption = {
	tag: "option",
	value: null,
	label: null,
	selected: false,
};
const defaultSelectGroupOption = {
	tag: "optgroup",
	label: null,
};
/**
 * opt : {tagoption,item : {selectitem},selected}
 * selectitem : [string]|[{tagoption,elem,value,label,icon,active,disabled,interactive}]
 */
export class select extends tag {
	constructor(...opt) {
		super(...opt);
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		if (opt) {
			opt = core.extend({}, defaultOption, opt);

			opt.selected = Array.isArray(opt.selected) ? opt.selected : [opt.selected];
			opt.item = Array.isArray(opt.item) ? opt.item : [opt.item];

			let gitem = null;
			let item = {};
			let items = [];
			for (let i = 0; i < opt.item.length; i++) {
				if (opt.item[i] === null || typeof opt.item[i] === "string") {
					item = {
						tag: "option",
						value: opt.item[i],
						selected: opt.selected?.includes(opt.item[i]),
						elem: opt.item[i],
					};

					if (gitem !== null) {
						gitem.elem.push(new tag(item));
					} else {
						items.push(new tag(item));
					}
				} else {
					if (opt.item[i].value === "-" && opt.item[i].label) {
						if (gitem !== null) {
							items.push(new tag(gitem));
							gitem = {};
						}

						gitem = core.extend({}, defaultSelectGroupOption, opt.item[i]);
						gitem.elem = [];

						delete gitem.value;
						delete gitem.label;
						delete gitem.selected;
					} else {
						item = core.extend({}, defaultSelectItemOption, opt.item[i]);

						item = core.merge(item, {
							value: item.value,
							selected: opt.selected?.includes(item.value),
						});
						item.elem = item.label;

						delete item.value;
						delete item.label;
						delete item.selected;

						if (gitem !== null) {
							gitem.elem.push(new tag(item));
						} else {
							items.push(new tag(item));
						}
					}
				}
			}

			if (gitem !== null) {
				items.push(new tag(gitem));
			}

			opt.elem = items;

			delete opt.item;
			delete opt.selected;

			super.data = opt;
		}
	}
}

const defaultDropdownItemOption = {
	value: null,
	label: null,
	icon: null,
	iconafter: false,
	showlabel: null,

	active: false,
	disabled: false,
	interactive: true,
};
/**
 * opt : {tagoption,item : dropdownitem,selected}
 * dropdownitem : [string]|[{tagoption,elem,value,label,icon,active,disabled,interactive}]
 */
export class dropdown extends tag {
	constructor(...opt) {
		super(...opt);
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		if (opt) {
			opt = core.extend({}, defaultOption, opt);

			opt.selected = Array.isArray(opt.selected) ? opt.selected : [opt.selected];
			opt.item = Array.isArray(opt.item) ? opt.item : [opt.item];
			opt.elem = opt.item.map((i) => {
				if (typeof i === "string") {
					return new li({
						elem: new span({
							class: ["dropdown-item", opt.selected?.includes(i) ? "active" : null],
							elem: new label({
								label: i,
							}),
						}),
					});
				} else {
					i = core.extend({}, defaultDropdownItemOption, i);

					if (i.value === "-") {
						if (i.label) {
							i.elem = new h({
								level: 6,
								class: "dropdown-header",
								elem: new label({ icon: i.icon, label: i.label }),
							});
						} else {
							i.elem = new hr({ class: "dropdown-divider" });
						}
					} else {
						if (!i.elem) {
							i.elem = new tag({
								tag: i.href ? "a" : i.interactive ? "button" : "span",
								class: [
									i.interactive ? "dropdown-item" : "dropdown-item-text",
									i.disabled ? "disabled" : null,
									i.active === true || (i.value && opt.selected?.includes(i.value)) ? "active" : null,
								],
								href: i.href,
								click: i.click,
								type: !i.href && i.interactive ? "button" : null,
								elem: new label({
									label: i.label,
									icon: i.icon,
									iconafter: i.iconafter,
									showlabel: i.showlabel,
								}),
							});
						}
					}

					delete i.value;
					delete i.label;
					delete i.icon;
					delete i.active;
					delete i.disabled;
					delete i.interactive;

					return new li(i);
				}
			});

			delete opt.selected;

			super.data = opt;
		}
	}
}
