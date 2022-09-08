"use strict";
// import "../../css/animation.css";
// import "../../css/query.css";

import * as core from "./core.js";
import modal from "./modal.js";
import input from "./input.js";
import div from "./div.js";
import tab from "./tab.js";
import button from "./button.js";

const defaultBuildOption = {
	data: {
		filter: null,
		sort: null,
		limit: 10,
		skip: 0,
		field: { __v: 0 },
	},
	limit: {
		min: 1,
		max: 100,
		step: 1,
	},
	skip: {
		min: 1,
		max: 100,
		step: 1,
	},
	field: [
		//required by sort and search
		//if no item type, no sort and no search
		{ value: "_id", label: "ID", type: "text" },
	],
	useopricon: false, // use TEXT in operator select box
};

const defaultFilterBtnOption = { icon: "plus", color: "primary", label: null, col: null, container: null };
const defaultFilterBuildOption = {
	id: null,
	field: null,
	add: null,
	useopricon: false,
};

const defaultSortBtnOption = { icon: "plus", color: "primary", label: null, col: null, container: null };
const defaultSortBuildOption = {
	id: null,
	field: null,
	add: null,
	useopricon: false,
};

const defaultFieldBuildOption = {
	field: null,
};

const defaultLimitBuildOption = {
	min: 0,
	max: 100,
	step: 5,
};

const defaultSkipBuildOption = {
	min: 0,
	max: 100,
	step: 5,
	limit: 0,
};

let db_filter = {};
let db_sort = {};

let fn = {
	isPrototypeExists: (obj, prototypeName) => {
		if (obj) {
			if (typeof obj === "object") {
				try {
					if (typeof obj[prototypeName] !== "undefined") {
						return true;
					}
				} catch (ex) {
					return false;
				}
			}
		}

		return false;
	},
	filter: {
		opr: (useopricon, itemtype) => {
			let rtn = null;
			if (itemtype) {
				//set operator base on frm value
				switch (itemtype) {
					case "text":
					case "tel":
					case "email":
						rtn = [
							{ value: "$eqlike", label: useopricon ? "&#xf52c; &#xf069;" : "Like" },
							{ value: "$nelike", label: useopricon ? "&#xf53e; &#xf069;" : "Not Like" },
							{ value: "$eq", label: useopricon ? "&#xf52c;" : "Equal" },
							{
								value: "$ne",
								label: useopricon ? "&#xf53e;" : "Not Equal",
							},
						];

						break;
					case "select":
					case "check":
						rtn = [
							{ value: "$eq", label: useopricon ? "&#xf52c;" : "Equal" },
							{
								value: "$ne",
								label: useopricon ? "&#xf53e;" : "Not Equal",
							},
						];
						break;
					case "date":
					case "number":
						rtn = [
							{ value: "$eq", label: useopricon ? "&#xf52c;" : "Equal" },
							{
								value: "$ne",
								label: useopricon ? "&#xf53e;" : "Not Equal",
							},
							{
								value: "$gte",
								label: useopricon ? "&#xf532;" : "More Than",
							},
							{
								value: "$lte",
								label: useopricon ? "&#xf537;" : "Less Than",
							},
						];
						break;

					default:
						console.error("Unhandle query.fn.filter.opr itemtype : " + itemtype);
				}
			}

			return rtn;
		},
		item: (useopricon, field, f, o, v) => {
			//set default value for f
			if (!f) {
				f = field[0].value;
			}

			//generate from opt
			let from_opt = field.map((item) => {
				return {
					value: item.value,
					label: item.label,
				};
			});

			//gen sel.from
			let sel_from = new input({
				type: "select",
				name: "from",
				onchange: (event) => {
					fn.filter.change(event, useopricon);
				},
				option: from_opt,
				value: f,
			});

			//gen opr option
			let opr_opt = null;

			let item = field.find((obj) => {
				return obj.value === f;
			});

			//generate opr option base on itemtype
			opr_opt = fn.filter.opr(useopricon, item ? item.type : null);

			//set o value
			o = o ? o : opr_opt ? opr_opt[0].value : null;

			//set real opr value base on value
			if (o && o === "$regex") {
				//update opr value base on regex

				//like : { $regex: VALUETOFIND, $options: "i" };
				//notlike : { $regex: "^((?!" + VALUETOFIND + ").)*$", $options: "i" };
				if (v && v.startsWith("^((?!")) {
					o = "$nelike";
					v = v.substring(5, v.length - 5);
				} else {
					o = "$eqlike";
					v = v;
				}
			} else if (o && o === "$exists") {
				if (v) {
					o = "$ne";
				} else {
					o = "$eq";
				}

				v = "";
			}

			//gen sel.opr base on from value
			let sel_opr = new input({
				class: [useopricon ? "font-fa" : null].join(" "),
				type: "select",
				name: "opr",
				option: opr_opt,
				value: o,
			});

			return new div({
				display: "flex",
				elem: new div({
					container: "fluid",
					padding: 0,
					elem: [
						new div({
							row: true,
							elem: new div({
								col: true,
								elem: new div({
									display: "flex",
									gap: 2,
									elem: [
										sel_from,
										sel_opr,
										new button({
											color: "danger",
											icon: "trash",
											onclick: (event) => {
												fn.filter.remove(event);
											},
										}),
									],
								}),
							}),
						}),

						new div({
							row: true,
							paddingy: 2,
							elem: new div({
								col: true,
								elem: new input({
									type: item && item.type ? item.type : "text",
									name: "value",
									required: true,
									value: v,
									placeholder: item.placeholder ? item.placeholder : null,
									option: item && item.option ? item.option : null,
								}),
							}),
						}),
					],
				}),
			});
		},
		add: (event, animate) => {
			let sender = event.currentTarget;
			let id = sender.getAttribute("data-cl-container");
			let container = document.getElementById(id);
			let opt = db_filter[id];

			core.prependChild(
				container,
				new div(
					["item", animate ? "cl-fadeslidein" : null].filter(Boolean).join(" "),
					fn.filter.item(opt.useopricon, opt.field, null, null, null)
				)
			);

			setTimeout(
				(container) => {
					container.querySelectorAll(".cl-fadeslidein")[0].classList.remove("cl-fadeslidein");
				},
				500,
				container
			);
		},
		change: (event, useopricon) => {
			let sender = event.currentTarget;
			let id = sender.closest(".cl-filter-rule").getAttribute("id");
			let opt = db_filter[id];

			let opr = sender.closest(".item").querySelectorAll("select[name='opr']")[0];
			let val = sender.closest(".item").querySelectorAll("[name='value']")[0];
			let frm = core.getValue(sender);
			let item = opt.field.find((obj) => {
				return obj.value === frm;
			});

			//generate opr option base on itemtype
			let opr_opt = fn.filter.opr(useopricon, item ? item.type : null);

			core.replaceWith(
				opr.parentNode,
				new input({
					class: [useopricon ? "font-fa" : null].filter(Boolean).join(" "),
					type: "select",
					name: "opr",
					value: core.getValue(opr),
					option: opr_opt,
				})
			);

			//set val from frm value
			core.replaceWith(
				val.parentNode,
				new input({
					type: item && item.type ? item.type : "text",
					name: "value",
					placeholder: item.placeholder ? item.placeholder : null,
					value: core.getValue(val),
					option: item && item.option ? item.option : null,
				})
			);
		},
		remove: (event) => {
			let sender = event.currentTarget;
			sender.closest(".item").classList.add("cl-fadeslideout");

			setTimeout(
				(sender) => {
					core.removeElement(sender.closest(".item"));
				},
				500,
				sender
			);
		},
		get: (container) => {
			let result = null;
			let item = container.querySelectorAll("select[name='from']");

			if (item && item.length > 0) {
				//get filter item and put in array
				let tmp_result = [];

				item.forEach((selfrom) => {
					let selopr = selfrom.closest(".item").querySelectorAll("select[name='opr']")[0];
					let oprval = core.getValue(selopr);
					let inputval = selfrom.closest(".item").querySelectorAll("[name='value']")[0];

					if (oprval === "$eqlike" || oprval === "$nelike") {
						if (oprval === "$eqlike") {
							oprval = "$eq";
							inputval = { $regex: core.getValue(inputval), $options: "i" };
						} else {
							oprval = "$ne";
							inputval = { $regex: "^((?!" + core.getValue(inputval) + ").)*$", $options: "i" };
						}
					} else {
						inputval = core.getValue(inputval);
						if (inputval === null) {
							if (oprval === "$eq") {
								inputval = { $exists: false, $eq: null };
							} else if (oprval === "$ne") {
								inputval = { $exists: true, $ne: null };
							}
						}
					}

					tmp_result.push({
						f: core.getValue(selfrom),
						o: oprval,
						v: inputval,
					});
				});

				//sort filter item
				tmp_result.sort((a, b) => (a.f > b.f ? 1 : b.f > a.f ? -1 : 0));

				//put in u_filter
				let u_filter = [];
				let l_filter = null;

				tmp_result.forEach((i) => {
					if (l_filter === null || l_filter != i.f) {
						//mongodb not support field:{opr:{regex:value}}
						if (fn.isPrototypeExists(i.v, "$regex") || fn.isPrototypeExists(i.v, "$exists")) {
							//change to field:{regex}
							u_filter.push([
								{
									[i.f]: i.v,
								},
							]);
						} else {
							//change to field:{opr:value}
							u_filter.push([
								{
									[i.f]: { [i.o]: i.v },
								},
							]);
						}
					} else {
						//mongodb not support field:{opr:{regex:value}}
						if (fn.isPrototypeExists(i.v, "$regex") || fn.isPrototypeExists(i.v, "$exists")) {
							//change to field:{regex}
							u_filter[u_filter.length - 1].push({
								[i.f]: i.v,
							});
						} else {
							//change to field:{opr:value}
							u_filter[u_filter.length - 1].push({
								[i.f]: { [i.o]: i.v },
							});
						}
					}

					l_filter = i.f;
				});

				//combine u_filter
				result = {
					["$and"]: [],
				};

				u_filter.forEach((i) => {
					if (i.length === 1) {
						result["$and"].push(i[0]);
					} else {
						let v_filter = [];
						i.forEach((j) => {
							v_filter.push(j);
						});

						result["$and"].push({
							["$or"]: v_filter,
						});
					}
				});
			}

			return result;
		},
		btn: (opt) => {
			opt = core.extend({}, defaultFilterBtnOption, opt);

			return new button({
				icon: opt.icon,
				color: opt.color,
				col: opt.col,
				label: opt.label,
				attr: {
					"data-cl-container": opt.container,
				},
				onclick: (event) => {
					fn.filter.add(event, true);
				},
			});
		},
		build: (opt, data) => {
			opt = core.extend({}, defaultFilterBuildOption, opt);

			//generate id for dialog
			let id = opt.id || core.UUID();

			//gen filter list
			let list = [];

			//populate data into filter list
			if (data) {
				/* 
				$and:[
					{$or:[]},
					{name:{$eq:value}}
				]
				*/

				// $and:[] is mandatory
				if (data["$and"]) {
					//process each $and item
					data["$and"].forEach((i) => {
						//$and item
						if (i["$or"]) {
							i["$or"].forEach((j) => {
								let name = Object.keys(j)[0];
								let info = j[name];
								let opr = Object.keys(info)[0];
								let val = info[opr];

								list.push(new div("item", fn.filter.item(opt.useopricon, opt.field, name, opr, val)));
							});
						} else {
							let name = Object.keys(i)[0];
							let info = i[name];
							let opr = Object.keys(info)[0];
							let val = info[opr];

							list.push(new div("item", fn.filter.item(opt.useopricon, opt.field, name, opr, val)));
						}
					});
				}
			}

			//add filter button
			if (opt.add) {
				list.push(new div("item", opt.add));
			}

			//generate control
			let result = new div({
				padding: 0,
				container: "fluid",
				elem: new div({
					gap: 2,
					row: true,
					rowcol: 1,
					elem: new div({ col: true, class: "cl-filter-rule", id: id, elem: list }),
				}),
			});

			//delete unsave option
			delete opt.id;
			delete opt.add;

			//keep data in global
			db_filter[id] = opt;

			return result;
		},
	},
	sort: {
		opr: (useopricon, itemtype) => {
			let rtn = null;
			if (itemtype) {
				//set operator base on frm value
				if (useopricon) {
					switch (itemtype) {
						case "text":
						case "email":
						case "select":
							rtn = [
								{ value: 1, label: "&#xf15d;" },
								{ value: -1, label: "&#xf15e;" },
							];
							break;
						case "tel":
						case "check":
							rtn = [
								{ value: 1, label: "&#xf884;" },
								{ value: -1, label: "&#xf885;" },
							];
							break;
						case "date":
						case "number":
							rtn = [
								{ value: 1, label: "&#xf162;" },
								{ value: -1, label: "&#xf163;" },
							];
							break;
						default:
							console.error("Unhandle query.fn.sort.opr itemtype : " + itemtype);
					}
				} else {
					rtn = [
						{ value: 1, label: "Ascending" },
						{ value: -1, label: "Descending" },
					];
				}
			}

			return rtn;
		},
		item: (useopricon, field, f, o) => {
			//set default value for f
			if (!f) {
				f = field[0].value;
			}

			//generate from opt
			let from_opt = field.map((item) => {
				return {
					value: item.value,
					label: item.label,
				};
			});

			//gen sel.from
			let sel_from = new input({
				type: "select",
				name: "from",
				onchange: (event) => {
					fn.sort.change(event, useopricon);
				},
				option: from_opt,
				value: f,
			});

			//gen opr option
			let opr_opt = null;

			let item = field.find((obj) => {
				return obj.value === f;
			});

			//generate opr option base on itemtype
			opr_opt = fn.sort.opr(useopricon, item ? item.type : null);

			//gen sel.opr base on from value
			let sel_opr = new input({
				class: [useopricon ? "font-fa" : null].filter(Boolean).join(" "),
				type: "select",
				name: "opr",
				option: opr_opt,
				value: o ? o : opr_opt ? opr_opt[0].value : null,
			});

			return new div({
				display: "flex",
				elem: new div({
					container: "fluid",
					padding: 0,
					elem: new div({
						row: true,
						paddingbottom: 2,
						elem: new div({
							col: true,
							elem: new div({
								display: "flex",
								gap: 2,
								elem: [
									sel_from,
									sel_opr,
									new button({
										color: "danger",
										icon: "trash",
										onclick: (event) => {
											fn.sort.remove(event);
										},
									}),
								],
							}),
						}),
					}),
				}),
			});
		},
		add: (event, animate) => {
			let sender = event.currentTarget;
			let id = sender.getAttribute("data-cl-container");
			let container = document.getElementById(id);
			let opt = db_sort[id];

			core.prependChild(
				container,
				new div(
					["item", animate ? "cl-fadeslidein" : null].filter(Boolean).join(" "),
					fn.sort.item(opt.useopricon, opt.field, null, null)
				)
			);

			setTimeout(
				(container) => {
					container.querySelectorAll(".cl-fadeslidein")[0].classList.remove("cl-fadeslidein");
				},
				500,
				container
			);
		},
		change: (event, useopricon) => {
			let sender = event.currentTarget;
			let id = sender.closest(".cl-sort-rule").getAttribute("id");
			let opt = db_sort[id];

			let opr = sender.closest(".item").querySelectorAll("select[name='opr']")[0];
			let frm = core.getValue(sender);
			let item = opt.field.find((obj) => {
				return obj.value === frm;
			});

			//generate opr option base on itemtype
			let opr_opt = fn.sort.opr(useopricon, item ? item.type : null);

			core.replaceWith(
				opr.parentNode,
				new input({
					class: [useopricon ? "font-fa" : null].filter(Boolean).join(" "),
					type: "select",
					name: "opr",
					value: core.getValue(opr),
					option: opr_opt,
				})
			);
		},
		remove: (event) => {
			let sender = event.currentTarget;
			sender.closest(".item").classList.add("cl-fadeslideout");

			setTimeout(
				(sender) => {
					core.removeElement(sender.closest(".item"));
				},
				500,
				sender
			);
		},
		get: (container) => {
			let result = null;
			let item = container.querySelectorAll("select[name='from']");

			if (item && item.length > 0) {
				result = {};
				item.forEach((selfrom) => {
					let selopr = selfrom.closest(".item").querySelectorAll("select[name='opr']")[0];
					result[core.getValue(selfrom)] = parseInt(core.getValue(selopr), 10);
				});
			}

			return result;
		},
		btn: (opt) => {
			opt = core.extend({}, defaultSortBtnOption, opt);

			return new button({
				icon: opt.icon,
				color: opt.color,
				col: opt.col,
				label: opt.label,
				attr: {
					"data-cl-container": opt.container,
				},
				onclick: (event) => {
					fn.sort.add(event, true);
				},
			});
		},
		build: (opt, data) => {
			opt = core.extend({}, defaultSortBuildOption, opt);

			//generate id for dialog
			let id = opt.id || core.UUID();

			//gen sort list
			let list = [];

			//populate opt.data.sort into sort list
			if (data) {
				Object.keys(data).forEach((i) => {
					if (data[i]) {
						list.push(new div("item", fn.sort.item(opt.useopricon, opt.field, i, data[i])));
					}
				});
			}

			//add sort button
			if (opt.add) {
				list.push(new div("item", opt.add));
			}

			//build control
			let result = new div({
				padding: 0,
				container: "fluid",
				elem: new div({
					gap: 2,
					row: true,
					rowcol: 1,
					elem: new div({ col: true, class: "cl-sort-rule", id: id, elem: list }),
				}),
			});

			//delete unwanted
			delete opt.id;
			delete opt.add;

			//keep data in global
			db_sort[id] = opt;

			return result;
		},
	},
	field: {
		get: (container) => {
			let result = null;
			let item = container.querySelectorAll("input[name]");

			if (item && item.length > 0) {
				result = {};
				item.forEach((inputfield) => {
					if (!core.getValue(inputfield)) {
						result[inputfield.getAttribute("name")] = 0;
					}
				});
			}

			return result;
		},
		build: (opt, data) => {
			opt = core.extend({}, defaultFieldBuildOption, opt);

			//gen field list
			let list = [];

			//__v
			list.push(
				new input({
					type: "checkbox",
					label: "Version",
					name: "__v",
					checked: data && fn.isPrototypeExists(data, "__v") && data["__v"] === 0 ? false : true,
				})
			);

			//other field
			if (opt.field) {
				opt.field.forEach((i) => {
					list.push(
						new input({
							type: "checkbox",
							label: i.label,
							name: i.value,
							checked: data && fn.isPrototypeExists(data, i.value) && data[i.value] === 0 ? false : true,
						})
					);
				});
			}

			return new div({
				padding: 0,
				container: "fluid",
				elem: new div({
					gap: 2,
					row: true,
					rowcol: 1,
					elem: new div({ col: true, class: "cl-field-rule", id: opt.id, elem: list }),
				}),
			});
		},
	},
	limit: {
		get: (container) => {
			let item = container.querySelectorAll("input[name='limit']")[0];
			return core.getValue(item);
		},
		build: (opt, data) => {
			opt = core.extend({}, defaultLimitBuildOption, opt);

			return new input({
				type: "number",
				name: "limit",
				min: opt.min,
				max: opt.max,
				step: opt.step,
				value: data,
				numctl: true,
				required: true,
				label: "Record per Page",
			});
		},
	},
	skip: {
		get: (container) => {
			let item = container.querySelectorAll("input[name='step']")[0];
			return core.getValue(item) - 1;
		},
		build: (opt, data) => {
			opt = core.extend({}, defaultSkipBuildOption, opt);

			return new input({
				type: "number",
				name: "step",
				min: opt.min,
				max: opt.max,
				step: opt.step,
				value: data / opt.limit + 1,
				numctl: true,
				required: true,
				label: "Current Page",
			});
		},
	},
	get: (container) => {
		let filter_container = container.getElementsByClassName("cl-filter-rule")[0];
		let sort_container = container.getElementsByClassName("cl-sort-rule")[0];
		let field_container = container.getElementsByClassName("cl-field-rule")[0];
		let limit_container = container.querySelectorAll("input[name='limit']")[0].parentNode;
		let skip_container = container.querySelectorAll("input[name='step']")[0].parentNode;

		let t_filter = fn.filter.get(filter_container);
		let t_sort = fn.sort.get(sort_container);
		let t_field = fn.field.get(field_container);
		let t_limit = fn.limit.get(limit_container);
		let t_skip = fn.skip.get(skip_container) * t_limit;

		//return collected data
		return {
			filter: t_filter,
			sort: t_sort,
			field: t_field,
			limit: t_limit,
			skip: t_skip,
		};
	},
};

function btnBuilder(btn, defButton, defColor, pushCancel) {
	let argBtn = Array.isArray(btn) ? btn : [btn];
	if (pushCancel && argBtn.length === 1) argBtn.push("Cancel");

	return argBtn.map((i, ix) => {
		if (i instanceof Function) {
			return {
				label: ix <= defButton.length ? defButton[ix] : `Button ${ix + 1}`,
				color: ix === 0 && defColor ? defColor : null,
				onclick:
					ix === 0
						? (sender) => {
								if (core.validate(sender.closest(".modal"))) {
									i(sender);
									return true;
								} else {
									return false;
								}
						  }
						: i,
			};
		} else if (typeof i === "object") {
			return i;
		} else if (typeof i === "string") {
			return { label: i };
		}
	});
}

function elemBuilder(opt) {
	opt = core.extend({}, defaultBuildOption, opt);

	//generate id for dialog
	let id = core.UUID();

	//put in tab and return
	return new tab({
		flush: true,
		headAlign: "center",
		type: "pill",
		item: [
			{
				label: "Filter",
				icon: "filter",
				elem: fn.filter.build(
					{
						add: fn.filter.btn({ container: `${id}-filter`, label: "Add new filter", col: 12 }),
						id: `${id}-filter`,
						useopricon: opt.useopricon,
						field: opt.field,
					},
					opt.data.filter
				),
			},
			{
				label: "Sort",
				icon: "sort",
				elem: fn.sort.build(
					{
						add: fn.sort.btn({ container: `${id}-sort`, label: "Add new sort", col: 12 }),
						id: `${id}-sort`,
						useopricon: opt.useopricon,
						field: opt.field,
					},
					opt.data.sort
				),
			},
			{
				label: "Fields",
				icon: "tasks",
				elem: fn.field.build(
					{
						field: opt.field,
					},
					opt.data.field
				),
			},
			{
				label: "Page",
				icon: "list-ol",
				elem: [
					new div({
						padding: 0,
						class: "container cl-page-rule",
						elem: new div({
							gap: 2,
							row: true,
							rowcol: 1,
							elem: [
								new div({
									col: true,
									elem: fn.limit.build(
										{
											min: opt.limit.min,
											max: opt.limit.max,
											step: opt.limit.step,
										},
										opt.data.limit
									),
								}),
								new div({
									col: true,
									elem: fn.skip.build(
										{
											min: opt.skip.min,
											max: opt.skip.max,
											step: opt.skip.step,
											limit: opt.data.limit,
										},
										opt.data.skip
									),
								}),
							],
						}),
					}),
				],
			},
		],
	});
}

export class dialog extends modal {
	constructor(...opt) {
		if (opt && opt.length > 0) {
			super({
				title: "Query",
				elem: elemBuilder(opt[0]),
				button: btnBuilder(
					(sender) => {
						opt[1][0](sender, fn.get(sender.closest(".modal")));
					},
					["Okay", "Cancel", "Retry"],
					null,
					true
				),
				debug: opt.length > 2 && opt[2]?.debug === true ? true : false,
			});
		} else {
			super();
		}
	}
}

export class filter extends modal {
	constructor(...opt) {
		if (opt && opt.length > 0) {
			let id = core.UUID();
			super({
				title: "Filter",
				bodyclass: "pb-2",
				bodyminheight: "7.3rem",
				elem: fn.filter.build(
					{
						id: id,
						useopricon: opt[0].useopricon,
						field: opt[0].field,
					},
					opt[0].data
				),
				button: btnBuilder(
					(sender) => {
						opt[1][0](sender, fn.filter.get(sender.closest(".modal")));
					},
					["Okay", "Cancel", "Retry"],
					null,
					true
				),
				footer: fn.filter.btn({ container: id }),
				debug: opt.length > 2 && opt[2]?.debug === true ? true : false,
			});
		} else {
			super();
		}
	}
}

export class sort extends modal {
	constructor(...opt) {
		if (opt && opt.length > 0) {
			let id = core.UUID();
			super({
				title: "Sort",
				bodyclass: "pb-2",
				bodyminheight: "4.4rem",
				elem: fn.sort.build(
					{
						id: id,
						useopricon: opt[0].useopricon,
						field: opt[0].field,
					},
					opt[0].data
				),
				button: btnBuilder(
					(sender) => {
						opt[1][0](sender, fn.sort.get(sender.closest(".modal")));
					},
					["Okay", "Cancel", "Retry"],
					null,
					true
				),
				footer: fn.sort.btn({ container: id }),
				debug: opt.length > 2 && opt[2]?.debug === true ? true : false,
			});
		} else {
			super();
		}
	}
}

export class field extends modal {
	constructor(...opt) {
		if (opt && opt.length > 0) {
			super({
				title: "Field",
				elem: fn.field.build(
					{
						field: opt[0].field,
					},
					opt[0].data
				),
				button: btnBuilder(
					(sender) => {
						opt[1][0](sender, fn.field.get(sender.closest(".modal")));
					},
					["Okay", "Cancel", "Retry"],
					null,
					true
				),
				debug: opt.length > 2 && opt[2]?.debug === true ? true : false,
			});
		} else {
			super();
		}
	}
}

export class limit extends modal {
	constructor(...opt) {
		if (opt && opt.length > 0) {
			super({
				title: "Limit",
				elem: fn.limit.build(
					{
						min: opt[0].min,
						max: opt[0].max,
						step: opt[0].step,
					},
					opt[0].data
				),
				button: btnBuilder(
					(sender) => {
						opt[1][0](sender, fn.limit.get(sender.closest(".modal")));
					},
					["Okay", "Cancel", "Retry"],
					null,
					true
				),
				debug: opt.length > 2 && opt[2]?.debug === true ? true : false,
			});
		} else {
			super();
		}
	}
}

export class page extends modal {
	constructor(...opt) {
		if (opt && opt.length > 0) {
			super({
				title: "Page",
				elem: fn.skip.build(
					{
						min: opt[0].min,
						max: opt[0].max,
						step: opt[0].step,
						limit: opt[0].limit,
					},
					opt[0].data
				),
				button: btnBuilder(
					(sender) => {
						opt[1][0](sender, fn.skip.get(sender.closest(".modal")) * opt[0].limit);
					},
					["Okay", "Cancel", "Retry"],
					null,
					true
				),
				debug: opt.length > 2 && opt[2]?.debug === true ? true : false,
			});
		} else {
			super();
		}
	}
}
