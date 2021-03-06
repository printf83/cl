"use strict";
import * as core from "./core.js";
import label from "./label.js";
import span from "./span.js";

const defaultOption = {
	icon: null,

	label: null,
	elem: null,
	asst: null,

	notification: false,
	pill: false,
	color: "danger",
};

/**
 * opt : {tagoption,icon,label,elem,asst,notification,pill,color}
 */
export default class badge extends span {
	constructor(...opt) {
		super(...opt);
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		if (opt) {
			opt = core.extend({}, defaultOption, opt);

			opt.rounded = opt.rounded || (opt.pill ? "pill" : null);
			opt.rounded = !opt.label && !opt.icon ? "circle" : opt.rounded;
			opt.padding = !opt.label && !opt.icon ? 2 : null;
			opt.borderweight = opt.borderweight || opt.notification ? 2 : null;
			opt.bordercolor = opt.bordercolor || opt.notification ? "white" : null;

			opt.class = core.merge.class(opt.class, ["badge"]);

			if (opt.notification) {
				opt.top = "0";
				opt.start = "100";
				opt.tmiddle = true;
			}

			opt.position = opt.notification ? "absolute" : null;

			opt.elem = [
				opt.label || opt.icon
					? new label({
							label: opt.label,
							icon: opt.icon,
					  })
					: opt.elem,
				opt.asst
					? new span("visually-hidden", opt.asst)
					: !opt.label && !opt.icon
					? new span("Notification", opt.asst)
					: null,
			];

			delete opt.label;
			delete opt.icon;
			delete opt.notification;
			delete opt.pill;

			super.data = opt;
		}
	}
}
