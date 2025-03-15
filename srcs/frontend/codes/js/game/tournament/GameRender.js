import Component from "../../core/Component.js";
import Index from "./Index.js";
import Loading from "./Loading.js";
import Result from "./Result.js";
import Game from "./Game.js";
import Ending from "./Ending.js";

export default class GameRender extends Component {
	template() {
		return `
		<div id="gameState" class="container-xxl d-flex flex-column justify-content-center" style="height: 100dvh;"></div>
		`;
	}

	mounted() {
		const $page = document.querySelector("#gameState");
		const $loading = new Loading($page);
		const $index = new Index($page);
		const $game = new Game($page);
		const $result = new Result($page);
		const $ending = new Ending($page);

		this.$state = {
			loading: $loading,
			index: $index,
			game: $game,
			result: $result,
			ending: $ending,
		}

		$loading.render();
	}

	changeState(data) {
		if (data.type === "matching_on") {
			this.$state.index.updateImage(data);
		} else if (data.type === "next_game") {
			this.$state.index.changePlayer(data);
			this.$state.game.changePlayer(data);
			this.$state.result.changePlayer(data);
		} else if (data.type === "game_wait") {
			this.$state.game.waitTime(data);
		} else if (data.type === "game_update") {
			this.$state.game.updateGame(data);
		} else if (data.type === "finish") {
			this.$state.result.finishGame(data);
		} else if (data.type === "ending") {
			this.$state.ending.endGame(data);
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