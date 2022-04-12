"use strict";
import * as core from "./core.js";
import msg from "./msg.js";
import modal from "./modal.js";
import p from "./p.js";
import input from "./input.js";
import * as container from "./container.js";

function btnBuilder(btn, defButton, defColor, pushCancel) {
	let argBtn = Array.isArray(btn) ? btn : [btn];
	if (pushCancel && argBtn.length === 1) argBtn.push("Cancel");

	return argBtn.map(function (i, ix) {
		if (i instanceof Function) {
			return {
				label: ix <= defButton.length ? defButton[ix] : `Button ${ix + 1}`,
				color: ix === 0 && defColor ? defColor : null,
				onclick: i,
			};
		} else if (typeof i === "object") {
			return i;
		} else if (typeof i === "string") {
			return { label: i };
		}
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
	constructor(...opt) {
		if (opt && opt.length > 0) {
			if (opt.length === 5) {
				let bI = core.getBaseIcon(opt[0]);

				super({
					elem: new msg({
						weight: "md",
						icon: bI
							? {
									icon: bI.icon,
									color: bI.color,
							  }
							: opt[0],
						elem: opt[1],
					}),
					defautlbtncolor: bI ? bI.color : null,
					button: btnBuilder(opt[2], ["Okay"], bI?.color, false),
					title: opt[3],
					debug: opt[4]?.debug === true ? true : false,
				});
			} else if (opt.length === 4) {
				let bI = core.getBaseIcon(opt[0]);

				super({
					elem: new msg({
						weight: "md",
						icon: bI
							? {
									icon: bI.icon,
									color: bI.color,
							  }
							: opt[0],
						elem: opt[1],
					}),
					defautlbtncolor: bI ? bI.color : null,
					button: btnBuilder(opt[2], ["Okay"], bI?.color, false),
					title: opt[3],
				});
			} else if (opt.length === 3) {
				let bI = core.getBaseIcon(opt[0]);

				super({
					elem: new msg({
						weight: "md",
						icon: bI
							? {
									icon: bI.icon,
									color: bI.color,
							  }
							: opt[0],
						elem: opt[1],
					}),
					defautlbtncolor: bI ? bI.color : null,
					button: btnBuilder(opt[2], ["Okay"], bI?.color, false),
				});
			} else if (opt.length === 2) {
				super({
					elem: new msg({ weight: "md", elem: opt[0] }),
					button: btnBuilder(opt[1], ["Okay"], null, false),
				});
			} else if (opt.length === 1) {
				super(opt[0]);
			} else {
				console.error("Unsupported argument", opt);
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
	constructor(...opt) {
		if (opt && opt.length > 0) {
			if (opt.length === 5) {
				let bI = core.getBaseIcon(opt[0]);

				super({
					elem: new msg({
						weight: "md",
						icon: bI
							? {
									icon: bI.icon,
									color: bI.color,
							  }
							: opt[0],
						elem: opt[1],
					}),
					defautlbtncolor: bI ? bI.color : null,
					button: btnBuilder(opt[2], ["Okay", "Cancel", "Retry"], bI?.color, true),
					title: opt[3],
					debug: opt[4]?.debug === true ? true : false,
				});
			} else if (opt.length === 4) {
				let bI = core.getBaseIcon(opt[0]);

				super({
					elem: new msg({
						weight: "md",
						icon: bI
							? {
									icon: bI.icon,
									color: bI.color,
							  }
							: opt[0],
						elem: opt[1],
					}),
					defautlbtncolor: bI ? bI.color : null,
					button: btnBuilder(opt[2], ["Okay", "Cancel", "Retry"], bI?.color, true),
					title: opt[3],
				});
			} else if (opt.length === 3) {
				let bI = core.getBaseIcon(opt[0]);

				super({
					elem: new msg({
						weight: "md",
						icon: bI
							? {
									icon: bI.icon,
									color: bI.color,
							  }
							: opt[0],
						elem: opt[1],
					}),
					defautlbtncolor: bI ? bI.color : null,
					button: btnBuilder(opt[2], ["Okay", "Cancel", "Retry"], bI?.color, true),
				});
			} else if (opt.length === 2) {
				super({
					elem: new msg({ weight: "md", elem: opt[0] }),
					button: btnBuilder(opt[1], ["Okay", "Cancel", "Retry"], null, true),
				});
			} else if (opt.length === 1) {
				super(opt[0]);
			} else {
				console.error("Unsupported argument", opt);
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
			return typeof i === "string"
				? new input({ type: i, required: true, name: ix === 0 ? "value" : `value_${ix}` })
				: i;
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
	constructor(...opt) {
		if (opt && opt.length > 0) {
			if (opt.length === 5) {
				super({
					elem: [opt[1] ? new p({ elem: opt[1] }) : null, elemBuilder(opt[0])].filter(Boolean),
					button: btnBuilder(opt[2], ["Okay", "Cancel", "Retry"], null, true),
					title: opt[3],
					debug: opt[4]?.debug === true ? true : false,
				});
			} else if (opt.length === 4) {
				super({
					elem: [opt[1] ? new p({ elem: opt[1] }) : null, elemBuilder(opt[0])].filter(Boolean),
					button: btnBuilder(opt[2], ["Okay", "Cancel", "Retry"], null, true),
					title: opt[3],
				});
			} else if (opt.length === 3) {
				super({
					elem: [opt[1] ? new p({ elem: opt[1] }) : null, elemBuilder(opt[0])].filter(Boolean),
					button: btnBuilder(opt[2], ["Okay", "Cancel", "Retry"], null, true),
				});
			} else if (opt.length === 2) {
				super({
					elem: elemBuilder(opt[0]),
					button: btnBuilder(opt[1], ["Okay", "Cancel", "Retry"], null, true),
				});
			} else if (opt.length === 1) {
				super(opt[0]);
			} else {
				console.error("Unsupported argument", opt);
			}
		} else {
			super();
		}
	}
}
