"use strict";
import * as core from "./core.js";
import button from "./button.js";

/**
 * opt : {tagoption,label,dismiss,dark}
 */
export default class btnclose extends button {
	constructor(opt) {
		super(
			core.extend(
				{},
				{
					label: "Close",
					dismiss: null,
					dark: true,
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
			opt.type = "button";
			opt.class = core.merge.class(opt.class, ["btn-close", !opt.dark ? "btn-close-white" : null]);
			opt.attr = core.merge.attr(opt.attr, {
				"data-bs-dismiss": opt.dismiss,
				"aria-label": opt.label,
			});

			delete opt.dismiss;
			delete opt.label;
			delete opt.dark;

			super.data = opt;
		} else {
			super.data = null;
		}
	}
}
