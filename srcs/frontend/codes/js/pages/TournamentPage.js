import Component from "../core/Component.js";

export default class TournamentPage extends Component {
	setup() {
		this.$state = {
		};
	}

	template() {
		return `
		<div class="container vh-100 d-flex flex-column">
			<div class="row d-flex flex-grow-1">
				<h1 class="col text-white d-flex align-items-center justify-content-center">Battle</h1>
			</div>
			<div class="row d-flex flex-grow-1">
				<div class="col d-flex align-items-center justify-content-center"></div>
				<div class="col d-flex align-items-center justify-content-center"></div>
				<div class="col d-flex align-items-center justify-content-center"></div>
			</div>
			<div class="row d-flex flex-grow-1">
				<div class="col d-flex align-items-center justify-content-center"></div>
				<div class="col-8 d-flex align-items-center justify-content-center">
					<div class="row d-flex flex-grow-1">
						<div class="col d-flex align-items-center justify-content-center">
							<img src="../../img/offline.png" alt="offline" style="height: 300px;">
						</div>
						<div class="col d-flex align-items-center justify-content-center">
							<img src="../../img/online.png" alt="online" style="height: 300px;">
						</div>
					</div>
				</div>
				<div class="col d-flex align-items-center justify-content-center"></div>
			</div>
			<div class="row d-flex flex-grow-1">
				<div class="col d-flex align-items-center justify-content-center">
				<h1 class="text-center text-white">상대를 기다리는 중입니다...<h1>
				</div>
			</div>
		</div>
		`;
	}
}