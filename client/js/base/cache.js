"use strict";

export default class cache {
	constructor(init) {
		this._d = new Map(init);
	}
	clear() {
		this._d = new Map();
	}
	delete(k) {
		return this._d.delete(k);
	}
	get(k) {
		return this._d.get(k);
	}
	has(k) {
		return this._d.has(k);
	}
	set(k, v) {
		this._d.set(k, v);
		return this;
	}
}
