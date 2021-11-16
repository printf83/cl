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

function attachAttr(elems, arg) {
	if (elems && arg) {
		Object.keys(arg).forEach((i) => {
			if (i !== "tag" && i !== "elem" && (arg[i] || arg[i] === "") && arg[i] !== null) {
				if (i === "class") {
					if (Array.isArray(arg[i])) {
						let k = Array.from(new Set(arg[i])).combine(" ");
						if (k) elems.classList = k;
					} else {
						elems.classList = arg[i];
					}
				} else if (i === "style") {
					Object.keys(arg[i]).forEach((j) => {
						if (arg[i][j] && arg[i][j] !== null) {
							elems.style[j] = arg[i][j];
						}
					});
				} else if (booleanAttr.includes(i) && arg[i]) {
					elems[i] = true;
				} else {
					if (arg[i] instanceof Function) {
						if (i.startsWith("on")) {
							elems.addEventListener(i.startsWith("on") ? i.substr(2) : i, arg[i]);
						} else {
							elems.setAttribute(i, arg[i]);
						}
					} else {
						elems.setAttribute(i, arg[i]);
					}
				}
			}
		});
	}

	return elems;
}

function build(container, arg) {
	if (arg.data) {
		let hasContainer = container ? true : false;
		container = container || document.createElement("div");

		let element = arg.data.tag ? document.createElement(arg.data.tag) : container;
		element = attachAttr(element, arg.data.attr);

		if (arg.data.elem) {
			if (typeof arg.data.elem === "string") {
				element.appendChild(document.createTextNode(arg.data.elem));
			} else {
				if (Array.isArray(arg.data.elem)) {
					arg.data.elem.forEach(function (i) {
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
									let t = build(element, j);
									element = t ? t : element;
								});
							} else if (i.hasOwnProperty("cl")) {
								let t = build(element, i);
								element = t ? t : element;
							} else {
								console.info("i is not elem or [elem] or string", i);
							}
						}
					});
				} else {
					try {
						let t = build(element, arg.data.elem);
						element = t ? t : element;
					} catch (ex) {
						console.error(ex.message, arg.data.elem, element);
					}
				}
			}
		}

		if (arg.data.tag) container.appendChild(element);

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
}

export function appendChild(container, data) {
	console.time("appendChild");
	let n = node(data);
	if (Node.prototype.isPrototypeOf(n)) {
		container.appendChild(n);
	} else if (NodeList.prototype.isPrototypeOf(n)) {
		n.forEach(function (i) {
			container.appendChild(i);
		});
	}
	console.timeEnd("appendChild");

	return container.lastChild;
}

export function prependChild(container, data) {
	console.time("prependChild");
	let n = node(data);
	if (Node.prototype.isPrototypeOf(n)) {
		container.insertBefore(n, container.firstChild);
	} else if (NodeList.prototype.isPrototypeOf(n)) {
		n.forEach(function (i) {
			container.insertBefore(i, container.firstChild);
		});
	}
	console.timeEnd("prependChild");
	return container.firstChild;
}

export function replaceWith(elem, data) {
	console.time("replaceWith");
	while (elem.firstChild) {
		elem.firstChild.remove();
	}

	let r = null;
	let n = node(data);
	let parent = elem.parentNode;
	if (Node.prototype.isPrototypeOf(n)) {
		r = parent.insertBefore(n, elem);
	} else if (NodeList.prototype.isPrototypeOf(n)) {
		n.forEach(function (i) {
			r = parent.insertBefore(i, elem);
		});
	}

	elem.remove();

	console.timeEnd("replaceWith");
	return r;
}

export function replaceChild(container, data) {
	console.time("replaceChild");
	while (container.firstChild) {
		container.firstChild.remove();
	}

	build(container, data);

	console.timeEnd("replaceChild");
	return container.childNodes;
}

export function node(data) {
	return build(null, data);
}

export function html(data) {
	let container = document.createElement("div");
	container = build(container, data);
	return container.innerHTML;
}
