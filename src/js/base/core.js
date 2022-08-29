"use strict";

const DEBUG = false;

export function combineArray(arr, delimeter) {
	return removeEmptyArray(arr)?.join(delimeter);
}

export function removeEmptyArray(arr) {
	return arr.filter(Boolean);
}

export function capitalize(str) {
	return str.toLowerCase().replace(/(^\w{1})|(\s+\w{1})/g, (match) => match.toUpperCase());
}

const fnCookie = {
	set: (cname, cvalue, exdays) => {
		const d = new Date();

		if (cvalue) {
			exdays = exdays || 7;
		} else {
			exdays = -1;
		}

		d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
		let expires = "expires=" + d.toUTCString();
		document.cookie = cname + "=" + cvalue + ";" + expires + ";samesite=strict;path=/";
	},
	get: (cname) => {
		let name = cname + "=";
		let decodedCookie = decodeURIComponent(document.cookie);
		let ca = decodedCookie.split(";");
		for (let i = 0; i < ca.length; i++) {
			let c = ca[i];
			while (c.charAt(0) == " ") {
				c = c.substring(1);
			}
			if (c.indexOf(name) == 0) {
				return c.substring(name.length, c.length);
			}
		}
		return null;
	},
};

export const cookie = fnCookie;

const fnTheme = {
	init: () => {
		fnTheme.set(fnTheme.get("cltheme"));
	},
	set: (theme) => {
		fnCookie.set("cltheme", theme);

		let cltheme = document.getElementById("cltheme");
		if (cltheme) {
			if (theme) {
				cltheme.href = `https://cdn.jsdelivr.net/npm/bootswatch@5.1.3/dist/${theme}/bootstrap.min.css`;
				cltheme.removeAttribute("disabled");
			} else {
				cltheme.setAttribute("disabled", "disabled");
			}
		} else {
			console.error("#cltheme not found");
		}

		fnTheme.change(theme);
	},
	get: () => {
		return fnCookie.get("cltheme");
	},
	change: (theme) => {
		console.log("default theme change callback");
	},
};

export const theme = fnTheme;

const _baseIcon = {
	i: { icon: "info-circle", type: "fas", color: "primary" },
	"!": { icon: "exclamation-triangle", type: "fas", color: "warning" },
	"!!": { icon: "exclamation-triangle", type: "fas", color: "danger" },
	"?": { icon: "question-circle", type: "fas", color: "success" },
	"/": { icon: "check-circle", type: "fas", color: "success" },
	x: { icon: "times-circle", type: "fas", color: "danger" },
	"-": { icon: "minus-circle", type: "fas", color: "danger" },
};

export function getBaseIcon(icon, baseIcon, baseColor) {
	baseIcon = baseIcon || _baseIcon;
	baseColor = baseColor || _baseColor;
	if (icon && typeof icon === "string") {
		if (baseIcon.hasOwnProperty(icon)) {
			let bI = baseIcon[icon];
			let bC = baseColor.hasOwnProperty(bI.color) ? baseColor[bI.color] : null;

			return {
				icon: bI.icon,
				type: bI.type,
				color: bI.color,
				textcolor: bC?.textcolor,
			};
		}
	}
	return null;
}

const _baseColor = {
	primary: { textcolor: "light" },
	secondary: { textcolor: "light" },
	warning: { textcolor: "dark" },
	success: { textcolor: "light" },
	danger: { textcolor: "light" },
	info: { textcolor: "dark" },
	dark: { textcolor: "light" },
	light: { textcolor: "dark" },
	body: { textcolor: "light" },
	white: { textcolor: "dark" },
	transparent: { textcolor: "dark" },
};

export function getBaseColor(color, baseColor) {
	baseColor = baseColor || _baseColor;
	if (color && typeof color === "string") {
		if (baseColor.hasOwnProperty(color)) {
			return baseColor[color];
		}
	}
	return null;
}

export function getTextColorBaseOnColor(color, baseColor) {
	baseColor = baseColor || _baseColor;
	if (color && typeof color === "string") {
		if (baseColor.hasOwnProperty(color)) {
			return baseColor[color].textcolor;
		}
	}
	return null;
}

export function importJS(path, callback) {
	import(path).then((obj) => {
		callback(obj.default);
	});
}

export function extend(out) {
	out = out || {};

	for (let i = 1; i < arguments.length; i++) {
		if (!arguments[i]) continue;

		for (let key in arguments[i]) {
			if (arguments[i].hasOwnProperty(key)) out[key] = arguments[i][key];
		}
	}

	return out;
}

export const merge = {
	class: (a, b) => {
		if (a && b && a !== undefined && b !== undefined) {
			let aT = typeof a;
			let bT = typeof b;
			let aR = Array.isArray(a);
			let bR = Array.isArray(b);

			if (!aR && !bR && aT === "string" && bT === "string") {
				return [a, b];
			} else if (!aR && bR && aT === "string") {
				b.push(a);
				return b;
			} else if (aR && !bR && bT === "string") {
				a.push(b);
				return a;
			} else if (aR && bR) {
				return [...a, ...b];
			} else {
				console.error("Unhandle class rules", [aT, bT, aR, bR]);
			}
		} else if (a && !b && a !== undefined) {
			return a;
		} else if (!a && b && b !== undefined) {
			return b;
		} else {
			return null;
		}
	},
	style: (a, b) => {
		if (a && b && a !== undefined && b !== undefined) {
			let c = {};
			Object.keys(a).forEach((i) => {
				if (b.hasOwnProperty(i)) {
					console.warn(`Same property ${i} provided in 'a' and 'b'. Using style from 'a' insted.`);
					c[i] = a[i]; //used a insted
				} else {
					c[i] = a[i];
				}
			});

			Object.keys(b).forEach((i) => {
				if (!a.hasOwnProperty(i)) {
					c[i] = b[i];
				}
			});

			return c;
		} else if (a && !b && a !== undefined) {
			return a;
		} else if (!a && b && b !== undefined) {
			return b;
		} else {
			return null;
		}
	},
	/**
	 *
	 * rules : unsupported property merge process
	 * example :
	 * merge({},{},{id:function(a,b){return b}})
	 */
	attr: (a, b, rules) => {
		if ((a || b) && !(a && b)) {
			return a || b;
		} else if (a && b) {
			//manual copy needed
			let c = {};
			Object.keys(a).forEach((i) => {
				if (b.hasOwnProperty(i)) {
					if ((a[i] || b[i]) && !(a[i] && b[i])) {
						c[i] = a[i] || b[i];
					} else if (a[i] && b[i]) {
						//need to merge a and b into c
						switch (i) {
							case "class":
								c[i] = merge.class(a[i], b[i]);
								break;
							case "style":
								c[i] = merge.style(a[i], b[i]);
								break;
							default:
								if (rules && rules.hasOwnProperty(i)) {
									c[i] = rules[i](a[i], b[i]);
								} else {
									console.warn(
										`Fail to merge attr:${i}. No rules provided for merging this attribute. Using attr from 'a' insted.`,
										[a[i], b[i]]
									);
									c[i] = a[i]; //used a insted
								}
						}
					}
				} else {
					c[i] = a[i];
				}
			});

			Object.keys(b).forEach((i) => {
				if (!a.hasOwnProperty(i)) {
					if (b[i]) {
						c[i] = b[i];
					}
				}
			});

			return c;
		} else {
			return null;
		}
	},
};

const num2EngDB = [
	{ value: 1000000000000000, str: "quadrillion" },
	{ value: 1000000000000, str: "trillion" },
	{ value: 1000000000, str: "billion" },
	{ value: 1000000, str: "million" },
	{ value: 1000, str: "thousand" },
	{ value: 100, str: "hundred" },
	{ value: 90, str: "ninety" },
	{ value: 80, str: "eighty" },
	{ value: 70, str: "seventy" },
	{ value: 60, str: "sixty" },
	{ value: 50, str: "fifty" },
	{ value: 40, str: "forty" },
	{ value: 30, str: "thirty" },
	{ value: 20, str: "twenty" },
	{ value: 19, str: "nineteen" },
	{ value: 18, str: "eighteen" },
	{ value: 17, str: "seventeen" },
	{ value: 16, str: "sixteen" },
	{ value: 15, str: "fifteen" },
	{ value: 14, str: "fourteen" },
	{ value: 13, str: "thirteen" },
	{ value: 12, str: "twelve" },
	{ value: 11, str: "eleven" },
	{ value: 10, str: "ten" },
	{ value: 9, str: "nine" },
	{ value: 8, str: "eight" },
	{ value: 7, str: "seven" },
	{ value: 6, str: "six" },
	{ value: 5, str: "five" },
	{ value: 4, str: "four" },
	{ value: 3, str: "three" },
	{ value: 2, str: "two" },
	{ value: 1, str: "one" },
];

const num2Eng = (num) => {
	let result = "";
	for (let n of num2EngDB) {
		if (num >= n.value) {
			if (num <= 99) {
				result += n.str;
				num -= n.value;
				if (num > 0) result += " ";
			} else {
				let t = Math.floor(num / n.value);
				let d = num % n.value;
				if (d > 0) {
					return `${num2Eng(t)} ${n.str} ${num2Eng(d)}`;
				} else {
					return `${num2Eng(t)} ${n.str}`;
				}
			}
		}
	}
	return result;
};

const num2EngThDB = [
	{ value: 1000000000000000, str: "quadrillion" },
	{ value: 1000000000000, str: "trillion" },
	{ value: 1000000000, str: "billion" },
	{ value: 1000000, str: "million" },
	{ value: 1000, str: "thousand" },
	{ value: 100, str: "hundred" },
	{ value: 90, str: "ninet" },
	{ value: 80, str: "eight" },
	{ value: 70, str: "sevent" },
	{ value: 60, str: "sixt" },
	{ value: 50, str: "fift" },
	{ value: 40, str: "fourt" },
	{ value: 30, str: "thirt" },
	{ value: 20, str: "twent" },
	{ value: 19, str: "nineteenth" },
	{ value: 18, str: "eighteenth" },
	{ value: 17, str: "seventeenth" },
	{ value: 16, str: "sixteenth" },
	{ value: 15, str: "fifteenth" },
	{ value: 14, str: "fourteenth" },
	{ value: 13, str: "thirteenth" },
	{ value: 12, str: "twelvth" },
	{ value: 11, str: "eleventh" },
	{ value: 10, str: "tenth" },
	{ value: 9, str: "ninth" },
	{ value: 8, str: "eighth" },
	{ value: 7, str: "seventh" },
	{ value: 6, str: "sixth" },
	{ value: 5, str: "fifth" },
	{ value: 4, str: "fourth" },
	{ value: 3, str: "third" },
	{ value: 2, str: "second" },
	{ value: 1, str: "first" },
];

const num2EngTh = (num) => {
	let result = "";
	for (let n of num2EngThDB) {
		if (num >= n.value) {
			if (num <= 99) {
				result += n.str;
				num -= n.value;
				if (num > 0) result += " ";
			} else {
				let t = Math.floor(num / n.value);
				let d = num % n.value;
				if (d > 0) {
					return `${num2EngTh(t)}-${n.str}-${num2EngTh(d)}`;
				} else {
					return `${num2EngTh(t)}-${n.str}`;
				}
			}
		}
	}
	return result;
};

export function num2En(num) {
	return num2Eng(num);
}

export function num2EnT(num) {
	return num2EngTh(num);
}

export function UUID(format) {
	return (format || "el-xxxxxxxxxxxx").replace(/[xy]/g, (c) => {
		let r = (Math.random() * 16) | 0,
			v = c === "x" ? r : (r & 0x3) | 0x8;
		return v.toString(16);
	});
}

export function isHTML(str) {
	if (typeof str === "string") {
		return /<\/?[a-z][\s\S]*>/i.test(str) || /\&\#\x\S{4}\;/i.test(str);
	}
}

function isListed(val, listed) {
	if (listed) {
		if (Array.isArray(listed) && listed.includes(val)) {
			return true;
		} else {
			return listed === val;
		}
	} else {
		return true;
	}
}

function isSupported(val, supported, unsupported) {
	if (unsupported && isListed(val, unsupported)) {
		return false;
	}

	if (supported && isListed(val, supported)) {
		return true;
	}

	return true;
}

export function multiClass(val, format, supported, unsupported) {
	if (val || val === 0) {
		return val || val === 0
			? Array.isArray(val)
				? val
						.map((i) => {
							return isSupported(i, supported, unsupported) ? format.replace("$1", i) : i;
						})
						.join(" ")
				: isSupported(val, supported, unsupported)
				? format.replace("$1", val)
				: val
			: null;
	} else {
		return val;
	}
}

export function documentReady(callback) {
	if (document.readyState != "loading") {
		// in case the document is already rendered
		fnTheme.init();
		authCheck(callback);
	} else if (document.addEventListener) {
		// modern browsers
		document.addEventListener("DOMContentLoaded", () => {
			fnTheme.init();
			authCheck(callback);
		});
	} else {
		// IE <= 8
		document.attachEvent("onreadystatechange", () => {
			if (document.readyState == "complete") {
				fnTheme.init();
				authCheck(callback);
			}
		});
	}
}

function authCheck(callback) {
	let p = new URLSearchParams(window.location.search);

	let validateUser = p.get("validateUser");
	let resetPassword = p.get("resetPassword");

	if (validateUser || resetPassword) {
		let usr = require("./user.js");

		if (validateUser) {
			usr.validate(validateUser, () => {
				new usr.signin({
					msg: "Email validated. Please sign in to continue.",
					callback: () => {
						window.location = window.location.origin + window.location.pathname;
					},
				}).show();
			});
		} else if (resetPassword) {
			new usr.changepass_guest({
				token: resetPassword,
				callback: () => {
					new usr.signin({
						msg: "Password changed. Please sign in to continue.",
						callback: () => {
							window.location = window.location.origin + window.location.pathname;
						},
					}).show();
				},
			}).show();
		}
	} else {
		callback();
	}
}

export function countElement(node) {
	let child = node.childNodes;
	let cnt = child.length;

	child.forEach((i) => {
		cnt += countElement(i);
	});

	return cnt;
}

export function getValue(container) {
	if (container) {
		let elem = container.querySelectorAll("[name]");
		if (elem && elem.length > 0) {
			let rtn = {};

			elem.forEach((i) => {
				let type = i.getAttribute("type");
				let name = i.getAttribute("name");

				switch (type) {
					case "radio":
						if (!rtn.hasOwnProperty(name)) {
							rtn[name] = null;
						}

						if (i.checked) {
							rtn[name] = i.value;
						}

						break;
					case "checkbox":
						if (!rtn.hasOwnProperty(name)) {
							rtn[name] = [];
						}

						if (i.checked) {
							rtn[name].push(i.value);
						}

						break;
					case "number":
					case "range":
						rtn[name] = parseNumber(i.value);
					default:
						rtn[name] = i.value ? i.value : null;
				}
			});

			return rtn;
		} else {
			let type = container.getAttribute("type");

			switch (type) {
				case "radio":
				case "checkbox":
					return container.checked;
				case "number":
				case "range":
					return parseNumber(container.value);
				default:
					return container.value ? container.value : null;
			}
		}
	}

	return null;
}

export function setValue(container, value) {
	if (container) {
		let elem = container.querySelectorAll("[name]");
		if (elem && elem.length > 0) {
			elem.forEach((i) => {
				let val = value[i.getAttribute("name")];
				if (val) {
					let type = i.getAttribute("type");
					switch (type) {
						case "radio":
							i.checked = i.value === val;

							break;
						case "checkbox":
							if (Array.isArray(val)) {
								i.checked = val.includes(i.value);
							} else {
								i.checked = val === i.value;
							}

							break;
						default:
							i.value = val;
					}
				}
			});
		} else {
			let type = container.getAttribute("type");

			switch (type) {
				case "radio":
				case "checkbox":
					container.checked = value;
					break;
				default:
					container.value = value;
			}
		}
	}
}

function isFloat(val) {
	return parseFloat(val.match(/^-?\d*(\.\d+)?$/)) > 0;
}

function parseNumber(val) {
	if (!isNaN(val)) {
		if (isFloat(val)) {
			return Number.parseFloat(val);
		} else {
			return Number.parseInt(val);
		}
	} else {
		return val;
	}
}

export function focusElement(elem, option) {
	option = extend({}, { behavior: "smooth", block: "start" }, option);
	elem?.scrollIntoView(option);
}

function getElementValue(element) {
	let type = element.getAttribute("type");
	switch (type) {
		case "radio":
		case "checkbox":
			if (element.checked) {
				return element.value;
			}

			break;
		case "number":
		case "range":
			return parseNumber(element.value);
		default:
			return element.value;
	}

	return null;
}

function validateElem(ctl) {
	let val = getElementValue(ctl);

	//validate required
	if (ctl.hasAttribute("required")) {
		if (val === null || val === "") {
			return false;
		}
	}

	//validate minlength
	if (ctl.hasAttribute("minlength")) {
		if (val.length < parseInt(ctl.getAttribute("minlength"))) {
			return false;
		}
	}

	//validate minlength
	if (ctl.hasAttribute("maxlenght")) {
		if (val.length < parseInt(ctl.getAttribute("maxlenght"))) {
			return false;
		}
	}

	//validate email
	if (ctl.getAttribute("type") === "email") {
		if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(val)) {
			return false;
		}
	}

	return true;
}
export function validate(container, callback) {
	var listofctl = container.querySelectorAll("[name]");
	if (listofctl) {
		container.classList.remove("was-validated");
		listofctl.forEach((item) => {
			item.classList.remove("is-invalid");
			item.classList.remove("is-valid");
			item.setCustomValidity(null);

			if (validateElem(item)) {
				item.classList.add("is-valid");
			} else {
				item.classList.add("is-invalid");
				item.setCustomValidity("invalid");
			}
		});

		// container.classList.add("was-validated");

		var invalidctl = container.querySelectorAll(".is-invalid");
		if (typeof callback === "function") {
			if (invalidctl && invalidctl.length > 0) {
				callback(false);
			} else {
				callback(true);
			}
		} else {
			if (invalidctl && invalidctl.length > 0) {
				return false;
			} else {
				return true;
			}
		}
	}
}

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
	"readOnly",
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
						let k = combineArray(Array.from(new Set(arg[i])), " ");
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
						if (DEBUG) console.log(`Attach ${i} to ${elemInfo(elems)}`);
						//console.warn(`Element ${elemInfo(elems)} has ${i} function`);
						elems.addEventListener(i.startsWith("on") ? i.substring(2) : i, arg[i], false);

						//create function to remove EventListener
						elems.detachEventListener = (sender) => {
							if (DEBUG) console.log(`Remove ${i} from ${elemInfo(sender)}`);
							sender.removeEventListener(i.startsWith("on") ? i.substring(2) : i, arg[i], false);
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
										console.info("i is not elem or [elem] or string or number or boolean", i);
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
				if (item.detachEventListener instanceof Function) {
					item.detachEventListener(item);
				}
			});
		}

		if (elem.detachEventListener instanceof Function) {
			elem.detachEventListener(elem);
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
	if (DEBUG) console.time("appendChild");
	let n = node(data);
	if (Node.prototype.isPrototypeOf(n)) {
		container.appendChild(n);
	} else if (NodeList.prototype.isPrototypeOf(n)) {
		n.forEach((i) => {
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
		n.forEach((i) => {
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
		n.forEach((i) => {
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
	popoverTriggerList.map((popoverTriggerEl) => {
		let elem = new bootstrap.Popover(popoverTriggerEl);

		elem.detachEventListener = (sender) => {
			if (DEBUG) console.log(`Remove popover from ${elemInfo(sender)}`);
			bootstrap.Popover.getInstance(sender)?.dispose();
			sender.detachEventListener = null;
			delete sender.detachEventListener;
		};

		return elem;
	});

	let tooltipTriggerList = [].slice.call(container.querySelectorAll('[data-bs-toggle="tooltip"]'));
	tooltipTriggerList.map((tooltipTriggerEl) => {
		let elem = new bootstrap.Tooltip(tooltipTriggerEl);

		elem.detachEventListener = (sender) => {
			if (DEBUG) console.log(`Remove tooltip from ${elemInfo(sender)}`);
			bootstrap.Tooltip.getInstance(sender)?.dispose();
			sender.detachEventListener = null;
			delete sender.detachEventListener;
		};

		return elem;
	});
}
