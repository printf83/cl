"use strict";
import * as core from "./core.js";
import tag from "./tag.js";
import label from "./label.js";
import button from "./button.js";
import * as inputgroup from "./inputgroup.js";
import div from "./div.js";
import * as option from "./option.js";
import toast from "./toast.js";

const defaultOption = {
	type: "text", //checkbox,radio,text,number,textarea
	label: null,
	hidelabel: false,
	floatlabel: false,

	inline: false,
	labelsize: null,
	ctlsize: null,
	size: null,
	weight: null,

	helper: null,
	option: null,

	numctl: false,
	addctl: null,
	copyctl: null,

	validitytype: "feedback",
	valid: null,
	invalid: null,

	before: null,
	after: null,

	plaintext: false,

	container: true,
	flex: false,
};

export default class input extends tag {
	constructor(...opt) {
		super(...opt);
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		if (opt) {
			opt = core.extend({}, defaultOption, opt);

			let i = core.extend({}, opt);

			//floating label required label
			if (i.floatlabel) {
				//disable floatlabel if no label or label is hidden
				if (!i.label && !i.hidelabel) {
					i.floatlabel = false;
				}

				//floating label not works with some input
				if (["checkbox", "radio", "switch", "file"].includes(i.type) || i.readonly) {
					i.floatlabel = false;
				} else {
					if (i.label && !i.placeholder) {
						i.placeholder = i.label;
					}
				}
			}

			//if has label need id is mandatori
			if ((i.label && !i.id) || i.helper || (i.option && i.type !== "select")) {
				i.id = core.UUID();
			}

			//automark aftertype if addctl provided
			if (i.addctl) {
				i.after = null;
			}

			//automark aftertype and beforetype if numctl provided
			if (i.numctl && i.type === "number") {
				i.before = null;
				i.after = null;
			}

			//before control
			let elem_before = null;
			if (i.before) {
				if (typeof i.before === "string" || i.before.hasOwnProperty("clicon")) {
					elem_before = new inputgroup.text({ elem: i.before });
				} else {
					elem_before = new tag({ elem: i.before });
				}
			} else {
				if (i.type === "number" && i.numctl) {
					elem_before = new button({
						icon: "minus",
						color: "secondary",
						click: (e) => {
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
					});
				}
			}

			//after control
			let elem_after = null;
			if (i.after) {
				if (typeof i.after === "string" || i.after.hasOwnProperty("clicon")) {
					elem_after = new inputgroup.text({ elem: i.after });
				} else {
					elem_after = new tag({ elem: i.after });
				}
			} else {
				if (i.type === "number" && i.numctl) {
					elem_after = new button({
						icon: "plus",
						color: "secondary",
						click: (e) => {
							let sender = e.currentTarget;
							let parent = sender.parentElement;
							let input = parent.getElementsByTagName("input")[0];
							let val = parseInt(input.value);
							let max = parseInt(input.max);
							let min = parseInt(input.min);
							let step = parseInt(input.step);

							val = val || min;
							step = step || 1;
							input.value = val + step;
							if (val + step > max) input.value = max;
						},
					});
				} else if (i.addctl) {
					elem_after = new button({
						icon: "plus",
						color: "secondary",
						click: i.addctl,
					});
				}
			}

			let elem_copy = null;
			if (i.copyctl) {
				elem_copy = new button({
					icon: {
						type: "far",
						icon: "clipboard",
					},
					color: "secondary",
					click: () => {
						try {
							let str = document.getElementById(i.id).value;
							navigator.clipboard.writeText(str);
							new toast("/", "Copied to clipboard").show();
						} catch (ex) {
							new toast("!!", `Error when copy code to clipboard. ${ex}`).show();
						}
					},
				});
			}

			//helper
			let elem_helper = null;
			if (i.helper) {
				elem_helper = new div({ id: `${i.id}_helper`, class: "form-text", elem: i.helper });
			}

			//valid msg
			let elem_validmsg = null;
			if (i.valid) {
				elem_validmsg = new div({ class: `valid-${i.validitytype}`, elem: i.valid });
			}

			//invalid msg
			let elem_invalidmsg = null;
			if (i.invalid) {
				elem_invalidmsg = new div({ class: `invalid-${i.validitytype}`, elem: i.invalid });
			}

			//datalist
			let elem_datalist = null;
			if (i.option && i.type !== "select") {
				elem_datalist = new tag({
					tag: "datalist",
					id: `${i.id}-dl`,
					elem: new option.select({ item: i.option, selected: i.value }),
				});
			}

			//label
			let elem_label = null;
			if (i.label && !i.hidelabel) {
				let elem_label_class = null;
				if (["checkbox", "radio", "switch", "file"].includes(i.type)) {
					elem_label_class = "form-check-label";
				} else {
					if (i.labelsize) {
						elem_label_class = "col-form-label";
					} else {
						elem_label_class = "form-label";
					}
				}
				elem_label = new label({
					for: i.id,
					label: i.label,
					col: i.labelsize,
					class: elem_label_class,
				});
			}

			//create mainctl base on i

			if (["date", "datetime", "month", "datetime-local", "time", "week"].indexOf(i.type) > -1) {
				switch (i.type) {
					case "date":
						i.value = moment(i.value).format("YYYY-MM-DD");
						break;
					case "month":
						i.value = moment(i.value).format("YYYY-MM");
						break;
					default:
						i.value = moment(i.value).format();
				}
			}

			//main control
			switch (i.type) {
				case "switch":
				case "checkbox":
				case "radio":
					i = core.merge(i, {
						tag: "input",
						class: "form-check-input",
						type: i.type === "switch" ? "checkbox" : i.type,
						"aria-label": i.hidelabel && i.label ? i.label : null,
						indeterminate: i.indeterminate && i.type === "checkbox" ? true : null,
					});

					break;
				case "textarea":
					i = core.merge(i, {
						tag: "textarea",
						class: [
							i.plaintext && i.readonly ? "form-control-plaintext" : "form-control",
							i.weight && !(i.before || i.after) ? `form-control-${i.weight}` : null,
						],
						"aria-label": i.hidelabel && i.label ? i.label : null,
						elem: i.value,
					});

					delete i.value;
					break;
				case "select":
					i = core.merge(i, {
						tag: "select",
						class: [
							i.plaintext && i.readonly ? "form-select-plaintext" : "form-select",
							i.weight && !(i.before || i.after || i.addctl !== null) ? `form-select-${i.weight}` : null,
						],
						"aria-label": i.hidelabel && i.label ? i.label : null,
						elem: new option.select({ item: i.option, selected: i.value }),
					});
					break;
				case "datalist":
					i = core.merge(i, {
						tag: "datalist",
						elem: new option.select({ item: i.option, selected: i.value }),
					});
					break;
				default:
					i = core.merge(i, {
						tag: "input",
						class: [
							i.type !== "range"
								? core.combineArray(
										[
											i.plaintext && i.readonly ? "form-control-plaintext" : "form-control",
											,
											i.weight &&
											!(
												i.before ||
												i.after ||
												i.addctl !== null ||
												(i.type === "number" && i.numctl === true)
											)
												? `form-control-${i.weight}`
												: null,
										],
										" "
								  )
								: "form-range",
							i.type === "color"
								? core.combineArray(["form-control-color", i.floatlabel ? "w-100" : null], " ")
								: null,
						],
						"aria-label": i.hidelabel && i.label ? i.label : null,
						list: i.option ? `${i.id}-dl` : null,
					});
					break;
			}

			//delete specific property before add into tag
			delete i.label;
			delete i.hidelabel;
			delete i.floatlabel;

			delete i.inline;
			delete i.labelsize;
			delete i.ctlsize;
			delete i.size;
			delete i.weight;

			delete i.helper;
			delete i.option;

			delete i.numctl;
			delete i.addctl;
			delete i.copyctl;

			delete i.validitytype;
			delete i.valid;
			delete i.invalid;

			delete i.before;
			delete i.after;

			delete i.plaintext;

			delete i.container;
			delete i.flex;
			delete i.textWarp;

			let elem_main = new tag(i);

			//combine all
			let ctl = [];

			//add before element
			if (elem_before) ctl.push(elem_before);

			//add label
			if (elem_label && opt.floatlabel) {
				ctl.push(new div({ class: "form-floating flex-grow-1", elem: [elem_main, elem_label] }));
				elem_label = null;
			} else {
				ctl.push(elem_main);
			}

			//add datalist
			if (elem_datalist) ctl.push(elem_datalist);

			//add after element
			if (elem_after) ctl.push(elem_after);

			//add copyctl
			if (elem_copy) ctl.push(elem_copy);

			//add validation feedback
			if (elem_validmsg) ctl.push(elem_validmsg);
			if (elem_invalidmsg) ctl.push(elem_invalidmsg);

			if (opt.type === "hidden") {
				ctl = [new div({ display: "none", elem: ctl })];
			} else {
				if (opt.flex) {
					ctl = [new div({ display: "flex", elem: ctl })];
				} else {
					if (["checkbox", "radio", "switch"].includes(opt.type)) {
						ctl.push(elem_label);
						ctl = [
							new div({
								class: [
									"form-check",
									opt.label && opt.inline ? "form-check-inline" : null,
									opt.type === "switch" ? "form-switch" : null,
									opt.valid || opt.invalid ? "has-validation" : null,
								],
								elem: ctl,
							}),
							elem_helper,
						];
					} else {
						if (opt.container) {
							ctl = [
								new div({
									class: [
										"input-group",
										opt.weight ? `input-group-${opt.weight}` : null,
										opt.valid || opt.invalid ? "has-validation" : null,
									],
									flex: opt.nowrap ? "nowrap" : null,
									elem: ctl,
								}),
								elem_helper,
							];
						} else {
							ctl.push(elem_helper);
						}

						//put ctl in div.col-auto if labelsize is set
						if (opt.labelsize || opt.ctlsize) {
							ctl = [
								new div({
									col: opt.ctlsize || "auto",
									elem: ctl,
								}),
							];
						}

						ctl.unshift(elem_label);
					}
				}
			}

			if (opt.size) {
				super.data = {
					elem: new div({
						col: opt.size ? opt.size : true,
						position: opt.validitytype === "tooltip" ? "relative" : null,
						elem: ctl,
					}),
				};
			} else {
				super.data = {
					position: opt.validitytype === "tooltip" ? "relative" : null,
					elem: ctl,
				};
			}
		}
	}
}

// "use strict";
// import * as core from "./core.js";
// import tag from "./tag.js";
// import label from "./label.js";
// import button from "./button.js";
// import * as inputgroup from "./inputgroup.js";
// import div from "./div.js";
// import * as option from "./option.js";
// import toast from "./toast.js";

// const defaultOption = {
// 	type: "text", //checkbox,radio,text,number,textarea
// 	label: null,
// 	hidelabel: false,
// 	floatlabel: false,

// 	inline: false,
// 	labelsize: null,
// 	ctlsize: null,
// 	size: null,
// 	weight: null,

// 	value: null,
// 	checked: false,
// 	indeterminate: null,
// 	placeholder: null,
// 	helper: null,
// 	option: null,

// 	numctl: false,
// 	addctl: null,
// 	copyctl: null,

// 	min: null,
// 	max: null,
// 	step: null,
// 	rows: null,
// 	multiple: false,
// 	required: false,
// 	minlength: null,
// 	maxlength: null,
// 	inputmode: null,
// 	pattern: null,
// 	autocomplete: null,
// 	autofocus: null,

// 	validitytype: "feedback",
// 	valid: null,
// 	invalid: null,

// 	before: null,
// 	after: null,

// 	plaintext: false,
// 	readonly: false,
// 	disabled: false,

// 	container: true,
// 	flex: false,
// 	textWarp: false,

// 	onchange: null,
// 	onfocus: null,
// 	onblur: null,
// };

// export default class input extends tag {
// 	constructor(...opt) {
// 		super(...opt);
// 	}

// 	get data() {
// 		return super.data;
// 	}
// 	set data(opt) {
// 		if (opt) {
// 			opt = core.extend({}, defaultOption, opt);

// 			//invalid and valid feedback only work one
// 			// if (opt.valid && opt.invalid) {
// 			// 	opt.valid = null;
// 			// }

// 			//floating label required label
// 			//disable floatlabel if no label
// 			if (opt.floatlabel && !opt.label && !opt.hidelabel) {
// 				opt.floatlabel = false;
// 			}

// 			//floating label not works with some input
// 			if (opt.floatlabel) {
// 				if (["checkbox", "radio", "switch", "file"].includes(opt.type) || opt.readonly) {
// 					opt.floatlabel = false;
// 				} else {
// 					if (opt.label && !opt.placeholder) {
// 						opt.placeholder = opt.label;
// 					}
// 				}
// 			}

// 			//if has label need id is mandatori
// 			if ((opt.label && !opt.id) || opt.helper || (opt.option && opt.type !== "select")) {
// 				opt.id = core.UUID();
// 			}

// 			//automark aftertype if addctl provided
// 			if (opt.addctl) {
// 				opt.after = null;
// 			}

// 			//automark aftertype and beforetype if numctl provided
// 			if (opt.numctl && opt.type === "number") {
// 				opt.before = null;
// 				opt.after = null;
// 			}

// 			//before control
// 			let beforectl = opt.before
// 				? typeof opt.before === "string" || opt.before.hasOwnProperty("clicon")
// 					? new inputgroup.text({ elem: opt.before })
// 					: new tag({
// 							elem: opt.before,
// 					  })
// 				: opt.type === "number" && opt.numctl
// 				? new button({
// 						icon: "minus",
// 						color: "secondary",
// 						click: (e) => {
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
// 			let afterctl = opt.after
// 				? typeof opt.after === "string" || opt.after.hasOwnProperty("clicon")
// 					? new inputgroup.text({ elem: opt.after })
// 					: new tag({
// 							elem: opt.after,
// 					  })
// 				: opt.type === "number" && opt.numctl
// 				? new button({
// 						icon: { icon: "plus" },
// 						color: "secondary",
// 						click: (e) => {
// 							let sender = e.currentTarget;
// 							let parent = sender.parentElement;
// 							let input = parent.getElementsByTagName("input")[0];
// 							let val = parseInt(input.value);
// 							let max = parseInt(input.max);
// 							let min = parseInt(input.min);
// 							let step = parseInt(input.step);

// 							val = val || min;
// 							step = step || 1;
// 							input.value = val + step;
// 							if (val + step > max) input.value = max;
// 						},
// 				  })
// 				: opt.addctl
// 				? new button({
// 						icon: { icon: "plus" },
// 						color: "secondary",
// 						click: opt.addctl,
// 				  })
// 				: null;

// 			let copyctl = opt.copyctl
// 				? new button({
// 						icon: {
// 							type: "far",
// 							icon: "clipboard",
// 						},
// 						color: "secondary",
// 						click: (event) => {
// 							try {
// 								let str = document.getElementById(opt.id).value;
// 								navigator.clipboard.writeText(str);
// 								new toast("/", "Copied to clipboard").show();
// 							} catch (ex) {
// 								new toast("!!", `Error when copy code to clipboard. ${ex}`).show();
// 							}
// 						},
// 				  })
// 				: null;

// 			//helper
// 			let helper = opt.helper ? new div({ id: `${opt.id}_helper`, class: "form-text", elem: opt.helper }) : null;

// 			//valid msg
// 			let validmsg = opt.valid ? new div({ class: `valid-${opt.validitytype}`, elem: opt.valid }) : null;

// 			//invalid msg
// 			let invalidmsg = opt.invalid ? new div({ class: `invalid-${opt.validitytype}`, elem: opt.invalid }) : null;

// 			//datalist
// 			let datalistctl = null;
// 			if (opt.option && opt.type !== "select") {
// 				datalistctl = new tag({
// 					tag: "datalist",
// 					id: `${opt.id}-dl`,
// 					elem: new option.select({ item: opt.option, selected: opt.value }),
// 				});
// 			}

// 			//label
// 			let labelctl = null;
// 			if (opt.label && !opt.hidelabel) {
// 				labelctl = new label({
// 					for: opt.id,
// 					label: opt.label,
// 					class: ["checkbox", "radio", "switch", "file"].includes(opt.type)
// 						? "form-check-label"
// 						: opt.labelsize
// 						? ["col-form-label"].concat(core.multiClass(opt.labelsize, "col-$1", null, "col"))
// 						: "form-label",
// 				});
// 			}

// 			//create mainctl base on opt
// 			let m = core.extend({}, opt);

// 			if (["date", "datetime", "month", "datetime-local", "time", "week"].indexOf(m.type) > -1) {
// 				switch (m.type) {
// 					case "date":
// 						m.value = moment(m.value).format("YYYY-MM-DD");
// 						break;
// 					case "month":
// 						m.value = moment(m.value).format("YYYY-MM");
// 						break;
// 					default:
// 						m.value = moment(m.value).format();
// 				}
// 			}

// 			// m.attr = core.merge.attr(m.attr, {
// 			// 	min: m.min,
// 			// 	max: m.max,
// 			// 	step: m.step,
// 			// 	rows: m.rows,
// 			// 	multiple: m.multiple,
// 			// 	required: m.required,
// 			// 	minlength: m.minlength,
// 			// 	maxlength: m.maxlength,
// 			// 	inputmode: m.inputmode,
// 			// 	pattern: m.pattern,
// 			// 	value: m.value,
// 			// 	checked: m.checked,
// 			// 	placeholder: m.placeholder,
// 			// 	autocomplete: m.autocomplete,
// 			// 	autofocus: m.autofocus,

// 			// 	disabled: m.disabled,
// 			// 	readOnly: m.readonly,

// 			// 	onchange: m.onchange,
// 			// 	onblur: m.onblur,
// 			// 	onfocus: m.onfocus,
// 			// });

// 			delete m.valid;
// 			delete m.invalid;
// 			delete m.validitytype;
// 			delete m.indeterminate;

// 			// delete m.type;

// 			delete m.checked;
// 			delete m.placeholder;

// 			// delete m.min;
// 			// delete m.max;
// 			// delete m.step;
// 			// delete m.rows;
// 			// delete m.multiple;
// 			// delete m.required;
// 			// delete m.minlength;
// 			// delete m.maxlength;
// 			// delete m.inputmode;
// 			// delete m.pattern;
// 			// delete m.autocomplete;
// 			// delete m.autofocus;

// 			delete m.plaintext;

// 			delete m.disabled;
// 			delete m.readonly;

// 			delete m.container;
// 			delete m.flex;
// 			delete m.textWarp;

// 			delete m.option;

// 			delete m.onchange;
// 			delete m.onblur;
// 			delete m.onfocus;

// 			//main control
// 			let mainctl = null;
// 			switch (opt.type) {
// 				case "switch":
// 				case "checkbox":
// 				case "radio":
// 					m = core.merge(m, {
// 						tag: "input",
// 						class: "form-check-input",
// 						type: opt.type === "switch" ? "checkbox" : opt.type,
// 						"aria-label": opt.hidelabel && opt.label ? opt.label : null,
// 						indeterminate: opt.indeterminate && opt.type === "checkbox" ? true : null,
// 					});

// 					mainctl = new tag(m);
// 					break;
// 				case "textarea":
// 					m = core.merge(m, {
// 						tag: "textarea",
// 						class: [
// 							opt.plaintext && opt.readonly ? "form-control-plaintext" : "form-control",
// 							opt.weight && !(opt.before || opt.after) ? `form-control-${opt.weight}` : null,
// 						],
// 						"aria-label": opt.hidelabel && opt.label ? opt.label : null,
// 						elem: m.value,
// 					});

// 					delete m.value;

// 					mainctl = new tag(m);
// 					break;
// 				case "select":
// 					m = core.merge(m, {
// 						tag: "select",
// 						class: [
// 							opt.plaintext && opt.readonly ? "form-select-plaintext" : "form-select",
// 							opt.weight && !(opt.before || opt.after || opt.addctl !== null)
// 								? `form-select-${opt.weight}`
// 								: null,
// 						],
// 						"aria-label": opt.hidelabel && opt.label ? opt.label : null,
// 						elem: new option.select({ item: opt.option, selected: opt.value }),
// 					});

// 					mainctl = new tag(m);
// 					break;
// 				case "datalist":
// 					m = core.merge(m, {
// 						tag: "datalist",
// 						elem: new option.select({ item: opt.option, selected: opt.value }),
// 					});

// 					mainctl = new tag(m);
// 					break;
// 				default:
// 					m = core.merge(m, {
// 						tag: "input",
// 						class: [
// 							opt.type !== "range"
// 								? core.combineArray(
// 										[
// 											opt.plaintext && opt.readonly ? "form-control-plaintext" : "form-control",
// 											,
// 											opt.weight &&
// 											!(
// 												opt.before ||
// 												opt.after ||
// 												opt.addctl !== null ||
// 												(opt.type === "number" && opt.numctl === true)
// 											)
// 												? `form-control-${opt.weight}`
// 												: null,
// 										],
// 										" "
// 								  )
// 								: "form-range",
// 							opt.type === "color"
// 								? core.combineArray(["form-control-color", opt.floatlabel ? "w-100" : null], " ")
// 								: null,
// 						],
// 						"aria-label": opt.hidelabel && opt.label ? opt.label : null,
// 						list: opt.option ? `${opt.id}-dl` : null,
// 					});

// 					mainctl = new tag(m);
// 					break;
// 			}

// 			//combine all
// 			let ctl = [];

// 			//add before element
// 			if (beforectl) ctl.push(beforectl);

// 			//add label
// 			if (labelctl && opt.floatlabel) {
// 				ctl.push(new div({ class: "form-floating flex-grow-1", elem: [mainctl, labelctl] }));

// 				labelctl = null;
// 			} else {
// 				ctl.push(mainctl);
// 			}

// 			//add datalist
// 			if (datalistctl) {
// 				ctl.push(datalistctl);
// 			}

// 			//add after element
// 			ctl.push(afterctl);

// 			//add copyctl
// 			ctl.push(copyctl);

// 			//add validation feedback
// 			ctl.push(validmsg);
// 			ctl.push(invalidmsg);

// 			if (opt.type === "hidden") {
// 				ctl = [new div({ display: "none", elem: ctl })];
// 			} else {
// 				if (opt.flex) {
// 					ctl = [new div({ display: "flex", elem: ctl })];
// 				} else {
// 					if (["checkbox", "radio", "switch"].includes(opt.type)) {
// 						ctl.push(labelctl);
// 						ctl = [
// 							new div({
// 								class: [
// 									"form-check",
// 									opt.label && opt.inline ? "form-check-inline" : null,
// 									opt.type === "switch" ? "form-switch" : null,
// 									opt.valid || opt.invalid ? "has-validation" : null,
// 								],
// 								elem: ctl,
// 							}),
// 							helper,
// 						];
// 					} else {
// 						if (opt.container) {
// 							ctl = [
// 								new div({
// 									class: [
// 										"input-group",
// 										opt.nowrap ? "flex-nowrap" : null,
// 										opt.weight ? `input-group-${opt.weight}` : null,
// 										opt.valid || opt.invalid ? "has-validation" : null,
// 									],
// 									elem: ctl,
// 								}),
// 								helper,
// 							];
// 						} else {
// 							ctl.push(helper);
// 						}

// 						//put ctl in div.col-auto if labelsize is set
// 						if (opt.labelsize || opt.ctlsize) {
// 							ctl = [
// 								new div({
// 									class: opt.ctlsize
// 										? core.multiClass(opt.ctlsize, "col-$1", null, "col")
// 										: "col-auto",
// 									elem: ctl,
// 								}),
// 							];
// 						}

// 						ctl.unshift(labelctl);
// 					}
// 				}
// 			}

// 			if (opt.size) {
// 				super.data = {
// 					elem: new div({
// 						col: opt.size ? opt.size : true,
// 						position: opt.validitytype === "tooltip" ? "relative" : null,
// 						elem: ctl,
// 					}),
// 				};
// 			} else {
// 				super.data = {
// 					position: opt.validitytype === "tooltip" ? "relative" : null,
// 					elem: ctl,
// 				};
// 			}
// 		}
// 	}
// }
