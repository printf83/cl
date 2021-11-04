"use strict";
import * as core from "./core.js";
import attr from "./attr.js";

/**
 * opt : {tag,attr,elem}
 */
export default class tag {
	constructor(arg) {
		if (arg) {
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
	set data(d) {
		this._d = d;
	}

	build = function (container) {
		if (this.data) {
			let hasContainer = container ? true : false;
			container = container || document.createElement("div");

			let element = this.data.tag ? document.createElement(this.data.tag) : container;
			element = new attr(this.data.attr).attach(element);

			if (this.data.elem) {
				if (typeof this.data.elem === "string") {
					element.appendChild(document.createTextNode(this.data.elem));
				} else {
					if (Array.isArray(this.data.elem)) {
						this.data.elem.forEach(function (i) {
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
										let t = j.build(element);
										element = t ? t : element;
									});
								} else {
									//console.info("i is object", i);
									try {
										let t = i.build(element);
										element = t ? t : element;
									} catch (ex) {
										console.error(ex.message, i, element);
									}
								}
							}
						});
					} else {
						try {
							let t = this.data.elem.build(element);
							element = t ? t : element;
						} catch (ex) {
							console.error(ex.message, this.data.elem, element);
						}
					}
				}
			}

			if (this.data.tag) container.appendChild(element);

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
