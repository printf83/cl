"use strict";
import * as core from "./core.js";
import tag from "./tag.js";
import span from "./span.js";
import icon from "./icon.js";

function generate(opt) {
	if (opt.elem) {
		return opt.elem;
	} else {
		let i1 = null;
		let i2 = null;
		let i3 = null;

		if (opt.icon && opt.iconafter === false) {
			i1 = new span({
				marginEnd: opt.label && !opt.hidelabel ? (opt.showlabel ? `${opt.showlabel}-2` : 2) : null,
				elem: new icon(opt.icon),
			});
		} else if (opt.icon && opt.iconafter === true) {
			i3 = new span({
				marginStart: opt.label && !opt.hidelabel ? (opt.showlabel ? `${opt.showlabel}-2` : 2) : null,
				elem: new icon(opt.icon),
			});
		}

		if (opt.label) {
			if (opt.hidelabel) {
				i2 = new span({ class: "visually-hidden", elem: opt.label });
			} else {
				if (opt.icon) {
					if (opt.showlabel) {
						i2 = new span({ display: ["none", `${opt.showlabel}-inline`], elem: opt.label });
					} else {
						i2 = opt.label;
					}
				} else {
					i2 = opt.label;
				}
			}
		}

		return [i1, i2, i3].filter(Boolean);
	}
}

const defaultOption = {
	for: null,
	icon: null,
	label: null,
	showlabel: null,
	hidelabel: false,
	iconafter: false,
};
/**
 * opt : {tagoption,for,elem,icon,label,hidelabel}
 */
export default class label extends tag {
	constructor(...opt) {
		super(...opt);
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		if (opt) {
			opt = core.extend({}, defaultOption, opt);

			let generated = generate(opt);

			delete opt.icon;
			delete opt.label;
			delete opt.hidelabel;
			delete opt.showlabel;
			delete opt.iconafter;

			opt.elem = generated;

			if (opt.for) {
				opt.tag = "label";
				super.data = opt;
			} else {
				super.data = opt;
			}
		}
	}
}
