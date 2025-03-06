import Component from "../core/Component.js";
import GameRender from "../game/tournament/GameRender.js";
import { WSS_PROTOCOL, HOST } from "../constants/ApiConstants.js";
import {requestApi} from "../core/requestApi.js"

export default class TournamentPage extends Component {
    destroy() {
        if (this.chatSocket.readyState === WebSocket.OPEN) {
            this.chatSocket.close();
            console.log("WebSocket 닫음!");
        }
    }

	setup() {
		this.keysPressed = {};
	}

	template() {
		return `
		<div id="tournament-render"></div>
		`;
	}

	mounted() {
		const $parent = document.querySelector("#tournament-render");
		const gameRender = new GameRender($parent);
		requestApi(`https://${HOST}/api/users/me/`, { // 임시 api => 이걸 이용해서 로그인 시간 유지
			method: "GET",
			credentials: "include",  // 🔥 쿠키 포함하여 요청
			headers: {
				"Content-Type": "application/json",
			},
		}).then((response) => {
			this.connectWebSocket(gameRender);
			// 키 입력 이벤트 추가
			$parent.setAttribute("tabindex", "0");
			$parent.addEventListener("keydown", (e) => this.handleKeyDown(e));
			$parent.addEventListener("keyup", (e) => this.handleKeyUp(e));
			$parent.focus();
		}).catch((error) => {
			window.location.hash = "#/login";
		});

	}

	connectWebSocket(gameRender) {
		const token = sessionStorage.getItem("accessToken");
		this.chatSocket = new WebSocket(
			WSS_PROTOCOL + HOST + `/api/ws/game/tournament/?token=${token}`
		);

		this.chatSocket.onopen = () => {
			console.log("WebSocket connection established");
			gameRender.initSocket(this.chatSocket);
		};

		this.chatSocket.onmessage = (e) => {
			const data = JSON.parse(e.data);
			console.log(data);
			gameRender.changeState(data);
		};

		this.chatSocket.onclose = (e) => {
			console.log("WebSocket connection closed", e);
			this.chatSocket = null;
		};

		this.chatSocket.onerror = (error) => {
			console.error("WebSocket error:", error);
		};
	}

	handleKeyDown(e) {
		if (!this.keysPressed[e.key]) {
			this.keysPressed[e.key] = true;
			this.sendMovePaddle(true);
		}
	}

	handleKeyUp(e) {
		if (this.keysPressed[e.key]) {
			delete this.keysPressed[e.key];
			this.sendMovePaddle(false);
		}
	}

	sendMovePaddle(isMoving) {
		if (!this.chatSocket || this.chatSocket.readyState !== WebSocket.OPEN) {
			console.warn("WebSocket is not ready, cannot send message");
			return;
		}

		let direction = 0;
		if (this.keysPressed["w"] || this.keysPressed["ArrowUp"]) {
			direction -= 1;
		}
		if (this.keysPressed["s"] || this.keysPressed["ArrowDown"]) {
			direction += 1;
		}

		if (!isMoving) direction = 0;

		const data = JSON.stringify({
			type: "move_paddle",
			direction: direction,
		});

		console.log("Sending WebSocket:", data);
		this.chatSocket.send(data);
	}
}
