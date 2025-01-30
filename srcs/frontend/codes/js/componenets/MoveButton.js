import Component from "../core/Component.js";

export default class MoveButton extends Component {
	setup() {
		this.$state = {
			buttonName: this.$props.name,
			buttonHref: this.$props.href,
			buttonColor: this.$props.color
		};
	}

	template() {
		const { buttonName } = this.$state;
		const { buttonHref } = this.$state;
		const { buttonColor } = this.$state;
		return `
		<div class="container text-center d-flex flex-column justify-content-center">
			<a href="${buttonHref}" class="btn fw-semibold ${buttonColor} w-100 fs-2 text-dark">${buttonName}</a>
		</div>
		`;
	}
}