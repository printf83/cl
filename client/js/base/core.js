"use strict";
Array.prototype.removeEmpty = function () {
	return this.filter(Boolean);
};

Array.prototype.combine = function (delimeter) {
	return this.removeEmpty().join(delimeter);
};

String.prototype.capitalize = function () {
	return this.charAt(0).toUpperCase() + this.slice(1);
};

export const baseIcon = {
	i: { icon: "info-circle", style: "fas", color: "primary", textcolor: "light" },
	"!": { icon: "exclamation-triangle", style: "fas", color: "warning", textcolor: "dark" },
	"!!": { icon: "exclamation-triangle", style: "fas", color: "danger", textcolor: "light" },
	"?": { icon: "question-circle", style: "fas", color: "success", textcolor: "light" },
	"/": { icon: "check-circle", style: "fas", color: "success", textcolor: "light" },
	x: { icon: "times-circle", style: "fas", color: "danger", textcolor: "light" },
	"-": { icon: "minus-circle", style: "fas", color: "danger", textcolor: "light" },
};

export function getBaseIcon(icon) {
	if (icon && typeof icon === "string") {
		if (baseIcon.hasOwnProperty(icon)) {
			return baseIcon[icon];
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
		if (a && b) {
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
		} else if (a && !b) {
			return a;
		} else if (!a && b) {
			return b;
		} else {
			return null;
		}
	},
	style: function (a, b) {
		if (a && b) {
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
		} else if (a && !b) {
			return a;
		} else if (!a && b) {
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
	if (isListed(val, unsupported)) {
		return false;
	} else {
		return isListed(val, supported);
	}
}

export function multiClass(val, format, supported, unsupported) {
	//core.multiClass(["lg-12","xl-3","md-2","2"],"col-$1")
	return val
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
