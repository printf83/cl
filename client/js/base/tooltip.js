import * as core from "./core.js";
import attr from "./attr.js";
import tag from "./tag.js";

export default class tooltip extends tag {
	constructor(elem, ...arg) {
		super();
		if (elem && arg && arg.length > 0) {
			if (elem && arg && arg.length > 0) {
				let t = {};
				if (arg.length === 1 && typeof arg[0] === "string") {
					t = {
						msg: arg[0],
					};
				} else {
					t = arg[0];
				}

				this.data = {
					e: elem,
					d: core.extend(
						{},
						{
							attr: null,
							msg: null,
							type: null,
							placement: "top",
							trigger: "focus",
						},
						t
					),
				};
			}
		} else {
			this.data = null;
		}
	}

	get data() {
		return this._d;
	}
	set data(arg) {
		if (arg && arg.e && arg.d) {
			let d = arg.d;
			this._d = arg.e.data;

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
