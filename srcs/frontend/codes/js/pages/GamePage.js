import Component from "../core/Component.js";
import Battle from "../game/Battle.js";
import Tournament from "../game/Tournament.js";
import Result from "../game/Result.js";
import Game from "../game/Game.js";

export default class GamePage extends Component {
	setup() {

		const tmpJson = {
			"game_type": "battle",
			"game_state": "wait",
			"game_user": ["player1", "player2"],
		}

		this.$state = { ...tmpJson }
	}

	template() {
		return `
		<div id="gameState" class="container-xxl vh-100 d-flex flex-column justify-content-center">
			<div class="container vh-100 d-flex flex-column">
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
				<div class="row d-flex flex-grow-1"></div>
			</div>
		</div>
		`;
	}

	mounted() {
		const $page = document.querySelector("#gameState");
		if (this.$state.game_state === "wait") {
			if (this.$state.game_type === "battle") {
				new Battle($page);
			} else if (this.$state.game_type === "tournament") {
				new Tournament($page);
			}
		} else if (this.$state.game_state === "start" || this.$state.game_state === "play") {
			new Game($page);
		} else if (this.$state.game_state === "finish") {
			new Result($page);
		}
	}
}
