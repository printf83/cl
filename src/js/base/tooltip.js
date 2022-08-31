import * as core from "./core.js";
import tag from "./tag.js";

const defaultOption = {
	elem: null,
	title: null,
	msg: null,
	type: null,
	placement: "top",
	trigger: "focus",

	// unsupported. will check later - 20220831
	// onshow: null,
	// onshown: null,
	// onhide: null,
	// onhidden: null,
	// oninserted: null,
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
				tmp.attr = core.merge.attr(tmp.attr, {
					title: opt.type === "popover" ? opt.title : opt.msg,
					"data-bs-toggle": opt.type,
					"data-bs-content": opt.type === "popover" ? opt.msg : null,
					"data-bs-trigger": opt.type === "popover" ? opt.trigger : null,
					"data-bs-placement": opt.placement ? opt.placement : null,
					"data-bs-html": opt.type && core.isHTML(opt.msg) ? "true" : null,

					// unsupported. will check later - 20220831
					// "show.bs.tooltip": opt.onshow,
					// "shown.bs.tooltip": opt.onshown,
					// "hide.bs.tooltip": opt.onhide,
					// "hidden.bs.tooltip": opt.onhidden,
					// "inserted.bs.tooltip": opt.oninserted,
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
