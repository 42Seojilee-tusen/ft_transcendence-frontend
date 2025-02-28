import Component from "../core/Component.js";
import Battle from "./Battle.js";
import Loading from "./Loading.js";
import Result from "./Result.js";
import Game from "./Game.js";

export default class BattleRender extends Component {
	template() {
		return `
		<div id="gameState" class="container-xxl vh-100 d-flex flex-column justify-content-center"></div>
		`;
	}

	mounted() {
		const $page = document.querySelector("#gameState");
		const $loading = new Loading($page, this.$state);
		const $battle = new Battle($page, this.$state);
		const $game = new Game($page, this.$state);
		const $result = new Result($page, this.$state);

		this.$state = {
			loading: $loading,
			battle: $battle,
			game: $game,
			result: $result,
		}
		
		$loading.render();
	}

	changeState(data) {
		if (data.type === "matching_on") {
			this.$state.battle.updateImage(data);
			this.$state.game.updateImage(data);
			this.$state.result.updateImage(data);
			this.$state.battle.render();
		} else if (data.type === "game_wait") {
			this.$state.game.waitTime(data);
		} else if (data.type === "game_update") {
			this.$state.game.updateGame(data);
		} else if (data.type === "ending") {
			this.$state.result.finishGame(data);
			setTimeout(() => {
				if (this.$state.socket.readyState === WebSocket.OPEN) {
					this.$state.socket.close();
				}
				window.location.hash = "#/";
			}, 3000);
		}
	}

	initSocket(socket) {
		this.$state = {
			...this.$state,
			socket: socket,
		}
	}
}