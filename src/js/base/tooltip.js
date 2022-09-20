import * as core from "./core.js";
import tag from "./tag.js";

const defaultOption = {
	elem: null,
	title: null,
	msg: null,
	type: null,
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
					title: opt.type === "popover" ? opt.title : opt.msg,
					"data-bs-toggle": opt.type,
					"data-bs-content": opt.type === "popover" ? opt.msg : null,
					"data-bs-trigger": opt.type === "popover" ? opt.trigger : null,
					"data-bs-placement": opt.placement ? opt.placement : null,
					"data-bs-html": opt.type && core.isHTML(opt.msg) ? "true" : null,
				});

				if (opt.type === "popover") {
					tmp = core.merge(tmp, {
						"show.bs.popover": opt.show,
						"shown.bs.popover": opt.shown,
						"hide.bs.popover": opt.hide,
						"hidden.bs.popover": opt.hidden,
						"inserted.bs.popover": opt.inserted,
					});
				} else {
					tmp = core.merge(tmp, {
						"show.bs.tooltip": opt.show,
						"shown.bs.tooltip": opt.shown,
						"hide.bs.tooltip": opt.hide,
						"hidden.bs.tooltip": opt.hidden,
						"inserted.bs.tooltip": opt.inserted,
					});
				}

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
