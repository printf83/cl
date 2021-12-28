import pill from "../base/pill.js";
import * as doc_core from "./core.js";

export default [
	{
		title: "Pill",
		anchor: false,
	},
	{
		title: "Example",
		container: doc_core.stackcontainer,
		code: function () {
			return [
				{ title: "Title", label: "Label" },
				{ title: "Title", label: "Label", color: "secondary" },
				{ title: "Title", label: "Label", color: "success" },
				{ title: "Title", label: "Label", color: "danger" },
				{ title: "Title", label: "Label", color: "warning" },
				{ title: "Title", label: "Label", color: "info" },
				{ title: "Title", label: "Label", color: "dark" },
			].map(function (i) {
				return new pill(i);
			});
		},
	},
	{
		title: "Icon",
		container: doc_core.stackcontainer,
		code: function () {
			return [
				{ icon: "fire", label: "Label" },
				{ icon: "fire", label: "Label", color: "secondary" },
				{ icon: "fire", label: "Label", color: "success" },
				{ icon: "fire", label: "Label", color: "danger" },
				{ icon: "fire", label: "Label", color: "warning" },
				{ icon: "fire", label: "Label", color: "info" },
				{ icon: "fire", label: "Label", color: "dark" },
			].map(function (i) {
				return new pill(i);
			});
		},
	},
	{
		title: "Base icon",
		container: doc_core.stackcontainer,
		code: function () {
			return [
				{ icon: "i", title: "Title", label: "Info" },
				{ icon: "!", title: "Title", label: "Warning" },
				{ icon: "/", title: "Title", label: "Success" },
				{ icon: "x", title: "Title", label: "Critical" },
				{ icon: "-", title: "Title", label: "Stop" },
				{ icon: "!!", title: "Title", label: "Danger" },
			].map(function (i) {
				return new pill(i);
			});
		},
	},

	{
		title: "Icon with title",
		container: doc_core.stackcontainer,
		code: function () {
			return [
				{ icon: "i", title: "Info", label: "Label" },
				{ icon: "!", title: "Warning", label: "Label" },
				{ icon: "/", title: "Success", label: "Label" },
				{ icon: "x", title: "Critical", label: "Label" },
				{ icon: "fire", title: "Fire", label: "Label" },
				{ icon: { icon: "star", spin: true }, title: "Star", label: "Spinning icon", color: "warning" },
			].map(function (i) {
				return new pill(i);
			});
		},
	},
];
