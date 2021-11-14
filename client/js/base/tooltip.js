import * as core from "./core.js";
import { mergeAttr } from "./cl.js";
import tag from "./tag.js";

/**
 * elem, msg
 * elem, opt : {attr,title,msg,type,placement,trigger}
 */
export default class tooltip extends tag {
	_d = null;

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
			} else if (arg.length === 1) {
				t = arg[0];
			} else {
				console.error("Unsupported argument", arg);
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
		if (d && this.elem) {
			this._d = this.elem.data;

			this._d.attr = mergeAttr(this._d.attr, {
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

		this.setting = d;
		super.data = this._d;
	}

	get setting() {
		return this._s;
	}
	set setting(d) {
		this._s = d;
	}
}
