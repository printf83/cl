"use strict";
import * as core from "./core.js";
import h from "./h.js";
import div from "./div.js";
import button from "./button.js";

const defaultOption = {
	flush: false,
	autoclose: true,
	autoopen: true,
	item: null,
};

const defaultItemOption = {
	label: null,
	showlabel: null,
	hidelabel: false,
	iconafter: false,
	icon: null,

	badge: null,

	active: false,

	show: null,
	shown: null,
	hide: null,
	hidden: null,
};

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
			if (opt.autoclose) {
				opt.id = opt.id || core.UUID();
			}

			//check if any item active
			let activeitem = opt.item?.find((i) => {
				return i.active === true;
			});

			//select first item as active if not any active item
			if (opt.item && !activeitem && opt.autoopen) {
				opt.item[0].active = true;
			}

			//generate item
			let t_item = null;
			if (opt.item && opt.item.length > 0) {
				t_item = opt.item.map((i) => {
					i = core.extend({}, defaultItemOption, i);

					let i_id = i.id || core.UUID();

					//create header
					let t_header = null;
					t_header = {
						level: 2,
						id: `${i_id}_head`,
						class: "accordion-header",
						elem: new button({
							label: i.label,
							icon: i.icon,
							showlabel: i.showlabel,
							iconafter: i.iconafter,
							badge: i.badge,
							class: ["accordion-button", !i.active ? "collapsed" : null],
							"data-bs-toggle": "collapse",
							"data-bs-target": `#${i_id}_body`,
							"aria-controls": `${i_id}_body`,
							"aria-expanded": i.active ? "true" : "false",
						}),
					};

					//create body
					let t_body = {
						id: `${i_id}_body`,
						class: ["accordion-collapse", "collapse", i.active ? "show" : null],
						"aria-labelledby": `${i_id}_head`,
						"data-bs-parent": opt.autoclose ? `#${opt.id}` : null, //container id
						"show.bs.collapse": i.show,
						"shown.bs.collapse": i.shown,
						"hide.bs.collapse": i.hide,
						"hidden.bs.collapse": i.hidden,
					};

					//delete unuse attr
					delete i.label;
					delete i.showlabel;
					delete i.hidelabel;
					delete i.iconafter;
					delete i.icon;

					delete i.badge;

					delete i.active;

					delete i.show;
					delete i.shown;
					delete i.hide;
					delete i.hidden;

					//add item body into t_body
					t_body.elem = new div({ class: "accordion-body", elem: i.elem });

					//change
					return new div({
						class: "accordion-item",
						elem: [new h(t_header), new div(t_body)],
					});
				});
			}

			opt = core.merge(opt, {
				class: ["accordion", opt.flush ? "accordion-flush" : null],
				elem: t_item,
			});

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
