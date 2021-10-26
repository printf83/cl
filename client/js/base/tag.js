"use strict";
import { core } from "./core.js";

export default class tag {
	constructor(d) {
		d = core.extend(
			{},
			{
				tag: null,
				elem: null,
			},
			d
		);
		this.d = d;
	}

	build = function (container) {
		let hasContainer = container ? true : false;
		container = container || document.createElement("div");

		let element = this.d.tag ? document.createElement(this.d.tag) : container;
		element = new attr(this.d).attach(element);

		if (this.d.elem) {
			if (typeof this.d.elem === "string") {
				element.appendChild(document.createTextNode(this.d.elem));
			} else {
				if (Array.isArray(this.d.elem)) {
					this.d.elem.forEach(function (i) {
						if (typeof i === "string") {
							element.appendChild(document.createTextNode(i));
						} else {
							element = i.build(element);
						}
					});
				} else {
					element = this.d.elem.build(element);
				}
			}
		}

		if (this.d.tag) container.appendChild(element);

		if (hasContainer) {
			return container;
		} else {
			return container.childNodes;
		}
	};

	html = function () {
		let container = document.createElement("div");
		container = build(container);
		return container.innerHTML;
	};
}

export class attr {
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
