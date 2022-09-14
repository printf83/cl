"use strict";

const _setting = {
	debug: false,
};

export const setting = {
	get DEBUG() {
		return _setting.debug;
	},
	set DEBUG(value) {
		_setting.debug = value;
	},
};

const booleanAttr = [
	"allowfullscreen",
	"allowpaymentrequest",
	"async",
	"autofocus",
	"autoplay",
	"checked",
	"indeterminate",
	"controls",
	"default",
	"defer",
	"disabled",
	"formnovalidate",
	"novalidate",
	"noValidate",
	"hidden",
	"ismap",
	"itemscope",
	"loop",
	"multiple",
	"muted",
	"nomodule",
	"open",
	"playsinline",
	"readOnly",
	"required",
	"reversed",
	"selected",
	"truespeed",
];

const eventdb = {
	db: {},
	create: (fn) => {
		let id = UUID("fn_xxxxxxxxxxxxxxx");
		eventdb[id] = fn;
		return id;
	},
	call: (id) => eventdb[id],
	remove: (sender) => {
		sender.getAttributeNames().forEach((name) => {
			if (name.startsWith("cl.event.")) {
				delete eventdb[sender.getAttribute(name)];
			}
		});
	},
};

export function combineArray(arr, delimeter) {
	return removeEmptyArray(arr)?.join(delimeter);
}

function removeEmptyArray(arr) {
	return arr.filter(Boolean);
}

export function UUID(format) {
	return (format || "el_xxxxxxxxxxxx").replace(/[xy]/g, (c) => {
		let r = (Math.random() * 16) | 0,
			v = c === "x" ? r : (r & 0x3) | 0x8;
		return v.toString(16);
	});
}

export function isHTML(str) {
	if (typeof str === "string") {
		return /<\/?[a-z][\s\S]*>/i.test(str) || /\&\#\x\S{4}\;/i.test(str) || /\&\S+\;/i.test(str);
	}
}

export function setupEventListenerRemover(name, elem, fn) {
	if (elem.detachEventListener === undefined) {
		elem.detachEventListener = {};
	}
	elem.detachEventListener[name] = fn;

	if (setting.DEBUG) console.log(`Attach ${name} to ${elemInfo(elem)}`);
}

export function deleteEventListener(name, elem, fn) {
	if (setting.DEBUG) console.log(`Remove event ${name} from ${elemInfo(elem)}`);
	elem.detachEventListener[name] = null;
	delete elem.detachEventListener[name];
	fn();
}

function attachAttr(elem, arg) {
	if (elem && arg) {
		Object.keys(arg).forEach((i) => {
			if (i !== "tag" && i !== "elem" && (arg[i] || arg[i] === "") && arg[i] !== null) {
				if (i === "class") {
					if (Array.isArray(arg[i])) {
						let k = combineArray(Array.from(new Set(arg[i])), " ");
						if (k) elem.classList = k;
					} else {
						elem.classList = arg[i];
					}
				} else if (i === "style") {
					Object.keys(arg[i]).forEach((j) => {
						if (arg[i][j] !== null && arg[i][j] !== undefined) {
							elem.style.setProperty(j, arg[i][j]);
						}
					});
				} else if (booleanAttr.includes(i) && arg[i] && arg[i] !== undefined) {
					elem[i] = true;
					if (elem[i] !== true) {
						console.warn(`Attribute ${i} is not boolean attribute`);
						elem[i] = i;
					}
				} else {
					if (arg[i] !== undefined && arg[i] !== null) {
						if (arg[i] instanceof Function) {
							switch (true) {
								case i === "show.bs.tooltip":
								case i === "shown.bs.tooltip":
								case i === "hide.bs.tooltip":
								case i === "hidden.bs.tooltip":
								case i === "inserted.bs.tooltip":
								case i === "show.bs.popover":
								case i === "shown.bs.popover":
								case i === "hide.bs.popover":
								case i === "hidden.bs.popover":
								case i === "inserted.bs.popover":
									let eventname = i.startsWith("on") ? i.substring(2) : i;
									elem.setAttribute(`cl.event.${eventname}`, eventdb.create(arg[i])); //save fn to db

									setupEventListenerRemover(i, elem, () => {
										deleteEventListener(i, elem, () => {
											eventdb.remove(elem);
										});
									});

									break;
								default:
									elem.addEventListener(i.startsWith("on") ? i.substring(2) : i, arg[i], false);

									setupEventListenerRemover(i, elem, () => {
										deleteEventListener(i, elem, () => {
											elem.removeEventListener(
												i.startsWith("on") ? i.substring(2) : i,
												arg[i],
												false
											);
										});
									});
							}
						} else {
							elem.setAttribute(i, arg[i]);
						}
					}
				}
			}
		});
	}

	return elem;
}

export function elemInfo(elem) {
	let a1 = elem.localName;
	let a2 = elem.id ? `#${elem.id}` : "";
	let a3 = !a2
		? elem.classList && elem.classList.length > 0
			? "." + [].slice.apply(elem.classList).join(".")
			: ""
		: "";
	let a4 = !a2 && !a3 ? (elem.name ? `[name='${elem.name}']` : "") : "";
	let a5 = !a2 && !a3 && !a4 ? (elem.innerText ? ` [${elem.innerText}]` : "") : "";

	return `${a1}${a2}${a3}${a4}${a5}`;
}

function build(container, arg) {
	if (arg) {
		arg = Array.isArray(arg) ? arg : [arg];

		if (arg.length > 0) {
			let hasContainer = container ? true : false;
			container = container || document.createElement("div");

			arg.forEach((e) => {
				let element = e.data.tag ? document.createElement(e.data.tag) : container;
				element = attachAttr(element, e.data.attr);

				if (e.data.elem) {
					let elemType = typeof e.data.elem;
					if (elemType === "string" || elemType === "number" || elemType === "boolean") {
						if (isHTML(e.data.elem) && e.data.tag !== "pre") {
							element.insertAdjacentHTML("beforeend", e.data.elem);
						} else {
							element.appendChild(document.createTextNode(e.data.elem));
						}
					} else {
						if (Array.isArray(e.data.elem)) {
							e.data.elem.forEach((i) => {
								if (i) {
									let iElemType = typeof i;
									if (iElemType === "string" || iElemType === "number" || iElemType === "boolean") {
										if (isHTML(i) && e.data.tag !== "pre") {
											element.insertAdjacentHTML("beforeend", i);
										} else {
											element.appendChild(document.createTextNode(i));
										}
									} else if (Array.isArray(i)) {
										console.warn(
											"i is array. This happen when you set elem: [[tag],tag]. It should be elem:[tag,tag]",
											i
										);
										i.forEach((j) => {
											let t = build(element, j);
											element = t ? t : element;
										});
									} else if (i.hasOwnProperty("cl")) {
										let t = build(element, i);
										element = t ? t : element;
									} else {
										console.error("i is not elem or [elem] or string or number or boolean", i);
									}
								}
							});
						} else {
							try {
								let t = build(element, e.data.elem);
								element = t ? t : element;
							} catch (ex) {
								console.error(ex.message, e.data.elem, element);
							}
						}
					}
				}

				if (e.data.tag) container.appendChild(element);
			});

			if (hasContainer) {
				return container;
			} else {
				let result = container.childNodes;
				container = null;
				return result;
			}
		}
	}
	return null;
}

export function detachEventListener(elem) {
	if (elem) {
		let c = elem?.childNodes;
		if (c?.length > 0) {
			c.forEach((item) => {
				detachEventListener(item);

				if (item.detachEventListener) {
					Object.keys(item.detachEventListener).forEach((i) => {
						item.detachEventListener[i]();
					});
				}
			});
		}
		if (elem.detachEventListener) {
			Object.keys(elem.detachEventListener).forEach((i) => {
				elem.detachEventListener[i]();
			});
		}
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
	if (setting.DEBUG) console.time("appendChild");
	let n = node(data);
	if (Node.prototype.isPrototypeOf(n)) {
		container.appendChild(n);
	} else if (NodeList.prototype.isPrototypeOf(n)) {
		n.forEach((i) => {
			container.appendChild(i);
		});
	}
	if (setting.DEBUG) console.timeEnd("appendChild");
	return container.lastChild;
}

export function prependChild(container, data) {
	if (setting.DEBUG) console.time("prependChild");
	let n = node(data);
	if (Node.prototype.isPrototypeOf(n)) {
		container.insertBefore(n, container.firstChild);
	} else if (NodeList.prototype.isPrototypeOf(n)) {
		n.forEach((i) => {
			container.insertBefore(i, container.firstChild);
		});
	}
	if (setting.DEBUG) console.timeEnd("prependChild");
	return container.firstChild;
}

export function replaceWith(elem, data) {
	if (setting.DEBUG) console.time("replaceWith");
	removeChildElement(elem);

	let r = null;
	let n = node(data);
	let parent = elem.parentNode;
	if (Node.prototype.isPrototypeOf(n)) {
		r = parent.insertBefore(n, elem);
	} else if (NodeList.prototype.isPrototypeOf(n)) {
		n.forEach((i) => {
			r = parent.insertBefore(i, elem);
		});
	}

	removeElement(elem);

	if (setting.DEBUG) console.timeEnd("replaceWith");
	return r;
}

export function replaceChild(container, data) {
	if (setting.DEBUG) console.time("replaceChild");
	removeChildElement(container);

	build(container, data);
	if (setting.DEBUG) console.timeEnd("replaceChild");
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

function attacheventdb(elem, eventname) {
	let eventID = elem.getAttribute(`cl.event.${eventname}`);
	if (eventID) {
		let fn = (event) => {
			eventdb.call(eventID)(event);
		};

		elem.addEventListener(eventname, fn, false);

		setupEventListenerRemover(eventname, elem, () => {
			deleteEventListener(eventname, elem, () => {
				elem.removeEventListener(eventname, fn, false);
			});
		});
	}
}

export function init(container) {
	let popoverTriggerList = [].slice.call(container.querySelectorAll('[data-bs-toggle="popover"]'));
	popoverTriggerList.map((popoverTriggerEl) => {
		let elem = new bootstrap.Popover(popoverTriggerEl);

		attacheventdb(popoverTriggerEl, "show.bs.popover");
		attacheventdb(popoverTriggerEl, "shown.bs.popover");
		attacheventdb(popoverTriggerEl, "hidden.bs.popover");
		attacheventdb(popoverTriggerEl, "inserted.bs.popover");

		setupEventListenerRemover("popover", popoverTriggerEl, () => {
			deleteEventListener("popover", popoverTriggerEl, () => {
				bootstrap.Popover.getInstance(popoverTriggerEl)?.dispose();
			});
		});

		return elem;
	});

	let tooltipTriggerList = [].slice.call(container.querySelectorAll('[data-bs-toggle="tooltip"]'));
	tooltipTriggerList.map((tooltipTriggerEl) => {
		let elem = new bootstrap.Tooltip(tooltipTriggerEl);

		attacheventdb(tooltipTriggerEl, "show.bs.tooltip");
		attacheventdb(tooltipTriggerEl, "shown.bs.tooltip");
		attacheventdb(tooltipTriggerEl, "hidden.bs.tooltip");
		attacheventdb(tooltipTriggerEl, "inserted.bs.tooltip");

		setupEventListenerRemover("tooltip", tooltipTriggerEl, () => {
			deleteEventListener("tooltip", tooltipTriggerEl, () => {
				bootstrap.Tooltip.getInstance(tooltipTriggerEl)?.dispose();
			});
		});

		return elem;
	});
}
