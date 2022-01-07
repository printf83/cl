"use strict";
import * as core from "./core.js";
import tag from "./tag.js";
import span from "./span.js";
import icon from "./icon.js";

function generate(opt) {
	if (opt.elem) {
		return opt.elem;
	} else {
		return [
			!opt.iconafter
				? opt.icon
					? new span({
							marginend: opt.label && !opt.hidelabel ? (opt.showlabel ? `${opt.showlabel}-2` : 2) : null,
							elem: new icon(opt.icon),
					  })
					: null
				: null,
			opt.label
				? opt.hidelabel
					? new span({ class: "visually-hidden", elem: opt.label })
					: opt.icon
					? opt.showlabel
						? new span({ display: ["none", `${opt.showlabel}-inline`], elem: opt.label })
						: opt.label
					: opt.label
				: null,
			opt.iconafter
				? opt.icon
					? new span({
							marginstart:
								opt.label && !opt.hidelabel ? (opt.showlabel ? `${opt.showlabel}-2` : 2) : null,
							elem: new icon(opt.icon),
					  })
					: null
				: null,
		];
	}
}

const defaultOption = {
	tag: "label",
	for: null,
	icon: null,
	elem: null,
	label: null,
	showlabel: null,
	hidelabel: false,
	iconafter: false,
};
/**
 * opt : {tagoption,for,elem,icon,label,hidelabel}
 */
export default class extends tag {
	constructor(...opt) {
		super(...opt);
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		if (opt) {
			opt = core.extend({}, defaultOption, opt);

			if (opt.for) {
				opt.attr = core.merge.attr(opt.attr, {
					for: opt.for,
				});

				opt.elem = generate(opt);

				delete opt.for;
				delete opt.icon;
				delete opt.label;
				delete opt.hidelabel;
				delete opt.showlabel;
				delete opt.iconafter;

				super.data = opt;
			} else {
				super.data = { elem: generate(opt) };
			}
		}
	}
}
