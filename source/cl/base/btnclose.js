"use strict";

//disable this if you not using webpack
// import css1 from "./css/btnclose.style-1.css";
import css2 from "./css/btnclose.style-2.css";
// import css3 from "./css/btnclose.style-3.css";
//-------------------------------------

import * as core from "./core.js";
import button from "./button.js";
import div from "./div.js";

const defaultOption = { label: "Close", dismiss: null, dark: true, disabled: false };

export default class btnclose extends div {
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

			delete opt.dismiss;
			delete opt.label;
			delete opt.dark;

			super.data = {
				// tag: "div",
				class: "cl-btn-close-container",
				elem: new button(opt),
			};
			// super.data = opt;
		}
	}
}
