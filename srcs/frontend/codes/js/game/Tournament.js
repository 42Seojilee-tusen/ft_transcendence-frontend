import Component from "../core/Component.js";
import { requestApi } from "../core/requestApi.js";

export default class Battle extends Component {
	setup() {
		const player1Name = this.$props.game_user[0];
		const player2Name = this.$props.game_user[1];
		const player3Name = this.$props.game_user[2];
		const player4Name = this.$props.game_user[3];
		const player1Image = "../../img/profile.jpeg";
		const player2Image = "../../img/profile.jpeg";
		const player3Image = "../../img/profile.jpeg";
		const player4Image = "../../img/profile.jpeg";
		this.$state = {
			player1Image: player1Image,
			player1Name: player1Name,
			nowPlay1: this.$props.now_player.includes(player1Name),
			player2Image: player2Image,
			player2Name: player2Name,
			nowPlay2: this.$props.now_player.includes(player2Name),
			player3Image: player3Image,
			player3Name: player3Name,
			nowPlay3: this.$props.now_player.includes(player3Name),
			player4Image: player4Image,
			player4Name: player4Name,
			nowPlay4: this.$props.now_player.includes(player4Name),
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
}