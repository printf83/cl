"use strict";
import * as core from "./core.js";
import h from "./h.js";
import div from "./div.js";
import button from "./button.js";

const defaultOption = {
	id: null,
	flush: false,
	autoclose: true,
	autoopen: true,
	item: null,
};

const defaultItemOption = { label: null, icon: null, showlabel: null, iconafter: false, active: false, item: null };

/**
 * opt : {tagoption,flush,autoclose,item:[{itemOption}]}
 * itemOption: {tagoption,label,icon,active,elem}
 *
 */
export default class accordion extends div {
	constructor(...opt) {
		super(...opt);
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		if (opt) {
			opt = core.extend({}, defaultOption, opt);

			//check if item isnot array
			opt.item = opt.item ? (Array.isArray(opt.item) ? opt.item : [opt.item]) : null;

			//id require if autoclose
			opt.id = opt.id || (opt.autoclose ? core.UUID() : null);

			//check if any item active
			let activeitem = opt.item?.find((i) => {
				return i.active === true;
			});

			if (opt.item && !activeitem && opt.autoopen) {
				opt.item[0].active = true;
			}

			opt.class = core.merge.class(opt.class, ["accordion", opt.flush ? "accordion-flush" : null]);
			opt.elem =
				opt.item && opt.item.length > 0
					? opt.item.map((i) => {
							i = core.extend({}, defaultItemOption, i);

							i.id = i.id || core.UUID();

							let t = core.extend({}, i);

							t.class = core.merge.class(t.class, "accordion-body");

							delete t.id;
							delete t.label;
							delete t.icon;
							delete t.active;
							delete t.iconafter;
							delete t.showlabel;

							return new div({
								class: "accordion-item",
								elem: [
									new h({
										level: 2,
										id: `${i.id}-head`,
										class: "accordion-header",
										elem: new button({
											label: i.label,
											icon: i.icon,
											showlabel: i.showlabel,
											iconafter: i.iconafter,
											class: ["accordion-button", !i.active ? "collapsed" : null],
											attr: {
												"data-bs-toggle": "collapse",
												"data-bs-target": `#${i.id}-body`,
												"aria-controls": `${i.id}-body`,
												"aria-expanded": i.active ? "true" : "false",
											},
										}),
									}),
									new div({
										id: `${i.id}-body`,
										class: ["accordion-collapse", "collapse", i.active ? "show" : null],
										attr: {
											"aria-labelledby": `${i.id}-head`,
											"data-bs-parent": opt.autoclose ? `#${opt.id}` : null,
										},
										elem: new div(t),
									}),
								],
							});
					  })
					: null;

			super.data = opt;
		}
	}
}
