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
 * option {class,style,...}
 */
export default class attr {
	constructor(arg) {
		// if (arg && arg.length > 0) {
		this.data = core.extend(
			{},
			{
				class: null,
				style: null,
			},
			arg
		);
		// } else {
		// 	this.data = null;
		// }
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
										`Fail to merge attr:${i}. No rules provided for merging this attribute. Using attr from 'a' insted.`
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
		if (elems && this._d) {
			Object.keys(this._d).forEach((i) => {
				if (i !== "tag" && i !== "elem" && (this._d[i] || this._d[i] === "") && this._d[i] !== null) {
					if (i === "class") {
						if (Array.isArray(this._d[i])) {
							let k = Array.from(new Set(this._d[i])).combine(" ");
							if (k) elems.classList = k;
						} else {
							elems.classList = this._d[i];
						}
					} else if (i === "style") {
						Object.keys(this._d[i]).forEach((j) => {
							if (this._d[i][j] && this._d[i][j] !== null) {
								elems.style[j] = this._d[i][j];
							}
						});
					} else if (booleanAttr.includes(i) && this._d[i]) {
						elems[i] = true;
					} else {
						if (this._d[i] instanceof Function) {
							if (i.startsWith("on")) {
								elems.addEventListener(i.startsWith("on") ? i.substr(2) : i, this._d[i]);
							} else {
								elems.setAttribute(i, this._d[i]);
							}
						} else {
							elems.setAttribute(i, this._d[i]);
						}
					}
				}
			});
		}

		return elems;
	};
}
