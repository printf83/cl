"use strict";
import * as core from "./core.js";

export default class attr {
	constructor(d) {
		d = core.extend(
			{},
			{
				class: null,
				style: null,
			},
			d
		);

		this.d = d;
	}

	//rules for unsupported property
	static merge = function (a, b, rules) {
		if ((a || b) && !(a && b)) {
			return a || b;
		} else if (a && b) {
			//manual copy needed
			let c = {};
			Object.keys(a).forEach((i) => {
				if (b.hasOwnProperty(i)) {
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
				} else {
					c[i] = a[i];
				}
			});

			Object.keys(b).forEach((i) => {
				if (!a.hasOwnProperty(i)) {
					c[i] = b[i];
				}
			});

			return c;
		} else {
			return null;
		}
	};

	attach = function (elems) {
		if (elems) {
			Object.keys(this.d).forEach((i) => {
				if (i !== "tag" && i !== "elem" && (this.d[i] || this.d[i] === "") && this.d[i] !== null) {
					if (i === "class") {
						if (Array.isArray(this.d[i])) {
							let k = Array.from(new Set(this.d[i])).combine(" ");
							if (k) elems.classList = k;
						} else {
							elems.classList = this.d[i];
						}
					} else if (i === "style") {
						Object.keys(this.d[i]).forEach((j) => {
							if (this.d[i][j] && this.d[i][j] !== null) {
								elems.style[j] = this.d[i][j];
							}
						});
					} else if (
						[
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
						].includes(i) &&
						this.d[i]
					) {
						elems[i] = true;
					} else {
						if (this.d[i] instanceof Function) {
							if (i.startsWith("on")) {
								elems.addEventListener(i.startsWith("on") ? i.substr(2) : i, function (event) {
									this.d[i](event.currentTarget, event);
								});
							} else {
								elems.setAttribute(i, this.d[i]);
							}
						} else {
							elems.setAttribute(i, this.d[i]);
						}
					}
				}
			});
		}

		return elems;
	};
}
