import Component from "../core/Component.js";

export default class Game extends Component {
	setup() {
		let info;
		if (this.$props.type === "game_wait") {
			info = { time: this.$props.time, }
		} else {
			info = { game_state: this.$props.game_state, }
		}
		this.$state = {
			type: this.$props.type,
			player1Image: this.$props.now_players[0].player_image,
			player1Name: this.$props.now_players[0].player_name,
			player2Image: this.$props.now_players[1].player_image,
			player2Name: this.$props.now_players[1].player_name,
			score: `${this.$props.score[0]} : ${this.$props.score[1]}`,
			...info
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
				<div class="col d-flex flex-column align-items-center justify-content-center mt-5 mb-5">
					<canvas id="gameCanvas" width="800" height="500" style="background-color: darkgray;"></canvas>
				</div>
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
		if (this.$state.type === "game_wait") {
			ctx.font = "30px Arial"; // 글꼴 및 크기 설정
			ctx.fillStyle = "black"; // 텍스트 색상 설정
			ctx.fillText(this.$state.time, 390, 250);
		} else {
			ctx.beginPath();
			this.$state.game_state.paddles.forEach((paddle) => {
				ctx.rect(paddle.x, paddle.y, paddle.xsize, paddle.ysize);	
			})
			ctx.fillStyle = "black";
			ctx.fill();
			ctx.closePath();

			ctx.beginPath();
			this.$state.game_state.balls.forEach((ball) => {
				ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2, false);
			})
			ctx.fillStyle = "white";
			ctx.fill();
			ctx.closePath();
		}
	}
}