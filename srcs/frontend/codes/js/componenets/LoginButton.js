import Component from "../core/Component.js";
import { OAUTH_URI } from "../constants/ApiConstants.js";

export default class LoginButton extends Component {
	setup() {
		this.$state = {
			buttonName: this.$props.name,
			buttonHref: this.$props.href,
			oauthUri: OAUTH_URI
		};
	}

	template() {
		const { buttonName } = this.$state;
		const { oauthUri } = this.$state;
		return `
		<div id="login" class="container text-center d-flex flex-column justify-content-center">
			<a href=${oauthUri} class="btn fw-semibold btn-black w-100 fs-2 text-white">${buttonName}</a>
		</div>
		`;
	}
}