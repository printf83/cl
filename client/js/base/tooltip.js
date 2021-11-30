import * as core from "./core.js";
import tag from "./tag.js";

/**
 * elem, msg
 * elem, opt : {attr,title,msg,type,placement,trigger}
 */
export default class tooltip extends tag {
	constructor(elem, ...arg) {
		super();

		if (elem && arg && arg.length > 0) {
			let t = {
				msg: null,
			};

			if (arg.length === 1 && typeof arg[0] === "string") {
				t = {
					msg: arg[0],
				};
			} else if (arg.length === 1) {
				t = arg[0];
			} else {
				console.error("Unsupported argument", arg);
			}

			this.data = core.extend(
				{},
				{
					_target: elem,

					attr: null,
					title: null,
					msg: null,
					type: null,
					placement: "top",
					trigger: "focus",
				},
				t
			);
		} else {
			this.data = { _target: elem };
		}
	}

	get data() {
		return super.data;
	}
	set data(d) {
		if (d && d._target) {
			let tmp = d._target.data;
			tmp.attr = core.merge.attr(tmp.attr, {
				title: d.type === "popover" ? d.title : d.msg,
				"data-bs-toggle": d.type,
				"data-bs-content": d.type === "popover" ? d.msg : null,
				"data-bs-trigger": d.type === "popover" ? d.trigger : null,
				"data-bs-placement": d.type ? d.placement : null,
				"data-bs-html": d.type && core.isHTML(d.msg) ? "true" : null,
			});
			super.data = tmp;
		} else {
			super.data = null;
		}
	}
}
