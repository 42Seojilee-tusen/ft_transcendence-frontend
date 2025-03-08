import Component from "../../core/Component.js";
import { HOST } from "../../constants/ApiConstants.js";

export default class Index extends Component {
	setup() {
		this.$state = {
			player1Image: "../../img/profile.jpeg",
			player1Name: "player1",
			player2Image: "../../img/profile.jpeg",
			player2Name: "player2",
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
						style="max-width: 100%; height: 50%;"
					/>
					<h3 class="text-white mb-0">${this.$state.player1Name}</p>
				</div>
				<div class="col d-flex align-items-center justify-content-center"><h1 class="text-white" style="font-size: clamp(1rem, 5vw, 4rem);">VS</h1></div>
				<div class="col d-flex flex-column align-items-center justify-content-center">
					<img
						src=${this.$state.player2Image}
						alt="Sample Image"
						class="img-fluid mb-2"
						style="max-width: 100%; height: 50%;"
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

	updateImage(data) {
		this.setState( 
		{
			player1Image: `https://${HOST}/api${data.game_users[0].player_image}`,
			player1Name: data.game_users[0].player_name,
			player2Image: `https://${HOST}/api${data.game_users[1].player_image}`,
			player2Name: data.game_users[1].player_name,
		})
	}
}
