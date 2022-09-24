"use strict";
import * as core from "./core.js";
import tag from "./tag.js";
import label from "./label.js";
import button from "./button.js";
import * as inputgroup from "./inputgroup.js";
import div from "./div.js";
import * as option from "./option.js";
import toast from "./toast.js";
import badge from "./badge.js";

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

	badge: null,
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
						badge: opt.badge,
						col: opt.size ? opt.size : true,
						position: opt.validitytype === "tooltip" ? "relative" : null,
						elem: ctl,
					}),
				};
			} else {
				super.data = {
					badge: opt.badge,
					position: opt.validitytype === "tooltip" ? "relative" : null,
					elem: ctl,
				};
			}
		}
	}
}
