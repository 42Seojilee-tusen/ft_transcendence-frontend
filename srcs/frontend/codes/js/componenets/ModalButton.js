import Component from "../core/Component.js";
import GameModal from "./GameModal.js";

export default class ModalButton extends Component {
	setup() {
		this.$state = {
			buttonName: this.$props.name,
			buttonColor: this.$props.color,
		};
	}

	template() {
		const { buttonName } = this.$state;
		const { buttonColor } = this.$state;
		return `
		<div class="container text-center d-flex flex-column justify-content-center">
			<button class="btn fw-semibold ${buttonColor} w-100 fs-2 text-dark" data-bs-toggle="modal" data-bs-target="#gameModal">${buttonName}</button>
		</div>
		<div class="modal fade" id="gameModal" tabindex="-1" aria-labelledby="gameModalLabel" aria-hidden="true"></div>
		`;
	}

	mounted() {
		const $gameModal = this.$target.querySelector("#gameModal");
		new GameModal($gameModal);
	}
}