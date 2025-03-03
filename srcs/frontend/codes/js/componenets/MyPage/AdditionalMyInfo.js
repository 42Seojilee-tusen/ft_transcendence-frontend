import Component from "../../core/Component.js";
import { requestApi } from "../../core/requestApi.js";

export default class AdditionalMyInfo extends Component {
	constructor($target, username) {
		// username이 없으면 초기화를 중단
		if (username === undefined) {
			return;
		}
		super($target, username);
		this.fetchMatchHistory();
	}

	setup() {
		this.$state = {
			username: this.$props,
			histories: null,
		}
	}

	template() {
		return `
			<div class="d-flex flex-column justify-content-center align-content-center">
				<canvas id="myBattleChart" class="my-1 my-md-2 my-lg-3"></canvas>
				<div class="text-center text-break mb-3 mb-md-4 mb-lg-5">Battle 기록</div>
				<canvas id="myTournamentChart" class="my-1 my-md-2 my-lg-3"></canvas>
				<div class="text-center text-break">Tournament 기록</div>
			</div>
		`;
	}

	mounted() {
		if (this.$state.histories !== null) {
			const simpleHistory = this.$state.histories.total_match_history;
			const $myBattleChart = document.querySelector('#myBattleChart');
			const $myTournamentChart = document.querySelector('#myTournamentChart');

			const winBattle = simpleHistory[0].win;
			const loseBattle = simpleHistory[0].lose;
			const winTournament = simpleHistory[1].win;
			const loseTournament = simpleHistory[1].lose;

			new Chart($myBattleChart, {
				type: 'doughnut',
				data: {
					labels: [
						'Win',
						'Lose',
					],
					datasets: [{
						label: 'My Battle History',
						data: [winBattle, loseBattle],
						backgroundColor: [
						'rgb(255, 99, 132)',
						'rgb(54, 162, 235)'
						],
						hoverOffset: 4
					}]
				},
				options: {
					plugins: {
					  legend: {
						labels: {
						  // 텍스트 색상 변경
						  color: '#FFFFFF',
						  // 텍스트 크기 및 스타일 변경
						  font: {
							size: 18,
							family: 'Arial'
						  }
						}
					  }
					}
				}
			});
			new Chart($myTournamentChart, {
				type: 'doughnut',
				data: {
					labels: [
						'Win',
						'Lose',
					],
					datasets: [{
						label: 'My Tournament History',
						data: [winTournament, loseTournament],
						backgroundColor: [
						'rgb(255, 99, 132)',
						'rgb(54, 162, 235)'
						],
						hoverOffset: 4
					}]
				},
				options: {
					plugins: {
					  legend: {
						labels: {
						  // 텍스트 색상 변경
						  color: '#FFFFFF',
						  // 텍스트 크기 및 스타일 변경
						  font: {
							size: 18,
							family: 'Arial'
						  }
						}
					  }
					}
				}
			});
		}
	}

	async fetchMatchHistory() {
		try {
			const response = await requestApi(`https://localhost/api/games/${this.$state.username}/`, {
				method: "GET",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
				},
			});
			const data = await response.json();
			this.setState({histories : data});
		} catch (error) {
			console.error("Error fetching /api/games/${this.$state.username}/:", error);
		}
	}
}
