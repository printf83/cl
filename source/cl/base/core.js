"use strict";
import * as base from "./base.js";

export function capitalize(str) {
	return str.toLowerCase().replace(/(^\w{1})|(\s+\w{1})/g, (match) => match.toUpperCase());
}

//rnd(max)
//rnd(min,max)
export function rnd(max, min) {
	if (min === undefined) {
		min = 0;
	} else {
		let t = max;
		max = min;
		min = t;
	}

	return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function shufflearray(arr) {
	for (let i = arr.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1));
		[arr[i], arr[j]] = [arr[j], arr[i]];
	}

	return arr;
}

const rdb = {};

export function randomdb(name, db) {
	let db_length = db.length;

	if (!rdb[name]) {
		rdb[name] = {
			x: 0,
		};
	}

	if (rdb[name].x === 0) {
		if (rdb[name].i) {
			//have old value
			let last_i_value = rdb[name].i[db_length - 1];

			//shuffle new db
			rdb[name].i = shufflearray(Array.from({ length: db_length }, (_, index) => index));

			//check if last value same with new value
			if (last_i_value === rdb[name].i[0]) {
				//swap first with end
				rdb[name].i[0] = rdb[name].i[db_length - 1];
				rdb[name].i[db_length - 1] = last_i_value;
			}
		} else {
			rdb[name].i = shufflearray(Array.from({ length: db_length }, (_, index) => index));
		}
	}

	if (rdb[name].x + 1 >= db_length) {
		rdb[name].x = 0;
		return randomdb(name, db);
	} else {
		rdb[name].x = rdb[name].x + 1;

		let x = rdb[name].x - 1;
		let i = rdb[name].i[x];
		let r = db[i];
		return r;
	}
}

export const cookie = {
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

export const codemarker = (container) => {
	let com = container.getElementsByClassName("com");
	if (com && com.length > 0) {
		Array.prototype.forEach.call(com, (i) => {
			if (i.innerText === "/*marker*/") {
				i.innerHTML = `<span class="nocode marker inline"></span>`;
			} else if (i.innerText === "") {
				i.innerHTML = `<span class="nocode marker inline-end"></span>`;
			} else if (i.innerText === "//marker") {
				i.innerHTML = `<span class="nocode marker downline"></span>`;
			} else if (i.innerText === "//-") {
				i.innerHTML = `<span class="nocode marker downline-end"></span>`;
			}
		});
	}
};

export const isdarkcolor = (color) => {
	let scolor = color;
	if (color) {
		// Variables for red, green, blue values
		var r, g, b;

		// Check the format of the color, HEX or RGB?
		if (color.match(/^rgb/)) {
			// If RGB --> store the red, green, blue values in separate variables
			color = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);

			r = color[1];
			g = color[2];
			b = color[3];
		} else {
			color = +("0x" + color.slice(1).replace(color.length < 5 && /./g, "$&$&"));

			r = color >> 16;
			g = (color >> 8) & 255;
			b = color & 255;
		}

		// from : https://stackoverflow.com/questions/12043187/how-to-check-if-hex-color-is-too-black
		var luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;
		if (setting.DEBUG > 2) console.log(`Color ${scolor} luma is ${luma}`);

		if (luma < 48) {
			if (setting.DEBUG > 2) console.log(`Color ${scolor} is dark`);
			return true;
		} else {
			if (setting.DEBUG > 2) console.log(`Color ${scolor} is light`);
			return false;
		}
	} else {
		console.warn(`Color NULL is light`);
		return false;
	}
};

export const getcssvar = (name) => {
	let style = getComputedStyle(document.body);
	let result_1 = style.getPropertyValue(`--bs-${name}-rgb`);
	if (result_1) {
		return `rgb(${result_1})`;
	} else {
		let result_2 = style.getPropertyValue(`--bs-${name}`);
		if (result_2) {
			return result_2;
		} else {
			console.error(`Css var --bs-${name} or --bs-${name}-rgb not found`);
			return null;
		}
	}
};

export const loadcss = (url, callback) => {
	// load me some stylesheet
	let body = document.getElementsByTagName("body")[0];

	// body.style.display = "none";

	let head = document.getElementsByTagName("head")[0];
	let link = document.createElement("link");
	let id = UUID();

	link.id = id;
	link.type = "text/css";
	link.rel = "stylesheet";

	link.onload = () => {
		let elem = document.getElementById(id);
		if (elem) {
			//TODO:setupeventlistenerremover
			detachEventListener(elem);
			elem.remove();
		}

		// body.style.display = null;
		callback();
	};

	link.href = url;

	head.appendChild(link);
};

const _setting = {
	icon: null,
	title: null,
	userchange: null,
	term: null,
	banner: null,
	themechange: null,
	debug: 0,
};

export const setting = {
	get DEBUG() {
		return _setting.debug;
	},
	set DEBUG(value) {
		_setting.debug = value;
		base.setting.DEBUG = value;
	},
	get icon() {
		if (_setting.icon) {
			return _setting.icon;
		} else {
			//default setting icon
			return (color, weight) => {
				return {
					color: color ? color : null,
					weight: weight ? weight : null,
					icon: "fire",
				};
			};
		}
	},
	set icon(fn) {
		if (fn && typeof fn === "function") {
			_setting.icon = fn;
		} else {
			_setting.icon = null;
		}
	},
	get title() {
		if (_setting.title) {
			return _setting.title;
		} else {
			return () => "BS5.2 JS Builder";
		}
	},
	set title(fn) {
		if (fn && typeof fn === "function") {
			_setting.title = fn;
		} else {
			_setting.title = null;
		}
	},
	get userchange() {
		return _setting.userchange;
	},
	set userchange(fn) {
		_setting.userchange = fn;
	},
	get term() {
		return _setting.term;
	},
	set term(fn) {
		_setting.term = fn;
	},
	get banner() {
		return _setting.banner;
	},
	set banner(fn) {
		_setting.banner = fn;
	},
	get theme() {
		return cookie.get("theme");
	},
	set theme(value) {
		cookie.set("theme", value);
		let css_bootstrap = document.getElementById("css_bootstrap");
		let css_bootswatch = document.getElementById("css_bootswatch");

		if (css_bootstrap && css_bootswatch) {
			loadcss(
				value
					? `https://cdn.jsdelivr.net/npm/bootswatch@5.2.0/dist/${value}/bootstrap.min.css`
					: `https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css`,
				() => {
					if (value) {
						css_bootswatch.href = `https://cdn.jsdelivr.net/npm/bootswatch@5.2.0/dist/${value}/bootstrap.min.css`;
						css_bootswatch.removeAttribute("disabled");
						setTimeout(() => {
							css_bootstrap.setAttribute("disabled", "disabled");
						}, 300);
					} else {
						css_bootstrap.removeAttribute("disabled");
						setTimeout(() => {
							css_bootswatch.setAttribute("disabled", "disabled");
						}, 300);
					}

					if (_setting.themechange && typeof _setting.themechange === "function") {
						_setting.themechange(value);
					}
				}
			);
		} else {
			console.error("#css_bootstrap and #css_bootswatch not found");
		}
	},
	get themechange() {
		return _setting.themechange;
	},
	set themechange(fn) {
		_setting.themechange = fn;
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
	if (icon && typeof icon === "string") {
		if (baseIcon.hasOwnProperty(icon)) {
			let bI = baseIcon[icon];

			return {
				icon: bI.icon,
				type: bI.type,
				color: bI.color,
			};
		}
	}
	return null;
}

export function importJS(path, callback) {
	import(path).then((obj) => {
		if (typeof obj.default === "undefined") {
			callback(obj);
		} else {
			callback(obj.default);
		}
	});
}

export function importJSPromise(p, callback) {
	p.then((obj) => {
		if (typeof obj.default === "undefined") {
			callback(obj);
		} else {
			callback(obj.default);
		}
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

export const args = base.multipleConstructorClass;

export const merge = base.mergeObject;
export const mergeClass = base.mergeClass;
export const mergeStyle = base.mergeStyle;

export function documentReady(callback) {
	elemReady(document, () => {
		setting.theme = setting.theme;
		authCheck(callback);
		// welcomeLog();
	});
}

export function elemReady(elem, callback) {
	if (elem.readyState != "loading") {
		callback();
	} else if (document.addEventListener) {
		// modern browsers
		elem.addEventListener("DOMContentLoaded", callback, false);

		//setup eventlistenerremover
		setupEventListenerRemover("elemReady", elem, () => {
			deleteEventListener("elemReady", elem, () => {
				elem.removeEventListener("DOMContentLoaded", callback, false);
			});
		});
	} else {
		// IE <= 8
		let fn = () => {
			if (document.readyState == "complete") {
				callback();
			}
		};

		elem.attachEvent("onreadystatechange", fn);

		//setup eventlistenerremover
		setupEventListenerRemover("elemReady", elem, () => {
			deleteEventListener("elemReady", elem, () => {
				elem.detachEvent("onreadystatechange", fn);
			});
		});
	}
}

function authCheck(callback) {
	let p = new URLSearchParams(window.location.search);

	let validateUser = p.get("validateUser");
	let resetPassword = p.get("resetPassword");

	if (validateUser || resetPassword) {
		importJS("./user.js", (usr) => {
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
							msg: "Password changed. Please use your new password to sign in.",
							callback: () => {
								window.location = window.location.origin + window.location.pathname;
							},
						}).show();
					},
				}).show();
			}
		});
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

//multiclass support
export function multiClass(value, rules) {
	return base.multiClass(value, rules);
}

//multiclass support - end

//global elem
export function attachBadge(opt) {
	return base.attachBadge(opt);
}
export function attachTooltip(opt) {
	return base.attachTooltip(opt);
}
export function attachPopover(opt) {
	return base.attachPopover(opt);
}
//global elem - end

// BASE
export function combineArray(arr, delimeter) {
	return base.combineArray(arr, delimeter);
}

export function UUID(format) {
	return base.UUID(format);
}

export function isHTML(str) {
	return base.isHTML(str);
}

export function elemInfo(elem) {
	return base.elemInfo(elem);
}

export function detachEventListener(elem) {
	base.detachEventListener(elem);
}

export function removeChildElement(elem) {
	base.removeChildElement(elem);
}

export function removeElement(elem) {
	base.removeElement(elem);
}

export function appendChild(container, data) {
	return base.appendChild(container, data);
}

export function prependChild(container, data) {
	return base.prependChild(container, data);
}

export function replaceWith(elem, data) {
	return base.replaceWith(elem, data);
}

export function replaceChild(container, data) {
	return base.replaceChild(container, data);
}

export function setupEventListenerRemover(name, elem, fn) {
	base.setupEventListenerRemover(name, elem, fn);
}

export function deleteEventListener(name, elem, fn) {
	base.deleteEventListener(name, elem, fn);
}

export function init(container) {
	base.init(container);
}

export function html(data) {
	return base.html(data);
}

export function node(data) {
	return base.node(data);
}