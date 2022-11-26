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

	return argBtn.map((i, ix) => {
		if (i instanceof Function) {
			return {
				label: ix <= defButton.length ? defButton[ix] : `Button ${ix + 1}`,
				color: ix === 0 && defColor ? defColor : null,
				click: i,
			};
		} else if (typeof i === "object") {
			return i;
		} else if (typeof i === "string") {
			return { label: i };
		}
	});
}

function elemBuilder(elem) {
	let argElem = Array.isArray(elem) ? elem : [elem];

	return new container.form(
		argElem.map((i, ix) => {
			return typeof i === "string"
				? new input({
						type: i,
						required: true,
						name: ix === 0 ? "value" : `value_${ix}`,
				  })
				: i;
		})
	);
}

/**
 * icon, msg, callback
 * icon, msg, button : {label,color,click}
 * msg, callback
 * msg, button : {label,color,click}
 * opt : {modal option}
 */
export class msgbox extends modal {
	constructor(...opt) {
		super(
			core.args(
				[
					{
						rule: [
							"string",
							"string|string[]|cl|cl[]",
							"string|string[]|object|object[]|function|function[]",
							"string|null",
							"string|string[]|null",
							"debug",
						],
						fn: () => {
							let bI = core.getBaseIcon(opt[0]);

							return {
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
								title: opt[3] === null ? undefined : opt[3],
								size: opt[4] === null ? undefined : opt[4],
								debug: true,
							};
						},
					},
					{
						rule: [
							"string",
							"string|string[]|cl|cl[]",
							"string|string[]|object|object[]|function|function[]",
							"string|null",
							"string|string[]|null",
						],
						fn: () => {
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
								title: opt[3] === null ? undefined : opt[3],
								size: opt[4] === null ? undefined : opt[4],
							});
						},
					},
					{
						rule: [
							"string",
							"string|string[]|cl|cl[]",
							"string|string[]|object|object[]|function|function[]",
							"string|null",
						],
						fn: () => {
							let bI = core.getBaseIcon(opt[0]);

							return {
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
								title: opt[3] === null ? undefined : opt[3],
							};
						},
					},
					{
						rule: [
							"string",
							"string|string[]|cl|cl[]",
							"string|string[]|object|object[]|function|function[]",
						],
						fn: () => {
							let bI = core.getBaseIcon(opt[0]);

							return {
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
							};
						},
					},
					{
						rule: ["string|string[]|cl|cl[]", "string|string[]|object|object[]|function|function[]"],
						fn: () => {
							return {
								elem: new msg({ weight: "md", elem: opt[0] }),
								button: btnBuilder(opt[1], ["Okay"], null, false),
							};
						},
					},
					{
						rule: ["object|debug"],
						fn: () => {
							return opt[0];
						},
					},
				],
				"dlg.msgbox",
				opt
			)
		);
	}
}

/**
 * icon, msg, callback
 * icon, msg, [callback]
 * icon, msg, button : {label,color,click}
 * icon, msg, [button : {label,color,click}]
 * msg, callback
 * msg, [callback]
 * msg, button : {label,color,click}
 * msg, [button : {label,color,click}]
 * opt : {modal option}
 */
export class confirmbox extends modal {
	constructor(...opt) {
		super();

		this.data = core.args(
			[
				{
					rule: [
						"string",
						"string|string[]|cl|cl[]",
						"string|string[]|object|object[]|function|function[]",
						"string|null",
						"string|string[]|null",
						"debug",
					],
					fn: () => {
						let bI = core.getBaseIcon(opt[0]);

						return {
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
							title: opt[3] === null ? undefined : opt[3],
							size: opt[4] === null ? undefined : opt[4],
							debug: true,
						};
					},
				},
				{
					rule: [
						"string",
						"string|string[]|cl|cl[]",
						"string|string[]|object|object[]|function|function[]",
						"string|null",
						"string|string[]|null",
					],
					fn: () => {
						let bI = core.getBaseIcon(opt[0]);

						return {
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
							title: opt[3] === null ? undefined : opt[3],
							size: opt[4] === null ? undefined : opt[4],
						};
					},
				},
				{
					rule: [
						"string",
						"string|string[]|cl|cl[]",
						"string|string[]|object|object[]|function|function[]",
						"string|null",
					],
					fn: () => {
						let bI = core.getBaseIcon(opt[0]);

						return {
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
							title: opt[3] === null ? undefined : opt[3],
						};
					},
				},
				{
					rule: ["string", "string|string[]|cl|cl[]", "string|string[]|object|object[]|function|function[]"],
					fn: () => {
						let bI = core.getBaseIcon(opt[0]);

						return {
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
						};
					},
				},
				{
					rule: ["string|string[]|cl|cl[]", "string|string[]|object|object[]|function|function[]"],
					fn: () => {
						return {
							elem: new msg({ weight: "md", elem: opt[0] }),
							button: btnBuilder(opt[1], ["Okay", "Cancel", "Retry"], null, true),
						};
					},
				},
				{
					rule: ["object"],
					fn: () => {
						return opt[0];
					},
				},
			],
			"dlg.msgbox",
			opt
		);
	}
}

/**
 * type, msg, callback
 * type, msg, [callback]
 * type, msg, button : {label,color,click}
 * type, msg, [button : {label,color,click}]
 * type, callback
 * type, [callback]
 * type, button : {label,color,click}
 * type, [button : {label,color,click}]
 * elem, callback
 * elem, [callback]
 * elem, button : {label,color,click}
 * elem, [button : {label,color,click}]
 * opt : {modal option}
 */
export class inputbox extends modal {
	constructor(...opt) {
		super();

		this.data = core.args(
			[
				{
					rule: [
						"string|string[]|cl|cl[]",
						"string|null",
						"string|string[]|object|object[]|function|function[]",
						"string|null",
						"string|string[]|null",
						"debug",
					],
					fn: () => {
						return {
							elem: [opt[1] ? new p({ elem: opt[1] }) : null, elemBuilder(opt[0])].filter(Boolean),
							button: btnBuilder(opt[2], ["Okay", "Cancel", "Retry"], null, true),
							title: opt[3] === null ? undefined : opt[3],
							size: opt[4] === null ? undefined : opt[4],
							debug: true,
						};
					},
				},
				{
					rule: [
						"string|string[]|cl|cl[]",
						"string|null",
						"string|string[]|object|object[]|function|function[]",
						"string|null",
						"string|string[]|null",
					],
					fn: () => {
						return {
							elem: [opt[1] ? new p({ elem: opt[1] }) : null, elemBuilder(opt[0])].filter(Boolean),
							button: btnBuilder(opt[2], ["Okay", "Cancel", "Retry"], null, true),
							title: opt[3] === null ? undefined : opt[3],
							size: opt[4] === null ? undefined : opt[4],
						};
					},
				},
				{
					rule: [
						"string|string[]|cl|cl[]",
						"string|null",
						"string|string[]|object|object[]|function|function[]",
						"string|null",
					],
					fn: () => {
						return {
							elem: [opt[1] ? new p({ elem: opt[1] }) : null, elemBuilder(opt[0])].filter(Boolean),
							button: btnBuilder(opt[2], ["Okay", "Cancel", "Retry"], null, true),
							title: opt[3] === null ? undefined : opt[3],
						};
					},
				},
				{
					rule: [
						"string|string[]|cl|cl[]",
						"string|null",
						"string|string[]|object|object[]|function|function[]",
					],
					fn: () => {
						return {
							elem: [opt[1] ? new p({ elem: opt[1] }) : null, elemBuilder(opt[0])].filter(Boolean),
							button: btnBuilder(opt[2], ["Okay", "Cancel", "Retry"], null, true),
						};
					},
				},
				{
					rule: ["string|string[]|cl|cl[]", "string|string[]|object|object[]|function|function[]"],
					fn: () => {
						return {
							elem: elemBuilder(opt[0]),
							button: btnBuilder(opt[1], ["Okay", "Cancel", "Retry"], null, true),
						};
					},
				},
				{
					rule: ["object"],
					fn: () => {
						return opt[0];
					},
				},
			],
			"dlg.inputbox",
			opt
		);
	}
}
