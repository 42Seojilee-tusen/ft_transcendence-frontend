import Component from "../core/Component.js";

export default class GameModal extends Component {
	template() {
		return `
		<div class="modal-dialog modal-dialog-centered">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title">게임 형식</h5>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
				<div class="modal-body">
					<div class="row">
						<div class="col">
							<div class="card bg-desert text-center w-100 h-100">
								<div class="card-body">
									<img src="../../img/1on1.png" alt="Battle" class="img-fluid mb-3" style="height: 200px; object-fit: cover;">
									<h5 class="card-title text-dark">배틀</h5>
								</div>
							</div>
						</div>
						<div class="col">
							<div class="card bg-desert text-center w-100 h-100">
								<div class="card-body">
									<img src="../../img/tournament.png" alt="Tournament" class="img-fluid mb-3" style="height: 200px; object-fit: cover;">
									<h5 class="card-title text-dark">토너먼트</h5>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		`;
	}
}