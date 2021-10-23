$(document).ready(() => {
	var root = document.getElementById("root");
	var b = new tag({
		tag: "div",
		elem: [
			"Hello World",
			new button({ id: core.UUID(), label: "Primary", color: "primary" }),
			new button({
				label: "Danger",
				color: "danger",
				style: { width: "150px" },
				type: "submit",
				icon: ["fab", "facebook"],
			}),
			new button({
				label: "Yay",
				class: ["makkauhijau", null, null, null, "makkaubiru"],
				disabled: true,
				hidelabel: true,
				color: "success",
				type: "reset",
				icon: "fire",
			}),
			new button("hello", "warning"),
		],
		class: "display-1",
	});
	b.build(root);
});
