"use strict";
import * as core from "./core.js";

const DEBUG = false;

function elemInfo(elem) {
	let a1 = elem.localName;
	let a2 = elem.id ? `#${elem.id}` : "";
	let a3 = elem.classList && elem.classList.length > 0 ? "." + [].slice.apply(elem.classList).join(".") : "";
	let a4 = elem.name ? `[name='${elem.name}']` : "";
	let a5 = elem.innerText ? ` [${elem.innerText}]` : "";

	return `${a1}${a2}${a3}${a4}${a5}`;
}

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
						let k = core.combineArray(Array.from(new Set(arg[i])), " ");
						if (k) elems.classList = k;
					} else {
						elems.classList = arg[i];
					}
				} else if (i === "style") {
					Object.keys(arg[i]).forEach((j) => {
						if (arg[i][j] && arg[i][j] !== null && arg[i][j] !== undefined) {
							elems.style.setProperty(j, arg[i][j]);
						}
					});
				} else if (booleanAttr.includes(i) && arg[i] && arg[i] !== undefined) {
					elems[i] = true;
				} else {
					if (arg[i] instanceof Function && arg[i] !== undefined) {
						//console.warn(`Element ${elemInfo(elems)} has ${i} function`);
						elems.addEventListener(i.startsWith("on") ? i.substr(2) : i, arg[i], false);

						//create function to remove EventListener
						elems.detachEventListener = function (sender) {
							if (DEBUG) console.log(`Remove ${i} from ${elemInfo(sender)}`);
							sender.removeEventListener(i.startsWith("on") ? i.substr(2) : i, arg[i], false);
							sender.detachEventListener = null;
							delete sender.detachEventListener;
						};
					} else if (arg[i] !== undefined) {
						elems.setAttribute(i, arg[i]);
					}
				}
			}
		});
	}

	return elems;
}

function build(container, arg) {
	if (arg && arg.data) {
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
			return container;
		} else {
			let result = container.childNodes;
			container = null;
			return result;
		}
	}
	return null;
}

export function detachEventListener(elem) {
	let c = elem.childNodes;
	if (c?.length > 0) {
		c.forEach(function (item) {
			detachEventListener(item);
			if (item.detachEventListener instanceof Function) {
				item.detachEventListener(item);
			}
		});
	}

	if (elem.detachEventListener instanceof Function) {
		elem.detachEventListener(elem);
	}
}

export function removeChildElement(elem) {
	while (elem.firstChild) {
		detachEventListener(elem.firstChild);
		elem.firstChild.remove();
	}
}

export function removeElement(elem) {
	detachEventListener(elem);
	elem.remove();
}

export function appendChild(container, data) {
	if (DEBUG) console.time("appendChild");
	let n = node(data);
	if (Node.prototype.isPrototypeOf(n)) {
		container.appendChild(n);
	} else if (NodeList.prototype.isPrototypeOf(n)) {
		n.forEach(function (i) {
			container.appendChild(i);
		});
	}
	if (DEBUG) console.timeEnd("appendChild");
	return container.lastChild;
}

export function prependChild(container, data) {
	if (DEBUG) console.time("prependChild");
	let n = node(data);
	if (Node.prototype.isPrototypeOf(n)) {
		container.insertBefore(n, container.firstChild);
	} else if (NodeList.prototype.isPrototypeOf(n)) {
		n.forEach(function (i) {
			container.insertBefore(i, container.firstChild);
		});
	}
	if (DEBUG) console.timeEnd("prependChild");
	return container.firstChild;
}

export function replaceWith(elem, data) {
	if (DEBUG) console.time("replaceWith");
	removeChildElement(elem);

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

	removeElement(elem);

	if (DEBUG) console.timeEnd("replaceWith");
	return r;
}

export function replaceChild(container, data) {
	if (DEBUG) console.time("replaceChild");
	removeChildElement(container);

	build(container, data);
	if (DEBUG) console.timeEnd("replaceChild");
	return container.childNodes;
}

export function node(data) {
	return build(null, data);
}

export function html(data) {
	let container = document.createElement("div");
	container = build(container, data);
	let html = container.innerHTML;
	container = null;
	return html;
}

export function init(container) {
	let popoverTriggerList = [].slice.call(container.querySelectorAll('[data-bs-toggle="popover"]'));
	popoverTriggerList.map(function (popoverTriggerEl) {
		return new bootstrap.Popover(popoverTriggerEl);
	});
	let tooltipTriggerList = [].slice.call(container.querySelectorAll('[data-bs-toggle="tooltip"]'));
	tooltipTriggerList.map(function (tooltipTriggerEl) {
		return new bootstrap.Tooltip(tooltipTriggerEl);
	});
}
