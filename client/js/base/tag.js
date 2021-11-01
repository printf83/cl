"use strict";
import * as core from "./core.js";
import attr from "./attr.js";

/**
 * option
 */
export default class tag {
	constructor(arg) {
		if (arg && arg.length > 0) {
			this.data = core.extend(
				{},
				{
					tag: null,
					attr: null,
					elem: null,
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

	build = function (container) {
		if (this._d) {
			let hasContainer = container ? true : false;
			container = container || document.createElement("div");

			let element = this._d.tag ? document.createElement(this._d.tag) : container;
			element = new attr(this._d.attr).attach(element);

			if (this._d.elem) {
				if (typeof this._d.elem === "string") {
					element.appendChild(document.createTextNode(this._d.elem));
				} else {
					if (Array.isArray(this._d.elem)) {
						this._d.elem.forEach(function (i) {
							if (i) {
								if (typeof i === "string") {
									//console.info("i is text", i);
									element.appendChild(document.createTextNode(i));
								} else if (Array.isArray(i)) {
									console.warn(
										"i is array. This happen when you set elem: [[tag],tag]. It should be elem:[tag,tag]",
										i
									);
									i.forEach(function (j) {
										element = j.build(element);
									});
								} else {
									//console.info("i is object", i);
									element = i.build(element);
								}
							}
						});
					} else {
						try {
							element = this._d.elem.build(element);
						} catch (ex) {
							console.error(ex.message, this._d.elem);
						}
					}
				}
			}

			if (this._d.tag) container.appendChild(element);

			if (hasContainer) {
				let popoverTriggerList = [].slice.call(container.querySelectorAll('[data-bs-toggle="popover"]'));
				popoverTriggerList.map(function (popoverTriggerEl) {
					return new bootstrap.Popover(popoverTriggerEl);
				});

				let tooltipTriggerList = [].slice.call(container.querySelectorAll('[data-bs-toggle="tooltip"]'));
				tooltipTriggerList.map(function (tooltipTriggerEl) {
					return new bootstrap.Tooltip(tooltipTriggerEl);
				});

				return container;
			} else {
				return container.childNodes;
			}
		}
		return null;
	};

	html = function () {
		let container = document.createElement("div");
		container = this.build(container);
		return container.innerHTML;
	};
}
