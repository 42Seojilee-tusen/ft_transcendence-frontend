import Component from "../core/Component.js";
import LoginButton from "../componenets/LoginButton.js";

export default class Login extends Component {
	template() {
		return `
		<div class="container-xxl vh-100 d-flex flex-column justify-content-center">
			<div class="row">
				<div class="col"></div>
				<div class="col-6">
					<div data-component="loginButton" class="mt-4 mt-md-5 mt-lg-5 mb-4 mb-md-5 mb-lg-5"></div>
				</div>
				<div class="col"></div>
			</div>
		</div>
		`;
	}

	mounted() {
		console.log("login");
		const $login = this.$target.querySelector('[data-component="loginButton"]');
		new LoginButton($login, {name: "42 OAuth Login", href: "#/", });
	}
}
