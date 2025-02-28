import Component from "../../core/Component.js";

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

	updateImage(data) {
		this.$state =  {
			...this.$state,
			players: [
				{
					playerImage: `https://localhost/api${data.game_users[0].player_image}`,
					playerName: data.game_users[0].player_name,
				},
				{
					playerImage: `https://localhost/api${data.game_users[1].player_image}`,
					playerName: data.game_users[1].player_name,
				},
				{
					playerImage: `https://localhost/api${data.game_users[2].player_image}`,
					playerName: data.game_users[2].player_name,
				},
				{
					playerImage: `https://localhost/api${data.game_users[3].player_image}`,
					playerName: data.game_users[3].player_name,
				},
			],
		};
		this.changePlayer(data);
	}

	endGame(data) {
		const index = this.$state.players.findIndex(item => item.playerName === data.winner);
		this.setState({
			...this.$state,
			type: data.type,
			playerImage: `https://localhost/api${this.$state.players[index1].playerImage}`,
			playerName: this.$state.players[index1].playerName,
		})
	}
}