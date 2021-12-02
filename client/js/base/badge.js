"use strict";
import * as core from "./core.js";
import label from "./label.js";
import span from "./span.js";

/**
 * opt : {tagoption,icon,label,elem,asst,notification,pill,color}
 */
export default class badge extends span {
	constructor(opt) {
		super(
			core.extend(
				{},
				{
					icon: null,

					label: null,
					elem: null,
					asst: null,

					notification: false,
					pill: false,
					color: "secondary",
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
			opt.class = core.merge.class(opt.class, [
				"badge",
				opt.pill ? "rounded-pill" : null,
				opt.notification ? "position-absolute top-0 start-100 translate-middle" : null,
				!opt.label && !opt.icon ? "rounded-circle p-2" : null,
			]);

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
		} else {
			super.data = null;
		}
	}
}
