import Component from "../core/Component.js";
import Battle from "../game/Battle.js";
import Tournament from "../game/Tournament.js";
import Result from "../game/Result.js";
import Game from "../game/Game.js";

export default class GamePage extends Component {
	setup() {
		let tmpJson = {};
		// tmpJson = {
		// 	"game_type": "battle",
		// 	"game_state": "wait",
		// 	"game_user": ["player1", "player2"],
		// }
		// tmpJson = {
		// 	"game_type": "tournament",
		// 	"game_state": "wait",
		// 	"game_user": ["player1", "player2", "player3", "player4"],
		// 	"now_player": ["player1", "player4"],
		// }
		// tmpJson = {
		// 	"game_type": "battle",
		// 	"game_state": "play",
		// 	"now_player": ["player1", "player2"],
		// 	"score": [3, 0],
		// 	"ball": { "x": 4.5, "y": 7.3 },
		// 	"left_bar": 20.3,
		// 	"right_bar": 12.1,
		// }
		tmpJson = {
			"game_type": "battle",
			"game_state": "finish",
			"now_player": ["player1", "player2"],
			"result": [2, 5]
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
				new Battle($page, this.$state);
			} else if (this.$state.game_type === "tournament") {
				new Tournament($page, this.$state);
			}
		} else if (this.$state.game_state === "start" || this.$state.game_state === "play") {
			new Game($page, this.$state);
		} else if (this.$state.game_state === "finish") {
			new Result($page, this.$state);
		}
	}
}
