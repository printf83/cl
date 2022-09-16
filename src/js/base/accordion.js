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
				elem:
					opt.item && opt.item.length > 0
						? opt.item.map((i) => {
								i = core.extend({}, defaultItemOption, i);

								i.id = i.id || core.UUID();

								let itembody = core.extend({}, i);

								delete itembody.id;
								delete itembody.label;
								delete itembody.icon;
								delete itembody.active;
								delete itembody.iconafter;
								delete itembody.showlabel;
								delete itembody.onshow;
								delete itembody.onshown;
								delete itembody.onhide;
								delete itembody.onhidden;

								itembody = core.merge(itembody, {
									class: "accordion-body",
								});

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
												dataBsToggle: "collapse",
												dataBsTarget: `#${i.id}_body`,
												ariaControls: `${i.id}_body`,
												ariaExpanded: i.active ? "true" : "false",
											}),
										}),
										new div({
											id: `${i.id}_body`,
											class: ["accordion-collapse", "collapse", i.active ? "show" : null],
											ariaLabelledby: `${i.id}_head`,
											dataBsParent: opt.autoclose ? `#${opt.id}` : null,
											"show.bs.collapse": i.onshow,
											"shown.bs.collapse": i.onshown,
											"hide.bs.collapse": i.onhide,
											"hidden.bs.collapse": i.onhidden,
											elem: new div(itembody),
										}),
									],
								});
						  })
						: null,
			});

			delete opt.item;

			super.data = opt;
		}
	}
}
