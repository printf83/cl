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

	//name tag "cl" so we can check hasOwnProperty("cl")
	cl = 1;

	get data() {
		return this._d;
	}
	set data(d) {
		this._d = d;
	}

	// build = function (container) {
	// 	if (this.data) {
	// 		let hasContainer = container ? true : false;
	// 		container = container || document.createElement("div");

	// 		let element = this.data.tag ? document.createElement(this.data.tag) : container;
	// 		element = new attr(this.data.attr).attach(element);

	// 		if (this.data.elem) {
	// 			if (typeof this.data.elem === "string") {
	// 				element.appendChild(document.createTextNode(this.data.elem));
	// 			} else {
	// 				if (Array.isArray(this.data.elem)) {
	// 					this.data.elem.forEach(function (i) {
	// 						if (i) {
	// 							if (typeof i === "string") {
	// 								//console.info("i is text", i);
	// 								element.appendChild(document.createTextNode(i));
	// 							} else if (Array.isArray(i)) {
	// 								console.warn(
	// 									"i is array. This happen when you set elem: [[tag],tag]. It should be elem:[tag,tag]",
	// 									i
	// 								);
	// 								i.forEach(function (j) {
	// 									let t = j.build(element);
	// 									element = t ? t : element;
	// 								});
	// 							} else if (i.hasOwnProperty("cl")) {
	// 								let t = i.build(element);
	// 								element = t ? t : element;
	// 							} else {
	// 								console.info("i is not elem or [elem] or string", i);
	// 							}
	// 						}
	// 					});
	// 				} else {
	// 					try {
	// 						let t = this.data.elem.build(element);
	// 						element = t ? t : element;
	// 					} catch (ex) {
	// 						console.error(ex.message, this.data.elem, element);
	// 					}
	// 				}
	// 			}
	// 		}

	// 		if (this.data.tag) container.appendChild(element);

	// 		if (hasContainer) {
	// 			let popoverTriggerList = [].slice.call(container.querySelectorAll('[data-bs-toggle="popover"]'));
	// 			popoverTriggerList.map(function (popoverTriggerEl) {
	// 				return new bootstrap.Popover(popoverTriggerEl);
	// 			});

	// 			let tooltipTriggerList = [].slice.call(container.querySelectorAll('[data-bs-toggle="tooltip"]'));
	// 			tooltipTriggerList.map(function (tooltipTriggerEl) {
	// 				return new bootstrap.Tooltip(tooltipTriggerEl);
	// 			});

	// 			return container;
	// 		} else {
	// 			return container.childNodes;
	// 		}
	// 	}
	// 	return null;
	// };

	// appendChild = function (container) {
	// 	let n = this.node();
	// 	if (Node.prototype.isPrototypeOf(n)) {
	// 		container.appendChild(n);
	// 	} else if (NodeList.prototype.isPrototypeOf(n)) {
	// 		n.forEach(function (i) {
	// 			container.appendChild(i);
	// 		});
	// 	}

	// 	return container.lastChild;
	// };

	// prependChild = function (container) {
	// 	let n = this.node();
	// 	if (Node.prototype.isPrototypeOf(n)) {
	// 		container.insertBefore(n, container.firstChild);
	// 	} else if (NodeList.prototype.isPrototypeOf(n)) {
	// 		n.forEach(function (i) {
	// 			container.insertBefore(i, container.firstChild);
	// 		});
	// 	}

	// 	return container.firstChild;
	// };

	// replaceWith = function (elem) {
	// 	while (elem.firstChild) {
	// 		elem.firstChild.remove();
	// 	}

	// 	let r = null;
	// 	let n = this.node();
	// 	let parent = elem.parentNode;
	// 	if (Node.prototype.isPrototypeOf(n)) {
	// 		r = parent.insertBefore(n, elem);
	// 	} else if (NodeList.prototype.isPrototypeOf(n)) {
	// 		n.forEach(function (i) {
	// 			r = parent.insertBefore(i, elem);
	// 		});
	// 	}

	// 	elem.remove();

	// 	return r;
	// };

	// replaceChild = function (container) {
	// 	while (container.firstChild) {
	// 		container.firstChild.remove();
	// 	}

	// 	this.build(container);
	// 	return container.childNodes;
	// };

	// node = function () {
	// 	return this.build();
	// };

	// html = function () {
	// 	let container = document.createElement("div");
	// 	container = this.build(container);
	// 	return container.innerHTML;
	// };
}
