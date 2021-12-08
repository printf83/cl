"use strict";
import * as core from "./core.js";
import tag from "./tag.js";
import label from "./label.js";
import button from "./button.js";
import * as inputgroup from "./inputgroup.js";
import div from "./div.js";
import * as option from "./option.js";

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

	value: null,
	checked: false,
	placeholder: null,
	option: null,

	numctl: false,
	addctl: null,

	min: null,
	max: null,
	step: null,
	rows: null,
	multiple: false,
	required: false,

	valid: null,
	invalid: null,

	before: null,
	after: null,

	plaintext: false,
	readonly: false,
	disabled: false,

	container: true,
	flex: false,
	nowarp: false,
};

/**
 * opt : {tagoption,id,name,type,label,hidelabel,floatlabel,inline,labelsize,ctlsize,size,weight,value,checked,placeholder,option,numctl,addctl,min,max,step,row,multiple,required,valid,invalid,before,after,plaintext,readonly,disabled,container,flex,nowarp,onclick,onchange,onclick,onfocus,onblur}
 */
export default class input extends tag {
	constructor(opt) {
		super();
		this.data = core.extend({}, defaultOption, opt);
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		if (opt) {
			opt = core.extend({}, defaultOption, opt);

			//invalid and valid feedback only work one
			if (opt.valid && opt.invalid) {
				opt.valid = null;
			}

			//floating label required label
			//disable floatlabel if no label
			if (opt.floatlabel && !opt.label && !opt.hidelabel) {
				opt.floatlabel = false;
			}

			//floating label not works with some input
			if (opt.floatlabel) {
				if (["checkbox", "radio", "switch", "file"].includes(opt.type) || opt.readonly) {
					opt.floatlabel = false;
				} else {
					if (opt.label && !opt.placeholder) {
						opt.placeholder = opt.label;
					}
				}
			}

			//if has label need id is mandatori
			if ((opt.label && !opt.id) || (opt.option && opt.type !== "select")) {
				opt.id = core.UUID();
			}

			//automark aftertype if addctl provided
			if (opt.addctl) {
				opt.after = null;
			}

			//automark aftertype and beforetype if numctl provided
			if (opt.numctl && opt.type === "number") {
				opt.before = null;
				opt.after = null;
			}

			//before control
			let beforectl = opt.before
				? typeof opt.before === "string" || opt.before.hasOwnProperty("clicon") //d.beforetype === "text"
					? new inputgroup.text({ elem: opt.before })
					: new tag({
							elem: opt.before,
					  })
				: opt.type === "number" && opt.numctl
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
			let afterctl = opt.after
				? typeof opt.after === "string" || opt.after.hasOwnProperty("clicon") //d.aftertype === "text"
					? new inputgroup.text({ elem: opt.after })
					: new tag({
							elem: opt.after,
					  })
				: opt.type === "number" && opt.numctl
				? new button({
						icon: { icon: "plus" },
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
				: opt.addctl
				? new button({
						icon: { icon: "plus" },
						color: "primary",
						onclick: opt.addctl,
				  })
				: null;

			//valid msg
			let validmsg = opt.valid ? new div({ class: "valid-feedback", elem: opt.valid }) : null;

			//invalid msg
			let invalidmsg = opt.invalid ? new div({ class: "invalid-feedback", elem: opt.invalid }) : null;

			//datalist
			let datalistctl = null;
			if (opt.option && opt.type !== "select") {
				datalistctl = new tag({
					tag: "datalist",
					id: `${opt.id}-dl`,
					elem: new option.select({ item: opt.option, selected: opt.value }),
				});
			}

			//label
			let labelctl = null;
			if (opt.label && !opt.hidelabel) {
				labelctl = new label({
					for: opt.id,
					label: opt.label,
					class: ["checkbox", "radio", "switch", "file"].includes(opt.type)
						? "form-check-label"
						: opt.labelsize
						? ["col-form-label"].concat(core.multiClass(opt.labelsize, "col-$1", null, "col"))
						: "form-label",
				});
			}

			//create mainctl base on opt
			let m = core.extend({}, opt);

			m.value =
				["date", "datetime", "month", "datetime-local", "time", "week"].indexOf(m.type) > -1
					? moment(m.value)
					: m.value;

			m.attr = core.merge.attr(m.attr, {
				min: m.min,
				max: m.max,
				step: m.step,
				rows: m.rows,
				multiple: m.multiple,
				required: m.required,
				value: m.value,
				checked: m.checked,
				placeholder: m.placeholder,
			});

			delete m.type;

			delete m.value;
			delete m.checked;
			delete m.placeholder;

			delete m.min;
			delete m.max;
			delete m.step;
			delete m.rows;
			delete m.multiple;
			delete m.required;

			delete m.plaintext;

			delete m.container;
			delete m.flex;
			delete m.nowarp;

			delete m.option;

			//main control
			let mainctl = null;
			switch (opt.type) {
				case "switch":
				case "checkbox":
				case "radio":
					m.tag = "input";
					m.class = core.merge.class(m.class, "form-check-input");
					m.attr = core.merge.attr(m.attr, {
						type: opt.type === "switch" ? "checkbox" : opt.type,
						"aria-label": opt.hidelabel && opt.label ? opt.label : null,
					});
					mainctl = new tag(m);
					break;
				case "textarea":
					m.tag = "textarea";
					m.class = core.merge.class(m.class, [
						opt.plaintext && opt.readonly ? "form-control-plaintext" : "form-control",
						opt.weight && !(opt.before || opt.after) ? `form-control-${opt.weight}` : null,
						opt.label && opt.floatlabel
							? core.combineArray(
									[
										opt.before || opt.after ? "rounded-0" : null,
										opt.before ? "rounded-end" : null,
										opt.after ? "rounded-start" : null,
									],
									" "
							  )
							: null,
					]);
					m.attr = core.merge.attr(m.attr, {
						"aria-label": opt.hidelabel && opt.label ? opt.label : null,
					});
					m.elem = m.value;

					delete m.value;

					mainctl = new tag(m);
					break;
				case "select":
					m.tag = "select";
					m.class = core.merge.class(m.class, [
						opt.plaintext && opt.readonly ? "form-select-plaintext" : "form-select",
						opt.weight && !(opt.before || opt.after || opt.addctl !== null)
							? `form-select-${opt.weight}`
							: null,
						opt.label && opt.floatlabel
							? core.combineArray(
									[
										opt.before || opt.after ? "rounded-0" : null,
										opt.before ? "rounded-end" : null,
										opt.after ? "rounded-start" : null,
									],
									" "
							  )
							: null,
					]);

					m.attr = core.merge.attr(m.attr, {
						"aria-label": opt.hidelabel && opt.label ? opt.label : null,
					});

					m.elem = new option.select({ item: opt.option, selected: opt.value });

					mainctl = new tag(m);
					break;
				case "datalist":
					m.tag = "datalist";
					m.elem = new option.select({ item: opt.option, selected: opt.value });

					mainctl = new tag(m);
					break;
				default:
					m.tag = "input";
					m.class = core.merge.class(m.class, [
						opt.type !== "range"
							? core.combineArray(
									[
										opt.plaintext && opt.readonly ? "form-control-plaintext" : "form-control",
										,
										opt.weight &&
										!(
											opt.before ||
											opt.after ||
											opt.addctl !== null ||
											(opt.type === "number" && opt.numctl === true)
										)
											? `form-control-${opt.weight}`
											: null,
									],
									" "
							  )
							: "form-range",
						opt.type === "color"
							? core.combineArray(["form-control-color", opt.floatlabel ? "w-100" : null], " ")
							: null,
						opt.label && opt.floatlabel
							? core.combineArray(
									[
										opt.before || opt.after || opt.numctl ? "rounded-0" : null,
										opt.before ? "rounded-end" : null,
										opt.after ? "rounded-start" : null,
									],
									" "
							  )
							: opt.label && opt.numctl
							? "rounded-0"
							: null,
					]);

					m.attr = core.merge.attr(m.attr, {
						type: opt.type,
						"aria-label": opt.hidelabel && opt.label ? opt.label : null,
						list: opt.option ? `${opt.id}-dl` : null,
					});

					mainctl = new tag(m);
					break;
			}

			//combine all
			let ctl = [];

			//add before element
			if (beforectl) ctl.push(beforectl);

			//add label
			if (labelctl && opt.floatlabel) {
				ctl.push(new div({ class: "form-floating flex-grow-1", elem: [mainctl, labelctl] }));

				labelctl = null;
			} else {
				ctl.push(mainctl);
			}

			//add after element
			ctl.push(afterctl);

			//add validation feedback
			ctl.push(validmsg);
			ctl.push(invalidmsg);

			if (opt.type === "hidden") {
				ctl = [new div({ display: "none", elem: ctl })];
			} else {
				if (opt.flex) {
					ctl = [new div({ display: "flex", elem: ctl })];
				} else {
					if (["checkbox", "radio", "switch"].includes(opt.type)) {
						ctl.push(labelctl);
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
						];
					} else {
						ctl = [
							new div({
								class: [
									"input-group",
									opt.nowarp ? "flex-nowarp" : null,
									opt.weight ? `input-group-${opt.weight}` : null,
									opt.valid || opt.invalid ? "has-validation" : null,
								],
								elem: ctl,
							}),
						];

						//put ctl in div.col-auto if labelsize is set
						if (opt.labelsize || opt.ctlsize) {
							ctl = [
								new div({
									class: opt.ctlsize
										? core.multiClass(opt.ctlsize, "col-$1", null, "col")
										: "col-auto",
									elem: ctl,
								}),
							];
						}

						ctl.unshift(labelctl);
					}
				}
			}

			if (opt.size) {
				super.data = {
					elem: new div({ class: core.multiClass(opt.size, "col-$1", null, "col"), elem: ctl }),
				};
			} else {
				super.data = {
					elem: ctl,
				};
			}
		}
	}
}
