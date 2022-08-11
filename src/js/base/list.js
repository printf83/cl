"use strict";
// import "../../css/list.css";

import * as core from "./core.js";
import * as db from "./api.js";
import * as query from "./query.js";
import div from "./div.js";
import paging from "./paging.js";
import btngroup from "./btngroup.js";
import img from "./img.js";
import button from "./button.js";
import * as dlg from "./dlg.js";
import icon from "./icon.js";
import h from "./h.js";
import b from "./b.js";
import li from "./li.js";
import ul from "./ul.js";

const fn = {
	genname: function (names) {
		if (names) {
			names = Array.isArray(names) ? names : [names];

			if (names.length === 1) {
				return `<b>${names[0]}</b>`;
			} else if (names.length === 2) {
				return `<b>${names[0]}</b> and <b>${names[1]}</b>`;
			} else if (names.length === 3) {
				return `<b>${names[0]}</b>, <b>${names[1]}</b> and <b>${names[2]}</b>`;
			} else {
				return `<b>${names[0]}</b>, <b>${names[1]}</b>, <b>${names[2]}</b> and <b>${names.length - 3} more</b>`;
			}
		}

		return null;
	},
	set: function (id, propertyName, value) {
		if (propertyName) {
			if (!db_opt[id]) {
				console.warn(`db_opt['${id}'] not found`);
				db_opt[id] = {};
			}

			db_opt[id][propertyName] = value;
		} else {
			db_opt[id] = core.extend({}, defaultOption, value);
		}
	},
	get: function (id, propertyName) {
		if (db_opt[id]) {
			if (propertyName) {
				return db_opt[id][propertyName];
			} else {
				return db_opt[id];
			}
		} else {
			return null;
		}
	},
	reload: function (id, sender, callback) {
		let opt = fn.get(id);
		if (opt) {
			db.api.list(
				{
					name: opt.name,
					data: opt.query,
					sender: sender,
				},
				function (result) {
					let container = document.getElementById(id);
					core.removeChildElement(container);
					core.appendChild(
						container,
						new ul({ class: "list-group", elem: opt.items(result.data, opt.item, opt.group) })
					);

					if (opt.paging) {
						if (result.total > opt.query.limit) {
							core.appendChild(
								container,
								new paging({
									total: result.total,
									skip: opt.query.skip,
									limit: opt.query.limit,
									onchange: fn.pagechange,
									autoupdate: false,
									nextprev: false,
									attr: { "data-cl-container": id },
								})
							);
						}
					}

					core.init(container);

					if (typeof callback === "function") {
						callback(container);
					}
				},
				sender
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
			fn.set(id, null, opt);
			fn.reload(id, event.detail.sender);
		}
	},
	query: {
		all: function (id, sender) {
			let opt = fn.get(id);
			if (opt) {
				new query.dialog(
					{
						field: opt.setting?.field,
						limit: opt.setting?.limit,
						skip: opt.setting?.skip,
						useopricon: opt.setting?.useopricon,
						data: opt.query,
					},
					[
						function (_event, data) {
							opt.query = data;
							fn.set(id, null, opt);
							fn.reload(id, sender);
						},
					]
				).show();
			}
		},
		filter: function (id, sender) {
			let opt = fn.get(id);
			if (opt) {
				new query.filter(
					{
						field: opt.setting?.field,
						useopricon: opt.setting?.useopricon,
						data: opt.query?.filter,
					},
					[
						function (_event, data) {
							opt.query.filter = data;
							fn.set(id, null, opt);
							fn.reload(id, sender);
						},
					]
				).show();
			}
		},
		sort: function (id, sender) {
			let opt = fn.get(id);
			if (opt) {
				new query.sort(
					{
						field: opt.setting?.field,
						useopricon: opt.setting?.useopricon,
						data: opt.query?.sort,
					},
					[
						function (_event, data) {
							opt.query.sort = data;
							fn.set(id, null, opt);
							fn.reload(id, sender);
						},
					]
				).show();
			}
		},
		field: function (id, sender) {
			let opt = fn.get(id);
			if (opt) {
				new query.field(
					{
						field: opt.setting?.field,
						data: opt.query?.field,
					},
					[
						function (_event, data) {
							opt.query.field = data;
							fn.set(id, null, opt);
							fn.reload(id, sender);
						},
					]
				).show();
			}
		},
		limit: function (id, sender) {
			let opt = fn.get(id);
			if (opt) {
				new query.limit(
					{
						min: opt.setting?.limit?.min,
						max: opt.setting?.limit?.max,
						step: opt.setting?.limit?.step,
						data: opt.query?.limit,
					},
					[
						function (_event, data) {
							let skip = opt.query.skip / opt.query.limit;
							opt.query.limit = data;
							opt.query.skip = skip * opt.query.limit;
							fn.set(id, null, opt);
							fn.reload(id, sender);
						},
					]
				).show();
			}
		},
		page: function (id, sender) {
			let opt = fn.get(id);
			if (opt) {
				new query.page(
					{
						min: opt.setting?.skip?.min,
						max: opt.setting?.skip?.max,
						step: opt.setting?.skip?.step,
						limit: opt.query?.limit,
						data: opt.query?.skip,
					},
					[
						function (_event, data) {
							opt.query.skip = data;
							fn.set(id, null, opt);
							fn.reload(id, sender);
						},
					]
				).show();
			}
		},
	},
	excel: function (id, sender) {
		let opt = fn.get(id);
		if (opt) {
			db.api.excel({
				name: opt.name,
				data: opt.query,
				sender: sender,
			});
		}
	},
	check: {
		get: function (id) {
			let container = document.getElementById(id);
			if (container.classList.contains("check")) {
				let checked = container.querySelectorAll(".check[data-key]");
				if (checked && checked.length > 0) {
					return Array.from(checked).map(function (i) {
						return {
							key: i.getAttribute("data-key"),
							name: i.getAttribute("data-name"),
						};
					});
				}
			}

			return null;
		},
		set: function (id, data) {
			if (data && data.length > 0) {
				data = Array.isArray(data) ? data : [data];

				let container = document.getElementById(id);
				if (container.classList.contains("check")) {
					//remove checked
					let checked = container.querySelectorAll(".check[data-key]");
					if (checked && checked.length > 0) {
						Array.from(checked).forEach(function (i) {
							i.classList.remove("check");
						});
					}

					//check data
					data.forEach(function (i) {
						let item = container.querySelectorAll(`div[data-key='${i}']`);
						if (item && item.length > 0) {
							item[0]?.classList.add("check");
						}
					});
				}
			}
		},
		delete: function (id, sender) {
			let checked = fn.check.get(id);
			let opt = fn.get(id);

			if (checked) {
				let checkedid = checked.map(function (i) {
					return i.key;
				});

				const fndeleterecursive = function (opt, keys, index, callback) {
					if (index < keys.length) {
						db.api.load(
							{
								name: opt.name,
								id: keys[index],
								sender: sender,
							},
							function (data) {
								if (data) {
									fn.file.delete(
										opt,
										data,
										function () {
											fndeleterecursive(opt, keys, index + 1, callback);
										},
										sender
									);
								} else {
									fndeleterecursive(opt, keys, index + 1, callback);
								}
							},
							sender
						);
					} else {
						callback();
					}
				};

				const fndelete = function (id, opt, checkedid, sender) {
					db.api.delete(
						{
							name: opt.name,
							id: checkedid,
							sender: sender,
						},
						function (data) {
							fn.reload(id, sender);
						},
						sender
					);
				};

				new dlg.confirmbox(
					"!!",
					`Are you sure delete ${fn.genname(checked.map((i) => i.name))} record?`,
					[
						{
							label: "Yes, delete",
							color: "danger",
							onclick: function () {
								if (opt.file && opt.file.length > 0) {
									fndeleterecursive(opt, checkedid, 0, function () {
										fndelete(id, opt, checkedid, sender);
									});
								} else {
									//no file, direct delete
									fndelete(id, opt, checkedid, sender);
								}
							},
						},
						{
							label: "Cancel",
						},
					],
					`Delete ${opt.name}`
				).show();
			} else {
				new dlg.msgbox("-", "No item selected.", function () {}, `Delete ${opt.name}`).show();
			}
		},
		mode: function (id, check) {
			if (typeof check === "undefined") {
				if (document.getElementById(id).classList.contains("check")) {
					check = false;
				} else {
					check = true;
				}
			}

			if (check) {
				document.getElementById(id).classList.add("check");
			} else {
				document.getElementById(id).classList.remove("check");
			}
		},
		all: function (id) {
			let container = document.getElementById(id);
			if (container.classList.contains("check")) {
				let checked = container.querySelectorAll(".check[data-key]");
				let items = container.querySelectorAll("[data-key]");
				if (items.length === checked.length) {
					items.forEach(function (item) {
						item.classList.remove("check");
					});
				} else {
					items.forEach(function (item) {
						item.classList.add("check");
					});
				}
			}
		},
		item: function (event) {
			event.stopPropagation();

			let sender = event.currentTarget.closest("[data-key]");
			if (sender.classList.contains("check")) {
				sender.classList.remove("check");
			} else {
				sender.classList.add("check");
			}
		},
	},
	file: {
		listoffile: function (fileprop, data) {
			//create list of id
			let result = [];

			if (fileprop && fileprop.length > 0) {
				fileprop.forEach((i) => {
					if (data[i]) {
						if (data[i].indexOf(",") > 0) {
							data[i]
								.toString()
								.split(",")
								.forEach((j) => {
									result.push(j);
								});
						} else {
							result.push(data[i]);
						}
					}
				});
			}

			return result && result.length > 0 ? result : null;
		},
		listoffileobject: function (fileprop, data) {
			//create list of id
			let result = [];

			if (fileprop && fileprop.length > 0) {
				fileprop.forEach((i) => {
					if (data[i]) {
						result.push({
							key: i,
							data: data[i],
						});
					}
				});
			}

			return result && result.length > 0 ? result : null;
		},
		save: function (opt, data, callback, sender) {
			if (opt && data) {
				if (opt.file && opt.file.length > 0) {
					let listoffile = fn.file.listoffile(opt.file, data);
					if (listoffile && listoffile.length > 0) {
						db.file.save(listoffile, callback, sender);
					} else {
						callback();
					}
				} else {
					callback();
				}
			}
		},
		delete: function (opt, data, callback, sender) {
			if (opt && data) {
				if (opt.file) {
					let listoffile = fn.file.listoffile(opt.file, data);
					if (listoffile && listoffile.length > 0) {
						db.file.delete(listoffile, callback, sender);
					} else {
						callback();
					}
				} else {
					callback();
				}
			}
		},
		duplicate: function (opt, data, callback, sender) {
			const fnduplicaterecursive = function (data, listoffile, index, callback, sender) {
				if (index < listoffile.length) {
					db.file.duplicate(
						listoffile[index].data,
						function (newfileid) {
							data[listoffile[index].key] = newfileid;
							fnduplicaterecursive(data, listoffile, index + 1, callback, sender);
						},
						sender
					);
				} else {
					callback(data);
				}
			};

			if (opt && data) {
				if (opt.file && opt.file.length > 0) {
					let listoffile = fn.file.listoffileobject(opt.file, data);
					if (listoffile && listoffile.length > 0) {
						fnduplicaterecursive(data, listoffile, 0, callback, sender);
					} else {
						callback(data);
					}
				} else {
					callback(data);
				}
			}
		},
		manage: function (opt, oldData, newData, callback, sender) {
			if (opt && oldData && newData) {
				if (opt.file && opt.file.length > 0) {
					let listoffile_old = fn.file.listoffile(opt.file, oldData);
					let listoffile_new = fn.file.listoffile(opt.file, newData);

					let listoffile_delete = [];
					let listoffile_save = [];

					if (listoffile_new && listoffile_new.length > 0) {
						listoffile_new.forEach((i) => {
							if (listoffile_old && listoffile_old.length > 0) {
								if (!listoffile_old.includes(i)) {
									listoffile_save.push(i);
								}
							} else {
								listoffile_save.push(i);
							}
						});
					}

					if (listoffile_old && listoffile_old.length > 0) {
						listoffile_old.forEach((i) => {
							if (listoffile_new && listoffile_new.length > 0) {
								if (!listoffile_new.includes(i)) {
									listoffile_delete.push(i);
								}
							} else {
								listoffile_delete.push(i);
							}
						});
					}

					if (listoffile_save && listoffile_save.length > 0) {
						db.file.save(
							listoffile_save,
							function () {
								if (listoffile_delete && listoffile_delete.length > 0) {
									db.file.delete(listoffile_delete, callback, sender);
								} else {
									callback();
								}
							},
							sender
						);
					} else {
						if (listoffile_delete && listoffile_delete.length > 0) {
							db.file.delete(listoffile_delete, callback, sender);
						} else {
							callback();
						}
					}
				} else {
					callback();
				}
			}
		},
	},
	item: {
		action: function (event) {
			event.stopPropagation();

			let sender = event.currentTarget.closest("[data-key]");
			if (sender) {
				let container = sender.closest(".cl-list");

				if (container.classList.contains("check")) {
					fn.check.item(event);
				} else {
					fn.item.edit(event, sender);
				}
			}
		},
		add: function (id, sender) {
			let opt = fn.get(id);
			if (opt) {
				new dlg.inputbox(
					opt.editor(null),
					null,
					[
						{
							label: "Save",
							onclick: function (_event, data) {
								db.api.create(
									{
										name: opt.name,
										data: data,
										sender: sender,
									},
									function (result) {
										if (result) {
											fn.file.save(
												opt,
												data,
												function () {
													fn.reload(id, sender);
												},
												sender
											);
										}
									},
									sender
								);
							},
						},
						{
							label: "Cancel",
						},
					],
					`Add ${opt.name}`
				).show();
			}
		},
		menu: function (event) {
			event.stopPropagation();
			event.currentTarget.closest(".cl-list-ctl").classList.add("show");
		},
		edit: function (event) {
			event.stopPropagation();
			event.currentTarget.querySelectorAll(".cl-list-ctl")[0].classList.remove("show");

			let sender = event.currentTarget.closest("[data-key]");
			let key = sender.getAttribute("data-key");
			let container = sender.closest(".cl-list");
			let id = container.getAttribute("id");
			let opt = fn.get(id);
			if (opt) {
				db.api.load(
					{
						name: opt.name,
						id: key,
						sender: sender,
					},
					function (oldData) {
						if (oldData) {
							new dlg.inputbox(
								opt.editor(oldData),
								null,
								[
									{
										label: "Save",
										onclick: function (_event, newData) {
											newData._id = key;
											db.api.update(
												{
													name: opt.name,
													id: key,
													data: newData,
													sender: sender,
												},
												function (result) {
													if (result) {
														fn.file.manage(
															opt,
															oldData,
															newData,
															function () {
																fn.reload(id, sender);
															},
															sender
														);
													}
												}
											);
										},
									},
									{
										label: "Cancel",
									},
								],
								`Edit ${opt.name}`
							).show();
						}
					},
					sender
				);
			}
		},
		copy: function (event) {
			event.stopPropagation();
			event.currentTarget.closest(".cl-list-ctl").classList.remove("show");

			let sender = event.currentTarget;
			let item = sender.closest("[data-key]");
			let key = item.getAttribute("data-key");
			let container = item.closest(".cl-list");
			let id = container.getAttribute("id");
			let opt = fn.get(id);
			if (opt) {
				db.api.load(
					{
						name: opt.name,
						id: key,
						sender: item,
					},
					function (data) {
						if (data) {
							//remove id
							delete data._id;

							//duplicate file
							fn.file.duplicate(
								opt,
								data,
								function (data) {
									new dlg.inputbox(
										opt.editor(data),
										null,
										[
											{
												label: "Save",
												onclick: function (_event, data) {
													db.api.create(
														{
															name: opt.name,
															data: data,
															sender: item,
														},
														function (result) {
															if (result) {
																fn.file.save(
																	opt,
																	data,
																	function () {
																		fn.reload(id, item);
																	},
																	item
																);
															}
														}
													);
												},
											},
											{
												label: "Cancel",
											},
										],
										`Copy ${opt.name}`
									).show();
								},
								item
							);
						}
					},
					sender
				);
			}
		},
		delete: function (event) {
			event.stopPropagation();
			event.currentTarget.closest(".cl-list-ctl").classList.remove("show");

			let sender = event.currentTarget;
			let item = sender.closest("[data-key]");
			let key = item.getAttribute("data-key");
			let name = item.getAttribute("data-name");
			let container = item.closest(".cl-list");
			let id = container.getAttribute("id");
			let opt = fn.get(id);
			if (opt) {
				const fndelete = function (opt, id, key, sender) {
					db.api.delete(
						{
							name: opt.name,
							id: key,
							sender: sender,
						},
						function (data) {
							fn.reload(id, sender);
						}
					);
				};

				new dlg.confirmbox(
					"!!",
					`Are you sure delete <b>${name ? name : "this"}</b> record?`,
					[
						{
							label: "Yes, delete",
							color: "danger",
							onclick: function () {
								//check if has picture
								if (opt.file && opt.file.length > 0) {
									//need to load data first
									//then delete file
									//then delete item
									db.api.load(
										{
											name: opt.name,
											id: key,
											sender: item,
										},
										function (data) {
											if (data) {
												fn.file.delete(
													opt,
													data,
													function () {
														fndelete(opt, id, key, item);
													},
													sender
												);
											} else {
												fndelete(opt, id, key, item);
											}
										},
										item
									);
								} else {
									//no file, direct delete
									fndelete(opt, id, key, item);
								}
							},
						},
						{
							label: "Cancel",
						},
					],
					`Delete ${opt.name}`
				).show();
			}
		},
		more: function (event) {
			event.stopPropagation();
			event.currentTarget.closest(".cl-list-ctl").classList.remove("show");

			let sender = event.currentTarget;
			let item = sender.closest("[data-key]");
			let key = item.getAttribute("data-key");
			let container = item.closest(".cl-list");
			let id = container.getAttribute("id");
			let opt = fn.get(id);
			if (opt && typeof opt.more === "function") {
				opt.more(item, key);
			}
		},
	},
};

const db_opt = {};

const defaultOption = {
	setting: null,
	query: null,
	name: null,
	paging: true,
	more: null, //more function
	items: function (data, item, group) {
		return data.map(function (i) {
			return item(i);
		});
	},
	item: function (data) {
		return new item({
			name: JSON.stringify(data)
				.replace(/\,/g, ",<br/>")
				.replace(/\:/g, ": ")
				.replace(/\{/g, "{<br/>")
				.replace(/\}/g, "<br/>}"),
		});
	},
	group: function (data) {
		return new group({
			name: JSON.stringify(data)
				.replace(/\,/g, ",<br/>")
				.replace(/\:/g, ": ")
				.replace(/\{/g, "{<br/>")
				.replace(/\}/g, "<br/>}"),
		});
	},
};

const defaultItemOption = {
	key: null,
	picture: null,
	name: null,
	detail: null,
	allow_action: false,
	allow_copy: false,
	allow_delete: false,
	allow_more: false,
};

const defaultGroupOption = {
	key: null,
	name: null,
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

			fn.set(opt.id, null, core.extend({}, opt));

			delete opt.setting;
			delete opt.query;
			delete opt.name;
			delete opt.paging;
			delete opt.items;

			super.data = opt;
		}
	}

	static get = fn.get;
	static set = fn.set;
	static reload = fn.reload;
	static query = fn.query;
	static excel = fn.excel;
	static check = fn.check;
	static item = fn.item;
}

export class item extends li {
	constructor(...opt) {
		super(...opt);
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		opt = core.extend({}, defaultItemOption, opt);

		opt.class = core.merge.class(
			opt.class,
			["list-group-item", opt.allow_action ? "pointer" : null].filter(Boolean)
		);

		super.data = {
			class: opt.class,
			attr: { "data-key": opt.key, "data-name": opt.name },
			display: "flex",
			justifycontent: "between",
			onclick: opt.allow_action ? fn.item.action : null,
			elem: [
				new div({
					display: "flex",
					justifycontent: "start",
					alignself: "center",
					elem: [
						new div({
							display: "flex",
							alignself: "center",
							justifycontent: "center",
							elem: [
								opt.picture
									? new div({
											class: "cl-list-img",
											marginend: 3,
											style: { width: "3rem" },
											elem: new img({
												class: "img-fluid",
												rounded: true,
												src: db.file.url(opt.picture),
											}),
									  })
									: null,
								new icon({
									class: "cl-list-check",
									marginend: 3,
									icon: "check",
									color: "secondary",
									weight: "2x",
								}),
							],
						}),
						new div({
							elem: [new h({ level: 6, elem: opt.name }), opt.detail ? new div(opt.detail) : null],
						}),
					],
				}),

				opt.allow_copy || opt.allow_delete || opt.allow_more
					? new div({
							class: "cl-list-ctl",
							display: "flex",
							alignself: "center",
							onclick: fn.item.menu,
							elem: new btngroup({
								elem: [
									opt.allow_more
										? new button({ icon: "cog", color: "primary", onclick: fn.item.more })
										: null,
									opt.allow_copy
										? new button({ icon: "copy", color: "success", onclick: fn.item.copy })
										: null,
									opt.allow_delete
										? new button({ icon: "trash", color: "danger", onclick: fn.item.delete })
										: null,
								].filter(Boolean),
							}),
					  })
					: null,
			],
		};
	}
}

export class group extends li {
	constructor(...opt) {
		super(...opt);
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		opt = core.extend({}, defaultGroupOption, opt);

		opt.class = core.merge.class(opt.class, ["list-group-item", "list-group-item-header"]);

		super.data = {
			class: opt.class,
			elem: new b(opt.name),
		};
	}
}
