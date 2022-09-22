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

			let t_padding = 2;
			if (opt.padding) {
				t_padding = opt.padding;
			} else {
				if (opt.label && opt.hidelabel !== true && opt.notification) {
					t_padding = 1;
				}
			}

			opt = core.merge(opt, {
				class: "badge",
				rounded: opt.rounded,
				padding: t_padding,
				borderWidth: opt.borderWeight || opt.notification ? 2 : null,
				borderColor: opt.borderColor || opt.notification ? "white" : null,
				position: opt.position || opt.notification ? "absolute" : null,
				bgColor: opt.bgColor || opt.color,
				zIndex: opt.notification ? 2 : null,
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
