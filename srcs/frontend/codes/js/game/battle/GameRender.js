import Component from "../../core/Component.js";
import Index from "./Index.js";
import Loading from "./Loading.js";
import Result from "./Result.js";
import Game from "./Game.js";

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

		this.$state = {
			loading: $loading,
			index: $index,
			game: $game,
			result: $result,
		}
		
		$loading.render();
	}

	changeState(data) {
		if (data.type === "matching_on") {
			this.$state.index.updateImage(data);
			this.$state.game.updateImage(data);
			this.$state.result.updateImage(data);
			this.$state.index.render();
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