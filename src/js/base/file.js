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

// //file contorl (upload,download,view,save)
// //author: printf83@gmail.com (c) 2020 - 2021

// (function (ns) {
// 	ns.file = {
// 		ctl: function (opt) {
// 			//create control to handle file
// 			//[preview|delete|upload] if has value
// 			//[upload] if no value

// 			//create hidden input that keep value and name
// 			//show button base on value (3 button or one button)
// 			//this control should has option like ns.input()

// 			opt = $.extend(
// 				{},
// 				{
// 					id: null,
// 					name: null,
// 					class: null,
// 					label: null,
// 					readonly: false,
// 					disabled: false,
// 					multiple: false,
// 					size: "col-12",
// 					value: null,
// 					onchange: null,
// 					valid: null,
// 					invalid: null,
// 					accept: "image/gif,image/bmp,image/x-windows-bmp,image/jpeg,image/png,application/pdf,application/zip,application/json,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain,text/html",
// 				},
// 				opt
// 			);

// 			//generate id
// 			opt.id = opt.id ? opt.id : ns.core.UUID();

// 			//generate label
// 			var lbl = [];
// 			if (opt.label) {
// 				lbl.push({
// 					tag: "label",
// 					class: "form-label",
// 					attr: { for: opt.id },
// 					elems: opt.label,
// 				});
// 			}

// 			//generate control
// 			var ctl = [];

// 			//create main control to handle value
// 			ctl.push({
// 				tag: "input",
// 				class: [opt.class],
// 				attr: {
// 					id: opt.id,
// 					name: opt.name,
// 					type: "hidden",
// 					readonly: opt.readonly,
// 					disabled: opt.disabled,
// 					value: opt.value,
// 					onchange: ["ns.file.fn.onchange(this);", opt.onchange ? opt.onchange : null].combine(""),
// 					"data-ns-accept": opt.accept,
// 					"data-ns-multiple": opt.multiple,
// 				},
// 				elems: null,
// 			});

// 			//add button base on value
// 			ctl.push(
// 				ns.div(
// 					"row",
// 					ns.btngroup([
// 						ns.button({
// 							id: `${opt.id}-view`,
// 							label: "View",
// 							icon: "eye",
// 							color: opt.value ? "success" : "secondary",
// 							class: "w-100",
// 							disabled: opt.value ? false : true,
// 							onclick: "ns.file.fn.onview(this)",
// 						}),

// 						ns.button({
// 							id: `${opt.id}-delete`,
// 							icon: "times",
// 							color: opt.value ? "danger" : "secondary",
// 							class: "w-0",
// 							disabled: opt.disabled ? true : opt.readonly ? true : opt.value ? false : true,
// 							onclick: "ns.file.fn.ondelete(this)",
// 						}),

// 						ns.button({
// 							id: `${opt.id}-upload`,
// 							icon: "upload",
// 							color: "primary",
// 							class: "w-0",
// 							disabled: opt.disabled ? true : opt.readonly ? true : false,
// 							onclick: "ns.file.fn.onupload(this)",
// 						}),
// 					])
// 				)
// 			);

// 			//valid message
// 			if (opt.valid) {
// 				ctl.push(ns.div("valid-feedback", opt.valid));
// 			}

// 			//invalid message
// 			if (opt.invalid) {
// 				ctl.push(ns.div("invalid-feedback", opt.invalid));
// 			}

// 			var res = [];
// 			if (opt.size) {
// 				res = [ns.div(opt.size, lbl.concat(ctl))];
// 			} else {
// 				res = lbl.concat(ctl);
// 			}

// 			//return fn.gen(res);
// 			return ns.div("file-upload-controller", res);
// 		},
// 		upload: function (opt) {
// 			return new Promise((res, rej) => {
// 				var id = ns.core.UUID();

// 				opt = $.extend(
// 					{},
// 					{
// 						accept: "image/gif,image/bmp,image/x-windows-bmp,image/jpeg,image/png,application/pdf,application/zip,application/json,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain,text/html",
// 						multiple: false,
// 						cancelafter: 180000, //3minute
// 					},
// 					opt
// 				);

// 				ns.build.append(document.body, {
// 					tag: "input",
// 					attr: {
// 						id: id,
// 						type: "file",
// 						multiple: opt.multiple,
// 						accept: opt.accept ? opt.accept : null,
// 					},
// 					style: { display: "none" },
// 				});

// 				$(`#${id}`).change(function () {
// 					//add class to mark upload in progress
// 					$(this).addClass("upload-in-progress");

// 					ns.api
// 						.upload({
// 							obj: $(`#${id}`),
// 							progress: function (percent) {},
// 						})
// 						.then((data) => {
// 							res(data);
// 							$(`#${id}`).remove();
// 						})
// 						.catch((err) => {
// 							rej(err);
// 						});
// 				});

// 				$(`#${id}`).trigger("click");

// 				//set timer to remove uploader if noting in progress in opt.cancelafter
// 				if (opt.cancelafter > 0) {
// 					setTimeout(
// 						function (id) {
// 							if (!$(id).hasClass("upload-in-progress")) {
// 								//var cancelafterinminute = +parseFloat(opt.cancelafter / 60000).toFixed(1);
// 								// ns.toast(
// 								// 	"!",
// 								// 	[
// 								// 		"Upload canceled after no response for ",
// 								// 		cancelafterinminute,
// 								// 		" minute",
// 								// 		cancelafterinminute > 1 ? "s" : null,
// 								// 	].combine("")
// 								// );
// 								$(id).remove();
// 							}
// 						},
// 						opt.cancelafter,
// 						`#${id}`
// 					);
// 				}
// 			});
// 		},
// 		save: function (fileId) {
// 			return new Promise((res, rej) => {
// 				if (fileId) {
// 					if (typeof fileId === "string") {
// 						ns.file
// 							.save([fileId])
// 							.then((data) => {
// 								res(data);
// 							})
// 							.catch((err) => {
// 								rej(err);
// 							});
// 					} else {
// 						ns.api
// 							.put({
// 								name: `file/${fileId.combine(",")}`,
// 							})
// 							.then((data) => {
// 								res(data);
// 							})
// 							.catch((err) => {
// 								rej(err);
// 							});
// 					}
// 				} else {
// 					rej();
// 				}
// 			});
// 		},
// 		delete: function (fileId) {
// 			return new Promise((res, rej) => {
// 				if (fileId) {
// 					if (typeof fileId === "string") {
// 						ns.file
// 							.delete([fileId])
// 							.then((data) => {
// 								res(data);
// 							})
// 							.catch((err) => {
// 								rej(err);
// 							});
// 					} else {
// 						ns.api
// 							.delete({
// 								name: `file/${fileId.combine(",")}`,
// 							})
// 							.then((data) => {
// 								res(data);
// 							})
// 							.catch((err) => {
// 								rej(err);
// 							});
// 					}
// 				} else {
// 					rej();
// 				}
// 			});
// 		},
// 		info: function (fileId) {
// 			return new Promise((res, rej) => {
// 				if (fileId) {
// 					if (typeof fileId === "string") {
// 						ns.file
// 							.info([fileId])
// 							.then((data) => {
// 								res(data);
// 							})
// 							.catch((err) => {
// 								rej(err);
// 							});
// 					} else {
// 						ns.api
// 							.get({
// 								name: `file-info/${fileId.combine(",")}`,
// 							})
// 							.then((data) => {
// 								res(data);
// 							})
// 							.catch((err) => {
// 								rej(err);
// 							});
// 					}
// 				} else {
// 					rej();
// 				}
// 			});
// 		},
// 		download: function (fileId, fileName) {
// 			var id = ns.core.UUID();

// 			ns.build.append(document.body, {
// 				tag: "a",
// 				attr: {
// 					id: id,
// 					href: `api/file/${fileId}`,
// 					download: fileName ? fileName : null,
// 					hidden: true,
// 				},
// 			});

// 			$(`#${id}`)[0].click();
// 			setTimeout(
// 				function (id) {
// 					$(`#${id}`).remove();
// 				},
// 				300,
// 				id
// 			);
// 		},
// 		view: function (fileId, sender) {
// 			if (fileId) {
// 				if (typeof fileId === "string") {
// 					return ns.file.view([fileId], sender);
// 				} else {
// 					//get file information
// 					ns.loading
// 						.start(sender)
// 						.then(() => {
// 							return ns.file.info(fileId);
// 						})
// 						.then((data) => {
// 							ns.loading.stop(sender);
// 							if (data) {
// 								if (data.length === 1) {
// 									//if only one file
// 									//preview : "image/gif,image/bmp,image/x-windows-bmp,image/jpeg,image/png,
// 									//download : application / pdf, application / zip, application / json, application / vnd.openxmlformats - officedocument.spreadsheetml.sheet, application / vnd.openxmlformats - officedocument.wordprocessingml.document, text / plain, text / html";
// 									switch (data[0].mimetype) {
// 										case "image/png":
// 										case "image/jpeg":
// 										case "image/gif":
// 										case "image/bmp":
// 										case "image/x-windows-bmp":
// 											//if picture. do preview

// 											ns.dlg.box({
// 												title: null,
// 												button: null,
// 												static: false,
// 												size: "lg",
// 												elems: ns.div([
// 													{
// 														tag: "img",
// 														class: "img-fluid mx-auto d-block rounded btn p-0",
// 														attr: {
// 															"data-ns-src": `api/file/${data[0].id}`,
// 															onclick: `ns.file.download('${data[0].id}','${data[0].filename}');`,
// 														},
// 													},
// 												]),
// 											});

// 											break;

// 										default:
// 											//if other. do download
// 											ns.file.download(data[0].id, data[0].filename);

// 											break;
// 									}
// 								} else {
// 									//if multiple file
// 									//change size base on img count
// 									var thumbnailsize = 12;
// 									switch (data.length) {
// 										case 1:
// 											thumbnailsize = 12;
// 											break;
// 										case 2:
// 											thumbnailsize = 6;
// 											break;
// 										case 3:
// 											thumbnailsize = 4;
// 											break;
// 										default:
// 											thumbnailsize = 3;
// 									}

// 									//create preview base on file type
// 									var prv = [];

// 									data.forEach((item) => {
// 										switch (item.mimetype) {
// 											case "image/png":
// 											case "image/jpeg":
// 											case "image/gif":
// 											case "image/bmp":
// 											case "image/x-windows-bmp":
// 												//if picture. do preview
// 												prv.push(
// 													ns.div(
// 														`col-${thumbnailsize}`,
// 														ns.div(
// 															"btn border p-1",
// 															{
// 																onclick: `ns.file.download('${data[0].id}','${data[0].filename}');`,
// 															},
// 															{
// 																tag: "img",
// 																class: "img-fluid mx-auto d-block rounded",
// 																attr: {
// 																	"data-ns-src": `api/file/${item.id}`,
// 																},
// 															}
// 														)
// 													)
// 												);
// 												break;

// 											default:
// 												prv.push(
// 													ns.div(
// 														`d-flex align-items-stretch col-${thumbnailsize}`,
// 														ns.div(
// 															"btn border p-1 d-flex justify-content-center w-100",
// 															{
// 																onclick: `ns.file.download('${data[0].id}','${data[0].filename}');`,
// 															},
// 															ns.span(
// 																"align-self-center",
// 																ns.icon({
// 																	icon: "download",
// 																	size: "2x",
// 																})
// 															)
// 														)
// 													)
// 												);
// 												break;
// 										}
// 									});

// 									ns.dlg.box({
// 										title: null,
// 										button: null,
// 										static: false,
// 										size: "lg",
// 										elems: ns.div(
// 											"container p-0",
// 											ns.div("d-flex justify-content-center row g-3", prv)
// 										),
// 									});
// 								}
// 							}
// 						})
// 						.catch((err) => {
// 							ns.loading.stop(sender);
// 						});
// 				}
// 			}
// 		},
// 	};
// })(ns);
