import Component from "../core/Component.js";

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
		<button class="btn fw-semibold ${buttonColor} w-100 fs-2 text-dark" data-bs-toggle="modal" data-bs-target="#gameModal">${buttonName}</button>

		<div class="modal fade" id="gameModal" tabindex="-1" aria-labelledby="gameModalLabel" aria-hidden="true">
			<div class="modal-dialog modal-dialog-centered">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title">게임 형식</h5>
						<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
					<div class="modal-body">
						<div class="row">
							<div class="col">
								<div id="battle-card" class="card bg-desert text-center w-100 h-100" data-bs-dismiss="modal">
									<div class="card-body item-button">
										<img src="../../img/1on1.png" alt="Battle" class="img-fluid mb-3" style="height: 200px; object-fit: cover;">
										<h5 class="card-title text-dark">배틀</h5>
									</div>
								</div>
							</div>
							<div class="col">
								<div id="tournarment-card" class="card bg-desert text-center w-100 h-100" data-bs-dismiss="modal">
									<div class="card-body item-button">
										<img src="../../img/tournament.png" alt="Tournament" class="img-fluid mb-3" style="height: 200px; object-fit: cover;">
										<h5 class="card-title text-dark">토너먼트</h5>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		`;
	}

	mounted() {
		const $battleCard = document.querySelector("#battle-card");
		const $tournarmentCard = document.querySelector("#tournarment-card");

		$battleCard.addEventListener("click", () => {
			console.log("click battle");
			window.location.hash = "#/loading";
		})
		$tournarmentCard.addEventListener("click", () => {
			console.log("click tournarment");
			window.location.hash = "#/loading";
		})
	}
}