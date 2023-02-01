import Widget from "./base_widget.js";

frappe.provide("frappe.utils");

export default class FrameWidget extends Widget {
	constructor(opts) {
		opts.shadow = true;
		super(opts);
	}

	get_config() {
		return {
			name: this.name,
			label: this.label,
			url: this.url,
			frame_height: this.frame_height,
			is_show_label: this.is_show_label,
		};
	}

	set_title() {
		if (this.is_show_label != 1 && !this.in_customize_mode) {
			return;
		} else {
			super.set_title();
		}
	}

	set_body() {
		this.widget.addClass("frame-widget-box");
		this.body.empty();
		this.body.css("height", this.frame_height);
		if (!this.in_customize_mode) {
			this.head.empty();
		}
		this.body.append(`<iframe src="${this.url}" width="100%" height="100%" style="border: 0"></iframe>`)
	}

	render_loading_state() {
		this.body.empty();
		this.loading = $(`<div class="list-loading-state text-muted">${__("Loading...")}</div>`);
		this.loading.appendTo(this.body);
	}

	render_no_data_state() {
		this.loading = $(`<div class="list-no-data-state text-muted">${__("No Data...")}</div>`);
		this.loading.appendTo(this.body);
	}
}
