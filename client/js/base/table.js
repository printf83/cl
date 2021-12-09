"use strict";
import * as core from "./core.js";
import tag from "./tag.js";
import div from "./div.js";

const defaultTrOption = { tag: "tr" };
const defaultTdOption = { tag: "td", scope: null, colspan: null, rowspan: null, head: false };
const defaultTHeadOption = { tag: "thead" };
const defaultTBodyOption = { tag: "tbody" };
const defaultTFootOption = { tag: "tfoot" };
const defaultContainerOption = {
	tag: "table",
	striped: false,
	responsive: true,
	hover: false,
	border: null, //null|"bordered"|"none"
	bordercolor: null,
	caption: null,
	captiontop: false,

	rownumber: false,
	header: true,
	footer: false,
};
/**
 * opt : {tagoption}
 */
export class tr extends tag {
	constructor(opt) {
		super(opt);
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
	constructor(opt) {
		super(opt);
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		opt = core.extend({}, defaultTHeadOption, opt);

		opt.elem = Array.isArray(opt.elem) ? opt.elem : [opt.elem];
		opt.elem = opt.elem.map(function (i) {
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
	constructor(opt) {
		super(opt);
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		super.data = core.extend({}, defaultTBodyOption, opt);
	}
}

export class tfoot extends tag {
	constructor(opt) {
		super(opt);
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		opt = core.extend({}, defaultTFootOption, opt);

		opt.elem = Array.isArray(opt.elem) ? opt.elem : [opt.elem];
		opt.elem = opt.elem.map(function (i) {
			if (i.hasOwnProperty("cl") && i.tag === "td") {
				i.tag = "th";
			}
			return i;
		});

		super.data = opt;
	}
}

/**
 * opt : {tagoption,scope,colspan,rowspan,head}
 */
export class td extends tag {
	constructor(opt) {
		super(opt);
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		opt = core.extend({}, defaultTdOption, opt);

		if (opt.head) {
			opt.tag = "th";
		}

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
 * opt : {tagoption,scope,colspan,rowspan,head}
 */
export class container extends tag {
	constructor(opt) {
		super(opt);
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
			opt.hover ? "table-hover" : null,
			opt.captiontop ? "caption-top" : null,
			opt.size ? `table-${opt.size}` : null,
			opt.border
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
				//================
				//generate header;
				//================
				let th = [];
				th = a[0].map(function (i) {
					if (typeof i === "object") {
						if (i.hasOwnProperty("cl")) {
							return i;
						} else {
							return new td(i);
						}
					} else {
						return new td({
							head: true,
							scope: "col",
							elem: i,
						});
					}
				});
				//put row number
				if (opt.rownumber) {
					th.unshift(new td({ head: true, scope: "col", elem: "#" }));
				}
				//put in th
				tmp_head = new thead({
					elem: new tr({ elem: th }),
				});
			}

			//==============
			//generate body;
			//==============
			let tb = [];
			let x = opt.header ? 1 : 0;
			let len = a.length - (opt.footer ? 1 : 0);
			for (x; x < len; x++) {
				let tmp = [];
				tmp = a[x].map(function (i) {
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
					tmp.unshift(new td({ head: true, scope: "row", elem: x }));
				}

				tb.push(new tr({ elem: tmp }));
			}

			tmp_body = new tbody({ elem: tb });

			if (opt.footer) {
				//================
				//generate footer;
				//================

				let tf = [];
				tf = a[len - 1].map(function (i) {
					if (typeof i === "object") {
						if (i.hasOwnProperty("cl")) {
							return i;
						} else {
							return new td(i);
						}
					} else {
						return new td({
							head: true,
							scope: "col",
							elem: i,
						});
					}
				});
				//put row number
				if (opt.rownumber) {
					tf.unshift(new td({ head: true, scope: "row" }));
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
