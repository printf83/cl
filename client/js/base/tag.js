"use strict";
import * as core from "./core.js";

/**
 * opt : {tag,attr,elem}
 */
export default class tag {
	_d = null;
	cl = 1; //name tag "cl" so we can check hasOwnProperty("cl")

	constructor(arg) {
		if (arg) {
			this.data = core.extend(
				{},
				{
					tag: null,
					attr: null,
					elem: null,
				},
				arg
			);
		} else {
			this.data = null;
		}
	}

	get data() {
		return this._d;
	}
	set data(d) {
		this.setting = d;
		this._d = d;
	}

	get setting() {
		return this._s;
	}
	set setting(d) {
		this._s = d;
	}
}
