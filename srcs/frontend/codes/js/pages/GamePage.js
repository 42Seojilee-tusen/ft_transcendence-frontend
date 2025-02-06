import Component from "../core/Component.js";

export default class GamePage extends Component {
	setup() {
		this.$state = {
		};
	}

	template() {
		return `
		<div class="container-xxl vh-100 d-flex flex-column justify-content-center">
			<div class="row">
				<div class="col"></div>
				<div class="col-9">
				aaa
				</div>
				<div class="col"></div>
			</div>
		</div>
		`;
	}
}