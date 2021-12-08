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
	checked: false,

	color: null,
	weight: null,
	disabled: false,
	outline: false,
	hidelabel: false,
	nowarp: false,

	elem: null,
};

/**
 * option : {tagoption,type,label,icon,badge,value,checked,color,weight,disabled,outline,hidelabel,nowarp,elem}
 */
export default class button extends tag {
	constructor(opt) {
		super(opt);
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
					style: bI.style,
				};

				opt.color = opt.color || bI.color;
				opt.textcolor = opt.textcolor || bI.textcolor;
			}

			opt.tag = opt.href ? "a" : "button";
			opt.class = core.merge.class(opt.class, [
				opt.type === "a" ? null : "btn",
				opt.nowarp ? "text-nowarp" : null,
				opt.weight ? `btn-${opt.weight}` : null,
				opt.color ? (opt.outline ? `btn-outline-${opt.color}` : `btn-${opt.color}`) : null,
				opt.badge && typeof opt.badge === "object" && opt.badge.notification ? "position-relative" : null,
			]);

			opt.attr = core.merge.attr(opt.attr, {
				value: opt.value,
				checked: opt.checked,
				role: "button",
				disabled: opt.disabled,
				type: opt.href ? null : opt.type,
				"aria-label": opt.hidelabel && opt.label ? opt.label : null,
				"aria-disabled": opt.href && opt.disabled ? "true" : null,
			});

			opt.elem = opt.elem
				? opt.elem
				: [
						opt.label || opt.icon
							? new label({ icon: opt.icon, label: opt.label, hidelabel: opt.hidelabel })
							: null,
						opt.badge ? new badge(opt.badge) : null,
				  ];

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
			delete opt.nowarp;

			super.data = opt;
		}
	}
}
