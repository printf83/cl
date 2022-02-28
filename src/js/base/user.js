"use strict";
import * as core from "./core.js";
import msg from "./msg.js";
import modal from "./modal.js";
import p from "./p.js";
import input from "./input.js";
import * as container from "./container.js";
import div from "./div.js";
import icon from "./icon.js";
import h from "./h.js";
import button from "./button.js";

/**
 * icon, msg, callback
 * icon, msg, button : {label,color,onclick}
 * msg, callback
 * msg, button : {label,color,onclick}
 * opt : {modal option}
 */

let defaultOption = {};
export class login extends div {
	constructor(opt) {
		super(opt);
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		opt = core.extend({}, defaultOption, opt);

		super.data = {
			position: "relative",
			class: ["w-100", "h-100"],
			elem: new div({
				style: { "max-width": "320px" },
				margin: "auto",
				align: "center",
				elem: new container.form([
					new icon({
						icon: "fire",
						weight: "3x",
					}),
					new h(3, "Please sign in"),
					new input({
						name: "email",
						type: "email",
						label: "Email address",
						floatlabel: true,
					}),
					new input({
						name: "password",
						type: "password",
						label: "Password",
						floatlabel: true,
					}),
					new input({
						name: "remember",
						type: "checkbox",
						label: "Remember me",
					}),
					new button({
						label: "Sign in",
						color: "primary",
						weight: "lg",
					}),
				]),
			}),
		};
	}
}
