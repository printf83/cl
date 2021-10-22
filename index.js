$(document).ready(() => {
	var root = document.getElementById("root");
	var b = new tag({
		tag: "div",
		elem: [
			"Hello World",
			new button({ label: "Primary", color: "primary" }),
			new button({
				label: "Danger",
				color: "danger",
				type: "submit",
				icon: { icon: "facebook", style: "fab" },
			}),
			new button("hello", "warning"),
		],
		attr: { class: "display-1" },
	});
	b.build(root);
});
