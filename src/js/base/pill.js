"use strict";
import * as core from "./core.js";
import * as inputgroup from "./inputgroup.js";
import div from "./div.js";
import small from "./small.js";
import tooltip from "./tooltip.js";
import icon from "./icon.js";

const defaultOption = { icon: null, label: null, title: null, color: null, elem: null, weight: "sm", viewport: null };
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

		if (opt.viewport && opt.elem === null) {
			opt.elem = [
				new small("d-inline d-sm-none", "XS"),
				new small("d-none d-sm-inline d-md-none", "SM"),
				new small("d-none d-md-inline d-lg-none", "MD"),
				new small("d-none d-lg-inline d-xl-none", "LG"),
				new small("d-none d-xl-inline d-xxl-none", "XL"),
				new small("d-none d-xxl-inline", "XXL"),
			];
		}

		opt = core.merge(opt, { class: "cl-pill" });

		let elem = new inputgroup.container({
			class: opt.class,
			weight: opt.weight,
			elem: [
				new inputgroup.text({
					border: false,
					bgColor: opt.color,
					textColor: opt.color,
					bgOpacity: 25,
					paddingX: 2,
					paddingY: 1,
					elem: opt.icon ? new icon(opt.icon) : opt.title ? new small(opt.title) : null,
				}),
				new inputgroup.text({
					border: false,
					bgColor: opt.color,
					textBgColor: opt.color,
					paddingX: 2,
					paddingY: 1,
					elem: opt.elem || new small(opt.label),
				}),
			],
		});

		opt.elem =
			opt.icon && opt.title
				? new tooltip({ type: "tooltip", placement: "top", msg: opt.title, elem: elem })
				: elem;

		delete opt.viewport;
		delete opt.weight;
		delete opt.icon;
		delete opt.label;
		delete opt.color;

		super.data = opt;
	}
}
