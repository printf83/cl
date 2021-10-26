"use strict";
import * as core from "./core.js";
import attr from "./attr.js";

export default class tag {
	constructor(d) {
		d = core.extend(
			{},
			{
				tag: null,
				attr: null,
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
		element = new attr(this.d.attr).attach(element);

		if (this.d.elem) {
			if (typeof this.d.elem === "string") {
				element.appendChild(document.createTextNode(this.d.elem));
			} else {
				if (Array.isArray(this.d.elem)) {
					this.d.elem.forEach(function (i) {
						if (i) {
							if (typeof i === "string") {
								element.appendChild(document.createTextNode(i));
							} else {
								element = i.build(element);
							}
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
