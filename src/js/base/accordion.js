"use strict";
import * as core from "./core.js";
import h from "./h.js";
import div from "./div.js";
import button from "./button.js";

const defaultOption = {
	id: null,
	flush: false,
	autoClose: true,
	autoOpen: true,
	item: null,
};

const defaultItemOption = {
	label: null,
	icon: null,
	showLabel: null,
	iconAfter: false,
	active: false,
	item: null,
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
								delete itembody.iconAfter;
								delete itembody.showLabel;

								itembody = core.merge(itembody, {
									class: "accordion-body",
								});

								let h = {
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
										new div(
											core.merge(i, {
												id: `${i.id}_body`,
												class: ["accordion-collapse", "collapse", i.active ? "show" : null],
												ariaLabelledby: `${i.id}_head`,
												dataBsParent: opt.autoclose ? `#${opt.id}` : null,
												elem: new div(itembody),
											})
										),
									],
								};

								return new div(h);
						  })
						: null,
			});

			delete opt.item;

			super.data = opt;
		}
	}
}
