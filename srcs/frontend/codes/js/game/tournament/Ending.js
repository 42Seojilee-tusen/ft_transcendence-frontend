import Component from "../../core/Component.js";
import { HOST } from "../../constants/ApiConstants.js";

export default class Ending extends Component {
	setup() {
		this.$state = {
			type: "",
			playerImage: "../../img/profile.jpeg",
			playerName: "WinnerPlayer",
		};
	}

	template() {
		return `
		<div class="container vh-100 d-flex flex-column">
			<div class="row d-flex flex-grow-1">
				<h1 class="col text-white d-flex align-items-center justify-content-center">Winner</h1>
			</div>
			<div class="row d-flex flex-grow-1">
				<div class="col d-flex flex-column align-items-center justify-content-center">
					<img
						id="playerImage"
						src=${this.$state.playerImage}
						alt="Sample Image"
						class="img-fluid mb-2 now-play"
						style="max-width: 100%; height: 50%;"
					/>
					<h3 class="text-white mb-0">${this.$state.playerName}</p>
				</div>
			</div>
			<div class="row d-flex flex-grow-1">
				<div class="col d-flex align-items-center justify-content-center"></div>
			</div>
		</div>
		`;
	}

	endGame(data) {
		this.setState({
			type: data.type,
			playerImage: `https://${HOST}/api${data.winner.player_image}`,
			playerName: data.winner.player_name,
		})
	}
}