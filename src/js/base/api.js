"use strict";

import * as core from "./core.js";
import { signin as user_signin } from "./user.js";

const defaultOption = {
	callback: function (data) {},
	type: "GET",
	url: null,
	data: null,
	async: true,
};

const defaultOptionPost = {
	callback: function (data) {},
	type: "POST",
	url: null,
	data: null,
	async: true,
};

const defaultOptionUpload = {
	callback: function (data) {},
	progress: null,
	type: "POST",
	url: null,
	data: null,
	async: false,
};

const fn = {
	str2Object: function (value) {
		if (value && value !== "") {
			try {
				return JSON.parse(value);
			} catch {
				return value;
			}
		}

		return null;
	},
	obj2String: function (value) {
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
		islist: function (sender) {
			if (sender) {
				if (sender.getAttribute("data-key") && sender.getAttribute("data-name")) {
					return true;
				}
			}

			return false;
		},
		isfree: function (sender) {
			if (sender) {
				if (sender.classList.contains("disabled") || sender.disabled === true) {
					return false;
				}
			}

			return true;
		},
		setbusy: function (sender) {
			if (sender) {
				sender.classList.add("disabled");
				sender.disabled = true;

				if (fn.sender.islist(sender)) {
					let ctl = sender.querySelectorAll("h6");
					ctl[0].innerHTML = "<i class='fas fa-circle-notch fa-fw fa-spin'></i> Loading...";
				} else {
					//change icon
					let ico = sender.querySelectorAll("i");
					if (ico && ico.length > 0) {
						ico[0].setAttribute("data-old-class", ico[0].getAttribute("class"));
						ico[0].setAttribute("class", "fas fa-circle-notch fa-fw fa-spin");
					}
				}
			}
		},
		setfree: function (sender) {
			if (sender) {
				sender.classList.remove("disabled");
				sender.disabled = false;

				if (fn.sender.islist(sender)) {
					let ctl = sender.querySelectorAll("h6");
					ctl[0].innerHTML = sender.getAttribute("data-name");
				} else {
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
	get: function (opt) {
		opt = core.extend({}, defaultOption, opt);

		let req = new XMLHttpRequest();
		req.onreadystatechange = function () {
			if (req.readyState == 4) {
				if (req.status == 200) {
					opt.callback(fn.str2Object(req.responseText));
				} else if (req.status === 400) {
					new user_signin({
						callback: function (result) {
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
			}
		};
		req.open(opt.type, opt.url, opt.async);
		req.setRequestHeader("Content-Type", "application/json");
		req.send(fn.obj2String(opt.data));
	},
	post: function (opt) {
		opt = core.extend({}, defaultOptionPost, opt);

		let req = new XMLHttpRequest();
		req.onreadystatechange = function () {
			if (req.readyState == 4) {
				if (req.status == 200) {
					opt.callback(fn.str2Object(req.responseText));
				} else if (req.status === 400) {
					new user_signin({
						callback: function (result) {
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
			}
		};

		req.open(opt.type, opt.url, opt.async);
		req.setRequestHeader("Content-Type", "application/json");
		req.send(fn.obj2String(opt.data));
	},
	upload: function (opt) {
		opt = core.extend({}, defaultOptionUpload, opt);

		let req = new XMLHttpRequest();
		req.onreadystatechange = function () {
			if (req.readyState == 4) {
				if (req.status == 200) {
					opt.callback(fn.str2Object(req.responseText));
				} else if (req.status === 400) {
					new user_signin({
						callback: function (result) {
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
			}
		};

		if (typeof opt.progress === "function") {
			req.onprogress = function (event) {
				if (event.lengthComputable) {
					var percentComplete = parseInt((event.loaded / event.total) * 100, 10);
					opt.progress(percentComplete);
				}
			};
		}

		req.open(opt.type, opt.url, opt.async);
		req.send(this.genfileformdata(opt.data));
	},
	download: function (url) {
		window.location = url;
	},
	genformdata: function (obj) {
		if (obj) {
			const res = new FormData();
			Object.keys(obj).forEach((key) => res.append(key, obj[key]));
			return res;
		}
		return null;
	},
	genfileformdata: function (files) {
		let data = new FormData();
		for (let x = 0; x < files.length; x++) {
			data.append("file", files[x]);
		}
		return data;
	},
	getfilelength: function (files) {
		let result = 0;
		for (let x = 0; x < files.length; x++) {
			result += files[0].length;
		}

		return result;
	},
};

export const api = {
	create: function (opt, callback) {
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
					callback: function (result) {
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
	load: function (opt, callback) {
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
					callback: function (result) {
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
	update: function (opt, callback) {
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
					callback: function (result) {
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
	delete: function (opt, callback) {
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
					callback: function (result) {
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
	list: function (opt, callback) {
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
					callback: function (result) {
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
	option: function (opt, callback) {
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
					callback: function (result) {
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
	excel: function (opt) {
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
					function (sender) {
						fn.sender.setfree(sender);
					},
					3000,
					opt.sender
				);

				if (opt.data) {
					fn.download(`api/${opt.name}-excel/?q=${JSON.stringify(opt.data)}`);
				} else {
					fn.download(`api/${opt.name}-excel`);
				}
			}
		} else {
			console.error("opt name is required");
		}
	},
	aggregate: function (opt, callback) {
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
					callback: function (result) {
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
	upload: function (file, progress, callback, sender) {
		if (file) {
			if (fn.sender.isfree(sender)) {
				fn.sender.setbusy(sender);
				fn.upload({
					progress: progress,
					callback: function (result) {
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
	download: function (id, sender) {
		if (id) {
			if (fn.sender.isfree(sender)) {
				fn.sender.setbusy(sender);

				setTimeout(
					function (sender) {
						fn.sender.setfree(sender);
					},
					3000,
					sender
				);

				fn.download(this.url(id));
			}
		} else {
			console.error("opt id is required");
		}
	},
	url: function (id) {
		if (id) {
			return `api/file/${Array.isArray(id) ? id.join(",") : id}`;
		} else {
			console.error("opt id is required");
			return null;
		}
	},
	info: function (id, callback, sender) {
		if (id) {
			if (fn.sender.isfree(sender)) {
				fn.sender.setbusy(sender);
				fn.get({
					callback: function (result) {
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
	save: function (id, callback, sender) {
		if (id) {
			if (fn.sender.isfree(sender)) {
				fn.sender.setbusy(sender);
				fn.get({
					callback: function (result) {
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
	delete: function (id, callback, sender) {
		if (id) {
			if (fn.sender.isfree(sender)) {
				fn.sender.setbusy(sender);

				fn.get({
					callback: function (result) {
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
	register: function (opt, callback) {
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
					callback: function (result) {
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
	signin: function (opt, callback) {
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
					callback: function (result) {
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
	signout: function (opt, callback) {
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
				callback: function (result) {
					fn.sender.setfree(opt.sender);
					if (typeof callback === "function") {
						callback(result);
					}
				},
				url: `api/user/signout`,
			});
		}
	},
	changepass: function (opt, callback) {
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
					callback: function (result) {
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
	changepass_guest: function (opt, callback) {
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
					callback: function (result) {
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
	resetpass: function (opt, callback) {
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
					callback: function (result) {
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
	info: function (opt, callback) {
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
				callback: function (result) {
					fn.sender.setfree(opt.sender);
					if (typeof callback === "function") {
						callback(result);
					}
				},
				url: `api/user/info`,
			});
		}
	},
	updateinfo: function (opt, callback) {
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
					callback: function (result) {
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
	validate: function (token, callback) {
		fn.post({
			callback: function (result) {
				if (typeof callback === "function") {
					callback(result);
				}
			},
			url: `api/user/validate`,
			data: { token: token },
		});
	},
};
