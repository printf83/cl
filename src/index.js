"use strict";

//disable this if you not using webpack
import css from "./css/anchor.css";
import css2 from "./css/example.css";
import css3 from "./css/sample.css";
//-------------------------------------
import a from "./cl/base/a.js";
import * as core from "./cl/base/core.js";
import div from "./cl/base/div.js";
import example from "./cl/base/example.js";
import * as layout from "./cl/base/layout.js";
import menu from "./cl/base/menu.js";
import msg from "./cl/base/msg.js";
import * as navbar from "./cl/base/navbar.js";
import pill from "./cl/base/pill.js";
import small from "./cl/base/small.js";
import * as table from "./cl/base/table.js";
import tag from "./cl/base/tag.js";
import toc from "./cl/base/toc.js";
import * as dlg from "./cl/base/dlg.js";
import span from "./cl/base/span.js";
import p from "./cl/base/p.js";
import h from "./cl/base/h.js";

let def_main_menu = "Getting started";
let def_sub_menu = "Introduction";
let DEBUG = 0;

// const doc = {
// 	intro: import("./doc/intro.js"),
// 	bootswatch: import("./doc/bootswatch.js"),

// 	bootswatch_badge: import("./doc/bootswatch_badge.js"),
// 	bootswatch_popover: import("./doc/bootswatch_popover.js"),
// 	bootswatch_tooltip: import("./doc/bootswatch_tooltip.js"),

// 	container: import("./doc/container.js"),
// 	grid: import("./doc/grid.js"),
// 	column: import("./doc/column.js"),
// 	gutter: import("./doc/gutter.js"),

// 	formcontrol: import("./doc/formcontrol.js"),
// 	select: import("./doc/select.js"),
// 	checkradio: import("./doc/checkradio.js"),
// 	range: import("./doc/range.js"),
// 	inputgroup: import("./doc/inputgroup.js"),
// 	floatinglabel: import("./doc/floatinglabel.js"),

// 	button: import("./doc/button.js"),
// 	accordion: import("./doc/accordion.js"),
// 	alert: import("./doc/alert.js"),
// 	badge: import("./doc/badge.js"),
// 	breadcrumb: import("./doc/breadcrumb.js"),
// 	btngroup: import("./doc/btngroup.js"),
// 	card: import("./doc/card.js"),
// 	carousel: import("./doc/carousel.js"),
// 	btnclose: import("./doc/btnclose.js"),
// 	collapse: import("./doc/collapse.js"),
// 	dropdown: import("./doc/dropdown.js"),
// 	listgroup: import("./doc/listgroup.js"),
// 	modal: import("./doc/modal.js"),
// 	tab: import("./doc/tab.js"),
// 	navbar: import("./doc/navbar.js"),
// 	offcanvas: import("./doc/offcanvas.js"),
// 	paging: import("./doc/paging.js"),
// 	placeholder: import("./doc/placeholder.js"),
// 	popover: import("./doc/popover.js"),
// 	progress: import("./doc/progress.js"),
// 	toast: import("./doc/toast.js"),
// 	tooltip: import("./doc/tooltip.js"),

// 	icon: import("./doc/icon.js"),
// 	menu: import("./doc/menu.js"),
// 	toc: import("./doc/toc.js"),
// 	pill: import("./doc/pill.js"),
// 	example: import("./doc/example.js"),
// 	label: import("./doc/label.js"),
// 	msg: import("./doc/msg.js"),
// 	table: import("./doc/table.js"),
// 	layout: import("./doc/layout.js"),

// 	tag_base: import("./doc/tag.base.js"),
// 	tag_text: import("./doc/tag.text.js"),
// 	tag_background: import("./doc/tag.background.js"),
// 	tag_border: import("./doc/tag.border.js"),
// 	tag_color: import("./doc/tag.color.js"),
// 	tag_display: import("./doc/tag.display.js"),
// 	tag_flex: import("./doc/tag.flex.js"),
// 	tag_float: import("./doc/tag.float.js"),
// 	tag_interaction: import("./doc/tag.interaction.js"),
// 	tag_overflow: import("./doc/tag.overflow.js"),
// 	tag_position: import("./doc/tag.position.js"),
// 	tag_shadow: import("./doc/tag.shadow.js"),
// 	tag_size: import("./doc/tag.size.js"),
// 	tag_spacing: import("./doc/tag.spacing.js"),
// 	tag_valign: import("./doc/tag.valign.js"),
// 	tag_visibility: import("./doc/tag.visibility.js"),

// 	tag_ex_a: import("./doc/tag.ex.a.js"),
// 	tag_ex_abbr: import("./doc/tag.ex.abbr.js"),
// 	tag_ex_b: import("./doc/tag.ex.b.js"),
// 	tag_ex_blockquote: import("./doc/tag.ex.blockquote.js"),
// 	tag_ex_cite: import("./doc/tag.ex.cite.js"),
// 	tag_ex_code: import("./doc/tag.ex.code.js"),
// 	tag_ex_div: import("./doc/tag.ex.div.js"),
// 	tag_ex_em: import("./doc/tag.ex.em.js"),
// 	tag_ex_form: import("./doc/tag.ex.form.js"),
// 	tag_ex_footer: import("./doc/tag.ex.footer.js"),
// 	tag_ex_h: import("./doc/tag.ex.h.js"),
// 	tag_ex_hr: import("./doc/tag.ex.hr.js"),
// 	tag_ex_i: import("./doc/tag.ex.i.js"),
// 	tag_ex_img: import("./doc/tag.ex.img.js"),
// 	tag_ex_li: import("./doc/tag.ex.li.js"),
// 	tag_ex_nav: import("./doc/tag.ex.nav.js"),
// 	tag_ex_ol: import("./doc/tag.ex.ol.js"),
// 	tag_ex_p: import("./doc/tag.ex.p.js"),
// 	tag_ex_pre: import("./doc/tag.ex.pre.js"),
// 	tag_ex_small: import("./doc/tag.ex.small.js"),
// 	tag_ex_span: import("./doc/tag.ex.span.js"),
// 	tag_ex_strong: import("./doc/tag.ex.strong.js"),
// 	tag_ex_ul: import("./doc/tag.ex.ul.js"),

// 	generic: import("./doc/generic.js"),
// 	file: import("./doc/file.js"),
// 	query: import("./doc/query.js"),
// 	list: import("./doc/list.js"),
// 	user: import("./doc/user.js"),
// };

function pageSource(source) {
	switch (source) {
		case "intro":
			return import("./doc/intro.js");
		case "bootswatch":
			return import("./doc/bootswatch.js");

		case "bootswatch_badge":
			return import("./doc/bootswatch_badge.js");
		case "bootswatch_popover":
			return import("./doc/bootswatch_popover.js");
		case "bootswatch_tooltip":
			return import("./doc/bootswatch_tooltip.js");

		case "container":
			return import("./doc/container.js");
		case "grid":
			return import("./doc/grid.js");
		case "column":
			return import("./doc/column.js");
		case "gutter":
			return import("./doc/gutter.js");

		case "formcontrol":
			return import("./doc/formcontrol.js");
		case "select":
			return import("./doc/select.js");
		case "checkradio":
			return import("./doc/checkradio.js");
		case "range":
			return import("./doc/range.js");
		case "inputgroup":
			return import("./doc/inputgroup.js");
		case "floatinglabel":
			return import("./doc/floatinglabel.js");

		case "button":
			return import("./doc/button.js");
		case "accordion":
			return import("./doc/accordion.js");
		case "alert":
			return import("./doc/alert.js");
		case "badge":
			return import("./doc/badge.js");
		case "breadcrumb":
			return import("./doc/breadcrumb.js");
		case "btngroup":
			return import("./doc/btngroup.js");
		case "card":
			return import("./doc/card.js");
		case "carousel":
			return import("./doc/carousel.js");
		case "btnclose":
			return import("./doc/btnclose.js");
		case "collapse":
			return import("./doc/collapse.js");
		case "dropdown":
			return import("./doc/dropdown.js");
		case "listgroup":
			return import("./doc/listgroup.js");
		case "modal":
			return import("./doc/modal.js");
		case "tab":
			return import("./doc/tab.js");
		case "navbar":
			return import("./doc/navbar.js");
		case "offcanvas":
			return import("./doc/offcanvas.js");
		case "paging":
			return import("./doc/paging.js");
		case "placeholder":
			return import("./doc/placeholder.js");
		case "popover":
			return import("./doc/popover.js");
		case "progress":
			return import("./doc/progress.js");
		case "toast":
			return import("./doc/toast.js");
		case "tooltip":
			return import("./doc/tooltip.js");

		case "icon":
			return import("./doc/icon.js");
		case "menu":
			return import("./doc/menu.js");
		case "toc":
			return import("./doc/toc.js");
		case "pill":
			return import("./doc/pill.js");
		case "example":
			return import("./doc/example.js");
		case "label":
			return import("./doc/label.js");
		case "msg":
			return import("./doc/msg.js");
		case "table":
			return import("./doc/table.js");
		case "layout":
			return import("./doc/layout.js");

		case "tag_base":
			return import("./doc/tag.base.js");
		case "tag_text":
			return import("./doc/tag.text.js");
		case "tag_background":
			return import("./doc/tag.background.js");
		case "tag_border":
			return import("./doc/tag.border.js");
		case "tag_color":
			return import("./doc/tag.color.js");
		case "tag_display":
			return import("./doc/tag.display.js");
		case "tag_flex":
			return import("./doc/tag.flex.js");
		case "tag_float":
			return import("./doc/tag.float.js");
		case "tag_interaction":
			return import("./doc/tag.interaction.js");
		case "tag_overflow":
			return import("./doc/tag.overflow.js");
		case "tag_position":
			return import("./doc/tag.position.js");
		case "tag_shadow":
			return import("./doc/tag.shadow.js");
		case "tag_size":
			return import("./doc/tag.size.js");
		case "tag_spacing":
			return import("./doc/tag.spacing.js");
		case "tag_valign":
			return import("./doc/tag.valign.js");
		case "tag_visibility":
			return import("./doc/tag.visibility.js");

		case "tag_ex_a":
			return import("./doc/tag.ex.a.js");
		case "tag_ex_abbr":
			return import("./doc/tag.ex.abbr.js");
		case "tag_ex_b":
			return import("./doc/tag.ex.b.js");
		case "tag_ex_blockquote":
			return import("./doc/tag.ex.blockquote.js");
		case "tag_ex_cite":
			return import("./doc/tag.ex.cite.js");
		case "tag_ex_code":
			return import("./doc/tag.ex.code.js");
		case "tag_ex_div":
			return import("./doc/tag.ex.div.js");
		case "tag_ex_em":
			return import("./doc/tag.ex.em.js");
		case "tag_ex_form":
			return import("./doc/tag.ex.form.js");
		case "tag_ex_footer":
			return import("./doc/tag.ex.footer.js");
		case "tag_ex_h":
			return import("./doc/tag.ex.h.js");
		case "tag_ex_hr":
			return import("./doc/tag.ex.hr.js");
		case "tag_ex_i":
			return import("./doc/tag.ex.i.js");
		case "tag_ex_img":
			return import("./doc/tag.ex.img.js");
		case "tag_ex_li":
			return import("./doc/tag.ex.li.js");
		case "tag_ex_nav":
			return import("./doc/tag.ex.nav.js");
		case "tag_ex_ol":
			return import("./doc/tag.ex.ol.js");
		case "tag_ex_p":
			return import("./doc/tag.ex.p.js");
		case "tag_ex_pre":
			return import("./doc/tag.ex.pre.js");
		case "tag_ex_small":
			return import("./doc/tag.ex.small.js");
		case "tag_ex_span":
			return import("./doc/tag.ex.span.js");
		case "tag_ex_strong":
			return import("./doc/tag.ex.strong.js");
		case "tag_ex_ul":
			return import("./doc/tag.ex.ul.js");

		case "generic":
			return import("./doc/generic.js");
		case "file":
			return import("./doc/file.js");
		case "query":
			return import("./doc/query.js");
		case "list":
			return import("./doc/list.js");
		case "user":
			return import("./doc/user.js");
	}
}

const db_menu = [
	{
		type: "menu",
		title: "Getting started",
		icon: { icon: "book-open", color: "primary" },
		item: [
			{ title: "Introduction", source: "intro" },
			{ title: "Bootswatch", source: "bootswatch" },
		],
	},
	{
		type: "menu",
		title: "Global Property",
		icon: { icon: "globe", color: "warning" },
		item: [
			{ title: "Badge", source: "bootswatch_badge" },
			{ title: "Popover", source: "bootswatch_popover" },
			{ title: "Tooltip", source: "bootswatch_tooltip" },
		],
	},
	{
		type: "menu",
		title: "Layout",
		icon: { icon: "grip", color: "info" },
		item: [
			{ title: "Containers", source: "container" },
			{ title: "Grid", source: "grid" },
			{ title: "Column", source: "column" },
			{ title: "Gutter", source: "gutter" },
		],
	},
	{
		type: "menu",
		title: "Forms",
		icon: { icon: "list-check", color: "muted" },
		item: [
			{ title: "Form control", source: "formcontrol" },
			{ title: "Select", source: "select" },
			{ title: "Check & radios", source: "checkradio" },
			{ title: "Range", source: "range" },
			{ title: "Input group", source: "inputgroup" },
			{ title: "Floating label", source: "floatinglabel" },
		],
	},
	{
		type: "menu",
		title: "Components",
		icon: { icon: "server", color: "warning" },
		item: [
			{ title: "Accordion", source: "accordion" },
			{ title: "Alert", source: "alert" },
			{ title: "Badge", source: "badge" },
			{ title: "Breadcrumb", source: "breadcrumb" },
			{ title: "Button", source: "button" },
			{ title: "Button group", source: "btngroup" },
			{ title: "Card", source: "card" },
			{ title: "Carosel", source: "carousel" },
			{ title: "Close button", source: "btnclose" },
			{ title: "Collapse", source: "collapse" },
			{ title: "Dropdown", source: "dropdown" },
			{ title: "List group", source: "listgroup" },
			{ title: "Modal", source: "modal" },
			{ title: "Tab", source: "tab" },
			{ title: "Navbar", source: "navbar" },
			{ title: "Offcanvas", source: "offcanvas" },
			{ title: "Paging", source: "paging" },
			{ title: "Placeholders", source: "placeholder" },
			{ title: "Popover", source: "popover" },
			{ title: "Progress", source: "progress" },
			{ title: "Toast", source: "toast" },
			{ title: "Tooltips", source: "tooltip" },
		],
	},
	{
		type: "menu",
		title: "Extra",
		icon: { icon: "heart", color: "danger" },
		item: [
			{ title: "Icon", source: "icon" },
			{ title: "Menu", source: "menu" },
			{ title: "Table of content", source: "toc" },
			{ title: "Pill", source: "pill" },
			{ title: "Example", source: "example" },
			{ title: "Label", source: "label" },
			{ title: "Msg", source: "msg" },
			{ title: "Table", source: "table" },
			{ title: "Layout", source: "layout" },
		],
	},
	{
		type: "menu",
		title: "Tag component",
		icon: { icon: "tag", color: "success" },
		item: [
			{ title: "Basic", source: "tag_base" },
			{ title: "Background", source: "tag_background" },
			{ title: "Borders", source: "tag_border" },
			{ title: "Colors", source: "tag_color" },
			{ title: "Display", source: "tag_display" },
			{ title: "Flex", source: "tag_flex" },
			{ title: "Float", source: "tag_float" },
			{ title: "Interactions", source: "tag_interaction" },
			{ title: "Overflow", source: "tag_overflow" },
			{ title: "Position", source: "tag_position" },
			{ title: "Shadows", source: "tag_shadow" },
			{ title: "Sizing", source: "tag_size" },
			{ title: "Spacing", source: "tag_spacing" },
			{ title: "Text", source: "tag_text" },
			{ title: "Vertical align", source: "tag_valign" },
			{ title: "Visibility", source: "tag_visibility" },
		],
	},
	{
		type: "menu",
		title: "Extended tag",
		icon: { icon: "screwdriver-wrench", color: "primary" },
		item: [
			{ title: "Anchor", source: "tag_ex_a" },
			{ title: "Abbreviation", source: "tag_ex_abbr" },
			{ title: "Bold", source: "tag_ex_b" },
			{ title: "Blockquote", source: "tag_ex_blockquote" },
			{ title: "Cite", source: "tag_ex_cite" },
			{ title: "Code", source: "tag_ex_code" },
			{ title: "Division", source: "tag_ex_div" },
			{ title: "Emphasis", source: "tag_ex_em" },
			{ title: "Form", source: "tag_ex_form" },
			{ title: "Footer", source: "tag_ex_footer" },
			{ title: "Heading", source: "tag_ex_h" },
			{ title: "Horizontal rule", source: "tag_ex_hr" },
			{ title: "Italic", source: "tag_ex_i" },
			{ title: "Image", source: "tag_ex_img" },
			{ title: "List item", source: "tag_ex_li" },
			{ title: "Navigation", source: "tag_ex_nav" },
			{ title: "Ordered list", source: "tag_ex_ol" },
			{ title: "Paragraph", source: "tag_ex_p" },
			{ title: "Preformatted", source: "tag_ex_pre" },
			{ title: "Small", source: "tag_ex_small" },
			{ title: "Span", source: "tag_ex_span" },
			{ title: "Strong", source: "tag_ex_strong" },
			{ title: "Unordered list", source: "tag_ex_ul" },
		],
	},
	{
		type: "menu",
		title: "Database",
		icon: { icon: "database", color: "info" },
		item: [
			{ title: "Generic", source: "generic" },
			{ title: "File", source: "file" },
			{ title: "Query", source: "query" },
			{ title: "List", source: "list" },
			{ title: "User", source: "user" },
		],
	},
	{
		type: "navigate",
		title: "Others",
		icon: { icon: "link", color: "muted" },
		item: [
			{ title: "Sandbox", source: "sandbox.html" },
			{ title: "Test", source: "test.html" },
		],
	},
	{
		type: "action",
		title: "Action",
		icon: { icon: "bolt-lightning", color: "danger" },
		item: [
			{
				title: "Memory Test 10",
				source: (sender) => {
					start_memoryleaktest(sender, 10);
				},
			},
			{
				title: "Memory Test 100",
				source: (sender) => {
					start_memoryleaktest(sender, 100);
				},
			},
			{
				title: "Memory Test 1000",
				source: (sender) => {
					start_memoryleaktest(sender, 1000);
				},
			},
			{
				title: "Memory Test 5000",
				source: (sender) => {
					start_memoryleaktest(sender, 5000);
				},
			},
		],
	},
	{
		type: "theme",
		title: "Theme",
		icon: { icon: "swatchbook", color: "success" },
		item: [
			{ title: "Default", source: null },
			{ title: "Cerulean", source: "cerulean" },
			{ title: "Cosmo", source: "cosmo" },
			{ title: "Cyborg", source: "cyborg" },
			{ title: "Darkly", source: "darkly" },
			{ title: "Flatly", source: "flatly" },
			{ title: "Journal", source: "journal" },
			{ title: "Litera", source: "litera" },
			{ title: "Lumen", source: "lumen" },
			{ title: "Lux", source: "lux" },
			{ title: "Materia", source: "materia" },
			{ title: "Minty", source: "minty" },
			{ title: "Morph", source: "morph" },
			{ title: "Pulse", source: "pulse" },
			{ title: "Quartz", source: "quartz" },
			{ title: "Sandstone", source: "sandstone" },
			{ title: "Simplex", source: "simplex" },
			{ title: "Sketchy", source: "sketchy" },
			{ title: "Slate", source: "slate" },
			{ title: "Solar", source: "solar" },
			{ title: "Spacelab", source: "spacelab" },
			{ title: "Superhero", source: "superhero" },
			{ title: "United", source: "united" },
			{ title: "Vapor", source: "vapor" },
			{ title: "Yeti", source: "yeti" },
			{ title: "Zephyr", source: "zephyr" },
		],
	},
];

const wplibrary = {
	a: /_cl_base_a_js.+\[.+\]/g,
	abbr: /_cl_base_abbr_js.+\[.+\]/g,
	accordion: /_cl_base_accordion_js.+\[.+\]/g,
	"alert.": /_cl_base_alert_js.+\./g,
	b: /_cl_base_b_js.+\[.+\]/g,
	badge: /_cl_base_badge_js.+\[.+\]/g,
	blockquote: /_cl_base_blockquote_js.+\[.+\]/g,
	breadcrumb: /_cl_base_breadcrumb_js.+\[.+\]/g,
	btnclose: /_cl_base_btnclose_js.+\[.+\]/g,
	btngroup: /_cl_base_btngroup_js.+\[.+\]/g,
	btntoolbar: /_cl_base_btntoolbar_js.+\[.+\]/g,
	button: /_cl_base_button_js.+\[.+\]/g,
	"card.": /_cl_base_card_js.+\./g,
	carousel: /_cl_base_carousel_js.+\[.+\]/g,
	cite: /_cl_base_cite_js.+\[.+\]/g,
	code: /_cl_base_code_js.+\[.+\]/g,
	codepreview: /_cl_base_codepreview_js.+\[.+\]/g,
	"collapse.": /_cl_base_collapse_js.+\./g,
	"container.": /_cl_base_container_js.+\./g,
	"core.": /_cl_base_core_js.+\./g,
	"db.": /_cl_base_db_js.+\./g,
	div: /_cl_base_div_js.+\[.+\]/g,
	"dlg.": /_cl_base_dlg_js.+\./g,
	dropdown: /_cl_base_dropdown_js.+\[.+\]/g,
	em: /_cl_base_em_js.+\[.+\]/g,
	example: /_cl_base_example_js.+\[.+\]/g,
	file: /_cl_base_file_js.+\[.+\]/g,
	form: /_cl_base_from_js.+\[.+\]/g,
	footer: /_cl_base_footer_js.+\[.+\]/g,
	h: /_cl_base_h_js.+\[.+\]/g,
	hr: /_cl_base_hr_js.+\[.+\]/g,
	i: /_cl_base_i_js.+\[.+\]/g,
	icon: /_cl_base_icon_js.+\[.+\]/g,
	img: /_cl_base_img_js.+\[.+\]/g,
	input: /_cl_base_input_js.+\[.+\]/g,
	"inputgroup.": /_cl_base_inputgroup_js.+\./g,
	label: /_cl_base_label_js.+\[.+\]/g,
	"layout.": /_cl_base_layout_js.+\./g,
	li: /_cl_base_li_js.+\[.+\]/g,
	listgroup: /_cl_base_listgroup_js.+\[.+\]/g,
	"list.": /_cl_base_list_js.+\./g,
	menu: /_cl_base_menu_js.+\[.+\]/g,
	modal: /_cl_base_modal_js.+\[.+\]/g,
	msg: /_cl_base_msg_js.+\[.+\]/g,
	nav: /_cl_base_nav_js.+\[.+\]/g,
	"navbar.": /_cl_base_navbar_js.+\./g,
	offcanvas: /_cl_base_offcanvas_js.+\[.+\]/g,
	ol: /_cl_base_ol_js.+\[.+\]/g,
	"option.": /_cl_base_option_js.+\./g,
	p: /_cl_base_p_js.+\[.+\]/g,
	paging: /_cl_base_paging_js.+\[.+\]/g,
	pill: /_cl_base_pill_js.+\[.+\]/g,
	popover: /_cl_base_popover_js.+\[.+\]/g,
	pre: /_cl_base_pre_js.+\[.+\]/g,
	"progress.": /_cl_base_progress_js.+\./g,
	"query.": /_cl_base_query_js.+\./g,
	small: /_cl_base_small_js.+\[.+\]/g,
	span: /_cl_base_span_js.+\[.+\]/g,
	strong: /_cl_base_strong_js.+\[.+\]/g,
	tab: /_cl_base_tab_js.+\[.+\]/g,
	"table.": /_cl_base_table_js.+\./g,
	tag: /_cl_base_tag_js.+\[.+\]/g,
	toast: /_cl_base_toast_js.+\[.+\]/g,
	toc: /_cl_base_toc_js.+\[.+\]/g,
	tooltip: /_cl_base_tooltip_js.+\[.+\]/g,
	ul: /_cl_base_ul_js.+\[.+\]/g,
	"user.": /_cl_base_user_js.+\./g,
	"sample.": /_sample_js.+\./g,
};

function replaceWPLib(str) {
	Object.keys(wplibrary).forEach((key) => {
		str = str.replaceAll(wplibrary[key], key);
	});

	return str;
}

const dblibrary = {
	a: `import a from "./cl/base/a.js";`,
	abbr: `import abbr from "./cl/base/abbr.js";`,
	accordion: `import accordion from "./cl/base/accordion.js";`,
	alert: `import * as alert from "./cl/base/alert.js";`,
	b: `import b from "./cl/base/b.js";`,
	badge: `import badge from "./cl/base/badge.js";`,
	blockquote: `import blockquote from "./cl/base/blockquote.js";`,
	breadcrumb: `import breadcrumb from "./cl/base/breadcrumb.js";`,
	btnclose: `import btnclose from "./cl/base/btnclose.js";`,
	btngroup: `import btngroup from "./cl/base/btngroup.js";`,
	btntoolbar: `import btntoolbar from "./cl/base/btntoolbar.js";`,
	button: `import button from "./cl/base/button.js";`,
	card: `import * as card from "./cl/base/card.js";`,
	carousel: `import carousel from "./cl/base/carousel.js";`,
	cite: `import cite from "./cl/base/cite.js";`,
	code: `import code from "./cl/base/code.js";`,
	codepreview: `import codepreview from "./cl/base/codepreview.js";`,
	collapse: `import * as collapse from "./cl/base/collapse.js";`,
	container: `import * as container from "./cl/base/container.js";`,
	core: `import * as core from "./cl/base/core.js";`,
	db: `import * as db from "./cl/base/api.js";`,
	div: `import div from "./cl/base/div.js";`,
	dlg: `import * as dlg from "./cl/base/dlg.js";`,
	dropdown: `import dropdown from "./cl/base/dropdown.js";`,
	em: `import example from "./cl/base/em.js";`,
	example: `import example from "./cl/base/example.js";`,
	file: `import file from "./cl/base/file.js";`,
	form: `import form from "./cl/base/form.js";`,
	footer: `import footer from "./cl/base/footer.js";`,
	h: `import h from "./cl/base/h.js";`,
	hr: `import hr from "./cl/base/hr.js";`,
	i: `import icon from "./cl/base/i.js";`,
	icon: `import icon from "./cl/base/icon.js";`,
	img: `import img from "./cl/base/img.js";`,
	input: `import input from "./cl/base/input.js";`,
	inputgroup: `import * as inputgroup from "./cl/base/inputgroup.js";`,
	label: `import label from "./cl/base/label.js";`,
	layout: `import * as layout from "./cl/base/layout.js";`,
	li: `import li from "./cl/base/li.js";`,
	listgroup: `import listgroup from "./cl/base/listgroup.js";`,
	list: `import * as list from "./cl/base/list.js";`,
	menu: `import menu from "./cl/base/menu.js";`,
	modal: `import modal from "./cl/base/modal.js";`,
	msg: `import msg from "./cl/base/msg.js";`,
	nav: `import nav from "./cl/base/nav.js";`,
	navbar: `import * as navbar from "./cl/base/navbar.js";`,
	offcanvas: `import offcanvas from "./cl/base/offcanvas.js";`,
	ol: `import ol from "./cl/base/ol.js";`,
	option: `import * as option from "./cl/base/option.js";`,
	p: `import p from "./cl/base/p.js";`,
	paging: `import paging from "./cl/base/paging.js";`,
	pill: `import pill from "./cl/base/pill.js";`,
	popover: `import popover from "./cl/base/popover.js";`,
	pre: `import pre from "./cl/base/pre.js";`,
	progress: `import * as progress from "./cl/base/progress.js";`,
	query: `import * as query from "./cl/base/query.js";`,
	small: `import small from "./cl/base/small.js";`,
	span: `import span from "./cl/base/span.js";`,
	strong: `import strong from "./cl/base/strong.js";`,
	tab: `import tab from "./cl/base/tab.js";`,
	table: `import * as table from "./cl/base/table.js";`,
	tag: `import tag from "./cl/base/tag.js";`,
	toast: `import toast from "./cl/base/toast.js";`,
	toc: `import toc from "./cl/base/toc.js";`,
	tooltip: `import tooltip from "./cl/base/tooltip.js";`,
	ul: `import ul from "./cl/base/ul.js";`,
	user: `import * as user from "./cl/base/user.js";`,
	sample: `import sample from "./doc/sample.js";	//for documentation purpose only`,
};

let randomtheme_callback = null;
function load_random_theme(callback) {
	randomtheme_callback = callback;

	let cur_theme = core.randomdb("index_theme", db_menu[db_menu.length - 1].item).source;

	if (cur_theme === "") {
		cur_theme = null;
	}

	set_theme(cur_theme);
}

function set_theme(theme) {
	core.setting.theme = theme;
}

core.setting.themechange = (theme) => {
	activate_menu("theme", theme, "theme");

	let el = document.getElementById("pagetheme");
	if (el) {
		if (theme) {
			el.innerText = `${core.capitalize(theme)}`;
		} else {
			el.innerText = `Default`;
		}
	}

	reload_page(false, () => {
		if (randomtheme_callback && typeof randomtheme_callback === "function") {
			randomtheme_callback();
			randomtheme_callback = null;
		}
	});
};

function start_memoryleaktest(sender, limit) {
	if (memoryleaktestrun === true) {
		memoryleaktestrun = false;
	} else {
		new dlg.confirmbox(
			"!!",
			`
			Are you sure to start <b>Memory Leak Test</b>?<br/><br/>
			This test use by developer to check memory leak on this framework by open <b>${limit}</b> random page. This test may make your device laggy.<br/><br/>
			If you want to stop the test, please click on this <b>Memory Leak Test</b> again to stop the test.`,
			{
				label: "Understand",
				click: () => {
					sender.classList.add("active");
					memoryleaktestrun = true;
					memoryleaktest(
						0,
						limit,
						(i, l) => {
							if (i === l || memoryleaktestrun === false) {
								sender.innerText = `Memory Test ${l}`;
							} else {
								sender.innerText = `Memory Test ${parseInt((i / l) * 100, 10)}%`;
							}
						},
						(main_menu, sub_menu, type_menu) => {
							sender.classList.remove("active");
							generate_tableofcontent();
							update_scrollspy();
							activate_menu(last_main_menu, last_sub_menu, "menu");
							update_url(last_main_menu, last_sub_menu);
							update_pagerandom(last_main_menu, last_sub_menu);

							PR.prettyPrint();
							core.codemarker(document);
						}
					);
				},
			}
		).show();
	}
}

let memoryleaktestrun = false;

let last_main_menu = 0;
let last_sub_menu = 0;
function memoryleaktest(index, limit, progressupdate, callback) {
	if (index < limit && memoryleaktestrun === true) {
		progressupdate(index, limit);

		let p = core.randomdb("index_dbmenukey", dbmenukey);

		last_main_menu = p.main_menu;
		last_sub_menu = p.sub_menu;
		load_page(false, null, p.main_menu, p.sub_menu, () => {
			core.init(document.getElementById("root"));

			if (index >= limit) {
				callback(last_main_menu, last_sub_menu, "menu");
			} else {
				memoryleaktest(index + 1, limit, progressupdate, callback);
			}
		});
	} else {
		memoryleaktestrun = false;
		progressupdate(index, limit);
		callback(last_main_menu, last_sub_menu, "menu");
	}
}

function generate_page(opt) {
	opt = core.extend(
		{},
		{
			id: null,
			anchor: true,
			title: null,
			msg: null,
			dark: false,
			viewclass: null,
			option: null,
			code: null,
			sample: null,
			source: null,
			container: (elem) => {
				return elem;
			},
		},
		opt
	);

	opt.id = opt.id || core.UUID();

	opt.msg = opt.msg ? (Array.isArray(opt.msg) ? opt.msg : [opt.msg]) : null;

	let m = null;

	if (opt.msg) {
		m = [];
		opt.msg.forEach((i) => {
			m.push(i);
		});
	}

	if (opt.option) {
		if (m === null) {
			m = [];
		}

		Object.keys(opt.option).forEach((optionName) => {
			m.push(
				new table.container({
					item: opt.option[optionName],
				})
			);
		});
	}

	let sourcecode = [];
	if (opt.code) {
		sourcecode.push('"use strict";');
		sourcecode.push(`	`);
		sourcecode.push(`\/\/\/library`);
		sourcecode.push(dblibrary.core);
		if (opt.import) {
			let importList = [];
			opt.import.forEach((item) => {
				if (dblibrary[item]) {
					importList.push(dblibrary[item]);
				} else {
					importList.push(`\/\/\/[Error] Unknow library ${item}`);
				}
			});

			sourcecode = sourcecode.concat(importList.sort());
		}
		sourcecode.push(`	`);

		sourcecode.push(`\/\/\/code`);
		sourcecode.push(`let code = ${replaceWPLib(opt.code.toString())};`);
		sourcecode.push(`	`);

		sourcecode.push(`\/\/\/loader`);
		sourcecode.push(`core.documentReady(() => {`);
		sourcecode.push(`	core.replaceChild(document.getElementById("root"), code());`);
		sourcecode.push(`});`);
	}

	return new example({
		id: opt.id,
		anchor: opt.anchor,
		title: opt.title,
		msg: m,
		dark: opt.dark,
		viewclass: opt.viewclass,
		container: opt.container,
		source: sourcecode && sourcecode.length > 0 ? sourcecode : null,
		code: opt.code,
		sample: opt.sample,
	});
}

function find_menu(main_menu, sub_menu) {
	let main_menu_index = db_menu.findIndex((i) => i.title === main_menu);
	if (main_menu_index > -1) {
		let sub_menu_index = db_menu[main_menu_index].item.findIndex((i) => i.title === sub_menu);
		if (sub_menu_index > -1) {
			return {
				type: db_menu[main_menu_index].type,
				source: db_menu[main_menu_index].item[sub_menu_index].source,
			};
		}
	}

	return null;
}

let cur_main_menu = null;
let cur_sub_menu = null;

function generate_page_placeholder() {
	let fn = (col) => {
		return new div({
			placeholderAnimation: "glow",
			elem: Array.isArray(col)
				? col.map((i) => {
						return new span({ col: i, marginEnd: 1, placeholder: true });
				  })
				: new span({ col: col, placeholder: true }),
		});
	};

	let f = (len, maxcol) => {
		return fn(Array.from({ length: len }, () => core.rnd(1, maxcol)));
	};

	return new div({
		ariahidden: true,
		marginBottom: 5,
		elem: [
			new h({ level: 1, paddingTop: 3, fontSize: 3, elem: f(2, 4) }),
			new div({
				elem: new p({
					fontWeight: "light",
					fontSize: 5,
					elem: f(12, 5),
				}),
			}),
			new h({ level: 3, paddingTop: 3, elem: f(2, 3) }),
			new div({
				elem: new p({
					elem: f(6, 6),
				}),
			}),
			new h({ level: 3, paddingTop: 3, elem: f(2, 3) }),
			new div({
				elem: new p({
					elem: f(6, 6),
				}),
			}),
		],
	});
}

let dbmenukey = [];
function load_random_page(callback) {
	let i = core.randomdb("index_dbmenukey", dbmenukey);

	load_page(false, null, i.main_menu, i.sub_menu, () => {
		generate_tableofcontent();
		update_scrollspy();
		activate_menu(i.main_menu, i.sub_menu, "menu");
		update_url(i.main_menu, i.sub_menu);
		update_pagerandom(i.main_menu, i.sub_menu);

		core.init(document.getElementById("root"));
		PR.prettyPrint();
		core.codemarker(document);

		if (callback && typeof callback === "function") {
			callback();
		}
	});
}

function reload_page(update_url, callback) {
	if (DEBUG > 2) console.log("---[reload active doc]---");

	if (cur_main_menu && cur_sub_menu) {
		load_page(false, null, cur_main_menu, cur_sub_menu, () => {
			generate_tableofcontent();
			update_scrollspy();
			activate_menu(cur_main_menu, cur_sub_menu, "menu");
			update_pagerandom(cur_main_menu, cur_sub_menu);

			if (update_url) update_url(cur_main_menu, cur_sub_menu);

			core.init(document.getElementById("root"));
			PR.prettyPrint();
			core.codemarker(document);

			if (callback && typeof callback === "function") {
				callback();
			}
		});
	}
}

function load_page(showloading, sender, main_menu, sub_menu, callback) {
	let menu_item = find_menu(main_menu, sub_menu);
	if (menu_item) {
		if (menu_item.type === "menu") {
			cur_main_menu = main_menu;
			cur_sub_menu = sub_menu;

			//loading
			if (showloading) {
				core.replaceChild(document.getElementById("root"), generate_page_placeholder());
				core.replaceChild(document.getElementById("nextbar"), generate_tableofcontent_placeholder());
			}
			//loading end

			if (menu_item.source) {
				setTimeout(
					(menu_item, callback) => {
						//load page using promise
						let page_loader = (menu_item) => {
							return new Promise((res, rej) => {
								try {
									//async import doc source
									core.importJSPromise(pageSource(menu_item.source), (menu_item_source) => {
										let processtimestart = DEBUG > 0 ? window.performance.now() : null;

										// sample.resetindex();
										core.replaceChild(
											document.getElementById("root"),
											new div({
												marginBottom: 3,
												tabindex: 0,
												elem: menu_item_source.map((i) => {
													return generate_page(i);
												}),
											})
										);

										let processtimeend = DEBUG > 0 ? window.performance.now() : null;

										if (DEBUG > 0) {
											//count pagespeed
											document.getElementById("pagespeed").innerText = `${(
												processtimeend - processtimestart
											).toFixed(2)} ms`;

											//count page weight
											document.getElementById("pageweight").innerText = `${core.countElement(
												document.getElementById("root")
											)} items`;
										}

										res();
									});
								} catch (ex) {
									rej(ex);
								}
							});
						};

						page_loader(menu_item)
							.then(() => {
								if (callback instanceof Function) {
									callback();
								}
							})
							.catch((ex) => {
								console.error(ex);
								if (callback instanceof Function) {
									callback();
								}
							});
					},
					0,
					menu_item,
					callback
				);
			} else {
				core.replaceChild(
					document.getElementById("root"),
					new div({
						marginBottom: 3,
						elem: new msg({
							weight: "lg",
							icon: "!",
							elem: `Documentation for <b>${main_menu}</b> - <b>${sub_menu}</b> not yet available`,
						}),
					})
				);

				if (DEBUG > 0) {
					//count pagespeed
					document.getElementById("pagespeed").innerText = `0 ms`;

					//count page weight
					document.getElementById("pageweight").innerText = `0 item`;
				}

				if (callback instanceof Function) {
					callback();
				}
			}
		} else if (menu_item.type === "navigate") {
			window.open(menu_item.source, "_blank");
		} else if (menu_item.type === "action") {
			menu_item.source(sender);
		} else if (menu_item.type === "theme") {
			set_theme(menu_item.source);
		} else {
			console.warn("Unsupported type", menu_item);
		}
	}
}

function generate_tableofcontent() {
	let li = [];
	let anchor = [].slice.call(document.getElementById("root").getElementsByClassName("anchorjs-link"));
	if (anchor && anchor.length > 0) {
		core.replaceChild(
			document.getElementById("nextbar"),
			new toc({
				label: "On this page",
				item: anchor.map((i) => {
					//remove debug example
					if (!i.classList.contains("anchorjs-link-debug")) {
						let parent = i.parentElement;
						let id = parent.id;
						return {
							label: parent.innerText,
							href: `#${id}`,
							level: parent.nodeName === "H3" ? 1 : 0,
						};
					}
				}),
			})
		);
	} else {
		core.replaceChild(document.getElementById("nextbar"), null);
	}
}

function generate_tableofcontent_placeholder() {
	let fn = (col) => {
		return new div({
			placeholderAnimation: "glow",
			elem: Array.isArray(col)
				? col.map((i) => {
						return new span({ col: i, marginEnd: 1, placeholder: true });
				  })
				: new span({ col: col, placeholder: true }),
		});
	};

	let f0 = (len, maxcol) => {
		return fn(Array.from({ length: len }, () => core.rnd(1, maxcol)));
	};

	let f1 = (len, maxcol) => {
		return {
			label: f0(len, maxcol),
		};
	};

	return new toc({
		ariahidden: true,
		label: f0(3, 3),
		item: [f1(3, 3), f1(3, 3), f1(3, 3), f1(3, 3), f1(3, 3)],
	});
}

function update_scrollspy() {
	//update scroll-spy
	const dataSpyList = document.querySelectorAll('[data-bs-spy="scroll"]');
	if (dataSpyList && dataSpyList.length > 0) {
		dataSpyList.forEach((dataSpyEl) => {
			let inst = bootstrap.ScrollSpy.getInstance(dataSpyEl);
			if (inst) {
				inst.refresh();
			} else {
				console.warn("scrollspy not build");
			}
		});
	}
}

function update_pagerandom(main_menu, sub_menu) {
	let pagerandomlabel = document.getElementById("pagerandom");
	pagerandomlabel.innerText = sub_menu;
}

function update_url(main_menu, sub_menu) {
	let title = `${core.setting.title()} - ${main_menu} | ${sub_menu}`;
	let path = `/?m1=${encodeURIComponent(main_menu)}&m2=${encodeURIComponent(sub_menu)}${
		DEBUG ? `&debug=${DEBUG}` : ""
	}`;
	let data = { urlPath: path };

	window.history.pushState(data, title, path);
	document.title = title;
}

window.onpopstate = () => {
	let url_param = get_url_param();
	if (url_param && url_param.main_menu && url_param.sub_menu) {
		def_main_menu = url_param.main_menu;
		def_sub_menu = url_param.sub_menu;
	}

	DEBUG = url_param.debug;
	core.setting.DEBUG = DEBUG;

	cur_main_menu = def_main_menu;
	cur_sub_menu = def_sub_menu;

	reload_page(false);
};

function get_url_param() {
	let p = new URLSearchParams(window.location.search);

	let main_menu = p.get("m1");
	let sub_menu = p.get("m2");
	let debug = p.get("debug");

	return main_menu && sub_menu
		? {
				main_menu: decodeURIComponent(main_menu),
				sub_menu: decodeURIComponent(sub_menu),
				debug: debug ? parseInt(debug) : 0,
		  }
		: {
				main_menu: null,
				sub_menu: null,
				debug: debug ? parseInt(debug) : 0,
		  };
}

function alpha_only(str) {
	if (str) {
		return str.replace(/[^a-zA-Z]/g, "").toLowerCase();
	} else {
		return "";
	}
}

function activate_menu(main_menu, sub_menu, type_menu) {
	//remove last active for each type
	let activeItem = [].slice.call(document.getElementById("sidebar").getElementsByClassName("active"));

	for (let x = 0; x < activeItem.length; x++) {
		if (activeItem[x].getAttribute("cl-m3") === type_menu) {
			activeItem[x].classList.remove("active");
			if (type_menu !== "theme") {
				if (activeItem[x].getAttribute("cl-main_menu") !== main_menu) {
					let iul = activeItem[x].closest("ul").parentElement;
					if (iul) {
						try {
							let isib = iul.previousSibling;
							iul.classList.remove("show");
							if (isib) {
								isib.classList.add("collapsed");
								isib.setAttribute("aria-expanded", "false");
							}
						} catch {}
					}
				}
			}
		}
	}

	//set current active
	let current_active_menu_item = document.getElementById(
		`${type_menu}_${alpha_only(main_menu)}_${alpha_only(sub_menu)}`
	);
	if (current_active_menu_item) {
		current_active_menu_item.classList.add("active");

		if (type_menu !== "theme") {
			let cul = current_active_menu_item.closest("ul").parentElement;
			if (cul) {
				try {
					let csib = cul.previousSibling;
					cul.classList.add("show");

					if (csib) {
						csib.classList.remove("collapsed");
						csib.setAttribute("aria-expanded", "true");
					}
				} catch {}
			}
		}
	}
}

function generate_menu() {
	dbmenukey = [];

	return db_menu.map((i) => {
		return new menu({
			label: i.title,
			icon: i.icon,
			arrow: !i.icon,
			item: i.item.map((j) => {
				if (i.type === "menu") {
					dbmenukey.push({ main_menu: i.title, sub_menu: j.title });
				}

				return {
					id: `${i.type}_${alpha_only(i.title)}_${alpha_only(j.title)}`,
					class: `cl-${i.type}-item`,
					label: j.title,
					"cl-m1": i.title,
					"cl-m2": j.title,
					"cl-m3": i.type,
					click: (event) => {
						let sender = event.currentTarget;

						let main_menu = sender.getAttribute("cl-m1");
						let sub_menu = sender.getAttribute("cl-m2");
						let type_menu = sender.getAttribute("cl-m3");

						if (type_menu === "menu") sender.innerText = "Loading";
						load_page(true, sender, main_menu, sub_menu, () => {
							generate_tableofcontent();
							update_scrollspy();
							activate_menu(main_menu, sub_menu, type_menu);
							update_url(main_menu, sub_menu);
							update_pagerandom(main_menu, sub_menu);

							core.init(document.getElementById("root"));
							PR.prettyPrint();
							core.codemarker(document);

							sender.innerText = sub_menu;
						});
					},
				};
			}),
		});
	});
}

core.documentReady(() => {
	let url_param = get_url_param();
	if (url_param && url_param.main_menu && url_param.sub_menu) {
		def_main_menu = url_param.main_menu;
		def_sub_menu = url_param.sub_menu;
	}

	DEBUG = url_param.debug;
	core.setting.DEBUG = DEBUG;

	core.replaceWith(
		document.getElementById("main"),
		new layout.l1({
			topid: "navbar",
			leftid: "sidebar",
			rightid: "nextbar",
			mainid: "root",

			topelem: new navbar.container({
				dark: true,
				color: "primary",
				expand: "lg",
				body: { fluid: "lg" },
				elem: [
					new navbar.toggle({
						target: `#sidebar`,
						toggle: "collapse",
					}),
					new navbar.brand({ label: core.setting.title(), icon: core.setting.icon() }),
				],
			}),
			leftelem: new tag({
				class: ["sticky-md-top", "collapse", "navbar-collapse", "cl-vh-menu"],
				overflow: "auto",
				display: "md-block",
				marginTop: 3,
				elem: generate_menu(),
			}),
			rightelem: new tag({
				class: ["sticky-lg-top", "cl-vh-menu"],
				overflow: "auto",
				marginTop: 3,
				elem: generate_tableofcontent_placeholder(),
			}),
			footerelem: new div({
				display: "flex",
				flex: "wrap",
				justifyContent: "center",
				marginBottom: 5,
				gap: 2,
				elem: [
					new a({
						class: "text-decoration-none",
						elem: new pill({
							icon: "shuffle",
							title: "Choose random page",
							color: "primary",
							elem: [new small({ id: "pagerandom", elem: "Random Page" })],
						}),
						href: "#",
						click: () => {
							let pagerandomlabel = document.getElementById("pagerandom");
							let pagerandomico = pagerandomlabel.closest("div.cl-pill").getElementsByTagName("I")[0];

							pagerandomlabel.innerText = "Loading";
							if (pagerandomico) {
								pagerandomico.setAttribute("class", "fa-fw fa-spin fas fa-circle-notch");
							}

							load_random_page(() => {
								if (pagerandomico) {
									pagerandomico.setAttribute("class", "fa-fw fas fa-shuffle");
								}

								core.focusElement(pagerandomlabel);
							});
						},
					}),

					new a({
						class: "text-decoration-none",
						elem: new pill({
							icon: "swatchbook",
							title: "Choose random theme",
							color: "primary",
							elem: [new small({ id: "pagetheme", elem: "Default" })],
						}),
						href: "#",
						click: () => {
							let pagethemelabel = document.getElementById("pagetheme");
							let pagethemeico = pagethemelabel.closest("div.cl-pill").getElementsByTagName("I")[0];

							pagethemelabel.innerText = "Loading";
							if (pagethemeico) {
								pagethemeico.setAttribute("class", "fa-fw fa-spin fas fa-circle-notch");
							}

							load_random_theme(() => {
								if (pagethemeico) {
									pagethemeico.setAttribute("class", "fa-fw fas fa-swatchbook");
								}

								core.focusElement(pagethemelabel);
							});
						},
					}),

					new pill({
						icon: "eye",
						title: "Viewport",
						color: "primary",
						viewport: true,
					}),

					DEBUG > 0
						? new pill({
								icon: "stopwatch",
								title: "Build speed",
								color: "primary",
								elem: [new small({ id: "pagespeed", elem: "0 ms" })],
						  })
						: null,
					DEBUG > 0
						? new pill({
								icon: "balance-scale",
								title: "Page weight",
								color: "primary",
								elem: [new small({ id: "pageweight", elem: "0 item" })],
						  })
						: null,
				].filter(Boolean),
			}),
			mainelem: generate_page_placeholder(),

			backtotop: true,
		})
	);

	cur_main_menu = def_main_menu;
	cur_sub_menu = def_sub_menu;

	core.init(document);
});
