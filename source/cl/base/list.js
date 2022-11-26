"use strict";
//disable this if you not using webpack
import css from "./css/animation.css";
import css2 from "./css/list.css";
//-------------------------------------

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
	genname: (names) => {
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
	set: (id, propertyName, value) => {
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
	get: (id, propertyName) => {
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
	reload: (id, sender, callback) => {
		let opt = fn.get(id);
		if (opt) {
			db.api.list(
				{
					name: opt.name,
					data: opt.query,
					sender: sender,
				},
				(result) => {
					let container = document.getElementById(id);
					core.removeChildElement(container);
					core.appendChild(container, opt.container(result.data, opt));

					if (opt.paging) {
						if (result.total > opt.query.limit) {
							core.appendChild(
								container,
								new paging({
									total: result.total,
									skip: opt.query.skip,
									limit: opt.query.limit,
									change: fn.pagechange,
									autoupdate: false,
									nextprev: false,
									"data-cl-container": id,
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
	pagechange: (event) => {
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
		all: (id, sender) => {
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
						(_event, data) => {
							opt.query = data;
							fn.set(id, null, opt);
							fn.reload(id, sender);
						},
					]
				).show();
			}
		},
		filter: (id, sender) => {
			let opt = fn.get(id);
			if (opt) {
				new query.filter(
					{
						field: opt.setting?.field,
						useopricon: opt.setting?.useopricon,
						data: opt.query?.filter,
					},
					[
						(_event, data) => {
							opt.query.filter = data;
							fn.set(id, null, opt);
							fn.reload(id, sender);
						},
					]
				).show();
			}
		},
		sort: (id, sender) => {
			let opt = fn.get(id);
			if (opt) {
				new query.sort(
					{
						field: opt.setting?.field,
						useopricon: opt.setting?.useopricon,
						data: opt.query?.sort,
					},
					[
						(_event, data) => {
							opt.query.sort = data;
							fn.set(id, null, opt);
							fn.reload(id, sender);
						},
					]
				).show();
			}
		},
		field: (id, sender) => {
			let opt = fn.get(id);
			if (opt) {
				new query.field(
					{
						field: opt.setting?.field,
						data: opt.query?.field,
					},
					[
						(_event, data) => {
							opt.query.field = data;
							fn.set(id, null, opt);
							fn.reload(id, sender);
						},
					]
				).show();
			}
		},
		limit: (id, sender) => {
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
						(_event, data) => {
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
		page: (id, sender) => {
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
						(_event, data) => {
							opt.query.skip = data;
							fn.set(id, null, opt);
							fn.reload(id, sender);
						},
					]
				).show();
			}
		},
	},
	excel: (id, sender) => {
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
		get: (id) => {
			let container = document.getElementById(id);
			if (container.classList.contains("check")) {
				let checked = container.querySelectorAll(".check[data-key]");
				if (checked && checked.length > 0) {
					return Array.from(checked).map((i) => {
						return {
							key: i.getAttribute("data-key"),
							name: i.getAttribute("data-name"),
						};
					});
				}
			}

			return null;
		},
		set: (id, data) => {
			if (data && data.length > 0) {
				data = Array.isArray(data) ? data : [data];

				let container = document.getElementById(id);
				if (container.classList.contains("check")) {
					//remove checked
					let checked = container.querySelectorAll(".check[data-key]");
					if (checked && checked.length > 0) {
						Array.from(checked).forEach((i) => {
							i.classList.remove("check");
						});
					}

					//check data
					data.forEach((i) => {
						let item = container.querySelectorAll(`div[data-key='${i}']`);
						if (item && item.length > 0) {
							item[0]?.classList.add("check");
						}
					});
				}
			}
		},
		delete: (id, sender) => {
			let opt = fn.get(id);

			if (opt) {
				let checked = fn.check.get(id);

				if (checked) {
					let checkedid = checked.map((i) => {
						return i.key;
					});

					if (typeof opt.check_delete === "function") {
						opt.check_delete(checkedid, sender);
					} else {
						const fndeleterecursive = (opt, keys, index, callback) => {
							if (index < keys.length) {
								db.api.load(
									{
										name: opt.name,
										id: keys[index],
										sender: sender,
									},
									(data) => {
										if (data) {
											fn.file.delete(
												opt,
												data,
												() => {
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

						const fndelete = (id, opt, checkedid, sender) => {
							db.api.delete(
								{
									name: opt.name,
									id: checkedid,
									sender: sender,
								},
								(data) => {
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
									click: () => {
										if (opt.file && opt.file.length > 0) {
											fndeleterecursive(opt, checkedid, 0, () => {
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
					}
				} else {
					new dlg.msgbox("-", "No item selected.", () => {}, `Delete ${opt.name}`).show();
				}
			}
		},
		mode: (id, check) => {
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
		all: (id) => {
			let container = document.getElementById(id);
			if (container.classList.contains("check")) {
				let checked = container.querySelectorAll(".check[data-key]");
				let aitem = container.querySelectorAll("[data-key]");
				if (aitem.length === checked.length) {
					aitem.forEach((item) => {
						item.classList.remove("check");
					});
				} else {
					aitem.forEach((item) => {
						item.classList.add("check");
					});
				}
			}
		},
		item: (event) => {
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
		listoffile: (fileprop, data) => {
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
		listoffileobject: (fileprop, data) => {
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
		save: (opt, data, callback, sender) => {
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
		delete: (opt, data, callback, sender) => {
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
		duplicate: (opt, data, callback, sender) => {
			const fnduplicaterecursive = (data, listoffile, index, callback, sender) => {
				if (index < listoffile.length) {
					db.file.duplicate(
						listoffile[index].data,
						(newfileid) => {
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
		manage: (opt, oldData, newData, callback, sender) => {
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
							() => {
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
		action: (event) => {
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
		add: (id, sender) => {
			let opt = fn.get(id);
			if (opt) {
				if (typeof opt.item_add === "function") {
					opt.item_add(sender);
				} else {
					new dlg.inputbox(
						opt.editor(null),
						null,
						[
							{
								label: "Save",
								click: (_event, data) => {
									db.api.create(
										{
											name: opt.name,
											data: data,
											sender: sender,
										},
										(result) => {
											if (result) {
												fn.file.save(
													opt,
													data,
													() => {
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
						`Add ${opt.name}`,
						"lg"
					).show();
				}
			}
		},
		menu: (event) => {
			event.stopPropagation();
			event.currentTarget.closest(".cl-list-ctl").classList.add("show");

			let sender = event.currentTarget.closest("[data-key]");
			let key = sender.getAttribute("data-key");
			let container = sender.closest(".cl-list");
			let id = container.getAttribute("id");
			let opt = fn.get(id);
			if (opt && typeof opt.item_menu === "function") {
				opt.item_menu(sender, key);
			}
		},
		edit: (event) => {
			event.stopPropagation();
			event.currentTarget.querySelectorAll(".cl-list-ctl")[0].classList.remove("show");

			let sender = event.currentTarget.closest("[data-key]");
			let key = sender.getAttribute("data-key");
			let container = sender.closest(".cl-list");
			let id = container.getAttribute("id");
			let opt = fn.get(id);
			if (opt) {
				if (typeof opt.item_edit === "function") {
					opt.item_edit(sender, key);
				} else {
					db.api.load(
						{
							name: opt.name,
							id: key,
							sender: sender,
						},
						(oldData) => {
							if (oldData) {
								new dlg.inputbox(
									opt.editor(oldData),
									null,
									[
										{
											label: "Save",
											click: (_event, newData) => {
												newData._id = key;
												db.api.update(
													{
														name: opt.name,
														id: key,
														data: newData,
														sender: sender,
													},
													(result) => {
														if (result) {
															fn.file.manage(
																opt,
																oldData,
																newData,
																() => {
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
									`Edit ${opt.name}`,
									"lg"
								).show();
							}
						},
						sender
					);
				}
			}
		},
		copy: (event) => {
			event.stopPropagation();
			event.currentTarget.closest(".cl-list-ctl").classList.remove("show");

			let sender = event.currentTarget;
			let item = sender.closest("[data-key]");
			let key = item.getAttribute("data-key");
			let container = item.closest(".cl-list");
			let id = container.getAttribute("id");
			let opt = fn.get(id);
			if (opt) {
				if (typeof opt.item_copy === "function") {
					opt.item_copy(item, key);
				} else {
					db.api.load(
						{
							name: opt.name,
							id: key,
							sender: item,
						},
						(data) => {
							if (data) {
								//remove id
								delete data._id;

								//duplicate file
								fn.file.duplicate(
									opt,
									data,
									(data) => {
										new dlg.inputbox(
											opt.editor(data),
											null,
											[
												{
													label: "Save",
													click: (_event, data) => {
														db.api.create(
															{
																name: opt.name,
																data: data,
																sender: item,
															},
															(result) => {
																if (result) {
																	fn.file.save(
																		opt,
																		data,
																		() => {
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
											`Copy ${opt.name}`,
											"lg"
										).show();
									},
									item
								);
							}
						},
						sender
					);
				}
			}
		},
		delete: (event) => {
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
				if (typeof opt.item_delete === "function") {
					opt.item_delete(item, key);
				} else {
					const fndelete = (opt, id, key, sender) => {
						db.api.delete(
							{
								name: opt.name,
								id: key,
								sender: sender,
							},
							(data) => {
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
								click: () => {
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
											(data) => {
												if (data) {
													fn.file.delete(
														opt,
														data,
														() => {
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
			}
		},
		more: (event) => {
			event.stopPropagation();
			event.currentTarget.closest(".cl-list-ctl").classList.remove("show");

			let sender = event.currentTarget;
			let item = sender.closest("[data-key]");
			let key = item.getAttribute("data-key");
			let container = item.closest(".cl-list");
			let id = container.getAttribute("id");
			let opt = fn.get(id);
			if (opt && typeof opt.item_more === "function") {
				opt.item_more(item, key);
			}
		},
	},
};

const db_opt = {};

const defaultOption = {
	view: "list",
	setting: null,
	query: null,
	name: null,
	paging: true,

	item_add: null,
	item_menu: null,
	item_edit: null,
	item_copy: null,
	item_delete: null,
	item_more: null,
	check_delete: null,

	allow_action: false,
	allow_copy: false,
	allow_delete: false,
	allow_more: false,

	container: (data, opt) => {
		return new ul({ class: "list-group", elem: opt.row(data, opt) });
	},
	row: (data, opt) => {
		return data.map((i) => {
			return opt.item(i, opt);
		});
	},
	item: (data, opt) => {
		return new item({
			name: JSON.stringify(data)
				.replace(/\,/g, ",<br/>")
				.replace(/\:/g, ": ")
				.replace(/\{/g, "{<br/>")
				.replace(/\}/g, "<br/>}"),
		});
	},
	group: (data, opt) => {
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
	view: "list",
	key: null,
	picture: null,
	name: null,
	detail: null,
	allow_action: undefined,
	allow_copy: undefined,
	allow_delete: undefined,
	allow_more: undefined,
};

const defaultGroupOption = { view: "list", key: null, name: null };

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

			opt = core.merge(opt, {
				id: opt.id || core.UUID(),
				class: "cl-list",
			});

			fn.set(opt.id, null, core.extend({}, opt));

			delete opt.setting;
			delete opt.query;
			delete opt.name;
			delete opt.paging;

			delete opt.container;
			delete opt.row;
			delete opt.item;
			delete opt.group;

			delete opt.item_add;
			delete opt.item_copy;
			delete opt.item_delete;
			delete opt.item_edit;
			delete opt.item_menu;
			delete opt.item_more;
			delete opt.check_delete;

			delete opt.allow_action;
			delete opt.allow_copy;
			delete opt.allow_delete;
			delete opt.allow_more;

			delete opt.view;

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

		opt = core.merge(opt, {
			class: ["list-group-item", opt.allow_action ? "pointer" : null],
			"data-key": opt.key,
			"data-name": opt.name,
			display: "flex",
			justifyContent: "between",
			click: opt.allow_action ? fn.item.action : null,
			elem: [
				new div({
					display: "flex",
					justifyContent: "start",
					alignSelf: "center",
					elem: [
						new div({
							display: "flex",
							alignSelf: "center",
							justifyContent: "center",
							elem: [
								opt.picture
									? new div({
											class: "cl-list-img",
											marginEnd: 3,
											width: "3rem",
											elem: new img({
												fluid: true,
												rounded: true,
												src: db.file.url(opt.picture),
											}),
									  })
									: null,
								new icon({
									class: "cl-list-check",
									marginEnd: 3,
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
							alignSelf: "center",
							click: fn.item.menu,
							elem: new btngroup({
								elem: [
									opt.allow_more
										? new button({ icon: "cog", color: "primary", click: fn.item.more })
										: null,
									opt.allow_copy
										? new button({ icon: "copy", color: "success", click: fn.item.copy })
										: null,
									opt.allow_delete
										? new button({ icon: "trash", color: "danger", click: fn.item.delete })
										: null,
								].filter(Boolean),
							}),
					  })
					: null,
			],
		});

		super.data = opt;
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

		opt = core.merge(opt, {
			class: ["list-group-item", "list-group-item-header"],
			elem: new b(opt.name),
		});

		delete opt.name;

		super.data = opt;
	}
}
