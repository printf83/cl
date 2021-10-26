"use strict";
import cont from "./cont.js";

export default class h extends cont {
	constructor(level, ...arg) {
		super(`h${level}`, ...arg);
	}
}
