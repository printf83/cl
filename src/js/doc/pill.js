"use strict";
import sample from "./sample.js";
import pill from "../base/pill.js";

export default [
	{
		title: "Pill",
		anchor: false,
	},
	{
		title: "Example",
		container: sample.stackcontainer,
		import: ["pill"],
		code: () => {
			return [
				{ title: "Title", label: "Label" },
				{ title: "Title", label: "Label", color: "secondary" },
				{ title: "Title", label: "Label", color: "success" },
				{ title: "Title", label: "Label", color: "danger" },
				{ title: "Title", label: "Label", color: "warning" },
				{ title: "Title", label: "Label", color: "info" },
				{ title: "Title", label: "Label", color: "dark" },
			].map((i) => {
				return new pill(i);
			});
		},
	},
	{
		title: "Icon",
		container: sample.stackcontainer,
		import: ["pill"],
		code: () => {
			return [
				{ icon: "fire", label: "Label" },
				{ icon: "fire", label: "Label", color: "secondary" },
				{ icon: "fire", label: "Label", color: "success" },
				{ icon: "fire", label: "Label", color: "danger" },
				{ icon: "fire", label: "Label", color: "warning" },
				{ icon: "fire", label: "Label", color: "info" },
				{ icon: "fire", label: "Label", color: "dark" },
			].map((i) => {
				return new pill(i);
			});
		},
	},
	{
		title: "Base icon",
		container: sample.stackcontainer,
		import: ["pill"],
		code: () => {
			return [
				{ icon: "i", title: "Title", label: "Info" },
				{ icon: "!", title: "Title", label: "Warning" },
				{ icon: "/", title: "Title", label: "Success" },
				{ icon: "x", title: "Title", label: "Critical" },
				{ icon: "-", title: "Title", label: "Stop" },
				{ icon: "!!", title: "Title", label: "Danger" },
			].map((i) => {
				return new pill(i);
			});
		},
	},

	{
		title: "Icon with title",
		container: sample.stackcontainer,
		import: ["pill"],
		code: () => {
			return [
				{ icon: "i", title: "Info", label: "Label" },
				{ icon: "!", title: "Warning", label: "Label" },
				{ icon: "/", title: "Success", label: "Label" },
				{ icon: "x", title: "Critical", label: "Label" },
				{ icon: "fire", title: "Fire", label: "Label" },
				{ icon: { icon: "star", spin: true }, title: "Star", label: "Spinning icon", color: "warning" },
			].map((i) => {
				return new pill(i);
			});
		},
	},
];
