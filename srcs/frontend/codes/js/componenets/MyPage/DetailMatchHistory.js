import Component from "../../core/Component.js";

export default class DetailMatchHistory extends Component {

	setup() {
		let date;
		let type;
		let score;
		let result;
		date = `${this.$props.date[0]}.${this.$props.date[1]}.${this.$props.date[2]}`
		if (this.$props.match_type === "배틀") {
			type = "vs " + this.$props.enemy;
			score = `${this.$props.score[0]} vs ${this.$props.score[1]}`;
			result = this.$props.result;
		} else if(this.$props.match_type === "토너먼트") {
			type = this.$props.match_type;
			score = `
						${this.$props.enemy.player1}
						${this.$props.enemy.player2}
						${this.$props.enemy.player3}
						${this.$props.enemy.player4}
			`
			result = this.$props.result;
		}

		this.$state = {
			date: date,
			type: type,
			score: score,
			result: result,
		};
	}

	/* 기존 render는 template을 통해서 parent의 innerText를 덮어씌웠지만
	현재는 parent의 child를 연속적으로 추가해주는 기능 필요해서 overriding */
	render() {
		const layout = `
			<div class="d-flex flex-column justify-content-center align-items-center fs-5">
				<div class="m-1">
					${this.$state.date}
				</div>
				<div class="m-1">
					${this.$state.type}
				</div>
			</div>
			<div class="d-flex flex-column justify-content-center align-items-center fs-5">
				${this.$state.score}
			</div>
			<div class="d-flex flex-column justify-content-center align-items-center fs-5">
				${this.$state.result}
			</div>
		`;
		const historyElement = document.createElement("div");
		historyElement.classList.add("row", "row-cols-3", "m-1", "m-md-2", "m-lg-3");
		historyElement.id = "detailMatchHistory";
		historyElement.innerHTML = layout;
		this.$target.appendChild(historyElement);
	}

}
