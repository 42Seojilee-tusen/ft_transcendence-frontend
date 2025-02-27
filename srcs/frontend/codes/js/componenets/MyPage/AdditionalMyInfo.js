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
			<div id="pieChart"></div>
		`;
	}

	mounted() {
		if (this.$state.histories !== null) {
			const wins = 30;
			const losses = 70;
			const total = wins + losses;

			// 승리 비율에 해당하는 각도 계산 (360도 기준)
			const winAngle = (wins / total) * 360;

			// 그래프에 사용할 색상 (예: 승리=green, 패배=red)
			const winColor = 'green';
			const lossColor = 'red';

			// CSS conic-gradient를 사용해 원형 그래프 배경 설정
			const pieChart = document.querySelector('div#pieChart');
			pieChart.style.background = `conic-gradient(${winColor} 0deg, ${winColor} ${winAngle}deg, ${lossColor} ${winAngle}deg, ${lossColor} 360deg)`;
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
