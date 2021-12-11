import * as container from "../base/container.js";

export function stackcontainer(elem) {
	return new container.stack(elem);
}

export function formcontainer(elem) {
	return new container.form(elem);
}

export function gridcontainer(elem) {
	return new container.grid(elem);
}
