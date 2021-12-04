"use strict";
import * as core from "./core.js";
import tag from "./tag.js";
import span from "./span.js";
import icon from "./icon.js";

/**
 * opt : {tagoption,for,elem,icon,label,hidelabel}
 */
export default class label extends tag {
	constructor(opt) {
		super(
			core.extend(
				{},
				{
					tag: "label",
					for: null,
					icon: null,
					elem: null,
					label: null,
					hidelabel: false,
				},
				opt
			)
		);
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		if (opt) {
			opt.attr = core.merge.attr(opt.attr, {
				for: opt.for,
			});
			opt.elem = opt.elem || [
				opt.icon
					? new span({ class: opt.label && !opt.hidelabel ? "me-2" : null, elem: new icon(opt.icon) })
					: null,
				opt.label
					? opt.hidelabel
						? new span({ class: "visually-hidden", elem: opt.label })
						: opt.label
					: null,
			];

			delete opt.for;
			delete opt.icon;
			delete opt.label;

			super.data = opt;
		}
	}
}
