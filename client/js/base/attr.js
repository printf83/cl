"use strict";
import * as core from "./core.js";

const booleanAttr = [
	"allowfullscreen",
	"allowpaymentrequest",
	"async",
	"autofocus",
	"autoplay",
	"checked",
	"controls",
	"default",
	"defer",
	"disabled",
	"formnovalidate",
	"hidden",
	"ismap",
	"itemscope",
	"loop",
	"multiple",
	"muted",
	"nomodule",
	"novalidate",
	"open",
	"playsinline",
	"readonly",
	"required",
	"reversed",
	"selected",
	"truespeed",
];

/**
 * opt {class,style,...}
 */
export default class attr {
	constructor(arg) {
		if (arg) {
			this.data = core.extend(
				{},
				{
					class: null,
					style: null,
				},
				arg
			);
		} else {
			this.data = null;
		}
	}

	get data() {
		return this._d;
	}
	set data(arg) {
		this._d = arg;
	}

	/**
	 *
	 * rules : unsupported property merge process
	 * example :
	 * merge({},{},{id:function(a,b){return b}})
	 */
	static merge = function (a, b, rules) {
		if ((a || b) && !(a && b)) {
			return a || b;
		} else if (a && b) {
			//manual copy needed
			let c = {};
			Object.keys(a).forEach((i) => {
				if (b.hasOwnProperty(i)) {
					if ((a[i] || b[i]) && !(a[i] && b[i])) {
						c[i] = a[i] || b[i];
					} else if (a[i] && b[i]) {
						//need to merge a and b into c
						switch (i) {
							case "class":
								c[i] = core.merge.class(a[i], b[i]);
								break;
							case "style":
								c[i] = core.merge.style(a[i], b[i]);
								break;
							default:
								if (rules && rules.hasOwnProperty(i)) {
									c[i] = rules[i](a[i], b[i]);
								} else {
									console.warn(
										`Fail to merge attr:${i}. No rules provided for merging this attribute. Using attr from 'a' insted.`,
										[a[i], b[i]]
									);
									c[i] = a[i]; //used a insted
								}
						}
					}
				} else {
					c[i] = a[i];
				}
			});

			Object.keys(b).forEach((i) => {
				if (!a.hasOwnProperty(i)) {
					if (b[i]) {
						c[i] = b[i];
					}
				}
			});

			return c;
		} else {
			return null;
		}
	};

	attach = function (elems) {
		if (elems && this.data) {
			Object.keys(this.data).forEach((i) => {
				if (i !== "tag" && i !== "elem" && (this.data[i] || this.data[i] === "") && this.data[i] !== null) {
					if (i === "class") {
						if (Array.isArray(this.data[i])) {
							let k = Array.from(new Set(this.data[i])).combine(" ");
							if (k) elems.classList = k;
						} else {
							elems.classList = this.data[i];
						}
					} else if (i === "style") {
						Object.keys(this.data[i]).forEach((j) => {
							if (this.data[i][j] && this.data[i][j] !== null) {
								elems.style[j] = this.data[i][j];
							}
						});
					} else if (booleanAttr.includes(i) && this.data[i]) {
						elems[i] = true;
					} else {
						if (this.data[i] instanceof Function) {
							if (i.startsWith("on")) {
								elems.addEventListener(i.startsWith("on") ? i.substr(2) : i, this.data[i]);
							} else {
								elems.setAttribute(i, this.data[i]);
							}
						} else {
							elems.setAttribute(i, this.data[i]);
						}
					}
				}
			});
		}

		return elems;
	};
}
