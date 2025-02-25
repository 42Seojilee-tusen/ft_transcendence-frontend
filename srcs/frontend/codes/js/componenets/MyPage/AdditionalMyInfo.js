import Component from "../../core/Component.js";

export default class AdditionalMyInfo extends Component {
	template() {
		return `
			<div id="pieChart"></div>
		`;
	}

	mounted() {
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
