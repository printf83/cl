"use strict";
import * as core from "./core.js";
import tag from "./tag.js";
import div from "./div.js";

const defaultTrOption = { tag: "tr" };
const defaultTdOption = { tag: "td", scope: null, colspan: null, rowspan: null };
const defaultThOption = { tag: "th", scope: "col", colspan: null, rowspan: null };
const defaultTHeadOption = { tag: "thead" };
const defaultTBodyOption = { tag: "tbody" };
const defaultTFootOption = { tag: "tfoot" };
const defaultContainerOption = {
	tag: "table",
	color: null,

	striped: false,
	stripedcolumn: false, //BS5.2

	responsive: true,
	hover: false,
	border: null, //null|"bordered"|"none"
	bordercolor: null,
	caption: null,
	captiontop: false,

	rownumber: false,
	header: true,
	footer: false,

	item: null,
};
/**
 * opt : {tagoption}
 */
export class tr extends tag {
	constructor(...opt) {
		super(...opt);
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		super.data = core.extend({}, defaultTrOption, opt);
	}
}

/**
 * opt : {tagoption}
 */
export class thead extends tag {
	constructor(...opt) {
		super(...opt);
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		opt = core.extend({}, defaultTHeadOption, opt);

		opt.elem = Array.isArray(opt.elem) ? opt.elem : [opt.elem];
		opt.elem = opt.elem.map((i) => {
			if (i.hasOwnProperty("cl") && i.tag === "td") {
				i.tag = "th";
			}
			return i;
		});

		super.data = opt;
	}
}

/**
 * opt : {tagoption}
 */
export class tbody extends tag {
	constructor(...opt) {
		super(...opt);
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		super.data = core.extend({}, defaultTBodyOption, opt);
	}
}

export class tfoot extends tag {
	constructor(...opt) {
		super(...opt);
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		opt = core.extend({}, defaultTFootOption, opt);

		opt.elem = Array.isArray(opt.elem) ? opt.elem : [opt.elem];
		opt.elem = opt.elem.map((i) => {
			if (i.hasOwnProperty("cl") && i.tag === "td") {
				i.tag = "th";
			}
			return i;
		});

		super.data = opt;
	}
}

/**
 * opt : {tagoption,scope,colspan,rowspan}
 */
export class td extends tag {
	constructor(...opt) {
		super(...opt);
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		opt = core.extend({}, defaultTdOption, opt);

		opt.attr = core.merge.attr(opt.attr, {
			colspan: opt.colspan,
			rowspan: opt.rowspan,
			scope: opt.scope,
		});

		delete opt.colspan;
		delete opt.rowspan;
		delete opt.scope;

		super.data = opt;
	}
}

/**
 * opt : {tagoption,scope,colspan,rowspan}
 */
export class th extends tag {
	constructor(...opt) {
		super(...opt);
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		opt = core.extend({}, defaultThOption, opt);

		opt.attr = core.merge.attr(opt.attr, {
			colspan: opt.colspan,
			rowspan: opt.rowspan,
			scope: opt.scope,
		});

		delete opt.colspan;
		delete opt.rowspan;
		delete opt.scope;

		super.data = opt;
	}
}

/**
 * opt : {tagoption,scope,colspan,rowspan}
 */
export class container extends tag {
	constructor(...opt) {
		super(...opt);
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		opt = core.extend({}, defaultContainerOption, opt);

		opt.class = core.merge.class(opt.class, [
			"table",
			opt.color ? `table-${opt.color}` : null,
			opt.striped ? "table-striped" : null,
			opt.stripedcolumn ? "table-striped-columns" : null,
			opt.hover ? "table-hover" : null,
			opt.captiontop ? "caption-top" : null,
			opt.size ? `table-${opt.size}` : null,
			opt.border !== null
				? opt.border === false
					? "table-borderless"
					: opt.border === true
					? "table-bordered"
					: null
				: null,
		]);

		let tmp_head = null;
		let tmp_body = null;
		let tmp_foot = null;

		if (opt.item) {
			let a = Array.isArray(opt.item) ? opt.item : [opt.item];
			if (opt.header) {
				//generate header;
				let th_item = [];
				th_item = a[0].map((i) => {
					if (typeof i === "object") {
						if (i.hasOwnProperty("cl")) {
							return i;
						} else {
							return new td(i);
						}
					} else {
						return new th({
							scope: "col",
							elem: i,
						});
					}
				});
				//put row number
				if (opt.rownumber) {
					th_item.unshift(new th({ scope: "col", elem: "#" }));
				}
				//put in th
				tmp_head = new thead({
					elem: new tr({ elem: th_item }),
				});
			}

			//generate body;
			let tb = [];
			let x = opt.header ? 1 : 0;
			let len = a.length - (opt.footer ? 1 : 0);
			for (x; x < len; x++) {
				let tmp = [];
				tmp = a[x].map((i) => {
					if (typeof i === "object") {
						if (i.hasOwnProperty("cl")) {
							return i;
						} else {
							return new td(i);
						}
					} else {
						return new td({
							elem: i,
						});
					}
				});

				if (opt.rownumber) {
					tmp.unshift(new th({ scope: "row", elem: x.toString() }));
				}

				tb.push(new tr({ elem: tmp }));
			}

			tmp_body = new tbody({ elem: tb });

			if (opt.footer) {
				//generate footer;
				let tf = [];
				tf = a[len].map((i) => {
					if (typeof i === "object") {
						if (i.hasOwnProperty("cl")) {
							return i;
						} else {
							return new td(i);
						}
					} else {
						return new th({
							scope: "col",
							elem: i,
						});
					}
				});
				//put row number
				if (opt.rownumber) {
					tf.unshift(new th({ scope: "row" }));
				}
				//put in th
				tmp_foot = new tfoot({
					elem: new tr({ elem: tf }),
				});
			}
		}

		let tmp_caption = null;
		if (opt.caption) {
			tmp_caption = new tag({ tag: "caption", elem: opt.caption });
		}

		opt.elem = opt.elem
			? Array.isArray(opt.elem)
				? opt.elem
				: [opt.elem]
			: [tmp_caption, tmp_head, tmp_body, tmp_foot];

		delete opt.color;
		delete opt.striped;
		delete opt.stripedcolumn;

		delete opt.hover;
		delete opt.captiontop;
		delete opt.size;
		delete opt.border;

		delete opt.rownumber;
		delete opt.header;
		delete opt.footer;

		delete opt.item;

		if (opt.responsive) {
			delete opt.responsive;

			super.data = new div({
				class: [typeof opt.responsive === "string" ? `tbl-responsive-${opt.responsive}` : "table-responsive"],
				elem: new tag(opt),
			}).data;
		} else {
			delete opt.responsive;
			super.data = opt;
		}
	}
}
