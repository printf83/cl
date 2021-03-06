"use strict";
import * as core from "./core.js";
import div from "./div.js";

const defaultContainerOption = {
	height: null,
	item: null,
};
/**
 * opt : {tagoption,height,item : {baritem}}
 * baritem : {tagoption,label,stripe,animated,min,max,value}
 */
export class container extends div {
	constructor(...opt) {
		super(...opt);
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		if (opt) {
			opt = core.extend({}, defaultContainerOption, opt);

			opt.class = core.merge.class(opt.class, "progress");
			opt.style = core.merge.style(opt.style, {
				height: opt.height > 0 ? `${opt.height}px` : null,
			});

			opt.item = opt.item ? (Array.isArray(opt.item) ? opt.item : [opt.item]) : null;

			opt.elem = opt.elem
				? opt.elem
				: opt.item
				? opt.item.map(function (i) {
						return i.hasOwnProperty("cl") ? i : new bar(i);
				  })
				: null;

			delete opt.height;
			delete opt.item;

			super.data = opt;
		}
	}
}

const defaultBarOption = {
	label: false,
	stripe: false,
	animated: false,
	min: 0,
	max: 100,
	value: 0,
};

/**
 * opt : {tagoption,label,stripe,animated,min,max,value}
 */
export class bar extends div {
	constructor(...opt) {
		super(...opt);
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		if (opt) {
			opt = core.extend({}, defaultBarOption, opt);

			if (opt.value > opt.max) {
				opt.value = opt.max;
			}

			if (opt.value < opt.min) {
				opt.value = opt.min;
			}

			let percent = opt.max - opt.min > 0 ? parseInt((opt.value / (opt.max - opt.min)) * 100, 10) : 0;

			opt.class = core.merge.class(opt.class, [
				"progress-bar",
				opt.stripe ? "progress-bar-striped" : null,
				opt.animated ? "progress-bar-animated" : null,
			]);

			opt.attr = core.merge.attr(opt.attr, {
				role: "progressbar",
				"aria-valuenow": opt.value,
				"aria-valuemin": opt.min,
				"aria-valuemax": opt.max,
			});

			opt.style = core.merge.style(opt.style, {
				width: `${percent}%`,
			});
			opt.elem = opt.label ? `${percent}%` : " ";

			delete opt.max;
			delete opt.min;
			delete opt.animated;
			delete opt.stripe;
			delete opt.label;

			super.data = opt;
		}
	}
}
