import Component from "../core/Component.js";

export default class MoveButton extends Component {
	setup() {
		this.$state = {
			buttonName: this.$props.name,
			buttonHref: this.$props.href,
			buttonColor: this.$props.color,
			buttonFontSize: this.$props.fontSize,
		};
	}

	template() {
		const { buttonName } = this.$state;
		const { buttonHref } = this.$state;
		const { buttonColor } = this.$state;
		const { buttonFontSize } = this.$state;
		return `
		<a href="${buttonHref}" class="btn fw-semibold ${buttonColor} w-100 ${buttonFontSize} text-dark text-center">${buttonName}</a>
		`;
	}
}
