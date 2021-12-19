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
import h from "../base/h.js";
import hr from "../base/hr.js";
import tooltip from "../base/tooltip.js";

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
		viewclass: "cl-modal-preview",
		code: function () {
			return new modal({
				title: "Modal Title",
				elem: new msg({
					weight: "md",
					icon: "i",
					elem: "This is example msgbox",
				}),
				button: {
					label: "Okay",
					onclick: function () {
						new toast("i", "Callback").show();
					},
				},
				debug: true, //this last option is for this documentation preview only
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
							new toast(i.icon, "After user click <b>Okay</b> button").show();
						}).show();
					},
				});
			});
		},
	},

	{
		title: "Simple inputbox components",
		msg: "Below is a static modal example (meaning its position and display have been overridden). Included are the modal header, modal body (required for padding), and modal footer (optional). We ask that you include modal headers with dismiss actions whenever possible, or provide another explicit dismiss action.",
		viewclass: "cl-modal-preview",
		code: function () {
			return new dlg.inputbox(
				"text",
				"This is example inputbox text",
				function (event, data) {
					new toast("i", `Result from dlg.inputbox is : ${JSON.stringify(data)}`).show();
				},
				{ debug: true } //this last argument is for this documentation preview only
			);
		},
	},

	{
		title: "Simple inputbox components with select",
		msg: "Below is a static modal example (meaning its position and display have been overridden). Included are the modal header, modal body (required for padding), and modal footer (optional). We ask that you include modal headers with dismiss actions whenever possible, or provide another explicit dismiss action.",
		viewclass: "cl-modal-preview",
		code: function () {
			return new dlg.inputbox(
				new input({ type: "select", option: sample.optionitem(), name: "value" }),
				"This is example inputbox select",
				function (event, data) {
					new toast("i", `Result from dlg.inputbox is : ${JSON.stringify(data)}`).show();
				},
				{ debug: true } //this last argument is for this documentation preview only
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
									new toast("/", `You give <b>${data.value}</b> in inputbox`).show();
								},
								function (event) {
									new toast("x", `You not give anything in inputbox`).show();
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
		viewclass: "cl-modal-preview",
		sample: { "sample.form": sample.form },
		code: function () {
			return new dlg.inputbox(
				sample.form(),
				null,
				function (event, data) {
					new toast("/", `You give <b>${JSON.stringify(data)}</b> in inputbox`).show();
				},
				{ debug: true } //this last argument is for this documentation preview only
			);
		},
	},

	{
		title: "Inputbox with multiple input live",
		msg: "First agrument can handle type {{[new input()]}}.",
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
							icon: "fire",
							title: "Result",
							elem: `${JSON.stringify(data)}`,
						}).show();
					}).show();
				},
			});
		},
	},

	{
		title: "Confirmbox",
		msg: "Below is a static modal example (meaning its position and display have been overridden). Included are the modal header, modal body (required for padding), and modal footer (optional). We ask that you include modal headers with dismiss actions whenever possible, or provide another explicit dismiss action.",
		viewclass: "cl-modal-preview",
		code: function () {
			return new dlg.confirmbox(
				"?",
				"This is example msgbox with <b>Okay and Cancel</b> button",
				function () {
					new toast("i", "Callback").show();
				},
				{ debug: true } //this last argument is for this documentation preview only
			);
		},
	},

	{
		title: "Simple confirmbox live",
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
						new dlg.confirmbox(i.icon, `This is example confirmbox with <b>${i.icon}</b> icon`, [
							{
								label: "Yes",
								onclick: function () {
									new toast("/", "After user click <b>Yes</b> button").show();
								},
							},
							{
								label: "No",
								onclick: function () {
									new toast("x", "After user not click <b>No</b> button").show();
								},
							},
						]).show();
					},
				});
			});
		},
	},

	{
		title: "Dialog box",
		msg: "Below is a static modal example (meaning its position and display have been overridden). Included are the modal header, modal body (required for padding), and modal footer (optional). We ask that you include modal headers with dismiss actions whenever possible, or provide another explicit dismiss action.",
		viewclass: "cl-modal-preview",
		code: function () {
			return new modal({
				title: "Modal title",
				elem: "Modal body text goes here.",
				button: ["Save changes", "Close"],
				debug: true, //this last option is for this documentation preview only
			});
		},
	},

	{
		title: "Live example",
		code: function () {
			return new button({
				label: "Show live modal dialog",
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
		viewclass: "cl-modal-preview",
		code: function () {
			return new modal({
				title: "Modal title",
				elem: "Modal body text goes here.",
				button: [
					{
						label: "Save changes",
						onclick: function (event, data) {
							new toast("i", `Result from dialog is <b>${JSON.stringify(data)}</b>`).show();
						},
					},
					"Close",
				],
				footer: new input({ type: "switch", name: "showagain", label: "Show again" }),
				debug: true, //this last option is for this documentation preview only
			});
		},
	},

	{
		title: "Disable static backdrop",
		code: function () {
			return new button({
				label: "Show live modal dialog",
				color: "primary",
				onclick: function () {
					new modal({
						static: false,
						title: "Modal title",
						elem: "By default, modal dialog will not close if you click outside or press escape key. To allow modal dialog to close when click outside or press escape key, set <code>static: false</code> option",
						button: [
							{
								label: "Understand",
								onclick: function (event, data) {
									new toast("i", `Result from dialog is <b>${JSON.stringify(data)}</b>`).show();
								},
							},
							"Close",
						],
					}).show();
				},
			});
		},
	},

	{
		title: "Disable scrolling long content",
		sample: { "sample.text": sample.text },
		code: function () {
			return new button({
				label: "Show live modal dialog",
				color: "primary",
				onclick: function () {
					new modal({
						scrollable: false,
						title: "Modal title",
						elem: [
							new p({
								elem: "By default, modal dialog will activate scrolling inside modal dialog. To disabled it, set <code>scrollable: false</code> option.",
							}),
							new p(sample.text()),
							new p(sample.text()),
							new p(sample.text()),
							new p(sample.text()),
							new p(sample.text()),
							new p(sample.text()),
						],
						button: [
							{
								label: "Understand",
								onclick: function (event, data) {
									new toast("i", `Result from dialog is <b>${JSON.stringify(data)}</b>`).show();
								},
							},
							"Close",
						],
					}).show();
				},
			});
		},
	},

	{
		title: "Disable vertically centered",
		code: function () {
			return new button({
				label: "Show live modal dialog",
				color: "primary",
				onclick: function () {
					new modal({
						center: false,
						title: "Modal title",
						elem: "By default, modal dialog will vertically centered when shown. To disabled it, set <code>center: false</code> option.",
						button: [
							{
								label: "Save changes",
								onclick: function (event, data) {
									new toast("i", `Result from dialog is <b>${JSON.stringify(data)}</b>`).show();
								},
							},
							"Close",
						],
					}).show();
				},
			});
		},
	},

	{
		title: "Custom button",
		viewclass: "cl-modal-preview",
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
							new toast("i", `Result from dialog is <b>${JSON.stringify(data)}</b>`).show();
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
				debug: true, //this last option is for this documentation preview only
			});
		},
	},

	{
		title: "Tooltips and popovers",
		code: function () {
			return new button({
				label: "Show live modal dialog",
				color: "primary",
				onclick: function () {
					new modal({
						title: "Modal title",
						elem: [
							new h({ level: 5, elem: "Popover in a modal" }),
							new p({
								elem: [
									"This ",
									new tooltip({
										type: "popover",
										placement: "right",
										title: "Popover title",
										msg: "Popover body content is set in this attribute.",
										elem: new button({
											color: "secondary",
											label: "button",
										}),
									}),
									" triggers a popover on click.",
								],
							}),
							new hr(),
							new h({ level: 5, elem: "Tooltips in a modal" }),
							new p({
								elem: [
									new tooltip({
										type: "tooltip",
										msg: "Tooltip for link 1",
										elem: new a({
											href: "#",
											label: "This link",
										}),
									}),
									" and ",
									new tooltip({
										type: "tooltip",
										msg: "Tooltip for link 2",
										elem: new a({
											href: "#",
											label: "that link",
										}),
									}),
									" have tooltips on hover.",
								],
							}),
						],
						button: ["Save change", "Close"],
					}).show();
				},
			});
		},
	},

	{
		title: "Using the grid",
		code: function () {
			return new button({
				label: "Show live modal dialog",
				color: "primary",
				onclick: function () {
					new modal({
						title: "Grids in modal",
						elem: new div("container-fluid cl-highlight-col", [
							new div("row", [
								new div("col-md-4", ".col-md-4"),
								new div("col-md-4 ms-auto", ".col-md-4 .ms-auto"),
							]),
							new div("row", [
								new div("col-md-3 ms-auto", ".col-md-3 .ms-auto"),
								new div("col-md-2 ms-auto", ".col-md-2 .ms-auto"),
							]),
							new div("row", new div("col-md-6 ms-auto", ".col-md-6 .ms-auto")),
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
					}).show();
				},
			});
		},
	},

	{
		title: "Using the grid (Direct HTML)",
		code: function () {
			return new button({
				label: "Show live modal dialog",
				color: "primary",
				onclick: function () {
					new modal({
						title: "Grids in modal",
						elem: `<div class="container-fluid cl-highlight-col"><div class="row"><div class="col-md-4">.col-md-4</div><div class="col-md-4 ms-auto">.col-md-4 .ms-auto</div></div><div class="row"><div class="col-md-3 ms-auto">.col-md-3 .ms-auto</div><div class="col-md-2 ms-auto">.col-md-2 .ms-auto</div></div><div class="row"><div class="col-md-6 ms-auto">.col-md-6 .ms-auto</div></div><div class="row"><div class="col-sm-9">Level 1: .col-md-9<div class="row"><div class="col-8 col-sm-6">Level 2: .col-8 .col-sm-6</div><div class="col-4 col-sm-6">Level 2: .col-4 .col-sm-6</div></div></div></div></div>`,
						button: ["Save change", "Close"],
					}).show();
				},
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
					onclick: function () {
						sample.dlgFn("@mdo");
					},
				}),
				new button({
					label: "Message for @fat",
					color: "primary",
					onclick: function () {
						sample.dlgFn("@fat");
					},
				}),
				new button({
					label: "Message for @getbootstrap",
					color: "primary",
					onclick: function () {
						sample.dlgFn("@getbootstrap");
					},
				}),
			];
		},
	},

	{
		title: "Toggle between modals",
		code: function () {
			var dlgFirstModal = function () {
				new modal({
					title: "Modal 1",
					elem: "Show a second modal and close this one with the button below.",
					button: {
						label: "Show second modal",
						onclick: function () {
							dlgSecondModal();
						},
					},
				}).show();
			};

			var dlgSecondModal = function () {
				new modal({
					title: "Modal 2",
					elem: "Close this modal and show the first with the button below.",
					button: {
						label: "Show first modal",
						onclick: function () {
							dlgFirstModal();
						},
					},
				}).show();
			};

			return new button({
				label: "Show first modal",
				color: "primary",
				onclick: function () {
					dlgFirstModal();
				},
			});
		},
	},

	{
		title: "Remove animation",
		code: function () {
			return new button({
				label: "Show live modal dialog",
				color: "primary",
				onclick: function () {
					new modal({
						animate: false,
						title: "Modal title",
						elem: "Dialog without fade effect",
						button: "Okay",
					}).show();
				},
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
					onclick: function () {
						sample.dlgSizeFn("xl");
					},
				}),
				new button({
					label: "Large modal",
					color: "primary",
					onclick: function () {
						sample.dlgSizeFn("lg");
					},
				}),
				new button({
					label: "Small modal",
					color: "primary",
					onclick: function () {
						sample.dlgSizeFn("sm");
					},
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
					onclick: function () {
						sample.dlgFullscreenFn(true);
					},
				}),
				new button({
					label: "Full screen below sm",
					color: "primary",
					onclick: function () {
						sample.dlgFullscreenFn("sm-down");
					},
				}),
				new button({
					label: "Full screen below md",
					color: "primary",
					onclick: function () {
						sample.dlgFullscreenFn("md-down");
					},
				}),
				new button({
					label: "Full screen below lg",
					color: "primary",
					onclick: function () {
						sample.dlgFullscreenFn("lg-down");
					},
				}),
				new button({
					label: "Full screen below xl",
					color: "primary",
					onclick: function () {
						sample.dlgFullscreenFn("xl-down");
					},
				}),
				new button({
					label: "Full screen below xxl",
					color: "primary",
					onclick: function () {
						sample.dlgFullscreenFn("xxl-down");
					},
				}),
			];
		},
	},
];
