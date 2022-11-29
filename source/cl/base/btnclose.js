"use strict";

//disable this if you not using webpack
import css1 from "./css/btnclose.style-1.css";
import css2 from "./css/btnclose.style-2.css";
import css3 from "./css/btnclose.style-3.css";
//-------------------------------------

import * as core from "./core.js";
import button from "./button.js";
import tag from "./tag.js";

const defaultOption = { label: "Close", dismiss: null, dark: true, disabled: false, style: 1 };

export default class btnclose extends tag {
	constructor(opt) {
		super(core.extend({}, defaultOption, opt));
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		if (opt) {
			opt = core.extend({}, defaultOption, opt);

			opt = core.merge(opt, {
				class: ["btn-close", !opt.dark ? "btn-close-white" : null],
				"data-bs-dismiss": opt.dismiss,
				"aria-label": opt.label,
			});

			let style = opt.style;

			delete opt.dismiss;
			delete opt.label;
			delete opt.dark;
			delete opt.style;

			if (style > 0) {
				super.data = {
					tag: "div",
					class: `cl-btn-close-container s${style}`,
					elem: new button(opt),
				};
			} else {
				opt.tag = "button";
				super.data = opt;
			}
		}
	}
}
