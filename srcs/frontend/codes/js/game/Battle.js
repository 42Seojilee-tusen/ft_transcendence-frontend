import Component from "../core/Component.js";
import { requestApi } from "../core/requestApi.js";

export default class Battle extends Component {
	setup() {
		const player1Image = "../../img/profile.jpeg";
		const player2Image = "../../img/profile.jpeg";
		this.$state = {
			player1Image: player1Image,
			player1Name: this.$props.game_user[0],
			player2Image: player2Image,
			player2Name: this.$props.game_user[1],
		};
	}

	template() {
		return `
		<div class="container vh-100 d-flex flex-column">
			<div class="row d-flex flex-grow-1">
				<h1 class="col text-white d-flex align-items-center justify-content-center">Battle</h1>
			</div>
			<div class="row d-flex flex-grow-1">
				<div class="col d-flex flex-column align-items-center justify-content-center">
					<img
						src=${this.$state.player1Image}
						alt="Sample Image"
						class="img-fluid mb-2"
						style="max-width: 100%; height: auto;"
					/>
					<h3 class="text-white mb-0">${this.$state.player1Name}</p>
				</div>
				<div class="col d-flex align-items-center justify-content-center"><h1 class="text-white" style="font-size: clamp(1rem, 5vw, 4rem);">VS</h1></div>
				<div class="col d-flex flex-column align-items-center justify-content-center">
					<img
						src=${this.$state.player2Image}
						alt="Sample Image"
						class="img-fluid mb-2"
						style="max-width: 100%; height: auto;"
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
}