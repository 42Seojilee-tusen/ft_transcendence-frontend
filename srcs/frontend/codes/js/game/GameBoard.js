import Component from "../core/Component.js";

export default class Game extends Component {
	setup() {
		this.$state = {
			type: "game_wait",
			time: 3,
		};
	}

	template() {
		return `
		<canvas id="gameCanvas" width="800" height="500" style="background-color: darkgray;"></canvas>
		`;
	}

	mounted() {
		if (this.$state.type === "game_wait") {
			this.waitTime();
		} else if (this.$state.type === "game_update") {
			this.updateGame();
		}
	}

	updateBoard(data) {
		this.setState(data);
	}

	waitTime() {
		const $canvas = document.querySelector("#gameCanvas");
		const ctx = $canvas.getContext("2d");
		ctx.clearRect(0, 0, $canvas.width, $canvas.height);
		ctx.font = "30px Arial"; // 글꼴 및 크기 설정
		ctx.fillStyle = "white"; // 텍스트 색상 설정
		ctx.fillText(this.$state.time, 390, 250);
	}

	updateGame() {
		const gameState = this.$state.game_state;
		const $canvas = document.querySelector("#gameCanvas");
		const ctx = $canvas.getContext("2d");
		ctx.clearRect(0, 0, $canvas.width, $canvas.height);
		ctx.beginPath();
		gameState.paddles.forEach((paddle) => {
			ctx.rect(paddle.x, paddle.y, paddle.xsize, paddle.ysize);	
		})
		ctx.fillStyle = "black";
		ctx.fill();
		ctx.closePath();

		ctx.beginPath();
		gameState.balls.forEach((ball) => {
			ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2, false);
		})
		ctx.fillStyle = "white";
		ctx.fill();
		ctx.closePath();
	}
}