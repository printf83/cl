import * as core from "./core.js";
import tag from "./tag.js";

const defaultOption = {
	elem: null,
	title: null,
	msg: null,
	placement: "top",
	trigger: "focus",

	show: null,
	shown: null,
	hide: null,
	hidden: null,
	inserted: null,
};
/**
 * elem, msg
 * elem, opt : {attr,title,msg,type,placement,trigger}
 */
export default class popover extends tag {
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
					title: opt.title,
					"data-bs-toggle": "popover",
					"data-bs-trigger": opt.trigger,
					"data-bs-content": opt.msg,
					"data-bs-placement": opt.placement,
					"data-bs-html": core.isHTML(opt.msg) ? "true" : null,

					"show.bs.popover": opt.show,
					"shown.bs.popover": opt.shown,
					"hide.bs.popover": opt.hide,
					"hidden.bs.popover": opt.hidden,
					"inserted.bs.popover": opt.inserted,
				});

				super.data = tmp;
			} else {
				console.error("Popover unsupported element", opt.elem);
				super.data = null;
			}
		} else {
			super.data = null;
		}
	}
}
