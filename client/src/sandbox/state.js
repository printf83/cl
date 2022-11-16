"use strict";
import input from "../cl/base/input.js";
import * as list from "../cl/base/list.js";
import toast from "../cl/base/toast.js";
import ul from "../cl/base/ul.js";

let query_data = {
	filter: null,
	sort: {
		name: 1,
	},
	field: {
		__v: 0,
	},
	limit: 10,
	skip: 0,
};

const query_setting = () => {
	return {
		field: [
			{
				value: "name",
				label: "Name",
				type: "text",
			},
		],
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
		useopricon: false,
	};
};
const editor = (data) => {
	return [
		new input({
			type: "text",
			label: "Name",
			name: "name",
			required: true,
			value: data ? data.name : null,
		}),
	];
};

const container = (data, opt) => {
	return new ul({ class: "list-group", elem: opt.row(data, opt) });
};

const row = (data, opt) => {
	let result = [];
	data.forEach((i) => {
		result.push(opt.item(i, opt));
	});
	return result;
};
const item = (data, opt) => {
	return new list.item({
		view: opt.view,
		key: data._id,
		name: data.name,
		allow_delete: opt.allow_delete,
		allow_copy: opt.allow_copy,
		allow_action: opt.allow_action,
		allow_more: opt.allow_more,
	});
};
const more = (sender, id) => {
	new toast("i", `Call from id:${id}`).show();
};

const menuController = (id, show) => {
	let mnu = document.getElementById(id);
	if (show) {
		mnu.parentElement.classList.remove("d-none");
	} else {
		mnu.parentElement.classList.add("d-none");
	}
};

export default {
	name: "State",
	load: () => {
		list.container.reload("state_list");

		menuController("menu_add", true);
		menuController("menu_check_on", true);

		menuController("menu_check_off", false);
		menuController("menu_check_all", false);
		menuController("menu_check_delete", false);
	},
	main: (callback) => {
		callback(
			new list.container({
				name: "state",
				id: "state_list",
				setting: query_setting(),
				query: query_data,
				editor: editor,
				container: container,
				row: row,
				item: item,
				list_more: more,
				allow_action: true,
				allow_copy: true,
				allow_delete: true,
				allow_more: true,
			})
		);
	},
	menu: [
		{
			id: "menu_add",
			icon: "plus",
			label: "Add New",
			click: (event) => {
				list.container.item.add("state_list", event.currentTarget);
			},
		},
		{
			id: "menu_check_on",
			icon: "list-check",
			label: "Check Mode",
			click: (event) => {
				list.container.check.mode("state_list");

				menuController("menu_add", false);
				menuController("menu_check_on", false);

				menuController("menu_check_off", true);
				menuController("menu_check_all", true);
				menuController("menu_check_delete", true);
			},
		},
		{
			id: "menu_check_off",
			icon: "arrow-left",
			label: "Back",
			click: (event) => {
				list.container.check.mode("state_list");

				menuController("menu_add", true);
				menuController("menu_check_on", true);

				menuController("menu_check_off", false);
				menuController("menu_check_all", false);
				menuController("menu_check_delete", false);
			},
		},
		{
			id: "menu_check_all",
			icon: "check-double",
			label: "Check All",
			click: (event) => {
				list.container.check.all("state_list");
			},
		},
		{
			id: "menu_check_delete",
			icon: "trash-can",
			label: "Delete Checked",
			click: (event) => {
				list.container.check.delete("state_list", event.currentTarget);
			},
		},
		{
			id: "menu_filter",
			icon: "filter",
			label: "Filter",
			click: (event) => {
				list.container.query.filter("state_list", event.currentTarget);
			},
		},
		{
			id: "menu_sort",
			icon: "sort",
			label: "Sort",
			click: (event) => {
				list.container.query.sort("state_list", event.currentTarget);
			},
		},
		{
			id: "menu_field",
			icon: "tasks",
			label: "Field",
			click: (event) => {
				list.container.query.field("state_list", event.currentTarget);
			},
		},
		{
			id: "menu_limit",
			icon: "list-ol",
			label: "Limit",
			click: (event) => {
				list.container.query.limit("state_list", event.currentTarget);
			},
		},
		{
			label: "Page",
			icon: {
				icon: "sort",
				rotate: 90,
			},
			id: "menu_page",
			click: (event) => {
				list.container.query.page("state_list", event.currentTarget);
			},
		},
	],
};
