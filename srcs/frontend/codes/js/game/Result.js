import Component from "../core/Component.js";
import { requestApi } from "../core/requestApi.js";

export default class Result extends Component {
	setup() {
		const player1Name = this.$props.now_player[0];
		const player2Name = this.$props.now_player[1];
		const player1Image = "../../img/profile.jpeg";
		const player2Image = "../../img/profile.jpeg";
		this.$state = {
			player1Image: player1Image,
			player1Name: player1Name,
			win1: this.$props.result[0] > this.$props.result[1],
			player2Image: player2Image,
			player2Name: player2Name,
			win2: this.$props.result[1] > this.$props.result[0],
			score: `${this.$props.result[0]} : ${this.$props.result[1]}`
		};
	}

	template() {
		return `
		<div class="container vh-100 d-flex flex-column">
			<div class="row d-flex flex-grow-1">
				<h1 class="col text-white d-flex align-items-center justify-content-center">Result</h1>
			</div>
			<div class="row d-flex flex-grow-1">
				<div class="col d-flex flex-column align-items-center justify-content-center">
					<img
						id="player1Image"
						src=${this.$state.player1Image}
						alt="Sample Image"
						class="img-fluid mb-2"
					/>
					<h3 class="text-white mb-0">${this.$state.player1Name}</p>
				</div>
				<div class="col d-flex align-items-center justify-content-center"><h1 class="text-white" style="font-size: clamp(1rem, 5vw, 4rem);">${this.$state.score}</h1></div>
				<div class="col d-flex flex-column align-items-center justify-content-center">
					<img
						id="player2Image"
						src=${this.$state.player2Image}
						alt="Sample Image"
						class="img-fluid mb-2"
					/>
					<h3 class="text-white mb-0">${this.$state.player2Name}</p>
				</div>
			</div>
			<div class="row d-flex flex-grow-1">
				<div class="col d-flex align-items-center justify-content-center"></div>
			</div>
		</div>
		`;
	}

	mounted() {
		const $player1Image = document.querySelector("#player1Image");
		const $player2Image = document.querySelector("#player2Image");
		if (this.$state.win1) {
			$player1Image.classList.add("now-play");
		} else {
			$player1Image.classList.add("not-play");
		}
		if (this.$state.win2) {
			$player2Image.classList.add("now-play");
		} else {
			$player2Image.classList.add("not-play");
		}
	}
}