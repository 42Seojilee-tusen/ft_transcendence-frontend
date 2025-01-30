import Component from "../core/Component.js";

export default class LoginButton extends Component {
	setup() {
		this.$state = {
			buttonName: this.$props.name,
			buttonHref: this.$props.href,
		};
	}

	template() {
		const { buttonName } = this.$state;
		const { buttonHref } = this.$state;
		return `
		<div class="container text-center d-flex flex-column justify-content-center">
			<a href="${buttonHref}" class="btn fw-semibold btn-black w-100 fs-2 text-white">${buttonName}</a>
		</div>
		`;
	}
}