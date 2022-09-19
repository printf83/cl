"use strict";
import * as core from "./core.js";
import label from "./label.js";
import span from "./span.js";

const defaultOption = {
	label: null,
	showlabel: null,
	hidelabel: null,
	iconafter: null,
	icon: null,

	notification: false,
	color: "danger",
};

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

			if (opt.notification) {
				opt.top = 0;
				opt.start = 100;
				opt.tMiddle = true;
			}

			if (opt.hidelabel === null && opt.notification === true) {
				opt.hidelabel = true;
			}

			if (!opt.elem) {
				opt.elem =
					opt.label || opt.icon
						? new label({
								showlabel: opt.showlabel,
								hidelabel: opt.hidelabel,
								iconafter: opt.iconafter,
								label: opt.label,
								icon: opt.icon,
						  })
						: null;
			}

			opt = core.merge(opt, {
				class: "badge",
				rounded: opt.rounded || (!opt.label && !opt.icon) ? "circle" : null,
				padding: opt.padding || (!opt.label && !opt.icon) ? 2 : null,
				borderWeight: opt.borderWeight || opt.notification ? 2 : null,
				borderColor: opt.borderColor || opt.notification ? "body" : null,
				position: opt.position || opt.notification ? "absolute" : null,
				bgColor: opt.bgColor || opt.color,
			});

			delete opt.label;
			delete opt.showlabel;
			delete opt.hidelabel;
			delete opt.iconafter;
			delete opt.icon;
			delete opt.notification;
			delete opt.color;

			super.data = opt;
		}
	}
}
