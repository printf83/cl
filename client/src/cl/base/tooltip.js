import * as core from "./core.js";
import tag from "./tag.js";

const defaultOption = {
	elem: null,
	msg: null,
	placement: "top",

	show: null,
	shown: null,
	hide: null,
	hidden: null,
	inserted: null,
};

export default class tooltip extends tag {
	constructor(...opt) {
		super(...opt);
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		if (opt && opt.elem) {
			if (opt.elem.hasOwnProperty("cl")) {
				opt = core.extend({}, defaultOption, opt);

				let tmp = opt.elem.data;

				tmp = core.merge(tmp, {
					"data-bs-toggle": "tooltip",
					"data-bs-html": core.isHTML(opt.msg) ? "true" : null,
					title: opt.msg,
					"data-bs-placement": opt.placement,
					"show.bs.tooltip": opt.show,
					"shown.bs.tooltip": opt.shown,
					"hide.bs.tooltip": opt.hide,
					"hidden.bs.tooltip": opt.hidden,
					"inserted.bs.tooltip": opt.inserted,
				});

				super.data = tmp;
			} else {
				console.error("Tooltip unsupported element", opt.elem);
				super.data = null;
			}
		} else {
			super.data = null;
		}
	}
}
