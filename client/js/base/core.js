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
			let bT = typeof a;
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
				console.error("Unhandle #r class rules");
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
export function multiClass(val, format) {
	//core.multiClass(["lg-12","xl-3","md-2","2"],"col-$1")
	return val
		? Array.isArray(val)
			? val
					.map(function (i) {
						return format.replace("$1", i);
					})
					.join(" ")
			: format.replace("$1", val)
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
