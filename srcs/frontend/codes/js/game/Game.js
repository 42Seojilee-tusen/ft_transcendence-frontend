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
			score: this.$props.score,
			ball: [this.$props.ball.x, this.$props.ball.y],
			left_bar: this.$props.left_bar,
			right_bar: this.$props.right_bar,
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
				<div class="col d-flex align-items-center justify-content-center"><h1 class="text-white" style="font-size: clamp(1rem, 5vw, 4rem);">${this.$state.score[0]} : ${this.$state.score[1]}</h1></div>
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
			</div>
			<div class="row d-flex flex-grow-1">
				<div class="col d-flex align-items-center justify-content-center"></div>
			</div>
		</div>
		`;
	}
}