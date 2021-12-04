"use strict";
import * as core from "./core.js";
import msg from "./msg.js";
import modal from "./modal.js";
import p from "./p.js";
import div from "./div.js";
import input from "./input.js";
import * as container from "./container.js";

function btnBuilder(btn, defButton, defColor, pushCancel) {
	let argBtn = Array.isArray(btn) ? btn : [btn];
	if (pushCancel && argBtn.length === 1) argBtn.push("Cancel");

	return argBtn.map(function (i, ix) {
		return i instanceof Function
			? {
					label: ix <= defButton.length ? defButton[ix] : `Button ${ix + 1}`,
					color: ix === 0 && defColor ? defColor : null,
					onclick: i,
			  }
			: i;
	});
}

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
					elem: new msg({
						weight: "md",
						icon: bI
							? {
									icon: bI.icon,
									color: bI.color,
							  }
							: arg[0],
						elem: arg[1],
					}),
					defautlbtncolor: bI ? bI.color : null,
					button: btnBuilder(arg[2], ["Okay"], bI?.color, false),
				});
			} else if (arg.length === 2) {
				super({
					elem: new msg({ weight: "md", elem: arg[0] }),
					button: btnBuilder(arg[2], ["Okay"], null, false),
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
				let bI = core.getBaseIcon(arg[0]);

				super({
					elem: new msg({
						weight: "md",
						icon: bI
							? {
									icon: bI.icon,
									color: bI.color,
							  }
							: arg[0],
						elem: arg[1],
					}),
					defautlbtncolor: bI ? bI.color : null,
					button: btnBuilder(arg[2], ["Okay", "Cancel", "Retry"], bI?.color, true),
				});
			} else if (arg.length === 2) {
				super({
					elem: new msg({ weight: "md", elem: arg[0] }),
					button: btnBuilder(arg[1], ["Okay", "Cancel", "Retry"], null, true),
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

function elemBuilder(elem) {
	let argElem = Array.isArray(elem) ? elem : [elem];

	return new container.form(
		argElem.map(function (i, ix) {
			return typeof i === "string" ? new input({ type: i, name: ix === 0 ? "value" : `value_${ix}` }) : i;
		})
	);
}

/**
 * type, msg, callback
 * type, msg, [callback]
 * type, msg, button : {label,color,onclick}
 * type, msg, [button : {label,color,onclick}]
 * type, callback
 * type, [callback]
 * type, button : {label,color,onclick}
 * type, [button : {label,color,onclick}]
 * elem, callback
 * elem, [callback]
 * elem, button : {label,color,onclick}
 * elem, [button : {label,color,onclick}]
 * opt : {modal option}
 */
export class inputbox extends modal {
	constructor(...arg) {
		if (arg && arg.length > 0) {
			if (arg.length === 3) {
				super({
					elem: [new p({ elem: arg[1] }), elemBuilder(arg[0])],
					button: btnBuilder(arg[2], ["Okay", "Cancel", "Retry"], null, true),
				});
			} else if (arg.length === 2) {
				super({
					elem: elemBuilder(arg[0]),
					button: btnBuilder(arg[1], ["Okay", "Cancel", "Retry"], null, true),
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
