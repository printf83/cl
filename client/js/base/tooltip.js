import * as core from "./core.js";
import tag from "./tag.js";

const defaultOption = {
	elem: null,
	title: null,
	msg: null,
	type: null,
	placement: "top",
	trigger: "focus",
};
/**
 * elem, msg
 * elem, opt : {attr,title,msg,type,placement,trigger}
 */
export default class tooltip extends tag {
	constructor(opt) {
		super(opt);
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		if (opt && opt.elem) {
			opt = core.extend({}, defaultOption, opt);

			let tmp = opt.elem.data;
			tmp.attr = core.merge.attr(tmp.attr, {
				title: opt.type === "popover" ? opt.title : opt.msg,
				"data-bs-toggle": opt.type,
				"data-bs-content": opt.type === "popover" ? opt.msg : null,
				"data-bs-trigger": opt.type === "popover" ? opt.trigger : null,
				"data-bs-placement": opt.type ? opt.placement : null,
				"data-bs-html": opt.type && core.isHTML(opt.msg) ? "true" : null,
			});

			super.data = tmp;
		} else {
			super.data = null;
		}
	}
}
