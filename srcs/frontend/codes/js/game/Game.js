import Component from "../core/Component.js";
import { requestApi } from "../core/requestApi.js";

export default class Game extends Component {
	setup() {
		const player1Image = "../../img/profile.jpeg";
		const player2Image = "../../img/profile.jpeg";
		this.$state = {
			player1Image: player1Image,
			player1Name: this.$props.now_player[0],
			player2Image: player2Image,
			player2Name: this.$props.now_player[1],
			score: `${this.$props.score[0]} : ${this.$props.score[1]}`,
			ball: { x: this.$props.ball.x, y: this.$props.ball.y },
			leftBar: this.$props.left_bar,
			rightBar: this.$props.right_bar,
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
				<canvas id="gameCanvas" class="mt-5 mb-5" width="480" height="320" style="background-color: lightgray;"></canvas>
			</div>
			<div class="row d-flex flex-grow-1">
				<div class="col d-flex align-items-center justify-content-center"></div>
			</div>
		</div>
		`;
	}

	mounted() {
		const $canvas = document.querySelector("#gameCanvas");
		const ctx = $canvas.getContext("2d");
		ctx.beginPath();
		ctx.rect(10, this.$state.leftBar, 10, 50);
		ctx.fillStyle = "black";
		ctx.fill();
		ctx.closePath();
		ctx.beginPath();
		ctx.arc(this.$state.ball.x, this.$state.ball.y, 7, 0, Math.PI * 2, false);
		ctx.fillStyle = "green";
		ctx.fill();
		ctx.closePath();
		ctx.beginPath();
		ctx.rect(460, this.$state.rightBar, 10, 50);
		ctx.fillStyle = "black";
		ctx.fill();
		ctx.closePath();
	}
}