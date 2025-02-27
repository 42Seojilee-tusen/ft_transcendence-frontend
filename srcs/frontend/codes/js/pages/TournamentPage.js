import Component from "../core/Component.js";
import Tournament from "../game/Tournament.js";
import Result from "../game/Result.js";
import Game from "../game/Game.js";

export default class TournamentPage extends Component {
	setup() {
		let tmpJson;
		tmpJson = {
			"type": "matching_on",
			"game_users": [
				{"player_name": "player1", "player_image": "../../img/profile.jpeg"},
				{"player_name": "player2", "player_image": "../../img/profile.jpeg"},
				{"player_name": "player3", "player_image": "../../img/profile.jpeg"},
				{"player_name": "player4", "player_image": "../../img/profile.jpeg"},
			],
		};
		// tmpJson = {
		// 	"type": "game_wait",
		// 	"now_players": [
		// 		{"player_name": "player1", "player_image": "../../img/profile.jpeg"},
		// 		{"player_name": "player2", "player_image": "../../img/profile.jpeg"},
		// 	],
		// 	"time": 3,
		// 	"score": [0, 0],
		// }
		// tmpJson = {
		// 	"type": "game_update",
		// 	"now_players": [
		// 		{"player_name": "player1", "player_image": "../../img/profile.jpeg"},
		// 		{"player_name": "player2", "player_image": "../../img/profile.jpeg"},
		// 	],
		// 	"game_state": {
		// 		"paddles": [{
		// 			"y": 100,
		// 			"x": 10,
		// 			"ysize": 50,
		// 			"xsize": 10
		// 		},
		// 		{
		// 			"y": 200,
		// 			"x": 780,
		// 			"ysize": 50,
		// 			"xsize": 10
		// 		},
		// 	],
		// 		"balls": [{
		// 			"y": 200,
		// 			"x": 300,
		// 			"radius": 10,
		// 		}],
		// 	},
		// 	"score": [3, 0],
		// }
		// tmpJson = {
		// 	"type": "ending",
		// 	"now_players": [
		// 		{"player_name": "player1", "player_image": "../../img/profile.jpeg"}, 
		// 		{"player_name": "player2", "player_image": "../../img/profile.jpeg"},
		// 	],
		// 	"result": [5, 3]
		// }
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
		if (this.$state.type === "matching_on") {
			new Tournament($page, this.$state);
		} else if (this.$state.type === "game_wait" || this.$state.type === "game_update") {
			new Game($page, this.$state);
		} else if (this.$state.type === "finish") {
			new Result($page, this.$state);
		}
	}
}
