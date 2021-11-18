"use strict";
import * as core from "./core.js";
import msg from "./msg.js";
import modal from "./modal.js";

/**
 * icon, msg, callback
 * icon, msg, button : {label,color,onclick}
 * msg, callback
 * msg, button : {label,color,onclick}
 * opt : {modal option}
 */
export class msgbox extends modal {
	constructor(...arg) {
		if (arg && arg.length > 0) {
			if (arg.length === 3) {
				let bI = core.getBaseIcon(arg[0]);

				super({
					elem: new msg(
						"md",
						bI
							? {
									icon: bI.icon,
									color: bI.color,
							  }
							: arg[0],
						arg[1]
					),
					defautlbtncolor: bI ? bI.color : null,
					button:
						arg[2] instanceof Function
							? {
									label: "Okay",
									color: bI ? bI.color : null,
									onclick: arg[2],
							  }
							: arg[2],
				});
			} else if (arg.length === 2) {
				super({
					elem: new msg("md", null, arg[0]),
					button:
						arg[1] instanceof Function
							? {
									label: "Okay",
									onclick: arg[1],
							  }
							: arg[1],
				});
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

/**
 * icon, msg, callback
 * icon, msg, [callback]
 * icon, msg, button : {label,color,onclick}
 * icon, msg, [button : {label,color,onclick}]
 * msg, callback
 * msg, [callback]
 * msg, button : {label,color,onclick}
 * msg, [button : {label,color,onclick}]
 * opt : {modal option}
 */
export class confirmbox extends modal {
	constructor(...arg) {
		if (arg && arg.length > 0) {
			if (arg.length === 3) {
				let argBtn = Array.isArray(arg[2]) ? arg[2] : [arg[2]];
				if (argBtn.length === 1) argBtn.push("Cancel");

				let bI = core.getBaseIcon(arg[0]);

				super({
					elem: new msg(
						"md",
						bI
							? {
									icon: bI.icon,
									color: bI.color,
							  }
							: arg[0],
						arg[1]
					),
					defautlbtncolor: bI ? bI.color : null,
					button: argBtn.map(function (i, ix) {
						return i instanceof Function
							? {
									label: ix <= 3 ? ["Okay", "Cancel", "Retry"][ix] : `Button ${ix + 1}`,
									color: ix === 0 ? (bI ? bI.color : null) : null,
									onclick: i,
							  }
							: i;
					}),
				});
			} else if (arg.length === 2) {
				let argBtn = Array.isArray(arg[1]) ? arg[1] : [arg[1]];
				if (argBtn.length === 1) argBtn.push("Cancel");

				super({
					elem: new msg("md", null, arg[0]),
					button: argBtn.map(function (i, ix) {
						return i instanceof Function
							? {
									label: ix <= 3 ? ["Okay", "Cancel", "Retry"][ix] : `Button ${ix + 1}`,
									onclick: i,
							  }
							: i;
					}),
				});
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
