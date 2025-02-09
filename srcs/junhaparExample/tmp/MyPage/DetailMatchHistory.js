import Component from "../../core/Component.js";

export default class DetailMatchHistory extends Component {

	setup() {
		let type;
		let score;
		let rank;
		if (this.$props.type === "배틀") {
			type = "vs " + this.$props.enemy;
			score = this.$props.score;
			rank = this.$props.winOrLose;
		} else {
			type = this.$props.type;
			let arrEnemy = JSON.parse(this.$props.enemy);
			let arrRank = JSON.parse(this.$props.score);
			score = `
				${arrRank[0] + ". " + arrEnemy[0]}<br>
				${arrRank[1] + ". " + arrEnemy[1]}<br>
				${arrRank[2] + ". " + arrEnemy[2]}<br>
			`;
			rank = this.$props.winOrLose + "등";
		}

		this.$state = {
			date: this.$props.date,
			type: type,
			score: score,
			rank: rank,
		};
	}

	/* 기존 render는 template을 통해서 parent의 innerText를 덮어씌웠지만
	현재는 parent의 child를 연속적으로 추가해주는 기능 필요해서 overriding */
	render() {
		const layout = `
			<div class="d-flex flex-column justify-content-center align-items-center">
				<div class="m-1">
					${this.$state.date}
				</div>
				<div class="m-1">
					${this.$state.type}
				</div>
			</div>
			<div class="d-flex flex-column justify-content-center align-items-center">
				${this.$state.score}
			</div>
			<div class="d-flex flex-column justify-content-center align-items-center">
				${this.$state.rank}
			</div>
		`;
		const historyElement = document.createElement("div");
		historyElement.classList.add("row", "row-cols-3", "m-1", "m-md-2", "m-lg-3");
		historyElement.id = "detailMatchHistory";
		historyElement.innerHTML = layout;
		this.$target.appendChild(historyElement);
	}

}
