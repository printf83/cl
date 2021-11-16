"use strict";
import * as core from "./core.js";
import msg from "./msg.js";
import modal from "./modal.js";

/**
 * icon, msg, callback
 * icon, msg
 * msg, callback
 * opt : {attr,id,class,animate,title,icon,elem,close,autohide,delay,color,textcolor,bordercolor,border,date,timer,position,show}
 */
export class msgbox extends modal {
	constructor(...arg) {
		if (arg && arg.length > 0) {
			if (arg.length === 3) {
				let bI = core.getBaseIcon(arg[0]);
				if (bI) {
					super({
						elem: new msg(
							"md",
							{
								icon: bI.icon,
								color: bI.color,
							},
							arg[1]
						),
						button: {
							label: "Okay",
							color: bI.color,
							onclick: function () {
								arg[2];
							},
						},
					});
				} else {
					super({
						elem: new msg("md", arg[0], arg[1]),
						button: {
							label: "Okay",
							onclick: function () {
								arg[2];
							},
						},
					});
				}
			} else if (arg.length === 2) {
				if (a[1] instanceof Function) {
					super({
						elem: new msg("md", null, arg[0]),
						button: {
							label: "Okay",
							onclick: function () {
								arg[1];
							},
						},
					});
				} else {
					let bI = core.getBaseIcon(arg[0]);
					if (bI) {
						super({
							elem: new msg(
								"md",
								{
									icon: bI.icon,
									color: bI.color,
								},
								arg[1]
							),
							button: {
								label: "Okay",
								color: bI.color,
							},
						});
					} else {
						super({
							elem: new msg("md", arg[0], arg[1]),
							button: "Okay",
						});
					}
				}
			} else if (arg.length === 1) {
				super(arg[0]);
			} else {
				console.error("Unsupported argument", arg);
			}
		} else {
			super();
		}
	}
}
