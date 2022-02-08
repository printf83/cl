"use strict";
import * as core from "./core.js";
import * as db from "./api.js";
import * as query from "./query.js";
import div from "./div.js";
import paging from "./paging.js";
import listgroup from "./listgroup.js";
import btngroup from "./btngroup.js";
import img from "./img.js";
import button from "./button.js";
import * as dlg from "./dlg.js";

const fn = {
	set: function (id, opt) {
		db_opt[id] = core.extend({}, defaultOption, opt);
	},
	get: function (id) {
		if (db_opt[id]) {
			return db_opt[id];
		} else {
			return null;
		}
	},
	load: function (id, opt) {
		fn.set(id, opt);
		fn.reload(id);
	},
	reload: function (id) {
		let opt = fn.get(id);
		if (opt) {
			db.api.list(
				{
					name: opt.name,
					data: opt.query,
				},
				function (result) {
					let container = document.getElementById(id);
					core.removeChildElement(container);
					core.appendChild(container, new listgroup({ item: opt.items(result.data, opt.item) }));

					if (opt.paging) {
						if (result.total > opt.query.limit) {
							core.appendChild(
								container,
								new paging({
									total: result.total,
									skip: opt.query.skip,
									limit: opt.query.limit,
									onchange: fn.pagechange,
									attr: { "data-cl-container": id },
								})
							);
						}
					}

					core.init(container);
				}
			);
		}
	},
	pagechange: function (event) {
		let sender = event.currentTarget;
		let container = sender.closest(".pagination");
		let id = container.getAttribute("data-cl-container");

		let opt = fn.get(id);
		if (opt) {
			opt.query.skip = event.detail.skip;
			fn.set(id, opt);
			fn.reload(id);
		}
	},
	query: {
		all: function (id) {
			let opt = fn.get(id);
			if (opt) {
				new query.dialog(
					{
						field: opt.setting.field,
						limit: opt.setting.limit,
						skip: opt.setting.skip,
						useopricon: opt.setting.useopricon,
						data: opt.query,
					},
					[
						function (_event, data) {
							opt.query = data;
							fn.set(id, opt);
							fn.reload(id);
						},
					]
				).show();
			}
		},
		filter: function (id) {
			let opt = fn.get(id);
			if (opt) {
				new query.filter(
					{
						field: opt.setting.field,
						useopricon: opt.setting.useopricon,
						data: opt.query.filter,
					},
					[
						function (_event, data) {
							opt.query.filter = data;
							fn.set(id, opt);
							fn.reload(id);
						},
					]
				).show();
			}
		},
		sort: function (id) {
			let opt = fn.get(id);
			if (opt) {
				new query.sort(
					{
						field: opt.setting.field,
						useopricon: opt.setting.useopricon,
						data: opt.query.sort,
					},
					[
						function (_event, data) {
							opt.query.sort = data;
							fn.set(id, opt);
							fn.reload(id);
						},
					]
				).show();
			}
		},
		field: function (id) {
			let opt = fn.get(id);
			if (opt) {
				new query.field(
					{
						field: opt.setting.field,
						data: opt.query.field,
					},
					[
						function (_event, data) {
							opt.query.field = data;
							fn.set(id, opt);
							fn.reload(id);
						},
					]
				).show();
			}
		},
		limit: function (id) {
			let opt = fn.get(id);
			if (opt) {
				new query.limit(
					{
						min: opt.setting.limit.min,
						max: opt.setting.limit.max,
						step: opt.setting.limit.step,
						data: opt.query.limit,
					},
					[
						function (_event, data) {
							let skip = opt.query.skip / opt.query.limit;
							opt.query.limit = data;
							opt.query.skip = skip * opt.query.limit;
							fn.set(id, opt);
							fn.reload(id);
						},
					]
				).show();
			}
		},
		page: function (id) {
			let opt = fn.get(id);
			if (opt) {
				new query.page(
					{
						min: opt.setting.skip.min,
						max: opt.setting.skip.max,
						step: opt.setting.skip.step,
						limit: opt.query.limit,
						data: opt.query.skip,
					},
					[
						function (_event, data) {
							opt.query.skip = data;
							fn.set(id, opt);
							fn.reload(id);
						},
					]
				).show();
			}
		},
	},
	excel: function (id) {
		let opt = fn.get(id);
		if (opt) {
			db.api.excel({
				name: opt.name,
				data: opt.query,
			});
		}
	},
	edititem: function (event) {
		let sender = event.currentTarget.closest("div[data-key]");
		let key = sender.getAttribute("data-key");
		let container = sender.closest(".cl-list");
		let id = container.getAttribute("id");
		let opt = fn.get(id);
		if (opt) {
			db.api.load(
				{
					name: opt.name,
					id: key,
				},
				function (data) {
					new dlg.confirmbox({
						elem: opt.editor(data),
						button: [
							{
								label: "Save",
								onclick: function (data) {
									data._id = key;
									db.api.update(
										{
											name: opt.name,
											id: key,
											data: data,
										},
										function (data) {}
									);
								},
							},
							{
								label: "Cancel",
							},
						],
					}).show();
				}
			);
		}
	},
	copyitem: function (event) {
		let sender = event.currentTarget.closest("div[data-key]");
		let key = sender.getAttribute("data-key");
		let container = sender.closest(".cl-list");
		let id = container.getAttribute("id");
		let opt = fn.get(id);
		if (opt) {
			db.api.load(
				{
					name: opt.name,
					id: key,
				},
				function (data) {
					delete data._id;
					new dlg.confirmbox({
						elem: opt.editor(data),
						button: [
							{
								label: "Save",
								onclick: function (data) {
									db.api.create(
										{
											name: opt.name,
											data: data,
										},
										function (data) {}
									);
								},
							},
							{
								label: "Cancel",
							},
						],
					}).show();
				}
			);
		}
	},
	deleteitem: function (event) {
		let sender = event.currentTarget.closest("div[data-key]");
		let key = sender.getAttribute("data-key");
		let container = sender.closest(".cl-list");
		let id = container.getAttribute("id");
		let opt = fn.get(id);
		if (opt) {
			new dlg.confirmbox("!!", "Are you sure", [
				{
					label: "Yes, delete",
					color: "danger",
					onclick: function () {
						db.api.delete(
							{
								name: opt.name,
								id: key,
							},
							function (data) {}
						);
					},
				},
				{
					label: "Cancel",
				},
			]).show();
		}
	},
};

const db_opt = {};

const defaultOption = {
	setting: null,
	query: null,
	name: null,
	paging: true,
	items: function (data, item) {
		return data.map(function (i) {
			return { elem: item(i) };
		});
	},
	item: function (data) {
		return new item({
			name: JSON.stringify(data),
		});
	},
};

const defaultItemOption = {
	key: null,
	picture: null,
	name: null,
	detail: null,
};

export class container extends div {
	constructor(...opt) {
		super(...opt);
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		if (opt) {
			opt = core.extend({}, defaultOption, opt);

			opt.id = opt.id || core.UUID();

			opt.class = core.merge.class(opt.class, ["cl-list"]);

			fn.set(opt.id, opt);

			delete opt.setting;
			delete opt.query;
			delete opt.name;
			delete opt.paging;
			delete opt.items;

			super.data = opt;
		}
	}

	static load = fn.load;
	static reload = fn.reload;
	static query = fn.query;
	static excel = fn.excel;
}

export class item extends div {
	constructor(...opt) {
		super(...opt);
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		opt = core.extend({}, defaultItemOption, opt);

		super.data = {
			attr: { "data-key": opt.key },
			elem: [
				opt.picture
					? new div({
							elem: new img({ src: db.file.url(opt.picture) }),
					  })
					: null,
				new div({ elem: [new div(opt.name), opt.detail ? new div(opt.detail) : null] }),
				new btngroup({
					elem: [
						new button({ icon: "edit", color: "primary", onclick: fn.edititem }),
						new button({ icon: "copy", color: "success", onclick: fn.copyitem }),
						new button({ icon: "trash", color: "danger", onclick: fn.deleteitem }),
					],
				}),
			],
		};
	}
}

// (function (ns) {
// 	var fn = {
// 		options: {
// 			base: {
// 				container: null,
// 				id: ns.core.UUID(),
// 				dbname: "",
// 				control: null,
// 				listprocessor: function (list) {
// 					return new Promise((res, rej) => {
// 						if (list && list.length > 0) {
// 							res([
// 								{
// 									group: null,
// 									items: list.map((i) => {
// 										return {
// 											key: i._id,
// 											label: i.name,
// 										};
// 									}),
// 								},
// 							]);
// 						} else {
// 							res(null);
// 						}
// 					});
// 				},
// 				onpagechange: function (skip, sender) {
// 					console.warn("Unhandle onpagechange");
// 				},
// 			},
// 			query: {
// 				filter: null,
// 				sort: null,
// 				field: { __v: 0, state: 0 },
// 				limit: 10,
// 				skip: 0,
// 			},
// 			item: {
// 				key: null,
// 				label: null,
// 				sub: null,
// 				control: null,
// 				controlstyle: "btn-group", //btn-group|dropdown|null
// 				icon: null,
// 				picture: null,
// 				checked: false,
// 				key: null,
// 				onclick: null,
// 			},
// 			group: {
// 				key: null,
// 				label: null,
// 				icon: null,
// 				bigicon: false,
// 				picture: null,
// 				key: null,
// 				elems: null,
// 			},
// 		},
// 		db: function (id, query, sender) {
// 			var opt = ns.data.get(id);

// 			return new Promise((res, rej) => {
// 				var total = null;
// 				ns.api
// 					.post({
// 						sender: sender,
// 						name: `list/${opt.dbname}`,
// 						data: query,
// 					})
// 					.then((result) => {
// 						total = result.total;
// 						return opt.listprocessor(result.data);
// 					})
// 					.then((data) => {
// 						res({
// 							total: total,
// 							data: data,
// 						});
// 					})
// 					.catch((err) => {
// 						rej(err);
// 					});
// 			});
// 		},
// 		clear: function (id) {
// 			var container = $(`#${id}`);
// 			if (container && container.length > 0) {
// 				$(container).find(".list-group").remove();
// 				$(container).find(".ns-list-header").remove();
// 				$(container).find(".ns-list-page").remove();
// 				$(container).find(".list-group-item").remove();
// 			}
// 		},
// 		build: {
// 			page: function (opt) {
// 				if (opt.total > 0) {
// 					return ns.pagination({
// 						limit: opt.limit,
// 						skip: opt.skip,
// 						total: opt.total,
// 						max: 5,
// 						onchange: function (skip, sender) {
// 							ns.list.fn.onPageChange(skip, sender);
// 						},
// 					});
// 				} else {
// 					return null;
// 				}
// 			},
// 			item: function (opt) {
// 				opt = $.extend({}, fn.options.item, opt);

// 				var res = [];

// 				//create label
// 				if (opt.label) {
// 					res.push(ns.div("ns-item-label me-2", opt.label));
// 				}

// 				//create sub label
// 				if (opt.sub) {
// 					res.push(
// 						ns.div([
// 							{
// 								tag: "small",
// 								class: "text-muted me-2 ns-item-sub",
// 								elems: Array.isArray(opt.sub) ? opt.sub.combine(" | ") : opt.sub,
// 							},
// 						])
// 					);
// 				}

// 				//wrap in div
// 				res = [ns.div(res.slice())];

// 				//create icon
// 				if (opt.icon) {
// 					res.unshift(
// 						ns.div(
// 							"ns-item-icon",
// 							ns.icon({
// 								size: "lg",
// 								elems: [{ icon: "circle" }, { icon: opt.icon }],
// 							})
// 						)
// 					);
// 				}

// 				//create picture
// 				if (opt.picture) {
// 					res.unshift(
// 						ns.div(
// 							"ns-item-picture",
// 							ns.div([
// 								{
// 									tag: "img",
// 									attr: {
// 										"data-ns-src": `api/file/${opt.picture}`,
// 									},
// 								},
// 							])
// 						)
// 					);
// 				}

// 				//create check tag
// 				res.unshift(
// 					ns.div(
// 						"ns-item-check",
// 						ns.icon({
// 							size: "lg",
// 							elems: [{ icon: "circle" }, { icon: "check" }],
// 						})
// 					)
// 				);

// 				//wrap in div
// 				res = [ns.div(res.slice())];

// 				//put control
// 				if (opt.control && Array.isArray(opt.control)) {
// 					if (opt.controlstyle === "btn-group") {
// 						res.push(
// 							ns.div(
// 								"ns-item-control",
// 								{ onclick: "ns.list.fn.preventBubble(event)" },
// 								ns.btngroup(opt.control.map((item) => ns.button(item)))
// 							)
// 						);
// 					} else if (opt.controlstyle === "dropdown") {
// 						res.push(
// 							ns.div(
// 								"ns-item-control",
// 								{ onclick: "ns.list.fn.preventBubble(event)" },
// 								ns.button({
// 									option: opt.control,
// 								})
// 							)
// 						);
// 					} else {
// 						res.push(
// 							ns.div("ns-item-control", { onclick: "ns.list.fn.preventBubble(event)" }, opt.control)
// 						);
// 					}
// 				}

// 				return ns.div(
// 					["list-group-item", "list-group-item-action", opt.checked ? "ns-checked" : null],
// 					{
// 						"data-key": opt.key,
// 						"data-ns-onclick": opt.onclick && typeof opt.onclick === "string" ? opt.onclick : null,
// 						onclick: "ns.list.fn.itemOnClick(this,event)",
// 					},
// 					res
// 				);
// 			},
// 			group: function (opt) {
// 				opt = $.extend({}, fn.options.group, opt);

// 				var res = [];

// 				//create label
// 				if (opt.label) {
// 					res.push({
// 						tag: "h5",
// 						class: "ns-item-label",
// 						elems: opt.label,
// 					});
// 				}

// 				//create icon
// 				if (opt.icon) {
// 					if (opt.bigicon) {
// 						res.unshift(
// 							ns.div(
// 								"display-1",
// 								ns.icon({
// 									size: "lg",
// 									icon: opt.icon,
// 								})
// 							)
// 						);
// 					} else {
// 						res.unshift(
// 							ns.div(
// 								"ns-item-icon",
// 								ns.icon({
// 									size: "lg",
// 									elems: [{ icon: "circle" }, { icon: opt.icon }],
// 								})
// 							)
// 						);
// 					}
// 				}

// 				//create picture
// 				if (opt.picture) {
// 					res.unshift(
// 						ns.div(
// 							"ns-item-picture",
// 							ns.div([
// 								{
// 									tag: "img",
// 									attr: {
// 										"data-ns-src": `api/file/${opt.picture}`,
// 									},
// 								},
// 							])
// 						)
// 					);
// 				}

// 				if (res && res.length > 0) {
// 					return [
// 						ns.div("ns-list-header", { "data-key": opt.key }, res),
// 						ns.div("list-group ns-list-group", { "data-ns-group-key": opt.key }, opt.elems),
// 					];
// 				} else {
// 					return [ns.div("list-group ns-list-group", { "data-ns-group-key": "" }, opt.elems)];
// 				}
// 			},
// 			list: function (id, query) {
// 				query = $.extend({}, fn.options.query, query);

// 				return new Promise((res, rej) => {
// 					fn.db(id, query)
// 						.then((data) => {
// 							//process list
// 							var li = [];

// 							if (data.data && data.data.length > 0) {
// 								//generate li
// 								$.each(data.data, (x, i) => {
// 									li.push.apply(
// 										li,
// 										fn.build.group({
// 											label: i.group,
// 											elems: i.items.map((item) => {
// 												return fn.build.item(item);
// 											}),
// 										})
// 									);
// 								});
// 							} else {
// 								li.push.apply(li, fn.build.group({ label: "No Data" }));
// 							}

// 							res({
// 								page: fn.build.page({
// 									total: data.total,
// 									skip: query.skip,
// 									limit: query.limit,
// 								}),
// 								li: { elems: li },
// 							});
// 						})
// 						.catch((err) => {
// 							rej(err);
// 						});
// 				});
// 			},
// 			container: function (id, query) {
// 				return new Promise((res, rej) => {
// 					query = $.extend({}, fn.options.query, query);

// 					fn.build
// 						.list(id, query)
// 						.then((data) => {
// 							var opt = ns.data.get(id);
// 							$(opt.container).empty();
// 							ns.build.append(
// 								opt.container,
// 								ns.div("ns-list-container ns-mode-normal", { id: id }, [
// 									opt.control,
// 									data.li,
// 									data.page,
// 								])
// 							);

// 							ns.build.init(opt.container);
// 							res();
// 						})
// 						.catch((err) => {
// 							rej(err);
// 						});
// 				});
// 			},
// 		},
// 		getChecked: function (sender) {
// 			var listcontainer = $(sender).closest(".ns-list-container");
// 			var itemchecked = $(listcontainer).find(".ns-checked");
// 			if (itemchecked && itemchecked.length > 0) {
// 				return $(itemchecked)
// 					.get()
// 					.map((i) => {
// 						return {
// 							key: $(i).attr("data-key"),
// 							title: $(i).find(".ns-label").text(),
// 						};
// 					});
// 			} else {
// 				return null;
// 			}
// 		},
// 	};

// 	var fnpublic = {
// 		preventBubble: function (event) {
// 			event.stopPropagation();
// 		},
// 		itemOnClick: function (sender, event) {
// 			event.stopPropagation();

// 			var container = $(sender).closest(".ns-list-container");

// 			if (container && container.length > 0 && $(container).hasClass("ns-mode-check")) {
// 				//check mode
// 				if ($(sender).hasClass("ns-checked")) {
// 					$(sender).removeClass("ns-checked");
// 				} else {
// 					$(sender).addClass("ns-checked");
// 				}
// 			} else {
// 				//normal mode
// 				var fnonclick = $(sender).attr("data-ns-onclick");
// 				if (fnonclick) {
// 					window[fnonclick](sender, event);
// 				}
// 			}
// 		},
// 		onPageChange: function (skip, sender) {
// 			var container = $(sender).closest(".ns-list-container");
// 			var id = $(container).attr("id");
// 			var opt = ns.data.get(id);
// 			opt.onpagechange(skip, sender);
// 		},
// 		mode: {
// 			normal: function (sender) {
// 				var container = $(sender).closest(".ns-list-container");
// 				if (container && container.length > 0) {
// 					//animation
// 					$(container)
// 						.find(".ns-list-control.ns-mode-check")
// 						.removeClass("ns-fadeslidein")
// 						.addClass("ns-fadeslideout");

// 					setTimeout(
// 						function (container) {
// 							$(container).removeClass("ns-mode-check").addClass("ns-mode-normal");
// 						},
// 						500,
// 						container
// 					);

// 					$(container)
// 						.find(".ns-list-control.ns-mode-normal")
// 						.removeClass("ns-fadeslideout")
// 						.addClass("ns-fadeslidein");
// 				}
// 			},
// 			check: function (sender) {
// 				var container = $(sender).closest(".ns-list-container");
// 				if (container && container.length > 0) {
// 					//animation
// 					$(container)
// 						.find(".ns-list-control.ns-mode-check")
// 						.removeClass("ns-fadeslideout")
// 						.addClass("ns-fadeslidein");

// 					setTimeout(
// 						function (container) {
// 							$(container).removeClass("ns-mode-normal").addClass("ns-mode-check");
// 						},
// 						500,
// 						container
// 					);

// 					$(container)
// 						.find(".ns-list-control.ns-mode-normal")
// 						.removeClass("ns-fadeslidein")
// 						.addClass("ns-fadeslideout");
// 				}
// 			},
// 		},
// 		check: function (sender) {
// 			var container = $(sender).closest(".ns-list-container");
// 			if (container && container.length > 0) {
// 				let items = $(container).find(".list-group-item");
// 				let checked = $(container).find(".list-group-item.ns-checked");

// 				if (checked.length === items.length) {
// 					$(items).removeClass("ns-checked");
// 				} else {
// 					$(items).addClass("ns-checked");
// 				}
// 			}
// 		},
// 	};

// 	ns.list = {
// 		fn: fnpublic,

// 		checked: function (sender) {
// 			return fn.getChecked(sender);
// 		},
// 		refresh: function (id, query) {
// 			return new Promise((res, rej) => {
// 				fn.build
// 					.list(id, query)
// 					.then((data) => {
// 						fn.clear(id);
// 						var container = $(`#${id}`)[0];
// 						ns.build.append(container, [data.li, data.page]);
// 						ns.build.init(container);
// 						res();
// 					})
// 					.catch((err) => {
// 						rej(err);
// 					});
// 			});
// 		},
// 		build: function (opt, query) {
// 			opt = $.extend({}, fn.options.base, opt);

// 			//validate required data
// 			if (opt.dbname) {
// 				if (opt.container) {
// 					//keep opt in memory
// 					ns.data.set(opt.id, opt);
// 					fn.build.container(opt.id, query).then(() => {
// 						ns.build.init(opt.container);
// 					});
// 				} else {
// 					console.error("ns.list opt required container");
// 				}
// 			} else {
// 				console.error("ns.list opt required dbname");
// 			}
// 		},
// 		query: function (sender, query) {
// 			ns.query(sender, query);
// 		},
// 		excel: function (sender, query) {
// 			var id = $(sender).closest(".ns-list-container").attr("id");
// 			var opt = ns.data.get(id);

// 			ns.api
// 				.download({
// 					sender: sender,
// 					name: `excel/${opt.dbname}`,
// 					data: query,
// 				})
// 				.catch((err) => {
// 					rej(err);
// 				});
// 		},
// 	};
// })(ns);
