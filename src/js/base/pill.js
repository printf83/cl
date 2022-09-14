"use strict";
import * as core from "./core.js";
import * as inputgroup from "./inputgroup.js";
import div from "./div.js";
import small from "./small.js";
import tooltip from "./tooltip.js";
import icon from "./icon.js";

const defaultOption = { icon: null, label: null, title: null, color: null, elem: null, weight: "sm" };
/**
 * opt : {tagoption,icon,label}
 */
export default class pill extends div {
	constructor(...opt) {
		super(...opt);
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		opt = core.extend({}, defaultOption, opt);

		let bI = core.getBaseIcon(opt.icon);

		if (bI) {
			opt.color = opt.color || bI.color;
			opt.icon = { icon: bI.icon, type: bI.type };
		}

		opt.color = opt.color || "primary";

		let elem = new inputgroup.container({
			class: core.merge.class(opt.class, "cl-pill"),
			weight: opt.weight,
			elem: [
				new inputgroup.text({
					border: false,
					color: opt.color,
					textcolor: opt.color,
					coloropacity: 25,
					paddingx: 2,
					paddingy: 1,
					elem: opt.icon ? new icon(opt.icon) : opt.title ? new small(opt.title) : null,
				}),
				new inputgroup.text({
					border: false,
					color: opt.color,
					textcolor: opt.textcolor,
					paddingx: 2,
					paddingy: 1,
					elem: opt.elem || new small(opt.label),
				}),
			],
		});

		opt.elem =
			opt.icon && opt.title
				? new tooltip({ type: "tooltip", placement: "top", msg: opt.title, elem: elem })
				: elem;

		delete opt.weight;
		delete opt.icon;
		delete opt.label;
		delete opt.color;
		delete opt.class;

		super.data = opt;
	}
}
