"use strict";
import * as core from "./core.js";
import * as db from "./api.js";

import tag from "./tag.js";
import div from "./div.js";
import btngroup from "./btngroup.js";
import button from "./button.js";
import label from "./label.js";
import modal from "./modal.js";
import icon from "./icon.js";
import span from "./span.js";
import img from "./img.js";

let db_opt = {};

const fn = {
	onview: function (event) {
		let sender = event.currentTarget;
		let container = sender.closest("div[data-cl-container]");
		let id = container.getAttribute("data-cl-container");
		let ctl = container.parentNode.querySelectorAll(`#${id}`)[0];
		let value = ctl.value;

		if (value) {
			db.file.info(value, function (data) {
				console.log(data);

				if (data) {
					if (data.length === 1) {
						//if only one file
						//preview : "image/gif,image/bmp,image/x-windows-bmp,image/jpeg,image/png,
						//download : application / pdf, application / zip, application / json, application / vnd.openxmlformats - officedocument.spreadsheetml.sheet, application / vnd.openxmlformats - officedocument.wordprocessingml.document, text / plain, text / html";
						switch (data[0].mimetype) {
							case "image/png":
							case "image/jpeg":
							case "image/gif":
							case "image/bmp":
							case "image/x-windows-bmp":
								//if picture. do preview

								new modal({
									title: null,
									button: null,
									static: false,
									size: "lg",
									elem: new img({
										class: "img-fluid mx-auto d-block rounded btn p-0",
										attr: {
											"data-cl-file": data[0].id,
										},
										src: db.file.url(data[0].id),
										onclick: function (event) {
											let sender = event.currentTarget;
											let fileid = sender.getAttribute("data-cl-file");
											db.file.download(fileid);
										},
									}),
								}).show();

								break;

							default:
								//if other. do download
								db.file.download(data[0].id);

								break;
						}
					} else {
						//if multiple file
						//change size base on img count
						let thumbnailsize = 12;
						switch (data.length) {
							case 1:
								thumbnailsize = 12;
								break;
							case 2:
								thumbnailsize = 6;
								break;
							case 3:
								thumbnailsize = 4;
								break;
							default:
								thumbnailsize = 3;
						}

						//create preview base on file type
						let list = [];

						data.forEach((i) => {
							switch (i.mimetype) {
								case "image/png":
								case "image/jpeg":
								case "image/gif":
								case "image/bmp":
								case "image/x-windows-bmp":
									//if picture. do preview
									list.push(
										new div(
											`col-${thumbnailsize}`,
											new div({
												class: "btn border p-1",
												attr: {
													"data-cl-file": i.id,
												},
												onclick: function (event) {
													let sender = event.currentTarget;
													let fileid = sender.getAttribute("data-cl-file");
													db.file.download(fileid);
												},
												elem: new img({
													class: "img-fluid mx-auto d-block rounded",
													src: db.file.url(i.id),
												}),
											})
										)
									);
									break;

								default:
									list.push(
										new div(
											`d-flex align-items-stretch col-${thumbnailsize}`,
											new div({
												class: "btn border p-1 d-flex justify-content-center w-100",
												attr: {
													"data-cl-file": i.id,
												},
												onclick: function (event) {
													let sender = event.currentTarget;
													let fileid = sender.getAttribute("data-cl-file");
													db.file.download(fileid);
												},
												elem: new span(
													"align-self-center",
													new icon({ icon: "download", weight: "2x" })
												),
											})
										)
									);

									break;
							}
						});

						new modal({
							title: null,
							button: null,
							static: false,
							size: "lg",
							elem: new div("container p-0", new div("d-flex justify-content-center row g-3", list)),
						}).show();
					}
				}
			});
		}
	},
	onchange: function (event) {
		let ctl = event.currentTarget;
		let container = ctl.parentNode;
		let btngroup = container.querySelectorAll(".btn-group")[0];
		let id = ctl.getAttribute("id");
		let opt = db_opt[id];
		let value = ctl.value;

		if (value) {
			//remove btn upload
			let btnupload = btngroup.querySelectorAll(`#${id}-upload`)[0];
			core.removeElement(btnupload);

			//add btn view
			core.appendChild(
				btngroup,
				new button({
					id: `${id}-view`,
					label: "View",
					icon: "eye",
					color: "success",
					class: "w-100",
					onclick: fn.onview,
				})
			);

			//add btn delete
			core.appendChild(
				btngroup,
				new button({
					id: `${id}-delete`,
					icon: "times",
					color: "danger",
					class: "w-0",
					disabled: opt.disabled ? true : opt.readonly ? true : false,
					onclick: fn.ondelete,
				})
			);
		} else {
			let btnview = btngroup.querySelectorAll(`#${id}-view`)[0];
			let btndelete = btngroup.querySelectorAll(`#${id}-delete`)[0];

			core.removeElement(btnview);
			core.removeElement(btndelete);

			//add btn upload
			core.appendChild(
				btngroup,
				new button({
					id: `${id}-upload`,
					icon: "upload",
					label: "Upload",
					color: "primary",
					class: "w-100",
					disabled: opt.disabled ? true : opt.readonly ? true : false,
					onclick: fn.onupload,
				})
			);
		}
	},
	ondelete: function (event) {
		let sender = event.currentTarget;
		let container = sender.closest("div[data-cl-container]");
		let id = container.getAttribute("data-cl-container");
		let ctl = container.parentNode.querySelectorAll(`#${id}`)[0];

		db.file.delete(ctl.value, function (data) {
			ctl.value = null;
			ctl.dispatchEvent(new Event("change"));
		});
	},
	onupload: function (event) {
		let sender = event.currentTarget;
		let container = sender.closest("div[data-cl-container]");
		let id = container.getAttribute("data-cl-container");
		let opt = db_opt[id];
		let ctl = container.parentNode.querySelectorAll(`#${id}`)[0];

		let fu = core.UUID();
		core.appendChild(
			document.body,
			new tag({
				tag: "input",
				attr: {
					id: fu,
					type: "file",
					multiple: opt.multiple,
					accept: opt.accept ? opt.accept : null,
				},
				style: { display: "none" },
				onchange: function (event) {
					let sender = event.currentTarget;
					let data = sender.files;

					db.file.upload(data, null, function (data) {
						core.removeElement(sender);
						ctl.value = data;
						ctl.dispatchEvent(new Event("change"));
					});
				},
			})
		);

		document.getElementById(fu).click();
	},
};

const defaultOption = {
	tag: "div",

	label: null,
	labelsize: null,
	hidelabel: false,
	readonly: false,
	disabled: false,
	multiple: false,
	value: null,
	accept: "image/gif,image/bmp,image/x-windows-bmp,image/jpeg,image/png,application/pdf,application/zip,application/json,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain,text/html",
};

export default class file extends tag {
	constructor(opt) {
		super(opt);
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		opt = core.extend({}, defaultOption, opt);

		//generate id
		let id = opt.id || core.UUID();

		//generate control
		var ctl = [];

		//generate label
		if (opt.label && !opt.hidelabel) {
			ctl.push(
				new label({
					for: id,
					label: opt.label,
					class: opt.labelsize
						? ["col-form-label"].concat(core.multiClass(opt.labelsize, "col-$1", null, "col"))
						: "form-label",
				})
			);
		}

		//create main control to handle value
		ctl.push(
			new tag({
				tag: "input",
				id: id,
				name: opt.name,
				onchange: fn.onchange,
				attr: {
					type: "hidden",
					readonly: opt.readonly,
					disabled: opt.disabled,
					value: opt.value,
				},
			})
		);

		//add button base on value
		ctl.push(
			new div({
				row: true,
				attr: { "data-cl-container": id },
				elem: new btngroup(
					opt.value
						? [
								new button({
									id: `${id}-view`,
									label: "View",
									icon: "eye",
									color: "success",
									class: "w-100",
									onclick: fn.onview,
								}),
								new button({
									id: `${id}-delete`,
									icon: "times",
									color: "danger",
									class: "w-0",
									disabled: opt.disabled ? true : opt.readonly ? true : false,
									onclick: fn.ondelete,
								}),
						  ]
						: [
								new button({
									id: `${id}-upload`,
									icon: "upload",
									label: "Upload",
									color: "primary",
									class: "w-100",
									disabled: opt.disabled ? true : opt.readonly ? true : false,
									onclick: fn.onupload,
								}),
						  ]
				),
			})
		);

		db_opt[id] = {
			multiple: opt.multiple,
			accept: opt.accept,
		};

		super.data = { elem: ctl };
	}
}
