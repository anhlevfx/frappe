import Block from "./block.js";
export default class Frame extends Block {
	static get toolbox() {
		return {
			title: "Frame",
			icon: frappe.utils.icon("dashboard", "sm"),
		};
	}

	static get isReadOnlySupported() {
		return true;
	}

	constructor({ data, api, config, readOnly, block }) {
		super({ data, api, config, readOnly, block });
		this.col = this.data.col ? this.data.col : "12";
		this.allow_customization = !this.readOnly;
		this.options = {
			allow_sorting: this.allow_customization,
			allow_create: this.allow_customization,
			allow_delete: this.allow_customization,
			allow_hiding: false,
			allow_edit: true,
			allow_resize: true,
			min_width: 12,
		};
	}

	render() {
		this.wrapper = document.createElement("div");
		this.new("frame");

		if (this.data && this.data.frame_name) {
			let has_data = this.make("frame", this.data.frame_name);
			if (!has_data) return;
		}

		if (!this.readOnly) {
			$(this.wrapper).find(".widget").addClass("frame edit-mode");
			this.add_settings_button();
			this.add_new_block_button();
		}

		return this.wrapper;
	}

	validate(savedData) {
		if (!savedData.frame_name) {
			return false;
		}

		return true;
	}

	save() {
		return {
			frame_name: this.wrapper.getAttribute("frame_name"),
			col: this.get_col(),
			new: this.new_block_widget,
		};
	}
}
