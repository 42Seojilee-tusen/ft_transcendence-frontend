import Component from "../../core/Component.js";

export default class Loading extends Component {
	template() {
		return `
		<div class="container d-flex flex-column" style="height: 100dvh;">
			<div class="row d-flex flex-grow-1">
				<h1 class="col text-white d-flex align-items-center justify-content-center">Loading...</h1>
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
			<div class="row d-flex flex-grow-1"></div>
		</div>
		`;
	}
}