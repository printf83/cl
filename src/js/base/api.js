"use strict";

import * as core from "./core.js";

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
	async: true,
};

const fn = {
	get: function (opt) {
		opt = core.extend({}, defaultOption, opt);

		let req = new XMLHttpRequest();
		req.onreadystatechange = function () {
			if (req.readyState == 4 && req.status == 200) {
				opt.callback(req.responseText);
			}
		};
		req.open(opt.type, opt.url, opt.async);
		req.setRequestHeader("Content-Type", "application/json");
		req.send(opt.data ? JSON.stringify(opt.data) : null);
	},
	post: function (opt) {
		opt = core.extend({}, defaultOptionPost, opt);

		let req = new XMLHttpRequest();
		req.onreadystatechange = function () {
			if (req.readyState == 4 && req.status == 200) {
				opt.callback(req.responseText);
			}
		};

		req.open(opt.type, opt.url, opt.async);
		req.setRequestHeader("Content-Type", "application/json");
		req.send(opt.data ? JSON.stringify(opt.data) : null);
	},
	upload: function (opt) {
		opt = core.extend({}, defaultOptionUpload, opt);

		let req = new XMLHttpRequest();
		req.onreadystatechange = function () {
			if (req.readyState == 4 && req.status == 200) {
				opt.callback(req.responseText);
			}
		};

		if (typeof opt.onprogress === "function") {
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
		var data = new FormData();
		for (var x = 0; x < files.length; x++) {
			data.append("file", files[x]);
		}
		return data;
	},
};

export const api = {
	create: function (opt, callback) {
		opt = core.extend(
			{},
			{
				name: null,
				data: null,
			},
			opt
		);

		fn.post({
			callback: callback,
			url: `api/${opt.name}`,
			data: opt.data,
		});
	},
	load: function (opt, callback) {
		opt = core.extend(
			{},
			{
				name: null,
				id: null,
			},
			opt
		);

		fn.get({
			callback: callback,
			url: `api/${opt.name}/${Array.isArray(opt.id) ? opt.id.join(",") : opt.id}`,
		});
	},
	update: function (opt, callback) {
		opt = core.extend(
			{},
			{
				name: null,
				id: null,
				data: null,
			},
			opt
		);

		fn.get({
			callback: callback,
			type: "PUT",
			url: `api/${opt.name}/${Array.isArray(opt.id) ? opt.id.join(",") : opt.id}`,
			data: opt.data,
		});
	},
	delete: function (opt, callback) {
		opt = core.extend(
			{},
			{
				name: null,
				id: null,
			},
			opt
		);

		fn.get({
			callback: callback,
			type: "DELETE",
			url: `api/${opt.name}/${Array.isArray(opt.id) ? opt.id.join(",") : opt.id}`,
		});
	},
	list: function (opt, callback) {
		opt = core.extend(
			{},
			{
				name: null,
				data: null,
			},
			opt
		);

		fn.post({
			callback: function (result) {
				callback(JSON.parse(result));
			},
			url: `api/${opt.name}-list`,
			data: opt.data,
		});
	},
	option: function (opt, callback) {
		opt = core.extend(
			{},
			{
				name: null,
				data: null,
				fieldkey: "_id",
				fieldname: "name",
				emptylabel: null,
			},
			opt
		);

		fn.post({
			callback: function (result) {
				let res = JSON.parse(result);
				var tmp = res.data
					? res.data.map((i) => {
							return {
								value: i[opt.fieldkey],
								label: i[opt.fieldname],
							};
					  })
					: [];

				if (opt.emptylabel !== null) {
					tmp.unshift({ value: "", label: opt.emptylabel });
				}

				callback(tmp);
			},
			url: `api/${opt.name}-list`,
			data: { field: { [opt.fieldkey]: 1, [opt.fieldname]: 1 }, sort: { [opt.fieldname]: 1 } },
		});
	},
	excel: function (opt) {
		opt = core.extend(
			{},
			{
				name: null,
				data: null,
			},
			opt
		);

		fn.download(`api/${opt.name}-excel/?q=${JSON.stringify(opt.data)}`);
	},
	aggregate: function (opt, callback) {
		opt = core.extend(
			{},
			{
				name: null,
				data: null,
			},
			opt
		);

		fn.post({
			callback: callback,
			url: `api/${opt.name}-aggregate`,
			data: opt.data,
		});
	},
};

export const file = {
	upload: function (file, progress, callback) {
		fn.upload({
			progress: progress,
			callback: callback,
			url: `/api/file`,
			data: file,
		});
	},
	download: function (opt) {
		fn.download(this.url(id));
	},
	url: function (id) {
		return `api/file/${Array.isArray(id) ? id.join(",") : id}`;
	},
	info: function (id, callback) {
		fn.get({
			callback: callback,
			url: `/api/file-info/${Array.isArray(id) ? id.join(",") : id}`,
		});
	},
	save: function (id, callback) {
		fn.get({
			callback: callback,
			url: `/api/file/${Array.isArray(id) ? id.join(",") : id}`,
			type: "PUT",
		});
	},
	delete: function (id, callback) {
		fn.get({
			callback: callback,
			url: `/api/file/${Array.isArray(id) ? id.join(",") : id}`,
			type: "DELETE",
		});
	},
};
