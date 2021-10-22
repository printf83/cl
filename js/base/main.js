Array.prototype.removeEmpty = function () {
	return this.filter(Boolean);
};

Array.prototype.combine = function (delimeter) {
	return this.removeEmpty().join(delimeter);
};

String.prototype.capitalize = function () {
	return this.charAt(0).toUpperCase() + this.slice(1);
};

export const cl = {};

export const core = {
	extend: function (out) {
		out = out || {};

		for (var i = 1; i < arguments.length; i++) {
			if (!arguments[i]) continue;

			for (var key in arguments[i]) {
				if (arguments[i].hasOwnProperty(key)) out[key] = arguments[i][key];
			}
		}

		return out;
	},
};
