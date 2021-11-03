"use strict";

import button from "./button.js";

export default class dropdown extends button {
	constructor(...arg) {
		super();

		if (arg && arg.length > 0) {
			this.data = arg;
		} else {
			this.data = null;
		}
	}

	get data() {
		return this._data;
	}
	set data(d) {
		if (d) {
			this._d = d;
		} else {
			this.d = null;
		}

		super.data = this._d;
	}
}
