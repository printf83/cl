"use strict";
import "../../css/animation.css";

import * as core from "./core.js";
import modal from "./modal.js";
import input from "./input.js";
import div from "./div.js";
import tab from "./tab.js";
import button from "./button.js";
import { container } from "./inputgroup.js";

let db = {};

let fn = {
	isPrototypeExists: function (obj, prototypeName) {
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
		opr: function (useopricon, itemtype) {
			let rtn = null;
			if (itemtype) {
				//set operator base on frm value
				switch (itemtype) {
					case "text":
					case "tel":
					case "email":
						rtn = [
							{ value: "$eq", label: useopricon ? "&#xf52c;" : "Equal" },
							{
								value: "$ne",
								label: useopricon ? "&#xf53e;" : "Not Equal",
							},
							{ value: "$eqlike", label: useopricon ? "&#xf52c; &#xf069;" : "Like" },
							{ value: "$nelike", label: useopricon ? "&#xf53e; &#xf069;" : "Not Like" },
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
		item: function (useopricon, field, f, o, v) {
			//set default value for f
			if (!f) {
				f = field[0].value;
			}

			//generate from opt
			let from_opt = field.map(function (item) {
				return {
					value: item.value,
					label: item.label,
				};
			});

			//gen sel.from
			let sel_from = new input({
				type: "select",
				name: "from",
				onchange: function (event) {
					fn.filter.change(event, useopricon);
				},
				option: from_opt,
				value: f,
				//size: "",
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
				if (v.startsWith("^((?!")) {
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
				//size: useopricon ? "col-4 col-lg-3 px-2" : "col-sm-5 col-md-4 col-lg-3 px-2",
			});

			return new div({
				display: "flex",
				elem: new div({
					class: "container",
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
											onclick: function (event) {
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
		add: function (event, animate) {
			let sender = event.currentTarget;
			let id = sender.closest(".card[id]").getAttribute("id");
			let opt = db[`${id}-data`];

			core.prependChild(
				sender.closest(".col"),
				new div(
					["item", animate ? "cl-fadeslidein" : null].filter(Boolean).join(" "),
					fn.filter.item(opt.useopricon, opt.field, null, null, null)
				)
			);

			setTimeout(
				function (sender) {
					sender
						.closest(".container")
						.querySelectorAll(".cl-fadeslidein")[0]
						.classList.remove("cl-fadeslidein");
				},
				500,
				sender
			);
		},
		change: function (event, useopricon) {
			let sender = event.currentTarget;
			let id = sender.closest(".card[id]").getAttribute("id");
			let opt = db[`${id}-data`];

			let opr = sender.closest(".item").querySelectorAll("select[name='opr']")[0];
			let val = sender.closest(".item").querySelectorAll("[name='value']")[0];
			let frm = core.getValue(sender);
			let item = opt.field.find((obj) => {
				return obj.value === frm;
			});

			//generate opr option base on itemtype
			let opr_opt = fn.filter.opr(opt.useopricon, item ? item.type : null);

			core.replaceWith(
				opr.parent,
				new input({
					class: [opt.useopricon ? "font-fa" : null].filter(Boolean).join(" "),
					type: "select",
					name: "opr",
					// size: useopricon ? "col-4 col-lg-3 px-2" : "col-sm-5 col-md-4 col-lg-3 px-2",
					value: core.getValue(opr),
					option: opr_opt,
				})
			);

			//set val from frm value
			core.replaceWith(
				val,
				new input({
					type: item && item.type ? item.type : "text",
					name: "value",
					// size: "",
					placeholder: item.placeholder ? item.placeholder : null,
					value: core.getValue(val),
					option: item && item.option ? item.option : null,
				})
			);
		},
		remove: function (event) {
			let sender = event.currentTarget;
			sender.closest(".item").classList.add("cl-fadeslideout");

			setTimeout(
				function (sender) {
					core.removeElement(sender.closest(".item"));
				},
				500,
				sender
			);
		},
	},
	sort: {
		opr: function (useopricon, itemtype) {
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
		item: function (useopricon, field, f, o) {
			//set default value for f
			if (!f) {
				f = field[0].value;
			}

			//generate from opt
			let from_opt = field.map(function (item) {
				return {
					value: item.value,
					label: item.label,
				};
			});

			//gen sel.from
			let sel_from = new input({
				type: "select",
				name: "from",
				onchange: function (event) {
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
				// size: useopricon ? "col-4 col-lg-3 px-2" : "col-sm-5 col-md-4 col-lg-3 px-2",
			});

			return new div({
				display: "flex",
				elem: new div({
					class: "container",
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
										onclick: function (event) {
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
		add: function (event, animate) {
			let sender = event.currentTarget;
			let id = sender.closest(".card[id]").getAttribute("id");
			let opt = db[`${id}-data`];

			core.prependChild(
				sender.closest(".col"),
				new div(
					["item", animate ? "cl-fadeslidein" : null].filter(Boolean).join(" "),
					fn.sort.item(opt.useopricon, opt.field, null, null)
				)
			);

			setTimeout(
				function (sender) {
					sender
						.closest(".container")
						.querySelectorAll(".cl-fadeslidein")[0]
						.classList.remove("cl-fadeslidein");
				},
				500,
				sender
			);
		},
		change: function (event, useopricon) {
			let sender = event.currentTarget;
			let id = sender.closest(".card[id]").getAttribute("id");
			let opt = db[`${id}-data`];

			let opr = sender.closest(".item").querySelectorAll("select[name='opr']")[0];
			let frm = core.getValue(sender);
			let item = opt.field.find((obj) => {
				return obj.value === frm;
			});

			//generate opr option base on itemtype
			let opr_opt = fn.sort.opr(opt.useopricon, item ? item.type : null);

			core.replaceWith(
				opr.parent,
				new input({
					class: [opt.useopricon ? "font-fa" : null].filter(Boolean).join(" "),
					type: "select",
					name: "opr",
					// size: useopricon ? "col-4 col-lg-3 px-2" : "col-sm-5 col-md-4 col-lg-3 px-2",
					value: core.getValue(opr),
					option: opr_opt,
				})
			);
		},
		remove: function (event) {
			let sender = event.currentTarget;
			sender.closest(".item").classList.add("cl-fadeslideout");

			setTimeout(
				function (sender) {
					core.removeElement(sender.closest(".item"));
				},
				500,
				sender
			);
		},
	},
	get: function (container) {
		// console.log(container);
		//collect filter rule
		let q_filter = null;

		let filter_container = container.getElementsByClassName("cl-filter-rule")[0];
		let filter_item = filter_container.querySelectorAll("select[name='from']");

		if (filter_item && filter_item.length > 0) {
			//get filter item and put in array
			let t_filter = [];

			filter_item.forEach(function (selfrom) {
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

				t_filter.push({
					f: core.getValue(selfrom),
					o: oprval,
					v: inputval,
				});
			});

			//sort filter item
			t_filter.sort((a, b) => (a.f > b.f ? 1 : b.f > a.f ? -1 : 0));

			//put in u_filter
			let u_filter = [];
			let l_filter = null;

			t_filter.forEach(function (i) {
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
			q_filter = {
				["$and"]: [],
			};

			u_filter.forEach(function (i) {
				if (i.length === 1) {
					q_filter["$and"].push(i[0]);
				} else {
					let v_filter = [];
					i.forEach(function (j) {
						v_filter.push(j);
					});

					q_filter["$and"].push({
						["$or"]: v_filter,
					});
				}
			});
		}

		//collect sort rule
		let q_sort = null;
		let sort_container = container.getElementsByClassName("cl-sort-rule")[0];
		let sort_item = sort_container.querySelectorAll("select[name='from']");

		if (sort_item && sort_item.length > 0) {
			q_sort = {};
			sort_item.forEach(function (selfrom) {
				let selopr = selfrom.closest(".item").querySelectorAll("select[name='opr']")[0];
				q_sort[core.getValue(selfrom)] = parseInt(core.getValue(selopr), 10);
			});
		}

		//collect field rule
		let q_field = null;
		let field_container = container.getElementsByClassName("cl-field-rule")[0];
		let field_item = field_container.querySelectorAll("input[name]");

		if (field_item && field_item.length > 0) {
			q_field = {};
			field_item.forEach(function (inputfield) {
				if (!core.getValue(inputfield)) {
					q_field[inputfield.getAttribute("name")] = 0;
				}
			});
		}

		//limit & sort
		let t_limit = core.getValue(container.querySelectorAll("input[name='limit']")[0]);
		let t_skip = (core.getValue(container.querySelectorAll("input[name='step']")[0]) - 1) * t_limit;

		//return collected data
		return {
			filter: q_filter,
			sort: q_sort,
			field: q_field,
			limit: t_limit,
			skip: t_skip,
		};
	},
};

function btnBuilder(btn, defButton, defColor, pushCancel) {
	let argBtn = Array.isArray(btn) ? btn : [btn];
	if (pushCancel && argBtn.length === 1) argBtn.push("Cancel");

	return argBtn.map(function (i, ix) {
		if (i instanceof Function) {
			return {
				label: ix <= defButton.length ? defButton[ix] : `Button ${ix + 1}`,
				color: ix === 0 && defColor ? defColor : null,
				onclick:
					ix === 0
						? function (sender) {
								i(sender, fn.get(sender.closest(".modal")));
								return true;
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

const defElemOption = {
	data: {
		// current filter state
		// filter: [{name:{$eq:"a"}}],
		// sort: {name:1},
		// limit: 20,
		// skip: 0,
		filter: null,
		sort: null,
		limit: 10,
		skip: 0,
		field: { __v: 0 },
	},
	limit: {
		min: 1,
		max: 100,
		step: 5,
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

function elemBuilder(opt) {
	opt = core.extend({}, defElemOption, opt);

	//generate id for dialog
	let id = core.UUID();

	//keep data in global
	db[`${id}-data`] = opt;

	//gen filter list
	let filter_list = [];

	//populate opt.data.filter into filter list
	if (opt.data.filter) {
		/* 
				$and:[
					{$or:[]},
					{name:{$eq:value}}
				]
				*/

		// $and:[] is mandatory
		if (opt.data.filter["$and"]) {
			//process each $and item
			opt.data.filter["$and"].forEach(function (i) {
				//$and item
				if (i["$or"]) {
					i["$or"].forEach(function (j) {
						let f2_name = Object.keys(j)[0];
						let f2_info = j[f2_name];
						let f2_opr = Object.keys(f2_info)[0];
						let f2_value = f2_info[f2_opr];

						filter_list.push(
							new div("item", fn.filter.item(opt.useopricon, opt.field, f2_name, f2_opr, f2_value))
						);
					});
				} else {
					let f1_name = Object.keys(i)[0];
					let f1_info = i[f1_name];
					let f1_opr = Object.keys(f1_info)[0];
					let f1_value = f1_info[f1_opr];

					filter_list.push(
						new div("item", fn.filter.item(opt.useopricon, opt.field, f1_name, f1_opr, f1_value))
					);
				}
			});
		}
	}

	//add filter button
	filter_list.push(
		new div(
			"item",
			new button({
				icon: "plus",
				color: "primary",
				class: "col-12",
				label: "Add New Filter Rule",
				onclick: function (sender) {
					fn.filter.add(sender, true);
				}, //"fn.filter.add(this," + (opt.useopricon ? "true" : "false") + ")",
			})
		)
	);

	//gen sort list
	let sort_list = [];

	//populate opt.data.sort into sort list
	if (opt.data.sort) {
		Object.keys(opt.data.sort).forEach(function (attrKey) {
			if (opt.data.sort[attrKey]) {
				sort_list.push(
					new div("item", fn.sort.item(opt.useopricon, opt.field, attrKey, opt.data.sort[attrKey]))
				);
			}
		});
	}

	//add sort button
	sort_list.push(
		new div(
			"item",
			new button({
				icon: "plus",
				color: "primary",
				class: "col-12",
				label: "Add New Sort Rule",
				onclick: function (sender) {
					fn.sort.add(sender, true);
				}, //"fn.sort.add(this," + (opt.useopricon ? "true" : "false") + ")",
			})
		)
	);

	//gen field list
	let field_list = [];

	//__v
	field_list.push(
		new input({
			type: "checkbox",
			label: "Version",
			name: "__v",
			size: "6",
			checked:
				opt.data && fn.isPrototypeExists(opt.data.field, "__v") && opt.data.field["__v"] === 0 ? false : true,
		})
	);

	//other field
	if (opt.field) {
		opt.field.forEach(function (item) {
			field_list.push(
				new input({
					type: "checkbox",
					label: item.label,
					name: item.value,
					size: 6,
					checked:
						opt.data && fn.isPrototypeExists(opt.data.field, item.value) && opt.data.field[item.value] === 0
							? false
							: true,
				})
			);
		});
	}

	//put in tab and return
	return new tab({
		id: id,
		flush: true,
		headAlign: "center",
		type: "pill",
		item: [
			{
				label: "Filter",
				icon: "filter",
				elem: new div({
					padding: 0,
					class: "container cl-filter-rule",
					elem: new div({
						gap: 2,
						row: true,
						rowcol: 1,
						elem: filter_list.map(function (i) {
							return new div({ col: true, elem: i });
						}),
					}),
				}),
			},
			{
				label: "Sort",
				icon: "sort",
				elem: new div({
					padding: 0,
					class: "container cl-sort-rule",
					elem: new div({
						gap: 2,
						row: true,
						rowcol: 1,
						elem: sort_list.map(function (i) {
							return new div({ col: true, elem: i });
						}),
					}),
				}),
			},
			{
				label: "Fields",
				icon: "tasks",
				elem: new div({
					padding: 0,
					class: "container cl-field-rule",
					elem: new div({
						gap: 2,
						row: true,
						rowcol: 1,
						elem: field_list.map(function (i) {
							return new div({ col: true, elem: i });
						}),
					}),
				}),
			},
			{
				label: "Page",
				icon: "list-ol",
				elem: [
					new div({
						padding: 0,
						class: "container cl-field-rule",
						elem: new div({
							row: true,
							elem: [
								new div({
									col: 6,
									elem: new input({
										type: "number",
										name: "limit",
										min: opt.limit.min,
										max: opt.limit.max,
										step: opt.limit.step,
										value: opt.data.limit,
										numctl: true,
										label: "Record per Page",
									}),
								}),
								new div({
									col: 6,
									elem: new input({
										type: "number",
										name: "step",
										min: opt.skip.min,
										max: opt.skip.max,
										step: opt.skip.step,
										value: opt.data.skip / opt.data.limit + 1,
										numctl: true,
										label: "Current Page",
									}),
								}),
							],
						}),
					}),
				],
			},
		],
	});
}

export default class query extends modal {
	constructor(...opt) {
		if (opt && opt.length > 0) {
			if (opt.length === 3) {
				super({
					title: "Query",
					elem: elemBuilder(opt[0]),
					button: btnBuilder(opt[1], ["Okay", "Cancel", "Retry"], null, true),
					debug: opt[2]?.debug === true ? true : false,
				});
			} else if (opt.length === 2) {
				super({
					title: "Query",
					elem: elemBuilder(opt[0]),
					button: btnBuilder(opt[1], ["Okay", "Cancel", "Retry"], null, true),
				});
			} else {
				console.error("Unsupported argument", opt);
			}
		} else {
			super();
		}
	}
}
