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

	attach = function (elems) {
		if (elems) {
			Object.keys(this.d).forEach((i) => {
				if (i !== "tag" && i !== "elem" && (this.d[i] || this.d[i] === "") && this.d[i] !== null) {
					if (i === "class") {
						if (Array.isArray(this.d[i])) {
							let k = this.d[i].combine(" ");
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
