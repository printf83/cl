"use strict";
import * as core from "./core.js";
import attr from "./attr.js";

/**
 * option
 */
export default class tag {
	constructor(arg) {
		this.data = core.extend(
			{},
			{
				tag: null,
				attr: null,
				elem: null,
			},
			arg
		);
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
									element.appendChild(document.createTextNode(i));
								} else {
									element = i.build(element);
								}
							}
						});
					} else {
						element = this._d.elem.build(element);
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
		container = build(container);
		return container.innerHTML;
	};
}
