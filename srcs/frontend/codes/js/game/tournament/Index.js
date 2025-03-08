import Component from "../../core/Component.js";
import { HOST } from "../../constants/ApiConstants.js";

export default class Index extends Component {
	setup() {
		this.$state = {
			player1Image: "../../img/profile.jpeg",
			player1Name: "player1",
			player2Image: "../../img/profile.jpeg",
			player2Name: "player2",
			player3Image: "../../img/profile.jpeg",
			player3Name: "player3",
			player4Image: "../../img/profile.jpeg",
			player4Name: "player4",
			nowPlay1: true,
			nowPlay2: true,
			nowPlay3: false,
			nowPlay4: false,
		};
	}

	template() {
		return `
		<div class="container vh-100 d-flex flex-column">
			<div class="row d-flex flex-grow-1">
				<h1 class="col text-white d-flex align-items-center justify-content-center">Tournament</h1>
			</div>
			<div class="row d-flex flex-grow-1">
				<div class="col d-flex flex-column align-items-center justify-content-center"></div>
				<div class="col d-flex flex-column align-items-center justify-content-center"></div>
				<div class="col d-flex flex-column align-items-center justify-content-center left-side top-side"></div>
				<div class="col d-flex flex-column align-items-center justify-content-center top-side"></div>
				<div class="col d-flex flex-column align-items-center justify-content-center top-side"></div>
				<div class="col d-flex flex-column align-items-center justify-content-center right-side top-side"></div>
				<div class="col d-flex flex-column align-items-center justify-content-center "></div>
				<div class="col d-flex flex-column align-items-center justify-content-center"></div>
			</div>
			<div class="row d-flex flex-grow-1">
				<div class="col d-flex flex-column align-items-center justify-content-center"></div>
				<div class="col d-flex flex-column align-items-center justify-content-center left-side top-side"></div>
				<div class="col d-flex flex-column align-items-center justify-content-center right-side top-side"></div>
				<div class="col d-flex flex-column align-items-center justify-content-center"></div>
				<div class="col d-flex flex-column align-items-center justify-content-center"></div>
				<div class="col d-flex flex-column align-items-center justify-content-center left-side top-side"></div>
				<div class="col d-flex flex-column align-items-center justify-content-center right-side top-side"></div>
				<div class="col d-flex flex-column align-items-center justify-content-center"></div>
			</div>
			<div class="row d-flex">
				
				<div class="col d-flex flex-column align-items-center justify-content-center">
					<h3 class="text-white mb-2"></h3>
					<img
						id="player1Image"
						src=${this.$state.player1Image}
						alt="Sample Image1"
						class="img-fluid mb-2"
						style="max-width: 100%; height: 50%;"
					/>
					<h3 class="text-white mb-2">${this.$state.player1Name}</h3>
				</div>
				<div class="col d-flex flex-column align-items-center justify-content-center">
					<h3 class="text-white mb-2"></h3>
					<img
						id="player2Image"
						src=${this.$state.player2Image}
						alt="Sample Image2"
						class="img-fluid mb-2"
						style="max-width: 100%; height: 50%;"
					/>
					<h3 class="text-white mb-2">${this.$state.player2Name}</h3>
				</div>
				<div class="col d-flex flex-column align-items-center justify-content-center">
					<h3 class="text-white mb-2"></h3>
					<img
						id="player3Image"
						src=${this.$state.player3Image}
						alt="Sample Image3"
						class="img-fluid mb-2"
						style="max-width: 100%; height: 50%;"
					/>
					<h3 class="text-white mb-2">${this.$state.player3Name}</h3>
				</div>
				<div class="col d-flex flex-column align-items-center justify-content-center">
					<h3 class="text-white mb-2"></h3>
					<img
						id="player4Image"
						src=${this.$state.player4Image}
						alt="Sample Image4"
						class="img-fluid mb-2"
						style="max-width: 100%; height: 50%;"
					/>
					<h3 class="text-white mb-2">${this.$state.player4Name}</h3>
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
		const $player3Image = document.querySelector("#player3Image");
		const $player4Image = document.querySelector("#player4Image");
		if (this.$state.nowPlay1) {
			$player1Image.classList.add("now-play");
		} else {
			$player1Image.classList.add("not-play");
		}
		if (this.$state.nowPlay2) {
			$player2Image.classList.add("now-play");
		} else {
			$player2Image.classList.add("not-play");
		}
		if (this.$state.nowPlay3) {
			$player3Image.classList.add("now-play");
		} else {
			$player3Image.classList.add("not-play");
		}
		if (this.$state.nowPlay4) {
			$player4Image.classList.add("now-play");
		} else {
			$player4Image.classList.add("not-play");
		}
	}

	updateImage(data) {
		this.$state = {
			...this.$state,
			
			player1Image: `https://${HOST}/api${data.game_users[0].player_image}`,
			player1Name: data.game_users[0].player_name,

			player2Image: `https://${HOST}/api${data.game_users[1].player_image}`,
			player2Name: data.game_users[1].player_name,

			player3Image: `https://${HOST}/api${data.game_users[2].player_image}`,
			player3Name: data.game_users[2].player_name,

			player4Image: `https://${HOST}/api${data.game_users[3].player_image}`,
			player4Name: data.game_users[3].player_name,
		};
	}

	changePlayer(data) {
		this.setState(
		{
			nowPlay1: data.now_players.some(player => player.player_name === this.$state.player1Name),
			nowPlay2: data.now_players.some(player => player.player_name === this.$state.player2Name),
			nowPlay3: data.now_players.some(player => player.player_name === this.$state.player3Name),
			nowPlay4: data.now_players.some(player => player.player_name === this.$state.player4Name),
		})
	}
}