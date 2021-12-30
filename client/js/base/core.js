"use strict";
// Array.prototype.removeEmpty = function () {
// 	return this.filter(Boolean);
// };

// Array.prototype.combine = function (delimeter) {
// 	return this.removeEmpty().join(delimeter);
// };

// String.prototype.capitalize = function () {
// 	return this.charAt(0).toUpperCase() + this.slice(1);
// };

export function combineArray(arr, delimeter) {
	return removeEmptyArray(arr)?.join(delimeter);
}

export function removeEmptyArray(arr) {
	return arr.filter(Boolean);
}

export function capitalize(str) {
	return str.toLowerCase().replace(/(^\w{1})|(\s+\w{1})/g, (match) => match.toUpperCase());
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
	class: function (a, b) {
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
	style: function (a, b) {
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
	attr: function (a, b, rules) {
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
export function UUID(format) {
	return (format || "el-xxxxxxxxxxxx").replace(/[xy]/g, function (c) {
		var r = (Math.random() * 16) | 0,
			v = c === "x" ? r : (r & 0x3) | 0x8;
		return v.toString(16);
	});
}
export function isHTML(str) {
	if (typeof str === "string") {
		return /<\/?[a-z][\s\S]*>/i.test(str);
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
						.map(function (i) {
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
		callback();
	} else if (document.addEventListener) {
		// modern browsers
		document.addEventListener("DOMContentLoaded", callback);
	} else {
		// IE <= 8
		document.attachEvent("onreadystatechange", function () {
			if (document.readyState == "complete") callback();
		});
	}
}
export function countElement(node) {
	let child = node.childNodes;
	let cnt = child.length;

	child.forEach(function (i) {
		cnt += countElement(i);
	});

	return cnt;
}

export function getValue(container) {
	let elem = container.querySelectorAll("[name]");
	if (elem && elem.length > 0) {
		let rtn = {};

		elem.forEach(function (i) {
			let type = i.getAttribute("type");
			switch (type) {
				case "radio":
					if (i.checked) {
						rtn[i.getAttribute("name")] = i.value;
					}

					break;
				case "checkbox":
					if (!rtn.hasOwnProperty(i.getAttribute("name"))) {
						rtn[i.getAttribute("name")] = [];
					}

					if (i.checked) {
						rtn[i.getAttribute("name")].push(i.value);
					}

					break;
				default:
					rtn[i.getAttribute("name")] = i.value ? i.value : null;
			}
		});

		return rtn;
	}

	return null;
}

export function setValue(container, value) {
	let elem = container.querySelectorAll("[name]");
	if (elem && elem.length > 0 && value) {
		elem.forEach(function (i) {
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
		default:
			return element.value ? element.value : null;
	}

	return null;
}

export function validate(container, callback) {
	var listofctl = container.querySelectorAll("[name]");
	if (listofctl) {
		container.classList.remove("was-validated");
		listofctl.forEach(function (ctl) {
			if (ctl.hasAttribute("required")) {
				if (getElementValue(ctl) !== null) {
					ctl.classList.add("is-valid");
					ctl.classList.remove("is-invalid");
				} else {
					ctl.classList.add("is-invalid");
					ctl.classList.remove("is-valid");
				}
			}
		});
		container.classList.add("was-validated");

		var invalidctl = container.querySelectorAll(".is-invalid");
		if (invalidctl && invalidctl.length > 0) {
			callback(false);
		} else {
			callback(true);
		}
	}
}
