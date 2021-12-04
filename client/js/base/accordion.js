"use strict";
import * as core from "./core.js";
import h from "./h.js";
import div from "./div.js";
import button from "./button.js";

/**
 * opt : {tagoption,flush,autoclose,item:[{id,title,icon,active,elem}]}
 */
export default class accordion extends div {
	constructor(opt) {
		super(
			core.extend(
				{},
				{
					id: null,
					flush: false,
					autoclose: true,
					item: null,
				},
				opt
			)
		);
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		if (opt) {
			//check if item isnot array
			opt.item = opt.item ? (Array.isArray(opt.item) ? opt.item : [opt.item]) : null;

			//id require if autoclose
			opt.id = opt.id || opt.autoclose ? core.UUID() : null;

			//check if any item active
			let activeitem = opt.item?.find((i) => {
				return i.active === true;
			});

			if (opt.item && !activeitem) {
				opt.item[0].active = true;
			}

			opt.class = core.merge.class(opt.class, ["accordion", opt.flush ? "accordion-flush" : null]);
			opt.elem =
				opt.item && opt.item.length > 0
					? opt.item.map(function (i) {
							i = core.extend(
								{},
								{
									id: null,
									title: null,
									icon: null,
									active: false,
									elem: null,
								},
								i
							);

							i.id = i.id || core.UUID();

							return new div({
								class: "accordion-item",
								elem: [
									new h(2, {
										id: `${i.id}-head`,
										class: "accordion-header",
										elem: new button({
											label: i.title,
											icon: i.icon,
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
										elem: new div({ class: "accordion-body", elem: i.item }),
									}),
								],
							});
					  })
					: null;

			super.data = d;
		}
	}
}
