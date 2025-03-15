import Component from "../../core/Component.js";
import { requestApi } from "../../core/requestApi.js";
import { HOST } from "../../constants/ApiConstants.js";

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
			this.makeChart("battle");
			this.makeChart("tournament");
		}
	}

	async fetchMatchHistory() {
		try {
			const response = await requestApi(`https://${HOST}/api/games/${this.$state.username}/`, {
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

	makeChart(type) {
		const $simpleHistory = this.$state.histories.total_match_history;
		let renderLocation;
		let winData, loseData;
		let labelName;
		
		if (type === "battle") {
			renderLocation = document.querySelector('#myBattleChart');
			winData = $simpleHistory[0].win;
			loseData = $simpleHistory[0].lose;
			labelName = "My Battle History";
		} else if (type === "tournament") {
			renderLocation = document.querySelector('#myTournamentChart');
			winData = $simpleHistory[1].win;
			loseData = $simpleHistory[1].lose;
			labelName = "My Tournament History";
		}
		
		// 데이터와 색상 설정
		let chartData, chartColors, chartLabels;
		
		// 승패가 모두 0인지 확인
		if (winData === 0 && loseData === 0) {
			// 데이터가 없는 경우 회색 도넛 표시
			chartData = [1]; // 더미 데이터 1개
			chartColors = ['rgb(180, 180, 180)']; // 회색
			chartLabels = ['No Data'];
		} else {
			// 데이터가 있는 경우 승/패 표시
			chartData = [winData, loseData];
			chartColors = ['rgb(255, 99, 132)', 'rgb(54, 162, 235)'];
			chartLabels = ['Win', 'Lose'];
		}
		
		new Chart(renderLocation, {
			type: 'doughnut',
			data: {
				labels: chartLabels,
				datasets: [{
					label: labelName,
					data: chartData,
					backgroundColor: chartColors,
					hoverOffset: 4
				}]
			},
			options: {
				plugins: {
					legend: {
						labels: {
							// 텍스트 색상
							color: '#FFFFFF',
							// 텍스트 폰트
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
