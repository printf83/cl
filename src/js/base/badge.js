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
			opt = core.merge(opt, {
				class: "badge",
				rounded: !opt.label && !opt.icon ? "circle" : opt.rounded,
				padding: !opt.label && !opt.icon ? 2 : null,
				borderWeight: opt.borderWeight || opt.notification ? 2 : null,
				borderColor: opt.borderColor || opt.notification ? "white" : null,
				position: opt.notification ? "absolute" : null,
				elem: [
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
				],
			});

			delete opt.label;
			delete opt.icon;
			delete opt.notification;
			delete opt.pill;

			super.data = opt;
		}
	}
}
