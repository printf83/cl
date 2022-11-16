"use strict";

//disable this if you not using webpack
import css from "./css/file.css";
//-------------------------------------

import * as core from "./core.js";
import * as db from "./api.js";

import div from "./div.js";
import btngroup from "./btngroup.js";
import button from "./button.js";
import label from "./label.js";
import modal from "./modal.js";
import icon from "./icon.js";
import span from "./span.js";
import img from "./img.js";
import input from "./input.js";
import tag from "./tag.js";

const defaultOption = {
	label: null,
	labelsize: null,
	hidelabel: false,
	readonly: false,
	disabled: false,
	multiple: false,
	value: null,
	weight: null,
	accept: "image/gif,image/bmp,image/x-windows-bmp,image/jpeg,image/png,application/pdf,application/zip,application/json,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain,text/html",

	uploadlabel: "Upload",
	uploadicon: "arrow-up-from-bracket",
	uploadcolor: "primary",
	viewlabel: "View",
	viewicon: "eye",
	viewcolor: "success",
	deletelabel: null,
	deleteicon: "times",
	deletecolor: "danger",
	downloadicon: { icon: "arrow-right-to-bracket", rotate: 90, weight: "2x", color: "muted" },

	uploadsignin: true,
	downloadsignin: false,
};

let db_opt = {};

const fn = {
	onview: (event) => {
		let sender = event.currentTarget;
		let container = sender.closest("div[data-cl-container]");
		let id = container.getAttribute("data-cl-container");
		let ctl = container.parentNode.querySelectorAll(`#${id}`)[0];
		let value = ctl.value;
		let opt = db_opt[id];

		if (value) {
			db.file.info(
				value,
				(data) => {
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
										icon: null,
										title: null,
										button: null,
										static: false,
										size: "md",
										bodyclass: "p-1",
										elem: new img({
											container: "fluid",
											width: 100,
											marginX: "auto",
											display: "block",
											rounded: true,
											padding: 0,
											"data-cl-file": data[0].id,
											src: db.file.url(data[0].id),
											click: (event) => {
												let sender = event.currentTarget;
												let fileid = sender.getAttribute("data-cl-file");

												if (opt.downloadsignin) {
													db.user.info({ sender: sender }, (info) => {
														if (info) {
															db.file.download(fileid, sender);
														}
													});
												} else {
													db.file.download(fileid, sender);
												}
											},
										}),
									}).show();

									break;

								default:
									//if other. do download

									if (opt.downloadsignin) {
										db.user.info({ sender: sender }, (info) => {
											if (info) {
												db.file.download(data[0].id, sender);
											}
										});
									} else {
										db.file.download(data[0].id, sender);
									}

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
											new div({
												col: thumbnailsize,
												padding: 0,
												elem: new div({
													class: "btn",
													padding: 1,
													border: true,
													"data-cl-file": i.id,
													click: (event) => {
														let sender = event.currentTarget;
														let fileid = sender.getAttribute("data-cl-file");

														if (opt.downloadsignin) {
															db.user.info({ sender: sender }, (info) => {
																if (info) {
																	db.file.download(fileid, sender);
																}
															});
														} else {
															db.file.download(fileid, sender);
														}
													},
													elem: new img({
														container: "fluid",
														marginX: "auto",
														display: "block",
														rounded: true,
														src: db.file.url(i.id),
													}),
												}),
											})
										);
										break;

									default:
										list.push(
											new div({
												display: "flex",
												alignItem: "stretch",
												col: thumbnailsize,
												padding: 0,
												elem: new div({
													border: true,
													padding: 5,
													display: "flex",
													justifyContent: "center",
													class: "btn",
													width: 100,
													"data-cl-file": i.id,
													click: (event) => {
														let sender = event.currentTarget;
														let fileid = sender.getAttribute("data-cl-file");

														if (opt.downloadsignin) {
															db.user.info({ sender: sender }, (info) => {
																if (info) {
																	db.file.download(fileid, sender);
																}
															});
														} else {
															db.file.download(fileid, sender);
														}
													},
													elem: new span({
														alignSelf: "center",
														elem:
															typeof opt.downloadicon === "object"
																? new icon(opt.downloadicon)
																: new icon({
																		icon: opt.downloadicon,
																		color: "muted",
																		weight: "2x",
																  }),
													}),
												}),
											})
										);

										break;
								}
							});

							new modal({
								icon: null,
								title: null,
								button: null,
								static: false,
								size: "lg",
								elem: new div({
									container: true,
									padding: 0,
									elem: new div({
										display: "flex",
										justifyContent: "center",
										row: true,
										gap: 3,
										elem: list,
									}),
								}),
							}).show();
						}
					}
				},
				sender
			);
		}
	},
	onchange: (event) => {
		let ctl = event.currentTarget;
		let container = ctl.parentNode.parentNode;
		let btngroup = container.querySelectorAll(".btn-group")[0];
		let id = ctl.getAttribute("id");
		let opt = db_opt[id];
		let value = ctl.value;

		if (value) {
			//remove btn upload
			let btnupload = btngroup.querySelectorAll(`#${id}_upload`)[0];
			core.removeElement(btnupload);

			//add btn view
			core.appendChild(
				btngroup,
				new button({
					id: `${id}_view`,
					label: opt.viewlabel,
					icon: opt.viewicon,
					color: opt.viewcolor,
					width: 100,
					click: fn.onview,
				})
			);

			//add btn delete
			core.appendChild(
				btngroup,
				new button({
					id: `${id}_delete`,
					label: opt.deletelabel,
					icon: opt.deleteicon,
					color: opt.deletecolor,
					width: 0,
					disabled: opt.disabled ? true : opt.readonly ? true : false,
					click: fn.ondelete,
				})
			);
		} else {
			let btnview = btngroup.querySelectorAll(`#${id}_view`)[0];
			let btndelete = btngroup.querySelectorAll(`#${id}_delete`)[0];

			core.removeElement(btnview);
			core.removeElement(btndelete);

			//add btn upload
			core.appendChild(
				btngroup,
				new button({
					id: `${id}_upload`,
					label: opt.uploadlabel,
					icon: opt.uploadicon,
					color: opt.uploadcolor,
					width: 100,
					disabled: opt.disabled ? true : opt.readonly ? true : false,
					click: fn.onupload,
				})
			);
		}
	},
	ondelete: (event) => {
		let sender = event.currentTarget;
		let container = sender.closest("div[data-cl-container]");
		let id = container.getAttribute("data-cl-container");
		let ctl = container.parentNode.querySelectorAll(`#${id}`)[0];

		//just make null
		ctl.value = null;
		ctl.dispatchEvent(new Event("change"));
	},
	startupload: (sender, btnupload, ctl, fu, opt) => {
		//append div into button
		core.appendChild(
			sender,
			new span({
				id: `${fu}-progress`,
				class: "cl-fu-progress",
			})
		);

		//append file uploader into document
		core.appendChild(
			document.body,
			new input({
				type: "file",
				id: fu,
				multiple: opt.multiple,
				accept: opt.accept ? opt.accept : null,
				disply: "none",
				onchange: (event) => {
					let sender = event.currentTarget;
					let id = sender.getAttribute("id");
					let data = sender.files;

					db.file.upload(
						data,
						(percentComplete) => {
							let fuprg = document.getElementById(`${id}-progress`);
							fuprg.style.width = `${percentComplete}%`;
						},
						(data) => {
							core.removeElement(sender);
							ctl.value = data;
							ctl.dispatchEvent(new Event("change"));
						},
						btnupload
					);
				},
			})
		);

		document.getElementById(fu).click();
	},
	onupload: (event) => {
		let sender = event.currentTarget;
		let btnupload = sender;
		let container = sender.closest("div[data-cl-container]");
		let id = container.getAttribute("data-cl-container");
		let opt = db_opt[id];
		let ctl = container.parentNode.querySelectorAll(`#${id}`)[0];

		let fu = core.UUID();

		if (opt.uploadsignin) {
			db.user.info({ sender: sender }, (info) => {
				if (info) {
					fn.startupload(sender, btnupload, ctl, fu, opt);
				}
			});
		} else {
			fn.startupload(sender, btnupload, ctl, fu, opt);
		}
	},
	onsave: (element, callback, sender) => {
		if (element) {
			let value = element.value;
			if (value) {
				db.file.save(
					value,
					(data) => {
						if (typeof callback === "function") {
							callback(data);
						}
					},
					sender
				);
			}
		} else {
			if (typeof callback === "function") {
				callback(null);
			}
		}
	},
	onsavevalue: (value, callback, sender) => {
		if (value) {
			db.file.save(
				value,
				(data) => {
					if (typeof callback === "function") {
						callback(data);
					}
				},
				sender
			);
		} else {
			if (typeof callback === "function") {
				callback(null);
			}
		}
	},
};

export default class file extends div {
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
						? core.multiClass(opt.labelsize, {
								format: "col-$1",
								formatTrue: "col",
								formatValue: "col-form-label",
						  })
						: "form-label",
				})
			);
		}

		//create main control to handle value
		ctl.push(
			new input({
				id: id,
				name: opt.name,
				type: "hidden",
				onchange: fn.onchange,
				readonly: opt.readonly,
				disabled: opt.disabled,
				value: opt.value,
			})
		);

		//add button base on value
		ctl.push(
			new div({
				row: true,
				"data-cl-container": id,
				elem: new btngroup({
					weight: opt.weight,
					elem: opt.value
						? [
								new button({
									id: `${id}_view`,
									label: opt.viewlabel,
									icon: opt.viewicon,
									color: opt.viewcolor,
									width: 100,
									click: fn.onview,
								}),
								new button({
									id: `${id}_delete`,
									label: opt.deletelabel,
									icon: opt.deleteicon,
									color: opt.deletecolor,
									width: "auto",
									disabled: opt.disabled ? true : opt.readonly ? true : false,
									click: fn.ondelete,
								}),
						  ]
						: [
								new button({
									id: `${id}_upload`,
									label: opt.uploadlabel,
									icon: opt.uploadicon,
									color: opt.uploadcolor,
									width: 100,
									disabled: opt.disabled ? true : opt.readonly ? true : false,
									click: fn.onupload,
								}),
						  ],
				}),
			})
		);

		db_opt[id] = {
			weight: opt.weight,

			multiple: opt.multiple,
			accept: opt.accept,

			readonly: opt.readonly,
			disabled: opt.disabled,

			uploadlabel: opt.uploadlabel,
			uploadicon: opt.uploadicon,
			uploadcolor: opt.uploadcolor,

			deletelabel: opt.deletelabel,
			deleteicon: opt.deleteicon,
			deletecolor: opt.deletecolor,

			viewlabel: opt.viewlabel,
			viewicon: opt.viewicon,
			viewcolor: opt.viewcolor,

			downloadicon: opt.downloadicon,

			uploadsignin: opt.uploadsignin,
			downloadsignin: opt.downloadsignin,
		};

		super.data = { elem: ctl };
	}

	static save(element, callback, sender) {
		if (typeof element === "string") {
			fn.onsavevalue(element, callback, sender);
		} else {
			fn.onsave(element, callback, sender);
		}
	}
}
