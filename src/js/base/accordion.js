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

const defaultItemOption = {
	label: null,
	icon: null,
	showlabel: null,
	iconafter: false,
	active: false,
	item: null,

	onshow: null,
	onshown: null,
	onhide: null,
	onhidden: null,
};

/**
 * opt : {tagoption,flush,autoclose,item:[{itemOption}]}
 * itemOption: {tagoption,label,icon,active,onhide,onshow,elem}
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

			opt = core.merge(opt, {
				class: ["accordion", opt.flush ? "accordion-flush" : null],
			});
			opt.elem =
				opt.item && opt.item.length > 0
					? opt.item.map((i) => {
							i = core.extend({}, defaultItemOption, i);

							i.id = i.id || core.UUID();

							let t = core.extend({}, i);

							t = core.merge(t, {
								class: "accordion-body",
							});

							delete t.id;
							delete t.label;
							delete t.icon;
							delete t.active;
							delete t.iconafter;
							delete t.showlabel;
							delete t.item;

							// delete t.id;
							// delete t.label;
							// delete t.icon;
							// delete t.active;
							// delete t.iconafter;
							// delete t.showlabel;
							delete t.onshow;
							delete t.onshown;
							delete t.onhide;
							delete t.onhidden;

							return new div({
								class: "accordion-item",
								elem: [
									new h({
										level: 2,
										id: `${i.id}_head`,
										class: "accordion-header",
										elem: new button({
											label: i.label,
											icon: i.icon,
											showlabel: i.showlabel,
											iconafter: i.iconafter,
											class: ["accordion-button", !i.active ? "collapsed" : null],
											"data-bs-toggle": "collapse",
											"data-bs-target": `#${i.id}_body`,
											"aria-controls": `${i.id}_body`,
											"aria-expanded": i.active ? "true" : "false",
										}),
									}),
									new div({
										id: `${i.id}_body`,
										class: ["accordion-collapse", "collapse", i.active ? "show" : null],
										"aria-labelledby": `${i.id}_head`,
										"data-bs-parent": opt.autoclose ? `#${opt.id}` : null,
										"show.bs.collapse": i.onshow,
										"shown.bs.collapse": i.onshown,
										"hide.bs.collapse": i.onhide,
										"hidden.bs.collapse": i.onhidden,
										elem: new div(t),
									}),
								],
							});
					  })
					: null;

			delete opt.flush;
			delete opt.autoclose;
			delete opt.autoopen;
			delete opt.item;

			super.data = opt;
		}
	}
}

// "use strict";
// import * as core from "./core.js";
// import h from "./h.js";
// import div from "./div.js";
// import button from "./button.js";

// const defaultOption = {
// 	id: null,
// 	flush: false,
// 	autoclose: true,
// 	autoopen: true,
// 	item: null,
// };

// const defaultItemOption = {
// 	label: null,
// 	icon: null,
// 	showlabel: null,
// 	iconafter: false,
// 	active: false,
// 	item: null,
// };

// export default class accordion extends div {
// 	constructor(...opt) {
// 		super(...opt);
// 	}

// 	get data() {
// 		return super.data;
// 	}
// 	set data(opt) {
// 		if (opt) {
// 			opt = core.extend({}, defaultOption, opt);

// 			//check if item isnot array
// 			opt.item = opt.item ? (Array.isArray(opt.item) ? opt.item : [opt.item]) : null;

// 			//id require if autoclose
// 			opt.id = opt.id || (opt.autoclose ? core.UUID() : null);

// 			//check if any item active
// 			let activeitem = opt.item?.find((i) => {
// 				return i.active === true;
// 			});

// 			if (opt.item && !activeitem && opt.autoopen) {
// 				opt.item[0].active = true;
// 			}

// 			opt = core.merge(opt, {
// 				class: ["accordion", opt.flush ? "accordion-flush" : null],
// 				elem:
// 					opt.item && opt.item.length > 0
// 						? opt.item.map((i) => {
// 								i = core.extend({}, defaultItemOption, i);

// 								i.id = i.id || core.UUID();

// 								let accodion_body = core.extend({}, i);

// 								delete accodion_body.id;
// 								delete accodion_body.label;
// 								delete accodion_body.icon;
// 								delete accodion_body.active;
// 								delete accodion_body.iconafter;
// 								delete accodion_body.showlabel;
// 								delete accodion_body.item;

// 								accodion_body = core.merge(accodion_body, {
// 									class: "accordion-body",
// 								});

// 								let accodion_item = {
// 									class: "accordion-item",
// 									elem: [
// 										new h({
// 											level: 2,
// 											id: `${i.id}_head`,
// 											class: "accordion-header",
// 											elem: new button({
// 												label: i.label,
// 												icon: i.icon,
// 												showlabel: i.showlabel,
// 												iconafter: i.iconafter,
// 												class: ["accordion-button", !i.active ? "collapsed" : null],
// 												"data-bs-toggle": "collapse",
// 												"data-bs-target": `#${i.id}_body`,
// 												"aria-controls": `${i.id}_body`,
// 												"aria-expanded": i.active ? "true" : "false",
// 											}),
// 										}),
// 										new div({
// 											id: `${i.id}_body`,
// 											class: ["accordion-collapse", "collapse", i.active ? "show" : null],
// 											"aria-labelledby": `${i.id}_head`,
// 											"data-bs-parent": opt.autoclose ? `#${opt.id}` : null,
// 											elem: new div(accodion_body),
// 										}),
// 									],
// 								};

// 								return new div(accodion_item);
// 						  })
// 						: null,
// 			});

// 			delete opt.flush;
// 			delete opt.autoclose;
// 			delete opt.autoopen;
// 			delete opt.item;

// 			super.data = opt;
// 		}
// 	}
// }
