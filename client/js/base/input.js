"use strict";
import * as core from "./core.js";
import tag from "./tag.js";
import attr from "./attr.js";
import label from "./label.js";
import button from "./button.js";
import * as inputgroup from "./inputgroup.js";

/**
 * label
 * label, color
 * label, onclick
 * label, color, onclick
 * option
 */
export default class button extends tag {
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

				before: null,
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

			//before control
			let beforectl = d.before
				? typeof d.before === "string"
					? new inputgroup.text(d.before)
					: d.before
				: d.type === "number"
				? new button({
						icon: "minus",
						color: "primary",
						onclick: function (event) {
							console.log("todo");
						},
				  })
				: null;

			//label
			let label = null;
			if (d.label && !d.hidelabel) {
				label = new label({
					for: d.id,
					label: d.label,
					attr: {
						class: ["checkbox", "radio", "switch", "file"].includes(d.type)
							? "form-check-label"
							: "form-label",
					},
				});
			}

			//datalist
			let datalistctl = null;
			if (d.option && d.type !== "select") {
				datalistctl = new tag({
					tag: "datalist",
					attr: { id: `${d.id}-dl` },
					elem: new option(d.option, d.value),
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
							type: d.type,
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
						attr: {
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
						},
						elem: d.value,
					});
					break;
				case "select":
					mainctl = {
						tag: "select",
						attr: {
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
						},
						elem: new option(d.option, d.value),
					};
					break;
				case "datalist":
					mainctl = new tag({
						tag: "datalist",
						attr: { id: d.id },
						elem: new option(d.option, d.value),
					});
					break;
				default:
					mainctl = new tag({
						tag: "input",
						attr: {
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
						},
					});
					break;
			}

			this._d = {
				tag: d.href ? "a" : "button",
				attr: attr.merge(d.attr, {
					id: d.id,
					name: d.name,
					value: d.value,
					checked: d.checked,

					role: "button",
					type: d.type !== "button" ? d.type : null,
					disabled: d.disabled,
					onclick: d.onclick,
					href: d.href,
					"aria-label": d.hidelabel && d.label ? d.label : null,
					"aria-disabled": d.href && d.disabled ? "true" : null,
					class: [
						"btn",
						d.nowarp ? "text-nowarp" : null,
						d.weight ? `btn-${d.weight}` : null,
						d.color ? (d.outline ? `btn-outline-${d.color}` : `btn-${d.color}`) : null,
						d.textcolor ? `text-${d.textcolor}` : null,
						d.badge && typeof d.badge === "object" && d.badge.notification ? "position-relative" : null,
					],
				}),
				elem: [
					d.label || d.icon ? new label({ icon: d.icon, label: !d.hidelabel ? d.label : null }) : null,
					d.badge ? new badge(d.badge) : null,
				],
			};
		} else {
			this._d = null;
		}

		super.data = this._d;
	}
}
