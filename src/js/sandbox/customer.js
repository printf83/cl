"use strict";
import * as db from "../base/api.js";
import file from "../base/file.js";
import input from "../base/input.js";
import * as list from "../base/list.js";
import small from "../base/small.js";
import toast from "../base/toast.js";
import ul from "../base/ul.js";

let query_data = {
	filter: null,
	sort: {
		state: 1,
		name: 1,
	},
	field: {
		__v: 0,
	},
	limit: 10,
	skip: 0,
};

let dbstate = null;
const loadState = (callback, sender) => {
	if (!dbstate) {
		console.log("Init state database");
		//get record
		db.api.option(
			{
				name: "state",
				fieldkey: "_id",
				fieldname: "name",
				sender: sender,
			},
			(result) => {
				if (result) {
					dbstate = result;
					callback(dbstate);
				}
			}
		);
	} else {
		callback(dbstate);
	}
};
const query_setting = (dbstate) => {
	return {
		field: [
			{
				value: "name",
				label: "Name",
				type: "text",
			},
			{
				value: "dob",
				label: "Date Of Birth",
				type: "date",
			},
			{
				value: "phone",
				label: "Phone",
				type: "tel",
			},
			{
				value: "picture",
				label: "Picture",
				type: "check",
			},
			{
				value: "email",
				label: "Email",
				type: "email",
			},
			{
				value: "state",
				label: "State",
				type: "select",
				option: dbstate,
				placeholder: "Please Choose One",
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
		new input({
			type: "date",
			label: "Date of birth",
			name: "dob",
			value: data ? data.dob : null,
		}),
		new input({
			type: "text",
			label: "Phone",
			name: "phone",
			value: data ? data.phone : null,
		}),
		new file({
			label: "Picture",
			name: "picture",
			value: data ? data.picture : null,
		}),
		new input({
			type: "email",
			label: "Email",
			name: "email",
			value: data ? data.email : null,
		}),
		new input({
			type: "select",
			label: "State",
			name: "state",
			required: true,
			option: dbstate,
			value: data ? data.state : null,
		}),
	];
};
const container = (data, opt) => {
	return new ul({ class: "list-group", elem: opt.row(data, opt) });
};

const row = (data, opt) => {
	let lastgroup = null;
	let result = [];
	data.forEach((i) => {
		if (dbstate) {
			if (i.state && lastgroup !== i.state) {
				lastgroup = i.state;
				let state_name = dbstate.filter((el) => {
					return el.value === i.state;
				})[0]?.label;

				result.push(
					opt.group(
						{
							key: i.state,
							name: state_name,
						},
						opt
					)
				);
			}
		}

		result.push(opt.item(i, opt));
	});

	return result;
};
const item = (data, opt) => {
	return new list.item({
		view: opt.view,
		key: data._id,
		name: data.name,
		picture: data.picture,
		detail: new small([data.phone, data.dob, data.email].filter(Boolean).join(" | ")),
		allow_delete: opt.allow_delete,
		allow_copy: opt.allow_copy,
		allow_action: opt.allow_action,
		allow_more: opt.allow_more,
	});
};
const group = (data, opt) => {
	return new list.group({ view: opt.view, key: data.key, name: data.name });
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
	name: "Customer",
	load: () => {
		list.container.reload("customer_list");

		menuController("menu_add", true);
		menuController("menu_check_on", true);

		menuController("menu_check_off", false);
		menuController("menu_check_all", false);
		menuController("menu_check_delete", false);
	},
	main: (callback) => {
		loadState((dbstate) => {
			callback(
				new list.container({
					name: "customer",
					file: ["picture"],
					id: "customer_list",
					setting: query_setting(dbstate),
					query: query_data,
					editor: editor,
					container: container,
					row: row,
					item: item,
					group: group,
					list_more: more,
					allow_action: true,
					allow_copy: true,
					allow_delete: true,
					allow_more: true,
				})
			);
		});
	},
	menu: [
		{
			id: "menu_add",
			icon: "plus",
			label: "Add New",
			onclick: (event) => {
				list.container.item.add("customer_list", event.currentTarget);
			},
		},
		{
			id: "menu_check_on",
			icon: "list-check",
			label: "Check Mode",
			onclick: (event) => {
				list.container.check.mode("customer_list");

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
			onclick: (event) => {
				list.container.check.mode("customer_list");

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
			onclick: (event) => {
				list.container.check.all("customer_list");
			},
		},
		{
			id: "menu_check_delete",
			icon: "trash-can",
			label: "Delete Checked",
			onclick: (event) => {
				list.container.check.delete("customer_list", event.currentTarget);
			},
		},
		{
			id: "menu_filter",
			icon: "filter",
			label: "Filter",
			onclick: (event) => {
				list.container.query.filter("customer_list", event.currentTarget);
			},
		},
		{
			id: "menu_sort",
			icon: "sort",
			label: "Sort",
			onclick: (event) => {
				list.container.query.sort("customer_list", event.currentTarget);
			},
		},
		{
			id: "menu_field",
			icon: "tasks",
			label: "Field",
			onclick: (event) => {
				list.container.query.field("customer_list", event.currentTarget);
			},
		},
		{
			id: "menu_limit",
			icon: "list-ol",
			label: "Limit",
			onclick: (event) => {
				list.container.query.limit("customer_list", event.currentTarget);
			},
		},
		{
			label: "Page",
			icon: {
				icon: "sort",
				rotate: 90,
			},
			id: "menu_page",
			onclick: (event) => {
				list.container.query.page("customer_list", event.currentTarget);
			},
		},
	],
};
