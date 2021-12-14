"use strict";
import * as doc_core from "./core.js";
import * as sample from "./sample.js";
import * as dlg from "../base/dlg.js";
import div from "../base/div.js";
import p from "../base/p.js";
import modal from "../base/modal.js";
import msg from "../base/msg.js";
import toast from "../base/toast.js";
import button from "../base/button.js";
import input from "../base/input.js";
import a from "../base/a.js";
export default [
	{
		title: "Modals",
		msg: "Use Bootstrap’s JavaScript modal plugin to add dialogs to your site for lightboxes, user notifications, or completely custom content.",
		anchor: false,
	},

	{
		title: "Example",
	},

	{
		title: "Simple msgbox components",
		msg: "Below is a static modal example (meaning its position and display have been overridden). Included are the modal header, modal body (required for padding), and modal footer (optional). We ask that you include modal headers with dismiss actions whenever possible, or provide another explicit dismiss action.",
		pclass: "ns-modal-preview",
		code: function () {
			return new modal({
				title: "Modal Title",
				elem: new msg({
					weight: "md",
					icon: "i",
					msg: "This is example msgbox",
					button: {
						label: "Okay",
						onclick: function () {
							new toast("i", "Callback").show();
						},
					},
				}),
			});
		},
	},

	{
		title: "Simple msgbox live",
		container: doc_core.stackcontainer,
		code: function () {
			return [
				{ label: "Info", icon: "i" },
				{ label: "Question", icon: "?" },
				{ label: "Warning", icon: "!" },
				{ label: "Error", icon: "x" },
			].map(function (i) {
				return new button({
					label: i.label,
					icon: i.icon,
					onclick: function () {
						new dlg.msgbox(i.icon, `This is example msgbox with <b>${i.icon}</b> icon`, function () {
							new toast(i.icon, "After user click <b>Okay</b> button");
						}).show();
					},
				});
			});
		},
	},

	{
		title: "Simple inputbox components",
		msg: "Below is a static modal example (meaning its position and display have been overridden). Included are the modal header, modal body (required for padding), and modal footer (optional). We ask that you include modal headers with dismiss actions whenever possible, or provide another explicit dismiss action.",
		pclass: "ns-modal-preview",
		code: function () {
			return new dlg.inputbox("text", "This is example inputbox text", function (event, data) {
				new toast("i", `Result from dlg.inputbox is : ${JSON.stringify(data)}`);
			});
		},
	},

	{
		title: "Simple inputbox components with select",
		msg: "Below is a static modal example (meaning its position and display have been overridden). Included are the modal header, modal body (required for padding), and modal footer (optional). We ask that you include modal headers with dismiss actions whenever possible, or provide another explicit dismiss action.",
		pclass: "ns-modal-preview",
		code: function () {
			return new dlg.inputbox(
				new input({ type: "select", option: sample.optionitem(), name: "value" }),
				"This is example inputbox select",
				function (event, data) {
					new toast("i", `Result from dlg.inputbox is : ${JSON.stringify(data)}`);
				}
			);
		},
	},

	{
		title: "Simple inputbox live",
		container: doc_core.stackcontainer,
		code: function () {
			return [
				{ label: "Text", type: "text" },
				{ label: "Number", type: "number" },
				{ label: "Date", type: "date" },
				{ label: "Range", type: "range" },
				{ label: "Textarea", type: "textarea" },
				{ label: "Select", type: "select", option: sample.optionitem() },
			].map(function (i) {
				return new button({
					label: i.label,
					color: "primary",
					onclick: function () {
						new dlg.inputbox(
							i.hasOwnProperty("option")
								? new input({ type: "select", option: i.option, name: "value" })
								: i.type,
							`This is example inputbox with <b>${i.type}</b> input`,
							[
								function (event, data) {
									new toast("/", `You give <b>${data.value}</b> in inputbox`);
								},
								function (event) {
									new toast("x", `You not give anything in inputbox`);
								},
							]
						).show();
					},
				});
			});
		},
	},

	{
		title: "Inputbox with multiple input",
		msg: "Below is a static modal example (meaning its position and display have been overridden). Included are the modal header, modal body (required for padding), and modal footer (optional). We ask that you include modal headers with dismiss actions whenever possible, or provide another explicit dismiss action.",
		pclass: "ns-modal-preview",
		sample: { "sample.form": sample.form },
		code: function () {
			return new button({
				label: "Show inputbox with multiple input",
				color: "primary",
				onclick: function () {
					new dlg.inputbox(sample.form(), null, function (event, data) {
						new toast("/", `You give <b>${JSON.stringify(data)}</b> in inputbox`);
					});
				},
			});
		},
	},

	{
		title: "Inputbox with multiple input live",
		msg: "First agrument can handle type {{[new input()]}}.",
		label: "Show multiple input inputbox",
		sample: { "sample.form": sample.form },
		code: function () {
			return new button({
				label: "Show inputbox with multiple input",
				color: "primary",
				onclick: function () {
					new dlg.inputbox(sample.form(), null, function (event, data) {
						new toast({
							delay: 10000,
							color: "success",
							icon: "dove",
							title: "Result",
							msg: `${JSON.stringify(d)}`,
						});
					});
				},
			});
		},
	},

	{
		title: "Confirmbox",
		msg: "Below is a static modal example (meaning its position and display have been overridden). Included are the modal header, modal body (required for padding), and modal footer (optional). We ask that you include modal headers with dismiss actions whenever possible, or provide another explicit dismiss action.",
		pclass: "ns-modal-preview",
		code: function () {
			return new button({
				label: "Show confirmbox",
				color: "primary",
				onclick: function () {
					return new dlg.confirmbox("?", "This is example msgbox with <b>yesno</b> button", function () {
						new toast("i", "Callback").show();
					});
				},
			});
		},
	},

	{
		title: "Simple msgbox live",
		container: doc_core.stackcontainer,
		code: function () {
			return [
				{ label: "Info", icon: "i" },
				{ label: "Question", icon: "?" },
				{ label: "Warning", icon: "!" },
				{ label: "Error", icon: "x" },
			].map(function (i) {
				return new button({
					label: i.label,
					icon: i.icon,
					onclick: function () {
						new dlg.confirmbox(i.icon, `This is example confirmbox with <b>${i.icon}</b> icon`, "yesno")
							.then(() => {
								new toast("/", "After user click <b>Yes</b> button");
							})
							.catch(() => {
								new toast("x", "After user not click <b>Yes</b> button");
							});
					},
				});
			});
		},
	},

	{
		title: "Dialog box",
		msg: "Below is a static modal example (meaning its position and display have been overridden). Included are the modal header, modal body (required for padding), and modal footer (optional). We ask that you include modal headers with dismiss actions whenever possible, or provide another explicit dismiss action.",
		pclass: "ns-modal-preview",
		code: function () {
			return new modal({
				title: "Modal title",
				elem: "Modal body text goes here.",
				button: ["Save changes", "Close"],
			});
		},
	},

	{
		title: "Live example",
		label: "Show modal dialog",
		code: function () {
			return new button({
				label: "Live preview",
				color: "primary",
				onclick: function () {
					new modal({
						title: "Modal title",
						elem: "Modal body text goes here.",
						button: [
							{
								label: "Save changes",
								onclick: function () {},
							},
							"Cancel",
						],
					}).show();
				},
			});
		},
	},

	{
		title: "Checkbox in footer",
		label: "Show modal dialog",
		code: function () {
			return new modal({
				title: "Modal title",
				elem: "Modal body text goes here.",
				button: [
					{
						label: "Save changes",
						onclick: function (event, data) {
							new toast("i", `Result from dialog is <b>${JSON.stringify(data)}</b>`);
						},
					},
					"Close",
				],
				footer: new input({ type: "switch", name: "showagain", label: "Show again" }),
			});
		},
	},

	{
		title: "Disable static backdrop",
		label: "Show modal dialog",
		code: function () {
			return new modal({
				static: false,
				title: "Modal title",
				elem: "By default, modal dialog will not close if you click outside or press escape key. To allow modal dialog to close when click outside or press escape key, set {{static: false}} option",
				button: [
					{
						label: "Understand",
						onclick: function (event, data) {
							new toast("i", `Result from dialog is <b>${JSON.stringify(data)}</b>`);
						},
					},
					"Close",
				],
			});
		},
	},

	{
		title: "Disable scrolling long content",
		label: "Show modal dialog",
		sample: { "sample.text": sample.text },
		code: function () {
			return new modal({
				scrollable: false,
				title: "Modal title",
				elem: [
					new p(
						"By default, modal dialog will activate scrolling inside modal dialog. To disabled it, set {{scrollable: false}} option."
					),
					sample.text("p"),
					sample.text("p"),
					sample.text("p"),
					sample.text("p"),
					sample.text("p"),
				],
				button: [
					{
						label: "Understand",
						onclick: function (event, data) {
							new toast("i", `Result from dialog is <b>${JSON.stringify(data)}</b>`);
						},
					},
					"Close",
				],
			});
		},
	},

	{
		title: "Disable vertically centered",
		label: "Show modal dialog",
		code: function () {
			return new modal({
				center: false,
				title: "Modal title",
				elem: "By default, modal dialog will vertically centered when shown. To disabled it, set {{center: false}} option.",
				button: [
					{
						label: "Save changes",
						onclick: function (event, data) {
							new toast("i", `Result from dialog is <b>${JSON.stringify(data)}</b>`);
						},
					},
					"Close",
				],
			});
		},
	},

	{
		title: "Custom button",
		label: "Show modal dialog",
		code: function () {
			return new modal({
				title: "Modal title",
				elem: "Custom button dialog",
				button: [
					{
						label: "Yesss!",
						color: "primary",
						icon: "fire",
						onclick: function (event, data) {
							new toast("i", `Result from dialog is <b>${JSON.stringify(data)}</b>`);
						},
					},
					{ label: "Noooo!", color: "danger" },
					{ label: "Cancel", color: "info" },
					{
						icon: "?",
						onclick: function () {
							new toast("?", "Question button pressed").show();
						},
					},
				],
			});
		},
	},

	// {
	// 	title: "Tooltips and popovers",
	// 	label: "Show modal dialog",
	// 	code: function () {
	// 		return new modal({
	// 			title: "Modal title",
	// 			elem: [
	// 				{
	// 					tag: "h5",
	// 					elem: "Popover in a modal",
	// 				},
	// 				{
	// 					tag: "p",
	// 					elem: [
	// 						"This ",
	// 						new button({
	// 							color: "secondary",
	// 							label: "button",
	// 							tooltip: {
	// 								type: "popover",
	// 								placement: "right",
	// 								title: "Popover title",
	// 								msg: "Popover body content is set in this attribute.",
	// 							},
	// 						}),
	// 						" triggers a popover on click.",
	// 					],
	// 				},
	// 				{ tag: "hr" },
	// 				{
	// 					tag: "h5",
	// 					elem: "Tooltips in a modal",
	// 				},
	// 				{
	// 					tag: "p",
	// 					elem: [
	// 						new a({
	// 							href: "#;",
	// 							label: "This link",
	// 							tooltip: { type: "tooltip", msg: "Tooltip" },
	// 						}),
	// 						" and ",
	// 						new a({
	// 							href: "#;",
	// 							label: "that link",
	// 							tooltip: { type: "tooltip", msg: "Tooltip" },
	// 						}),
	// 						" have tooltips on hover.",
	// 					],
	// 				},
	// 			],
	// 			button: ["Save change", "Close"],
	// 		});
	// 	},
	// },

	{
		title: "Using the grid",
		label: "Show modal dialog",
		code: function () {
			return new modal({
				title: "Grids in modal",
				elem: new div("container-fluid ns-higlight-col", [
					new div("row", [
						new div("col-md-4", ".col-md-4"),
						new div("col-md-4 ms-auto", ".col-md-4 .ms-auto"),
					]),
					new div("row", [
						new div("col-md-3 ms-auto", ".col-md-3 .ms-auto"),
						new div("col-md-2 ms-auto", ".col-md-2 .ms-auto"),
					]),
					new div("row", [new div("col-md-6 ms-auto", ".col-md-6 .ms-auto")]),
					new div("row", [
						new div("col-sm-9", [
							"Level 1: .col-md-9",
							new div("row", [
								new div("col-8 col-sm-6", "Level 2: .col-8 .col-sm-6"),
								new div("col-4 col-sm-6", "Level 2: .col-4 .col-sm-6"),
							]),
						]),
					]),
				]),
				button: ["Save change", "Close"],
			});
		},
	},

	{
		title: "Varying modal content",
		container: doc_core.stackcontainer,
		sample: { "sample.dlgFn": sample.dlgFn },
		code: function () {
			return [
				new button({
					label: "Message for @mdo",
					color: "primary",
					onclick: "sample.dlgFn('@mdo');",
				}),
				new button({
					label: "Message for @fat",
					color: "primary",
					onclick: "sample.dlgFn('@fat');",
				}),
				new button({
					label: "Message for @getbootstrap",
					color: "primary",
					onclick: "sample.dlgFn('@getbootstrap');",
				}),
			];
		},
	},

	{
		title: "Toggle between modals",
		label: "Show first modal",
		sample: {
			"sample.dlgFirstModal": sample.dlgFirstModal,
			"sample.dlgSecondModal": sample.dlgSecondModal,
		},
		code: function () {
			var dlgFirstModal = function () {
				return new modal({
					title: "Modal 1",
					elem: "Show a second modal and close this one with the button below.",
					button: [{ label: "Show second modal", onclick: "sample.dlgSecondModal()" }],
				});
			};

			var dlgSecondModal = function () {
				return new modal({
					title: "Modal 2",
					elem: "Close this modal and show the first with the button below.",
					button: [{ label: "Show first modal", onclick: "sample.dlgFirstModal()" }],
				});
			};

			return dlgFirstModal();
		},
	},

	{
		title: "Remove animation",
		label: "Show simple dialog",
		code: function () {
			return new modal({
				animate: false,
				title: "Modal title",
				elem: "Dialog without fade effect",
				button: "okayonly",
			});
		},
	},

	{
		title: "Optional sizes",
		container: doc_core.stackcontainer,
		sample: { "sample.dlgSizeFn": sample.dlgSizeFn },
		code: function () {
			return [
				new button({
					label: "Extra large modal",
					color: "primary",
					onclick: "sample.dlgSizeFn('xl')",
				}),
				new button({
					label: "Large modal",
					color: "primary",
					onclick: "sample.dlgSizeFn('lg')",
				}),
				new button({
					label: "Small modal",
					color: "primary",
					onclick: "sample.dlgSizeFn('sm')",
				}),
			];
		},
	},

	{
		title: "Fullscreen Modal",
		container: doc_core.stackcontainer,
		sample: { "sample.dlgFullscreenFn": sample.dlgFullscreenFn },
		code: function () {
			return [
				new button({
					label: "Full screen",
					color: "primary",
					onclick: "sample.dlgFullscreenFn(true)",
				}),
				new button({
					label: "Full screen below sm",
					color: "primary",
					onclick: "sample.dlgFullscreenFn('sm-down')",
				}),
				new button({
					label: "Full screen below md",
					color: "primary",
					onclick: "sample.dlgFullscreenFn('md-down')",
				}),
				new button({
					label: "Full screen below lg",
					color: "primary",
					onclick: "sample.dlgFullscreenFn('lg-down')",
				}),
				new button({
					label: "Full screen below xl",
					color: "primary",
					onclick: "sample.dlgFullscreenFn('xl-down')",
				}),
				new button({
					label: "Full screen below xxl",
					color: "primary",
					onclick: "sample.dlgFullscreenFn('xxl-down')",
				}),
			];
		},
	},
];
