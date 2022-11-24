"use strict";

import * as core from "./core.js";
import a from "./a.js";
import { signin as user_signin } from "./user.js";

// disable if ejs
import { axios } from "axios";

const defaultOption = {
	callback: (data) => {},
	type: "GET",
	url: null,
	data: null,
	// async: true,
	auth: true,
};

const defaultOptionPost = {
	callback: (data) => {},
	type: "POST",
	url: null,
	data: null,
	// async: true,
	auth: true,
};

const defaultOptionUpload = {
	callback: (data) => {},
	progress: null,
	type: "POST",
	url: null,
	data: null,
	// async: false,
	auth: true,
};

const defaultOptionDownload = {
	callback: (data) => {},
	type: "GET",
	url: null,
	data: null,
	// async: true,
	auth: true,
};

const fn = {
	str2Object: (value) => {
		if (value && value !== "") {
			try {
				return JSON.parse(value);
			} catch {
				return value;
			}
		}

		return null;
	},
	obj2String: (value) => {
		if (value) {
			try {
				return JSON.stringify(value);
			} catch {
				return value;
			}
		}

		return null;
	},
	sender: {
		islist: (sender) => {
			if (sender) {
				if (sender.getAttribute("data-key") && sender.getAttribute("data-name")) {
					return true;
				}
			}

			return false;
		},
		isfree: (sender) => {
			if (sender) {
				if (sender.classList?.contains("disabled") || sender.disabled === true) {
					return false;
				}
			}

			return true;
		},
		setbusy: (sender) => {
			if (sender) {
				sender.classList.add("disabled");
				sender.classList.add("wait");
				sender.setAttribute("disabled", "disabled");

				if (!fn.sender.islist(sender)) {
					//change icon
					let ico = sender.querySelectorAll("i");
					if (ico && ico.length > 0) {
						ico[0].setAttribute("data-old-class", ico[0].getAttribute("class"));
						ico[0].setAttribute("class", "fas fa-circle-notch fa-fw fa-spin");
					}
				}
			}
		},
		setfree: (sender) => {
			if (sender) {
				sender.classList.remove("disabled");
				sender.classList.remove("wait");
				sender.removeAttribute("disabled");

				if (!fn.sender.islist(sender)) {
					//change icon
					let ico = sender.querySelectorAll("i");
					if (ico && ico.length > 0) {
						ico[0].setAttribute("class", ico[0].getAttribute("data-old-class"));
						ico[0].setAttribute("data-old-class", null);
					}
				}
			}
		},
	},
	get: (opt) => {
		opt = core.extend({}, defaultOption, opt);

		let req = new XMLHttpRequest();
		req.onreadystatechange = () => {
			if (req.readyState == 4) {
				if (req.status == 200) {
					opt.callback(fn.str2Object(req.responseText));
				} else if (req.status === 401) {
					if (opt.auth) {
						new user_signin({
							callback: (result) => {
								if (result) {
									fn.get(opt);
								} else {
									opt.callback(null);
								}
							},
						}).show();
					} else {
						opt.callback(null);
					}
				} else {
					opt.callback(null);
				}
			}
		};
		req.open(opt.type, opt.url);
		req.setRequestHeader("Content-Type", "application/json");
		req.send(fn.obj2String(opt.data));

		// axios
		// 	.get(opt.url, opt.data, {
		// 		method: opt.type,
		// 		// headers: {
		// 		// 	"Content-Type": "application/json",
		// 		// },
		// 	})
		// 	.then((req) => {
		// 		if (req.status === 200) {
		// 			opt.callback(req.data);
		// 		} else if (req.status === 401) {
		// 			if (opt.auth) {
		// 				new user_signin({
		// 					callback: (result) => {
		// 						if (result) {
		// 							opt.callback(result);
		// 						} else {
		// 							opt.callback(null);
		// 						}
		// 					},
		// 				}).show();
		// 			} else {
		// 				opt.callback(null);
		// 			}
		// 		} else {
		// 			opt.callback(null);
		// 		}
		// 	})
		// 	.catch((err) => {
		// 		console.log(err);
		// 		opt.callback(null);
		// 	});
	},
	post: (opt) => {
		opt = core.extend({}, defaultOptionPost, opt);

		let req = new XMLHttpRequest();
		req.onreadystatechange = () => {
			if (req.readyState == 4) {
				if (req.status == 200) {
					opt.callback(fn.str2Object(req.responseText));
				} else if (req.status === 401) {
					if (opt.auth) {
						new user_signin({
							callback: (result) => {
								if (result) {
									fn.post(opt);
								} else {
									opt.callback(null);
								}
							},
						}).show();
					} else {
						opt.callback(null);
					}
				} else {
					opt.callback(null);
				}
			}
		};

		req.open(opt.type, opt.url);
		req.setRequestHeader("Content-Type", "application/json");
		req.send(fn.obj2String(opt.data));

		// axios
		// 	.post(opt.url, opt.data, {
		// 		method: opt.type,
		// 		headers: {
		// 			"Content-Type": "application/json",
		// 		},
		// 	})
		// 	.then((req) => {
		// 		if (req.status === 200) {
		// 			opt.callback(req.data);
		// 		} else if (req.status === 401) {
		// 			if (opt.auth) {
		// 				new user_signin({
		// 					callback: (result) => {
		// 						if (result) {
		// 							opt.callback(result);
		// 						} else {
		// 							opt.callback(null);
		// 						}
		// 					},
		// 				}).show();
		// 			} else {
		// 				opt.callback(null);
		// 			}
		// 		} else {
		// 			opt.callback(null);
		// 		}
		// 	})
		// 	.catch((err) => {
		// 		console.log(err);
		// 		opt.callback(null);
		// 	});
	},
	download: (url, filename) => {
		let id = core.UUID();

		//append file uploader into document
		core.appendChild(
			document.body,
			new a({
				id: id,
				href: url,
				download: filename,
			})
		);

		let ctl = document.getElementById(id);
		ctl.click();
		core.removeElement(ctl);
	},
	upload: (opt) => {
		opt = core.extend({}, defaultOptionUpload, opt);

		// let req = new XMLHttpRequest();

		// if (typeof opt.progress === "function") {
		// 	req.upload.onprogress = (e) => {
		// 		if (e.lengthComputable) {
		// 			var percentComplete = parseInt((e.loaded / e.total) * 100, 10);
		// 			opt.progress(percentComplete);
		// 		}
		// 	};

		// 	req.upload.onloadstart = () => {
		// 		opt.progress(0);
		// 	};
		// 	req.upload.onloadend = () => {
		// 		opt.progress(100);
		// 	};
		// }

		// req.onreadystatechange = () => {
		// 	if (req.readyState == 4) {
		// 		if (req.status == 200) {
		// 			opt.callback(fn.str2Object(req.responseText));
		// 		} else if (req.status === 401) {
		// 			if (opt.auth) {
		// 				new user_signin({
		// 					callback: (result) => {
		// 						if (result) {
		// 							fn.upload(opt);
		// 						} else {
		// 							opt.callback(null);
		// 						}
		// 					},
		// 				}).show();
		// 			} else {
		// 				opt.callback(null);
		// 			}
		// 		} else {
		// 			opt.callback(null);
		// 		}
		// 	}
		// };

		// req.open(opt.type, opt.url, opt.async);
		// req.send(fn.genfileformdata(opt.data));

		axios
			.post(opt.url, fn.genfileformdata(opt.data), {
				headers: {
					"Content-Type": "multipart/form-data",
				},
				onUploadProgress:
					typeof opt.progress === "function"
						? (e) => {
								var percentComplete = parseInt((e.loaded / e.total) * 100, 10);
								opt.progress(percentComplete);
						  }
						: null,
			})
			.then((req) => {
				if (req.status === 200) {
					opt.callback(req.data);
				} else if (req.status === 401) {
					if (opt.auth) {
						new user_signin({
							callback: (result) => {
								if (result) {
									fn.upload(opt);
								} else {
									opt.callback(null);
								}
							},
						}).show();
					} else {
						opt.callback(null);
					}
				} else {
					opt.callback(null);
				}
			})
			.catch((err) => {
				console.log(err);
				opt.callback(null);
			});
	},
	genformdata: (obj) => {
		if (obj) {
			const res = new FormData();
			Object.keys(obj).forEach((key) => res.append(key, obj[key]));
			return res;
		}
		return null;
	},
	genfileformdata: (files) => {
		let data = new FormData();
		for (let x = 0; x < files.length; x++) {
			data.append("file", files[x]);
		}
		return data;
	},
	getfilelength: (files) => {
		let result = 0;
		for (let x = 0; x < files.length; x++) {
			result += files[0].length;
		}

		return result;
	},
};

export const api = {
	create: (opt, callback) => {
		opt = core.extend(
			{},
			{
				name: null,
				data: null,
				sender: null,
			},
			opt
		);

		if (opt.name && opt.data) {
			if (fn.sender.isfree(opt.sender)) {
				fn.sender.setbusy(opt.sender);
				fn.post({
					callback: (result) => {
						fn.sender.setfree(opt.sender);
						if (typeof callback === "function") {
							callback(result);
						}
					},
					url: `api/${opt.name}`,
					data: opt.data,
				});
			}
		} else {
			console.error("opt name and data is required");
		}
	},
	load: (opt, callback) => {
		opt = core.extend(
			{},
			{
				name: null,
				id: null,
				sender: null,
			},
			opt
		);

		if (opt.name && opt.id) {
			if (fn.sender.isfree(opt.sender)) {
				fn.sender.setbusy(opt.sender);
				fn.get({
					callback: (result) => {
						fn.sender.setfree(opt.sender);
						if (typeof callback === "function") {
							callback(result);
						}
					},
					url: `api/${opt.name}/${Array.isArray(opt.id) ? opt.id.join(",") : opt.id}`,
				});
			}
		} else {
			console.error("opt name and id is required");
		}
	},
	update: (opt, callback) => {
		opt = core.extend(
			{},
			{
				name: null,
				id: null,
				data: null,
				sender: null,
			},
			opt
		);

		if (opt.name && opt.id && opt.data) {
			if (fn.sender.isfree(opt.sender)) {
				fn.sender.setbusy(opt.sender);
				fn.get({
					callback: (result) => {
						fn.sender.setfree(opt.sender);
						if (typeof callback === "function") {
							callback(result);
						}
					},
					type: "PUT",
					url: `api/${opt.name}/${Array.isArray(opt.id) ? opt.id.join(",") : opt.id}`,
					data: opt.data,
				});
			}
		} else {
			console.error("opt name, id and data is required");
		}
	},
	delete: (opt, callback) => {
		opt = core.extend(
			{},
			{
				name: null,
				id: null,
				sender: null,
			},
			opt
		);

		if (opt.name && opt.id) {
			if (fn.sender.isfree(opt.sender)) {
				fn.sender.setbusy(opt.sender);
				fn.get({
					callback: (result) => {
						fn.sender.setfree(opt.sender);
						if (typeof callback === "function") {
							callback(result);
						}
					},
					type: "DELETE",
					url: `api/${opt.name}/${Array.isArray(opt.id) ? opt.id.join(",") : opt.id}`,
				});
			}
		} else {
			console.error("opt name and id is required");
		}
	},
	list: (opt, callback) => {
		opt = core.extend(
			{},
			{
				name: null,
				data: null,
				sender: null,
			},
			opt
		);

		if (opt.name) {
			if (fn.sender.isfree(opt.sender)) {
				fn.sender.setbusy(opt.sender);
				fn.post({
					callback: (result) => {
						fn.sender.setfree(opt.sender);
						if (typeof callback === "function") {
							callback(result);
						}
					},
					url: `api/${opt.name}-list`,
					data: opt.data,
				});
			}
		} else {
			console.error("opt name is required");
		}
	},
	option: (opt, callback) => {
		opt = core.extend(
			{},
			{
				name: null,
				filter: null,
				limit: null,
				skip: null,
				fieldkey: "_id",
				fieldname: "name",
				emptylabel: null,
				sender: null,
			},
			opt
		);

		if (opt.name && opt.fieldkey && opt.fieldname) {
			if (fn.sender.isfree(opt.sender)) {
				fn.sender.setbusy(opt.sender);
				fn.post({
					callback: (result) => {
						if (result) {
							var tmp = result.data
								? result.data.map((i) => {
										return {
											value: i[opt.fieldkey],
											label: i[opt.fieldname],
										};
								  })
								: [];

							if (opt.emptylabel !== null) {
								tmp.unshift({ value: "", label: opt.emptylabel });
							}

							fn.sender.setfree(opt.sender);
							if (typeof callback === "function") {
								callback(tmp);
							}
						} else {
							fn.sender.setfree(opt.sender);
							if (typeof callback === "function") {
								callback(null);
							}
						}
					},
					url: `api/${opt.name}-list`,
					data: {
						filter: opt.filter,
						limit: opt.limit,
						skip: opt.skip,
						field: { [opt.fieldkey]: 1, [opt.fieldname]: 1 },
						sort: { [opt.fieldname]: 1 },
					},
				});
			}
		} else {
			console.error("opt name, fieldkey and fieldname is required");
		}
	},
	excel: (opt) => {
		opt = core.extend(
			{},
			{
				name: null,
				data: null,
				sender: null,
			},
			opt
		);

		if (opt.name) {
			if (fn.sender.isfree(opt.sender)) {
				fn.sender.setbusy(opt.sender);

				setTimeout(
					(sender) => {
						fn.sender.setfree(sender);
					},
					3000,
					opt.sender
				);

				window.location = api.url(opt.name, opt.data);
			}
		} else {
			console.error("opt name is required");
		}
	},
	url: (name, data) => {
		if (data) {
			return `api/${name}-excel/?q=${JSON.stringify(data)}`;
		} else {
			return `api/${name}-excel`;
		}
	},
	aggregate: (opt, callback) => {
		opt = core.extend(
			{},
			{
				name: null,
				data: null,
				sender: null,
			},
			opt
		);

		if (opt.name) {
			if (fn.sender.isfree(opt.sender)) {
				fn.sender.setbusy(opt.sender);
				fn.post({
					callback: (result) => {
						fn.sender.setfree(opt.sender);
						if (typeof callback === "function") {
							callback(result);
						}
					},
					url: `api/${opt.name}-aggregate`,
					data: opt.data,
				});
			}
		} else {
			console.error("opt name is required");
		}
	},
};

export const file = {
	upload: (file, progress, callback, sender) => {
		if (file) {
			if (fn.sender.isfree(sender)) {
				fn.sender.setbusy(sender);
				fn.upload({
					progress: progress,
					callback: (result) => {
						fn.sender.setfree(sender);
						if (typeof callback === "function") {
							callback(result);
						}
					},
					url: `/api/file`,
					data: file,
				});
			}
		} else {
			console.error("opt file is required");
		}
	},
	download: (id, sender) => {
		file.info(
			id,
			(data) => {
				if (data) {
					if (data.length === 1) {
						fn.download(file.url(data[0].id), data[0].filename);
					} else {
						//download one by one
						//TODO:write code
						console.warn("TODO:CODE");
					}
				}
			},
			sender
		);
	},
	url: (id) => {
		if (id) {
			return `api/file/${Array.isArray(id) ? id.join(",") : id}`;
		} else {
			console.error("opt id is required");
			return null;
		}
	},
	info: (id, callback, sender) => {
		if (id) {
			if (fn.sender.isfree(sender)) {
				fn.sender.setbusy(sender);
				fn.get({
					callback: (result) => {
						fn.sender.setfree(sender);
						if (typeof callback === "function") {
							callback(result);
						}
					},
					url: `/api/file-info/${Array.isArray(id) ? id.join(",") : id}`,
				});
			}
		} else {
			console.error("opt id is required");
		}
	},
	duplicate: (id, callback, sender) => {
		if (id) {
			if (fn.sender.isfree(sender)) {
				fn.sender.setbusy(sender);
				fn.get({
					callback: (result) => {
						fn.sender.setfree(sender);
						if (typeof callback === "function") {
							callback(result);
						}
					},
					url: `/api/file-duplicate/${Array.isArray(id) ? id.join(",") : id}`,
				});
			}
		} else {
			console.error("opt id is required");
		}
	},
	save: (id, callback, sender) => {
		if (id) {
			if (fn.sender.isfree(sender)) {
				fn.sender.setbusy(sender);
				fn.get({
					callback: (result) => {
						fn.sender.setfree(sender);
						if (typeof callback === "function") {
							callback(result);
						}
					},
					url: `/api/file/${Array.isArray(id) ? id.join(",") : id}`,
					type: "PUT",
				});
			}
		} else {
			console.error("opt id is required");
		}
	},
	delete: (id, callback, sender) => {
		if (id) {
			if (fn.sender.isfree(sender)) {
				fn.sender.setbusy(sender);

				fn.get({
					callback: (result) => {
						fn.sender.setfree(sender);
						if (typeof callback === "function") {
							callback(result);
						}
					},
					url: `/api/file/${Array.isArray(id) ? id.join(",") : id}`,
					type: "DELETE",
				});
			}
		} else {
			console.error("opt id is required");
		}
	},
};

export const user = {
	register: (opt, callback) => {
		opt = core.extend(
			{},
			{
				data: null,
				sender: null,
			},
			opt
		);

		if (opt.data) {
			if (fn.sender.isfree(opt.sender)) {
				fn.sender.setbusy(opt.sender);
				fn.post({
					callback: (result) => {
						fn.sender.setfree(opt.sender);
						if (typeof callback === "function") {
							callback(result);
						}
					},
					url: `api/user/register`,
					data: opt.data,
				});
			}
		} else {
			console.error("opt data is required");
		}
	},
	signin: (opt, callback) => {
		opt = core.extend(
			{},
			{
				data: null,
				sender: null,
			},
			opt
		);

		if (opt.data) {
			if (fn.sender.isfree(opt.sender)) {
				fn.sender.setbusy(opt.sender);
				fn.post({
					callback: (result) => {
						fn.sender.setfree(opt.sender);
						if (typeof callback === "function") {
							callback(result);
						}
					},
					url: `api/user/signin`,
					data: opt.data,
				});
			}
		} else {
			console.error("opt data is required");
		}
	},
	signout: (opt, callback) => {
		opt = core.extend(
			{},
			{
				sender: null,
			},
			opt
		);

		if (fn.sender.isfree(opt.sender)) {
			fn.sender.setbusy(opt.sender);
			fn.get({
				callback: (result) => {
					fn.sender.setfree(opt.sender);
					if (typeof callback === "function") {
						callback(result);
					}
				},
				url: `api/user/signout`,
			});
		}
	},
	changepass: (opt, callback) => {
		opt = core.extend(
			{},
			{
				data: null,
				sender: null,
			},
			opt
		);

		if (opt.data) {
			if (fn.sender.isfree(opt.sender)) {
				fn.sender.setbusy(opt.sender);
				fn.post({
					callback: (result) => {
						fn.sender.setfree(opt.sender);
						if (typeof callback === "function") {
							callback(result);
						}
					},
					url: `api/user/changepass`,
					data: opt.data,
				});
			}
		} else {
			console.error("opt data is required");
		}
	},
	changepass_guest: (opt, callback) => {
		opt = core.extend(
			{},
			{
				data: null,
				sender: null,
			},
			opt
		);

		if (opt.data) {
			if (fn.sender.isfree(opt.sender)) {
				fn.sender.setbusy(opt.sender);
				fn.post({
					callback: (result) => {
						fn.sender.setfree(opt.sender);
						if (typeof callback === "function") {
							callback(result);
						}
					},
					url: `api/user/changepass-guest`,
					data: opt.data,
				});
			}
		} else {
			console.error("opt data is required");
		}
	},
	resetpass: (opt, callback) => {
		opt = core.extend(
			{},
			{
				data: null,
				sender: null,
			},
			opt
		);

		if (opt.data) {
			if (fn.sender.isfree(opt.sender)) {
				fn.sender.setbusy(opt.sender);
				fn.post({
					callback: (result) => {
						fn.sender.setfree(opt.sender);
						if (typeof callback === "function") {
							callback(result);
						}
					},
					url: `api/user/resetpass`,
					data: opt.data,
				});
			}
		} else {
			console.error("opt data is required");
		}
	},
	info_guest: (opt, callback) => {
		opt = core.extend(
			{},
			{
				sender: null,
			},
			opt
		);

		if (fn.sender.isfree(opt.sender)) {
			fn.sender.setbusy(opt.sender);
			fn.get({
				auth: false,
				callback: (result) => {
					fn.sender.setfree(opt.sender);
					if (typeof callback === "function") {
						callback(result);
					}
				},
				url: `api/user/info`,
			});
		}
	},
	info: (opt, callback) => {
		opt = core.extend(
			{},
			{
				sender: null,
			},
			opt
		);

		if (fn.sender.isfree(opt.sender)) {
			fn.sender.setbusy(opt.sender);
			fn.get({
				callback: (result) => {
					fn.sender.setfree(opt.sender);
					if (typeof callback === "function") {
						callback(result);
					}
				},
				url: `api/user/info`,
			});
		}
	},
	updateinfo: (opt, callback) => {
		opt = core.extend(
			{},
			{
				data: null,
				sender: null,
			},
			opt
		);

		if (opt.data) {
			if (fn.sender.isfree(opt.sender)) {
				fn.sender.setbusy(opt.sender);
				fn.post({
					callback: (result) => {
						fn.sender.setfree(opt.sender);
						if (typeof callback === "function") {
							callback(result);
						}
					},
					url: `api/user/updateinfo`,
					data: opt.data,
				});
			}
		} else {
			console.error("opt data is required");
		}
	},
	validate: (token, callback) => {
		fn.post({
			callback: (result) => {
				if (typeof callback === "function") {
					callback(result);
				}
			},
			url: `api/user/validate`,
			data: { token: token },
		});
	},
};
