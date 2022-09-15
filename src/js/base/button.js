"use strict";
import * as core from "./core.js";
import tag from "./tag.js";
import label from "./label.js";
import badge from "./badge.js";

const defaultOption = {
	tag: "button",

	type: "button",
	label: null,
	icon: null,
	badge: null,
	value: null,

	toggle: false,
	checked: false,
	autofocus: null,

	color: null,
	textbg: null,
	weight: null,
	disabled: false,
	outline: false,
	hidelabel: false,
	showlabel: null,
	iconafter: false,
	nowrap: false,
	floating: false,

	placeholder: null,

	elem: null,
};

/**
 * option : {tagoption,type,label,icon,badge,value,checked,color,weight,disabled,outline,hidelabel,nowrap,elem}
 */
export default class button extends tag {
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
				opt.icon = {
					icon: bI.icon,
					type: bI.type,
				};

				opt.color = opt.color || bI.color;
			}

			if (opt.placeholder) {
				opt.disabled = true;
			}

			if (opt.type === "checkbox" || opt.type === "radio") {
				opt.outline = true;
			}

			opt.tag = opt.href ? "a" : opt.color || opt.outline || opt.weight ? "button" : "div";
			opt.class = core.merge.class(opt.class, [
				opt.type === "a" ? "text-decoration-none" : opt.color || opt.outline || opt.weight ? "btn" : null,
				opt.nowrap ? "text-nowrap" : null,
				opt.weight ? `btn-${opt.weight}` : null,
				opt.color ? (opt.outline ? `btn-outline-${opt.color}` : `btn-${opt.color}`) : null,
				opt.toggle && opt.active ? "active" : null,
				opt.floating ? "btn-floating" : null,
			]);

			opt.position = opt.position
				? opt.position
				: opt.badge && typeof opt.badge === "object" && opt.badge.notification
				? "relative"
				: null;

			opt.attr = core.merge.attr(opt.attr, {
				value: opt.value,
				checked: opt.checked,
				role: opt.href || opt.type !== "button" ? "button" : null,
				disabled: opt.disabled,
				type: opt.href || opt.type === "checkbox" || opt.type === "radio" ? null : opt.type,
				"data-bs-toggle": opt.toggle ? "button" : null,
				autocomplete: opt.toggle ? "off" : null,
				autofocus: opt.autofocus,
				"aria-pressed": opt.toggle && opt.active ? "true" : null,
				"aria-label": opt.hidelabel && opt.label ? opt.label : null,
				"aria-disabled": opt.href && opt.disabled ? "true" : null,
			});

			let m = null;
			if (opt.type === "checkbox" || opt.type === "radio") {
				m = core.extend({}, opt);
				m.id = m.id || core.UUID();
				opt.id = m.id;

				m.tag = "input";
				m.class = "btn-check";
				m.attr = core.merge.attr(m.attr, {
					autocomplete: "off",
					type: m.type,
				});

				m = new tag(m);

				opt.tag = "label";
				opt.attr = core.merge.attr(opt.attr, { for: opt.id });
				opt.elem = [
					new label({ icon: opt.icon, label: opt.label, hidelabel: opt.hidelabel }),
					opt.badge ? new badge(opt.badge) : null,
				];

				delete opt.id;
				delete opt.name;
			} else {
				opt.elem = opt.elem
					? opt.elem
					: [
							opt.label || opt.icon
								? new label({
										icon: opt.icon,
										label: opt.label,
										hidelabel: opt.hidelabel,
										showlabel: opt.showlabel,
										iconafter: opt.iconafter,
								  })
								: null,
							opt.badge ? new badge(opt.badge) : null,
					  ];
			}

			delete opt.type;
			delete opt.label;
			delete opt.icon;
			delete opt.badge;
			delete opt.value;
			delete opt.checked;

			delete opt.color;
			delete opt.weight;
			delete opt.disabled;
			delete opt.outline;
			delete opt.hidelabel;
			delete opt.showlabel;
			delete opt.iconafter;
			delete opt.nowrap;
			delete opt.floating;

			if (m) {
				super.data = {
					elem: [m, new tag(opt)],
				};
			} else {
				super.data = opt;
			}
		}
	}
}
