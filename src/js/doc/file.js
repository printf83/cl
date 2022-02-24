"use strict";
import sample from "./sample.js";
import $ from "../component.js";

export default [
	{
		title: "File database",
		msg: "Provide access to manage uploaded file.",
		anchor: false,
	},
	{
		msg: [
			"All file uploaded into /tmp folder on server using {{$.file}} component.",
			"File will be move into /file folder after function {{$.file.save()}} called",
			"All file in /tmp folder will be deleted automaticly on server restart",
			"All file in /file folder only can be deleted using {{$.file.delete()}} function",
			"All file information will be save into table file in database",
		],
	},
	{
		title: "Example",
		container: sample.stackcontainer,
		code: function () {
			let fileUploadID = $.core.UUID();

			return new $.file({ id: fileUploadID });
		},
	},
	{
		title: "Multiple",
		container: sample.stackcontainer,
		code: function () {
			let fileUploadID = $.core.UUID();

			return new $.file({ id: fileUploadID, multiple: true });
		},
	},
	{
		title: "File type",
		container: sample.stackcontainer,
		code: function () {
			let fileUploadID = $.core.UUID();

			return new $.file({
				id: fileUploadID,
				multiple: true,
				accept: "image/gif,image/bmp,image/x-windows-bmp,image/jpeg,image/png",
			});
		},
	},
	{
		title: "Label, color & icon",
		container: sample.stackcontainer,
		code: function () {
			let fileUploadID = $.core.UUID();

			return new $.file({
				id: fileUploadID,
				multiple: true,
				accept: "application/pdf",
				uploadlabel: "Upload PDF",
				uploadicon: "file-pdf",
				uploadcolor: "primary",
				viewlabel: "View PDF",
				viewicon: "glasses",
				viewcolor: "success",
				deletelabel: null,
				deleteicon: "trash-alt",
				deletecolor: "danger",
			});
		},
	},
	{
		title: "Save",
		container: sample.stackcontainer,
		code: function () {
			let fileUploadID = $.core.UUID();

			return [
				new $.file({ id: fileUploadID }),
				new $.button({
					label: "Save file",
					color: "success",
					icon: "floppy-disk",
					onclick: function (event) {
						let sender = event.currentTarget;

						$.file.save(
							document.getElementById(id),
							function (result) {
								if (result) {
									new $.toast(
										"i",
										`File ${
											Array.isArray(result) ? result.join(",") : result
										} move to <b>/file</b> folder`
									).show();
								}
							},
							sender
						);
					},
				}),
			];
		},
	},
];
