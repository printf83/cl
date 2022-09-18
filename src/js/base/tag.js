"use strict";
import * as core from "./core.js";

const defaultOption = {
	tag: null,
	elem: null,
};

export default class tag {
	_dom = null;
	_d = null;
	cl = 1; //name tag "cl" so we can check hasOwnProperty("cl")

	constructor(...opt) {
		this.data = core.args(
			[
				{
					rule: ["string|string[]", "cl|cl[]|string|string[]"],
					fn: () => {
						return {
							class: opt[0],
							elem: opt[1],
						};
					},
				},
				{
					rule: ["cl|cl[]|string|string[]|object[]"],
					fn: () => {
						return {
							elem: opt[0],
						};
					},
				},

				{
					rule: ["object"],
					fn: () => {
						return opt[0];
					},
				},

				{
					rule: null,
					fn: () => {
						return null;
					},
				},
			],
			"tag",
			opt
		);
	}

	get dom() {
		return this._dom;
	}
	set dom(element) {
		this._dom = element;
	}

	get data() {
		return this._d;
	}
	set data(opt) {
		opt = core.extend(defaultOption, opt); //core.extend({}, defaultOption, opt);

		//BS5.2
		if (!opt.textColor && !opt.textBgColor) {
			opt.textBgColor = opt.btnColor || opt.alertColor || opt.bgColor;
		}

		this._d = opt;
	}
}
