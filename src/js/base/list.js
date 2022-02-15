"use strict";
import "../../css/list.css";

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
import icon from "./icon.js";
import h from "./h.js";
import b from "./b";

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
	check: {
		get: function (id) {
			let container = document.getElementById(id);
			if (container.classList.contains("check")) {
				let checked = container.querySelectorAll("div.check[data-key]");
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
		delete: function (id) {
			let checked = fn.check.get(id);
			if (checked) {
				let opt = fn.get(id);

				new dlg.confirmbox(
					"!!",
					`Are you sure delete ${fn.genname(checked.map((i) => i.name))} record?`,
					[
						{
							label: "Yes, delete",
							color: "danger",
							onclick: function () {
								db.api.delete(
									{
										name: opt.name,
										id: checked.map(function (i) {
											return i.key;
										}),
									},
									function (data) {
										fn.reload(id);
									}
								);
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
				let checked = container.querySelectorAll("div.check[data-key]");
				let items = container.querySelectorAll("div[data-key]");
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

			let sender = event.currentTarget.closest("div[data-key]");
			if (sender.classList.contains("check")) {
				sender.classList.remove("check");
			} else {
				sender.classList.add("check");
			}
		},
	},
	item: {
		action: function (event) {
			event.stopPropagation();

			let sender = event.currentTarget.closest("div[data-key]");
			if (sender) {
				let container = sender.closest(".cl-list");

				if (container.classList.contains("check")) {
					fn.check.item(event);
				} else {
					fn.item.edit(event);
				}
			}
		},
		add: function (id) {
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
									},
									function (data) {
										fn.reload(id);
									}
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
		edit: function (event) {
			event.stopPropagation();

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
						if (data) {
							new dlg.inputbox(
								opt.editor(data),
								null,
								[
									{
										label: "Save",
										onclick: function (_event, data) {
											data._id = key;
											db.api.update(
												{
													name: opt.name,
													id: key,
													data: data,
												},
												function (data) {
													fn.reload(id);
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
					}
				);
			}
		},
		copy: function (event) {
			event.stopPropagation();

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
						if (data) {
							delete data._id;
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
												},
												function (data) {
													fn.reload(id);
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
						}
					}
				);
			}
		},
		delete: function (event) {
			event.stopPropagation();

			let sender = event.currentTarget.closest("div[data-key]");
			let key = sender.getAttribute("data-key");
			let name = sender.getAttribute("data-name");
			let container = sender.closest(".cl-list");
			let id = container.getAttribute("id");
			let opt = fn.get(id);
			if (opt) {
				new dlg.confirmbox(
					"!!",
					`Are you sure delete <b>${name ? name : "this"}</b> record?`,
					[
						{
							label: "Yes, delete",
							color: "danger",
							onclick: function () {
								db.api.delete(
									{
										name: opt.name,
										id: key,
									},
									function (data) {
										fn.reload(id);
									}
								);
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
			name: JSON.stringify(data)
				.replace(/\,/g, ", ")
				.replace(/\:/g, " : ")
				.replace(/\{/g, "{ ")
				.replace(/\}/g, " }"),
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
	static check = fn.check;
	static item = fn.item;
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
											elem: new img({ class: "img-fluid", src: db.file.url(opt.picture) }),
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

				opt.allow_copy || opt.allow_delete
					? new div({
							class: "cl-list-ctl",
							display: "flex",
							alignself: "center",
							elem: new btngroup({
								elem: [
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

export class group extends div {
	constructor(...opt) {
		super(...opt);
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		opt = core.extend({}, defaultGroupOption, opt);

		super.data = {
			elem: new b(opt.name),
		};
	}
}
