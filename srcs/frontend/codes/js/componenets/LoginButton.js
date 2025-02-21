import Component from "../core/Component.js";

export default class LoginButton extends Component {
	setup() {
		this.$state = {
			buttonName: this.$props.name,
			buttonHref: this.$props.href,
			oauthUri: "https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-9cc4234df8bf6cc06966f0a4de040dfdace620f2d91bdcf0a375dc588b60f48d&redirect_uri=https%3A%2F%2Flocalhost%2Fcallback&response_type=code" 
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