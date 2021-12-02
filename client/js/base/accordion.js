"use strict";
import * as core from "./core.js";
import h from "./h.js";
import div from "./div.js";
import button from "./button.js";

/**
 * opt : {tagoption,flush,autoclose,elem:[{id,title,icon,active,elem}]}
 */
export default class accordion extends div {
	constructor(opt) {
		super(opt);
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		if (opt) {
			opt = core.extend(
				{},
				{
					id: null,
					flush: false,
					autoclose: true,
				},
				opt
			);

			//check if elem isnot array
			opt.elem = opt.elem ? (Array.isArray(opt.elem) ? opt.elem : [opt.elem]) : null;

			//id require if autoclose
			opt.id = opt.id || opt.autoclose ? core.UUID() : null;

			//check if any elem active
			let activeelem = opt.elem?.find((i) => {
				return i.active === true;
			});

			if (opt.elem && !activeelem) {
				opt.elem[0].active = true;
			}

			opt.class = core.merge.class(opt.class, ["accordion", opt.flush ? "accordion-flush" : null]);
			opt.elem =
				opt.elem && opt.elem.length > 0
					? opt.elem.map(function (i) {
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
										elem: new div({ class: "accordion-body", elem: i.elem }),
									}),
								],
							});
					  })
					: null;

			super.data = d;
		} else {
			super.data = null;
		}
	}
}
