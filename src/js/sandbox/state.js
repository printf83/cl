"use strict";
import $ from "../component.js";

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

const query_setting = function () {
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
const editor = function (data) {
	return [
		new $.input({
			type: "text",
			label: "Name",
			name: "name",
			required: true,
			value: data ? data.name : null,
		}),
	];
};
const items = function (data, item) {
	let result = [];
	data.forEach(function (i) {
		result.push(item(i));
	});
	return result;
};
const item = function (data) {
	return new $.list.item({
		key: data._id,
		name: data.name,
		allow_delete: true,
		allow_copy: true,
		allow_action: true,
		allow_more: true,
	});
};
const more = function (sender, id) {
	new $.toast("i", `Call from id:${id}`).show();
};

const menuController = function (id, show) {
	let mnu = document.getElementById(id);
	if (show) {
		mnu.parentElement.classList.remove("d-none");
	} else {
		mnu.parentElement.classList.add("d-none");
	}
};

export default {
	name: "State",
	load: function () {
		$.list.container.reload("state_list");

		menuController("menu_add", true);
		menuController("menu_check_on", true);

		menuController("menu_check_off", false);
		menuController("menu_check_all", false);
		menuController("menu_check_delete", false);
	},
	main: function (callback) {
		callback(
			new $.list.container({
				id: "state_list",
				setting: query_setting(),
				query: query_data,
				editor: editor,
				name: "state",
				items: items,
				item: item,
				more: more,
			})
		);
	},
	menu: [
		{
			id: "menu_add",
			icon: "plus",
			label: "Add New Record",
			onclick: function (event) {
				$.list.container.item.add("state_list", event.currentTarget);
			},
		},
		{
			id: "menu_check_on",
			icon: "list-check",
			label: "Check Mode",
			onclick: function (event) {
				$.list.container.check.mode("state_list");

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
			onclick: function (event) {
				$.list.container.check.mode("state_list");

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
			onclick: function (event) {
				$.list.container.check.all("state_list");
			},
		},
		{
			id: "menu_check_delete",
			icon: "trash-can",
			label: "Delete Checked",
			onclick: function (event) {
				$.list.container.check.delete("state_list", event.currentTarget);
			},
		},
		{
			id: "menu_filter",
			icon: "filter",
			label: "Filter",
			onclick: function (event) {
				$.list.container.query.filter("state_list", event.currentTarget);
			},
		},
		{
			id: "menu_sort",
			icon: "sort",
			label: "Sort",
			onclick: function (event) {
				$.list.container.query.sort("state_list", event.currentTarget);
			},
		},
		{
			id: "menu_field",
			icon: "tasks",
			label: "Field",
			onclick: function (event) {
				$.list.container.query.field("state_list", event.currentTarget);
			},
		},
		{
			id: "menu_limit",
			icon: "list-ol",
			label: "Limit",
			onclick: function (event) {
				$.list.container.query.limit("state_list", event.currentTarget);
			},
		},
		{
			label: "Page",
			icon: {
				icon: "sort",
				rotate: 90,
			},
			id: "menu_page",
			onclick: function (event) {
				$.list.container.query.page("state_list", event.currentTarget);
			},
		},
	],
};
