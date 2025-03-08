import Component from "../../core/Component.js";
import GameBoard from "./GameBoard.js";
import { HOST } from "../../constants/ApiConstants.js";

export default class Game extends Component {
	setup() {
		this.$state = {
			type: "",
			player1Image: "../../img/profile.jpeg",
			player1Name: "player1",
			player2Image: "../../img/profile.jpeg",
			player2Name: "player2",
			score: "0 : 0",
		};
	}

	template() {
		return `
		<div class="container vh-100 d-flex flex-column">
			<div class="row d-flex">
				<div class="col d-flex flex-column align-items-center justify-content-center"></div>
				<div class="col d-flex flex-column align-items-center justify-content-center">
					<h3 class="text-white mb-2"></h3>
					<img
						src=${this.$state.player1Image}
						alt="Sample Image"
						class="img-fluid mb-2"
						style="max-width: 100%; height: auto;"
					/>
					<h3 class="text-white mb-2">${this.$state.player1Name}</h3>
				</div>
				<div class="col d-flex align-items-center justify-content-center"><h1 class="text-white" style="font-size: clamp(1rem, 5vw, 4rem);">${this.$state.score}</h1></div>
				<div class="col d-flex flex-column align-items-center justify-content-center">
					<h3 class="text-white mb-2"></h3>
					<img
						src=${this.$state.player2Image}
						alt="Sample Image"
						class="img-fluid mb-2"
						style="max-width: 100%; height: auto;"
					/>
					<h3 class="text-white mb-2">${this.$state.player2Name}</h3>
				</div>
				<div class="col d-flex flex-column align-items-center justify-content-center"></div>
			</div>
			<div class="row d-flex flex-grow-2">
				<div class="col d-flex align-items-center justify-content-center"></div>
				<div id="game-board" class="col-8 d-flex flex-column align-items-center justify-content-center mt-5 mb-5"></div>
				<div class="col d-flex align-items-center justify-content-center"></div>
			</div>
		</div>
		`;
	}

	mounted() {
		const $parent = document.querySelector("#game-board");
		const gameBoard = new GameBoard($parent);
		this.$state.gameBoard = gameBoard;
	}

	updateImage(data) {
		this.$state =  {
			...this.$state,
			type: data.type,
			player1Image: `https://${HOST}/api${data.game_users[0].player_image}`,
			player1Name: data.game_users[0].player_name,
			player2Image: `https://${HOST}/api${data.game_users[1].player_image}`,
			player2Name: data.game_users[1].player_name,
		}
	}

	waitTime(data) {
		if (this.$state.type !== "game_wait") {
			this.setState({ type: data.type, score: `${data.scores[0]} : ${data.scores[1]}`, })
		}
		this.$state.gameBoard.updateBoard( { type: data.type, time: data.time } );
	}

	updateGame(data) {
		if (this.$state.type !== "game_wait" && this.$state.type !== "game_update") {
			this.setState({ type: data.type, })
		} else {
			this.$state.type = data.type;
			this.$state.gameBoard.updateBoard( { type: data.type, game_state: data.game_state } );
		}
	}
}