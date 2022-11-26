"use strict";
import sample from "./sample.js";
import file from "../dist/cl/base/file.js";
import button from "../dist/cl/base/button.js";
import toast from "../dist/cl/base/toast.js";
import * as core from "../dist/cl/base/core.js";

export default [
	{
		title: "File database",
		msg: "Provide access to manage uploaded file.",
		anchor: false,
	},
	{
		msg: [
			"All file uploaded into /tmp folder on server using {{file}} component.",
			"File will be move into /file folder after function {{file.save()}} called",
			"All file in /tmp folder will be deleted automaticly on server restart",
			"All file in /file folder only can be deleted using {{file.delete()}} function",
			"All file information will be save into table file in database",
		],
	},
	{
		title: "Example",
		container: sample.stackcontainer,
		import: ["file"],
		code: () => {
			let fileUploadID = core.UUID();

			return new file({ id: fileUploadID });
		},
	},
	{
		title: "Multiple",
		container: sample.stackcontainer,
		import: ["file"],
		code: () => {
			let fileUploadID = core.UUID();

			return new file({
				id: fileUploadID,
				multiple: true, //marker
			});
		},
	},
	{
		title: "File type",
		container: sample.stackcontainer,
		import: ["file"],
		code: () => {
			let fileUploadID = core.UUID();

			return new file({
				id: fileUploadID,
				multiple: true,
				accept: "image/gif,image/bmp,image/x-windows-bmp,image/jpeg,image/png", //marker
			});
		},
	},
	{
		title: "Label, color & icon",
		container: sample.stackcontainer,
		import: ["file"],
		code: () => {
			let fileUploadID = core.UUID();

			return new file({
				id: fileUploadID,
				multiple: true,

				//marker
				accept: "application/pdf",
				uploadlabel: "Upload PDF",
				uploadicon: "file-pdf",
				uploadcolor: "primary",
				viewlabel: "View PDF",
				viewicon: "glasses",
				viewcolor: "success",
				downloadlabel: null,
				downloadicon: { icon: "arrow-right-to-bracket", rotate: 90 },
				downloadcolor: "primary",
				deletelabel: null,
				deleteicon: "trash-alt",
				deletecolor: "danger",
				//-
			});
		},
	},
	{
		title: "Save",
		container: sample.stackcontainer,
		import: ["toast", "button", "file"],
		code: () => {
			let fileUploadID = core.UUID();

			return [
				new file({ id: fileUploadID }), //marker
				new button({
					label: "Save file",
					color: "success",
					icon: "floppy-disk",
					click: (event) => {
						let sender = event.currentTarget;

						//marker
						file.save(
							document.getElementById(fileUploadID),
							(result) => {
								if (result) {
									new toast(
										"i",
										`File ${
											Array.isArray(result) ? result.join(",") : result
										} move to <b>/file</b> folder`
									).show();
								}
							},
							sender
						);
						//-
					},
				}),
			];
		},
	},
];
