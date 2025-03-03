import Component from "../../core/Component.js";

export default class Result extends Component {
	setup() {
		this.$state = {
			type: "",
			player1Image: "../../img/profile.jpeg",
			player1Name: "player1",
			player2Image: "../../img/profile.jpeg",
			player2Name: "player2",
			score: "0 : 0",
			win1: false,
			win2: false,
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

	changePlayer(data) {
		this.$state = {
			...this.$state,
			player1Image: `https://localhost/api${data.now_players[0].player_image}`,
			player1Name: data.now_players[0].player_name,

			player2Image: `https://localhost/api${data.now_players[1].player_image}`,
			player2Name: data.now_players[1].player_name,
		};
	}

	finishGame(data) {
		this.setState({
			...this.$state,
			type: data.type,
			win1: data.result[0] > data.result[1],
			win2: data.result[1] > data.result[0],
			score: `${data.result[0]} : ${data.result[1]}`
		})
	}
}