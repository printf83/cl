"use strict";
import * as core from "./core.js";
import tag from "./tag.js";
import attr from "./attr.js";
import label from "./label.js";
import button from "./button.js";
import * as inputgroup from "./inputgroup.js";
import div from "./div.js";
import option from "./option.js";

/**
 * label
 * label, color
 * label, onclick
 * label, color, onclick
 * option
 */
export default class input extends tag {
	constructor(...arg) {
		super();

		let t = {
			label: null,
			color: null,
			onclick: null,
		};
		if (arg && arg.length === 3) {
			t.label = arg[0];
			t.color = arg[1];
			t.onclick = arg[2];
		} else if (arg && arg.length === 2 && arg[1] instanceof Function) {
			t.label = arg[0];
			t.onclick = arg[1];
		} else if (arg && arg.length === 2 && typeof arg[1] === "string") {
			t.label = arg[0];
			t.color = arg[1];
		} else if (arg && arg.length === 1 && typeof arg[0] === "string") {
			t.label = arg[0];
		} else {
			t = arg[0];
		}

		this.data = core.extend(
			{},
			{
				attr: null,

				id: null,
				name: null,

				type: "text", //checkbox,radio,text,number,textarea
				label: null,
				hidelabel: false,
				floatlabel: false,

				inline: false,
				labelsize: null,
				ctlsize: null,
				size: null,
				weight: null,

				value: null,
				checked: false,
				placeholder: null,
				option: null,

				numctl: false,
				addctl: null,

				min: null,
				max: null,
				step: null,
				row: null,
				multiple: false,
				required: false,

				valid: null,
				invalid: null,

				beforetype: "text",
				before: null,
				aftertype: "text",
				after: null,

				plaintext: false,
				readonly: false,
				disabled: false,

				container: true,
				flex: false,
				nowarp: false,

				onclick: null,
				onchange: null,
				onclick: null,
				onfocus: null,
				onblur: null,
			},
			t
		);
	}

	get data() {
		return this._d;
	}
	set data(d) {
		if (d) {
			//invalid and valid feedback only work one
			if (d.valid && d.invalid) {
				d.valid = null;
			}

			//floating label required label
			//disable floatlabel if no label
			if (d.floatlabel && !d.label && !d.hidelabel) {
				d.floatlabel = false;
			}

			//floating label not works with some input
			if (d.floatlabel) {
				if (["checkbox", "radio", "switch", "file"].includes(d.type) || d.readonly) {
					d.floatlabel = false;
				} else {
					if (d.label && !d.placeholder) {
						d.placeholder = d.label;
					}
				}
			}

			//if has label need id is mandatori
			if ((d.label && !d.id) || (d.option && d.type !== "select")) {
				d.id = core.UUID();
			}

			//auto mark beforetype and aftertype if numctl
			if (d.type === "number" && d.numctl) {
				d.beforetype = "button";
				d.aftertype = "button";
			}

			//automark aftertype if addctl provided
			if (d.addctl) {
				d.after = null;
				d.aftertype = "button";
			}

			//automark aftertype and beforetype if numctl provided
			if (d.numctl && d.type === "number") {
				d.before = null;
				d.beforetype = "button";
				d.after = null;
				d.aftertype = "button";
			}

			//before control
			let beforectl = d.before
				? d.beforetype === "text"
					? new inputgroup.text(d.before)
					: new tag({
							elem: d.before,
					  })
				: d.type === "number" && d.numctl
				? new button({
						icon: "minus",
						color: "primary",
						onclick: function (e) {
							let sender = e.currentTarget;
							let parent = sender.parentElement;
							let input = parent.getElementsByTagName("input")[0];
							let val = parseInt(input.value);
							let min = parseInt(input.min);
							let step = parseInt(input.step);

							val = val || min;
							step = step || 1;
							input.value = val - step;
							if (val - step < min) input.value = min;
						},
				  })
				: null;

			//after control
			let afterctl = d.after
				? d.aftertype === "text"
					? new inputgroup.text(d.after)
					: new tag({
							elem: d.after,
					  })
				: d.type === "number" && d.numctl
				? new button({
						icon: "plus",
						color: "primary",
						onclick: function (e) {
							let sender = e.currentTarget;
							let parent = sender.parentElement;
							let input = parent.getElementsByTagName("input")[0];
							let val = parseInt(input.value);
							let max = parseInt(input.max);
							let step = parseInt(input.step);

							val = val || max;
							step = step || 1;
							input.value = val + step;
							if (val + step > max) input.value = max;
						},
				  })
				: d.addctl
				? new button({
						icon: "plus",
						color: "primary",
						onclick: d.addctl,
				  })
				: null;

			//valid msg
			let validmsg = d.valid ? new div("valid-feedback", d.valid) : null;

			//invalid msg
			let invalidmsg = d.invalid ? new div("invalid-feedback", d.invalid) : null;

			//datalist
			let datalistctl = null;
			if (d.option && d.type !== "select") {
				datalistctl = new tag({
					tag: "datalist",
					attr: { id: `${d.id}-dl` },
					elem: new option(d.option, d.value),
				});
			}

			//label
			let labelctl = null;
			if (d.label && !d.hidelabel) {
				labelctl = new label({
					for: d.id,
					label: d.label,
					attr: {
						class: ["checkbox", "radio", "switch", "file"].includes(d.type)
							? "form-check-label"
							: d.labelsize
							? ["col-form-label", d.labelsize]
							: "form-label",
					},
				});
			}

			//main control
			let mainctl = null;
			switch (d.type) {
				case "switch":
				case "checkbox":
				case "radio":
					mainctl = new tag({
						tag: "input",
						attr: attr.merge(d.attr, {
							id: d.id,
							name: d.name,
							type: d.type === "switch" ? "checkbox" : d.type,
							class: "form-check-input",
							readonly: d.readonly,
							disabled: d.disabled,
							required: d.required,
							value: d.value,
							checked: d.checked,
							"aria-label": d.hidelabel && d.label ? d.label : null,

							onchange: d.onchange,
							onclick: d.onclick,
							onfocus: d.onfocus,
							onblur: d.onblur,
						}),
					});

					break;
				case "textarea":
					mainctl = new tag({
						tag: "textarea",
						attr: attr.merge(d.attr, {
							id: d.id,
							name: d.name,
							class: [
								d.plaintext && d.readonly ? "form-control-plaintext" : "form-control",
								d.weight &&
								!(
									d.before ||
									d.after ||
									d.addctl !== null ||
									(d.type === "number" && d.numctl === true)
								)
									? `form-control-${d.weight}`
									: null,
								d.label && d.floatlabel
									? [
											d.before || d.after ? "rounded-0" : null,
											d.before ? "rounded-end" : null,
											d.after ? "rounded-start" : null,
									  ].combine(" ")
									: null,
							],
							placeholder: d.placeholder,
							readonly: d.readonly,
							disabled: d.disabled,
							required: d.required,
							rows: d.row,

							"aria-label": d.hidelabel && d.label ? d.label : null,

							onchange: d.onchange,
							onclick: d.onclick,
							onfocus: d.onfocus,
							onblur: d.onblur,
						}),
						elem: d.value,
					});
					break;
				case "select":
					mainctl = new tag({
						tag: "select",
						attr: attr.merge(d.attr, {
							id: d.id,
							name: d.name,
							class: [
								d.plaintext && d.readonly ? "form-select-plaintext" : "form-select",
								d.weight &&
								!(
									d.before ||
									d.after ||
									d.addctl !== null ||
									(d.type === "number" && d.numctl === true)
								)
									? `form-select-${d.weight}`
									: null,
								d.label && d.floatlabel
									? [
											d.before || d.after ? "rounded-0" : null,
											d.before ? "rounded-end" : null,
											d.after ? "rounded-start" : null,
									  ].combine(" ")
									: null,
								d.class,
							],

							"aria-label": d.hidelabel && d.label ? d.label : null,

							readonly: d.readonly,
							disabled: d.disabled,
							required: d.required,
							rows: d.row,
							multiple: d.multiple,

							onchange: d.onchange,
							onclick: d.onclick,
							onfocus: d.onfocus,
							onblur: d.onblur,
						}),
						elem: new option(d.option, d.value),
					});
					break;
				case "datalist":
					mainctl = new tag({
						tag: "datalist",
						attr: attr.merge(d.attr, { id: d.id }),
						elem: new option(d.option, d.value),
					});
					break;
				default:
					mainctl = new tag({
						tag: "input",
						attr: attr.merge(d.attr, {
							id: d.id,
							name: d.name,
							type: d.type,
							class: [
								d.type !== "range"
									? [
											d.plaintext && d.readonly ? "form-control-plaintext" : "form-control",
											,
											d.weight &&
											!(
												d.before ||
												d.after ||
												d.addctl !== null ||
												(d.type === "number" && d.numctl === true)
											)
												? `form-control-${d.weight}`
												: null,
									  ].combine(" ")
									: "form-range",
								d.type === "color"
									? ["form-control-color", d.floatlabel ? "w-100" : null].combine(" ")
									: null,
								d.label && d.floatlabel
									? [
											d.before || d.after || d.numctl ? "rounded-0" : null,
											d.before ? "rounded-end" : null,
											d.after ? "rounded-start" : null,
									  ].combine(" ")
									: d.label && d.numctl
									? "rounded-0"
									: null,
								d.class,
							],
							"aria-label": d.hidelabel && d.label ? d.label : null,

							placeholder: d.placeholder,
							min: d.min,
							max: d.max,
							step: d.step,
							readonly: d.readonly,
							disabled: d.disabled,
							required: d.required,
							value:
								["date", "datetime", "month", "datetime-local", "time", "week"].indexOf(d.value) > -1
									? moment(d.value)
									: d.value,

							list: d.option ? `${d.id}-dl` : null,

							onchange: d.onchange,
							onclick: d.onclick,
							onfocus: d.onfocus,
							onblur: d.onblur,
						}),
					});
					break;
			}

			//combine all
			let ctl = [];

			//add before element
			if (beforectl) ctl.push(beforectl);

			//add label
			if (labelctl && d.floatlabel) {
				ctl.push(new div("form-floating flex-grow-1", [mainctl, labelctl]));

				labelctl = null;
			} else {
				ctl.push(mainctl);
			}

			//add after element
			ctl.push(afterctl);

			//add validation feedback
			ctl.push(validmsg);
			ctl.push(invalidmsg);

			if (d.type === "hidden") {
				ctl = [new div("d-none", ctl)];
			} else {
				if (d.flex) {
					ctl = [new div("d-flex", ctl)];
				} else {
					if (["checkbox", "radio", "switch"].includes(d.type)) {
						ctl.push(labelctl);
						ctl = [
							new div(
								[
									"form-check",
									d.label && d.inline ? "form-check-inline" : null,
									d.type === "switch" ? "form-switch" : null,
									d.valid || d.invalid ? "has-validation" : null,
								],
								ctl
							),
						];
					} else {
						ctl = [
							new div(
								[
									"input-group",
									d.nowarp ? "flex-nowarp" : null,
									d.weight ? `input-group-${d.weight}` : null,
									d.valid || d.invalid ? "has-validation" : null,
								],
								ctl
							),
						];

						//put ctl in div.col-auto if labelsize is set
						if (d.labelsize || d.ctlsize) {
							ctl = [new div(d.ctlsize ? d.ctlsize : "col-auto", ctl)];
						}

						ctl.unshift(labelctl);
					}
				}
			}

			if (d.size) {
				this._d = {
					elem: new div(d.size, ctl),
				};
			} else {
				this._d = {
					elem: ctl,
				};
			}
		} else {
			this._d = null;
		}

		super.data = this._d;
	}
}

// "use strict";
// import * as core from "./core.js";
// import tag from "./tag.js";
// import attr from "./attr.js";
// import label from "./label.js";
// import button from "./button.js";
// import * as inputgroup from "./inputgroup.js";
// import div from "./div.js";
// import option from "./option.js";

// /**
//  * label
//  * label, color
//  * label, onclick
//  * label, color, onclick
//  * option
//  */
// export default class input extends tag {
// 	constructor(...arg) {
// 		super();

// 		let t = {
// 			label: null,
// 			color: null,
// 			onclick: null,
// 		};
// 		if (arg && arg.length === 3) {
// 			t.label = arg[0];
// 			t.color = arg[1];
// 			t.onclick = arg[2];
// 		} else if (arg && arg.length === 2 && arg[1] instanceof Function) {
// 			t.label = arg[0];
// 			t.onclick = arg[1];
// 		} else if (arg && arg.length === 2 && typeof arg[1] === "string") {
// 			t.label = arg[0];
// 			t.color = arg[1];
// 		} else if (arg && arg.length === 1 && typeof arg[0] === "string") {
// 			t.label = arg[0];
// 		} else {
// 			t = arg[0];
// 		}

// 		this.data = core.extend(
// 			{},
// 			{
// 				attr: null,

// 				id: null,
// 				name: null,

// 				type: "text", //checkbox,radio,text,number,textarea
// 				label: null,
// 				hidelabel: false,
// 				floatlabel: false,

// 				inline: false,
// 				labelsize: null,
// 				ctlsize: null,
// 				size: null,
// 				weight: null,

// 				value: null,
// 				checked: false,
// 				placeholder: null,
// 				option: null,

// 				numctl: false,
// 				addctl: null,

// 				min: null,
// 				max: null,
// 				step: null,
// 				row: null,
// 				multiple: false,
// 				required: false,

// 				valid: null,
// 				invalid: null,

// 				beforetype: "text",
// 				before: null,
// 				aftertype: "text",
// 				after: null,

// 				plaintext: false,
// 				readonly: false,
// 				disabled: false,

// 				container: true,
// 				flex: false,
// 				nowarp: false,

// 				onclick: null,
// 				onchange: null,
// 				onclick: null,
// 				onfocus: null,
// 				onblur: null,
// 			},
// 			t
// 		);
// 	}

// 	get data() {
// 		return this._d;
// 	}
// 	set data(d) {
// 		if (d) {
// 			//floating label required label
// 			//disable floatlabel if no label
// 			if (d.floatlabel && !d.label && !d.hidelabel) {
// 				d.floatlabel = false;
// 			}

// 			//floating label not works with some input
// 			if (d.floatlabel) {
// 				if (["checkbox", "radio", "switch", "file"].includes(d.type) || d.readonly) {
// 					d.floatlabel = false;
// 				} else {
// 					if (d.label && !d.placeholder) {
// 						d.placeholder = d.label;
// 					}
// 				}
// 			}

// 			//if has label need id is mandatori
// 			if ((d.label && !d.id) || (d.option && d.type !== "select")) {
// 				d.id = core.UUID();
// 			}

// 			//auto mark beforetype and aftertype if numctl
// 			if (d.type === "number" && d.numctl) {
// 				d.beforetype = "button";
// 				d.aftertype = "button";
// 			}

// 			//automark aftertype if addctl provided
// 			if (d.addctl) {
// 				d.after = null;
// 				d.aftertype = "button";
// 			}

// 			//automark aftertype and beforetype if numctl provided
// 			if (d.numctl && d.type === "number") {
// 				d.before = null;
// 				d.beforetype = "button";
// 				d.after = null;
// 				d.aftertype = "button";
// 			}

// 			//before control
// 			let beforectl = d.before
// 				? d.beforetype === "text"
// 					? new inputgroup.text(d.before)
// 					: new tag({
// 							elem: d.before,
// 					  })
// 				: d.type === "number" && d.numctl
// 				? new button({
// 						icon: "minus",
// 						color: "primary",
// 						onclick: function (e) {
// 							let sender = e.currentTarget;
// 							let parent = sender.parentElement;
// 							let input = parent.getElementsByTagName("input")[0];
// 							let val = parseInt(input.value);
// 							let min = parseInt(input.min);
// 							let step = parseInt(input.step);

// 							val = val || min;
// 							step = step || 1;
// 							input.value = val - step;
// 							if (val - step < min) input.value = min;
// 						},
// 				  })
// 				: null;

// 			//after control
// 			let afterctl = d.after
// 				? d.aftertype === "text"
// 					? new inputgroup.text(d.after)
// 					: new tag({
// 							elem: d.after,
// 					  })
// 				: d.type === "number" && d.numctl
// 				? new button({
// 						icon: "plus",
// 						color: "primary",
// 						onclick: function (e) {
// 							let sender = e.currentTarget;
// 							let parent = sender.parentElement;
// 							let input = parent.getElementsByTagName("input")[0];
// 							let val = parseInt(input.value);
// 							let max = parseInt(input.max);
// 							let step = parseInt(input.step);

// 							val = val || max;
// 							step = step || 1;
// 							input.value = val + step;
// 							if (val + step > max) input.value = max;
// 						},
// 				  })
// 				: d.addctl
// 				? new button({
// 						icon: "plus",
// 						color: "primary",
// 						onclick: d.addctl,
// 				  })
// 				: null;

// 			//valid msg
// 			let validmsg = d.valid ? new div("valid-feedback", d.valid) : null;

// 			//invalid msg
// 			let invalidmsg = d.invalid ? new div("invalid-feedback", d.invalid) : null;

// 			//datalist
// 			let datalistctl = null;
// 			if (d.option && d.type !== "select") {
// 				datalistctl = new tag({
// 					tag: "datalist",
// 					attr: { id: `${d.id}-dl` },
// 					elem: new option(d.option, d.value),
// 				});
// 			}

// 			//label
// 			let labelctl = null;
// 			if (d.label && !d.hidelabel) {
// 				labelctl = new label({
// 					for: d.id,
// 					label: d.label,
// 					attr: {
// 						class: ["checkbox", "radio", "switch", "file"].includes(d.type)
// 							? "form-check-label"
// 							: d.labelsize
// 							? `col-form-label col-${d.labelsize}`
// 							: "form-label",
// 					},
// 				});
// 			}

// 			//main control
// 			let mainctl = null;
// 			switch (d.type) {
// 				case "switch":
// 				case "checkbox":
// 				case "radio":
// 					mainctl = new tag({
// 						tag: "input",
// 						attr: attr.merge(d.attr, {
// 							id: d.id,
// 							name: d.name,
// 							type: d.type === "switch" ? "checkbox" : d.type,
// 							class: "form-check-input",
// 							readonly: d.readonly,
// 							disabled: d.disabled,
// 							required: d.required,
// 							value: d.value,
// 							checked: d.checked,
// 							"aria-label": d.hidelabel && d.label ? d.label : null,

// 							onchange: d.onchange,
// 							onclick: d.onclick,
// 							onfocus: d.onfocus,
// 							onblur: d.onblur,
// 						}),
// 					});

// 					break;
// 				case "textarea":
// 					mainctl = new tag({
// 						tag: "textarea",
// 						attr: attr.merge(d.attr, {
// 							id: d.id,
// 							name: d.name,
// 							class: [
// 								d.plaintext && d.readonly ? "form-control-plaintext" : "form-control",
// 								d.weight &&
// 								!(
// 									d.before ||
// 									d.after ||
// 									d.addctl !== null ||
// 									(d.type === "number" && d.numctl === true)
// 								)
// 									? `form-control-${d.weight}`
// 									: null,
// 								d.label && d.floatlabel
// 									? [
// 											d.before || d.after ? "rounded-0" : null,
// 											d.before ? "rounded-end" : null,
// 											d.after ? "rounded-start" : null,
// 									  ].combine(" ")
// 									: null,
// 							],
// 							placeholder: d.placeholder,
// 							readonly: d.readonly,
// 							disabled: d.disabled,
// 							required: d.required,
// 							rows: d.row,

// 							"aria-label": d.hidelabel && d.label ? d.label : null,

// 							onchange: d.onchange,
// 							onclick: d.onclick,
// 							onfocus: d.onfocus,
// 							onblur: d.onblur,
// 						}),
// 						elem: d.value,
// 					});
// 					break;
// 				case "select":
// 					mainctl = new tag({
// 						tag: "select",
// 						attr: attr.merge(d.attr, {
// 							id: d.id,
// 							name: d.name,
// 							class: [
// 								d.plaintext && d.readonly ? "form-select-plaintext" : "form-select",
// 								d.weight &&
// 								!(
// 									d.before ||
// 									d.after ||
// 									d.addctl !== null ||
// 									(d.type === "number" && d.numctl === true)
// 								)
// 									? `form-select-${d.weight}`
// 									: null,
// 								d.label && d.floatlabel
// 									? [
// 											d.before || d.after ? "rounded-0" : null,
// 											d.before ? "rounded-end" : null,
// 											d.after ? "rounded-start" : null,
// 									  ].combine(" ")
// 									: null,
// 								d.class,
// 							],

// 							"aria-label": d.hidelabel && d.label ? d.label : null,

// 							readonly: d.readonly,
// 							disabled: d.disabled,
// 							required: d.required,
// 							rows: d.row,
// 							multiple: d.multiple,

// 							onchange: d.onchange,
// 							onclick: d.onclick,
// 							onfocus: d.onfocus,
// 							onblur: d.onblur,
// 						}),
// 						elem: new option(d.option, d.value),
// 					});
// 					break;
// 				case "datalist":
// 					mainctl = new tag({
// 						tag: "datalist",
// 						attr: attr.merge(d.attr, { id: d.id }),
// 						elem: new option(d.option, d.value),
// 					});
// 					break;
// 				default:
// 					mainctl = new tag({
// 						tag: "input",
// 						attr: attr.merge(d.attr, {
// 							id: d.id,
// 							name: d.name,
// 							type: d.type,
// 							class: [
// 								d.type !== "range"
// 									? [
// 											d.plaintext && d.readonly ? "form-control-plaintext" : "form-control",
// 											,
// 											d.weight &&
// 											!(
// 												d.before ||
// 												d.after ||
// 												d.addctl !== null ||
// 												(d.type === "number" && d.numctl === true)
// 											)
// 												? `form-control-${d.weight}`
// 												: null,
// 									  ].combine(" ")
// 									: "form-range",
// 								d.type === "color"
// 									? ["form-control-color", d.floatlabel ? "w-100" : null].combine(" ")
// 									: null,
// 								d.label && d.floatlabel
// 									? [
// 											d.before || d.after || d.numctl ? "rounded-0" : null,
// 											d.before ? "rounded-end" : null,
// 											d.after ? "rounded-start" : null,
// 									  ].combine(" ")
// 									: d.label && d.numctl
// 									? "rounded-0"
// 									: null,
// 								d.class,
// 							],
// 							"aria-label": d.hidelabel && d.label ? d.label : null,

// 							placeholder: d.placeholder,
// 							min: d.min,
// 							max: d.max,
// 							step: d.step,
// 							readonly: d.readonly,
// 							disabled: d.disabled,
// 							required: d.required,
// 							value:
// 								["date", "datetime", "month", "datetime-local", "time", "week"].indexOf(d.value) > -1
// 									? moment(d.value)
// 									: d.value,

// 							list: d.option ? `${d.id}-dl` : null,

// 							onchange: d.onchange,
// 							onclick: d.onclick,
// 							onfocus: d.onfocus,
// 							onblur: d.onblur,
// 						}),
// 					});
// 					break;
// 			}

// 			//combine all
// 			let ctl = [];

// 			if (beforectl) ctl.push(beforectl);

// 			if (labelctl && d.floatlabel) {
// 				ctl.push(new div("form-floating flex-grow-1", [mainctl, labelctl]));
// 				ctl.push(validmsg);
// 				ctl.push(invalidmsg);
// 				labelctl = null;
// 			} else {
// 				ctl.push(mainctl);
// 				ctl.push(validmsg);
// 				ctl.push(invalidmsg);
// 			}

// 			if (afterctl) ctl.push(afterctl);

// 			if (d.type === "hidden") {
// 				this._d = {
// 					elem: new div("d-none", ctl),
// 				};
// 			} else {
// 				if (d.size) {
// 					if (d.flex) {
// 						this._d = { elem: new div("d-flex", new div(d.size, ctl)) };
// 					} else {
// 						if (["checkbox", "radio", "switch"].includes(d.type)) {
// 							ctl.push(labelctl);
// 							this._d = {
// 								elem: new div(
// 									d.size,
// 									new div(
// 										[
// 											"form-check",
// 											d.label && d.inline ? "form-check-inline" : null,
// 											d.type === "switch" ? "form-switch" : null,
// 											d.valid || d.invalid ? "has-validation" : null,
// 										],
// 										ctl
// 									)
// 								),
// 							};
// 						} else {
// 							this._d = {
// 								elem: new div(d.size, [
// 									labelctl,
// 									d.labelsize || d.ctlsize
// 										? new div(
// 												d.ctlsize ? `col-${d.ctlsize}` : "col-auto",
// 												new div(
// 													[
// 														"input-group",
// 														d.nowarp ? "flex-nowarp" : null,
// 														d.weight ? `input-group-${d.weight}` : null,
// 														d.valid || d.invalid ? "has-validation" : null,
// 													],
// 													ctl
// 												)
// 										  )
// 										: new div(
// 												[
// 													"input-group",
// 													d.nowarp ? "flex-nowarp" : null,
// 													d.weight ? `input-group-${d.weight}` : null,
// 													d.valid || d.invalid ? "has-validation" : null,
// 												],
// 												ctl
// 										  ),
// 									datalistctl,
// 								]),
// 							};
// 						}
// 					}
// 				} else {
// 					if (d.flex) {
// 						this._d = { elem: new div("d-flex", ctl) };
// 					} else {
// 						if (["checkbox", "radio", "switch"].includes(d.type)) {
// 							ctl.push(labelctl);
// 							this._d = {
// 								elem: new div(
// 									[
// 										"form-check",
// 										d.label && d.inline ? "form-check-inline" : null,
// 										d.type === "switch" ? "form-switch" : null,
// 										d.valid || d.invalid ? "has-validation" : null,
// 									],
// 									ctl
// 								),
// 							};
// 						} else {
// 							this._d = {
// 								elem: [
// 									labelctl,
// 									d.labelsize || d.ctlsize
// 										? new div(
// 												d.ctlsize ? `col-${d.ctlsize}` : "col-auto",
// 												new div(
// 													[
// 														"input-group",
// 														d.nowarp ? "flex-nowarp" : null,
// 														d.weight ? `input-group-${d.weight}` : null,
// 														d.valid || d.invalid ? "has-validation" : null,
// 													],
// 													ctl
// 												)
// 										  )
// 										: new div(
// 												[
// 													"input-group",
// 													d.nowarp ? "flex-nowarp" : null,
// 													d.weight ? `input-group-${d.weight}` : null,
// 													d.valid || d.invalid ? "has-validation" : null,
// 												],
// 												ctl
// 										  ),
// 									datalistctl,
// 								],
// 							};
// 						}
// 					}
// 				}
// 			}
// 		} else {
// 			this._d = null;
// 		}

// 		super.data = this._d;
// 	}
// }
