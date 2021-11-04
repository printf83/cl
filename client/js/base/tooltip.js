import * as core from "./core.js";
import attr from "./attr.js";
import tag from "./tag.js";

/**
 * elem, msg
 * elem, opt : {attr,title,msg,type,placement,trigger}
 */
export default class tooltip extends tag {
	constructor(elem, ...arg) {
		super();

		if (elem) {
			this.elem = elem;
		} else {
			this.elem = null;
		}

		if (arg && arg.length > 0) {
			let t = {
				msg: null,
			};

			if (arg.length === 1 && typeof arg[0] === "string") {
				t = {
					msg: arg[0],
				};
			} else {
				t = arg[0];
			}

			this.data = core.extend(
				{},
				{
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
			this.data = null;
		}
	}

	get elem() {
		return this._e;
	}
	set elem(d) {
		this._e = d;
	}

	get data() {
		return this._d;
	}
	set data(d) {
		if (d && this._e) {
			this._d = this._e.data;

			this._d.attr = attr.merge(this._d.attr, {
				title: d.type === "popover" ? d.title : d.msg,
				"data-bs-toggle": d.type,
				"data-bs-content": d.type === "popover" ? d.msg : null,
				"data-bs-trigger": d.type === "popover" ? d.trigger : null,
				"data-bs-placement": d.type ? d.placement : null,
				"data-bs-html": d.type && core.isHTML(d.msg) ? "true" : null,
			});
		} else {
			this._d = null;
		}

		super.data = this._d;
	}
}
